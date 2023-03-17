import { Record } from "@/types/firestore/record";
import {
    DocumentData,
    QueryDocumentSnapshot,
    Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import styles from "@/styles/RecordPreview.module.css";
import Image from "next/image";

interface Props {
    record: QueryDocumentSnapshot<Record>;
}

export default function RecordPreview({ record }: Props) {
    const data = record.data();

    return (
        <>
            <Link href={`/record/${record.id}`}>
                <div className={styles.post}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={
                                data.thumbnail === undefined
                                    ? "/assets/images/background.jpg"
                                    : data.thumbnail
                            }
                            alt="thumbnail"
                        />
                    </div>
                    <div className={styles.contentContainer}>
                        <h1>{data.title}</h1>
                        <article className={styles.content}>
                            {data.content}
                        </article>
                        <i>by {data.userName}</i>
                        {data.photoURL !== "" && (
                            <Image
                                src={data.photoURL}
                                width="70"
                                height="70"
                                alt="userPhoto"
                            />
                        )}
                    </div>
                </div>
            </Link>
            <style jsx>{`
                i {
                    margin-right: 1rem;
                }
            `}</style>
        </>
    );
}
