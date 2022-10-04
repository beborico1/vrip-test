import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCgFr3huttCUcQHje6V7YT_lmsNEp2f7IU",
    authDomain: "vrip-test.firebaseapp.com",
    projectId: "vrip-test",
    storageBucket: "vrip-test.appspot.com",
    messagingSenderId: "554747918299",
    appId: "1:554747918299:web:82ee00f20c0c3137f2d9fe",
    measurementId: "G-VLXP8JXEQ2"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)