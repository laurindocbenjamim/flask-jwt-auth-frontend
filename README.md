# Flask JWT Auth Frontend
  }

````

## Docker

Build and run the production image (uses the included `Dockerfile` and `docker-compose.yml`):

```bash
sudo docker compose up --build -d

# Verify the site is serving
curl -I http://localhost
```

The app will be served by Nginx on port 80 of the host. If you prefer to run without `docker compose`, you can build and run the image directly:

```bash
docker build -t flask-frontend .
docker run -d -p 80:80 --name frontend flask-frontend
```

## Features

- **Authentication**: Login, Registration, and Google OAuth support.
- **User Dashboard**: Manage personal profile information.
- **Admin Dashboard**: View and delete users (Admin role required).
- **Public Pages**: Portfolio, About Me, and Experience pages.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility.

## Configuration

The application configuration is located in `config.ts`.

```typescript
export const config = {
  API_BASE_URL: 'https://172.27.0.3:8443/api/v1',
};
```

Update `API_BASE_URL` to point to your running backend instance if different.

## Installation & Running

### Prerequisites

- Docker
- Docker Compose (Optional, but recommended)

### Running with Docker

1.  **Build the Docker Image:**

    ```bash
    docker build -t flask-frontend .
    ```

2.  **Run the Container:**

    ```bash
    docker run -d -p 3000:80 --name frontend flask-frontend
    ```

    The application will be accessible at `http://localhost:3000`.

### Running Locally (Development)

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Start Development Server:**

    ```bash
    npm run dev
    ```

    The application will run on `http://localhost:3000`.

## API Endpoints Documentation

The frontend interacts with the following backend endpoints. All endpoints base URL is configured in `config.ts`.

### Authentication (Internal)

**1. Login**
- **Endpoint**: `POST /auth/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
      "username": "user@example.com",
      "password": "securepassword"
    }
    ```
- **Success Response (200 OK)**:
    ```json
    {
      "status_code": 200,
      "message": "Login successful",
      "access_token": "eyJ0eX...",
      "username": "user_name",
      "user": { ... }
    }
    ```

**2. Logout**
- **Endpoint**: `POST /auth/logout`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <access_token>`
- **Success Response (200 OK)**:
    ```json
    {
      "status_code": 200,
      "message": "Logout successful"
    }
    ```

### Social Authentication (OAuth 2.0)

For social logins, the frontend redirects the user to the backend to initiate the OAuth flow.

**1. Google Login**
- **Action**: Redirect to `GET /auth2/google/login`
- **Description**: High-level flow where backend handles Google OAuth and redirects back to frontend.

**2. Google Logout**
- **Endpoint**: `GET /auth2/google/logout`
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `200 OK` Generic Response.

**3. GitHub Login**
- **Action**: Redirect to `GET /auth2/github/login` (or `/auth2/github/signin`)

**4. GitHub Logout**
- **Endpoint**: `POST /auth2/github/logout`
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `200 OK` Generic Response.

### User Management

**1. Register User**
- **Endpoint**: `POST /user/dao`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
    ```json
    {
      "email": "new@example.com",
      "username": "newuser",
      "password": "password123",
      "firstname": "John",
      "lastname": "Doe",
      "phone": "123456789",
      "country": "Country",
      "address": "Street Address"
    }
    ```
- **Success Response (201 Created)**:
    ```json
    {
      "status_code": 201,
      "message": "User created successfully"
    }
    ```

**2. Get Current User Info**
- **Endpoint**: `GET /admin/user`
- **Description**: Retrieves the currently authenticated user's details based on the provided token.
- **Headers**: `Authorization: Bearer <access_token>`
- **Success Response (200 OK)**:
    ```json
    {
      "id": 1,
      "username": "username",
      "email": "user@example.com",
      "firstname": "John",
      "lastname": "Doe",
      "is_administrator": false,
      "phone": "...",
      "country": "...",
      "address": "..."
    }
    ```

**3. Get User by ID**
- **Endpoint**: `GET /user/dao/{id}`
- **Headers**: `Authorization: Bearer <access_token>`
- **Success Response (200 OK)**: `UserResponse` object containing `user` details.

**4. Update User Profile**
- **Endpoint**: `PUT /user/dao/{id}`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <access_token>`
- **Request Body**: JSON object with fields to update (email, firstname, lastname, phone, country, address).
- **Success Response (200 OK)**: `UserResponse` object with updated details.

**5. Delete User**
- **Endpoint**: `DELETE /user/dao/{id}`
- **Headers**: `Authorization: Bearer <access_token>`
- **Success Response (200 OK)**:
    ```json
    {
      "status_code": 200,
      "message": "User deleted successfully"
    }
    ```

### Administration

**1. List All Users**
- **Endpoint**: `GET /user/manager`
- **Description**: Admin-only endpoint to list all users.
- **Headers**: `Authorization: Bearer <access_token>`
- **Success Response (200 OK)**:
    ```json
    {
      "status_code": 200,
      "users": [
        { "id": 1, "username": "admin", ... },
        { "id": 2, "username": "user", ... }
      ]
    }
    ```

## Backend Integration Requirements

To ensure a seamless integration with this frontend, the backend must adhere to the following:

### 1. JWT Session Persistence
The frontend uses the `Authorization: Bearer <access_token>` header for all authenticated requests. The backend must validate this token and return the appropriate user context.

### 2. Social Login Redirects
When a user authenticates via Google or GitHub, the backend handles the OAuth flow. After a successful authentication:
- The backend should redirect the user back to the frontend (e.g., `http://localhost:3000/#/dashboard`).
- **CRITICAL**: The backend must pass the `access_token` to the frontend. Since the frontend is a SPA using HashRouter, it is recommended to pass the token as a query parameter or in the URL hash (e.g., `?token=YOUR_JWT_TOKEN`).
- The frontend currently expects to find the token and store it in `localStorage` as `access_token`.

> [!IMPORTANT]
> If the backend uses a different method for passing the token after OAuth (like cookies), the `AuthContext.tsx` and `api.ts` in the frontend will need to be updated to support it. Currently, it relies on `localStorage`.

### 3. User Detail Synchronization
The frontend's `getCurrentUser` service calls `GET /admin/user`. The response must include at minimum: `email`, `username`, and `is_administrator` (boolean) to correctly display the UI and handle protected routes.

