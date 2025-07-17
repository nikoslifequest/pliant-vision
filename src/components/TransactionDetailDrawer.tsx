import React, { useState, useEffect } from 'react'
import { X, PencilSimple, Plus, Calendar, Flag, CheckCircle, Receipt, Buildings, User, Clock } from 'phosphor-react'
import { Button } from '../design-system/components'

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
  co2Emission: number
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

interface TransactionDetailDrawerProps {
  transaction: Transaction
  isOpen: boolean
  onClose: () => void
}

const TransactionDetailDrawer = ({ transaction, isOpen, onClose }: TransactionDetailDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Lock body scroll
      document.body.style.overflow = 'hidden'
      
      setTimeout(() => {
        setIsAnimating(true)
      }, 50)
    } else {
      setIsAnimating(false)
      setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = 'unset'
      }, 300)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, onClose])

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

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'successful': return 'text-success-600 bg-success-50'
      case 'pending': return 'text-blue-600 bg-blue-50'
      case 'declined': return 'text-red-600 bg-red-50'
      case 'refunded': return 'text-success-600 bg-success-50'
      default: return ''
    }
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending': return <Clock size={14} className="text-blue-600" />
      case 'declined': return <X size={14} className="text-red-600" />
      case 'refunded': return <CheckCircle size={14} className="text-success-600" />
      default: return null
    }
  }

  const calculateVAT = (amount: number, vatRate: number) => {
    const vatAmount = (amount * vatRate) / (100 + vatRate)
    return vatAmount
  }

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
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
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
              <div>
                <h2 className="text-lg font-medium text-pliant-charcoal">{transaction.merchant.name}</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-pliant-charcoal/60">{formatDate(transaction.date)}</p>
                  {transaction.status !== 'successful' && (
                    <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="capitalize">{transaction.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-pliant-charcoal/60" />
            </button>
          </div>
          
          {/* Amount and Quick Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-wrap gap-2 text-sm">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                <Buildings size={14} className="text-pliant-charcoal/60" />
                <span className="text-pliant-charcoal/80 text-xs font-medium">{transaction.merchant.category}</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                <User size={14} className="text-pliant-charcoal/60" />
                <span className="text-pliant-charcoal/80 text-xs font-medium">{transaction.member}</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
                <span className="text-pliant-charcoal/80 text-xs font-medium">{transaction.co2Emission} kg CO₂</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-pliant-charcoal">
                {formatCurrency(transaction.amount)}
              </div>
              <div className="text-sm text-pliant-charcoal/60">
                VAT ({transaction.accountingDetails.vatRate}%) €{calculateVAT(transaction.amount, transaction.accountingDetails.vatRate).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full pb-20 bg-gray-50">
          
          {/* Section Container */}
          <div className="mx-4 mt-4 space-y-4">
            
            {/* Review Section */}
            {transaction.review.needsReview && (
              <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Flag size={16} className="text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Review transaction</span>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    Please confirm if the transaction complies with your company's policies.
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                      Flag
                    </Button>
                    <Button variant="primary" size="sm" className="bg-success-600 hover:bg-success-700">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Accounting Details */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-pliant-charcoal">Accounting Details</h3>
                <Button variant="ghost" size="sm">
                  <Plus size={16} className="mr-1" />
                  Split transaction
                </Button>
              </div>

              <div className="space-y-3">
                {/* Receipt number */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Receipt number</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">—</span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <PencilSimple size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Category</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">
                        {transaction.accountingDetails.category}
                      </span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <PencilSimple size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* VAT Rate */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-pliant-charcoal">VAT Rate</span>
                      <span className="text-blue-600">⚡</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">
                        {transaction.accountingDetails.vatRate}% ({transaction.accountingDetails.vatRate}%)
                      </span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <X size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Project</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">
                        {transaction.accountingDetails.project || 'HR Costs'}
                      </span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <X size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Consumer Reference */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">ConsumerReference</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">—</span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <PencilSimple size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Team */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Team</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">
                        {transaction.accountingDetails.team || 'Payment Ops & Programs'}
                      </span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <X size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
              <h3 className="text-lg font-medium text-pliant-charcoal mb-4">Transaction Details</h3>

              <div className="space-y-3">
                {/* Merchant */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Merchant</span>
                    <span className="text-sm text-pliant-charcoal/60">{transaction.merchant.name}</span>
                  </div>
                </div>

                {/* Cardholder */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Cardholder</span>
                    <span className="text-sm text-pliant-charcoal/60">{transaction.member}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Card</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">
                        {transaction.card.label} •••• {transaction.card.lastFourDigits}
                      </span>
                      <img 
                        src={transaction.card.icon} 
                        alt={transaction.card.label} 
                        className="w-8 h-5 object-contain" 
                      />
                    </div>
                  </div>
                </div>

                {/* Account */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Account</span>
                    <span className="text-sm text-pliant-charcoal/60">Main account</span>
                  </div>
                </div>

                {/* Note */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Note</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">Add comment</span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <PencilSimple size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Receipt Section */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-pliant-charcoal">Receipt</h3>
                <Button variant="ghost" size="sm">
                  <Plus size={16} className="mr-1" />
                  Add a receipt
                </Button>
              </div>

              {/* Receipt Image Preview */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Receipt size={32} className="text-gray-400 mb-2 mx-auto" />
                    <p className="text-sm text-gray-500">No receipt uploaded</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Upload receipt
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Receipt Date */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-pliant-charcoal">Receipt date</span>
                      <Calendar size={14} className="text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">{formatDate(transaction.date)}</span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <PencilSimple size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Receipt Number */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-pliant-charcoal">Receipt number</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-pliant-charcoal/60">—</span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <PencilSimple size={14} className="text-pliant-charcoal/40" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionDetailDrawer 