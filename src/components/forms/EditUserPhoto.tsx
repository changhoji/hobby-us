import { useState } from "react";

export default function EditUserPhotoForm() {
    const [value, setValue] = useState(null);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    console.log(value);

    return (
        <form>
            <input
                type="file"
                accept="image/*"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <input type="submit" value="변경" />
        </form>
    );
}
