import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SmartphoneCarousel } from '../components/ui/SmartphoneCarousel'
import { mockSmartphones } from '../lib/mockData'

const meta: Meta<typeof SmartphoneCarousel> = {
  title: 'UI/SmartphoneCarousel',
  component: SmartphoneCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    smartphones: mockSmartphones,
  },
}

export const SingleSmartphone: Story = {
  args: {
    smartphones: [mockSmartphones[0]],
  },
}

export const ThreeSmartphones: Story = {
  args: {
    smartphones: mockSmartphones.slice(0, 3),
  },
}
