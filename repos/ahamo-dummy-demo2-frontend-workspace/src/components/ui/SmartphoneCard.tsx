'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SmartphoneProduct } from '@/types/index'
import { Button } from '@/components/ui/button'

interface SmartphoneCardProps {
  smartphone: SmartphoneProduct
  className?: string
}

export function SmartphoneCard({ smartphone, className = '' }: SmartphoneCardProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const router = useRouter()

  const handleViewDetails = () => {
    const deviceId = smartphone.link?.replace('/smartphones/', '') || smartphone.id
    router.push(`/smartphones/${deviceId}`)
  }

  return (
    <article
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}
      role="article"
      aria-label={`${smartphone.name}の詳細`}
    >
      {smartphone.saleLabel && (
        <div className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-md text-sm mb-4 inline-block">
          {smartphone.saleLabel}
        </div>
      )}

      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-40 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={smartphone.imageUrl}
              alt={smartphone.name}
              className="w-full h-full object-cover"
              // eslint-disable-next-line @next/next/no-img-element
            />
          </div>

          {smartphone.colorOptions && smartphone.colorOptions.length > 0 && (
            <div className="flex justify-center space-x-2 mt-3">
              {smartphone.colorOptions.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedColor(index)
                    }
                  }}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === index ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.colorCode }}
                  title={color.name}
                  aria-label={`${color.name}を選択`}
                  tabIndex={0}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{smartphone.name}</h3>
            {smartphone.has5G && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                5G
              </span>
            )}
          </div>

          {smartphone.description && (
            <p className="text-sm text-gray-600 mb-3">{smartphone.description}</p>
          )}

          <div className="mb-4">
            {smartphone.features.map((feature, index) => (
              <p key={index} className="text-sm text-gray-600">
                {feature}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-orange-600">{smartphone.price}</div>
            <Button
              onClick={handleViewDetails}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              aria-label="詳細を見る"
            >
              →
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
