import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

// Assets import
import mobileImg04 from '../assets/images/showcase04.png';

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

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
                                Instagram
                            </div>
                            <div className="login-form">
                                <form method="POST">
                                    <input 
                                        type="text" 
                                        placeholder="Phone number, username or email address"
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