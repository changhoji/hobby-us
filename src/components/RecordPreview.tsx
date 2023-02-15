import { Record } from "@/types/firestore/record";
import {
    DocumentData,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import styles from "@/styles/RecordPreview.module.css";

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
                    <p>{data.content}</p>
                    <i>by {data.userName}</i>
                </div>
            </Link>
        </div>
    );
}
