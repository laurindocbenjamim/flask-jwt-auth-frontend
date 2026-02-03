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
  API_BASE_URL: 'https://172.22.0.3:8443/api/v1',
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

The frontend interacts with the following backend endpoints.

### Authentication

**1. Login**
-   **Endpoint**: `POST /api/v1/auth/login`
-   **Description**: Authenticates a user and returns an access token.
-   **Request Body**:
    ```json
    {
      "username": "user@example.com",
      "password": "securepassword"
    }
    ```
-   **Response**:
    ```json
    {
      "status_code": 200,
      "message": "Login successful",
      "access_token": "eyJ0eX...",
      "username": "user",
      "user": { ... }
    }
    ```

**2. Logout**
-   **Endpoint**: `GET /api/v1/auth/logout`
-   **Description**: Invalidates the current user session (handled via token revocation on backend).
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**:
    ```json
    {
      "status_code": 200,
      "message": "Logout successful"
    }
    ```

**3. Google Sign-In**
-   **Endpoint**: `POST /api/v1/auth2/google/signin`
-   **Description**: Authenticates using a Google ID token.
-   **Request Body**: Form Data containing `id_token`.
-   **Response**:
    ```json
    {
      "success": true,
      "redirect": "/"
    }
    ```

### User Management

**1. Register User**
-   **Endpoint**: `POST /api/v1/user/dao`
-   **Description**: Creates a new user account.
-   **Request Body**:
    ```json
    {
      "email": "new@example.com",
      "username": "newuser",
      "password": "password123",
      "firstname": "John",
      "lastname": "Doe"
      // ... other fields
    }
    ```
-   **Response**:
    ```json
    {
      "status_code": 201,
      "message": "User created successfully"
    }
    ```

**2. Get User Profile**
-   **Endpoint**: `GET /api/v1/user/dao/{id}`
-   **Description**: Retrieves details for a specific user.
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**:
    ```json
    {
      "status_code": 200,
      "user": {
        "id": 1,
        "username": "user",
        "email": "user@example.com",
        ...
      }
    }
    ```

**3. Update User Profile**
-   **Endpoint**: `PUT /api/v1/user/dao/{id}`
-   **Description**: Updates user information.
-   **Headers**: `Authorization: Bearer <token>`
-   **Request Body**: JSON object with fields to update.
-   **Response**: `UserResponse` object.

**4. Delete User**
-   **Endpoint**: `DELETE /api/v1/user/dao/{id}`
-   **Description**: Deletes a user account.
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**:
    ```json
    {
      "status_code": 200,
      "message": "User deleted successfully"
    }
    ```

### Administration

**1. Get Current Admin/User Info**
-   **Endpoint**: `GET /api/v1/admin/user`
-   **Description**: Retrieves the currently authenticated user's details, including admin status.
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**:
    ```json
    {
      "id": 1,
      "username": "admin",
      "is_administrator": true,
      ...
    }
    ```

**2. List All Users (Admin)**
-   **Endpoint**: `GET /api/v1/user/manager`
-   **Description**: Retrieves a list of all registered users.
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**:
    ```json
    {
      "status_code": 200,
      "users": [
        { "id": 1, "username": "admin", ... },
        { "id": 2, "username": "user", ... }
      ]
    }
    ```
