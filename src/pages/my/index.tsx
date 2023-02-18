import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { fbAuth } from "../_app";

export default function MyPage() {
    const [user, loading, error] = useAuthState(fbAuth);

    return (
        <>
            {user && (
                <>
                    <div>{"닉네임: " + user.displayName}</div>
                    <Image
                        src={user.photoURL}
                        alt="유저 이미지"
                        width="100"
                        height="100"
                    />
                </>
            )}
            <Link href="/my/edit">프로필 수정</Link>
        </>
    );
}
