'use client'

import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.searchContainer}>
      <HiOutlineMagnifyingGlass className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search conversations..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-conversations"
      />
    </div>
  )
}
