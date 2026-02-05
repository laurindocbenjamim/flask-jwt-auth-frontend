import { AuthResponse, GenericResponse, User, UserListResponse, UserResponse } from '../types';
import { config } from '../config';

const API_BASE_URL = config.API_BASE_URL;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};

const handleResponse = async <T,>(response: Response): Promise<T> => {
  if (!response.ok) {
    if (response.status === 401) {
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
      headers: getHeaders(),
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    return handleResponse<AuthResponse>(response);
  },

  logout: async (): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<GenericResponse>(response);
  },

  googleLogin: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/google/login`;
  },

  googleLogout: async (): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth2/google/logout`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<GenericResponse>(response);
  },

  githubLogin: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/github/login`;
  },

  githubSignIn: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/github/signin`;
  },

  githubLogout: async (): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth2/github/logout`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<GenericResponse>(response);
  },
};

export const userService = {
  register: async (userData: User): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
      credentials: 'include',
    });
    return handleResponse<GenericResponse>(response);
  },

  getCurrentUser: async (): Promise<{ success: boolean; user: User }> => {
    const response = await fetch(`${API_BASE_URL}/admin/user`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });

    const data = await handleResponse<{ success: boolean; user: any }>(response);

    if (data.user) {
      data.user = {
        ...data.user,
        id: data.user.id,
        email: data.user.email || '',
        username: data.user.username || '',
        is_administrator: data.user.is_administrator || false,
      };
    }

    return data;
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao/${id}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<UserResponse>(response);
  },

  updateUser: async (id: number, data: Partial<User>): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse<UserResponse>(response);
  },

  deleteUser: async (id: number): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/dao/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<GenericResponse>(response);
  },
};

export const adminService = {
  getAllUsers: async (): Promise<UserListResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/manager`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<UserListResponse>(response);
  }
};
