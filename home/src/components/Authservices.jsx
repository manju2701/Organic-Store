// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if there's a stored token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, fetch the user from the backend
            axios.get('http://localhost:5000/user/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error(error);
                localStorage.removeItem('token');
            });
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');  // Clear the token from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
