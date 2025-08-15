import React from 'react'

interface DocumentCardProps {
  title: string
  subtitle: string
  documentName: string
  variant: 'blue' | 'green' | 'orange'
  className?: string
}

const variantStyles = {
  blue: {
    bg: 'bg-blue-100',
    iconBg: 'bg-blue-200',
    text: 'text-blue-600',
    captionText: 'text-slate-600',
  },
  green: {
    bg: 'bg-green-100',
    iconBg: 'bg-green-200',
    text: 'text-green-600',
    captionText: 'text-green-700',
  },
  orange: {
    bg: 'bg-orange-100',
    iconBg: 'bg-orange-200',
    text: 'text-orange-600',
    captionText: 'text-slate-600',
  },
}

export function DocumentCard({
  title,
  subtitle,
  documentName,
  variant,
  className = '',
}: DocumentCardProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`border border-slate-200 rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-slate-800 mb-2 text-center">{title}</h4>
      <h5 className="font-medium text-slate-700 mb-2 text-center">{subtitle}</h5>
      <div className={`${styles.bg} rounded-lg p-3 mb-3`}>
        <div className={`w-full h-24 ${styles.iconBg} rounded flex items-center justify-center`}>
          <span className={`${styles.text} text-sm`}>{documentName}</span>
        </div>
      </div>
      <p className={`text-xs ${styles.captionText} text-center`}>{documentName}</p>
    </div>
  )
}
