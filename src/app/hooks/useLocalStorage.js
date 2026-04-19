'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Custom hook for persisting state in localStorage
 * Handles SSR gracefully and provides error handling
 * 
 * Uses a ref to track the latest value, ensuring functional updates
 * always operate on fresh state (avoids stale closures).
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with localStorage value or fallback
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Keep a ref in sync so we always have the latest value for localStorage writes
  const valueRef = useRef(storedValue)
  useEffect(() => {
    valueRef.current = storedValue
  }, [storedValue])

  // Wrapped setter that also persists to localStorage
  const setValue = useCallback((value) => {
    try {
      if (value instanceof Function) {
        // Use React's functional updater to get the latest state
        setStoredValue(prev => {
          const newValue = value(prev)
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(newValue))
          }
          return newValue
        })
      } else {
        setStoredValue(value)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(value))
        }
      }
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error)
    }
  }, [key])

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
