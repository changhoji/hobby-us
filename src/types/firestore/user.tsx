import {
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue,
} from "firebase/firestore";

export class User {
    constructor(readonly uid: string, readonly displayName: string) {}
}

export const userConverter = {
    toFirestore(user: WithFieldValue<User>): DocumentData {
        return {
            uid: user.uid,
            displayName: user.displayName,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): User {
        const data = snapshot.data(options)!;
        return new User(data.uid, data.displayName);
    },
};
