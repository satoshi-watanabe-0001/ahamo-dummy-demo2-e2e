import React from 'react'
import { PhoneNumberSelectionProps } from '@/types/signup.types'
import { SelectionStep } from './SelectionStep'
import { SelectionOption } from './SelectionOption'

export function PhoneNumberSelection({
  selectedOption,
  onOptionChange,
}: PhoneNumberSelectionProps) {
  return (
    <SelectionStep title="電話番号について選択してください">
      <SelectionOption
        title="今の電話番号をそのまま使う"
        description="現在お使いの電話番号を引き継ぎます"
        isSelected={selectedOption === 'keep'}
        onClick={() => onOptionChange('keep')}
      />
      <SelectionOption
        title="新しい電話番号を発行する"
        description="新規で電話番号を取得します"
        isSelected={selectedOption === 'new'}
        onClick={() => onOptionChange('new')}
      />
    </SelectionStep>
  )
}
