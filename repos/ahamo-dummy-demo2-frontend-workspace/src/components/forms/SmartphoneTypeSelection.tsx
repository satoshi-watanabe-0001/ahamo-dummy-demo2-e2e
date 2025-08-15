import React from 'react'
import { SmartphoneSelectionOption } from '@/types'
import { Button } from '@/components/ui/button'

interface SmartphoneTypeSelectionProps {
  options: SmartphoneSelectionOption[]
  selectedOption: string | null
  onOptionSelect: (optionId: string) => void
  onBack: () => void
}

export function SmartphoneTypeSelection({
  options,
  selectedOption,
  onOptionSelect,
  onBack,
}: SmartphoneTypeSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {options.map(option => (
          <div
            key={option.id}
            className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
              selectedOption === option.id ? 'ring-4 ring-white ring-opacity-50' : ''
            }`}
            onClick={() => onOptionSelect(option.id)}
          >
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-3xl">{option.icon}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>

              {option.description && (
                <p className="text-sm text-red-600 font-medium">{option.description}</p>
              )}

              {option.specialLabel && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    {option.specialLabel}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 rounded-full"
        >
          戻る
        </Button>
      </div>
    </div>
  )
}
