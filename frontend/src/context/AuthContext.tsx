import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: String;
    email: String;
    role: String;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    googleLogin: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const googleLogin = () => {
        const mockUser: User = {
            name: 'Google User',
            email: 'google_user@example.com',
            role: 'CUSTOMER'
        };
        const mockToken = 'mock-google-token';
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
    };

    const logout = () => {
        localStorage.clear(); // Clear everything including token and user
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
