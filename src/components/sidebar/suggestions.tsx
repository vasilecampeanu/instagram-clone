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
        <div>
            <div>
                <p>Suggestions for you</p>
            </div>
            <div>
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