import React from 'react'
import { render, screen } from '@testing-library/react'
import { FeatureList } from '../FeatureList'

/**
 * FeatureListコンポーネントのテストスイート
 * @description 機能リストと仕様リストの表示機能をテスト
 */
describe('FeatureList', () => {
  const mockFeatures = ['高性能カメラ', '長時間バッテリー', '防水機能']
  const mockSpecifications = ['6.1インチディスプレイ', '128GB ストレージ', '5G対応']

  /**
   * 機能と仕様が正しく表示されることを検証
   * @description 機能リストと仕様リストの両方が提供された場合の表示確認
   */
  it('renders features and specifications correctly', () => {
    render(<FeatureList features={mockFeatures} specifications={mockSpecifications} />)

    expect(screen.getByText('主な機能')).toBeInTheDocument()

    mockFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })

    mockSpecifications.forEach(spec => {
      expect(screen.getByText(spec)).toBeInTheDocument()
    })
  })

  /**
   * 仕様が提供されない場合に機能のみが表示されることを検証
   * @description 機能リストのみが提供された場合の表示確認
   */
  it('renders only features when specifications not provided', () => {
    render(<FeatureList features={mockFeatures} />)

    expect(screen.getByText('主な機能')).toBeInTheDocument()
    mockFeatures.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  /**
   * 機能が提供されない場合に仕様のみが表示されることを検証
   * @description 仕様リストのみが提供された場合の表示確認
   */
  it('renders only specifications when features not provided', () => {
    render(<FeatureList specifications={mockSpecifications} />)

    expect(screen.getByText('主な機能')).toBeInTheDocument()
    mockSpecifications.forEach(spec => {
      expect(screen.getByText(spec)).toBeInTheDocument()
    })
  })

  /**
   * コンテンツが提供されない場合にnullを返すことを検証
   * @description 機能も仕様も提供されない場合の動作確認
   */
  it('returns null when no content provided', () => {
    const { container } = render(<FeatureList />)
    expect(container.firstChild).toBeNull()
  })

  /**
   * 空の配列が提供された場合にnullを返すことを検証
   * @description 空の機能リストと仕様リストが提供された場合の動作確認
   */
  it('returns null when empty arrays provided', () => {
    const { container } = render(<FeatureList features={[]} specifications={[]} />)
    expect(container.firstChild).toBeNull()
  })

  /**
   * カスタムクラス名が適用されることを検証
   * @description 外部から渡されたclassNameプロパティが正しく適用されることを確認
   */
  it('applies custom className', () => {
    const { container } = render(<FeatureList features={mockFeatures} className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })

  /**
   * 機能と仕様で異なる弾丸色が使用されることを検証
   * @description 機能リストと仕様リストで視覚的に区別できる色分けがされることを確認
   */
  it('uses different bullet colors for features and specifications', () => {
    render(<FeatureList features={['機能1']} specifications={['仕様1']} />)

    const featureBullet = screen.getByText('機能1').previousElementSibling
    const specBullet = screen.getByText('仕様1').previousElementSibling

    expect(featureBullet).toHaveClass('bg-blue-600')
    expect(specBullet).toHaveClass('bg-green-600')
  })
})
