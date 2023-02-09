import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Link from "next/link";

interface Props {
    // record: QueryDocumentSnapshot<DocumentData>;
}

export default function RecordPreview({ record }: any) {
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
