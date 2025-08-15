import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GradientButton } from '@/components/ui/GradientButton'
import { NavigationButtonsProps } from '@/types/signup.types'

export function NavigationButtons({ flowResult }: NavigationButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
      <Link href="/" className="flex-1">
        <Button
          variant="outline"
          className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 py-3"
        >
          サイトトップへ戻る
        </Button>
      </Link>
      {flowResult.isComplete && (
        <Link href={flowResult.destination} className="flex-1">
          <GradientButton className="w-full py-3 shadow-md hover:shadow-lg">次へ</GradientButton>
        </Link>
      )}
    </div>
  )
}
