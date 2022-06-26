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
            // console.log(user);
        }
    }, []);

    return (
        <div className="header-inner-wrapper">
            <nav className="navbar">
                <div className="logo">
                    <Link to={ROUTES.PASSWORD_FORGOTTEN}>Instagram</Link>
                </div>
                {user ? (
                    <>
                        <div className="search">
                        </div>
                        <div className="actions">
                            <Link to={ROUTES.DASHBOARD} arial-label="Home">
                                <p>Dashboard</p>
                            </Link>
                            <button
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
                            <div className="flex items-center cursor-pointer">
                                <Link to={`/profile/${user.displayName}`}>
                                    Profile
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </nav>
        </div>
    )
}

export default Header;