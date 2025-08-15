'use client'

import React from 'react'

export interface ColorOption {
  name: string
  colorCode: string
}

interface ColorSelectorProps {
  colors: ColorOption[]
  selectedColorIndex: number
  onColorSelect: (index: number) => void
  className?: string
}

export function ColorSelector({
  colors,
  selectedColorIndex,
  onColorSelect,
  className = '',
}: ColorSelectorProps) {
  if (!colors || colors.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3">カラー</h3>
      <div className="flex justify-center space-x-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onColorSelect(index)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              selectedColorIndex === index
                ? 'border-blue-600 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.colorCode }}
            aria-label={color.name}
            title={color.name}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center">{colors[selectedColorIndex]?.name}</p>
    </div>
  )
}
