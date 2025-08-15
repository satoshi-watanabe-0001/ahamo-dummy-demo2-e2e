'use client'

import React from 'react'
import { SelectionStep } from './SelectionStep'
import { SelectionOption } from './SelectionOption'

interface OptionSelectorProps {
  title: string
  options: Array<{
    id: string
    title: string
    description: string
    price?: string
  }>
  selectedOption: string | null
  onOptionSelect: (optionId: string) => void
  className?: string
}

export function OptionSelector({
  title,
  options,
  selectedOption,
  onOptionSelect,
  className = '',
}: OptionSelectorProps) {
  return (
    <SelectionStep title={title} className={className}>
      {options.map(option => (
        <SelectionOption
          key={option.id}
          title={option.title}
          description={option.description}
          isSelected={selectedOption === option.id}
          onClick={() => onOptionSelect(option.id)}
        />
      ))}
    </SelectionStep>
  )
}
