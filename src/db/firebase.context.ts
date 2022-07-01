import { FirebaseApp } from 'firebase/app';
import { createContext } from 'react';
import app from '../db/firebase.config';

const FirebaseContext:React.Context<FirebaseApp | undefined> = createContext<FirebaseApp | undefined>(undefined);
export default FirebaseContext;