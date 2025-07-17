import React, { useState } from 'react'
import { MagnifyingGlass, FunnelSimple, Download, Eye, Flag, CheckCircle, Clock, XCircle, ArrowClockwise } from 'phosphor-react'
import { Button, Input } from '../design-system'
import PageHeader from './PageHeader'
import TransactionDetailDrawer from './TransactionDetailDrawer'

// Import card SVG assets
import virtualCardBlue from '../assets/images/virtual_card_blue.svg'
import virtualCardRed from '../assets/images/virtual_card_red.svg'
import virtualCardFawn from '../assets/images/virtual_card_fawn.svg'
import virtualCardOrange from '../assets/images/virtual_card_orange.svg'
import virtualCardLime from '../assets/images/virtual_card_lime.svg'
import virtualCardGrey from '../assets/images/virtual_card_grey.svg'
import physicalCardCharcoal from '../assets/images/physical_card_charcoal.svg'

interface Transaction {
  id: string
  merchant: {
    name: string
    icon: string
    category: string
  }
  date: string
  card: {
    type: 'virtual' | 'physical'
    label: string
    lastFourDigits: string
    icon: string
  }
  member: string
  co2Emission: number // in kg
  amount: number
  status: 'successful' | 'pending' | 'declined' | 'refunded'
  review: {
    needsReview: boolean
    isFlagged: boolean
  }
  export: {
    isExported: boolean
    exportDate?: string
  }
  // Extended fields for detail view
  receiptNumber?: string
  accountingDetails: {
    category: string
    vatRate: number
    project?: string
    consumerReference?: string
    team?: string
  }
  transactionDetails: {
    cardholder: string
    account: string
    note?: string
  }
  receipt?: {
    date: string
    number?: string
    imageUrl?: string
  }
}

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)



  // Mock data for transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      merchant: {
        name: 'Amazon Business',
        icon: 'https://logo.clearbit.com/amazon.com',
        category: 'Electronics & IT Equipment'
      },
      date: '2024-01-15',
      card: {
        type: 'virtual',
        label: 'Marketing Team',
        lastFourDigits: '4532',
        icon: virtualCardBlue
      },
      member: 'Sarah Johnson',
      co2Emission: 2.4,
      amount: 299.99,
      status: 'successful',
      review: {
        needsReview: false,
        isFlagged: false
      },
      export: {
        isExported: true,
        exportDate: '2024-01-16'
      },
      accountingDetails: {
        category: 'Office Equipment',
        vatRate: 19,
        project: 'Marketing Campaign',
        team: 'Marketing Team'
      },
      transactionDetails: {
        cardholder: 'Sarah Johnson',
        account: 'Main Account'
      }
    },
    {
      id: '2',
      merchant: {
        name: 'Starbucks',
        icon: 'https://logo.clearbit.com/starbucks.com',
        category: 'Food & Beverage'
      },
      date: '2024-01-14',
      card: {
        type: 'physical',
        label: 'Executive Card',
        lastFourDigits: '1234',
        icon: physicalCardCharcoal
      },
      member: 'Alex Miller',
      co2Emission: 0.8,
      amount: 12.50,
      status: 'pending',
      review: {
        needsReview: true,
        isFlagged: false
      },
      export: {
        isExported: false
      },
      accountingDetails: {
        category: 'Food & Beverage',
        vatRate: 19,
        project: 'HR Costs',
        team: 'Operations Team'
      },
      transactionDetails: {
        cardholder: 'Alex Miller',
        account: 'Main Account'
      }
    },
    {
      id: '3',
      merchant: {
        name: 'Adobe Creative Cloud',
        icon: 'https://logo.clearbit.com/adobe.com',
        category: 'Software & Tools'
      },
      date: '2024-01-13',
      card: {
        type: 'virtual',
        label: 'Design Team',
        lastFourDigits: '7890',
        icon: virtualCardRed
      },
      member: 'Emma Davis',
      co2Emission: 0.1,
      amount: 52.99,
      status: 'declined',
      review: {
        needsReview: true,
        isFlagged: true
      },
      export: {
        isExported: false
      },
      accountingDetails: {
        category: 'Software & Tools',
        vatRate: 19,
        project: 'Design Operations',
        team: 'Design Team'
      },
      transactionDetails: {
        cardholder: 'Emma Davis',
        account: 'Main Account'
      }
    },
    {
      id: '4',
      merchant: {
        name: 'Coursera',
        icon: 'https://logo.clearbit.com/coursera.org',
        category: 'Education & Training'
      },
      date: '2024-01-12',
      card: {
        type: 'virtual',
        label: 'HR Team',
        lastFourDigits: '5678',
        icon: virtualCardOrange
      },
      member: 'Michael Chen',
      co2Emission: 0.05,
      amount: 89.00,
      status: 'refunded',
      review: {
        needsReview: false,
        isFlagged: false
      },
      export: {
        isExported: true,
        exportDate: '2024-01-13'
      },
      accountingDetails: {
        category: 'Education & Training',
        vatRate: 19,
        project: 'HR Development',
        team: 'HR Team'
      },
      transactionDetails: {
        cardholder: 'Michael Chen',
        account: 'Main Account'
      }
    },
    {
      id: '5',
      merchant: {
        name: 'Google Ads',
        icon: 'https://logo.clearbit.com/google.com',
        category: 'Advertising & Marketing'
      },
      date: '2024-01-11',
      card: {
        type: 'virtual',
        label: 'Marketing Team',
        lastFourDigits: '4532',
        icon: virtualCardBlue
      },
      member: 'Sarah Johnson',
      co2Emission: 0.02,
      amount: 150.00,
      status: 'successful',
      review: {
        needsReview: false,
        isFlagged: false
      },
      export: {
        isExported: false
      },
      accountingDetails: {
        category: 'Advertising & Marketing',
        vatRate: 19,
        project: 'Digital Marketing',
        team: 'Marketing Team'
      },
      transactionDetails: {
        cardholder: 'Sarah Johnson',
        account: 'Main Account'
      }
    }
  ]

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'successful': return ''
      case 'pending': return 'text-blue-600 bg-blue-50'
      case 'declined': return 'text-red-600 bg-red-50'
      case 'refunded': return 'text-success-600 bg-success-50'
      default: return ''
    }
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending': return <Clock size={14} className="text-blue-600" />
      case 'declined': return <XCircle size={14} className="text-red-600" />
      case 'refunded': return <ArrowClockwise size={14} className="text-success-600" />
      default: return null
    }
  }

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.card.label.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    if (selectedFilter === 'pending') return matchesSearch && transaction.status === 'pending'
    if (selectedFilter === 'needs-review') return matchesSearch && transaction.review.needsReview
    if (selectedFilter === 'flagged') return matchesSearch && transaction.review.isFlagged
    
    return matchesSearch
  })

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <PageHeader 
        title="Transactions" 
        subtitle="Monitor and manage all company transactions across all cards and team members"
        actions={
          <Button 
            variant="outline" 
            size="sm"
          >
            <Download size={16} className="mr-2" />
            Download CSV
          </Button>
        }
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pliant-charcoal/40" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            {/* Filter Button */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelSimple size={16} className="mr-2" />
              Filter
            </Button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-pliant-charcoal/60">
            {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-pliant-sand/30">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-pliant-charcoal">Filter by:</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-pliant-sand/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pliant-blue/20 focus:border-pliant-blue bg-white"
              >
                <option value="all">All Transactions</option>
                <option value="pending">Pending</option>
                <option value="needs-review">Needs Review</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="bg-white rounded-lg border border-pliant-sand/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-pliant-sand/30">
              
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Card</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">CO₂ Emission</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Review</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider">Export</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-pliant-sand/30">
                {filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    {/* Merchant Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={transaction.merchant.icon} 
                            alt={transaction.merchant.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling!.textContent = transaction.merchant.name.charAt(0).toUpperCase();
                            }}
                          />
                          <span className="text-sm font-medium text-pliant-charcoal/60 hidden">
                            {transaction.merchant.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-pliant-charcoal truncate">{transaction.merchant.name}</div>
                          <div className="text-xs text-pliant-charcoal/60 truncate">{transaction.merchant.category}</div>
                        </div>
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-pliant-charcoal">{formatDate(transaction.date)}</div>
                    </td>

                    {/* Card Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={transaction.card.icon} 
                          alt={transaction.card.label} 
                          className="w-8 h-5 object-contain flex-shrink-0" 
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-pliant-charcoal truncate">{transaction.card.label}</div>
                          <div className="text-xs text-pliant-charcoal/60 truncate">
                            {transaction.card.type === 'virtual' ? 'Virtual' : 'Physical'} •••• {transaction.card.lastFourDigits}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Member Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-pliant-charcoal">{transaction.member}</div>
                    </td>

                    {/* CO2 Emission Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-pliant-charcoal">{transaction.co2Emission} kg CO₂</div>
                    </td>

                    {/* Amount & Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col items-end">
                        {transaction.status !== 'successful' && (
                          <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium mb-1 ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="capitalize">{transaction.status}</span>
                          </div>
                        )}
                        <div className="text-sm font-medium text-pliant-charcoal">{formatCurrency(transaction.amount)}</div>
                      </div>
                    </td>

                    {/* Review Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {transaction.review.needsReview && (
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center" title="Needs Review">
                            <Eye size={14} className="text-orange-600" />
                          </div>
                        )}
                        {transaction.review.isFlagged && (
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center" title="Flagged">
                            <Flag size={14} className="text-red-600" />
                          </div>
                        )}
                        {!transaction.review.needsReview && !transaction.review.isFlagged && (
                          <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center" title="Reviewed">
                            <CheckCircle size={14} className="text-success-600" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Export Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.export.isExported ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center" title="Exported">
                            <CheckCircle size={14} className="text-success-600" />
                          </div>
                          {transaction.export.exportDate && (
                            <div className="text-xs text-pliant-charcoal/60">
                              {formatDate(transaction.export.exportDate)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" title="Not Exported">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-pliant-charcoal/60">No transactions found matching your search.</p>
            </div>
          )}
        </div>

      </div>

      {/* Transaction Detail Drawer */}
      {selectedTransaction && (
        <TransactionDetailDrawer 
          transaction={selectedTransaction}
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  )
}

export default Transactions 