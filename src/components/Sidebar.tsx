import { useState } from 'react'
import { 
  ChartPieSlice, 
  Bank, 
  CreditCard, 
  ListBullets, 
  ArrowsLeftRight, 
  TrendUp, 
  Gear,
  Phone,
  Question,
  CaretDown
} from 'phosphor-react'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartPieSlice },
    { id: 'accounts', label: 'Accounts', icon: Bank },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: ListBullets },
    { id: 'payments', label: 'Payments', icon: ArrowsLeftRight },
    { id: 'analytics', label: 'Analytics', icon: TrendUp },
    { id: 'settings', label: 'Settings', icon: Gear },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gradient">PliantCard</h1>
        <p className="text-xs text-gray-500 mt-1">Business Banking</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeItem === item.id
                    ? 'bg-secondary-50 text-primary-900 border border-secondary-200'
                    : 'text-gray-600 hover:text-primary-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent 
                  size={18} 
                  weight={activeItem === item.id ? 'fill' : 'regular'}
                />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-900 hover:bg-gray-50 transition-colors">
            <Phone size={18} />
            <span>Support</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-900 hover:bg-gray-50 transition-colors">
            <Question size={18} />
            <span>Help Center</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center">
            <span className="text-secondary-500 font-semibold text-sm">AM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Miller</p>
            <p className="text-xs text-gray-500 truncate">alex@company.com</p>
          </div>
          <CaretDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar 