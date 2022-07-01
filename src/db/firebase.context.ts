import { FirebaseApp } from 'firebase/app';
import { createContext } from 'react';
import app from '../db/firebase.config';

// TODO: const FirebaseContext:FirebaseApp|undefined = createContext<FirebaseApp | undefined>(undefined);
const FirebaseContext:React.Context<FirebaseApp | undefined> = createContext<typeof app | undefined>(undefined);
export default FirebaseContext;