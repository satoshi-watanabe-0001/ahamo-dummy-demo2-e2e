import React from 'react'
import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/GradientButton'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { CampaignCarousel } from '@/components/ui/CampaignCarousel'
import { mockCampaigns } from '@/lib/mockData'

export function MainContent() {
  return (
    <SectionContainer as="main" className="py-16">
      <div className="text-center space-y-8 mb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            シンプルで
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              お得
            </span>
            な料金プラン
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            月額2,970円で20GB使える。追加料金なしで5分以内の国内通話かけ放題
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GradientButton
            size="lg"
            className="rounded-xl shadow-lg hover:shadow-xl hover:scale-105"
          >
            今すぐ申し込み 🚀
          </GradientButton>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            申し込みの流れを見る
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-100">
        <CampaignCarousel campaigns={mockCampaigns} />
      </div>
    </SectionContainer>
  )
}
