# Task Notes Application

A simple full-stack application for managing task notes.

## Features

- Create, read, update, delete notes
- Search and filter notes
- Validation for title (3-80 chars) and description (max 500 chars)

## Tech Stack

- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React

## Setup

1. Install dependencies for backend:
   ```
   npm install
   ```

2. Install dependencies for frontend:
   ```
   cd client
   npm install
   cd ..
   ```

3. Start the backend server:
   ```
   npm run dev
   ```
   Server runs on http://localhost:5000

4. Start the frontend:
   ```
   cd client
   npm start
   ```
   Frontend runs on http://localhost:3000

## API Endpoints

- GET /api/notes - List notes (with optional search and filter)
- POST /api/notes - Create note
- PUT /api/notes/:id - Update note
- DELETE /api/notes/:id - Delete note