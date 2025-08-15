'use client'

import React from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { SelectionStep } from '@/components/forms/SelectionStep'
import { Button } from '@/components/ui/button'
import { InfoCard } from '@/components/ui/InfoCard'
import { DocumentCard } from '@/components/ui/DocumentCard'
import Link from 'next/link'

export default function SimCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SectionContainer className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
              申し込み前に準備してください
            </h1>

            <SelectionStep title="本人確認書類">
              <div className="space-y-4">
                <InfoCard
                  variant="blue"
                  title="申し込み時に本人確認書類が必要です。不備がないよう、事前にご確認ください。"
                >
                  <p className="text-blue-700 text-sm mb-3">
                    申し込み・利用開始の際は本人確認書類が必要です。ICチップ読み取りによる、本人確認を行います。
                  </p>
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-3">
                    <p className="text-yellow-800 font-medium text-sm">ココをCHECK！</p>
                  </div>
                  <div className="flex items-start space-x-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                    <p className="text-blue-700 text-sm">
                      マイナンバーカードをご利用した本人確認がおすすめです。ICチップ読み取りにより、本人確認を行います。
                    </p>
                  </div>
                </InfoCard>

                <div className="grid md:grid-cols-2 gap-4">
                  <DocumentCard
                    title="契約者の本人確認に"
                    subtitle="利用可能な書類"
                    documentName="運転免許証"
                    variant="blue"
                  />

                  <DocumentCard
                    title="利用可能な本人確認に"
                    subtitle="利用可能な書類"
                    documentName="マイナンバーカード"
                    variant="orange"
                  />
                </div>
              </div>
            </SelectionStep>

            <SelectionStep title="現住所と同じ住所ですか？">
              <div className="space-y-4">
                <InfoCard variant="green" title="現住所の本人確認に">
                  <h4 className="font-medium text-green-700 mb-2">利用可能な書類</h4>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="w-full h-20 bg-green-200 rounded flex items-center justify-center mb-2">
                        <span className="text-green-600 text-sm">運転免許証</span>
                      </div>
                      <p className="text-xs text-green-700 text-center">運転免許証</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <div className="w-full h-20 bg-green-200 rounded flex items-center justify-center mb-2">
                        <span className="text-green-600 text-sm">マイナンバーカード</span>
                      </div>
                      <p className="text-xs text-green-700 text-center">マイナンバーカード</p>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </SelectionStep>

            <SelectionStep title="お支払い方法をご準備ください">
              <div className="space-y-4">
                <InfoCard variant="purple" title="ご利用可能なお支払い方法">
                  <ul className="text-purple-700 space-y-1">
                    <li>• クレジットカード（VISA、Mastercard、JCB、American Express）</li>
                    <li>• 口座振替（金融機関のキャッシュカード）</li>
                  </ul>
                </InfoCard>
              </div>
            </SelectionStep>

            <SelectionStep title="他社からお乗り換えの方">
              <InfoCard variant="amber" title="MNP予約番号について">
                <p className="text-amber-700 mb-2">
                  現在お使いの電話番号をそのままご利用になる場合は、現在ご契約中の携帯電話会社でMNP予約番号を取得してください。
                </p>
                <p className="text-sm text-amber-600">
                  ※
                  MNP予約番号の有効期限は取得日を含めて15日間です。お申し込み時点で有効期限が10日以上残っている必要があります。
                </p>
              </InfoCard>
            </SelectionStep>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
              <Link href="/">
                <Button variant="outline" className="px-6 py-2">
                  戻る
                </Button>
              </Link>
              <Link href="/smartphone-selection">
                <Button className="px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white">
                  準備完了・申し込みへ進む
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
