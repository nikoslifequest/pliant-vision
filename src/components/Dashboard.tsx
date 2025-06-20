import { useState } from 'react'
import { CreditCard as CreditCardIcon, Money, ChartLine, Gear } from 'phosphor-react'
import { Card, Button, StatusDot, QuickAction, CreditCard, Transaction } from '../design-system'

const Dashboard = () => {
  const [activeView] = useState('dashboard')

  const userCards = [
    { name: 'PliantCard Elite', last4: '4129', balance: '$2,240.18', limit: '$15,000', gradient: 'from-purple-600 to-blue-600' },
    { name: 'PliantCard Pro', last4: '8471', balance: '$847.92', limit: '$8,000', gradient: 'from-emerald-600 to-cyan-600' },
    { name: 'PliantCard Start', last4: '2847', balance: '$993.60', limit: '$3,000', gradient: 'from-orange-600 to-red-600' },
  ]

  const recentTransactions = [
    { merchant: 'Figma', category: 'Software', amount: '-$15.00', date: 'Today' },
    { merchant: 'AWS', category: 'Cloud Services', amount: '-$89.42', date: 'Yesterday' },
    { merchant: 'Stripe', category: 'Payment Processing', amount: '+$2,847.20', date: '2 days ago' },
    { merchant: 'Linear', category: 'Software', amount: '-$8.00', date: '3 days ago' },
    { merchant: 'GitHub', category: 'Development', amount: '-$21.00', date: '4 days ago' },
  ]

  return (
    <div className="p-6 bg-neutral-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-1">Dashboard</h1>
          <p className="text-neutral-500 text-sm">Manage your accounts and track spending</p>
        </div>

        {/* Account Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-500">Total Balance</h3>
              <StatusDot variant="online" />
            </div>
            <p className="text-2xl font-semibold text-neutral-900">$4,081.70</p>
            <p className="text-xs text-neutral-400 mt-1">Across all accounts</p>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-500">Available Credit</h3>
              <StatusDot variant="busy" />
            </div>
            <p className="text-2xl font-semibold text-neutral-900">$10,918.30</p>
            <p className="text-xs text-neutral-400 mt-1">Ready to spend</p>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-500">This Month</h3>
              <StatusDot variant="away" />
            </div>
            <p className="text-2xl font-semibold text-neutral-900">$1,247.82</p>
            <p className="text-xs text-secondary-600 mt-1">↓ 12% vs last month</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cards Section */}
            <Card>
              <div className="px-6 py-4 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-neutral-900">Cards</h2>
                  <Button variant="primary" size="sm">Add Card</Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {userCards.map((card, index) => (
                    <CreditCard
                      key={index}
                      name={card.name}
                      last4={card.last4}
                      balance={card.balance}
                      limit={card.limit}
                      gradient={card.gradient}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Transactions */}
            <Card padding="none">
              <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">Recent Transactions</h2>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              <div className="divide-y divide-neutral-200">
                {recentTransactions.map((transaction, index) => (
                  <Transaction
                    key={index}
                    merchant={transaction.merchant}
                    category={transaction.category}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <div className="px-6 py-4 border-b border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-2">
                <QuickAction
                  icon={<CreditCardIcon size={16} className="text-primary-700" />}
                  title="Request New Card"
                />
                <QuickAction
                  icon={<Money size={16} className="text-secondary-700" />}
                  title="Make Payment"
                />
                <QuickAction
                  icon={<ChartLine size={16} className="text-secondary-700" />}
                  title="View Analytics"
                />
                <QuickAction
                  icon={<Gear size={16} className="text-primary-700" />}
                  title="Settings"
                />
              </div>
            </Card>

            {/* Support */}
            <Card>
              <div className="px-6 py-4 border-b border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900">Support</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <StatusDot variant="online" />
                    <span className="text-sm text-neutral-600">All systems operational</span>
                  </div>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Contact Support →
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Help Center →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 