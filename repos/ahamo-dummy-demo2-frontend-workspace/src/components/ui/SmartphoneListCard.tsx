'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SmartphoneProduct } from '@/types/index'
import { Button } from '@/components/ui/button'

interface SmartphoneListCardProps {
  smartphone: SmartphoneProduct
  className?: string
}

export function SmartphoneListCard({ smartphone, className = '' }: SmartphoneListCardProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const router = useRouter()

  const handleViewDetails = () => {
    const deviceId = smartphone.link?.replace('/smartphones/', '') || smartphone.id
    router.push(`/smartphones/${deviceId}`)
  }

  return (
    <article
      className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 ${className}`}
      role="article"
      aria-label={`${smartphone.name}の詳細`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={smartphone.imageUrl}
              alt={smartphone.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              {smartphone.saleLabel && (
                <div className="bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs mb-2 inline-block">
                  {smartphone.saleLabel}
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-800 mb-1">{smartphone.name}</h3>
              {smartphone.description && (
                <p className="text-xs text-gray-600 mb-2">{smartphone.description}</p>
              )}
            </div>
          </div>

          {smartphone.colorOptions && smartphone.colorOptions.length > 0 && (
            <div className="flex space-x-2 mb-3">
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
                  className={`w-5 h-5 rounded-full border-2 ${
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

          <div className="mb-2">
            {smartphone.features.slice(0, 2).map((feature, index) => (
              <p key={index} className="text-xs text-gray-600">
                {feature}
              </p>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="text-xl font-bold text-orange-600 mb-3">{smartphone.price}</div>
          <Button
            onClick={handleViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            aria-label="詳細を見る"
          >
            →
          </Button>
        </div>
      </div>
    </article>
  )
}
