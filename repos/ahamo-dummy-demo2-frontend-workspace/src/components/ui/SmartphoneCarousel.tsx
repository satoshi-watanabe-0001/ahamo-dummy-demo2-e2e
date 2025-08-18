'use client'

import React, { useState, useEffect } from 'react'
import { SmartphoneProduct } from '@/types/index'
import { Button } from '@/components/ui/button'
import { useSmartphones } from '@/hooks/useSmartphones'

interface SmartphoneCarouselProps {
  smartphones?: SmartphoneProduct[]
}

export function SmartphoneCarousel({ smartphones: propSmartphones }: SmartphoneCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const { smartphones: apiSmartphones, loading, error } = useSmartphones()
  const smartphones = propSmartphones || apiSmartphones

  useEffect(() => {
    if (!isAutoPlaying || !smartphones || smartphones.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % smartphones.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [smartphones, isAutoPlaying])

  if (loading && !propSmartphones) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">スマホ情報を読み込み中...</h3>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error && !propSmartphones) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">データの読み込みに失敗しました</h3>
          <p className="text-red-100">{error}</p>
        </div>
      </div>
    )
  }

  if (!smartphones || smartphones.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-500 via-slate-500 to-gray-600 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">スマホ情報がありません</h3>
          <p className="text-gray-100">現在表示できるスマートフォンがありません</p>
        </div>
      </div>
    )
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % smartphones.length)
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + smartphones.length) % smartphones.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getVisibleSmartphones = () => {
    const visibleCount = 3
    const smartphones_extended = [...smartphones, ...smartphones, ...smartphones]
    const startIndex = smartphones.length + currentIndex - Math.floor(visibleCount / 2)
    return smartphones_extended.slice(startIndex, startIndex + visibleCount)
  }

  const visibleSmartphones = getVisibleSmartphones()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 shadow-2xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative">
        <div className="text-center text-white mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">おすすめのスマホ機種をチェック</h3>
          <p className="text-emerald-50 max-w-2xl mx-auto">
            最新機種から人気モデルまで、あなたにぴったりのスマートフォンを見つけよう
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {visibleSmartphones.map((smartphone, index) => {
              const isCentered = index === 1
              return (
                <div
                  key={`${smartphone.id}-${index}`}
                  className={`transition-all duration-500 ${
                    isCentered ? 'scale-110 z-10' : 'scale-90 opacity-70'
                  }`}
                >
                  <div className="bg-white rounded-xl p-4 shadow-lg w-64 h-80">
                    <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={smartphone.imageUrl}
                        alt={smartphone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{smartphone.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{smartphone.brand}</p>
                      <p className="text-xl font-bold text-orange-600 mb-3">{smartphone.price}</p>
                      <div className="space-y-1">
                        {smartphone.features.slice(0, 2).map((feature: string, idx: number) => (
                          <p key={idx} className="text-xs text-gray-500">
                            {feature}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <Button
              onClick={goToPrevious}
              className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-10 h-10 p-0"
            >
              ←
            </Button>

            <div className="flex space-x-2">
              {smartphones.map((_: SmartphoneProduct, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-10 h-10 p-0"
            >
              →
            </Button>
          </div>

          <div className="text-center">
            <Button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-white/20 hover:bg-white/30 text-white border-0 px-4 py-2 rounded-lg text-sm"
            >
              {isAutoPlaying ? '⏸️ 自動再生中' : '▶️ 自動再生'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
