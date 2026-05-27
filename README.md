# News Explorer

Fullstack News Explorer project for Stage 1, 2, and 3.

## Project Video

- https://www.loom.com/share/7e1bb03bd7254ee3bb574ecfcda499d7

## Project Structure

- Frontend (React + Vite): root directory
- Backend (Node.js + Express + MongoDB): backend directory

## Frontend

### Install

1. npm install

### Environment

Create a local .env file in the root directory using .env.example.

Required variables:

- VITE_NEWS_API_KEY
- VITE_GUARDIAN_API_KEY (optional fallback live provider)
- VITE_API_BASE_URL (default: http://localhost:3000/api)

### Run

1. npm run dev

### Build

1. npm run build

### Lint

1. npm run lint

## Backend

### Install

1. cd backend
2. npm install

### Environment

Create backend/.env using backend/.env.example.

Required variables:

- NODE_ENV
- PORT (default: 3000)
- JWT_SECRET
- MONGO_URL

### Run

1. npm run dev

The API runs on localhost:3000.

### Start (production mode)

1. npm run start

### Lint

1. npm run lint

## API Base URL

Use one of these deployment formats:

- www.Mfinalnews.jumpingcrab.com
- api.Mfinalnews.jumpingcrab.com



### Available API Routes

Public routes:

- POST /api/signup
- POST /api/signin

Protected routes:

- GET /api/users/me
- GET /api/articles
- POST /api/articles
- DELETE /api/articles/:articleId

## Deployment

- Frontend Stage 1: GitHub Pages is acceptable
- Backend Stage 2: deploy to a remote server with HTTPS
- Stage 3 fullstack: frontend and backend both deployed and connected

### Current Server Setup

- VM: Google Cloud Compute Engine
- Reverse proxy: Nginx (port 80 -> backend port 3000)
- Backend process manager: PM2 (process name: news-backend)

Useful server commands:

1. pm2 list
2. pm2 logs news-backend --lines 100 --nostream
3. sudo systemctl status nginx --no-pager

## Notes

- JWT is stored in localStorage on the client.
- Protected route for saved news redirects unauthorized users to home and opens sign-in modal.
- Request and error logs are written in backend/logs.
