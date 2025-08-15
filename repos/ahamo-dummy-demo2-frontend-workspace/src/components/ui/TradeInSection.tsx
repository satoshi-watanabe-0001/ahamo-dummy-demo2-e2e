import React from 'react'

interface TradeInSectionProps {
  className?: string
}

export function TradeInSection({ className = '' }: TradeInSectionProps) {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold mb-6">機種変更をお考えの方</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">📱 下取りプログラム</h3>
          <p className="text-gray-600 text-sm">
            現在お使いの機種を下取りに出すことで、新しい機種をお得に購入できます。
          </p>
          <div className="mt-2">
            <span className="text-orange-600 font-bold">最大 1,000 ポイント</span>
            <span className="text-gray-500 text-sm ml-2">進呈</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">💳 分割払いオプション</h3>
          <p className="text-gray-600 text-sm">24回分割払いで月々の負担を軽減できます。</p>
        </div>
      </div>
    </div>
  )
}
