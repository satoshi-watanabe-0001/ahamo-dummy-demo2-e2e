import React from 'react'
import { ResultMessageProps } from '@/types/signup.types'

export function ResultMessage({ message }: ResultMessageProps) {
  if (!message) return null

  return (
    <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="text-blue-800 font-medium">{message}</div>
    </div>
  )
}
