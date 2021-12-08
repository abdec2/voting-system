import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA8tXLfNazEqJ7dKeQAXw-mPj_tY1yRMyI",
    authDomain: "voting-system-55be1.firebaseapp.com",
    projectId: "voting-system-55be1",
    storageBucket: "voting-system-55be1.appspot.com",
    messagingSenderId: "266031183555",
    appId: "1:266031183555:web:7ae746c0fbef75532ed476"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)