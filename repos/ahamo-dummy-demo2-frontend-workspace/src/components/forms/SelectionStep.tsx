import React from 'react'
import { SelectionStepProps } from '@/types/signup.types'

export function SelectionStep({ title, children, className = '' }: SelectionStepProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
