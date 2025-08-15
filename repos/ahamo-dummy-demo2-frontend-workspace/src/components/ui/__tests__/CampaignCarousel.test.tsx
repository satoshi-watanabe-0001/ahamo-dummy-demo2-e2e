import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CampaignCarousel } from '../CampaignCarousel'
import { Campaign } from '@/types/index'

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'キャンペーン1',
    description: 'テスト用キャンペーン1です。',
    imageUrl: '/images/campaign1.jpg',
    link: '/campaigns/1',
  },
  {
    id: '2',
    title: 'キャンペーン2',
    description: 'テスト用キャンペーン2です。',
    imageUrl: '/images/campaign2.jpg',
    link: '/campaigns/2',
  },
  {
    id: '3',
    title: 'キャンペーン3',
    description: 'テスト用キャンペーン3です。',
    imageUrl: '/images/campaign3.jpg',
    link: '/campaigns/3',
  },
  {
    id: '4',
    title: 'キャンペーン4',
    description: 'テスト用キャンペーン4です。',
    imageUrl: '/images/campaign4.jpg',
    link: '/campaigns/4',
  },
]

jest.useFakeTimers()

/**
 * CampaignCarouselコンポーネントのテストスイート
 * @description キャンペーンカルーセルの表示、ナビゲーション、自動再生機能を検証
 */
describe('CampaignCarousel コンポーネント', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  /**
   * CampaignCarouselコンポーネントが正しくレンダリングされることを検証
   * @description タイトル、スライド番号、キャンペーン名が適切に表示されることを確認
   */
  it('正しくレンダリングされる', () => {
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    expect(screen.getByText('🎯 おすすめキャンペーン情報')).toBeInTheDocument()
    expect(screen.getByText('1 / 4')).toBeInTheDocument()
    expect(screen.getByText('キャンペーン1')).toBeInTheDocument()
  })

  /**
   * ナビゲーションボタンが正しく表示されることを検証
   * @description 前へ・次へボタンがDOM内に存在することを確認
   */
  it('ナビゲーションボタンが表示される', () => {
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons.find(button => button.textContent === '←')
    const nextButton = buttons.find(button => button.textContent === '→')

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  /**
   * 次へボタンクリック時のスライド遷移を検証
   * @description 次へボタンをクリックすると2番目のスライドに移動することを確認
   */
  it('次へボタンをクリックすると次のスライドに移動する', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons.find(button => button.textContent === '→')

    await act(async () => {
      await user.click(nextButton!)
    })

    await waitFor(() => {
      expect(screen.getByText('2 / 4')).toBeInTheDocument()
    })
  })

  /**
   * 前へボタンクリック時のスライド遷移を検証
   * @description 最初のスライドから前へボタンをクリックすると最後のスライドに移動することを確認
   */
  it('前へボタンをクリックすると前のスライドに移動する', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons.find(button => button.textContent === '←')

    await act(async () => {
      await user.click(prevButton!)
    })

    await waitFor(() => {
      expect(screen.getByText('4 / 4')).toBeInTheDocument()
    })
  })

  /**
   * ドットインジケーターの表示数を検証
   * @description キャンペーン数と同じ数のドットインジケーターが表示されることを確認
   */
  it('ドットインジケーターが正しい数表示される', () => {
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const dots = screen
      .getAllByRole('button')
      .filter(button => button.className.includes('w-3 h-3 rounded-full'))
    expect(dots).toHaveLength(4)
  })

  /**
   * ドットインジケータークリック時のスライド遷移を検証
   * @description 3番目のドットをクリックすると3番目のスライドに移動することを確認
   */
  it('ドットをクリックすると対応するスライドに移動する', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const dots = screen
      .getAllByRole('button')
      .filter(button => button.className.includes('w-3 h-3 rounded-full'))

    await act(async () => {
      await user.click(dots[2])
    })

    await waitFor(() => {
      expect(screen.getByText('3 / 4')).toBeInTheDocument()
    })
  })

  /**
   * 自動再生トグルボタンの表示を検証
   * @description 自動再生中の状態表示ボタンが正しく表示されることを確認
   */
  it('自動再生トグルボタンが表示される', () => {
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    expect(screen.getByText('⏸️ 自動再生中')).toBeInTheDocument()
  })

  it('自動再生トグルボタンをクリックすると状態が変わる', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const toggleButton = screen.getByText('⏸️ 自動再生中')

    await act(async () => {
      await user.click(toggleButton)
    })

    await waitFor(() => {
      expect(screen.getByText('▶️ 自動再生停止中')).toBeInTheDocument()
    })
  })

  it('自動再生が有効な場合、時間経過でスライドが変わる', async () => {
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    expect(screen.getByText('1 / 4')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(4000)
    })

    await waitFor(() => {
      expect(screen.getByText('2 / 4')).toBeInTheDocument()
    })
  })

  it('手動操作後は自動再生が一時停止される', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons.find(button => button.textContent === '→')

    await act(async () => {
      await user.click(nextButton!)
    })

    await waitFor(() => {
      expect(screen.getByText('2 / 4')).toBeInTheDocument()
    })

    act(() => {
      jest.advanceTimersByTime(4000)
    })

    expect(screen.getByText('2 / 4')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(6000)
    })

    act(() => {
      jest.advanceTimersByTime(4000)
    })

    await waitFor(() => {
      expect(screen.getByText('3 / 4')).toBeInTheDocument()
    })
  })

  it('最後のスライドから次へ移動すると最初のスライドに戻る', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons.find(button => button.textContent === '→')

    await act(async () => {
      await user.click(nextButton!)
      await user.click(nextButton!)
      await user.click(nextButton!)
    })

    await waitFor(() => {
      expect(screen.getByText('4 / 4')).toBeInTheDocument()
    })

    await act(async () => {
      await user.click(nextButton!)
    })

    await waitFor(() => {
      expect(screen.getByText('1 / 4')).toBeInTheDocument()
    })
  })

  it('最初のスライドから前へ移動すると最後のスライドに移動する', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<CampaignCarousel campaigns={mockCampaigns} />)

    expect(screen.getByText('1 / 4')).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons.find(button => button.textContent === '←')

    await act(async () => {
      await user.click(prevButton!)
    })

    await waitFor(() => {
      expect(screen.getByText('4 / 4')).toBeInTheDocument()
    })
  })
})
