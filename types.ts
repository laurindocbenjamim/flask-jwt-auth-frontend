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
  is_administrator?: boolean; // From /admin/user endpoint
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
