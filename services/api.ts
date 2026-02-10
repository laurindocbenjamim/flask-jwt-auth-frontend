import axios, { AxiosError } from 'axios';
import { AuthResponse, GenericResponse, User, UserListResponse, UserResponse, DriveFile, DriveListResponse, RegisterRequest } from '../types';
import { config } from '../config';

const API_BASE_URL = config.API_BASE_URL;

// Create centralized Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Key for handling HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get cookie by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// Request Interceptor: Inject token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Inject CSRF token from cookie if available
    // Try common names for CSRF cookies
    const csrfToken = getCookie('csrf_access_token') || getCookie('csrf_token');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    // Axios wraps the response data in a 'data' property. 
    // If the backend returns the actual payload directly, we return response.data.
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      const errorData = error.response.data as any;
      const errorMessageStr = errorData?.msg || errorData?.message || errorData?.error;

      if (error.response.status === 401) {
        // Check if it's a CSRF error
        if (errorMessageStr === "Missing CSRF token") {
          console.warn("CSRF Token missing, but session might still be valid.");
          // Do NOT redirect to login, just let the error propagate
        } else {
          // Clear token on unauthorized access
          localStorage.removeItem('token');
          // Ideally redirect to login, but handling via window.location for now as this is outside React context
          if (!window.location.hash.includes('login')) {
            window.location.href = '/#/login';
          }
        }
      }
      // Return error message from backend if available
      console.log('Error from backend:', errorData); // Log for debugging

      let errorMessage = errorMessageStr || `HTTP Error ${error.response.status}`;

      // Ensure the error message is a string, not an object
      if (typeof errorMessage === 'object' && errorMessage !== null) {
        // If it's an object (like Flask-RESTful reqparse errors), extract the values
        const values = Object.values(errorMessage);
        if (values.length > 0) {
          // Join multiple error messages if present
          errorMessage = values.join(' ');
        } else {
          // Fallback for empty objects
          errorMessage = JSON.stringify(errorMessage);
        }
      }

      const customError: any = new Error(errorMessage);
      customError.response = error.response;
      return Promise.reject(customError);
    }
    return Promise.reject(new Error('An error occurred. Please check your network connection.'));
  }
);

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', credentials);
  },

  logout: async (mode: 'full' | 'soft' = 'full'): Promise<GenericResponse> => {
    return apiClient.post('/auth/logout', { mode });
  },

  disconnectProvider: async (provider: string): Promise<GenericResponse> => {
    // Debug log to confirm what is being sent
    console.log(`[Frontend Debug] disconnectProvider called for: ${provider}`);
    const endpoint = `/auth/disconnect/${provider}`;
    console.log(`[Frontend Debug] Sending POST request to: ${API_BASE_URL}${endpoint}`);
    return apiClient.post(endpoint);
  },

  register: async (userData: RegisterRequest): Promise<GenericResponse> => {
    return apiClient.post('/user/register', userData);
  },

  googleLogin: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/google/login`;
  },

  googleLogout: async (): Promise<GenericResponse> => {
    return apiClient.get('/auth2/google/logout');
  },

  githubLogin: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/github/login`;
  },

  githubSignIn: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/github/signin`;
  },

  githubLogout: async (): Promise<GenericResponse> => {
    return apiClient.post('/auth2/github/logout');
  },

  microsoftLogin: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/microsoft/login`;
  },
};

export const userService = {
  register: async (userData: User): Promise<GenericResponse> => {
    return apiClient.post('/user/dao', userData);
  },

  getCurrentUser: async (): Promise<{ success: boolean; user: User }> => {
    // The backend now returns { success: true, user: { ... } }
    const data = await apiClient.get<{ success: boolean; user: any }>('/admin/user');
    // Ensure we typecast or transform the response correctly
    // The interceptor returns response.data, so 'data' here is the actual payload.
    // However, TypeScript might infer 'data' as AxiosResponse if not careful.
    // Since we returned response.data in interceptor, 'data' IS the payload.
    // We cast it to likely shape.

    // Check if data has user property directly (which it should based on previous implementation)
    // The previous implementation did: handleResponse(response) -> returns json.
    const payload = data as unknown as { success: boolean; user: any };

    if (payload.user) {
      payload.user = {
        ...payload.user,
        id: payload.user.id,
        email: payload.user.email || '',
        username: payload.user.username || '',
        is_administrator: payload.user.is_administrator || false,
        has_drive_access: payload.user.has_drive_access || false,
        has_microsoft_drive_access: payload.user.has_microsoft_drive_access || false,
      };
    }
    return payload;
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    return apiClient.get(`/user/dao/${id}`);
  },

  updateUser: async (id: number, data: Partial<User>): Promise<UserResponse> => {
    return apiClient.put(`/user/dao/${id}`, data);
  },

  deleteUser: async (id: number): Promise<GenericResponse> => {
    return apiClient.delete(`/user/dao/${id}`);
  },

  exportUser: async (): Promise<{ status_code: number; data: any }> => {
    return apiClient.get('/user/export');
  },
};

export const adminService = {
  getAllUsers: async (): Promise<UserListResponse> => {
    return apiClient.get('/user/manager');
  }
};

export const driveService = {
  listFiles: async (folderId?: string): Promise<DriveListResponse> => {
    const url = folderId
      ? `/drive/files?folder_id=${folderId}`
      : `/drive/files`;

    const rawData = await apiClient.get<any>(url) as any;
    const driveData = rawData.data || {};

    const files = (driveData.files || []).map((file: any) => ({
      ...file,
      isFolder: file.is_folder || file.mimeType === 'application/vnd.google-apps.folder',
      modifiedTime: file.modifiedTime || file.createdTime
    }));

    return {
      success: rawData.success,
      files,
      current_folder: driveData.folder_id
    };
  },

  getFileDetail: async (fileId: string): Promise<DriveFile> => {
    return apiClient.get(`/drive/file/${fileId}`);
  },
};

export const oneDriveService = {
  listFiles: async (folderId?: string): Promise<DriveListResponse> => {
    const url = folderId
      ? `/drive/microsoft/files?folder_id=${folderId}`
      : `/drive/microsoft/files`;

    const rawData = await apiClient.get<any>(url) as any;
    const driveData = rawData.data || {};

    const files = (driveData.files || []).map((file: any) => ({
      ...file,
      // Ensure backend fields map to frontend expectations
      isFolder: file.is_folder || file.folder !== undefined,
      modifiedTime: file.lastModifiedDateTime,
      name: file.name
    }));

    return {
      success: rawData.success,
      files,
      current_folder: driveData.folder_id
    };
  },

  getFileDetail: async (fileId: string): Promise<DriveFile> => {
    return apiClient.get(`/drive/microsoft/file/${fileId}`);
  },
};

export const cloudService = {
  getAggregatedFiles: async (): Promise<import('../types').CloudFilesResponse> => {
    return apiClient.get('/cloud/files');
  }
};

export const cloudFilesService = {
  saveFiles: async (files: Array<{ id: string; name: string; provider: string }>): Promise<GenericResponse> => {
    return apiClient.post('/cloud-files', { files });
  },

  listFiles: async (): Promise<{ success: boolean; files: Array<{ id: string; name: string; provider: string }> }> => {
    return apiClient.get('/cloud-files');
  }
};
