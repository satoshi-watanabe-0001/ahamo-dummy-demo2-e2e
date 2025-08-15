'use client'

import React, { useEffect } from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { logError } from '@/lib/logger'

interface ErrorMessageProps {
  message: string
  backgroundGradient?: string
  className?: string
}

export function ErrorMessage({
  message,
  backgroundGradient = 'from-purple-100 via-blue-50 to-cyan-100',
  className = '',
}: ErrorMessageProps) {
  useEffect(() => {
    logError('Error message displayed to user', new Error(message), {
      component: 'ErrorMessage',
      backgroundGradient,
      className,
    })
  }, [message, backgroundGradient, className])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden ${className}`}
    >
      <SectionContainer className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-red-600"
            role="alert"
            aria-live="assertive"
            aria-label={`エラー: ${message}`}
          >
            エラーが発生しました: {message}
          </p>
        </div>
      </SectionContainer>
    </div>
  )
}
