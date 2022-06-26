import React, { FC, useEffect } from 'react';

const NotFound:FC<any> = () => {
    useEffect(() => {
        document.title = '404 - Not Found';
    });

    return (
        <main id="main" className="not-found">
            Not Found
        </main>
    )
}

export default NotFound;