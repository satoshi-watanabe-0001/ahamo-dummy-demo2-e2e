'use client'

import React, { useEffect, useState } from 'react'
import { enableMocking } from '@/lib/msw'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      await enableMocking()
      setMswReady(true)
    }

    init()
  }, [])

  if (!mswReady) {
    return null
  }

  return <>{children}</>
}
