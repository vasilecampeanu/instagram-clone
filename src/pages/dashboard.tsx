import React, { FC, useEffect, useContext } from 'react';
import UserContext from '../helpers/user.context';
import { User } from 'firebase/auth';

import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

const Dashboard: FC<{}> = () => {
    const user: User | undefined = useContext<User | undefined>(UserContext);

    console.log(user);

    // Use effect hook
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <>
            <header id="header">
                <Header />
            </header>
            <main id="main" className="dashboard">
                <div className={`dashboard-wrapper ${user ? "login" : "logout"}`}>
                    {user ? (
                        <>
                            <Timeline />
                            <Sidebar />
                        </>
                    ) : (
                        <>
                            You need to be logged in to see this section!
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export default Dashboard;