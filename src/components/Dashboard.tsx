import { useState } from 'react'
import { CreditCard, Money, ChartLine, Gear } from 'phosphor-react'

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(0)
  
  const userCards = [
    {
      name: "PliantCard Elite",
      last4: "1234",
      balance: "$2,847.50",
      limit: "$10,000",
      gradient: "from-primary-900 via-primary-800 to-primary-700",
      available: "$7,152.50"
    },
    {
      name: "PliantCard Pro",
      last4: "5678", 
      balance: "$1,234.20",
      limit: "$5,000",
      gradient: "from-primary-700 via-primary-600 to-primary-800",
      available: "$3,765.80"
    }
  ]

  const recentTransactions = [
    { merchant: "Apple Store", amount: "-$299.00", date: "Dec 15", category: "Technology", status: "completed" },
    { merchant: "Uber", amount: "-$18.50", date: "Dec 15", category: "Transportation", status: "completed" },
    { merchant: "Cashback Reward", amount: "+$15.00", date: "Dec 14", category: "Rewards", status: "completed" },
    { merchant: "Starbucks", amount: "-$4.50", date: "Dec 14", category: "Food & Drink", status: "completed" },
    { merchant: "Netflix", amount: "-$15.99", date: "Dec 13", category: "Subscriptions", status: "completed" },
    { merchant: "Amazon", amount: "-$87.32", date: "Dec 12", category: "Shopping", status: "completed" },
    { merchant: "Salary Deposit", amount: "+$3,500.00", date: "Dec 1", category: "Income", status: "completed" },
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your accounts and track spending</p>
        </div>

        {/* Account Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
              <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
            </div>
            <p className="text-2xl font-semibold text-gray-900">$4,081.70</p>
            <p className="text-xs text-gray-400 mt-1">Across all accounts</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Available Credit</h3>
              <div className="w-2 h-2 rounded-full bg-primary-600"></div>
            </div>
            <p className="text-2xl font-semibold text-gray-900">$10,918.30</p>
            <p className="text-xs text-gray-400 mt-1">Ready to spend</p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">This Month</h3>
              <div className="w-2 h-2 rounded-full bg-secondary-700"></div>
            </div>
            <p className="text-2xl font-semibold text-gray-900">$1,247.82</p>
            <p className="text-xs text-secondary-600 mt-1">↓ 12% vs last month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cards Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Cards</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {userCards.map((card, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-8 rounded bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                          <div className="w-3 h-2 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-sm"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{card.name}</p>
                          <p className="text-sm text-gray-500">**** **** **** {card.last4}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{card.balance}</p>
                        <p className="text-sm text-gray-500">of {card.limit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                <button className="text-sm text-primary-700 hover:text-primary-800 font-medium">
                  View all
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {transaction.merchant.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.merchant}</p>
                          <p className="text-sm text-gray-500">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-secondary-600' : 'text-gray-900'}`}>
                          {transaction.amount}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <CreditCard size={16} className="text-primary-700" />
                  </div>
                  <span className="text-gray-700 font-medium">Request New Card</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Money size={16} className="text-secondary-700" />
                  </div>
                  <span className="text-gray-700 font-medium">Make Payment</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <ChartLine size={16} className="text-secondary-700" />
                  </div>
                  <span className="text-gray-700 font-medium">View Analytics</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Gear size={16} className="text-primary-700" />
                  </div>
                  <span className="text-gray-700 font-medium">Settings</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Support</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">All systems operational</span>
                  </div>
                  <button className="w-full text-left text-primary-700 hover:text-primary-800 text-sm font-medium">
                    Contact Support →
                  </button>
                  <button className="w-full text-left text-primary-700 hover:text-primary-800 text-sm font-medium">
                    Help Center →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 