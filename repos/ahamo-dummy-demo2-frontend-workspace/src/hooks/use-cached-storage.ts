import { useState, useEffect } from 'react'
import { logError } from '@/lib/logger'

interface CachedData<T> {
  value: T
  timestamp: number
  expiresAt: number
}

export function useCachedStorage<T>(
  key: string,
  initialValue: T,
  expirationMinutes: number = 30
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return initialValue

      const cachedData: CachedData<T> = JSON.parse(item)
      const now = Date.now()

      if (now > cachedData.expiresAt) {
        window.localStorage.removeItem(key)
        return initialValue
      }

      return cachedData.value
    } catch (error) {
      logError(`Error reading cached localStorage key "${key}"`, error, { key })
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      if (typeof window !== 'undefined') {
        const now = Date.now()
        const cachedData: CachedData<T> = {
          value: valueToStore,
          timestamp: now,
          expiresAt: now + expirationMinutes * 60 * 1000,
        }
        window.localStorage.setItem(key, JSON.stringify(cachedData))
      }

      setStoredValue(valueToStore)
    } catch (error) {
      logError(`Error setting cached localStorage key "${key}"`, error, { key })
    }
  }

  const clearCache = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
      setStoredValue(initialValue)
    } catch (error) {
      logError(`Error clearing cached localStorage key "${key}"`, error, { key })
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkExpiration = () => {
      try {
        const item = window.localStorage.getItem(key)
        if (!item) return

        const cachedData: CachedData<T> = JSON.parse(item)
        const now = Date.now()

        if (now > cachedData.expiresAt) {
          window.localStorage.removeItem(key)
          setStoredValue(initialValue)
        }
      } catch (error) {
        logError(`Error checking expiration for key "${key}"`, error, { key })
      }
    }

    checkExpiration()
  }, [key, initialValue])

  return [storedValue, setValue, clearCache]
}
