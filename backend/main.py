"""
kharajch---ChatX Backend
FastAPI + LangChain + OpenRouter
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
nvidia_model = os.getenv("NVIDIA_MODEL", "meta/llama-3.1-70b-instruct")
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

if nvidia_api_key:
    llm = ChatNVIDIA(
        model=nvidia_model,
        api_key=nvidia_api_key
    )
else:
    print("⚠️ WARNING: NVIDIA_API_KEY is not set. Please update your .env file.")
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


SYSTEM_PROMPT = """You are ChatX, a helpful, knowledgeable, and friendly AI assistant created by kharajch. 
You provide clear, accurate, and well-structured responses. 
When answering questions:
1. Provide a clear, concise answer
2. Use markdown formatting in your answers when helpful
3. Be conversational and engaging
4. If you don't know something, say so honestly"""


@app.get("/api/")
async def root():
    return {"status": "ok", "message": "kharajch---ChatX API is running"}


@app.post("/api/search", response_model=SearchResponse)
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
            
        response = llm.invoke(messages)
        content = response.content if hasattr(response, 'content') else str(response)

        return SearchResponse(
            answer=content,
            thinking=""
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
