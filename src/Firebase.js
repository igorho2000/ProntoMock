import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCwo7PJogsP2O0CRqbds2PyPvw_LXodKuM",
    authDomain: "www.prontomock.com",
    projectId: "prontomock-abed0",
    storageBucket: "prontomock-abed0.appspot.com",
    messagingSenderId: "786548531074",
    appId: "1:786548531074:web:1693a624e6458737f2799b",
    measurementId: "G-RHKRYVX78B"
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage();

// export function useUpdateUserDatabase() {
//     const currentProject = useSelector(selectCurrentProject);
//     const everyProject = useSelector(selectEveryProject);
//     const user = useSelector(selectUser);

//     var projectIDs = everyProject.map((item) => (item.id))
//     projectIDs.unshift(currentProject[0].id);

//     React.useEffect(() => {
//         setDoc(doc(db, 'user', user.id), {projects: projectIDs});
//     }, [])
//     console.log(projectIDs)
// }

// export function useUpdateProjectDatabase() {
//     const currentProject = useSelector(selectCurrentProject);
//     const everyProject = useSelector(selectEveryProject);
//     React.useEffect(() => {
//         setDoc(doc(db, 'projects', currentProject[0].id), currentProject[0]);
//         console.log(currentProject[0])
//         for (let i = 0; i < everyProject.length; i++) {
//             setDoc(doc(db, 'projects', everyProject[i].id), everyProject[i]);
//             console.log(everyProject[i]);
//         }
//     }, [])
// }