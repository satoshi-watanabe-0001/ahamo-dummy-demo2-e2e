import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SelectionStep } from '../components/forms/SelectionStep'

const meta: Meta<typeof SelectionStep> = {
  title: 'Forms/SelectionStep',
  component: SelectionStep,
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

export const Default: Story = {
  args: {
    title: '電話番号について',
    children: '選択オプションがここに表示されます',
  },
}

export const DeviceSelection: Story = {
  args: {
    title: '端末について',
    children: '端末選択オプションがここに表示されます',
  },
}

export const SimSelection: Story = {
  args: {
    title: 'SIMカードについて',
    children: 'SIM選択オプションがここに表示されます',
  },
}

export const WithCustomClass: Story = {
  args: {
    title: 'カスタムスタイル',
    children: 'カスタムスタイルのコンテンツ',
    className: 'max-w-md',
  },
}
