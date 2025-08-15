import React from 'react'
import { SimSelectionProps } from '@/types/signup.types'
import { SelectionStep } from './SelectionStep'
import { SelectionOption } from './SelectionOption'

export function SimSelection({ selectedOption, onOptionChange }: SimSelectionProps) {
  return (
    <SelectionStep title="SIMの種類を選択してください">
      <SelectionOption
        title="eSIM"
        description="デジタルSIM（対応端末が必要）"
        isSelected={selectedOption === 'esim'}
        onClick={() => onOptionChange('esim')}
      />
      <SelectionOption
        title="SIMカード"
        description="物理SIMカード（郵送でお届け）"
        isSelected={selectedOption === 'sim-card'}
        onClick={() => onOptionChange('sim-card')}
      />
    </SelectionStep>
  )
}
