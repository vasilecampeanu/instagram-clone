import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as ROUTES from './constants/routes';

const Dashboard:any = lazy(() => import ('./pages/dashboard'));
const Login:any = lazy(() => import ('./pages/login'));
const NotFound:any = lazy(() => import ('./pages/not-found'));
const Profile:any = lazy(() => import ('./pages/profile'));
const PasswordForgotten:any = lazy(() => import ('./pages/password-forgotten'));
const SignUp:any = lazy(() => import ('./pages/signup'));

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
