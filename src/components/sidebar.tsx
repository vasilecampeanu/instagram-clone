import React, { FC, useEffect } from 'react';
import useUser from '../hooks/use-user';

const Sidebar:FC<any> = () => {
    const { user: { docId, userId, following, username, fullName } = {} } = useUser();
    console.log(fullName);

    return (
        <p>Hello from Sidebar</p>
    )
}

export default Sidebar;