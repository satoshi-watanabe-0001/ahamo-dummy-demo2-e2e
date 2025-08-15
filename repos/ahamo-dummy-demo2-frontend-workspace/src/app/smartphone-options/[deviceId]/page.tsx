'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/GradientButton'
import { OptionSelector } from '@/components/forms/OptionSelector'
import { PriceSimulation } from '@/components/ui/PriceSimulation'
import { useSmartphoneOptions } from '@/hooks/useSmartphoneOptions'

export default function SmartphoneOptionsPage() {
  const params = useParams()
  const router = useRouter()
  const deviceId = params.deviceId as string

  const { options, loading, error } = useSmartphoneOptions(deviceId)

  const [selectedDataPlan, setSelectedDataPlan] = useState<string | null>(null)
  const [selectedVoiceOption, setSelectedVoiceOption] = useState<string | null>(null)
  const [selectedOverseaOption, setSelectedOverseaOption] = useState<string | null>(null)

  if (loading) {
    return (
      <LoadingSpinner
        message="オプション情報を読み込み中..."
        backgroundGradient="from-blue-100 via-white to-purple-100"
        spinnerColor="border-blue-600"
      />
    )
  }

  if (error || !options) {
    return (
      <ErrorMessage
        message={error || 'オプション情報の取得に失敗しました'}
        backgroundGradient="from-red-100 via-red-50 to-red-100"
      />
    )
  }

  const handleNext = () => {
    router.push('/signup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <SectionContainer className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="mb-6 hover:shadow-md transition-shadow"
            >
              ← 戻る
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
              データ通信量・オプションの選択
            </h1>
          </div>

          <div className="space-y-12">
            <OptionSelector
              title="データ通信量"
              options={options.dataPlans.map(plan => ({
                id: plan.id,
                title: plan.title,
                description: `${plan.subtitle}`,
                price: plan.price,
              }))}
              selectedOption={selectedDataPlan}
              onOptionSelect={setSelectedDataPlan}
            />

            <OptionSelector
              title="ボイスオプション"
              options={options.voiceOptions.map(voice => ({
                id: voice.id,
                title: voice.title,
                description: voice.description,
                price: voice.price,
              }))}
              selectedOption={selectedVoiceOption}
              onOptionSelect={setSelectedVoiceOption}
            />

            <OptionSelector
              title="かけ放題オプション"
              options={options.overseaCallingOptions.map(oversea => ({
                id: oversea.id,
                title: oversea.title,
                description: oversea.description,
                price: oversea.price,
              }))}
              selectedOption={selectedOverseaOption}
              onOptionSelect={setSelectedOverseaOption}
            />

            <PriceSimulation
              selectedDataPlan={selectedDataPlan}
              selectedVoiceOption={selectedVoiceOption}
              selectedOverseaOption={selectedOverseaOption}
              options={options}
              className="mt-12"
            />

            <div className="text-center mt-12">
              <GradientButton
                size="lg"
                className="px-16 py-5 text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleNext}
                disabled={!selectedDataPlan}
              >
                次へ
              </GradientButton>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
