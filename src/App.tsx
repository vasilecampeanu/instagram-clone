import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as ROUTES from './constants/routes';
import UserContext from './helpers/user.context';
import useAuthenticationListener from './hooks/use-auth-listener';

const Dashboard:React.LazyExoticComponent<React.FC<{}>> = lazy(() => import ('./pages/dashboard'));
const Login:React.LazyExoticComponent<React.FC<{}>> = lazy(() => import ('./pages/login'));
const NotFound:React.LazyExoticComponent<React.FC<{}>> = lazy(() => import ('./pages/not-found'));
const Profile:React.LazyExoticComponent<React.FC<{}>> = lazy(() => import ('./pages/profile'));
const PasswordForgotten:React.LazyExoticComponent<React.FC<{}>> = lazy(() => import ('./pages/password-forgotten'));
const SignUp:React.LazyExoticComponent<React.FC<{}>> = lazy(() => import ('./pages/signup'));

const App:FC<{}> = () => {
    const {user} = useAuthenticationListener();
    
    console.log(user);

    return (
        <UserContext.Provider value={ user }>
            <Router>
                <Suspense fallback={ <p>Loading...</p> }>
                    <Routes>
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.PROFILE} element={<Profile />} />
                        <Route path={ROUTES.PASSWORD_FORGOTTEN} element={<PasswordForgotten />} />
                        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
