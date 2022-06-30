import { FC, useState, useEffect } from "react";
import { getSuggestedProfiles } from "../../db/firebase.api";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";

const Suggestions:FC<any> = ({ userId }) => {
    const [profiles, setProfiles] = useState<any>(null);
    
    useEffect(() => {
        async function suggestedProfiles() {
            const response:any = await getSuggestedProfiles(userId);
            setProfiles(response);
        }
        if (userId) {
            suggestedProfiles();
        }
    }, [userId]);

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : profiles.length > 0 ? (
        <div className="suggestions-wrapper">
            <div className="section-title">
                <div className="title"><p>Suggestions for you</p></div>
                <div className="user-action">
                    <p>See all</p>
                </div>
            </div>
            <div className="sugestion-list">
                {profiles.map((profile:any) => (
                    <SuggestedProfile
                        key={profile.docId}
                        userDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
    ) : null;
}

export default Suggestions;