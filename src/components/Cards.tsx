import React, { useState } from 'react'
import { 
  Plus, 
  MagnifyingGlass, 
  FunnelSimple, 
  Receipt, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  Warning
} from 'phosphor-react'
import { Button, Input } from '../design-system'
import PageHeader from './PageHeader'
import Table, { type TableColumn } from './Table'
import CardCreationFlow from './CardCreationFlow'
import CardDetailDrawer from './CardDetailDrawer'

// Import card SVG assets
import virtualCardBlue from '../assets/images/virtual_card_blue.svg'
import virtualCardRed from '../assets/images/virtual_card_red.svg'
import virtualCardFawn from '../assets/images/virtual_card_fawn.svg'
import virtualCardOrange from '../assets/images/virtual_card_orange.svg'
import virtualCardLime from '../assets/images/virtual_card_lime.svg'
import virtualCardGrey from '../assets/images/virtual_card_grey.svg'
import physicalCardCharcoal from '../assets/images/physical_card_charcoal.svg'

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
}

const Cards = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showCardCreation, setShowCardCreation] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  // Sample card data
  const cardsData: CardData[] = [
    {
      id: '1',
      type: 'virtual',
      color: 'blue',
      icon: virtualCardBlue,
      label: 'Marketing',
      lastFourDigits: '1234',
      cardHolder: 'Jane Smith',
      status: 'active',
      issued: '2024-01-15',
      validUntil: '2027-01-15',
      account: 'Main Account',
      spendingLimit: 5000,
      available: 3250,
      limitFrequency: 'monthly',
      singleTransactionLimit: 2500,
      transactionCount: 8,
      maxTransactionCount: 15,
      transactionFrequency: 'monthly'
    },
    {
      id: '2',
      type: 'physical',
      color: 'charcoal',
      icon: physicalCardCharcoal,
      label: 'Operations',
      lastFourDigits: '5678',
      cardHolder: 'Alex Miller',
      status: 'active',
      issued: '2024-02-10',
      validUntil: '2027-02-10',
      account: 'Ops / Payroll',
      spendingLimit: 10000,
      available: 8900,
      limitFrequency: 'monthly',
      singleTransactionLimit: 5000,
      transactionCount: 3,
      maxTransactionCount: 10,
      transactionFrequency: 'monthly'
    },
    {
      id: '3',
      type: 'virtual',
      color: 'red',
      icon: virtualCardRed,
      label: 'Travel',
      lastFourDigits: '9012',
      cardHolder: 'John Doe',
      status: 'pending',
      issued: '2024-03-05',
      validUntil: '2027-03-05',
      account: 'Treasury',
      spendingLimit: 7500,
      available: 7500,
      limitFrequency: 'weekly',
      singleTransactionLimit: 3000,
      transactionCount: 2,
      maxTransactionCount: 6,
      transactionFrequency: 'weekly'
    },
    {
      id: '4',
      type: 'virtual',
      color: 'orange',
      icon: virtualCardOrange,
      label: 'Development',
      lastFourDigits: '3456',
      cardHolder: 'Sarah Johnson',
      status: 'expired',
      issued: '2023-12-01',
      validUntil: '2024-12-01',
      account: 'Main Account',
      spendingLimit: 3000,
      available: 0,
      limitFrequency: 'daily',
      singleTransactionLimit: 1500,
      transactionCount: 0,
      maxTransactionCount: 20,
      transactionFrequency: 'daily'
    },
    {
      id: '5',
      type: 'virtual',
      color: 'lime',
      icon: virtualCardLime,
      label: 'Sales',
      lastFourDigits: '7890',
      cardHolder: 'Mike Wilson',
      status: 'requested',
      issued: '2024-06-01',
      validUntil: '2027-06-01',
      account: 'Treasury',
      spendingLimit: 8000,
      available: 8000,
      limitFrequency: 'monthly',
      singleTransactionLimit: 2000,
      transactionCount: 12,
      maxTransactionCount: 25,
      transactionFrequency: 'monthly'
    }
  ]

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

  const filteredCards = cardsData.filter(card =>
    card.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.cardHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.lastFourDigits.includes(searchTerm)
  )

  const tableColumns: TableColumn<CardData>[] = [
    {
      key: 'card',
      header: 'Card',
      className: 'w-64',
      render: (card) => (
        <div className="flex items-center space-x-3">
          <img src={card.icon} alt={card.label} className="w-12 h-8 object-contain flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-pliant-charcoal truncate">
              {card.label} ••{card.lastFourDigits}
            </div>
            <div className="text-xs text-pliant-charcoal/60 capitalize">
              {card.type} Card
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'cardHolder',
      header: 'Card Holder',
      render: (card) => (
        <div className="text-sm text-pliant-charcoal">{card.cardHolder}</div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (card) => (
        <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
          {getStatusIcon(card.status)}
          <span className="capitalize">{card.status}</span>
        </div>
      )
    },
    {
      key: 'dates',
      header: 'Dates',
      render: (card) => (
        <div className="text-sm text-pliant-charcoal">
          <div>Until: {new Date(card.validUntil).toLocaleDateString()}</div>
          <div className="text-xs text-pliant-charcoal/60">
            Issued: {new Date(card.issued).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      key: 'account',
      header: 'Account',
      render: (card) => (
        <div className="text-sm text-pliant-charcoal">{card.account}</div>
      )
    },
    {
      key: 'spendingLimits',
      header: 'Spending Limits',
      render: (card) => (
        <div className="text-sm text-pliant-charcoal">
          <div>€{card.spendingLimit.toLocaleString()} / {card.limitFrequency}</div>
          <div className="text-xs text-pliant-charcoal/60">
            €{card.available.toLocaleString()} available
          </div>
        </div>
      )
    },
    {
      key: 'transactionLimit',
      header: 'Transaction Limit',
      render: (card) => (
        <div className="text-sm text-pliant-charcoal">
          €{card.singleTransactionLimit.toLocaleString()}
        </div>
      )
    },
    {
      key: 'transactionCount',
      header: 'Transaction Count',
      render: (card) => (
        <div className="text-sm text-pliant-charcoal">
          <div>{card.transactionCount}/{card.maxTransactionCount}</div>
          <div className="text-xs text-pliant-charcoal/60 capitalize">
            {card.transactionFrequency}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <PageHeader 
        title="Cards" 
        subtitle="Manage your organization's cards"
        actions={
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => setShowCardCreation(true)}
          >
            <Plus size={16} className="mr-2" />
            New Card
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
                placeholder="Search cards..."
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
            {filteredCards.length} of {cardsData.length} cards
          </div>
        </div>

        {/* Cards Table */}
        <div className="bg-white rounded-lg border border-pliant-sand/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-pliant-sand/30">
              
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  {tableColumns.map((column) => (
                    <th 
                      key={column.key}
                      className={`px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider ${column.className || ''}`}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-pliant-sand/30">
                {filteredCards.map((card) => (
                  <tr 
                    key={card.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCard(card)}
                  >
                    {tableColumns.map((column) => (
                      <td 
                        key={column.key} 
                        className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                      >
                        {column.render(card)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-pliant-charcoal/60">No cards found matching your search.</p>
            </div>
          )}
        </div>

      </div>

      {/* Card Creation Flow Modal */}
      {showCardCreation && (
        <CardCreationFlow onClose={() => setShowCardCreation(false)} />
      )}

      {/* Card Detail Drawer */}
      {selectedCard && (
        <CardDetailDrawer 
          card={selectedCard}
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  )
}

export default Cards 