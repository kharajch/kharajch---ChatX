'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlinePaperAirplane, HiOutlineSparkles } from 'react-icons/hi2'
import MessageBubble from '../MessageBubble/MessageBubble'
import ThinkingScratchpad from '../ThinkingScratchpad/ThinkingScratchpad'
import styles from './ChatBox.module.css'

export default function ChatBox({
  messages,
  isLoading,
  currentThinking,
  onSendMessage,
  error,
}) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + 'px'
    }
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    onSendMessage(input.trim())
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className={styles.chatBox} id="chat-box">
      {/* Messages Area */}
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <div className={styles.welcomeState}>
            <motion.div
              className={styles.welcomeIcon}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HiOutlineSparkles />
            </motion.div>
            <motion.h2
              className={styles.welcomeTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              What can I help you with?
            </motion.h2>
            <motion.p
              className={styles.welcomeSubtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ask me anything — from coding questions to creative writing
            </motion.p>
            <motion.div
              className={styles.suggestions}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                'Explain quantum computing',
                'Write a Python script',
                'Suggest a book to read',
                'Help me brainstorm ideas',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  className={styles.suggestionChip}
                  onClick={() => {
                    setInput(suggestion)
                    textareaRef.current?.focus()
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className={styles.messagesList}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <MessageBubble key={`${msg.timestamp}-${i}`} message={msg} index={i} />
              ))}
            </AnimatePresence>

            {/* Loading/Thinking indicator */}
            {isLoading && (
              <ThinkingScratchpad thinking={currentThinking} isLoading={isLoading} />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
            id="message-input"
          />
          <motion.button
            type="submit"
            className={`${styles.sendBtn} ${input.trim() ? styles.sendBtnActive : ''}`}
            disabled={!input.trim() || isLoading}
            whileHover={input.trim() ? { scale: 1.05 } : {}}
            whileTap={input.trim() ? { scale: 0.95 } : {}}
          >
            <HiOutlinePaperAirplane className={styles.sendIcon} />
          </motion.button>
        </div>
        <p className={styles.disclaimer}>
          ChatX can make mistakes. Please verify important information.
        </p>
      </form>
    </div>
  )
}
