import React, { ReactNode, createContext, useContext, useState } from 'react';
import { AuthContextType, UserData } from '../types/user';

interface AuthContextProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider : React.FC<AuthContextProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const login = (userData : UserData) => {
        setUserData(userData);
    };

    const logout = () => {
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
