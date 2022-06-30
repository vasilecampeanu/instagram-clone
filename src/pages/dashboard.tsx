import React, { FC, useEffect, useContext } from 'react';
import UserContext from '../helpers/user.context';

import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

const Dashboard:FC<any> = () => {
    const { user } = useContext<any>(UserContext);

    // Use effect hook
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <div className="dashboard-wrapper">
            <header id="header">
                <Header />
            </header>
            <main id="main" className="dashboard">
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
            </main>
        </div>
    )
}

export default Dashboard;