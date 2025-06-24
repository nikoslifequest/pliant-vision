import React from 'react'
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
import pliantLogo from '../assets/images/pliantlogo.svg'

type CurrentPage = 'dashboard' | 'cards'

interface SidebarProps {
  currentPage: CurrentPage
  onNavigate: (page: CurrentPage) => void
}

const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {

  const navigationItems = [
    { id: 'dashboard' as CurrentPage, label: 'Dashboard', icon: ChartPieSlice },
    { id: 'accounts', label: 'Accounts', icon: Bank },
    { id: 'cards' as CurrentPage, label: 'Cards', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: ListBullets },
    { id: 'payments', label: 'Payments', icon: ArrowsLeftRight },
    { id: 'analytics', label: 'Analytics', icon: TrendUp },
    { id: 'settings', label: 'Settings', icon: Gear },
  ]

  return (
    <div className="w-64 bg-white border-r border-pliant-sand/30 h-screen fixed left-0 top-0 flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-pliant-sand/30">
        <div className="flex items-center space-x-3 rounded-lg hover:bg-pliant-sand/5 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-pliant-blue rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-pliant-charcoal truncate">Alex Miller</p>
            <p className="text-xs text-pliant-charcoal/60 truncate">alex@company.com</p>
          </div>
          <CaretDown size={16} className="text-pliant-charcoal/40" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            const isActive = currentPage === item.id
            const isClickable = item.id === 'dashboard' || item.id === 'cards'
            
            return (
              <button
                key={item.id}
                onClick={() => isClickable && onNavigate(item.id as CurrentPage)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-pliant-sand/10 text-pliant-charcoal border border-pliant-sand/20'
                    : 'text-pliant-charcoal/60 hover:text-pliant-charcoal hover:bg-pliant-sand/5'
                } ${!isClickable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                <IconComponent 
                  size={18} 
                  weight={isActive ? 'fill' : 'regular'}
                />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-pliant-sand/30 my-6"></div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-pliant-charcoal/60 hover:text-pliant-charcoal hover:bg-pliant-sand/5 transition-colors">
            <Phone size={18} />
            <span>Support</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-pliant-charcoal/60 hover:text-pliant-charcoal hover:bg-pliant-sand/5 transition-colors">
            <Question size={18} />
            <span>Help Center</span>
          </button>
        </div>
      </nav>

      {/* Logo */}
      <div className="h-[100px] px-6 flex flex-col justify-center items-start border-t border-pliant-sand/30">
        <img src={pliantLogo} alt="Pliant" className="h-8 w-auto" />
        <p className="text-xs text-pliant-charcoal/60 mt-1">Admin App</p>
      </div>
    </div>
  )
}

export default Sidebar 