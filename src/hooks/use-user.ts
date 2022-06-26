import { async } from '@firebase/util';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../helpers/user.context';
import { getUserByUserId } from '../db/firebase.api';

const useUser = () => {
    let userObj:any = {};
    const [activeUser, setActiveUser] = useState(userObj);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getUserObjByUserId = async () => {
            const [response] = await getUserByUserId(user.uid);
            setActiveUser({ ...response });            
        }

        if (user && user.uid) {
            getUserObjByUserId();
        }
    }, [user]);

    return { user: activeUser };
};

export default useUser;