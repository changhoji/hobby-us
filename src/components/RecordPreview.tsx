import { Record } from "@/types/firestore/record";
import {
    DocumentData,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import styles from "@/styles/RecordPreview.module.css";
import Image from "next/image";

interface Props {
    record: QueryDocumentSnapshot<Record>;
}

export default function RecordPreview({ record }: Props) {
    const data = record.data();

    return (
        <div className={styles.post}>
            <Link href={`/record/${record.id}`}>
                <div>
                    <h1>{data.title}</h1>
                    <article>{data.content}</article>
                    <i>by {data.userName}</i>
                    {data.photoURL !== "" && (
                        <Image
                            src={data.photoURL}
                            width="70"
                            height="70"
                            alt="userPhoto"
                        />
                    )}
                </div>
            </Link>
            <style jsx>{`
                i {
                    margin-right: 1rem;
                }
            `}</style>
        </div>
    );
}
