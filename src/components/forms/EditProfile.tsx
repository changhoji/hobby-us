import { ChangeEvent, FormEvent, useState } from "react";
import { fbAuth, fbDB, fbStorage } from "@/pages/_app";
import { uuidv4 } from "@firebase/util";
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
    uploadString,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { recordConverter } from "@/types/firestore/record";
import { useRouter } from "next/router";

interface UpdateData {
    userName?: string;
    photoURL?: string;
}

export default function EditProfileForm() {
    const router = useRouter();
    const [value, setValue] = useState<File | null>(null);
    const [user, loading, error] = useAuthState(fbAuth);
    const [newName, setNewName] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newName == "") {
            alert("새로운 이름을 입력해주세요");
            return;
        }

        if (value === null) {
            updateProfileInfo({
                userName: newName,
            });
        } else {
            const storageRef = ref(fbStorage, `userPhoto/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(storageRef, value);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            updateProfileInfo({
                                userName: newName,
                                photoURL: downloadURL,
                            });
                        }
                    );
                }
            );
        }

        alert("수정되었습니다.");
        router.push("/record");
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        const file = files[0];

        setValue(file);
        console.log(file);
    };

    const updateProfileInfo = (updateData: UpdateData) => {
        updateProfile(user, {
            displayName: updateData.userName,
            photoURL: updateData.photoURL,
        });

        const ref = collection(fbDB, "record").withConverter(recordConverter);
        const q = query(ref, where("uid", "==", user.uid));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((document) => {
                const ref = doc(fbDB, "record", document.id).withConverter(
                    recordConverter
                );
                updateDoc(ref, updateData);
            });
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </p>
            <p>
                <label htmlFor="displayName">닉네임: </label>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => {
                        setNewName(e.target.value);
                    }}
                    id="displayName"
                />
            </p>
            <input type="submit" value="변경" />
        </form>
    );
}
