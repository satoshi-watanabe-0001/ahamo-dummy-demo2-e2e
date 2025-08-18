import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SmartphoneListCard } from '../components/ui/SmartphoneListCard'
import { mockSmartphones } from '../lib/mockData'

const meta: Meta<typeof SmartphoneListCard> = {
  title: 'UI/SmartphoneListCard',
  component: SmartphoneListCard,
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

export const WithSaleLabel: Story = {
  args: {
    smartphone: {
      ...mockSmartphones[0],
      saleLabel: 'SALE!',
    },
  },
}

export const SingleColorOption: Story = {
  args: {
    smartphone: mockSmartphones[3],
  },
}

export const MultipleColorOptions: Story = {
  args: {
    smartphone: {
      ...mockSmartphones[0],
      colorOptions: [
        { name: 'ブラック', colorCode: '#000000' },
        { name: 'ホワイト', colorCode: '#FFFFFF' },
        { name: 'ブルー', colorCode: '#0066CC' },
        { name: 'レッド', colorCode: '#CC0000' },
      ],
    },
  },
}

export const WithCustomClass: Story = {
  args: {
    smartphone: mockSmartphones[0],
    className: 'max-w-2xl',
  },
}

export const WithLongDescription: Story = {
  args: {
    smartphone: {
      ...mockSmartphones[0],
      description:
        '長い説明文を含むスマートフォンの例です。この説明文は複数行にわたって表示される可能性があります。',
    },
  },
}
