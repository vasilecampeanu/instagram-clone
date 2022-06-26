// https://softauthor.com/firebase-firestore-add-document-data-using-adddoc/

import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { FC } from 'react';
import app from './firebase.config';

export const doesUsernameExist = async (username:string) => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });

    if (querySnapshot.docs.length) {
        console.log("The user exists!");
    } else {
        console.log("The user doesn't exists! Authentification made with succes!");
    }

    return querySnapshot.docs.length > 0;
}