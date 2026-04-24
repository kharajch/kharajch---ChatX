'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import styles from './Hero.module.css'

const Scene3D = dynamic(
  () => import('../Scene3D/Scene3D'),
  { ssr: false }
)

export default function Hero({ onStartChat }) {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className={styles.hero} id="hero-section">
      <Scene3D className={styles.scene} />

      <div className={styles.content}>
        <motion.div
          className={styles.logoContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.logoGlow} />
          <Image
            src="/logo.png"
            alt="ChatX Logo"
            width={120}
            height={120}
            className={styles.logo}
            priority
          />
        </motion.div>

        <h1 ref={titleRef} className={styles.title}>
          <span className={styles.titleAccent}>kharajch</span>
          <span className={styles.titleSeparator}>---</span>
          <span className={styles.titleMain}>ChatX</span>
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          Powered by NVIDIA NIM
        </p>

        <motion.button
          className={styles.ctaButton}
          onClick={onStartChat}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className={styles.ctaText}>Start Chatting</span>
          <span className={styles.ctaArrow}>→</span>
        </motion.button>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className={styles.scrollLine} />
        </motion.div>
      </div>
    </section>
  )
}
