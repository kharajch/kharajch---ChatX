<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Backend Context
The backend is a FastAPI + LangChain + NVIDIA NIM Python app. 
- API endpoints are prefixed with `/api/` (e.g., `/api/search`).
- Vercel deployment uses `api/index.py`.
- Local development uses `backend/main.py`.

# Design System: Onyx Protocol
Always adhere to the "Onyx Protocol" aesthetic:
- **Theme**: Premium Dark Mode, Monochromatic.
- **Borders**: No solid borders. Use `ghost-border` or `glass-border` CSS variables.
- **Typography**: Inter for UI, JetBrains Mono for code.
- **Animations**: Use Framer Motion and GSAP for micro-interactions.
- **Interactivity**: All components must be Client Components ('use client').
