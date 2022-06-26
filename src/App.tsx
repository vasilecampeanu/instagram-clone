import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as ROUTES from './constants/routes';

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const NotFound = lazy(() => import ('./pages/not-found'));
const Profile = lazy(() => import ('./pages/profile'));
const PasswordForgotten = lazy(() => import ('./pages/password-forgotten'));
const SignUp = lazy(() => import ('./pages/signup'));

const App:FC = () => {
    return (
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
    );
}

export default App;
