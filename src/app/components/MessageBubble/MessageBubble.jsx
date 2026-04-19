'use client'

import { motion } from 'framer-motion'
import { HiOutlineUser, HiOutlineSparkles } from 'react-icons/hi2'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ message, index }) {
  const isUser = message.role === 'user'
  const isError = message.isError

  return (
    <motion.div
      className={`${styles.bubbleRow} ${isUser ? styles.user : styles.assistant}`}
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {!isUser && (
        <div className={styles.avatar}>
          <HiOutlineSparkles />
        </div>
      )}

      <div className={`${styles.bubble} ${isError ? styles.error : ''}`}>
        <div className={`markdown-content ${styles.content}`}>
          {message.content}
        </div>
        <span className={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {isUser && (
        <div className={`${styles.avatar} ${styles.userAvatar}`}>
          <HiOutlineUser />
        </div>
      )}
    </motion.div>
  )
}
