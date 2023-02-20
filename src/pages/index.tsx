import AuthButton from "@/components/buttons/AuthButton";
import MainRecord from "@/components/common/MainRecord";
import MainUpper from "@/components/common/MainUpper";
import Image from "next/image";
import { fbDB } from "./_app";

export default function Home() {
    return (
        <>
            <MainUpper text="" imageSrc="" />
            <MainRecord />
        </>
    );
}
