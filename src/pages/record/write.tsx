import styles from "@/styles/editor.module.css";
import { Record } from "@/types/firestore/record";
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
            alert("로그인이 필요한 기능입니다.");
            return;
        }
        if (title === "" || content === "") {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        const recordObj = {
            title,
            content,
            uid: user.uid,
            userName: user.displayName,
            photoURL: user.photoURL,
            timestamp: serverTimestamp(),
        };

        const data = await addDoc(collection(fbDB, "record"), recordObj);
        router.push(`/record/${data.id}`);
    };

    console.log(user);
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
