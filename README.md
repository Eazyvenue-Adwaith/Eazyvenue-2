# Project Setup Guide

## Frontend

1. **Node Version**: Use Node.js version 16.
   - Install Node.js 16 and npm 16 if you haven't already.
   - Use `nvm` to switch to Node.js 16:
     ```bash
     nvm install 16
     nvm use 16
     ```

2. **Start Frontend**:
   - Navigate to your frontend project directory.
   - Run the following command to start the Angular development server:
     ```bash
     ng serve
     ```

## Backend

1. **Update Environment Configuration**:
   - Open `environment.ts` file.
   - Change the API URL from `easyvenue.com/api` to:
     ```typescript
     apiUrl: 'http://localhost:3006/api/'
     ```

   - Open `default.js` file.
   - Change the API URL from `api` to `localhost`.

2. **Start Backend**:
   - Navigate to your backend project directory.
   - Run the following command to start the backend server:
     ```bash
     npm run dev
     ```

3. **Connect to MongoDB**:
   - Download MongoDB Shell if you don't have it already.
   - Use `mongosh` to connect to your MongoDB instance manually.

4. **Access Admin Dashboard**:
   - Use the username and password provided in the `instruction.pdf` file located in the frontend code folder.
