# GEMINI.md — kharajch---ChatX

## Architecture
- **Frontend**: Next.js 16 App Router (src/app/) with React 19
- **Backend**: FastAPI at backend/main.py, serves /api/search endpoint (deployed via api/index.py on Vercel)
- **LLM**: Ollama via LangChain (langchain_ollama)
- **Styling**: Vanilla CSS with CSS Modules (no Tailwind)

## Key Patterns
- All components are Client Components ('use client') since interactive
- 3D scene uses React Three Fiber, loaded via next/dynamic with ssr: false
- State management via custom hooks (useChat, useLocalStorage)
- Conversations persisted in localStorage

## Design System
- "Onyx Protocol" / "Ethereal Monolith" — dark theme, monochromatic
- CSS variables defined in globals.css
- No solid borders — use ghost-border/glass-border tokens
- Tonal layering for depth (surface-lowest through surface-bright)

## API Contract
POST /api/search
- Body: { message: string, history: [{role, content}] }
- Response: { answer: string, thinking: string }

## Running
- Frontend: npm run dev (port 3000)
- Backend: uvicorn main:app --reload --port 8000
- Requires OLLAMA_BASE_URL and OLLAMA_MODEL in .env
