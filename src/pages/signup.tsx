import React, { useState, useEffect, useContext, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import * as ROUTES from '../constants/routes';

import FirebaseContext from '../db/firebase.context';
import { doesUsernameExist } from '../db/firebase.api';

const SignUp:FC<any> = () => {
    // Context hook
    const {firebase} = useContext<any>(FirebaseContext);

    // State hooks
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Handle validation
    const isInvalid:boolean = emailAddress === '' || fullName === '' || username === '' || password === '';

    // Navigate hook
    const navigate:any = useNavigate();

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

export default SignUp;