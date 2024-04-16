export interface UserData {
    username: string;
    name: string;
    phoneNumber: string;
    email: string;
    accessToken: string;
}

export interface AuthContextType {
    userData: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}