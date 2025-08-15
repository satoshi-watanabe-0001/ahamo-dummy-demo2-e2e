import React from 'react'

interface FeatureListProps {
  features?: string[]
  specifications?: string[]
  className?: string
}

export function FeatureList({
  features = [],
  specifications = [],
  className = '',
}: FeatureListProps) {
  const hasContent = features.length > 0 || specifications.length > 0

  if (!hasContent) {
    return null
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
      <h2 className="text-xl font-bold mb-4">主な機能</h2>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
        {specifications.map((spec, index) => (
          <div key={`spec-${index}`} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            <span className="text-gray-700">{spec}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
