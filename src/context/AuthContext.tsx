// pbl5_webFE/src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthHook,type UseAuthReturn } from '@umamusumeenjoyer/shared-logic';

interface AuthContextType extends UseAuthReturn {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authHook = useAuthHook();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');

    if (token) {
      setIsAuthenticated(true);
      if (storedUsername) {
        authHook.fetchUserInfo(storedUsername);
      }
    }
  }, []);

  const loginWithRedirect = async (credentials: { email: string; password: string }) => {
    const result = await authHook.login(credentials);
    if (result.success) {
      setIsAuthenticated(true);
      navigate('/homepagelogin');
    }
    return result;
  };

  const logoutWithRedirect = () => {
    authHook.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authHook,
        isAuthenticated,
        login: loginWithRedirect,
        logout: logoutWithRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};