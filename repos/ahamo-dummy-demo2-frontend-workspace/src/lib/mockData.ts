import { Campaign, NewsItem, SmartphoneProduct, SmartphoneOptions } from '@/types/index'

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'おすすめキャンペーン1',
    description: 'お得なキャンペーン情報です。期間限定でご利用いただけます。',
    imageUrl: '/images/campaign1.jpg',
    link: '/campaigns/1',
  },
  {
    id: '2',
    title: 'おすすめキャンペーン2',
    description: '新規契約者向けの特別キャンペーンです。',
    imageUrl: '/images/campaign2.jpg',
    link: '/campaigns/2',
  },
  {
    id: '3',
    title: 'おすすめキャンペーン3',
    description: 'データ容量増量キャンペーン実施中です。',
    imageUrl: '/images/campaign3.jpg',
    link: '/campaigns/3',
  },
  {
    id: '4',
    title: 'おすすめキャンペーン4',
    description: '家族割引キャンペーン開催中。最大50%オフでお得にご利用いただけます。',
    imageUrl: '/images/campaign4.jpg',
    link: '/campaigns/4',
  },
  {
    id: '5',
    title: 'おすすめキャンペーン5',
    description: '学生限定特別プラン。月額料金がさらにお得になる学割キャンペーン実施中。',
    imageUrl: '/images/campaign5.jpg',
    link: '/campaigns/5',
  },
  {
    id: '6',
    title: 'おすすめキャンペーン6',
    description: '端末同時購入で大幅割引。最新機種も対象の特別価格でご提供。',
    imageUrl: '/images/campaign6.jpg',
    link: '/campaigns/6',
  },
  {
    id: '7',
    title: 'おすすめキャンペーン7',
    description: '乗り換えキャンペーン実施中。手数料無料でお得に他社からお乗り換え。',
    imageUrl: '/images/campaign7.jpg',
    link: '/campaigns/7',
  },
]

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'サービス改善のお知らせ',
    date: '2024-01-08',
    link: '/news/1',
  },
  {
    id: '2',
    title: 'メンテナンス情報',
    date: '2024-01-07',
    link: '/news/2',
  },
  {
    id: '3',
    title: '新機能追加のお知らせ',
    date: '2024-01-06',
    link: '/news/3',
  },
]

