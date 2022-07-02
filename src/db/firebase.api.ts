// https://softauthor.com/firebase-firestore-add-document-data-using-adddoc/

import { User } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs, doc, updateDoc, arrayRemove, arrayUnion, limit, QuerySnapshot, DocumentData } from 'firebase/firestore';
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

export const getUserByUserId:any = async (userId:string) => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const user = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
    }));
    
    return user;
}

export const getUserByUsername:any = async (username:string) => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    const user = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
    }));
    
    return user;
}

export async function getUserFollowedPhotos(userId:string | undefined, followingUserIds:string) {
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
            const user: any = await getUserByUserId(photo.userId);
            const username = user[0].username;
            return { username, ...photo, userLikedPhoto };
        })
    )

    return photosWithUserDetails;
}

export async function getUserIdByUsername(username:string) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
        
    const [{ userId = null }] = querySnapshot.docs.map((item) => ({
        ...item.data(),
    }));
    
    return userId;
}

export async function getUserPhotosByUsername(username:string) {
    const userId = await getUserIdByUsername(username);
    const db = getFirestore(app);
    const q = query(collection(db, "photos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
        
    const photos = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return photos;
}

export async function updateUserFollowing(docId:string, profileId:string, isFollowingProfile:boolean) {
    const db = getFirestore(app);
    const photos = doc(db, "users", docId);

    await updateDoc(photos, {
        // TODO: Look into this. It seems to work but may cause some unexpected errors.
        following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(docId:string, followingUserId:string, isFollowingProfile:boolean) {
    const db = getFirestore(app);
    const photos = doc(db, "users", docId);

    await updateDoc(photos, {
        // TODO: Look into this. It seems to work but may cause some unexpected errors.
        following: isFollowingProfile ? arrayRemove(followingUserId) : arrayUnion(followingUserId)
    });
}

export async function toggleFollow(
    isFollowingProfile:boolean,
    activeUserDocId:string,
    profileDocId:string,
    profileId:string,
    followingUserId:string
) {
    await updateUserFollowing(activeUserDocId, profileId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}

export async function getSuggestedProfiles(userId:string) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), limit(10));
    const querySnapshot = await getDocs(q);
    const [{ following }] = await getUserByUserId(userId);
    return querySnapshot.docs.map((user:any) => (
        { ...user.data(), docId: user.id }
    )).filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function isUserFollowingProfile(activeUsername:string, profileUserId:string) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", activeUsername), where('following', 'array-contains', profileUserId));
    const querySnapshot = await getDocs(q);

    const [response = {}]:any = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    
    return !!response.fullName;
}