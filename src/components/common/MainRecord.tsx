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
            <div className="container">
                <p>✨기록해요✨</p>
                <div className="previews">
                    {records.map((record) => (
                        <MainRecordPreview key={record.id} record={record} />
                    ))}
                </div>
                <p>✨기록해요✨</p>
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
                p {
                    text-align: right;
                    vertical-align: middle;
                }
            `}</style>
        </>
    );
}
