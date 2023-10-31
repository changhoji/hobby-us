import Image from "next/image";
import styles from "@/styles/MainUpper.module.css";

export default function MainUpper() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.text}>
                    나의 취미를 기록하고
                    <br /> 다른 사람과 공유해보세요
                </div>
                <div className={styles.image}>
                    <Image
                        fill
                        src="/assets/images/main.png"
                        alt="mainImage"
                    />
                </div>
            </div>
        </>
    );
}
