"""
kharajch---ChatX Backend (Vercel Entry Point)
FastAPI + LangChain + NVIDIA NIM
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import os

from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

load_dotenv()

app = FastAPI(title="kharajch---ChatX API", version="1.0.0")

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the LLM
nvidia_model = os.getenv("NVIDIA_MODEL")
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

if nvidia_api_key:
    llm = ChatNVIDIA(
        model=nvidia_model,
        api_key=nvidia_api_key
    )
else:
    llm = None

class MessageItem(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class SearchRequest(BaseModel):
    message: str
    history: Optional[List[MessageItem]] = []


class SearchResponse(BaseModel):
    answer: str
    thinking: str = ""


SYSTEM_PROMPT = """You are ChatX, a helpful, knowledgeable, and friendly AI assistant created by Kharaj Chakraborty (@kharajch). 

Information about Kharaj Chakraborty (@kharajch - The Creator of ChatX):
He is a Full Stack AI Application Engineer and Computer Science student from India. He is active across several platforms where he showcases his work in web development and artificial intelligence. 
Professional ProfileRole: Full Stack AI Application Engineer specializing in crafting responsive, user-focused web experiences.
Education: Currently a student at Acharya Prafulla Chandra Roy Government College (APC Roy Government College).
Location: Based in Mathabhanga, West Bengal, India.
Technical Expertise: He works primarily with modern web technologies and AI integration:Frontend: Next.js, React.js, and CSS.Backend: Node.js, Express.js, and MongoDB.
AI & Automation: Experienced with Python, GCP (Google Cloud), and building AI-powered assistants like KCxCLOUD for Telegram.

Key Projects: 
    1. Portfolio 2.0: A redesigned personal portfolio showcasing his skills and projects, hosted at https://kharajch.vercel.app/
    2. ChatX: A premium AI-powered chat experience.
    3. WebXResearch: An AI-powered web research summarizer.
    4. SongFindX: A music discovery web application.
    5. MindMatters: A comprehensive mental health assessment tool.

Social Presence: 
You can find more of his work and personal updates on:    1. GitHub: @kharajch — featuring 10+ repositories of his open-source work.    2. Instagram: @kharajch — where he shares content related to technology, travel, and poetry.    3. Threads: @kharajch — focusing on AI engineering roadmaps and developer advice.    4. Kaggle: kharajchakraborty.




You provide clear, accurate, and well-structured responses. 
When answering questions:
1. Provide a clear, concise answer
2. Use markdown formatting in your answers when helpful
3. Be conversational and engaging
4. If you don't know something, say so honestly"""


@app.get("/api")
@app.get("/api/")
async def root():
    return {"status": "ok", "message": "kharajch---ChatX API is running"}


@app.post("/api/search")
async def search(request: SearchRequest):
    try:
        # Build conversation history
        messages = [SystemMessage(content=SYSTEM_PROMPT)]

        # Add chat history
        for msg in (request.history or []):
            if msg.role == "user":
                messages.append(HumanMessage(content=msg.content))
            elif msg.role == "assistant":
                messages.append(AIMessage(content=msg.content))

        # Add current message
        messages.append(HumanMessage(content=request.message))

        # Direct invocation without structured output for "thinking"
        if not llm:
            raise HTTPException(status_code=503, detail="AI model is not configured (missing API key).")
            
        async def stream_response():
            try:
                async for chunk in llm.astream(messages):
                    content = chunk.content if hasattr(chunk, 'content') else str(chunk)
                    yield content
            except Exception as e:
                yield f"\n\n[Error: {str(e)}]"

        from fastapi.responses import StreamingResponse
        return StreamingResponse(stream_response(), media_type="text/plain")

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