export const mockSmartphones: SmartphoneProduct[] = [
  {
    id: '1',
    name: 'iPhone 16e',
    brand: 'Apple',
    price: '43,670円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
    features: ['いつでもカエドキプログラム適用時', 'お客様負担額'],
    link: '/smartphones/iphone16e',
    colorOptions: [
      { name: 'ホワイト', colorCode: '#FFFFFF' },
      { name: 'ブラック', colorCode: '#000000' },
    ],
    has5G: true,
    saleLabel: 'SALE!',
    description: 'いつでもカエドキプログラム適用時 お客様負担額',
    specifications: ['A16 Bionicチップ', '48MPカメラシステム', 'Face ID'],
  },
  {
    id: '2',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    price: '96,470円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
    features: ['いつでもカエドキプログラム（プラス対象商品）適用時', 'お客様負担額'],
    link: '/smartphones/iphone16pro',
    colorOptions: [
      { name: 'ゴールド', colorCode: '#FFD700' },
      { name: 'スペースグレイ', colorCode: '#8E8E93' },
      { name: 'シルバー', colorCode: '#C0C0C0' },
      { name: 'ブラック', colorCode: '#000000' },
    ],
    has5G: true,
    description: 'いつでもカエドキプログラム（プラス対象商品）適用時 お客様負担額',
    specifications: ['A17 Proチップ', 'Pro 48MPカメラシステム', 'ProMotionディスプレイ'],
  },
  {
    id: '3',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: '120,780円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
    features: ['いつでもカエドキプログラム（プラス対象商品）適用時', 'お客様負担額'],
    link: '/smartphones/iphone16promax',
    colorOptions: [
      { name: 'ゴールド', colorCode: '#FFD700' },
      { name: 'スペースグレイ', colorCode: '#8E8E93' },
      { name: 'シルバー', colorCode: '#C0C0C0' },
      { name: 'ブラック', colorCode: '#000000' },
    ],
    has5G: true,
    description: 'いつでもカエドキプログラム（プラス対象商品）適用時 お客様負担額',
    specifications: ['A17 Proチップ', 'Pro 48MPカメラシステム', '6.7インチディスプレイ'],
  },
  {
    id: '4',
    name: 'iPhone 14',
    brand: 'Apple',
    price: '98,340円',
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
    features: ['A15 Bionicチップ', 'デュアルカメラシステム'],
    link: '/smartphones/iphone14',
    colorOptions: [{ name: 'ブラック', colorCode: '#000000' }],
    has5G: true,
    specifications: ['A15 Bionicチップ', '12MPデュアルカメラ', 'Face ID'],
  },
  {
    id: '5',
    name: 'iPhone SE（第3世代）',
    brand: 'Apple',
    price: '42,680円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
    features: ['いつでもカエドキプログラム適用時', 'お客様負担額'],
    link: '/smartphones/iphonese3',
    colorOptions: [{ name: 'ブラック', colorCode: '#000000' }],
    has5G: true,
    description: 'いつでもカエドキプログラム適用時 お客様負担額',
    specifications: ['A15 Bionicチップ', 'Touch ID', 'ホームボタン'],
  },
  {
    id: '6',
    name: 'Galaxy S24',
    brand: 'Samsung',
    price: '124,800円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center',
    features: ['AI機能搭載', '200MPカメラ', '高速充電'],
    link: '/smartphones/galaxys24',
    colorOptions: [
      { name: 'ファントムブラック', colorCode: '#000000' },
      { name: 'ファントムシルバー', colorCode: '#C0C0C0' },
    ],
    has5G: true,
    specifications: ['Snapdragon 8 Gen 3', '200MPカメラ', '120Hz ディスプレイ'],
  },
  {
    id: '7',
    name: 'Xperia 1 VI',
    brand: 'Sony',
    price: '139,800円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
    features: ['4K HDRディスプレイ', 'プロカメラ機能', '防水・防塵'],
    link: '/smartphones/xperia1vi',
    colorOptions: [
      { name: 'ブラック', colorCode: '#000000' },
      { name: 'ホワイト', colorCode: '#FFFFFF' },
    ],
    has5G: true,
    specifications: ['Snapdragon 8 Gen 3', '4K 120Hz ディスプレイ', 'Zeiss レンズ'],
  },
  {
    id: '8',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    price: '119,800円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center',
    features: ['Tensor G3チップ', 'AI写真編集', '長時間バッテリー'],
    link: '/smartphones/pixel8pro',
    colorOptions: [
      { name: 'オブシディアン', colorCode: '#000000' },
      { name: 'ポーセリン', colorCode: '#F5F5DC' },
    ],
    has5G: true,
    specifications: ['Google Tensor G3', 'AI写真編集', '50MPカメラ'],
  },
  {
    id: '9',
    name: 'AQUOS sense8',
    brand: 'Sharp',
    price: '59,800円〜',
    imageUrl:
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop&crop=center',
    features: ['省エネIGZO', '大容量バッテリー', 'おサイフケータイ'],
    link: '/smartphones/aquossense8',
    colorOptions: [
      { name: 'ライトカッパー', colorCode: '#CD7F32' },
      { name: 'ペールグリーン', colorCode: '#98FB98' },
    ],
    has5G: true,
    specifications: ['Snapdragon 6 Gen 1', 'IGZO OLED', '5000mAh バッテリー'],
  },
]

export const mockSmartphoneOptions: SmartphoneOptions = {
  dataPlans: [
    {
      id: '30gb',
      title: '30GB',
      subtitle: '2,970円/月',
      price: '2970',
      description: 'データ通信量',
    },
    {
      id: '110gb',
      title: '110GB 大盛り',
      subtitle: '4,950円/月',
      price: '4950',
      description: '大盛りオプション(+80GB/月)を含む',
    },
  ],
  voiceOptions: [
    {
      id: 'none',
      title: '申し込まない',
      description: '',
      price: '0',
    },
    {
      id: 'voice',
      title: '申し込む',
      description: '2,200円/月',
      price: '2200',
    },
  ],
  overseaCallingOptions: [
    {
      id: 'none',
      title: '申し込まない',
      description: '1分/回無料',
      price: '0',
    },
    {
      id: 'unlimited',
      title: '申し込む',
      description: '1,000円/月',
      price: '1000',
    },
  ],
}
