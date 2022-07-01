import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../db/firebase.context';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser') || `{}`));
    const firebase:FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);
    
    useEffect(() => {
        const auth = getAuth(firebase);
        const listener = onAuthStateChanged(auth, authUser => {
            if (authUser) 
            {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } 
            else 
            {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
        
        return () => listener();
    }, [firebase]);
    
    return { user };
}