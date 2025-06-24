import React from 'react'
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Warning,
  CreditCard,
  Calendar,
  ArrowsCounterClockwise,
  Prohibit,
  CheckSquare,
  MapPin,
  ClockClockwise,
  CurrencyDollar,
  Eye,
  PencilSimple,
  Buildings,
  User,
  Users,
  Snowflake,
  ChartBar,
  DotsThree
} from 'phosphor-react'
import { Button } from '../design-system'

// Import card images
import virtualCard1 from '../assets/images/Virtual Card-1.png'
import virtualCard2 from '../assets/images/Virtual Card-2.png'
import virtualCard3 from '../assets/images/Virtual Card-3.png'
import virtualCard4 from '../assets/images/Virtual Card-4.png'
import virtualCard from '../assets/images/Virtual Card.png'

interface CardData {
  id: string
  type: 'virtual' | 'physical'
  color: string
  icon: string
  label: string
  lastFourDigits: string
  cardHolder: string
  status: 'active' | 'requested' | 'pending' | 'terminated' | 'expired'
  issued: string
  validUntil: string
  account: string
  spendingLimit: number
  available: number
  limitFrequency: 'monthly' | 'weekly' | 'daily'
  singleTransactionLimit: number
  transactionCount: number
  maxTransactionCount: number
  transactionFrequency: 'monthly' | 'weekly' | 'daily'
  team?: string
  project?: string
}

interface Transaction {
  id: string
  date: string
  merchant: string
  amount: number
  category: string
  status: 'completed' | 'pending' | 'failed'
}

interface HistoryEntry {
  id: string
  date: string
  action: string
  user: string
  details: string
}

interface CardDetailDrawerProps {
  card: CardData
  isOpen: boolean
  onClose: () => void
}

