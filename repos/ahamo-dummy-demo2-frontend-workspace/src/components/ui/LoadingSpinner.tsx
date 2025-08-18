'use client'

import React from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'

interface LoadingSpinnerProps {
  message?: string
  backgroundGradient?: string
  spinnerColor?: string
  className?: string
}

export function LoadingSpinner({
  message = '読み込み中...',
  backgroundGradient = 'from-purple-100 via-blue-50 to-cyan-100',
  spinnerColor = 'border-blue-600',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden ${className}`}
    >
      <SectionContainer className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-b-2 ${spinnerColor} mx-auto`}
            role="status"
            aria-live="polite"
            aria-label={message}
          ></div>
          <p className="mt-4 text-gray-600">{message}</p>
        </div>
      </SectionContainer>
    </div>
  )
}
