import styles from "@/styles/editor.module.css";
import { Record } from "@/types/firestore/record";
import { uuidv4 } from "@firebase/util";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fbAuth, fbDB, fbStorage } from "../_app";

export default function WriteRecord() {
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const [thumbnail, setThumbnail] = useState<number>(0);
    const [classNames, setClassNames] = useState<string[]>([]);
    const [value, setValue] = useState<number>(0);

    const [user, loading, error] = useAuthState(fbAuth);
    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!user) {
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        if (title === "" || content === "") {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        if (images.length === 0) {
            alert("이미지를 추가해주세요.");
            return;
        }

        let photoURLs: string[] = [];

        for (const image of images) {
            const storageRef = ref(
                fbStorage,
                `images/record/${title}/${uuidv4()}`
            );
            const uploadTask = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(storageRef);
            photoURLs = [...photoURLs, downloadURL];
        }

        const recordObj = {
            title,
            content,
            uid: user.uid,
            userName: user.displayName,
            photoURL: user.photoURL,
            timestamp: serverTimestamp(),
            photos: photoURLs,
            thumbnail: photoURLs[thumbnail],
        };

        const data = await addDoc(collection(fbDB, "record"), recordObj);
        router.push(`/record/${data.id}`);
    };

    const handleImageClick = (e: any) => {
        // : React.MouseEvent<HTMLDivElement>
        console.log(e);
        // if (!(e.target instanceof HTMLDivElement)) {
        //     return;
        // }

        setValue((prev) => prev + 1);

        const newSelected = Number(e.target.dataset.index);

        setClassNames((prev) => {
            let temp: string[] = prev;

            for (let i = 0; i < classNames.length; i++) {
                if (temp[i] === "selected") temp[i] = "unselected";
                if (i === newSelected) temp[i] = "selected";
            }

            return temp;
        });
        setThumbnail(newSelected);
    };

    console.log(user);
    return (
        <>
            <div id="editor" className={styles.editor}>
                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        name="content"
                        placeholder="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        cols={30}
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            setImages(Array.from(e.target.files));
                            let temp = ["selected"];
                            for (let i = 1; i < e.target.files.length; i++) {
                                temp = [...temp, "unselected"];
                            }
                            setClassNames(temp);
                        }}
                    />
                    <div id="previewImages">
                        {images.map((image, index) => (
                            <div key={index}>
                                <img
                                    className={classNames[index]}
                                    onClick={(e) => {
                                        handleImageClick(e);
                                    }}
                                    src={URL.createObjectURL(image)}
                                    data-index={index}
                                    alt="preview"
                                ></img>
                            </div>
                        ))}
                    </div>
                    <input type="submit" value="작성" />
                </form>
            </div>
            <style jsx>{`
                #previewImages {
                    display: flex;
                }
                #previewImages > div {
                    width: 12rem;
                    height: 12rem;
                }
                #previewImages > div > img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .selected {
                    border: 3px solid black;
                }
                .unselected {
                }
            `}</style>
        </>
    );
}
