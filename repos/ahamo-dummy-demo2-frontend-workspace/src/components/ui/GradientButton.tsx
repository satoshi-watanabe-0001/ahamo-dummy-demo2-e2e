import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GradientButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function GradientButton({
  children,
  className,
  size = 'md',
  ...props
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  }

  return (
    <Button
      className={cn(
        'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-0',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
