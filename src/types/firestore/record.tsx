import {
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp,
    WithFieldValue,
} from "firebase/firestore";

export class Record {
    constructor(
        readonly title: string,
        readonly content: string,
        readonly uid: string,
        readonly userName: string,
        readonly photoURL: string,
        readonly timestamp: Timestamp,
        readonly photos: string[],
        readonly thumbnail: string
    ) {}
}

export const recordConverter = {
    toFirestore(record: WithFieldValue<Record>): DocumentData {
        return {
            title: record.title,
            content: record.content,
            uid: record.uid,
            userName: record.userName,
            photoURL: record.photoURL,
            timestamp: record.timestamp,
            photos: record.photos,
            thumbnail: record.thumbnail,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Record {
        const data = snapshot.data(options)!;
        return new Record(
            data.title,
            data.content,
            data.uid,
            data.userName,
            data.photoURL,
            data.timestamp,
            data.photos,
            data.thumbnail
        );
    },
};

// https://firebase.google.com/docs/reference/js/firestore_.firestoredataconverter?hl=ko
