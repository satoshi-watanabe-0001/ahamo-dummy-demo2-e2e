'use client'

import { useState, useEffect, useCallback } from 'react'
import { SmartphoneProduct } from '@/types/index'
import { SmartphoneApiService, ApiResponse, SmartphoneApiResponse } from '@/services/api'
import { logError, logInfo, logDebug } from '@/lib/logger'

interface UseSmartphonesResult {
  smartphones: SmartphoneProduct[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  total: number
  page: number
}

export function useSmartphones(
  initialPage: number = 1,
  limit: number = 10,
  brand?: string
): UseSmartphonesResult {
  const [smartphones, setSmartphones] = useState<SmartphoneProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(initialPage)

  const fetchSmartphones = useCallback(async () => {
    logDebug('Fetching smartphones', { page, limit, brand })

    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<SmartphoneApiResponse> =
        await SmartphoneApiService.getSmartphones(page, limit, brand)

      if (response.status === 'success') {
        logInfo('Successfully fetched smartphones', {
          count: response.data.smartphones.length,
          total: response.data.total,
          page: response.data.page,
        })
        setSmartphones(response.data.smartphones)
        setTotal(response.data.total)
        setPage(response.data.page)
      } else {
        const errorMessage = response.message || 'Failed to fetch smartphones'
        logError('Failed to fetch smartphones', new Error(errorMessage), { page, limit, brand })
        setError(errorMessage)
        setSmartphones([])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      logError('Exception in fetchSmartphones', err, { page, limit, brand })
      setError(errorMessage)
      setSmartphones([])
    } finally {
      setLoading(false)
    }
  }, [page, limit, brand])

  useEffect(() => {
    fetchSmartphones()
  }, [page, limit, brand, fetchSmartphones])

  return {
    smartphones,
    loading,
    error,
    refetch: fetchSmartphones,
    total,
    page,
  }
}

export function useSmartphone(id: string) {
  const [smartphone, setSmartphone] = useState<SmartphoneProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSmartphone = async () => {
      logDebug('Fetching smartphone by ID', { id })

      try {
        setLoading(true)
        setError(null)

        const response = await SmartphoneApiService.getSmartphoneById(id)

        if (response.status === 'success') {
          logInfo('Successfully fetched smartphone', {
            id,
            smartphoneName: response.data?.name,
          })
          setSmartphone(response.data)
        } else {
          const errorMessage = response.message || 'Failed to fetch smartphone'
          logError('Failed to fetch smartphone by ID', new Error(errorMessage), { id })
          setError(errorMessage)
          setSmartphone(null)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        logError('Exception in fetchSmartphone', err, { id })
        setError(errorMessage)
        setSmartphone(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchSmartphone()
    }
  }, [id])

  return { smartphone, loading, error }
}
