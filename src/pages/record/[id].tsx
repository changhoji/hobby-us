import { Record } from "@/types/firestore/record";
import { doc, getDoc, QueryDocumentSnapshot } from "firebase/firestore";
import Link from "next/link";
import { fbDB } from "../_app";

interface Props {
    record: Record;
}

export default function Post({ record }: Props) {
    return (
        <div>
            <Link href="/record">돌아가기</Link>
            <h1>{record.title}</h1>
            <p>{record.content}</p>
            <i>by {record.userName}</i>
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
            userName: docSnap.data().userName,
            uid: docSnap.data().uid,
        },
    };
};
