import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedUser = localStorage.getItem('app_user');
                const storedToken = localStorage.getItem('auth_token');

                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Failed to restore auth session:', error);
                localStorage.removeItem('app_user');
                localStorage.removeItem('auth_token');
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const loginWithCredentials = async (email, password) => {
        setLoading(true);
        try {
            

            // Mock API Response Delay
            await new Promise((resolve) => setTimeout(resolve, 2500));

            // Mock User Data based on email input for easy testing
            let role = 'employee'; // Default role
            if (email.includes('admin')) role = 'admin';

            const mockUser = {
                id: '123',
                email,
                name: email.split('@')[0],
                role: role,
            };
            const mockToken = 'mock-jwt-token-xyz';

            // Persist session
            localStorage.setItem('app_user', JSON.stringify(mockUser));
            localStorage.setItem('auth_token', mockToken);

            setUser(mockUser);
            return { success: true, role: mockUser.role };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                error: error.message || 'Invalid credentials',
            };
        } finally {
            setLoading(false);
        }
    };

    // SSO Login Success Handler (invoked by SSOCallback.jsx)
    const handleSSOSuccess = (userData, token) => {
        localStorage.setItem('app_user', JSON.stringify(userData));
        localStorage.setItem('auth_token', token);
        setUser(userData);
    };

    // Logout Handler
    const logout = () => {
        localStorage.removeItem('app_user');
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        loginWithCredentials,
        handleSSOSuccess,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
