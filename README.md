# kharajch---ChatX

> A premium AI-powered chat experience built with Next.js, FastAPI, and NVIDIA NIM.

![ChatX](public/logo.png)

## ✨ Features

- **AI Chat Interface** — Intelligent conversations powered by NVIDIA NIM (meta/llama-3.1-70b-instruct)
- **Thinking Scratchpad** — Real-time visualization of AI reasoning
- **Conversation History** — Persistent chat sessions via localStorage
- **3D Hero Experience** — Immersive Three.js/React Three Fiber landing page
- **Ethereal Monolith Design** — Premium dark theme with glassmorphism and tonal layering
- **Responsive Layout** — Full desktop and mobile support

## 🛠 Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 16 (App Router), React 19  |
| Styling  | Vanilla CSS (CSS Modules)           |
| 3D       | Three.js, React Three Fiber, Drei   |
| Animation| Framer Motion, GSAP                 |
| Backend  | FastAPI, LangChain, NVIDIA NIM |
| LLM      | NVIDIA NIM (meta/llama-3.1-70b-instruct) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- NVIDIA API Key (from [build.nvidia.com](https://build.nvidia.com/))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kharajch/kharajch---ChatX.git
   cd kharajch---ChatX
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up Python virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   pip install -r backend/requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   # Create a .env file
   
   # For NVIDIA NIM setup:
   NVIDIA_API_KEY=your-nvapi-key-here
   NVIDIA_MODEL=meta/llama-3.1-70b-instruct
   ```

5. **Start the backend**
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

6. **Start the frontend** (in a new terminal)
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kharajch---ChatX/
├── backend/
│   ├── main.py              # FastAPI app + /api/search endpoint
│   └── requirements.txt     # Python dependencies
├── public/
│   └── logo.png             # ChatX logo
├── src/app/
│   ├── components/
│   │   ├── Scene3D/         # Three.js 3D background
│   │   ├── Hero/            # Landing page hero section
│   │   ├── ChatBox/         # Main chat interface
│   │   ├── Sidebar/         # Conversation history sidebar
│   │   ├── MessageBubble/   # Individual chat messages
│   │   ├── ThinkingScratchpad/ # AI thinking visualization
│   │   ├── SearchBar/       # Conversation search
│   │   └── Footer/          # App footer
│   ├── hooks/
│   │   ├── useChat.js       # Chat logic & state management
│   │   └── useLocalStorage.js # Persistent storage hook
│   ├── utils/
│   │   └── api.js           # Backend API client
│   ├── globals.css           # Design tokens & global styles
│   ├── layout.js             # Root layout
│   ├── page.js               # Main page (hero → chat)
│   └── page.module.css       # Page layout styles
├── .env                      # Environment variables
```

## 🎨 Design System — "Onyx Protocol"

- **Theme**: Ethereal Monolith (black & white, dark mode only)
- **Typography**: Inter (variable), JetBrains Mono (code)
- **Colors**: Tonal layering from `#0a0a0a` to `#353534`
- **Effects**: Glassmorphism, ghost borders, ambient shadows
- **Animations**: Framer Motion + GSAP micro-interactions

## 📄 License

© kharajch
