import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(formData);
      if (response.access_token) {
        await login(response.access_token);
        navigate('/dashboard');
      } else {
        setError('Login failed: No access token received.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Simulated Google Login Handler
  // Note: Actual Google OAuth requires a client_id and script setup in index.html
  // This simulates sending the token to the backend
  const handleGoogleMock = async () => {
    setLoading(true);
    try {
      // In a real app, this token comes from Google's library
      const mockIdToken = "mock_google_id_token_" + Date.now(); 
      await authService.googleLogin(mockIdToken);
      // Assuming backend sets a cookie or returns a token. 
      // For this specific README flow, usually Google Auth redirects or sets cookies.
      // We will assume success for UI demo purposes.
      alert("Google Auth simulated. In a real app, this initiates the OAuth flow.");
    } catch (err: any) {
      console.error(err);
      // Depending on backend implementation, it might fail without real token
      setError('Google Sign-In failed (Mock).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              start your 14-day free trial
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text" // README says username could be email
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm pl-10"
                placeholder="Email address or Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm pl-10"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleMock}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 20.45c4.6667 0 8.0834-3.25 8.0834-8.0833 0-.75-.0834-1.4584-.2084-2.125h-7.875v3.9166h4.5417c-.2084 1.25-1.0417 2.3334-2.1667 3.0834v2.5416h3.5c2.0416-1.875 3.2083-4.625 3.2083-7.9166 0-.625-.0833-1.25-.2083-1.8334h-11.0834v-3.75h-3.7917v3.75h-3.7916c-1.375 0-2.5 1.125-2.5 2.5 0 1.375 1.125 2.5 2.5 2.5h3.7916v3.75h3.7917v-3.75h7.625c.625 0 1.2083-.2083 1.7083-.5416l-2.625-2.25c-.5416.4166-1.25.6666-2.0416.6666-1.7084 0-3.1667-1.1666-3.6667-2.75h-3.7083v2.875c1.8333 3.625 5.5833 6.0833 9.9166 6.0833z"
                  fill="#4285F4"
                />
                <path
                  d="M12.0003 20.45c-4.3333 0-8.0833-2.4583-9.9166-6.0833l3.7083-2.875c.5 1.5834 1.9583 2.75 3.6667 2.75 1.0833 0 2.0833-.375 2.875-1.0416l2.625 2.25c-1.625 1.5-3.875 2.375-6.4584 2.375z"
                  fill="#34A853"
                />
                <path
                  d="M12.0003 4.75c1.5833 0 3.0417.5833 4.1667 1.5417l3.0833-3.0834C17.3336 1.4583 14.8336.5 12.0003.5 7.667.5 3.9169 2.9583 2.0836 6.5833l3.7083 2.875c.5-1.5833 1.9584-2.75 3.6667-2.75z"
                  fill="#EA4335"
                />
                <path
                  d="M5.7919 9.4583c-.25.75-.375 1.5417-.375 2.375s.125 1.625.375 2.375L2.0836 17.0833C.75 14.625 0 11.875 0 9s.75-5.625 2.0836-8.0833l3.7083 2.875z"
                  fill="#FBBC05"
                />
              </svg>
              <span className="ml-2">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
