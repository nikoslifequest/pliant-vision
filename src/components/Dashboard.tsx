import { useState } from 'react'
import { Button } from '../design-system'

const Dashboard = () => {
  const [activeView] = useState('dashboard')

  return (
    <div className="min-h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-pliant-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[100px]">
            <div>
              <h1 className="text-2xl font-semibold text-pliant-charcoal mb-1">Dashboard</h1>
              <p className="text-pliant-charcoal/60">Welcome back, Alex</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="primary" size="sm">
                New Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Content wird hier zusammen definiert und hinzugefügt */}
        <div className="text-center py-16">
          <p className="text-pliant-charcoal/60">Dashboard-Inhalte werden hier zusammen entwickelt</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 