import { Record, recordConverter } from "@/types/firestore/record";
import {
    deleteDoc,
    doc,
    DocumentSnapshot,
    getDoc,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import Link from "next/link";
import { fbAuth, fbDB } from "../_app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    record: Record;
}

export default function Post() {
    const router = useRouter();
    const id = router.query.id;

    const [post, setPost] = useState<DocumentSnapshot<Record> | null>(null);
    const [user, loading, error] = useAuthState(fbAuth);

    const getPost = async () => {
        if (typeof id === "string") {
            const docRef = doc(fbDB, "record", id).withConverter(
                recordConverter
            );
            const docSnap = await getDoc(docRef);
            if (docSnap !== undefined) {
                setPost(docSnap);
            }
            console.log("user: " + user.uid);
        }
    };

    const handleRemoveClick = () => {
        if (typeof id === "string") {
            const docRef = doc(fbDB, "record", id);
            const ans = confirm("정말 삭제하시겠습니까?");
            if (!ans) return;

            deleteDoc(docRef);
            router.push("/record");
        }
    };

    useEffect(() => {
        getPost();
    });

    return (
        <div>
            <Link href="/record">돌아가기</Link>
            {post && (
                <>
                    <h1>{post.data().title}</h1>
                    <p>{post.data().content}</p>
                    <i>by {post.data().userName}</i>
                </>
            )}
            {post && post.data().uid === user.uid && (
                <p>
                    <button onClick={handleRemoveClick}>삭제</button>
                </p>
            )}
        </div>
    );
}
