import React, { FC, useContext, useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../db/firebase.context';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, User } from 'firebase/auth';
import UserContext from '../helpers/user.context';

import instagram_logo_hand_written from '../assets/images/instagram_logo_hand_written.png';
import { FirebaseApp } from 'firebase/app';
import { NavigateFunction } from 'react-router-dom';
import Modal from './modal';

const Header: FC<{}> = () => {
    const [show, setShow] = useState(false);

    const firebase: FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);
    
    const user: User | undefined = useContext<User | undefined>(UserContext);

    console.log(user);

    const navigate:NavigateFunction = useNavigate();

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
                                <svg aria-label="Home" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </Link>
                            <div className="new-post">
                                <button
                                    className="new-post-btn"
                                    onClick={() => setShow(true)}
                                >
                                    <svg aria-label="New post" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                                </button>
                                <Modal show={show} onClose={() => setShow(false)} />
                            </div>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <div className={`actions ${user ? "login" : "logout"}`}>
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