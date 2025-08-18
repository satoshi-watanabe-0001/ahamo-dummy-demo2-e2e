import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ActionButtons } from '../components/layout/ActionButtons'

const meta: Meta<typeof ActionButtons> = {
  title: 'Layout/ActionButtons',
  component: ActionButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
