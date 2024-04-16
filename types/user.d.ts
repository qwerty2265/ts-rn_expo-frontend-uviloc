export interface UserData {
    username: string;
    name: string;
    phoneNumber: string;
    email: string;
}

export interface AuthContextType {
    user: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}