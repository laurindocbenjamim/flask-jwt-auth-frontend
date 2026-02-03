import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthStatus } from '../types';
import { authService, userService } from '../services/api';

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIX: Make children optional in type definition to satisfy strict TS checks
export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.IDLE);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setStatus(AuthStatus.UNAUTHENTICATED);
      return;
    }

    setStatus(AuthStatus.LOADING);
    try {
      // Validate token by fetching user profile
      const userData = await userService.getCurrentUser();
      setUser(userData);
      setStatus(AuthStatus.AUTHENTICATED);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('access_token');
      setUser(null);
      setStatus(AuthStatus.UNAUTHENTICATED);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem('access_token', token);
    await checkAuth();
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error("Logout failed on server, clearing local anyway", e);
    }
    localStorage.removeItem('access_token');
    setUser(null);
    setStatus(AuthStatus.UNAUTHENTICATED);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, login, logout, checkAuth }}>
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