import React from 'react';
import FirebaseContext from './db/firebase.context';
import app from './db/firebase.config';
import { db } from './db/firebase.config';

function App() {
    return (
        <FirebaseContext.Provider value={{ app, db }}>
            <div className="instagram-clone-inner-wrapper">
                <h1>Hello world!</h1>
                <p>This is just a regullar test!</p>
            </div>
        </FirebaseContext.Provider>
    );
}

export default App;
