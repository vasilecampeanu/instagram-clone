import React, { useState, useEffect, useContext, FC } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import * as ROUTES from '../constants/routes';

import FirebaseContext from '../db/firebase.context';

// Assets import
import mobileImg00 from '../assets/images/showcase04.png';
import mobileImg01 from '../assets/images/showcase02.png';
import mobileImg02 from '../assets/images/showcase03.png';
import mobileImg03 from '../assets/images/showcase01.png';

import instagram_logo_hand_written from '../assets/images/instagram_logo_hand_written.png';
import appStore from '../assets/images/appStore.png';
import googlePlay from '../assets/images/googlePlay.png';

// 

import app from '../db/firebase.config';
import { seedDatabase } from '../db/firebase.seed';

// console.log("Database seeding");
// seedDatabase(app);

import { showcase } from './vanilajs';
import { FirebaseApp } from 'firebase/app';

showcase();

const Login: FC<{}> = () => {
    // Context hook
    const firebase: FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);

    // State hooks
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Handle validation
    const isInvalid: boolean = emailAddress === '' || password === '';

    // Navigate hook
    const navigate:NavigateFunction = useNavigate();

    // Handle login
    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const authentication = getAuth(firebase);

        await signInWithEmailAndPassword (
            authentication,
            emailAddress,
            password
        ).then((userCredential) => {
            const user = userCredential.user;
            // console.log(user);
            navigate(ROUTES.DASHBOARD);
        }).catch((error) => {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        });
    }

    // Use efect hook
    useEffect(() => {
        document.title = 'Instagram | Log In';
    }, []);

    return (
        <main id="main" className="login-page">
            <div className="login-wrapper">
                <div className="container-left">
                    <div className="presentation">
                        <div className="image-showcase">
                            <img id="img-00" className="img-00" src={mobileImg00} alt="" />
                            <img id="img-01" className="img-01" src={mobileImg01} alt="" />
                            <img id="img-02" className="img-02" src={mobileImg02} alt="" />
                            <img id="img-03" className="img-03" src={mobileImg03} alt="" />
                        </div>
                    </div>
                </div>
                <div className="container-right">
                    <div className="user-actions">
                        <div className="login-inner-wrapper">
                            <div className="logo">
                                <img src={instagram_logo_hand_written} alt="instagram" />
                            </div>
                            <div className="error-message">
                                {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                            </div>
                            <div className="login-form">
                                <form onSubmit={handleLogin} method="POST">
                                    <input 
                                        type="text" 
                                        placeholder="Email address"
                                        value={emailAddress}
                                        onChange={({ target }) => setEmailAddress(target.value)}
                                        />
                                    <input 
                                        placeholder="Password" 
                                        type="password"
                                        value={password}
                                        onChange={({ target }) => setPassword(target.value)}
                                    />
                                    <button className={`${ isInvalid && 'opacity-50' }`} type="submit" disabled={isInvalid}><p>Log In</p></button>
                                </form>
                            </div>
                            <div className="separator">
                                <div className="line"></div>
                                <p>OR</p>
                                <div className="line"></div>
                            </div>
                            <div className="facebook-login">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                <p>Log in with Facebook</p>
                            </div>
                            <div className="password-forgotten">
                                <a href="">Forgotten your password?</a>
                            </div>
                        </div>
                        <div className="signup">
                            <p>Don't have an account? {' '} <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
                        </div>
                        <div className="mobile-download">
                            <p>Get the app.</p>
                            <div>
                                <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo"><img src={googlePlay} alt="" /></a>
                                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D23F7635B-D868-4161-B2BE-499B869B3E0D%26utm_content%3Dlo%26utm_medium%3Dbadge"><img src={appStore} alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;