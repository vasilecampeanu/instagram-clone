import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByUserId, updateFollowedUserFollowers } from "../../db/firebase.api";
import { updateUserFollowing } from "../../db/firebase.api";

const SuggestedProfile:FC<any> = ({ userDocId, username, profileId, userId }) => {
    const [followed, setFollowed] = useState(false);
    
    async function handleFollowUser() {
        setFollowed(true);
        const [{ docId }] = await getUserByUserId(userId);
        await updateUserFollowing(docId, profileId, followed);
        await updateFollowedUserFollowers(userDocId, userId, followed);
    }
    
    return !followed ? (
        <div>
            <div>
                <img
                    src={`/assets/scrimba/avatars/${username}.jpg`}
                    alt={`Follow ${username}`}
                />
                <Link to={`/profile/${username}`}>
                    <p>{username}</p>
                </Link>
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : null;
}

export default SuggestedProfile;