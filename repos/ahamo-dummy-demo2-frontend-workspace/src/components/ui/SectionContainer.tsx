import React from 'react'
import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'main' | 'nav'
}

export function SectionContainer({
  children,
  className,
  as: Component = 'div',
}: SectionContainerProps) {
  return <Component className={cn('container mx-auto px-4', className)}>{children}</Component>
}
