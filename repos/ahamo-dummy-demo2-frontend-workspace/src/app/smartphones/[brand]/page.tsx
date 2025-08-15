'use client'

import React, { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SmartphoneListCard } from '@/components/ui/SmartphoneListCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useSmartphones } from '@/hooks/useSmartphones'
import { Button } from '@/components/ui/button'
import { sortSmartphones } from '@/utils/priceUtils'
import { DeviceDetailPage } from '@/components/DeviceDetailPage'

const brandConfig = {
  iphone: {
    title: 'iPhoneの選択',
    loadingMessage: 'iPhoneを読み込み中...',
    backgroundGradient: 'from-purple-100 via-blue-50 to-cyan-100',
    spinnerColor: 'border-blue-600',
    apiParam: 'iPhone',
    theme: {
      background: 'bg-white',
      backgroundElements: (
        <>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 opacity-30"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-cyan-200 via-blue-200 to-purple-200 opacity-30"></div>
        </>
      ),
      headerLayout: 'center',
      maxWidth: 'max-w-4xl',
      titleSize: 'text-2xl',
      selectFocus: 'focus:ring-blue-500',
      linkColor: 'text-blue-600 hover:text-blue-800',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      buttonBorder: 'border-blue-600 text-blue-600 hover:bg-blue-50',
      otherBrand: 'android',
      otherBrandText: 'Androidの製品の一覧を見る →',
    },
  },
  android: {
    title: 'Androidの選択',
    loadingMessage: 'Androidを読み込み中...',
    backgroundGradient: 'from-green-100 via-emerald-50 to-teal-100',
    spinnerColor: 'border-green-600',
    apiParam: 'Android',
    theme: {
      background: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100',
      backgroundElements: (
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <path d="M0,200 Q250,100 500,200 T1000,200 L1000,0 L0,0 Z" fill="rgba(255,255,255,0.1)" />
          <path
            d="M0,800 Q250,700 500,800 T1000,800 L1000,1000 L0,1000 Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      ),
      headerLayout: 'between',
      maxWidth: 'max-w-6xl',
      titleSize: 'text-3xl',
      selectFocus: 'focus:ring-green-500',
      linkColor: 'text-green-600 hover:text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      buttonBorder: 'border-green-600 text-green-600 hover:bg-green-50',
      otherBrand: 'iphone',
      otherBrandText: 'iPhoneの製品の一覧を見る →',
      badge: (
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Android
        </div>
      ),
    },
  },
}

export default function SmartphoneSelectionPage() {
  const params = useParams()
  const brand = params.brand as string
  const [sortOrder, setSortOrder] = useState('recommended')
  const router = useRouter()

  const isDeviceId = !['iphone', 'android', 'docomo-certified'].includes(brand.toLowerCase())
  const config = brandConfig[brand as keyof typeof brandConfig]
  const { smartphones, loading, error } = useSmartphones(1, 10, config?.apiParam || '')

  const sortedSmartphones = useMemo(() => {
    return sortSmartphones(smartphones, sortOrder)
  }, [smartphones, sortOrder])

  if (isDeviceId) {
    return <DeviceDetailPage deviceId={brand} />
  }

  if (!config) {
    return (
      <ErrorMessage
        message={`無効なブランドパラメータ: ${brand}`}
        backgroundGradient="from-red-100 via-red-50 to-red-100"
      />
    )
  }

  const handleBack = () => {
    router.back()
  }

  const handleOtherBrandLink = () => {
    router.push(`/smartphones/${config.theme.otherBrand}`)
  }

  if (loading) {
    return (
      <LoadingSpinner
        message={config.loadingMessage}
        backgroundGradient={config.backgroundGradient}
        spinnerColor={config.spinnerColor}
      />
    )
  }

  if (error) {
    return <ErrorMessage message={error} backgroundGradient={config.backgroundGradient} />
  }

  return (
    <div className={`min-h-screen ${config.theme.background} relative overflow-hidden`}>
      <div className="absolute inset-0">{config.theme.backgroundElements}</div>

      <SectionContainer className="relative z-10 py-8">
        <div className={`${config.theme.maxWidth} mx-auto`}>
          {config.theme.headerLayout === 'center' ? (
            <div className="text-center mb-8">
              <h1 className={`${config.theme.titleSize} font-bold text-gray-800 mb-4`}>
                {config.title}
              </h1>

              <div className="flex justify-center">
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className={`bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 ${config.theme.selectFocus}`}
                >
                  <option value="recommended">おすすめ順</option>
                  <option value="price-low">価格の安い順</option>
                  <option value="price-high">価格の高い順</option>
                  <option value="newest">新しい順</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h1 className={`${config.theme.titleSize} font-bold text-gray-800`}>
                  {config.title}
                </h1>
                {brand === 'android' && 'badge' in config.theme && config.theme.badge}
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className={`bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 ${config.theme.selectFocus}`}
                >
                  <option value="recommended">おすすめ順</option>
                  <option value="price-low">価格の安い順</option>
                  <option value="price-high">価格の高い順</option>
                  <option value="newest">新しい順</option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-12">
            {sortedSmartphones.map(smartphone => (
              <SmartphoneListCard key={smartphone.id} smartphone={smartphone} />
            ))}
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleOtherBrandLink}
              className={`${config.theme.linkColor} font-medium flex items-center justify-center mx-auto`}
            >
              {config.theme.otherBrandText}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-red-600 font-bold text-lg mr-2">docomo</span>
              <span className="text-gray-800 font-normal text-lg">Certified</span>
            </div>
            <p className="text-gray-600 mb-6">
              ドコモの厳しい検査基準をクリアした高品質なリユース品
            </p>
            <Button className={`${config.theme.buttonColor} text-white px-8 py-3 rounded-lg`}>
              リユース品を見る
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-center mb-8">
            <p className="text-gray-700 mb-4">
              ahamoで販売中の端末以外を購入する場合はドコモオンラインショップをご利用ください。
            </p>
            <Button
              variant="outline"
              className={`${config.theme.buttonBorder} px-6 py-2 rounded-lg`}
            >
              ドコモオンラインショップへ →
            </Button>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full"
            >
              戻る
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
