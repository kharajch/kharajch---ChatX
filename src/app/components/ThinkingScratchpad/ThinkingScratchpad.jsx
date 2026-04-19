'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineLightBulb, HiOutlineChevronDown } from 'react-icons/hi2'
import { useState } from 'react'
import styles from './ThinkingScratchpad.module.css'

export default function ThinkingScratchpad({ thinking, isLoading }) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!thinking && !isLoading) return null

  return (
    <motion.div
      className={styles.scratchpad}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.headerLeft}>
          <HiOutlineLightBulb className={styles.bulbIcon} />
          <span className={styles.headerTitle}>Thinking Scratchpad</span>
          {isLoading && <span className={styles.thinkingDot} />}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <HiOutlineChevronDown className={styles.chevron} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.content}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading && !thinking ? (
              <div className={styles.loadingState}>
                <div className={styles.loadingDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <p>AI is thinking...</p>
              </div>
            ) : (
              <pre className={styles.thinkingText}>{thinking}</pre>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
