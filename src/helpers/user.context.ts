import { User } from 'firebase/auth';
import { createContext } from 'react';

const UserContext:React.Context<User | undefined> = createContext<User | undefined>(undefined);
export default UserContext;