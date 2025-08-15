import React from 'react'
import { CarrierSelectionProps } from '@/types/signup.types'
import { SelectionStep } from './SelectionStep'
import { SelectionOption } from './SelectionOption'

export function CarrierSelection({ selectedOption, onOptionChange }: CarrierSelectionProps) {
  return (
    <SelectionStep title="現在のキャリアを選択してください">
      <SelectionOption
        title="docomo"
        description="ドコモからのプラン変更"
        isSelected={selectedOption === 'docomo'}
        onClick={() => onOptionChange('docomo')}
      />
      <SelectionOption
        title="docomo以外"
        description="au、ソフトバンク、その他のキャリアからの乗り換え"
        isSelected={selectedOption === 'other'}
        onClick={() => onOptionChange('other')}
      />
    </SelectionStep>
  )
}
