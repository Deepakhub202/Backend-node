# Backend API (Node.js + Express + MongoDB + Redis)

## Overview
This project is a RESTful backend API built using Node.js and Express.  
It includes authentication, user management, OTP verification, and Redis integration for performance.

---

## Features
- User Signup with OTP verification
- User Login (JWT Authentication)
- Search Users
- Get current logged-in user
- Update User
- Delete User
- Input validation using Joi
- Middleware-based authentication (JWT)
- Redis integration (caching / performance)
- MongoDB integration using Mongoose
- Global error handling

---

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- JWT (Authentication)
- bcrypt (Password hashing)
- Joi (Validation)

---

## Base URL
`http://localhost:5000/api`

---

## API Endpoints

### Auth Routes
- POST `/api/login` → Login user  
  Body: `{ "login": "email-or-username", "password": "your-password" }`

### Signup & OTP Routes
- POST `/api/signup` → Send OTP for signup  
  Body: `{ "username": "...", "name": "...", "email": "...", "password": "...", "repassword": "..." }`
- POST `/api/signup/verify-otp` → Verify OTP and complete signup  
  Body: `{ "email": "...", "otp": "123456" }`

### User Routes (Protected)
- GET `/api/users/search?username=john` → Search users  
  Query: `username`
- GET `/api/user/find` → Get the authenticated user  
- PUT `/api/user/update` → Update the authenticated user  
  Body: `{ "username": "...", "name": "..." }`
- DELETE `/api/user/delete` → Delete the authenticated user  

Protected routes require:
- Header `Authorization: Bearer <token>`

Route notes:
- The protected self routes use the JWT payload, so they do not need `:id` in the URL.
- `GET /api/user/find`, `PUT /api/user/update`, and `DELETE /api/user/delete` all read the user id from `req.user.id`.

---

## How it Works
1. User requests signup → OTP is sent  
2. User verifies OTP → account created  
3. User logs in → receives JWT token  
4. Token is used for protected routes  
5. Data stored in MongoDB  
6. Redis used for performance optimization  

---

## Setup Instructions

### 1. Clone the repository

### 2. Install dependencies

### 3. Create `.env` file and add:

### 4. Start server

---

## Security
- Passwords hashed using bcrypt  
- JWT used for authentication  
- Protected routes secured via middleware  
- Input validation using Joi  

---

## Author
Deepak
