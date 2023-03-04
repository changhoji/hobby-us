import { Record } from "@/types/firestore/record";
import { QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/MainRecordPreview.module.css";
import { useRouter } from "next/router";

interface Props {
    record: QueryDocumentSnapshot<Record>;
}

export default function MainRecordPreview({ record }: Props) {
    const data = record.data();
    const router = useRouter();

    return (
        <>
            <div
                className={styles.preview}
                onClick={(e) => {
                    router.push(`/record/${record.id}`);
                }}
            >
                <img
                    src={
                        data.thumbnail !== undefined
                            ? data.thumbnail
                            : "/assets/images/background.jpg"
                    }
                    alt="image"
                    className={styles.image}
                />
            </div>
            <style jsx>{`
                #imageContainer {
                    position: relative;
                    width: 12rem;
                    height: 12rem;
                }
            `}</style>
        </>
    );
}
