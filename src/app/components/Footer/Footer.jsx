import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.content}>
        <span className={styles.brand}>kharajch---ChatX</span>
        <span className={styles.separator}>·</span>
        <span className={styles.attribution}>
          Powered by <span className={styles.highlight}>Ollama</span>
        </span>
      </div>
    </footer>
  )
}
