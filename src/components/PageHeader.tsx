import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
  actions?: React.ReactNode
}

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-[100px]">
          <div>
            <h1 className="text-2xl font-semibold text-pliant-charcoal mb-1">{title}</h1>
            <p className="text-pliant-charcoal/60">{subtitle}</p>
          </div>
          {actions && (
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeader 