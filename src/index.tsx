import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';

import app from './db/firebase.config';
import FirebaseContext from './db/firebase.context';

const root = ReactDOM.createRoot(
    document.getElementById('instagram-clone') as HTMLElement
);

root.render(
    <FirebaseContext.Provider value={{ app }}>
        <App />
    </FirebaseContext.Provider>
);

reportWebVitals();
