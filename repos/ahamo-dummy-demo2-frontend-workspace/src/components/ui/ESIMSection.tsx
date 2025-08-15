import React from 'react'

interface ESIMSectionProps {
  className?: string
}

export function ESIMSection({ className = '' }: ESIMSectionProps) {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-center mb-6">お手続き・あんしんの「eSIM」</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl mb-2">📱</div>
          <h3 className="font-semibold mb-2">即日開通</h3>
          <p className="text-gray-600 text-sm">店舗に行かずにオンラインで即日開通できます</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold mb-2">セキュア</h3>
          <p className="text-gray-600 text-sm">物理SIMより安全で紛失の心配がありません</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl mb-2">🌍</div>
          <h3 className="font-semibold mb-2">便利</h3>
          <p className="text-gray-600 text-sm">海外でも簡単に現地の通信サービスを利用できます</p>
        </div>
      </div>
    </div>
  )
}
