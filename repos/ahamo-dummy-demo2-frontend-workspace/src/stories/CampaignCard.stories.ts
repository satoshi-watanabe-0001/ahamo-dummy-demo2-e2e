import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CampaignCard } from '../components/ui/CampaignCard'
import { mockCampaigns } from '../lib/mockData'

const meta: Meta<typeof CampaignCard> = {
  title: 'UI/CampaignCard',
  component: CampaignCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    campaign: mockCampaigns[0],
  },
}

export const SecondCampaign: Story = {
  args: {
    campaign: mockCampaigns[1],
  },
}

export const ThirdCampaign: Story = {
  args: {
    campaign: mockCampaigns[2],
  },
}

export const WithoutImage: Story = {
  args: {
    campaign: {
      ...mockCampaigns[0],
      imageUrl: undefined,
    },
  },
}
