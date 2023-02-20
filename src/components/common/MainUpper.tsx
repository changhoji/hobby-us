import Image from "next/image";
import styles from "@/styles/MainUpper.module.css";

interface Props {
    text: string;
    imageSrc: string;
}

export default function MainUpper(props: Props) {
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
                        src="https://s3-alpha-sig.figma.com/img/e676/7b60/16df3fd0be33bd0d5b7862e3bf85046b?Expires=1678060800&Signature=qe8pbdHafDFfqcK-Qdw1sA7nLiB5KGB44xvEW4p6GutzRzT2Obk29T-0Ca1WQ7PiILY7BNhEnM-s6LmxZr8pybzJRQbIuxu-9HUN1bwGWrjepnB0PMtYw4eY1la2Bj0yQMhu3s-qui75ewMaBQZ7fUaWRCPDdHXJQ8~1othNIcfPWbMtWBAC9mWnScmWf6Ta9zamEiuY5YcyEiY~Eb2IpUmNONv0rWN1Um6RtZxpDw2wxk~zw2Q2lcTbn9~h~oj9vch9znqViDS4kuIket2OpId49dxpp5ZAZRLC37e~mi3vl0mIi60HF1T8QAl~BS3IzbJXiFtgyzeLipCb2z~7BA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="mainImage"
                    />
                </div>
            </div>
        </>
    );
}
