# Project Setup Guide (Frontend & Backend)

This step-by-step guide will help you install and run both the Frontend and Backend of the application.

## Live Deployments
- **Frontend (Live URL)**: [https://frontend-nine-gamma-76.vercel.app/](https://frontend-nine-gamma-76.vercel.app/)
- **Backend (Render Deployment)**: [https://dashboard.render.com/web/srv-d7fjtd9kh4rs739qitd0](https://dashboard.render.com/web/srv-d7fjtd9kh4rs739qitd0)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Architecture](#project-architecture)
- [Step 1: Backend Setup](#step-1-backend-setup)
- [Step 2: Frontend Setup](#step-2-frontend-setup)
- [Step 3: Running the Application](#step-3-running-the-application)
- [API Overview](#api-overview)

## Prerequisites
Please ensure you have the following software installed:
- [Node.js](https://nodejs.org/) (Version 16 or newer recommended)
- [npm](https://www.npmjs.com/) (Should be bundled with Node.js)
- [MongoDB](https://www.mongodb.com/) (A local MongoDB server or a cloud MongoDB Atlas cluster)

## Project Architecture
The project is divided into two primary directories:
- **`backend/`**: Node.js/Express RESTful API that handles business logic, authentication, and database operations.
- **`frontend/`**: React application (built with Vite) serving the user interface.

Both run as independent servers and communicate via HTTP requests and CORS.

---

## Step 1: Backend Setup

Navigate to the backend directory and configure the environment:

1. **Open Terminal** and change to the backend folder:
   ```bash
   cd ../backend
   # Or from the project root:
   # cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `backend` folder and add the required configuration:
   ```env
   # backend/.env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your_db_name
   JWT_SECRET=your_super_secret_jwt_key
   CORS_ORIGIN=http://localhost:5173
   ```
   *Note: Update `MONGODB_URI` if you are using an external managed database (e.g., MongoDB Atlas).*

---

## Step 2: Frontend Setup

Navigate to the frontend directory and configure the UI application.

1. **Open Terminal** and change to the frontend folder (where this README resides):
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `frontend` folder to point it to the backend server:
   ```env
   # frontend/.env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   *Note: In Vite, environment variables exposed to the client must start with `VITE_`.*

---

## Step 3: Running the Application

For the application to function correctly, both the backend and frontend servers must be running simultaneously in separate terminal windows.

### Terminal 1 - Run Backend:
```bash
cd backend
npm run dev
```
You should see: `Server is running on port 5000` (and confirm DB connection).

### Terminal 2 - Run Frontend:
```bash
cd frontend
npm run dev
```
You should see: `Vite serving at: http://localhost:5173`

---

## Troubleshooting

- **CORS Error**: If the frontend console shows CORS issues, ensure `CORS_ORIGIN` in `backend/.env` exactly matches the frontend URL (`http://localhost:5173`).
- **Database Connection Error**: Double check your `MONGODB_URI` string and make sure the MongoDB daemon is running locally or your IP is whitelisted on Atlas.
- **404 API Not Found**: Make sure `VITE_API_BASE_URL` in `frontend/.env` correctly points to the backend's base API route (e.g., `http://localhost:5000/api`).
