import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CampaignCard } from '../CampaignCard'
import { Campaign } from '@/types/index'

const mockCampaign: Campaign = {
  id: '1',
  title: 'テストキャンペーン',
  description: 'これはテスト用のキャンペーンです。',
  imageUrl: '/images/test-campaign.jpg',
  link: '/campaigns/1',
}

/**
 * CampaignCardコンポーネントのテストスイート
 * @description キャンペーンカードコンポーネントの表示、プロパティ、インタラクションを検証
 */
describe('CampaignCard コンポーネント', () => {
  /**
   * 基本的なレンダリングテスト
   * @description タイトル、説明文、詳細ボタンが適切に表示されることを確認
   */
  it('正しくレンダリングされる', () => {
    render(<CampaignCard campaign={mockCampaign} />)

    expect(screen.getByText('テストキャンペーン')).toBeInTheDocument()
    expect(screen.getByText('これはテスト用のキャンペーンです。')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '詳細を見る →' })).toBeInTheDocument()
  })

  /**
   * コンパクトサイズ表示テスト
   * @description compactプロパティがtrueの場合に小さいサイズ（max-w-xs）でレンダリングされることを確認
   */
  it('compactプロパティがtrueの場合、小さいサイズでレンダリングされる', () => {
    const { container } = render(<CampaignCard campaign={mockCampaign} compact={true} />)

    const cardElement = container.querySelector('.max-w-xs')
    expect(cardElement).toBeInTheDocument()
  })

  /**
   * 通常サイズ表示テスト
   * @description compactプロパティがfalseの場合に通常サイズ（max-w-sm）でレンダリングされることを確認
   */
  it('compactプロパティがfalseの場合、通常サイズでレンダリングされる', () => {
    const { container } = render(<CampaignCard campaign={mockCampaign} compact={false} />)

    const cardElement = container.querySelector('.max-w-sm')
    expect(cardElement).toBeInTheDocument()
  })

  /**
   * 画像なしレンダリングテスト
   * @description imageUrlが未定義の場合でもタイトルと説明文が正しく表示されることを確認
   */
  it('imageUrlがない場合でも正しくレンダリングされる', () => {
    const campaignWithoutImage = { ...mockCampaign, imageUrl: undefined }
    render(<CampaignCard campaign={campaignWithoutImage} />)

    expect(screen.getByText('テストキャンペーン')).toBeInTheDocument()
    expect(screen.getByText('これはテスト用のキャンペーンです。')).toBeInTheDocument()
  })

  /**
   * ボタンインタラクションテスト
   * @description 詳細ボタンが存在し、クリック操作が可能であることを確認
   */
  it('詳細ボタンがクリック可能である', async () => {
    const user = userEvent.setup()
    render(<CampaignCard campaign={mockCampaign} />)

    const button = screen.getByRole('button', { name: '詳細を見る →' })
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(button).toBeInTheDocument()
  })

  /**
   * NEWバッジ表示テスト
   * @description キャンペーンカードにNEWバッジが適切に表示されることを確認
   */
  it('NEWバッジが表示される', () => {
    render(<CampaignCard campaign={mockCampaign} />)

    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  /**
   * 画像プレースホルダー表示テスト
   * @description キャンペーン画像のプレースホルダーテキストが表示されることを確認
   */
  it('キャンペーン画像プレースホルダーが表示される', () => {
    render(<CampaignCard campaign={mockCampaign} />)

    expect(screen.getByText('キャンペーン画像')).toBeInTheDocument()
  })
})
