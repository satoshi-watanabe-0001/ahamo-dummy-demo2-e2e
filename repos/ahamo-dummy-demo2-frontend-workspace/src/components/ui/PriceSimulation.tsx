'use client'

import React from 'react'

interface PriceSimulationProps {
  selectedDataPlan: string | null
  selectedVoiceOption: string | null
  selectedOverseaOption: string | null
  options: {
    dataPlans?: Array<{ id: string; title: string; price: string }>
    voiceOptions?: Array<{ id: string; title: string; price: string }>
    overseaCallingOptions?: Array<{ id: string; title: string; price: string }>
  } | null
  className?: string
}

export function PriceSimulation({
  selectedDataPlan,
  selectedVoiceOption,
  selectedOverseaOption,
  options,
  className = '',
}: PriceSimulationProps) {
  const calculateTotal = () => {
    let total = 0

    if (selectedDataPlan && options?.dataPlans) {
      const plan = options.dataPlans.find(p => p.id === selectedDataPlan)
      if (plan) total += parseInt(plan.price)
    }

    if (selectedVoiceOption && options?.voiceOptions) {
      const voice = options.voiceOptions.find(v => v.id === selectedVoiceOption)
      if (voice) total += parseInt(voice.price)
    }

    if (selectedOverseaOption && options?.overseaCallingOptions) {
      const oversea = options.overseaCallingOptions.find(o => o.id === selectedOverseaOption)
      if (oversea) total += parseInt(oversea.price)
    }

    return total
  }

  const getItemDetails = () => {
    const items: Array<{ name: string; price: number }> = []

    if (selectedDataPlan && options?.dataPlans) {
      const plan = options.dataPlans.find(p => p.id === selectedDataPlan)
      if (plan) {
        items.push({
          name: plan.title,
          price: parseInt(plan.price),
        })
      }
    }

    if (selectedVoiceOption && options?.voiceOptions) {
      const voice = options.voiceOptions.find(v => v.id === selectedVoiceOption)
      if (voice && parseInt(voice.price) > 0) {
        items.push({
          name: 'ボイスオプション',
          price: parseInt(voice.price),
        })
      }
    }

    if (selectedOverseaOption && options?.overseaCallingOptions) {
      const oversea = options.overseaCallingOptions.find(o => o.id === selectedOverseaOption)
      if (oversea && parseInt(oversea.price) > 0) {
        items.push({
          name: 'かけ放題オプション',
          price: parseInt(oversea.price),
        })
      }
    }

    return items
  }

  const items = getItemDetails()

  return (
    <div
      className={`bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-orange-100 ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
          支払い金額シミュレーション
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          「23か月目」に機種を返却すると、24回目の支払い額が240円の支払いが不要。
        </p>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl p-6 text-center mb-6 shadow-md">
        <div className="text-xl font-bold text-gray-800">
          注文確定時の支払い額 <span className="text-4xl font-extrabold">0円</span>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 space-y-3 text-sm mb-6 shadow-sm">
        <div className="flex justify-between items-center py-2">
          <span className="font-medium">送料</span>
          <span className="font-semibold">0円</span>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className="font-medium text-gray-700">{item.name}</span>
            <span className="font-semibold text-orange-600">{item.price.toLocaleString()}円</span>
          </div>
        ))}

        <div className="flex justify-between items-center py-1 text-xs text-gray-500">
          <span>ユニバーサルサービス料</span>
          <span>3円</span>
        </div>

        <div className="flex justify-between items-center py-1 text-xs text-gray-500">
          <span>電話リレーサービス料</span>
          <span>1円</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">毎月の支払い額※1</span>
          <span className="text-3xl font-bold">{(calculateTotal() + 4).toLocaleString()}円</span>
        </div>
      </div>
    </div>
  )
}
