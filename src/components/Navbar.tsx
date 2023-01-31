import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/my">MyPage</Link>
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
