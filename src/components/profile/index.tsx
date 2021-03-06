import { FC, useEffect, useReducer } from "react";
import { getUserByUsername, getUserPhotosByUsername } from "../../db/firebase.api";
import Header from "./header";
import Photos from "./photos";

const reducer = (state: any, newState: any) => ({ ...state, ...newState });

const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0
};

interface Props {
    username: string;
}

const UserProfile:FC<Props> = ({ username }) => {
    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
    );
    
    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const [{ ...user }] = await getUserByUsername(username);
            const photos = await getUserPhotosByUsername(username);
            console.log(photos);
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
        }

        getProfileInfoAndPhotos();
    }, [username]);

    return(
        <>
            <div className="profile-wrapper">
                <Header 
                    photosCount={photosCollection ? photosCollection.length : 0}
                    profile={profile}
                    followerCount={followerCount}
                    setFollowerCount={dispatch}
                    username={username}
                />
                <Photos photos={photosCollection} />
            </div>
        </>
    )
}

export default UserProfile;