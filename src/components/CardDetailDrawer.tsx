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
  DotsThree,
  CaretDown,
  CaretUp
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
  // Legacy fields for backward compatibility
  spendingLimit: number
  available: number
  limitFrequency: 'monthly' | 'weekly' | 'daily'
  singleTransactionLimit: number
  transactionCount: number
  maxTransactionCount: number
  transactionFrequency: 'monthly' | 'weekly' | 'daily'
  // New multiple limits system
  spendingLimits?: SpendingLimit[]
  transactionCountLimits?: TransactionCountLimit[]
  singleTransactionLimitNew?: number
  team?: string
  project?: string
}

interface SpendingLimit {
  id: string
  amount: number
  interval: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  used: number
  resetDate: string
}

interface TransactionCountLimit {
  id: string
  count: number
  interval: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  used: number
  resetDate: string
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
  const [isVisible, setIsVisible] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isSpendingOverviewExpanded, setIsSpendingOverviewExpanded] = React.useState(true)

  // Handle smooth open/close animations
  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Small delay to ensure the element is rendered before animation starts
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 50) // Increased delay to ensure smooth transition
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Match the transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle escape key and body scroll lock
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success-600 bg-success-50'
      case 'pending': return 'text-orange-600 bg-orange-50'
      case 'requested': return 'text-blue-600 bg-blue-50'
      case 'terminated': return 'text-red-600 bg-red-50'
      case 'expired': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-success-600" />
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

  const intervalLabels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly'
  }

  const getUsagePercentage = (used: number, total: number) => {
    return total > 0 ? (used / total) * 100 : 0
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 75) return 'bg-orange-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-success-500'
  }

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString()}`
  }

  // Mock data for new limits system - in real app this would come from the card data
  const mockSpendingLimits: SpendingLimit[] = [
    { id: '1', amount: 1000, interval: 'monthly', used: 350, resetDate: '2024-02-01' },
    { id: '2', amount: 50, interval: 'daily', used: 25, resetDate: '2024-01-16' }
  ]

  const mockTransactionLimits: TransactionCountLimit[] = [
    { id: '1', count: 20, interval: 'monthly', used: 8, resetDate: '2024-02-01' },
    { id: '2', count: 3, interval: 'daily', used: 1, resetDate: '2024-01-16' }
  ]

  // Use new limits if available, otherwise fall back to legacy system
  const spendingLimits = card.spendingLimits || mockSpendingLimits
  const transactionLimits = card.transactionCountLimits || mockTransactionLimits
  const singleTxLimit = card.singleTransactionLimitNew || card.singleTransactionLimit

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

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-out ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`
        fixed right-0 top-0 h-full w-[600px] bg-gray-50 shadow-xl z-50 
        transform transition-all duration-300 ease-out
        ${isAnimating ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
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
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setIsSpendingOverviewExpanded(!isSpendingOverviewExpanded)}
                  className="flex items-center space-x-2 hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors"
                >
                  <h3 className="text-lg font-medium text-pliant-charcoal">Spending Overview</h3>
                  {isSpendingOverviewExpanded ? (
                    <CaretUp size={16} className="text-pliant-charcoal/60" />
                  ) : (
                    <CaretDown size={16} className="text-pliant-charcoal/60" />
                  )}
                </button>
                <Button variant="ghost" size="sm">
                  <PencilSimple size={16} />
                </Button>
              </div>

              {/* Collapsible Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isSpendingOverviewExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {/* Spending Limits */}
                {spendingLimits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-pliant-charcoal mb-3">Spending Limits</h4>
                    <div className="space-y-3">
                      {spendingLimits.map((limit) => {
                        const percentage = getUsagePercentage(limit.used, limit.amount)
                        const remaining = limit.amount - limit.used
                        return (
                          <div key={limit.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-pliant-charcoal">
                                {intervalLabels[limit.interval]} Limit
                              </span>
                              <span className="text-sm text-pliant-charcoal/60">
                                {formatCurrency(limit.used)} of {formatCurrency(limit.amount)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <div 
                                className={`${getUsageColor(percentage)} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-xs text-pliant-charcoal/60">
                              <span>{formatCurrency(remaining)} remaining</span>
                              <span>Resets {new Date(limit.resetDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Transaction Count Limits */}
                {transactionLimits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-pliant-charcoal mb-3">Transaction Limits</h4>
                    <div className="space-y-3">
                      {transactionLimits.map((limit) => {
                        const percentage = getUsagePercentage(limit.used, limit.count)
                        const remaining = limit.count - limit.used
                        return (
                          <div key={limit.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-pliant-charcoal">
                                {intervalLabels[limit.interval]} Transactions
                              </span>
                              <span className="text-sm text-pliant-charcoal/60">
                                {limit.used} of {limit.count}
                              </span>
                            </div>
                            
                            {/* Segmented Progress Bar */}
                            <div className="flex gap-1 mb-2">
                              {Array.from({ length: limit.count }, (_, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 h-2 rounded-sm transition-all duration-300 ${
                                    i < limit.used 
                                      ? 'bg-success-600' 
                                      : 'bg-gray-200'
                                  }`}
                                  style={{ minWidth: '4px' }}
                                />
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-pliant-charcoal/60">
                              <span>{remaining} remaining</span>
                              <span>Resets {new Date(limit.resetDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Single Transaction Limit */}
                {singleTxLimit && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-pliant-charcoal">Single Transaction Limit</span>
                      <span className="text-sm font-semibold text-blue-600">{formatCurrency(singleTxLimit)}</span>
                    </div>
                    <p className="text-xs text-pliant-charcoal/60 mt-1">Maximum amount per transaction</p>
                  </div>
                )}

                {/* Legacy fallback for old system */}
                {(!spendingLimits.length && !transactionLimits.length) && (
                  <div className="text-center py-4 text-pliant-charcoal/60">
                    <p className="text-sm">No limits configured</p>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Usage</span>
                <span className="text-xs font-medium text-pliant-charcoal">{creditUsagePercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`${getUsageColor(creditUsagePercentage)} h-1.5 rounded-full transition-all duration-500 ease-out`} 
                  style={{ width: `${creditUsagePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card Controls Section */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-6">
            <h3 className="text-sm font-medium text-pliant-charcoal/60 uppercase tracking-wider mb-4">CARD CONTROLS</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-pliant-charcoal">Dates (specific)</span>
                <span className="text-xs text-success-600 bg-success-50 px-2 py-1 rounded-full font-medium">ALLOWED</span>
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