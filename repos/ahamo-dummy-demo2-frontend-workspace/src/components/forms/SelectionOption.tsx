import React from 'react'
import { SelectionOptionProps } from '@/types/signup.types'

export function SelectionOption({
  title,
  description,
  isSelected,
  onClick,
  className = '',
}: SelectionOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
        isSelected
          ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 text-orange-800 shadow-md'
          : 'border-gray-200 hover:border-orange-300 text-gray-700 bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-orange-50'
      } ${className}`}
    >
      <div className="font-semibold text-lg">{title}</div>
      <div className="text-sm text-gray-600 mt-2 leading-relaxed">{description}</div>
    </button>
  )
}
