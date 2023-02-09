import RecordPreview from "@/components/RecordPreview";
import {
    collection,
    DocumentData,
    getDocs,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fbDB } from "../_app";

interface Record {
    title: string;
    content: string;
    uid: string;
    timestamp: Timestamp;
}

export default function RecordHome() {
    const [records, setRecords] = useState<
        QueryDocumentSnapshot<DocumentData>[]
    >([]);

    const getRecords = async () => {
        const querySnapshot = await getDocs(collection(fbDB, "record"));
        querySnapshot.forEach((doc) => {
            setRecords((prev: any) => [...prev, doc]);
        });
    };
    useEffect(() => {
        getRecords();
    }, []);

    console.log(records);

    return (
        <div>
            <Link href="/record/write">글쓰기</Link>
            <div id="records">
                {records.map((record) => (
                    <RecordPreview key={record.id} record={record} />
                ))}
            </div>
        </div>
    );
}
