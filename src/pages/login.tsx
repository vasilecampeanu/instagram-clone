import React from 'react';

import mobileImg04 from '../assets/images/showcase04.png';

export default function Login() {
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
                                    <input placeholder="Phone number, username or email address" type="text" />
                                    <input placeholder="Password" type="password" />
                                    <button type="submit">Log In</button>
                                </form>
                            </div>
                            <div className="separator">
                                OR
                            </div>
                            <div className="password-forgotten">
                                <a href="#">Forgotten your password?</a>
                            </div>
                        </div>
                        <div className="signup">
                            Don't have an account? <a href="#">Sign up</a>
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