import Link from "next/link";
import AuthButton from "./buttons/AuthButton";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/">[Title]</Link>
                <Link href="/record">기록해요</Link>
                <Link href="/my">MyPage</Link>
                <AuthButton />
            </nav>
        </>
    );
}
