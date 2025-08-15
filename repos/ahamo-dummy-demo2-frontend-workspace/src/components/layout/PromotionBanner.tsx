import React from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'

export function PromotionBanner() {
  return (
    <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      <SectionContainer className="text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
            特別キャンペーン実施中
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 font-medium mb-8">
            今なら月額料金が最大3ヶ月無料！お得にahamoを始めよう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              🎉 期間限定オファー
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
              ⚡ 即日開通可能
            </div>
          </div>
        </div>
      </SectionContainer>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
      </div>
    </section>
  )
}
