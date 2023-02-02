import Navbar from "@/components/Navbar";

export default function Header() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <style jsx>{`
                header {
                    border: 0.2rem solid gray;
                }
            `}</style>
        </>
    );
}
