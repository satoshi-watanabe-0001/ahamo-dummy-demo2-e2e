'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/GradientButton'
import { PaymentOptionSelector, PaymentOption } from '@/components/ui/PaymentOptionSelector'
import { ColorSelector } from '@/components/ui/ColorSelector'
import { FeatureList } from '@/components/ui/FeatureList'
import { ESIMSection } from '@/components/ui/ESIMSection'
import { TradeInSection } from '@/components/ui/TradeInSection'
import { AccessoryGrid } from '@/components/ui/AccessoryGrid'
import { useSmartphone } from '@/hooks/useSmartphones'
import { mockSmartphones } from '@/lib/mockData'

interface DeviceDetailPageProps {
  deviceId: string
}

export function DeviceDetailPage({ deviceId }: DeviceDetailPageProps) {
  const router = useRouter()

  const smartphoneFromSlug = mockSmartphones.find(
    phone => phone.link === `/smartphones/${deviceId}` || phone.id === deviceId
  )
  const actualId = smartphoneFromSlug?.id || deviceId

  const { smartphone, loading, error } = useSmartphone(actualId)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('0yen')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <SectionContainer className="py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner className="border-blue-600" />
          </div>
        </SectionContainer>
      </div>
    )
  }

  if (error || !smartphone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <SectionContainer className="py-12">
          <ErrorMessage
            message={error || 'デバイスが見つかりませんでした'}
            className="max-w-md mx-auto"
          />
          <div className="text-center mt-6">
            <Button onClick={() => router.back()} variant="outline" className="px-6 py-2">
              戻る
            </Button>
          </div>
        </SectionContainer>
      </div>
    )
  }

  const paymentOptions: PaymentOption[] = [
    {
      id: '0yen',
      title: '0円',
      subtitle: 'いつでもカエドキプログラム適用時',
      description: 'お客様負担額',
    },
    {
      id: '4872yen',
      title: '4,872円',
      subtitle: '分割払い（24回）',
      description: '月々のお支払い',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SectionContainer className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => router.back()} variant="outline" className="mb-4">
              ← 戻る
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{smartphone.name}</h1>
            <p className="text-gray-600">{smartphone.brand}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-64 h-80 mx-auto bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-6">
                  <img
                    src={smartphone.imageUrl}
                    alt={smartphone.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <ColorSelector
                  colors={smartphone.colorOptions || []}
                  selectedColorIndex={selectedColor}
                  onColorSelect={setSelectedColor}
                  className="mb-6"
                />
              </div>
            </div>

            <div className="space-y-6">
              <PaymentOptionSelector
                options={paymentOptions}
                selectedOption={selectedPaymentOption}
                onOptionSelect={setSelectedPaymentOption}
              />

              <FeatureList
                features={smartphone.features}
                specifications={smartphone.specifications}
              />
            </div>
          </div>

          <ESIMSection className="mb-8" />

          <TradeInSection className="mb-8" />

          <AccessoryGrid className="mb-8" />

          <div className="text-center">
            <GradientButton
              size="lg"
              className="px-12 py-4 text-lg"
              onClick={() => router.push(`/smartphone-options/${smartphone.id}`)}
            >
              この機種で申し込む
            </GradientButton>
            <p className="text-gray-500 text-sm mt-4">
              ※ 在庫状況により、お届けまでお時間をいただく場合があります
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
