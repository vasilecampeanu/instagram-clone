import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as ROUTES from './constants/routes';

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const NotFound = lazy(() => import ('./pages/not-found'));
const Profile = lazy(() => import ('./pages/profile'));
const SignUp = lazy(() => import ('./pages/signup'));

function App() {
    return (
        <Router>
            <Suspense fallback={ <p>Loading...</p> }>
                <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                    <Route path={ROUTES.PROFILE} element={<Profile />} />
                    <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
