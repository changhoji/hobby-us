import Link from "next/link";
import AuthButton from "./buttons/AuthButton";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
    const title = "HOBBY US";
    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.title}>
                    {title}
                </Link>
                <Link href="/record">기록해요</Link>
                <Link href="/my">MY PAGE</Link>
                <AuthButton />
            </nav>
        </>
    );
}
