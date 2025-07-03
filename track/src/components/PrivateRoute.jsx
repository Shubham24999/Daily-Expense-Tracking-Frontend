// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const userLoggedIn = !!localStorage.getItem('token');
    return userLoggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoute;
