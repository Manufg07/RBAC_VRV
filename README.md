# RBAC System

## Overview

This Role-Based Access Control (RBAC) system is designed to manage and enforce user roles and permissions for a secure and organized access control system. With this system, administrators can define various roles (e.g., Admin, User, etc.) and assign specific permissions to those roles. Users are then assigned to roles, which determine their level of access to different parts of the application.

## Features

- **Role Management**: Define custom roles (e.g., Admin, User, Moderator).
- **Permission Management**: Attach specific permissions to each role.
- **User Management**: Assign roles to users to control access.
- **Authorization Middleware**: Protect routes based on user roles and permissions.
- **JWT Authentication**: Secure the system with JSON Web Tokens (JWT).

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose for ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-Based Access Control (RBAC)
- **Libraries**: bcrypt (for password hashing), jsonwebtoken (for JWT), mongoose (for MongoDB), dotenv (for environment variables)

## Installation

### Prerequisites

- Node.js
- MongoDB (local or cloud-based)
- npm or yarn

### Steps to install

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Manufg07/RBAC_VRV.git
    cd rbac-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URI=mongodb://localhost:27017/rbac
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

    The application will be running on `http://localhost:5000`.
