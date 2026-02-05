import { AuthResponse, GenericResponse, User, UserListResponse, UserResponse, DriveFile, DriveListResponse } from '../types';
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

  microsoftLogin: async (): Promise<void> => {
    window.location.href = `${API_BASE_URL}/auth2/microsoft/login`;
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
        has_drive_access: data.user.has_drive_access || false,
        has_microsoft_drive_access: data.user.has_microsoft_drive_access || false,
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

export const driveService = {
  listFiles: async (folderId?: string): Promise<DriveListResponse> => {
    const url = folderId
      ? `${API_BASE_URL}/drive/files?folder_id=${folderId}`
      : `${API_BASE_URL}/drive/files`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });

    // The backend returns a nested 'data' object
    const rawData = await handleResponse<any>(response);
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
    const response = await fetch(`${API_BASE_URL}/drive/file/${fileId}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<DriveFile>(response);
  },
};

export const oneDriveService = {
  listFiles: async (folderId?: string): Promise<DriveListResponse> => {
    const url = folderId
      ? `${API_BASE_URL}/drive/microsoft/files?folder_id=${folderId}`
      : `${API_BASE_URL}/drive/microsoft/files`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });

    const rawData = await handleResponse<any>(response);
    const driveData = rawData.data || {};

    const files = (driveData.files || []).map((file: any) => ({
      ...file,
      // Ensure backend fields map to frontend expectations
      isFolder: file.is_folder || file.folder !== undefined, // Adjust based on actual MS graph response usually 'folder' property exists
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
    const response = await fetch(`${API_BASE_URL}/drive/microsoft/file/${fileId}`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<DriveFile>(response);
  },
};

export const cloudFilesService = {
  saveFiles: async (files: Array<{ id: string; name: string; provider: string }>): Promise<GenericResponse> => {
    const response = await fetch(`${API_BASE_URL}/cloud-files`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ files }),
      credentials: 'include',
    });
    return handleResponse<GenericResponse>(response);
  },

  listFiles: async (): Promise<{ success: boolean; files: Array<{ id: string; name: string; provider: string }> }> => {
    const response = await fetch(`${API_BASE_URL}/cloud-files`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse<{ success: boolean; files: Array<{ id: string; name: string; provider: string }> }>(response);
  }
};
