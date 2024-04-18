import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, UserData } from '../types/user';
import { getData, removeData, storeData } from '../utils/storage';

interface AuthContextProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider : React.FC<AuthContextProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await getData('user_data');
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

    const login = async (userData: UserData, userToken: string) => {
        setUserData(userData);
        
        await Promise.all([
            storeData({ key: 'user_data', value: userData }),
            storeData({ key: 'access_token', value: userToken })
        ]);
      };

    const logout = async () => {
        setUserData(null);

        await Promise.all([
            await removeData('user_data'),
            await removeData('access_token')
        ]);
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
