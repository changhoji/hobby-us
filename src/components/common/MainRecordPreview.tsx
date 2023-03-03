import { Record } from "@/types/firestore/record";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/MainRecordPreview.module.css";

interface Props {
    record: QueryDocumentSnapshot<Record>;
}

export default function MainRecordPreview({ record }: Props) {
    const data = record.data();

    return (
        <div className={styles.preview}>
            <Link href={`/record/${record.id}`}>
                <div id="imageContainer">
                    <img
                        src={data.thumbnail}
                        alt="image"
                        className={styles.image}
                    />
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
