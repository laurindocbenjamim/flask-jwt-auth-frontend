# Backend Communication Documentation

This document outlines how the frontend React application communicates with the Flask backend API.

## 1. API Client Configuration

The application uses a centralized `axios` instance located in `services/api.ts`.

```typescript
const apiClient = axios.create({
  baseURL: config.API_BASE_URL, // /api/v1 (or valid endpoint)
  withCredentials: true,        // Essential for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Key Configuration Details
-   **Base URL**: All requests are prefixed with the configured base URL (default: `/api/v1`).
-   **`withCredentials: true`**: This is critical. It ensures that the browser sends `HttpOnly` cookies (containing the JWT access token and session data) with every request.

## 2. Authentication Flow

The application uses a secure, cookie-based authentication mechanism.

### Login
1.  **Frontend**: Sends POST request to `/auth/login` with username and password.
2.  **Backend**: Validates credentials and sets `HttpOnly` cookies for the access token.
3.  **Frontend**: Receives success response. The browser automatically handles cookie storage.

### Request Interception (Token & CSRF)
Every outgoing request is intercepted to inject necessary headers:

```typescript
apiClient.interceptors.request.use((config) => {
  // 1. JWT Token (if stored in localStorage for non-cookie flows, though cookies are primary)
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 2. CSRF Protection
  // Reads the CSRF token from the 'csrf_access_token' or 'csrf_token' cookie.
  const csrfToken = getCookie('csrf_access_token') || getCookie('csrf_token');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
});
```

### Response Interception (Error Handling)
Responses are intercepted to handle global errors, particularly authentication failures.

-   **401 Unauthorized**:
    -   **CSRF Errors**: If the error message indicates "Missing CSRF token", a warning is logged, but the user is *not* redirected. This prevents logout loops during session checks.
    -   **Auth Errors**: For other 401s, the user is redirected to `/login` and local storage is cleared.
-   **Data Unwrapping**: The interceptor automatically unwraps `response.data`, so service calls receive the actual payload directly.

## 3. Key API Endpoints

### Authentication (`authService`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | User login (sets cookies). |
| `POST` | `/auth/logout` | User logout (clears cookies). |
| `POST` | `/auth/disconnect/{provider}` | Disconnects a cloud provider (e.g., 'google', 'microsoft'). |
| `GET` | `/auth2/google/login` | Initiates Google OAuth flow. |
| `GET` | `/auth2/microsoft/login` | Initiates Microsoft OAuth flow. |

### User Management (`userService`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/user/dao` | Register a new user (admin). |
| `GET` | `/admin/user` | Get current authenticated user details. |
| `GET` | `/user/dao/{id}` | Get specific user details. |
| `PUT` | `/user/dao/{id}` | Update user details. |
| `DELETE` | `/user/dao/{id}` | Delete a user. |

### Cloud Drive Services (`driveService`, `oneDriveService`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/drive/files` | List Google Drive files. |
| `GET` | `/drive/microsoft/files` | List OneDrive files. |
| `GET` | `/cloud/files` | Get aggregated files from all connected providers. |

## 4. Development vs. Production

-   **Docker**: In Docker, the frontend communicates with the backend via the internal network. The nginx configuration (or Vite proxy in dev) handles forwarding requests from `/api` to the backend service.
-   **Local Dev**: The `vite.config.ts` proxies `/api` requests to `http://127.0.0.1:5000` (or similar) to avoid CORS issues.
