import React, { useState, useEffect, useContext, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import * as ROUTES from '../constants/routes';

import FirebaseContext from '../db/firebase.context';

// Assets import
import mobileImg04 from '../assets/images/showcase04.png';

const Login:FC<any> = () => {
    // Context hook
    const { firebase } = useContext<any>(FirebaseContext);

    // State hooks
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Handle validation
    const isInvalid:boolean = emailAddress === '' || password === '';

    // Navigate hook
    const navigate:any = useNavigate();

    // Handle login
    const handleLogin:any = async (event:any) => {
        event.preventDefault();
        const authentication = getAuth(firebase);
        await signInWithEmailAndPassword (
            authentication,
            emailAddress, 
            password
        ).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate(ROUTES.DASHBOARD);
        }).catch((error:any) => {
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
        <main id="main">
            <div className="login-wrapper">
                <div className="container-left">
                    <div className="presentation">
                        <img src={mobileImg04} alt="" />
                    </div>
                </div>
                <div className="container-right">
                    <div className="user-actions">
                        <div className="login-inner-wrapper">
                            <div className="logo">
                                <p>Instagram</p>
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
                                    <button className={`${ isInvalid && 'opacity-50' }`} type="submit" disabled={isInvalid}>Log In</button>
                                </form>
                            </div>
                            <div className="separator">
                                OR
                            </div>
                            <div className="password-forgotten">
                                <Link to={ROUTES.PASSWORD_FORGOTTEN}>Forgotten your password?</Link>
                            </div>
                        </div>
                        <div className="signup">
                            Don't have an account? {' '} <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                        </div>
                        <div className="mobile-download">
                            Get the app.
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;