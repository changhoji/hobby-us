import { Record } from "@/types/firestore/record";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

interface Props {
    record: QueryDocumentSnapshot<Record>;
}

export default function MainRecordPreview({ record }: Props) {
    const data = record.data();

    return (
        <div>
            <Link href={`/record/${record.id}`}>
                <Image src={data.photoURL} alt="image" width="70" height="70" />
            </Link>
        </div>
    );
}
