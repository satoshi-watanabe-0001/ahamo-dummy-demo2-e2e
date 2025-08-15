import React from 'react'
import { GradientButton } from '@/components/ui/GradientButton'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SmartphoneCarousel } from '@/components/ui/SmartphoneCarousel'

export function AdditionalContent() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-20">
      <SectionContainer className="space-y-12">
        <SmartphoneCarousel />

        <div className="text-center">
          <GradientButton
            size="lg"
            className="px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105"
          >
            製品一覧
          </GradientButton>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-red-50 p-6 shadow-xl border border-orange-200">
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            AD
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mb-4">
              <span className="text-2xl text-white">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">特別キャンペーン実施中</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              期間限定のお得なプランをご用意しています
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">ahamoが選ばれる理由</h3>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              シンプルで分かりやすい料金体系と充実したサービスで、
              <br />
              あなたのスマホライフをもっと快適に
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-2xl">1</span>
                <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">圧倒的コスパ</h4>
              <div className="space-y-4 text-left">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-orange-600">月額2,970円</span>
                  で20GB使える驚きの料金設定
                </p>
                <p className="text-gray-600 leading-relaxed">
                  • 他社と比べて年間<span className="font-semibold">最大3万円</span>もお得
                  <br />
                  • 契約期間の縛りなし、解約金0円
                  <br />• 面倒な料金プランの選択不要
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold text-sm">
                    💡 家族4人なら年間12万円の節約も可能！
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-2xl">2</span>
                <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">通話も安心</h4>
              <div className="space-y-4 text-left">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-green-600">5分以内の国内通話</span>が何度でも無料
                </p>
                <p className="text-gray-600 leading-relaxed">
                  • 追加料金は一切不要
                  <br />
                  • 家族や友人との短い通話に最適
                  <br />• 24時間いつでも利用可能
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold text-sm">
                    📞 月100回通話しても追加料金なし！
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-2xl">3</span>
                <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6">安定の品質</h4>
              <div className="space-y-4 text-left">
                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-purple-600">全国99%以上</span>の広いエリアカバー
                </p>
                <p className="text-gray-600 leading-relaxed">
                  • ドコモの高品質ネットワークを利用
                  <br />
                  • 地方や山間部でも安定した通信
                  <br />• 5G対応で高速データ通信
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 font-semibold text-sm">
                    🗾 日本全国どこでも快適につながる！
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8">
              <h5 className="text-2xl font-bold text-gray-800 mb-4">🎉 今なら特典がさらにお得！</h5>
              <p className="text-gray-700 text-lg leading-relaxed">
                新規契約・乗り換えで
                <span className="font-bold text-red-600">最大10,000ポイント</span>プレゼント中
                <br />
                <span className="text-sm text-gray-600">※キャンペーン期間：2024年12月31日まで</span>
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
