import React, { FC, useEffect } from 'react';
import useUser from '../hooks/use-user';

const Sidebar:FC<any> = () => {
    const { user: { docId, userId, following, username, fullName } = {} } = useUser();

    return (
        <div className="sidebar-wrapper">
            <p>Hello from Sidebar</p>
        </div>
    )
}

export default Sidebar;