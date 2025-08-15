import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SmartphoneCard } from '../components/ui/SmartphoneCard'
import { mockSmartphones } from '../lib/mockData'

const meta: Meta<typeof SmartphoneCard> = {
  title: 'UI/SmartphoneCard',
  component: SmartphoneCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const IPhone16e: Story = {
  args: {
    smartphone: mockSmartphones[0],
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/hxezByGnSOKJEJdMdkygU2/無題?node-id=0-1&m=dev&t=y2Ipg0QuxirPgKtR-1',
    },
  },
}

export const IPhone16Pro: Story = {
  args: {
    smartphone: mockSmartphones[1],
  },
}

export const IPhone16ProMax: Story = {
  args: {
    smartphone: mockSmartphones[2],
  },
}

export const GalaxyS24: Story = {
  args: {
    smartphone: mockSmartphones[5],
  },
}

export const PixelPro: Story = {
  args: {
    smartphone: mockSmartphones[7],
  },
}

export const WithoutSaleLabel: Story = {
  args: {
    smartphone: {
      ...mockSmartphones[0],
      saleLabel: undefined,
    },
  },
}

export const Without5G: Story = {
  args: {
    smartphone: {
      ...mockSmartphones[0],
      has5G: false,
    },
  },
}

export const SingleColorOption: Story = {
  args: {
    smartphone: mockSmartphones[3],
  },
}

export const WithCustomClass: Story = {
  args: {
    smartphone: mockSmartphones[0],
    className: 'max-w-md',
  },
}
