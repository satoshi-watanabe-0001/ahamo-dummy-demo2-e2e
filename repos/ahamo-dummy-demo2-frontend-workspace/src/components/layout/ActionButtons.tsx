import React from 'react'
import { Button } from '@/components/ui/button'

export function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center py-8">
      <Button variant="default">キャンペーン詳細</Button>
      <Button variant="default">お知らせ</Button>
    </div>
  )
}
