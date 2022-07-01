import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../db/firebase.api';
import Header from '../components/header';
import UserProfile from '../components/profile';

const Profile: FC<any> = () => {
    const { username } = useParams();
    const [userExists, setUserExists] = useState<any>(undefined);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function checkUserExistsToLoadProfile() {
            const doesUserExist = await getUserByUsername(username);

            if (!doesUserExist) {
                navigate(ROUTES.NOT_FOUND);
            } else {
                setUserExists(true);
            }
        }
        checkUserExistsToLoadProfile();
    }, [username, navigate])
    
    return userExists ? (
        <div className="profile-wrapper">
            <header>
                <Header />
            </header>
            <main id="main">
                <UserProfile username={username} />
            </main>
        </div>
    ) : null;
}

export default Profile;