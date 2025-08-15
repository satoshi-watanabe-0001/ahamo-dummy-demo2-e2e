import React from 'react'
import { DeviceSelectionProps } from '@/types/signup.types'
import { SelectionStep } from './SelectionStep'
import { SelectionOption } from './SelectionOption'

export function DeviceSelection({ selectedOption, onOptionChange }: DeviceSelectionProps) {
  return (
    <SelectionStep title="スマートフォンについて選択してください">
      <SelectionOption
        title="スマートフォンを一緒に買う"
        description="端末とSIMをセットで購入"
        isSelected={selectedOption === 'buy'}
        onClick={() => onOptionChange('buy')}
      />
      <SelectionOption
        title="スマートフォンは買わない"
        description="SIMのみ購入（お手持ちの端末を使用）"
        isSelected={selectedOption === 'no-buy'}
        onClick={() => onOptionChange('no-buy')}
      />
    </SelectionStep>
  )
}
