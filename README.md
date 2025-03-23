# API Utilisateur

This project is an API for user authentication and management, built with **Node.js**, **Express**, and **Prisma**.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management (Admin Only)](#user-management-admin-only)
- [Development](#development)
- [Troubleshooting](#troubleshooting)


---

## Features

- User registration (`/auth/signup`)
- User login (`/auth/login`)
- Fetch user profile (`/auth/profile`)
- Fetch all users (Admin only) (`/users`)
- Fetch a user by ID (Admin only) (`/users/:id`)
- Update a user's role (Admin only) (`/users/:id/role`)
- Delete a user (Admin only) (`/users/:id`)

---

## Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **PostgreSQL** (or another database supported by Prisma)
- **Prisma CLI** installed globally (`npm install -g prisma`)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/api-utilisateur.git
   cd api-utilisateur
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the database with roles:
   ```bash
   npx ts-node prisma/prismaClient.ts
   ```

6. Start the server:
   ```bash
   npx ts-node server/server.ts
   ```

---

## API Endpoints

### **Authentication**

#### 1. **Register a User**
- **POST** `/auth/signup`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "User Name",
    "provider": "local",
    "role": "User"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "roleId": "role-id",
    "created_at": "timestamp"
  }
  ```

#### 2. **Log In**
- **POST** `/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt-token"
  }
  ```

#### 3. **Fetch User Profile**
- **GET** `/auth/profile`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": {
      "name": "User"
    }
  }
  ```

---

### **User Management (Admin Only)**

#### 1. **Fetch All Users**
- **GET** `/users`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  [
    {
      "id": "user-id",
      "email": "user@example.com",
      "name": "User Name",
      "role": {
        "name": "User"
      }
    }
  ]
  ```

#### 2. **Fetch a User by ID**
- **GET** `/users/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": {
      "name": "User"
    }
  }
  ```

#### 3. **Update a User's Role**
- **PATCH** `/users/:id/role`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Request Body**:
  ```json
  {
    "role": "Admin"
  }
  ```
- **Response**:
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": {
      "name": "Admin"
    }
  }
  ```

#### 4. **Delete a User**
- **DELETE** `/users/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

---

## Development

### **Run the Server**
```bash
npx ts-node server/server.ts
```

### **Run Prisma Studio**
To view and manage your database:
```bash
npx prisma studio
```

---

## Troubleshooting

1. **Database Connection Issues**:
   - Ensure your `DATABASE_URL` in `.env` is correct.
   - Verify that your database is running.

2. **JWT Errors**:
   - Ensure `JWT_SECRET` is set in your `.env` file.

3. **Role Not Found**:
   - Run the seed script to populate roles:
     ```bash
     npx ts-node prisma/prismaClient.ts
     ```

---
