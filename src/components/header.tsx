import React, { FC, useContext, useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../db/firebase.context';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import UserContext from '../helpers/user.context';

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
                <div className="insta-logo">
                    <Link to={ROUTES.DASHBOARD}>Instagram</Link>
                </div>
                {user ? (
                    <div className="actions">
                        <div className="left-actions">
                            <div className="search">
                            </div>
                        </div>
                        <div className="right-actions">
                            <Link className="home" to={ROUTES.DASHBOARD} arial-label="Home">
                                <p>Dashboard</p>
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
                                Sign Out
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