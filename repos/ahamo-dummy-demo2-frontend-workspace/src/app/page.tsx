import { Header } from '@/components/layout/header'
import { PromotionBanner } from '@/components/layout/PromotionBanner'
import { MainContent } from '@/components/layout/MainContent'
import { ActionButtons } from '@/components/layout/ActionButtons'
import { AdditionalContent } from '@/components/layout/AdditionalContent'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <PromotionBanner />
      <MainContent />
      <ActionButtons />
      <AdditionalContent />
      <Footer />
    </div>
  )
}
