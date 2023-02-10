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
        readonly timestamp: Timestamp
    ) {}
}

export const recordConverter = {
    toFirestore(record: WithFieldValue<Record>): DocumentData {
        return {
            title: record.title,
            content: record.content,
            uid: record.uid,
            timestamp: record.timestamp,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Record {
        const data = snapshot.data(options)!;
        return new Record(data.title, data.content, data.uid, data.timestamp);
    },
};

// https://firebase.google.com/docs/reference/js/firestore_.firestoredataconverter?hl=ko
