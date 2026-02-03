import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import { User } from '../types';

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
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  required
                  value={formData.firstname || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  required
                  value={formData.lastname || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="mt-1">
                    <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                    />
                </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>

             <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <div className="mt-1">
                    <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                    />
                </div>
            </div>

             <div className="sm:col-span-3">
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <div className="mt-1">
                    <input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    value={formData.postal_code || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                    />
                </div>
            </div>

             <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1">
                    <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md border p-2"
                    />
                </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};