import { collection, doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { fbDB } from "../_app";

interface Props {
    title: string;
    content: string;
    uid: string;
}

export default function Post({ title, content, uid }: Props) {
    return (
        <div>
            <Link href="/record">돌아가기</Link>
            <h1>{title}</h1>
            <p>{content}</p>
            <i>by {uid}</i>
        </div>
    );
}

export const getServerSideProps: any = async (context: any) => {
    const docRef = doc(fbDB, "record", context.params.id);
    console.log(fbDB);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    return {
        props: {
            title: docSnap.data().title,
            content: docSnap.data().content,
            uid: docSnap.data().uid,
        },
    };
};
