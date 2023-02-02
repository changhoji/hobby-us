import Link from "next/link";
import AuthButton from "./buttons/AuthButton";

export default function Navbar() {
    return (
        <>
            <nav>
                <Link href="/">[Title]</Link>
                <Link href="/record">기록해요</Link>
                <Link href="/my">MyPage</Link>
                <AuthButton />
            </nav>
            <style jsx>{`
                nav {
                    display: flex;
                    justify-content: space-around;
                    background-color: powderblue;
                    padding: 1rem;
                }
            `}</style>
        </>
    );
}
