import React, { useState, useEffect, useContext, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import * as ROUTES from '../constants/routes';

import FirebaseContext from '../db/firebase.context';
import { doesUsernameExist } from '../db/firebase.api';

// Assets import
import instagram_logo_hand_written from '../assets/images/instagram_logo_hand_written.png';
import appStore from '../assets/images/appStore.png';
import googlePlay from '../assets/images/googlePlay.png';

import app from '../db/firebase.config';
import { seedDatabase } from '../db/firebase.seed';
import { FirebaseApp } from 'firebase/app';

const SignUp: FC<any> = () => {
    // Context hook
    const firebase: FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);

    // State hooks
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Handle validation
    const isInvalid: boolean = emailAddress === '' || fullName === '' || username === '' || password === '';

    // Navigate hook
    const navigate: any = useNavigate();

    // Handle signup
    const handleSignUp = async (event:any) => {
        event.preventDefault();
        const authentication = getAuth(firebase);

        const usernameExists:boolean = await doesUsernameExist(username);

        if (!usernameExists) {
            await createUserWithEmailAndPassword(
                authentication, 
                emailAddress, 
                password
            ).then((userCredential) => { 
                const user = userCredential.user;
                const db = getFirestore(firebase);
                const collectionReference = collection(db, 'users');
    
                console.log(user);
                
                updateProfile(user, {
                    displayName: username
                }).then(async () => {
                    await addDoc(collectionReference, {
                        userId: userCredential.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [],
                        followers: [],
                        dateCreated: Date.now()
                    }).then(() => {
                        navigate(ROUTES.DASHBOARD);
                    });
                });
            }).catch((error) => {
                setFullName('');
                setError(error.message);
            });   
        } else {
            setUsername('');
            setFullName('');
            setEmailAddress('');
            setPassword('');
            setError('Username already in use!');
        }
    }

    // Use efect hook
    useEffect(() => {
        document.title = 'Instagram | Sign Up';
    }, []);

    return (
        <main id="main" className="signup">
            <div className="signup-wrapper">
                <div className="signup-inner-wrapper">
                    <div className="logo">
                        <img src={instagram_logo_hand_written} alt="" />
                    </div>
                    <div className="signup-info">
                        Sign up to see photos and videos from your friends.
                    </div>
                    <div className="facebook-login">
                        <button>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                <p>Log in with Facebook</p>
                            </div>
                        </button>
                    </div>
                    <div className="separator">
                        <div className="line"></div>
                        <p>OR</p>
                        <div className="line"></div>
                    </div>
                    <div className="signup-form">
                        <form onSubmit={handleSignUp} method="POST">
                            <input
                                type="text" 
                                placeholder="Email address"
                                value={emailAddress}
                                onChange={({ target }) => setEmailAddress(target.value)}
                            />
                            <input
                                type="text" 
                                placeholder="Full name"
                                value={fullName}
                                onChange={({ target }) => setFullName(target.value)}
                            />
                            <input
                                type="text" 
                                placeholder="Username"
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                            <input 
                                placeholder="Password" 
                                type="password"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                            <button className={`${ isInvalid && 'opacity-50' }`} type="submit" disabled={isInvalid}><p>Sign Up</p></button>
                        </form>
                    </div>
                    <div className="error-message">
                        {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                    </div>
                </div>
                <div className="login">
                    <p>Have an account? {' '} <Link to={ROUTES.LOGIN}>Log in</Link></p>
                </div>
                <div className="mobile-download">
                    <p>Get the app.</p>
                    <div>
                        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo"><img src={googlePlay} alt="" /></a>
                        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D23F7635B-D868-4161-B2BE-499B869B3E0D%26utm_content%3Dlo%26utm_medium%3Dbadge"><img src={appStore} alt="" /></a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;