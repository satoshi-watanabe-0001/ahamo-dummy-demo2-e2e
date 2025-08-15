import React from 'react'

type InfoCardVariant = 'blue' | 'green' | 'purple' | 'amber'

interface InfoCardProps {
  variant: InfoCardVariant
  title: string
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<InfoCardVariant, string> = {
  blue: 'bg-blue-50 border-blue-200',
  green: 'bg-green-50 border-green-200',
  purple: 'bg-purple-50 border-purple-200',
  amber: 'bg-amber-50 border-amber-200',
}

const variantTitleStyles: Record<InfoCardVariant, string> = {
  blue: 'text-blue-800',
  green: 'text-green-800',
  purple: 'text-purple-800',
  amber: 'text-amber-800',
}

export function InfoCard({ variant, title, children, className = '' }: InfoCardProps) {
  return (
    <div className={`border rounded-lg p-4 ${variantStyles[variant]} ${className}`}>
      <h3 className={`font-semibold mb-2 ${variantTitleStyles[variant]}`}>{title}</h3>
      <div>{children}</div>
    </div>
  )
}
