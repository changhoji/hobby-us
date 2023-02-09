import styles from "@/styles/editor.module.css";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fbAuth, fbDB } from "../_app";

export default function WriteRecord() {
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [user, loading, error] = useAuthState(fbAuth);
    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!user) {
            alert("do login first");
            return;
        }

        const recordObj = {
            title,
            content,
            timestamp: serverTimestamp(),
            uid: user.uid,
        };

        const data = await addDoc(collection(fbDB, "record"), recordObj);
        router.push(`/record/${data.id}`);
    };
    return (
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
                <input type="submit" value="작성" />
            </form>
        </div>
    );
}
