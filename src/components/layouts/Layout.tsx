import { fbApp, fbAuth } from "@/pages/_app";
import { User } from "@firebase/auth";
import { useEffect, useState } from "react";
import Header from "../Header";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
}
