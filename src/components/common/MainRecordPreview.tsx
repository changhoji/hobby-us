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
                <div id="imageContainer">
                    <Image src={data.thumbnail} alt="image" fill />
                </div>
            </Link>
            <style jsx>{`
                #imageContainer {
                    position: relative;
                    width: 12rem;
                    height: 12rem;
                }
            `}</style>
        </div>
    );
}
