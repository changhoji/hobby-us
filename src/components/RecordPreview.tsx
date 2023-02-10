import { Record } from "@/types/firestore/record";
import {
    DocumentData,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase/firestore";
import Link from "next/link";

interface Props {
    record: QueryDocumentSnapshot<Record>;
}

export default function RecordPreview({ record }: Props) {
    const data = record.data();
    return (
        <Link href={`/record/${record.id}`}>
            <div>
                <h1>{data.title}</h1>
                <p>{data.content}</p>
                <i>by {data.uid}</i>
            </div>
        </Link>
    );
}
