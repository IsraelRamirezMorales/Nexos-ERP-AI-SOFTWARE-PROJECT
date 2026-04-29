# Nexos-ERP-AI-SOFTWARE-PROJECT

Nexos ERP is a cloud-based Multi-Tenant SaaS platform designed to help local producers—such as commercial greenhouses, meat processors, and distributors—transition from manual spreadsheet-based tracking to a secure, professional ERP environment.

## Project Structure

- **`backend/`**: FastAPI application.
- **`frontend/`**: Next.js (React) application.

## Getting Started

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies using Poetry:
   ```bash
   poetry install
   ```
3. Run the development server:
   ```bash
   poetry run uvicorn app.main:app --reload
   ```

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```