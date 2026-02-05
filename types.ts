export interface User {
  id?: number;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  country?: string;
  address?: string;
  postal_code?: string;
  role?: 'admin' | 'user';
  is_administrator?: boolean;
  has_drive_access?: boolean; // New!
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  iconLink?: string;
  isFolder: boolean;
  is_folder: boolean; // Added per backend structure
  webViewLink?: string;
}

export interface DriveListResponse {
  success: boolean;
  files: DriveFile[];
  current_folder?: string;
}

export interface AuthResponse {
  success?: boolean;
  status_code?: number;
  message?: string;
  access_token?: string;
  username?: string;
  user?: User;
}

export interface UserResponse {
  success?: boolean;
  status_code: number;
  user: User;
}

export interface UserListResponse {
  status_code: number;
  users: User[];
}

export interface GenericResponse {
  status_code: number;
  message: string;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}
