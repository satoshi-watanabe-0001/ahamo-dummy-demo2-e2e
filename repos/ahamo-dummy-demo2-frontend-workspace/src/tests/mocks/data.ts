export const mockSmartphoneOptions = {
  dataPlans: [
    { id: 'plan1', title: '20GB', subtitle: 'データ通信量20GB', price: '2970' },
    { id: 'plan2', title: '100GB', subtitle: 'データ通信量100GB', price: '4950' },
  ],
  voiceOptions: [
    { id: 'voice1', title: '5分無料通話', subtitle: '5分以内の国内通話無料', price: '770' },
    { id: 'voice2', title: 'かけ放題オプション', subtitle: '国内通話24時間無料', price: '1870' },
  ],
  overseaCallingOptions: [
    { id: 'oversea1', title: '海外かけ放題', subtitle: '海外への通話が無料', price: '980' },
  ],
}

export const mockSmartphones = [
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
]

export const mockCampaigns = [
  {
    id: '1',
    title: 'テストキャンペーン',
    description: 'これはテスト用のキャンペーンです。',
    imageUrl: 'https://via.placeholder.com/300x200',
    link: '/campaigns/1',
  },
]

export const mockNews = [
  {
    id: '1',
    title: 'テストニュース',
    content: 'これはテスト用のニュースです。',
    date: '2024-01-01',
    category: 'お知らせ',
  },
]
