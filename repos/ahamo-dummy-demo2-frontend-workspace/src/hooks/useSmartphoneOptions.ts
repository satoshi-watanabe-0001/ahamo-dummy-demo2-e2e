'use client'

import { useState, useEffect } from 'react'
import { SmartphoneApiService } from '@/services/api'
import { SmartphoneOptions } from '@/types'

export function useSmartphoneOptions(deviceId: string) {
  const [options, setOptions] = useState<SmartphoneOptions | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOptions() {
      try {
        setLoading(true)
        setError(null)
        const response = await SmartphoneApiService.getSmartphoneOptions(deviceId)

        if (response.status === 'success') {
          setOptions(response.data)
        } else {
          setError(response.message || 'オプション情報の取得に失敗しました')
        }
      } catch {
        setError('オプション情報の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    if (deviceId) {
      fetchOptions()
    } else {
      setLoading(false)
    }
  }, [deviceId])

  return { options, loading, error }
}
