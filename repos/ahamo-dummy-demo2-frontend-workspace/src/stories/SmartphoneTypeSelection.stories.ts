import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SmartphoneTypeSelection } from '../components/forms/SmartphoneTypeSelection'
import { SmartphoneSelectionOption } from '../types'
import { logInfo } from '../lib/logger'

const mockOptions: SmartphoneSelectionOption[] = [
  {
    id: 'iphone',
    title: 'iPhone',
    description: 'Apple製スマートフォン',
    imageUrl: '/images/iphone-placeholder.jpg',
    link: '/smartphones/iphone',
    icon: '📱',
    specialLabel: '人気',
  },
  {
    id: 'android',
    title: 'Android',
    description: 'Android搭載スマートフォン',
    imageUrl: '/images/android-placeholder.jpg',
    link: '/smartphones/android',
    icon: '🤖',
  },
  {
    id: 'other',
    title: 'その他',
    description: 'その他の端末',
    imageUrl: '/images/other-placeholder.jpg',
    link: '/smartphone-selection',
    icon: '📞',
  },
]

const meta: Meta<typeof SmartphoneTypeSelection> = {
  title: 'Forms/SmartphoneTypeSelection',
  component: SmartphoneTypeSelection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: mockOptions as SmartphoneSelectionOption[],
    selectedOption: null,
    onOptionSelect: (optionId: string) => logInfo('Storybook: Option selected', { optionId }),
    onBack: () => logInfo('Storybook: Back button clicked'),
  },
}

export const WithSelection: Story = {
  args: {
    options: mockOptions as SmartphoneSelectionOption[],
    selectedOption: 'iphone',
    onOptionSelect: (optionId: string) => logInfo('Storybook: Option selected', { optionId }),
    onBack: () => logInfo('Storybook: Back button clicked'),
  },
}

export const TwoOptions: Story = {
  args: {
    options: mockOptions.slice(0, 2) as SmartphoneSelectionOption[],
    selectedOption: 'android',
    onOptionSelect: (optionId: string) => logInfo('Storybook: Option selected', { optionId }),
    onBack: () => logInfo('Storybook: Back button clicked'),
  },
}

export const WithoutSpecialLabels: Story = {
  args: {
    options: mockOptions.map(option => ({
      ...option,
      specialLabel: undefined,
    })) as SmartphoneSelectionOption[],
    selectedOption: null,
    onOptionSelect: (optionId: string) => logInfo('Storybook: Option selected', { optionId }),
    onBack: () => logInfo('Storybook: Back button clicked'),
  },
}
