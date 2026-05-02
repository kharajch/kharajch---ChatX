'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useChat } from './hooks/useChat'

import Sidebar from './components/Sidebar/Sidebar'
import ChatBox from './components/ChatBox/ChatBox'
import Footer from './components/Footer/Footer'
import styles from './page.module.css'

// Dynamic import for Hero (includes 3D scene)
const Hero = dynamic(
  () => import('./components/Hero/Hero'),
  { ssr: false }
)

const MOBILE_BREAKPOINT = 768

export default function Home() {
  const [view, setView] = useState('hero') // 'hero' or 'chat'
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const {
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
  } = useChat()

  // Detect mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleStartChat = () => {
    setView('chat')
    if (conversations.length === 0) {
      createNewChat()
    }
  }

  const handleNewChat = () => {
    createNewChat()
    if (isMobile) setSidebarOpen(false)
  }

  const handleSelectConversation = useCallback((id) => {
    selectConversation(id)
    if (isMobile) setSidebarOpen(false)
  }, [selectConversation, isMobile])

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {view === 'hero' ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className={styles.heroWrapper}
          >
            <Hero onStartChat={handleStartChat} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={styles.chatLayout}
          >
            {/* Mobile header */}
            <div className={styles.mobileHeader}>
              <button
                className={styles.menuBtn}
                onClick={handleToggleSidebar}
                aria-label="Toggle sidebar"
              >
                <span className={styles.menuBar} />
                <span className={styles.menuBar} />
                <span className={styles.menuBar} />
              </button>
              <h1 className={styles.headerTitle}>kharajch---ChatX</h1>
              <button
                className={styles.backBtn}
                onClick={() => setView('hero')}
                aria-label="Back to home"
              >
                ←
              </button>
            </div>

            <div className={styles.chatContainer}>
              {/* Mobile Backdrop */}
              <AnimatePresence>
                {isMobile && sidebarOpen && (
                  <motion.div
                    className={styles.sidebarBackdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleCloseSidebar}
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>

              {/* Sidebar */}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={isMobile
                      ? { x: '-100%', opacity: 1 }
                      : { width: 0, opacity: 0 }
                    }
                    animate={isMobile
                      ? { x: 0, opacity: 1 }
                      : { width: 'auto', opacity: 1 }
                    }
                    exit={isMobile
                      ? { x: '-100%', opacity: 1 }
                      : { width: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.sidebarWrapper}
                  >
                    <Sidebar
                      conversations={conversations}
                      activeConversationId={activeConversationId}
                      onSelectConversation={handleSelectConversation}
                      onNewChat={handleNewChat}
                      onDeleteConversation={deleteConversation}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Area */}
              <div className={styles.chatArea}>
                <ChatBox
                  messages={messages}
                  isLoading={isLoading}
                  currentThinking={currentThinking}
                  onSendMessage={sendChatMessage}
                  error={error}
                />
              </div>
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
