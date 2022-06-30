import React, { FC, useContext, useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../db/firebase.context';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import UserContext from '../helpers/user.context';

import instagram_logo_hand_written from '../assets/images/instagram_logo_hand_written.png';

const Header:FC<any> = () => {
    const { firebase } = useContext<any>(FirebaseContext);
    const { user } = useContext<any>(UserContext);

    const navigate:any = useNavigate();

    useEffect(() => {
        if (user) {
            console.log(user.email);
        }
    }, []);

    return (
        <div className="header-inner-wrapper">
            <nav className="navbar">
                <div className="instagram-logo">
                    <Link to={ROUTES.DASHBOARD}>
                        <img src={instagram_logo_hand_written} alt="instagram" />
                    </Link>
                </div>
                {user ? (
                    <div className="actions">
                        <div className="left-actions">
                            <div className="search">
                                <input type="text" placeholder="Serach" />
                            </div>
                        </div>
                        <div className="right-actions">
                            <Link className="home" to={ROUTES.DASHBOARD} arial-label="Home">
                            <svg aria-label="Home" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                            </Link>
                            <button
                                className="btnLogOut"
                                type="button"
                                title="Log Out"
                                onClick={() => {
                                    const authentication = getAuth(firebase);
                                    signOut(authentication).then(() => {
                                        console.log("Loged Out!");
                                        navigate('/login');
                                    }).catch((error) => {
                                        console.log(error.message);
                                    });
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                            </button>
                            <div className="profile-icon">
                                <Link className="profile-photo" to={`/profile/${user.displayName}`}>
                                    <img
                                        src={`/assets/scrimba/avatars/${user.displayName}.jpg`}
                                        alt={`${user.displayName} profile picture`}
                                    />
                                </Link>
                            </div>    
                        </div>
                    </div>
                ) : (
                    <div className="actions">
                        <Link to={ROUTES.LOGIN}>
                            <button>
                                Log In
                            </button>
                        </Link>
                        <Link to={ROUTES.SIGN_UP}>
                            <button>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Header;