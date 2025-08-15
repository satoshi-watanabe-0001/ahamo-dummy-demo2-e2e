'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/GradientButton'
import { SectionContainer } from '@/components/ui/SectionContainer'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700">
      <SectionContainer>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <GradientButton className="text-2xl font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105">
              <Link href="/" className="text-white">
                ahamo
              </Link>
            </GradientButton>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/plans"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                料金プラン
              </Link>
              <Link
                href="/services"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                サービス
              </Link>
              <Link
                href="/support"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                サポート
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/signup">
              <GradientButton className="hidden sm:flex px-6 py-2 rounded-lg shadow-md hover:shadow-lg">
                申し込み
              </GradientButton>
            </Link>
            <Button
              variant="outline"
              className="hidden sm:flex border-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 px-6 py-2 rounded-lg transition-all duration-300"
            >
              ログイン
            </Button>
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white hover:bg-slate-700 p-2 rounded-lg transition-all duration-300"
              aria-label="メニューを開く"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </div>
            </Button>
          </div>
        </div>
      </SectionContainer>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 shadow-lg">
          <SectionContainer as="nav" className="py-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-3 pb-4 border-b border-slate-600">
                <Link href="/signup">
                  <GradientButton className="px-6 py-3 rounded-lg shadow-md hover:shadow-lg">
                    申し込み
                  </GradientButton>
                </Link>
                <Button
                  variant="outline"
                  className="border-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  ログイン
                </Button>
              </div>
              <Link
                href="/plans"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                料金プラン
              </Link>
              <Link
                href="/services"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                サービス
              </Link>
              <Link
                href="/support"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                サポート
              </Link>
            </div>
          </SectionContainer>
        </div>
      )}
    </header>
  )
}