const CardDetailDrawer = ({ card, isOpen, onClose }: CardDetailDrawerProps) => {
  const [showDetails, setShowDetails] = React.useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-orange-600 bg-orange-50'
      case 'requested': return 'text-blue-600 bg-blue-50'
      case 'terminated': return 'text-red-600 bg-red-50'
      case 'expired': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-600" />
      case 'pending': return <Clock size={16} className="text-orange-600" />
      case 'requested': return <Clock size={16} className="text-blue-600" />
      case 'terminated': return <XCircle size={16} className="text-red-600" />
      case 'expired': return <Warning size={16} className="text-gray-600" />
      default: return <Clock size={16} className="text-gray-600" />
    }
  }

  const getCardImage = (cardId: string) => {
    const images = [virtualCard1, virtualCard2, virtualCard3, virtualCard4, virtualCard]
    return images[parseInt(cardId) % images.length]
  }

  const getNextResetDate = (frequency: string) => {
    const now = new Date()
    switch (frequency) {
      case 'daily':
        const tomorrow = new Date(now)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toLocaleDateString()
      case 'weekly':
        const nextWeek = new Date(now)
        nextWeek.setDate(nextWeek.getDate() + (7 - now.getDay()))
        return nextWeek.toLocaleDateString()
      case 'monthly':
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        return nextMonth.toLocaleDateString()
      default:
        return 'N/A'
    }
  }

  const usedCredit = card.spendingLimit - card.available
  const creditUsagePercentage = (usedCredit / card.spendingLimit) * 100

  // Sample data
  const sampleTransactions: Transaction[] = [
    { id: '1', date: '2024-01-15', merchant: 'Amazon', amount: 299.99, category: 'Office Equipment', status: 'completed' },
    { id: '2', date: '2024-01-14', merchant: 'Starbucks', amount: 12.50, category: 'Food & Beverage', status: 'completed' },
    { id: '3', date: '2024-01-13', merchant: 'Adobe', amount: 52.99, category: 'Software', status: 'pending' },
    { id: '4', date: '2024-01-12', merchant: 'Uber', amount: 25.80, category: 'Travel', status: 'completed' },
    { id: '5', date: '2024-01-11', merchant: 'Office Depot', amount: 87.45, category: 'Office Supplies', status: 'completed' }
  ]

  const sampleHistory: HistoryEntry[] = [
    { id: '1', date: '2024-01-10', action: 'Limit Updated', user: 'Alex Miller', details: 'Monthly limit increased from €3,000 to €5,000' },
    { id: '2', date: '2024-01-05', action: 'Card Activated', user: 'System', details: 'Card was activated and ready for use' },
    { id: '3', date: '2024-01-01', action: 'Card Created', user: 'Sarah Johnson', details: 'Card was created and assigned to Marketing team' }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-[600px] bg-gray-50 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-white p-6 border-b border-pliant-sand/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-medium text-pliant-charcoal">{card.type === 'virtual' ? 'Virtual' : 'Physical'} Card ({card.lastFourDigits})</h2>
              <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                {getStatusIcon(card.status)}
                <span className="capitalize">{card.status}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-pliant-charcoal/60" />
            </button>
          </div>
          
          {/* Quick Info Chips */}
          <div className="flex items-center flex-wrap gap-2 text-sm">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
              <Buildings size={14} className="text-pliant-charcoal/60" />
              <span className="text-pliant-charcoal/80 text-xs font-medium">{card.account}</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
              <User size={14} className="text-pliant-charcoal/60" />
              <span className="text-pliant-charcoal/80 text-xs font-medium">{card.cardHolder}</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
              <Users size={14} className="text-pliant-charcoal/60" />
              <span className="text-pliant-charcoal/80 text-xs font-medium">{card.team || 'Marketing Team'}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full pb-20 bg-gray-50">
          
          {/* Card Details Section */}
          <div className="mx-4 mt-4 space-y-4">
            
            {/* Card Preview */}
            <div className="px-6">
              <div className="flex justify-center mb-6">
                <img 
                  src={getCardImage(card.id)} 
                  alt="Card Preview" 
                  className="w-48 h-auto object-contain rounded-xl"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-6 mb-6">
                <button className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Snowflake size={20} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">Freeze</span>
                </button>
                
                <button className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <ChartBar size={20} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">Transactions</span>
                </button>
                
                <button className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <DotsThree size={20} className="text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">More</span>
                </button>
              </div>
            </div>

                        {/* Spending Overview */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <div className="text-lg font-medium text-pliant-charcoal">€{usedCredit.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Spent this {card.limitFrequency.slice(0, -2)}</div>
                </div>
              </div>

              {/* Show Details Button */}
              <div className="mb-4">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  <span className="text-pliant-charcoal font-medium">
                    {showDetails ? '▼' : '▶'} {showDetails ? 'Hide' : 'Show'} details
                  </span>
                  <span className="text-pliant-charcoal font-medium">€{card.available.toLocaleString()} available • €{card.spendingLimit.toLocaleString()} limit</span>
                </button>
              </div>

              {/* Details Breakdown */}
              {showDetails && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-pliant-charcoal font-medium">Total {card.limitFrequency} limit</span>
                    <span className="text-pliant-charcoal font-medium">€{card.spendingLimit.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600">Posted</span>
                        <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-500">ⓘ</span>
                        </div>
                      </div>
                      <span className="text-pliant-charcoal">€{usedCredit.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-gray-600">Pending</span>
                        <div className="w-3 h-3 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-500">ⓘ</span>
                        </div>
                      </div>
                      <span className="text-pliant-charcoal">€0.00</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-600">Available to spend</span>
                      </div>
                      <span className="text-green-600 font-medium">€{card.available.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Usage Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Usage</span>
                  <span className="text-xs font-medium text-pliant-charcoal">{creditUsagePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-pliant-charcoal h-1.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${creditUsagePercentage}%` }}
                  />
                </div>
              </div>
            </div>

                        {/* Card Controls */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
              <div className="space-y-3">
                {/* Limits */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pliant-charcoal">{card.limitFrequency.charAt(0).toUpperCase() + card.limitFrequency.slice(1)} spend limit</span>
                    <span className="text-sm font-medium text-pliant-charcoal">€{card.spendingLimit.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-pliant-charcoal">{card.limitFrequency.charAt(0).toUpperCase() + card.limitFrequency.slice(1)} withdrawal limit</span>
                      <div className="text-xs text-gray-500">Cash withdrawn this {card.limitFrequency.slice(0, -2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-pliant-charcoal">€{card.singleTransactionLimit.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">€0.00</div>
                    </div>
                  </div>
                </div>

                {/* Account */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pliant-charcoal">Account</span>
                    <span className="text-sm font-medium text-pliant-charcoal underline">{card.account} ••{card.lastFourDigits}</span>
                  </div>
                </div>

                {/* Card Type */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-pliant-charcoal">Card type</span>
                  <span className="text-sm font-medium text-pliant-charcoal">Physical {card.type.charAt(0).toUpperCase() + card.type.slice(1)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Card Controls Section */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-6">
            <h3 className="text-sm font-medium text-pliant-charcoal/60 uppercase tracking-wider mb-4">CARD CONTROLS</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-pliant-charcoal">Dates (specific)</span>
                <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full font-medium">ALLOWED</span>
              </div>
              <div className="text-xs text-pliant-charcoal/60 pl-0">
                16 Jun 2025 - 31 Aug 2025
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-6">
            <h3 className="text-sm font-medium text-pliant-charcoal/60 uppercase tracking-wider mb-4">LAST TRANSACTIONS</h3>
            <div className="text-sm text-pliant-charcoal/60">
              No transactions available.
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white mx-4 mt-4 mb-4 rounded-lg p-6">
            <h3 className="text-sm font-medium text-pliant-charcoal/60 uppercase tracking-wider mb-4">CARD HISTORY</h3>
            <div className="space-y-4">
              {sampleHistory.map((entry) => (
                <div key={entry.id} className="flex space-x-3">
                  <div className="w-2 h-2 bg-pliant-charcoal rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-pliant-charcoal">{entry.action}</span>
                      <span className="text-xs text-pliant-charcoal/60">{entry.date}</span>
                    </div>
                    <div className="text-xs text-pliant-charcoal/60 mt-1">{entry.details}</div>
                    <div className="text-xs text-pliant-charcoal/40 mt-1">by {entry.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default CardDetailDrawer 