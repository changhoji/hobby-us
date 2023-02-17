import EditUserNameForm from "@/components/forms/EditUserName";
import EditUserPhotoForm from "@/components/forms/EditUserPhoto";

export default function ProfileUpdate() {
    return (
        <>
            <EditUserPhotoForm />
            <EditUserNameForm />
        </>
    );
}
