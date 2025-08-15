import React from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-orange-400">サービス</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  料金プラン
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  オプション
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  端末情報
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-orange-400">サポート</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  よくある質問
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  チャットサポート
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-orange-400">会社情報</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  利用規約
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-slate-700">
          <p className="text-gray-400">© 2024 ahamo. All rights reserved.</p>
        </div>
      </SectionContainer>
    </footer>
  )
}
