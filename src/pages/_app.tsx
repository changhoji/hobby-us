import Layout from "@/components/layouts/Layout";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

const firebaseConfig = {
    apiKey: "AIzaSyCbRVuW_cmytgaWp2ag0r0r2Oi5n8Ds0zU",
    authDomain: "hobby-us.firebaseapp.com",
    projectId: "hobby-us",
    storageBucket: "hobby-us.appspot.com",
    messagingSenderId: "309055526504",
    appId: "1:309055526504:web:852adb9875268b778a8ddd",
};

export const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
export const fbDB = getFirestore(fbApp);
export const fbStorage = getStorage(fbApp);
