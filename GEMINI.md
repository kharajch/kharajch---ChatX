# NVIDIA.md — kharajch---ChatX

## Architecture
- **Frontend**: Next.js 16 App Router (src/app/) with React 19
- **Backend**: FastAPI at `backend/main.py` (local) and `api/index.py` (Vercel).
- **LLM**: NVIDIA NIM via LangChain (`langchain-nvidia-ai-endpoints`)
- **Styling**: Vanilla CSS with CSS Modules (no Tailwind)

## Key Patterns
- **Interactivity**: All components are Client Components ('use client')
- **3D Graphics**: Scene uses React Three Fiber, loaded via `next/dynamic` with `ssr: false`
- **State**: State management via custom hooks (`useChat`, `useLocalStorage`)
- **Persistence**: Conversations persisted in `localStorage`
- **Streaming**: Backend responses are streamed for a real-time feel

## Design System: "Onyx Protocol"
- **Aesthetic**: Ethereal Monolith — premium dark theme, monochromatic
- **Base**: CSS variables defined in `globals.css`
- **Borders**: No solid borders — use `ghost-border` or `glass-border` tokens
- **Depth**: Tonal layering (surface-lowest through surface-bright)
- **Effects**: Glassmorphism, backdrop filters, and smooth micro-animations

## API Contract
### POST `/api/search`
- **Request Body**:
  ```json
  {
    "message": "string",
    "history": [{"role": "user | assistant", "content": "string"}]
  }
  ```
- **Response**: `text/plain` stream of the AI's response content.

## Running Locally
- **Frontend**: `npm run dev` (port 3000)
- **Backend**: `uvicorn backend.main:app --reload --port 8000`
- **Environment**: Requires `NVIDIA_API_KEY` and `NVIDIA_MODEL` in `.env`
