# Tasks Manager

Tasks Manager is a Node.js application built with Express.js, MongoDB, Passport.js, and JWT authentication. It provides endpoints for managing tasks and user authentication.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bahaa-alden/tasks-manager.git
   ```

2. **Install Dependencies**

   ```bash
   cd tasks-manager
   yarn install
   ```

3. **Set Up MongoDB**

   - Make sure MongoDB is installed and running on your machine.
   - If not installed, you can download and install it from MongoDB Official Website.
   - Start MongoDB service.

4. **Environment Variables**

   - Create a .env file in the root directory.
   - Add the following environment variables to the .env file:

   - ```makefile
     NODE_ENV=development/production
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     JWT_ACCESS_EXPIRATION=jwt_expire_time
     ```

5. **Seed the Roles**

   ```bash
   yarn seed:roles
   ```

6. **Run the Application**

```bash
yarn build
yarn start
```

## API Endpoints

### Authentication

- **Register User**

  - URL: /api/v1/users/register
  - Method: POST
  - Request Body:

  ```json
  {
    "email": "example@example.com",
    "password": "password",
    "name": "John Doe"
  }
  ```

  - Response:

    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "example@example.com"
      }
    }
    ```

- **Login User**

  - URL: /api/v1/users/login
  - Method: POST
  - Request Body:

    ```json
    {
      "email": "example@example.com",
      "password": "password"
    }
    ```

  - Response:

    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "example@example.com"
      }
    }
    ```

### Tasks

- **Get All Tasks**

  - URL: /api/v1/tasks
  - Method: GET
  - Headers: Authorization: Bearer your_jwt_token
  - Query Parameters: page, limit
  - Response:

  - ```json
    [
      {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "completed": "true",
        "createdAt": "2024-03-15T12:00:00.000Z",
        "updatedAt": "2024-03-15T12:00:00.000Z",
        "author": {
          "_id": "user_id",
          "name": "John Doe",
          "email": "example@example.com"
        }
      }
    ]
    ```

- **Get Task by ID**

  - URL: /api/tasks/:id
  - Method: GET
  - Headers: Authorization: Bearer your_jwt_token
  - Response:

    ```json
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "completed": "true",
      "createdAt": "2024-03-15T12:00:00.000Z",
      "updatedAt": "2024-03-15T12:00:00.000Z",
      "author": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "example@example.com"
      }
    }
    ```

- **Create Task**

  - URL: /api/tasks
  - Method: POST
  - Headers: Authorization: Bearer your_jwt_token
  - Request Body:

  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```

  - Response:

    ```json
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description",
      "completed": "false",
      "createdAt": "2024-03-15T12:00:00.000Z",
      "updatedAt": "2024-03-15T12:00:00.000Z",
      "author": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "example@example.com"
      }
    }
    ```

- **Update Task by ID**

  - URL: /api/tasks/:id
  - Method: PUT
  - Headers: Authorization: Bearer your_jwt_token
  - Request Body:

    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description"
    }
    ```

  - Response:

    ```json
    {
      "_id": "task_id",
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "completed": "true",
      "createdAt": "2024-03-15T12:00:00.000Z",
      "updatedAt": "2024-03-15T12:00:00.000Z",
      "author": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "example@example.com"
      }
    }
    ```

- **Delete Task by ID**
  - URL: /api/tasks/:id
  - Method: DELETE
  - Headers: Authorization: Bearer your_jwt_token
  - Response: No Content

## License

This project is licensed under the MIT License - see the LICENSE file for details.
