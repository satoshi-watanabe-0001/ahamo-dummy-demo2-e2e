'use client'

import React, { useState, useEffect } from 'react'
import { Campaign } from '@/types/index'
import { CampaignCard } from './CampaignCard'
import { Button } from './button'

interface CampaignCarouselProps {
  campaigns: Campaign[]
}

export function CampaignCarousel({ campaigns }: CampaignCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === campaigns.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [campaigns.length, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? campaigns.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === campaigns.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }

  const getVisibleCampaigns = () => {
    const visibleCount = 3
    const result: Array<{
      campaign: Campaign
      position: number
      index: number
    }> = []

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex - 1 + i + campaigns.length) % campaigns.length
      result.push({
        campaign: campaigns[index],
        position: i - 1, // -1: left, 0: center, 1: right
        index,
      })
    }

    return result
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={goToPrevious}
          variant="outline"
          size="sm"
          className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
        >
          ←
        </Button>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">🎯 おすすめキャンペーン情報</h3>
          <p className="text-gray-600">
            {currentIndex + 1} / {campaigns.length}
          </p>
        </div>

        <Button
          onClick={goToNext}
          variant="outline"
          size="sm"
          className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
        >
          →
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-4 py-8">
          {getVisibleCampaigns().map(({ campaign, position, index }) => (
            <div
              key={campaign.id}
              className={`transition-all duration-500 ease-in-out cursor-pointer ${
                position === 0
                  ? 'scale-110 z-20 opacity-100' // Center card - focused
                  : position === -1 || position === 1
                    ? 'scale-90 z-10 opacity-70 hover:opacity-90' // Side cards
                    : 'scale-75 z-0 opacity-50'
              }`}
              onClick={() => goToSlide(index)}
              style={{
                transform: `translateX(${position * 20}px) scale(${
                  position === 0 ? 1.1 : position === -1 || position === 1 ? 0.9 : 0.75
                })`,
              }}
            >
              <div className="w-80">
                <CampaignCard campaign={campaign} compact={position !== 0} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {campaigns.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
            isAutoPlaying
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isAutoPlaying ? '⏸️ 自動再生中' : '▶️ 自動再生停止中'}
        </button>
      </div>
    </div>
  )
}
