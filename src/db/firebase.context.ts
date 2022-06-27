import { createContext } from 'react'

// TODO: const FirebaseContext:FirebaseApp|undefined = createContext<FirebaseApp | undefined>(undefined);
const FirebaseContext:any = createContext<any|null>(null);
export default FirebaseContext;