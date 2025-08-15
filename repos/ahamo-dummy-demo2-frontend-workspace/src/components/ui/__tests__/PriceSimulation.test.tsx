import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PriceSimulation } from '../PriceSimulation'

const mockOptions = {
  dataPlans: [
    { id: 'plan1', title: '20GB', price: '2970' },
    { id: 'plan2', title: '100GB', price: '4950' },
  ],
  voiceOptions: [
    { id: 'voice1', title: '5分無料通話', price: '0' },
    { id: 'voice2', title: 'かけ放題', price: '1100' },
  ],
  overseaCallingOptions: [
    { id: 'oversea1', title: 'なし', price: '0' },
    { id: 'oversea2', title: '国際通話オプション', price: '980' },
  ],
}

/**
 * PriceSimulationコンポーネントのテストスイート
 * @description 価格シミュレーション機能の表示、計算、オプション処理を検証
 */
describe('PriceSimulation', () => {
  /**
   * シミュレーションタイトルと基本情報の表示テスト
   * @description タイトル、注文確定時の支払い額、送料が正しく表示されることを確認
   */
  it('renders simulation title and base information', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea1"
        options={mockOptions}
      />
    )

    expect(screen.getByText('支払い金額シミュレーション')).toBeInTheDocument()
    expect(screen.getByText('注文確定時の支払い額')).toBeInTheDocument()
    expect(screen.getAllByText('0円')).toHaveLength(2) // One for order confirmation, one for shipping
    expect(screen.getByText('送料')).toBeInTheDocument()
  })

  /**
   * 全オプション選択時の合計金額計算テスト
   * @description データプラン、ボイスオプション、海外通話オプションを全て選択した場合の合計金額が正しく計算されることを確認
   */
  it('calculates total price correctly with all options', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan2"
        selectedVoiceOption="voice2"
        selectedOverseaOption="oversea2"
        options={mockOptions}
      />
    )

    expect(screen.getByText('7,034円')).toBeInTheDocument()
  })

  /**
   * データプランのみ選択時の合計金額計算テスト
   * @description データプランのみを選択し、他のオプションをnullにした場合の合計金額が正しく計算されることを確認
   */
  it('calculates total price correctly with only data plan', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption={null}
        selectedOverseaOption={null}
        options={mockOptions}
      />
    )

    expect(screen.getByText('2,974円')).toBeInTheDocument()
  })

  /**
   * 選択されたプラン詳細の表示テスト
   * @description 選択されたデータプラン、ボイスオプション、海外通話オプションの詳細情報と価格が正しく表示されることを確認
   */
  it('shows selected plan details', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan2"
        selectedVoiceOption="voice2"
        selectedOverseaOption="oversea2"
        options={mockOptions}
      />
    )

    expect(screen.getByText('100GB')).toBeInTheDocument()
    expect(screen.getByText('4,950円')).toBeInTheDocument()
    expect(screen.getByText('1,100円')).toBeInTheDocument()
    expect(screen.getByText('980円')).toBeInTheDocument()
  })

  /**
   * nullオプションの適切な処理テスト
   * @description 全ての選択項目とオプションデータがnullの場合でも、コンポーネントがエラーなく表示されることを確認
   */
  it('handles null options gracefully', () => {
    render(
      <PriceSimulation
        selectedDataPlan={null}
        selectedVoiceOption={null}
        selectedOverseaOption={null}
        options={null}
      />
    )

    expect(screen.getByText('支払い金額シミュレーション')).toBeInTheDocument()
    expect(screen.getByText('4円')).toBeInTheDocument()
  })

  /**
   * カスタムクラス名の適用テスト
   * @description propsで渡されたカスタムクラス名がコンポーネントのルート要素に正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea1"
        options={mockOptions}
        className="custom-class"
      />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * ユニバーサルサービス料と電話リレーサービス料の表示テスト
   * @description 固定の追加料金（ユニバーサルサービス料3円、電話リレーサービス料1円）が正しく表示されることを確認
   */
  it('shows universal service and relay service fees', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea1"
        options={mockOptions}
      />
    )

    expect(screen.getByText('ユニバーサルサービス料')).toBeInTheDocument()
    expect(screen.getByText('電話リレーサービス料')).toBeInTheDocument()
    expect(screen.getByText('3円')).toBeInTheDocument()
    expect(screen.getByText('1円')).toBeInTheDocument()
  })

  /**
   * 価格0円のボイスオプション非表示テスト
   * @description ボイスオプションの価格が0円の場合、オプション項目が表示されないことを確認
   */
  it('does not show voice option when price is 0', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea1"
        options={mockOptions}
      />
    )

    expect(screen.queryByText('ボイスオプション')).not.toBeInTheDocument()
  })

  it('shows voice option when price is greater than 0', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice2"
        selectedOverseaOption="oversea1"
        options={mockOptions}
      />
    )

    expect(screen.getByText('ボイスオプション')).toBeInTheDocument()
    expect(screen.getByText('1,100円')).toBeInTheDocument()
  })

  it('does not show overseas calling option when price is 0', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea1"
        options={mockOptions}
      />
    )

    expect(screen.queryByText('かけ放題オプション')).not.toBeInTheDocument()
  })

  it('shows overseas calling option when price is greater than 0', () => {
    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea2"
        options={mockOptions}
      />
    )

    expect(screen.getByText('かけ放題オプション')).toBeInTheDocument()
    expect(screen.getByText('980円')).toBeInTheDocument()
  })

  it('handles missing options in data gracefully', () => {
    const incompleteOptions = {
      dataPlans: [{ id: 'plan1', title: '20GB', price: '2970' }],
      voiceOptions: [],
      overseaCallingOptions: [],
    }

    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="nonexistent"
        selectedOverseaOption="nonexistent"
        options={incompleteOptions}
      />
    )

    expect(screen.getByText('2,974円')).toBeInTheDocument()
  })

  it('formats prices with commas correctly', () => {
    const expensiveOptions = {
      dataPlans: [{ id: 'plan1', title: 'Unlimited', price: '12345' }],
      voiceOptions: [{ id: 'voice1', title: 'Premium', price: '6789' }],
      overseaCallingOptions: [{ id: 'oversea1', title: 'Global', price: '1234' }],
    }

    render(
      <PriceSimulation
        selectedDataPlan="plan1"
        selectedVoiceOption="voice1"
        selectedOverseaOption="oversea1"
        options={expensiveOptions}
      />
    )

    expect(screen.getByText('12,345円')).toBeInTheDocument()
    expect(screen.getByText('6,789円')).toBeInTheDocument()
    expect(screen.getByText('1,234円')).toBeInTheDocument()
    expect(screen.getByText('20,372円')).toBeInTheDocument()
  })
})
