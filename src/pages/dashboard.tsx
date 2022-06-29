import React, { FC, useEffect } from 'react';

import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

const Dashboard:FC<any> = () => {

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
                <Timeline />
                <Sidebar />
            </main>
        </div>
    )
}

export default Dashboard;