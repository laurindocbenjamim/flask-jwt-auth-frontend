import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthStatus } from '../types';
import { userService, authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  logout: () => void;
  checkAuth: () => Promise<void>;
  login: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.IDLE);

  const checkAuth = async () => {
    setStatus(AuthStatus.LOADING);
    try {
      const response = await userService.getCurrentUser();

      if (response && response.user) {
        setUser(response.user);
        setStatus(AuthStatus.AUTHENTICATED);
      } else {
        throw new Error('User data missing');
      }
    } catch (error) {
      setUser(null);
      setStatus(AuthStatus.UNAUTHENTICATED);
    }
  };

  const login = async (token: string) => {
    // Token is stored in HttpOnly cookie by the backend
    await checkAuth();
  };

  const logout = async () => {
    // Clear local state immediately for better UX
    setUser(null);
    setStatus(AuthStatus.UNAUTHENTICATED);

    try {
      await authService.logout();
    } catch (e) {
      // Silent fail - we already cleared the local state
    }

    // Using the specific location format recommended by the backend team
    // for hash-based routing redirects.
    window.location.href = '/#/login';
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, logout, checkAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};