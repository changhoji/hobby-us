import RecordPreview from "@/components/RecordPreview";
import { Record, recordConverter } from "@/types/firestore/record";
import {
    collection,
    DocumentData,
    getDocs,
    QueryDocumentSnapshot,
    Timestamp,
    query,
    orderBy,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { fbAuth, fbDB } from "../_app";

export default function RecordHome() {
    const [records, setRecords] = useState<QueryDocumentSnapshot<Record>[]>([]);
    const [user, loading, error] = useAuthState(fbAuth);

    const getRecords = async () => {
        const recordRef = collection(fbDB, "record").withConverter(
            recordConverter
        );
        const q = query(recordRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        console.log("execute getDocs");

        querySnapshot.forEach((doc) => {
            setRecords((prev) => [...prev, doc]);
        });
    };
    useEffect(() => {
        getRecords();
    }, []);

    console.log(records);

    return (
        <div>
            <Link href="/record/write">
                <button>글쓰기</button>
            </Link>
            <div id="records">
                {records.map((record) => (
                    <RecordPreview key={record.id} record={record} />
                ))}
            </div>
        </div>
    );
}
