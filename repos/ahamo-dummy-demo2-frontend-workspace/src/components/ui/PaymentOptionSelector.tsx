'use client'

import React from 'react'

export interface PaymentOption {
  id: string
  title: string
  subtitle: string
  description: string
}

interface PaymentOptionSelectorProps {
  options: PaymentOption[]
  selectedOption: string
  onOptionSelect: (optionId: string) => void
  className?: string
}

export function PaymentOptionSelector({
  options,
  selectedOption,
  onOptionSelect,
  className = '',
}: PaymentOptionSelectorProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      <h2 className="text-xl font-bold mb-4">料金プラン</h2>
      <div className="space-y-4">
        {options.map(option => (
          <div
            key={option.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onOptionSelect(option.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOptionSelect(option.id)
              }
            }}
            aria-label={`${option.title} ${option.subtitle}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">{option.title}</div>
                <div className="text-sm text-gray-600">{option.subtitle}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedOption === option.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
