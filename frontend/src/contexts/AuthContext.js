import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext(null);

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // State to track the authenticated user
    const [user, setUser] = useState(null);

    // Function to handle user login
    const login = (userData) => {
        // Perform login logic here
        // Set the authenticated user in the state
        setUser(userData);
    };

    // Function to handle user logout
    const logout = () => {
        // Perform logout logic here
        // Clear the authenticated user from the state
        setUser(null);
    };

    // Value object to be passed to consumers of the AuthContext
    const authContextValue = {
        user,
        login,
        logout,
    };

    // Render the AuthProvider with the authContextValue and children
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the AuthContext, so that we don't need
// to use the useContext(AuthContext) in every component
export const useAuth = () => {
    return useContext(AuthContext);
};