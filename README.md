# Task Manager Application

This is a full-stack Task Manager application built with React, Express.js, MongoDB, and Firebase Authentication. It allows users to manage their tasks with a drag-and-drop interface and real-time updates via WebSockets.

## Live Links

 [https://task-mangement-3f630.web.app/](https://task-mangement-3f630.web.app/)


## Dependencies

*   Frontend:
    *   React
    *   Vite.js
    *   @dnd-kit/core
    *   @dnd-kit/sortable
    *   @dnd-kit/utilities
    *   @tanstack/react-query
    *   axios
    *   firebase
    *   Tailwind CSS
    *   DaisyUI
    *   Framer Motion
    *   TanstackQuery
*   Backend:
    *   Express.js
    *   MongoDB
    *   Firebase Admin SDK
    *   dotenv

## Installation Steps

1.  Clone the repository: `git clone https://github.com/your-username/task-manager.git`
2.  Install frontend dependencies: `cd client && npm install`
3.  Install backend dependencies: `cd server && npm install`
4.  Set up Firebase project and configure credentials (see [Firebase Documentation](https://firebase.google.com/docs))
5.  Create MongoDB database and update connection URI in `server/index.js`
6.  Start the frontend development server: `cd client && npm run dev`
7.  Start the backend server: `cd server && npm start`

## Technologies Used

*   Frontend:
    *   React
    *   Vite.js
    *   @dnd-kit for drag-and-drop
    *   @tanstack/react-query for data fetching and caching
    *   Tailwind CSS for styling
    *   DaisyUI for UI components
*   Backend:
    *   Express.js for API
    *   MongoDB for database
    *   Firebase Authentication for user authentication
   