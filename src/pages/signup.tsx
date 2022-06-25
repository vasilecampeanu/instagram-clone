import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import * as ROUTES from '../constants/routes';

import FirebaseContext from '../db/firebase.context';
import { doesUsernameExist } from '../db/firebase.api';

export default function SignUp() {
    // Context hook
    const {firebase} = useContext(FirebaseContext);

    // State hooks
    const [emailAddress, setEmailAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle validation
    const isInvalid = emailAddress === '' || fullName === '' || username === '' || password === '';

    // Navigate hook
    const navigate = useNavigate();

    // Handle signup
    const handleSignUp = async (event:any) => {
        event.preventDefault();
        const authentication = getAuth(firebase);

        const usernameExists = await doesUsernameExist(username);

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
                }).then(() => {
                    addDoc(collectionReference, {
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
        <main id="main">
            <div className="signup-wrapper">
                <div className="login-inner-wrapper">
                    <div className="logo">
                        <p>Instagram</p>
                    </div>
                    <div className="error-message">
                        {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
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
                            <button className={`${ isInvalid && 'opacity-50' }`} type="submit" disabled={isInvalid}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}