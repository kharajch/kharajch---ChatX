# CLAUDE.md — kharajch---ChatX

## Project Context
A premium AI-powered chat experience (ChatX) built with Next.js 16, React 19, and a FastAPI backend.
The app uses NVIDIA NIM for intelligent responses and features a high-end "Onyx Protocol" design system.

## Commands
### Frontend (Next.js)
- `npm run dev`: Start frontend dev server (port 3000)
- `npm run build`: Build production application
- `npm run lint`: Run ESLint

### Backend (FastAPI)
- `uvicorn backend.main:app --reload --port 8000`: Start backend locally
- `pip install -r backend/requirements.txt`: Install dependencies

## Development Guidelines
- **Frontend**: 'use client' for interactive components. Vanilla CSS with CSS Modules.
- **Backend**: FastAPI endpoints prefixed with `/api/` for Vercel deployment via `api/index.py`.
- **LLM**: NVIDIA NIM (via `langchain-nvidia-ai-endpoints`).
- **Style**: "Onyx Protocol" — dark mode, glassmorphism, monochrome, tonal layering.
- **API**: POST `/api/search` accepts `{ message, history }`, returns streamed text.

See `GEMINI.md` for full architectural patterns and design system details.
