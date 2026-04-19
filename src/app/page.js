'use client'

import { useState } from 'react'
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

export default function Home() {
  const [view, setView] = useState('hero') // 'hero' or 'chat'
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  const handleStartChat = () => {
    setView('chat')
    if (conversations.length === 0) {
      createNewChat()
    }
  }

  const handleNewChat = () => {
    createNewChat()
  }

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
                onClick={() => setSidebarOpen(!sidebarOpen)}
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
              >
                ←
              </button>
            </div>

            <div className={styles.chatContainer}>
              {/* Sidebar */}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.sidebarWrapper}
                  >
                    <Sidebar
                      conversations={conversations}
                      activeConversationId={activeConversationId}
                      onSelectConversation={selectConversation}
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
