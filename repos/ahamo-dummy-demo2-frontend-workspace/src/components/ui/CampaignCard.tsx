import React from 'react'
import { Campaign } from '@/types/index'
import { GradientButton } from './GradientButton'

interface CampaignCardProps {
  campaign: Campaign
  compact?: boolean
}

export function CampaignCard({ campaign, compact = false }: CampaignCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:scale-105 ${
        compact ? 'max-w-xs' : 'max-w-sm'
      }`}
    >
      {campaign.imageUrl && (
        <div
          className={`w-full bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 relative overflow-hidden ${
            compact ? 'h-32' : 'h-48'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className={`mb-2 ${compact ? 'text-2xl' : 'text-4xl'}`}>🎯</div>
              <span
                className={`font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full ${
                  compact ? 'text-xs' : 'text-sm'
                }`}
              >
                キャンペーン画像
              </span>
            </div>
          </div>
          <div
            className={`absolute top-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded-full ${
              compact ? 'text-xs' : 'text-xs'
            }`}
          >
            NEW
          </div>
        </div>
      )}
      <div className={compact ? 'p-4' : 'p-6'}>
        <h3
          className={`font-bold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300 ${
            compact ? 'text-lg mb-2' : 'text-xl mb-3'
          }`}
        >
          {campaign.title}
        </h3>
        <p
          className={`text-gray-600 leading-relaxed ${
            compact ? 'text-sm mb-4 line-clamp-2' : 'mb-6'
          }`}
        >
          {campaign.description}
        </p>
        <GradientButton
          className={`w-full rounded-xl shadow-md hover:shadow-lg ${
            compact ? 'py-2 text-sm' : 'py-3'
          }`}
        >
          詳細を見る →
        </GradientButton>
      </div>
    </div>
  )
}
