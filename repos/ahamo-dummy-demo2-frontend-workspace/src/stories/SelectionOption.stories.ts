import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SelectionOption } from '../components/forms/SelectionOption'
import { logInfo } from '@/lib/logger'

const meta: Meta<typeof SelectionOption> = {
  title: 'Forms/SelectionOption',
  component: SelectionOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '新しい電話番号を取得',
    description: 'ahamoで新しい電話番号を取得します',
    isSelected: false,
    onClick: () => logInfo('Storybook: SelectionOption clicked', { story: 'Default' }),
  },
}

export const Selected: Story = {
  args: {
    title: '現在の電話番号を引き継ぐ',
    description: '他社からの乗り換え（MNP）',
    isSelected: true,
    onClick: () => logInfo('Storybook: SelectionOption clicked', { story: 'Selected' }),
  },
}

export const LongDescription: Story = {
  args: {
    title: '端末を購入する',
    description:
      'ahamoで販売している端末を購入します。分割払いも可能で、いつでもカエドキプログラムもご利用いただけます。',
    isSelected: false,
    onClick: () => logInfo('Storybook: SelectionOption clicked', { story: 'LongDescription' }),
  },
}

export const ShortTitle: Story = {
  args: {
    title: 'eSIM',
    description: 'デジタルSIMカード',
    isSelected: true,
    onClick: () => logInfo('Storybook: SelectionOption clicked', { story: 'ShortTitle' }),
  },
}

export const WithCustomClass: Story = {
  args: {
    title: 'カスタムスタイル',
    description: 'カスタムクラスが適用されたオプション',
    isSelected: false,
    onClick: () => logInfo('Storybook: SelectionOption clicked', { story: 'WithCustomClass' }),
    className: 'max-w-xs',
  },
}
