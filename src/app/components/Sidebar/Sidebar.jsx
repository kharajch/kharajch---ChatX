'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Sidebar.module.css'

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = searchQuery
    ? conversations.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations

  const getTimeAgo = (dateStr) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diff = Math.floor((now - date) / 1000)

    if (diff < 60) return 'now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <aside className={styles.sidebar} id="sidebar">
      <div className={styles.header}>
        <motion.button
          className={styles.newChatBtn}
          onClick={onNewChat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiOutlinePlus className={styles.plusIcon} />
          <span>New Chat</span>
        </motion.button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className={styles.conversationList}>
        <AnimatePresence>
          {filteredConversations.length === 0 ? (
            <motion.div
              className={styles.emptyState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <HiOutlineChatBubbleLeftRight className={styles.emptyIcon} />
              <p>{searchQuery ? 'No matches found' : 'No conversations yet'}</p>
            </motion.div>
          ) : (
            filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                className={`${styles.conversationItem} ${
                  activeConversationId === conv.id ? styles.active : ''
                }`}
                onClick={() => onSelectConversation(conv.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div className={styles.convContent}>
                  <span className={styles.convTitle}>{conv.title}</span>
                  <span className={styles.convTime}>{getTimeAgo(conv.updatedAt)}</span>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteConversation(conv.id)
                  }}
                  title="Delete conversation"
                >
                  <HiOutlineTrash />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </aside>
  )
}
