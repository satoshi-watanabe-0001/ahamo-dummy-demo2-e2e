'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SmartphoneTypeSelection } from '@/components/forms/SmartphoneTypeSelection'
import { SmartphoneSelectionOption } from '@/types'

const smartphoneOptions: SmartphoneSelectionOption[] = [
  {
    id: 'iphone',
    title: 'iPhone',
    imageUrl: '/images/iphone-icon.png',
    link: '/smartphones/iphone',
    icon: '📱',
  },
  {
    id: 'android',
    title: 'Android',
    imageUrl: '/images/android-icon.png',
    link: '/smartphones/android',
    icon: '🤖',
  },
  {
    id: 'docomo-certified',
    title: 'ドコモ認定リユース品',
    description: '30日間の無償交換であんしん！',
    imageUrl: '/images/docomo-certified-icon.png',
    link: '/smartphones/docomo-certified',
    icon: '♻️',
    specialLabel: (
      <>
        <span className="mr-1">docomo</span>
        <span className="font-normal">Certified</span>
      </>
    ),
  },
]

export default function SmartphoneSelectionPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    const option = smartphoneOptions.find(opt => opt.id === optionId)
    if (option) {
      router.push(option.link)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <path d="M0,200 Q250,100 500,200 T1000,200 L1000,0 L0,0 Z" fill="rgba(255,255,255,0.1)" />
          <path
            d="M0,800 Q250,700 500,800 T1000,800 L1000,1000 L0,1000 Z"
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>

      <SectionContainer className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">スマホの選択</h1>
          </div>

          <SmartphoneTypeSelection
            options={smartphoneOptions}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            onBack={handleBack}
          />
        </div>
      </SectionContainer>
    </div>
  )
}
