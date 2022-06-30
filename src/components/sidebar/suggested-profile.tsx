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
        <div className="sugested-profile">
            <div className="profile-info">
                <Link className="photo" to={`/profile/${username}`}>
                    <img
                        src={`/assets/scrimba/avatars/${username}.jpg`}
                    />
                </Link>
                <div>
                    <Link to={`/profile/${username}`}>
                        {username}
                    </Link>
                    <p>New to instagram</p>
                </div>
            </div>
            <div className="profile-action">
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