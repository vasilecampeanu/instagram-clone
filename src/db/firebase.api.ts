// https://softauthor.com/firebase-firestore-add-document-data-using-adddoc/

import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { FC } from 'react';
import app from './firebase.config';

export const doesUsernameExist = async (username:string) => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length) {
        console.log("The user exists!");
    } else {
        console.log("The user doesn't exists! Authentification made with succes!");
    }

    return querySnapshot.docs.length > 0;
}

export const getUserByUserId = async (userId:any) => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const user = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
    }));
    
    return user;
}

export async function getUserFollowedPhotos(userId:any, followingUserIds:any) {
    const db = getFirestore(app);
    const q = query(collection(db, "photos"), where("userId", "in", followingUserIds));
    const querySnapshot = await getDocs(q);
        
    const userFollowedPhotos:any[] = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    const photosWithUserDetails = await Promise.all (
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user:any = await getUserByUserId(photo.userId);
            const username = user[0].username;
            return { username, ...photo, userLikedPhoto };
        })
    )

    return photosWithUserDetails;
}