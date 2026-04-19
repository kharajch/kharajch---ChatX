<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Backend Context
The backend is a FastAPI + LangChain + local Ollama Python app. Do not use OpenRouter. Always rely on local Ollama integration for the API endpoint.
The API endpoints are prefixed with `/api/` (e.g., `/api/search`) to support automatic Vercel Serverless Function deployment via `api/index.py`.
