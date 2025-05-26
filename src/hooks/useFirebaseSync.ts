// src/hooks/useFirebaseSync.ts
import {useEffect, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';

// 항목 타입 정의
interface CheckboxItem {
    checked: boolean;
    lastBy: string | null;
    timestamp?: number;
}

// items 객체 타입 정의
interface ItemsState {
    [key: string]: CheckboxItem;
}

const firebaseConfig = {
    // 기존 설정 유지
    apiKey: "AIzaSyBIOubQeW0gCpXbxaXkWgvitEnsbtRwtqk",
    authDomain: "multinote-cc100.firebaseapp.com",
    projectId: "multinote-cc100",
    storageBucket: "multinote-cc100.firebasestorage.app",
    messagingSenderId: "517702603717",
    appId: "1:517702603717:web:5266b1e6708e2b6a8931ac",
    measurementId: "G-CGQF9D0PFG",
    databaseURL: "https://multinote-cc100-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function useFirebaseSync(path: string, userId: string) {
    const [items, setItems] = useState<ItemsState>({});

    useEffect(() => {
        const itemsRef = ref(db, path);
        const unsubscribe = onValue(itemsRef, (snapshot) => {
            setItems(snapshot.val() || {});
        });

        return () => unsubscribe();
    }, [path]);

    const updateItem = (id: string, checked: boolean) => {
        set(ref(db, `${path}/${id}`), {
            checked,
            lastBy: userId,
            timestamp: Date.now()
        });
    };

    return {items, updateItem};
}