// https://softauthor.com/firebase-firestore-add-document-data-using-adddoc/

import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import app from './firebase.config';

export async function doesUsernameExist(username:string) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });

    if (querySnapshot.docs.length) {
        console.log("The user exists!");
    } else {
        console.log("The usr doesn't exists!");
    }

    return querySnapshot.docs.length > 0;
}