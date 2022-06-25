import React, { useEffect } from 'react';

import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

export default function Dashboard() {

    // Use effect hook
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <div className="dashboard-wrapper">
            <header id="header">
                <Header />
            </header>
            <main id="main">
                <Timeline />
                <Sidebar />
            </main>
        </div>
    )
}