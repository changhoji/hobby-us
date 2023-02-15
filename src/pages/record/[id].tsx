import { Record, recordConverter } from "@/types/firestore/record";
import {
    doc,
    DocumentSnapshot,
    getDoc,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import Link from "next/link";
import { fbDB } from "../_app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
    record: Record;
}

export default function Post() {
    const router = useRouter();
    const id = router.query.id;

    const [post, setPost] = useState<DocumentSnapshot<Record> | null>(null);

    const getPost = async () => {
        if (typeof id === "string") {
            const docRef = doc(fbDB, "record", id).withConverter(
                recordConverter
            );
            const docSnap = await getDoc(docRef);
            if (docSnap !== undefined) {
                setPost(docSnap);
            }
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <Link href="/record">돌아가기</Link>
            {post && (
                <>
                    <h1>{post.data().title}</h1>
                    <p>{post.data().content}</p>
                    <i>by {post.data().userName}</i>
                    <img src={post.data().photoURL} alt="이미지" />
                </>
            )}
        </div>
    );
}
