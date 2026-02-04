import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import { User } from '../types';
import { User as UserIcon, Mail, Lock, Phone, MapPin } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    email: '',
    username: '', 
    // using password field in state, though not in User type for security in general app flow, 
    // it's needed for registration payload.
  } as any); 
  // We need to cast because 'password' isn't on the User interface (usually returned from API without password)
  // In a real app, I'd create a separate RegisterRequest interface.

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
        setPassword(e.target.value);
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await userService.register({ ...formData, password } as any);
      // On success, redirect to login
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in">
        {/* Glass morphism card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="mt-2 text-sm text-gray-300">
              Join our engineering community
            </p>
          </div>

          {error && (
            <div className="text-red-300 text-sm bg-red-500/20 border border-red-500/30 p-3 rounded-lg mb-6 animate-pulse">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  required
                  placeholder="First name"
                  value={formData.firstname || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <div className="relative group">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  required
                  placeholder="Last name"
                  value={formData.lastname || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Username */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone number (optional)"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                placeholder="Postal code"
                value={formData.postal_code || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Address */}
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address (optional)"
              value={formData.address || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-400 hover:text-green-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};