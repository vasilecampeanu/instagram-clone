import { useState, useEffect, useContext } from 'react';
import UserContext from '../helpers/user.context';
import { getUserByUserId, getUserFollowedPhotos } from '../db/firebase.api';
import { User } from 'firebase/auth';

export default function useFollowedUsersPhotos() {
    const [photos, setPhotos] = useState<any[]>([]);
    
    // const { user: { uid: userId = '' } } = useContext(UserContext);
    const user: User | undefined = useContext<User | undefined>(UserContext);
    const userId:string | undefined = user?.uid;

    useEffect(() => {
        async function getTimelinePhotos() {
            const followingUserIds = await getUserByUserId(userId);

            if (followingUserIds && followingUserIds[0].following.length > 0) {
                const followedUserPhotos: any = await getUserFollowedPhotos(userId, followingUserIds[0].following);

                // We need to call a function that will get us the photos
                followedUserPhotos.sort((a: any, b: any) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
        }

        if (userId !== '') {
            getTimelinePhotos();
        }
    }, [userId]);

    return { photos };
}