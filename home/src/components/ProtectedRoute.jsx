// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Use your auth context to get the user

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
