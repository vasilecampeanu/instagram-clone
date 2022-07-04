import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { isUserFollowingProfile, toggleFollow } from "../../db/firebase.api";
import useUser from "../../hooks/use-user";

interface Props {
    photosCount: number;
    followerCount: number,
    setFollowerCount: ({}) => void; // TODO: This may cause errors!
    username: string;
    profile: any;
}

const Header:FC<Props> = ({ 
        photosCount,
        followerCount: followers,
        setFollowerCount,
        username,
        profile: { docId: profileDocId, userId: profileUserId, fullName, following = [] }
}) => {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== username;
    
    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({ 
            followerCount: isFollowingProfile ? followers - 1 : followers + 1 
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };
    
    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        };
        
        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();   
        }
    }, [user.username, profileUserId]);
    
    return(
        <div className="profile-header">
            <div className="profile-photo">
                <img
                    className="my-image"
                    alt={`${username} profile picture`}
                    src={`/assets/scrimba/avatars/${username}.jpg`}
                />
            </div>
            <div className="profile-info">
                <div className="profile-actions">
                    <p >{username}</p>
                    {activeBtnFollow && (
                        <button
                            type="button"
                            onClick={handleToggleFollow}   
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="info">
                    {followers === undefined || following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span>{photosCount}</span> photos
                            </p>
                            <p className="mr-10">
                                <span>{followers}</span> {' '}
                                {followers === 1 ? 'follower' : 'followers'}
                            </p>
                            <p className="mr-10">
                                <span>{following.length}</span> following
                            </p>
                        </>
                    )}
                </div>
                <div className="profile-name">
                    <p>{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;
