// https://softauthor.com/firebase-firestore-add-document-data-using-adddoc/

import { getFirestore, query, collection, where, getDocs, doc, updateDoc, arrayRemove, arrayUnion, limit } from 'firebase/firestore';
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

export const getUserByUserId:any = async (userId:any) => {
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

export async function updateUserFollowing(docId:any, profileId:any, isFollowingProfile:any) {
    const db = getFirestore(app);
    const photos = doc(db, "users", docId);

    await updateDoc(photos, {
        // TODO: Look into this. It seems to work but may cause some unexpected errors.
        following: isFollowingProfile ? arrayRemove(profileId) : arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(docId:any, followingUserId:any, isFollowingProfile:any) {
    const db = getFirestore(app);
    const photos = doc(db, "users", docId);

    await updateDoc(photos, {
        // TODO: Look into this. It seems to work but may cause some unexpected errors.
        following: isFollowingProfile ? arrayRemove(followingUserId) : arrayUnion(followingUserId)
    });
}

export async function toggleFollow(
    isFollowingProfile:any,
    activeUserDocId:any,
    profileDocId:any,
    profileId:any,
    followingUserId:any
) {
    await updateUserFollowing(activeUserDocId, profileId, isFollowingProfile);
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}

export async function getSuggestedProfiles(userId:any) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), limit(10));
    const querySnapshot = await getDocs(q);
    const [{ following }] = await getUserByUserId(userId);
    return querySnapshot.docs.map((user:any) => (
        { ...user.data(), docId: user.id }
    )).filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}