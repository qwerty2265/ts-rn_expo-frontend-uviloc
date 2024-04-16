import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, UserData } from '../types/user';
import { getData, removeData, storeData } from '../utils/storage';

interface AuthContextProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);
const USER_DATA_KEY = 'access_token'

export const AuthContextProvider : React.FC<AuthContextProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await getData(USER_DATA_KEY);
                if (storedUserData) {
                    setUserData(storedUserData as UserData);
                }
            } 
            catch (error) {
                console.error('Failed to load user data:', error);
            }
        };

        loadUserData();
    }, []);

    const login = async (userData: UserData) => {
        setUserData(userData);
        await storeData({ key: USER_DATA_KEY, value: userData });
      };

    const logout = async () => {
        setUserData(null);
        await removeData(USER_DATA_KEY);
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
