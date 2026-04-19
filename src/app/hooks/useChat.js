'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { sendMessage } from '../utils/api'

/**
 * Generate a unique ID for conversations
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Custom hook managing all chat logic:
 * - Conversations list + active conversation
 * - Sending messages to the API
 * - localStorage persistence
 * - New chat / delete chat
 * - Search/filter
 */
export function useChat() {
  const [conversations, setConversations] = useLocalStorage('chatx-conversations', [])
  const [activeConversationId, setActiveConversationId] = useLocalStorage('chatx-active-id', null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentThinking, setCurrentThinking] = useState('')

  // Use a ref to always have the latest conversations for async operations
  const conversationsRef = useRef(conversations)
  useEffect(() => {
    conversationsRef.current = conversations
  }, [conversations])

  // Get active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId) || null

  // Get messages from active conversation
  const messages = activeConversation?.messages || []

  // Create a new chat
  const createNewChat = useCallback(() => {
    const newConv = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setConversations(prev => [newConv, ...prev])
    setActiveConversationId(newConv.id)
    setError(null)
    setCurrentThinking('')
    return newConv.id
  }, [setConversations, setActiveConversationId])

  // Select a conversation
  const selectConversation = useCallback((id) => {
    setActiveConversationId(id)
    setError(null)
    setCurrentThinking('')
  }, [setActiveConversationId])

  // Delete a conversation
  const deleteConversation = useCallback((id) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    setActiveConversationId(prev => prev === id ? null : prev)
    setCurrentThinking('')
  }, [setConversations, setActiveConversationId])

  // Send a message
  const sendChatMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return

    let convId = activeConversationId

    // Auto-create conversation if none active
    if (!convId) {
      const newConv = {
        id: generateId(),
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setConversations(prev => [newConv, ...prev])
      setActiveConversationId(newConv.id)
      convId = newConv.id
    }

    // Add user message
    const userMessage = { role: 'user', content, timestamp: new Date().toISOString() }

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        const title = c.messages.length === 0
          ? content.slice(0, 50) + (content.length > 50 ? '...' : '')
          : c.title
        return {
          ...c,
          title,
          messages: [...c.messages, userMessage],
          updatedAt: new Date().toISOString(),
        }
      }
      return c
    }))

    setIsLoading(true)
    setError(null)
    setCurrentThinking('')

    try {
      // Use the ref for getting the latest state for history
      // (the functional update above may not have merged yet)
      const latestConvs = conversationsRef.current
      const currentConv = latestConvs.find(c => c.id === convId)
      const history = currentConv ? [...currentConv.messages, userMessage] : [userMessage]

      const response = await sendMessage(content, history)

      setCurrentThinking(response.thinking)

      // Add assistant message
      const assistantMessage = {
        role: 'assistant',
        content: response.answer,
        thinking: response.thinking,
        timestamp: new Date().toISOString(),
      }

      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          return {
            ...c,
            messages: [...c.messages, assistantMessage],
            updatedAt: new Date().toISOString(),
          }
        }
        return c
      }))
    } catch (err) {
      const errorMsg = err.message || 'An unexpected error occurred. Please try again.'
      setError(errorMsg)

      // Add error message to conversation
      const errorMessage = {
        role: 'assistant',
        content: `⚠️ ${errorMsg}`,
        isError: true,
        timestamp: new Date().toISOString(),
      }

      setConversations(prev => prev.map(c => {
        if (c.id === convId) {
          return {
            ...c,
            messages: [...c.messages, errorMessage],
            updatedAt: new Date().toISOString(),
          }
        }
        return c
      }))
    } finally {
      setIsLoading(false)
    }
  }, [activeConversationId, isLoading, setConversations, setActiveConversationId])

  // Clear error
  const clearError = useCallback(() => setError(null), [])

  return {
    conversations,
    activeConversation,
    activeConversationId,
    messages,
    isLoading,
    error,
    currentThinking,
    createNewChat,
    selectConversation,
    deleteConversation,
    sendChatMessage,
    clearError,
  }
}
