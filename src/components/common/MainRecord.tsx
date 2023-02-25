import { fbDB } from "@/pages/_app";
import { Record, recordConverter } from "@/types/firestore/record";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import MainRecordPreview from "./MainRecordPreview";
import styles from "@/styles/MainRecord.module.css";

export default function MainRecord() {
    const [records, setRecords] = useState<QueryDocumentSnapshot<Record>[]>([]);

    const getRecords = () => {
        const ref = collection(fbDB, "record").withConverter(recordConverter);
        const q = query(ref, limit(4), orderBy("timestamp", "desc"));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setRecords((prev) => [...prev, doc]);
            });
        });
    };
    useEffect(() => {
        getRecords();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.previews}>
                    {records.map((record) => (
                        <MainRecordPreview key={record.id} record={record} />
                    ))}
                </div>
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                }
                .previews {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        </>
    );
}
