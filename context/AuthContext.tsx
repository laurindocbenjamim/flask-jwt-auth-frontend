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
    // Check for tokens in URL (OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token') || urlParams.get('access_token');

    if (urlToken) {
      localStorage.setItem('access_token', urlToken);
      // Clean up the URL
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }

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
    // Handle tokens in URL after OAuth redirect
    const handleUrlToken = () => {
      const hash = window.location.hash;
      const search = window.location.search;

      let token = null;

      // 1. Try search parameters (?token=...)
      if (search) {
        const params = new URLSearchParams(search);
        token = params.get('token') || params.get('access_token');
      }

      // 2. Try hash parameters (#/path?token=...)
      if (!token && hash.includes('?')) {
        const queryPart = hash.split('?')[1];
        const params = new URLSearchParams(queryPart);
        token = params.get('token') || params.get('access_token');
      }

      if (token) {
        localStorage.setItem('access_token', token);

        // Clean up URL
        if (search) {
          const newUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, newUrl);
        } else if (hash.includes('?')) {
          const newHash = hash.split('?')[0];
          window.location.hash = newHash;
        }
      }
    };

    handleUrlToken();
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