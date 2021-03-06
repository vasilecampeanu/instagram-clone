import { FC } from "react";
import UserContext from "../../helpers/user.context";
import { useContext, useState } from "react";
import FirebaseContext from "../../db/firebase.context";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { FirebaseApp } from 'firebase/app';
import { User } from "firebase/auth";

interface Props {
    docId: string;
    totalLikes: number;
    likedPhoto: boolean;
    handleFocus: () => void;
}

const Actions: FC<Props> = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
    // Old Version
    // const {
    //     user: { uid: userId = '' }
    // } = useContext(UserContext);
    const user: User | undefined = useContext<User | undefined>(UserContext);
    const userId = user?.uid;
    console.log(userId);
    
    const [toggleLiked, setToggleLiked] = useState<boolean>(likedPhoto);
    const [likes, setLikes] = useState<number>(totalLikes);
    const firebase: FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);

    const handleToggleLiked = async (toggled:boolean) => {
        setToggleLiked((toggleLiked: boolean) => !toggleLiked);
        
        const db = getFirestore(firebase);
        const photos = doc(db, "photos", docId);

        await updateDoc(photos, {
            // TODO: Look into this. It seems to work but may cause some unexpected errors.
            likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId)
        });
         
        setLikes((likes: number) => (toggleLiked ? likes - 1 : likes + 1));
    }

    return (
        <div className="post-user-actions-wrapper">
            <div className="post-user-actions">
                <svg
                    onClick={() => handleToggleLiked(!toggleLiked)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleToggleLiked(!toggleLiked);
                        }
                    }}
                    className={`w-8 mr-4 select-none cursor-pointer ${
                        toggleLiked ? 'fill-current text-red-500' : 'text-black'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={0}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                <svg
                    onClick={handleFocus}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFocus();
                        }
                    }}
                    className="w-8 text-black-light select-none cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={0}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </div>
            <div className="post-likes">
                <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
        </div>
    )
}

export default Actions;