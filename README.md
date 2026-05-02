# kharajch---ChatX

> A premium AI-powered chat experience built with Next.js 16, FastAPI, and NVIDIA NIM.

![ChatX](public/logo.png)

## ✨ Features

- **AI Chat Interface** — Intelligent conversations powered by NVIDIA NIM (`meta/llama-3.1-70b-instruct`)
- **Real-time Streaming** — Experience instant responses with low-latency backend streaming
- **Onyx Protocol Design** — A custom "Ethereal Monolith" theme featuring glassmorphism and tonal layering
- **3D Immersive Landing** — Interactive Three.js/React Three Fiber background for a premium feel
- **Conversation History** — Local persistence of chat sessions with search functionality
- **Responsive Experience** — Fully optimized for desktop and mobile devices

## 🛠 Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 16 (App Router), React 19  |
| Styling  | Vanilla CSS (CSS Modules)           |
| 3D       | Three.js, React Three Fiber, Drei   |
| Animation| Framer Motion, GSAP                 |
| Backend  | FastAPI, LangChain, NVIDIA NIM      |
| LLM      | NVIDIA NIM (`meta/llama-3.1-70b-instruct`) |

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
   Create a `.env` file in the root:
   ```env
   NVIDIA_API_KEY=your-nvapi-key-here
   NVIDIA_MODEL=meta/llama-3.1-70b-instruct
   ```

5. **Start the backend**
   ```bash
   # In terminal 1
   uvicorn backend.main:app --reload --port 8000
   ```

6. **Start the frontend**
   ```bash
   # In terminal 2
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
kharajch---ChatX/
├── api/
│   └── index.py             # Vercel Serverless Function entry point
├── backend/
│   ├── main.py              # FastAPI backend for local development
│   └── requirements.txt     # Python dependencies
├── src/app/
│   ├── components/          # React components
│   │   ├── Scene3D/         # Three.js 3D background
│   │   ├── Hero/            # Landing page hero section
│   │   ├── ChatBox/         # Main chat interface
│   │   ├── Sidebar/         # Conversation history sidebar
│   │   ├── MessageBubble/   # Individual chat messages
│   │   ├── ThinkingScratchpad/ # AI thinking visualization (UI component)
│   │   ├── SearchBar/       # Conversation search
│   │   └── Footer/          # App footer
│   ├── hooks/               # Custom React hooks
│   │   ├── useChat.js       # Chat logic & state management
│   │   └── useLocalStorage.js # Persistent storage hook
│   ├── utils/
│   │   └── api.js           # Backend API client (Streaming)
│   ├── globals.css          # Design tokens & "Onyx Protocol" variables
│   ├── layout.js            # Root layout (Metadata & Styles)
│   ├── page.js              # Main page entry (Hero & Chat transitions)
│   └── page.module.css      # Page layout styles
├── public/                  # Static assets (logos, icons)
├── .env                     # Environment variables (Git-ignored)
└── vercel.json              # Vercel deployment configuration
```

## 🎨 Design System — "Onyx Protocol"

- **Theme**: Ethereal Monolith (black & white, dark mode only)
- **Typography**: Inter (Variable), JetBrains Mono (Code)
- **Colors**: Tonal layering from deep charcoal to bright accents
- **Effects**: Glassmorphism, ghost borders, ambient shadows
- **Animations**: Framer Motion + GSAP micro-interactions

## 📄 License

© kharajch
