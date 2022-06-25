import React, { useEffect } from 'react';

export default function NotFound() {
    useEffect(() => {
        document.title = '404 - Not Found';
    });

    return (
        <main id="main" className="not-found">
            Not Found
        </main>
    )
}