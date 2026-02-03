import { AuthResponse, GenericResponse, User, UserListResponse, UserResponse } from '../types';
import { config } from '../config';

const API_BASE_URL = config.API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('access_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async <T,>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.hash = '#/login';
      throw new Error('Unauthorized');
    }
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }
  return response.json();
};

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
  },

  logout: async (): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'GET', // README says GET or DELETE
      headers: getHeaders(),
    });
    return handleResponse<GenericResponse>(response);
  },

  googleLogin: async (idToken: string): Promise<{ success: boolean; redirect: string }> => {
    const formData = new FormData();
    formData.append('id_token', idToken);
    
    const response = await fetch(`${API_BASE_URL}/auth2/google/signin`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<{ success: boolean; redirect: string }>(response);
  },
};

export const userService = {
  register: async (userData: User): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse<GenericResponse>(response);
  },

  getCurrentUser: async (): Promise<User> => {
    // Using admin/user endpoint which returns current logged in user details
    const response = await fetch(`${API_BASE_URL}/admin/user`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await handleResponse<any>(response);
    // Transform the response to match our User interface if necessary
    return {
      email: data.email || 'user@example.com',
      username: data.username || 'User',
      is_administrator: data.is_administrator,
      ...data
    };
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse<UserResponse>(response);
  },

  updateUser: async (id: number, data: Partial<User>): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<UserResponse>(response);
  },

  deleteUser: async (id: number): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse<GenericResponse>(response);
  },
};

export const adminService = {
  getAllUsers: async (): Promise<UserListResponse> => {
    // Using user/manager endpoint for admin listing
    const response = await fetch(`${API_BASE_URL}/user/manager`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse<UserListResponse>(response);
  }
};
