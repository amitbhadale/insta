import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { updateProfile } from "firebase/auth";


const firebaseApp = initializeApp({
        apiKey: "AIzaSyDDkfs14ijTEjaP7qvQ_hW8ItneDtrLbJA",
        authDomain: "insta-34f33.firebaseapp.com",
        databaseURL: "https://insta-34f33-default-rtdb.firebaseio.com",
        projectId: "insta-34f33",
        storageBucket: "insta-34f33.appspot.com",
        messagingSenderId: "37558142054",
        appId: "1:37558142054:web:5c8dae5f17cdd3702f99a7"
      }
)
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage();

export {db, storage, ref,doc, setDoc, collection, getDocs, auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged }
// export {db, collection, getDocs, auth, updateProfile }