import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider,
        signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwo7PJogsP2O0CRqbds2PyPvw_LXodKuM",
    authDomain: "prontomock-abed0.firebaseapp.com",
    projectId: "prontomock-abed0",
    storageBucket: "prontomock-abed0.appspot.com",
    messagingSenderId: "786548531074",
    appId: "1:786548531074:web:1693a624e6458737f2799b",
    measurementId: "G-RHKRYVX78B"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export function handleSignUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log(cred);
    })
}

export function handleSignIn(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log(cred);
    })
}

export function handleSignInGoogle() {
    signInWithRedirect(auth, provider);
}