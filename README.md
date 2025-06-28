# DSA Prep App

A full-stack application for practicing Data Structures and Algorithms problems.

## Project Structure

```
dsa-prep-app/
├── backend/              # Node.js & Express backend
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   ├── app.js         # Express app setup
│   └── .env           # Environment variables
│
├── frontend/            # React frontend
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── assets/    # Images, fonts, etc.
│   │   ├── components/# Reusable components
│   │   ├── pages/     # Page components
│   │   ├── services/  # API calls
│   │   ├── context/   # React Context
│   │   ├── App.jsx    # Root component
│   │   └── main.jsx   # Entry point
│   └── tailwind.config.js
│
└── supabase/           # Database configuration
    ├── schema.sql     # Database schema
    └── supabase.env   # Supabase environment variables
```

## Setup Instructions

1. Clone the repository
2. Set up the backend:

   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. Set up the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Configure Supabase:
   - Create a new Supabase project
   - Copy the schema from supabase/schema.sql
   - Update environment variables in supabase/supabase.env

## Features

- User authentication
- Problem catalog with difficulty levels
- Progress tracking
- Interactive coding interface
- Performance analytics

## Tech Stack

- Frontend: React, TailwindCSS
- Backend: Node.js, Express
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
