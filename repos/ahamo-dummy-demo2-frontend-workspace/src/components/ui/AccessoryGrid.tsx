import React from 'react'

export interface Accessory {
  name: string
  price: string
  image: string
}

interface AccessoryGridProps {
  accessories?: Accessory[]
  className?: string
}

const defaultAccessories: Accessory[] = [
  { name: 'ケース', price: '2,980円', image: '📱' },
  { name: '画面保護フィルム', price: '1,980円', image: '🛡️' },
  { name: 'ワイヤレス充電器', price: '4,980円', image: '🔌' },
  { name: 'イヤホン', price: '8,980円', image: '🎧' },
]

export function AccessoryGrid({
  accessories = defaultAccessories,
  className = '',
}: AccessoryGridProps) {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold mb-6">おすすめアクセサリー</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accessories.map((accessory, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">{accessory.image}</div>
            <h3 className="font-semibold text-sm mb-1">{accessory.name}</h3>
            <p className="text-orange-600 font-bold text-sm">{accessory.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
