import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAG74_ymoLZIIwA0qk6rkd3RR27hqCKagw",
    authDomain: "instagram-clone-7b13f.firebaseapp.com",
    projectId: "instagram-clone-7b13f",
    storageBucket: "instagram-clone-7b13f.appspot.com",
    messagingSenderId: "323499855249",
    appId: "1:323499855249:web:939a2622e204818c225e30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

// Export app by default
export default app;