import React from 'react'
import { useState } from 'react'
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts'
import CardCreationFlow from './CardCreationFlow'
import { 
  CreditCard as CreditCardIcon,
  Money,
  Users,
  Receipt,
  ChartLine,
  TrendUp,
  TrendDown,
  Eye,
  EyeSlash,
  Plus,
  DotsThree,
  CaretLeft,
  CaretRight,
  Info,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Gear,
  Bank
} from 'phosphor-react'
import { Card, Button } from '../design-system'

// Import card assets
import physicalCardCharcoal from '../assets/images/physical_card_charcoal.svg'
import virtualCardBlue from '../assets/images/virtual_card_blue.svg'
import virtualCardRed from '../assets/images/virtual_card_red.svg'
import virtualCardSand from '../assets/images/virtual_card_fawn.svg'
import virtualCardOrange from '../assets/images/virtual_card_orange.svg'
import virtualCardLime from '../assets/images/virtual_card_lime.svg'

const Dashboard = () => {
  const [showConfig, setShowConfig] = useState(false)
  const [showCardCreation, setShowCardCreation] = useState(false)

  // Sample Data
  const dashboardData = {
    creditLimit: 150000,
    availableAmount: 103075,
    monthlyChange: { amount: 1700000, percentage: 12.4 },
    accounts: [
      { name: 'Main Account', balance: 103025.00, icon: Bank },
      { name: 'Prefund Account', balance: 50.00, icon: Money },
      { name: 'USD Account', balance: 0.00, icon: Money },
      { name: 'CHF Account', balance: 0.00, icon: Money },
      { name: 'GBP Account', balance: 0.00, icon: Money }
    ],
    co2Data: {
      compensated: 216.25,
      totalEmissions: 407.85,
      travelEmissions: 407.85,
      compensationPercentage: 53
    },
    cashback: {
      totalEarned: 35074,
      thisMonth: 2847,
      lastMonth: 3156,
      available: 8290
    },
    accountExport: {
      missingReceipts: 17,
      daysLeft: 8,
      progress: 73,
      readyTransactions: 156,
      readyAmount: 24750
    },
    creditCard: {
      balance: 12505.87,
      available: 21249,
      utilization: 36.6,
      autopayDate: 'Jun 28'
    },
    billPay: {
      outstanding: 11,
      overdue: 1,
      inbox: 3
    },
    invoicing: {
      overdue: { count: 4, amount: 950.00 },
      paid: { count: 12, amount: 6000 },
      open: { count: 12, amount: 12300 }
    },
    chartData: [
      { date: 'May 29', value: 4800000 },
      { date: 'Jun 3', value: 4950000 },
      { date: 'Jun 8', value: 5100000 },
      { date: 'Jun 13', value: 5050000 },
      { date: 'Jun 18', value: 5216471 }
    ],
    moneyMovement: {
      period: 'Jun 2025',
      moneyIn: 1674964.76,
      moneyOut: -379293.70,
      topSources: [
        { name: 'Venture Debt Loan', amount: 1000000.00, icon: 'VDL' },
        { name: 'GenPro', amount: 414983.19, icon: 'G' },
        { name: 'Google', amount: 59574.90, icon: 'GO' },
        { name: 'Milgram Brokerage', amount: 53690.48, icon: 'MB' }
      ],
      topSpend: [
        { name: 'Jordi O\'Donnell', amount: -990797.16, icon: 'JO' },
        { name: 'Gusto (Payroll)', amount: -990122.53, icon: 'GP' },
        { name: 'Google', amount: -961791.51, icon: 'GO' },
        { name: 'Milgram Brokerage', amount: -948802.72, icon: 'MB' }
      ],
      avgMoneyIn: 45000,
      avgMoneyOut: -144000
    },
    transactions: [
      { date: 'Jun 23', merchant: 'Mercury Working Capital', amount: -2200.00, account: 'Ops / Payroll', method: 'Working Capital Loan', status: null },
      { date: 'Jun 23', merchant: 'Payment from NASA', amount: 419.00, account: 'AR', method: 'Request or Invoice Payment', status: 'Failed' },
      { date: 'Jun 23', merchant: 'Payment from Acme Corp', amount: 200.00, account: 'AR', method: 'Request or Invoice Payment', status: null },
      { date: 'Jun 23', merchant: 'To Ops / Payroll', amount: -54810.16, account: 'AR', method: 'Transfer', status: null },
      { date: 'Jun 23', merchant: 'From AR', amount: 54810.16, account: 'Ops / Payroll', method: 'Transfer', status: null },
      { date: 'Jun 23', merchant: 'Lily\'s Eatery', amount: 0.93, account: 'Ops / Payroll', method: 'Jane B. ••1234', status: null },
      { date: 'Jun 23', merchant: 'Dell 77', amount: 6.91, account: 'Credit account', method: 'Jane B. ••5555', status: null },
      { date: 'Jun 23', merchant: 'Dell 77', amount: 23.28, account: 'Ops / Payroll', method: 'London S. ••4929', status: null },
      { date: 'Jun 23', merchant: 'Office Stop Co.', amount: -287.89, account: 'Ops / Payroll', method: 'Jessica A. ••9914', status: null },
      { date: 'Jun 23', merchant: 'Trader John\'s', amount: 53.49, account: 'Credit account', method: 'London S. ••0331', status: null }
    ]
  }

  // Recharts Balance Chart Component
  const BalanceChart = () => {
    const data = dashboardData.chartData.map((d, i) => ({
      date: ['May 29', 'Jun 3', 'Jun 8', 'Jun 13', 'Jun 18'][i],
      value: d.value
    }))

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A5C3C3" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#A5C3C3" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#19242A99', fontSize: 12 }}
            dy={10}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#A5C3C3"
            strokeWidth={2}
            fill="url(#areaGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[100px]">
            <div>
              <h1 className="text-2xl font-semibold text-pliant-charcoal mb-1">Dashboard</h1>
              <p className="text-pliant-charcoal/60">Welcome back, Alex</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowConfig(!showConfig)}
              >
                <Gear size={16} className="mr-2" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                Invite Member
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => {
                  console.log('New Card button clicked')
                  setShowCardCreation(true)
                }}
              >
                New Card
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Row: Balance + Accounts Side by Side */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          
          {/* Balance Card (2 columns width) */}
          <div className="col-span-2">
            <Card className="p-6 shadow-card h-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-pliant-charcoal">Financial Overview</h2>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ChartLine size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <DotsThree size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-3xl font-bold text-pliant-charcoal mb-2">
                  €{dashboardData.availableAmount.toLocaleString()}
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-pliant-charcoal/60">Available Amount</span>
                  <div className="flex items-center text-pliant-charcoal/60">
                    Limit: €{dashboardData.creditLimit.toLocaleString()}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-pliant-charcoal/60">Credit Utilization</span>
                    <span className="text-pliant-charcoal/60">
                      {Math.round(((dashboardData.creditLimit - dashboardData.availableAmount) / dashboardData.creditLimit) * 100)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-pliant-blue h-2 rounded-full" 
                      style={{ width: `${Math.round(((dashboardData.creditLimit - dashboardData.availableAmount) / dashboardData.creditLimit) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 mt-6 min-h-0">
                <BalanceChart />
              </div>
            </Card>
          </div>

          {/* Accounts Sidebar (1 column width) */}
          <div className="col-span-1">
            <Card className="p-6 shadow-card h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-pliant-charcoal">Bank Accounts</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <DotsThree size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {dashboardData.accounts.map((account, index) => {
                  const IconComponent = account.icon
                  return (
                    <div key={index} className="flex items-center justify-between py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-pliant-sand/20 rounded-full flex items-center justify-center">
                          <IconComponent size={16} className="text-pliant-charcoal" />
                        </div>
                        <span className="font-medium text-pliant-charcoal">{account.name}</span>
                      </div>
                      <span className="font-semibold text-pliant-charcoal">
                        ${account.balance.toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-pliant-sand/30 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-pliant-blue/20 rounded-full flex items-center justify-center text-xs font-bold text-pliant-charcoal">
                      +2
                    </div>
                    <span className="text-sm font-medium text-pliant-charcoal">View all accounts</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUp size={14} className="rotate-45" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Second Row: Credit Card, Bill Pay, Invoicing - Full Width */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          
          {/* CO2 Compensation */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-pliant-charcoal">CO₂ Compensation</h3>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Info size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <DotsThree size={16} />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-pliant-charcoal">
                {dashboardData.co2Data.compensated.toFixed(2)} t
              </div>
            </div>

            <div className="text-sm text-pliant-charcoal/60 mb-3">
              {dashboardData.co2Data.compensationPercentage}% compensated
            </div>
            <div className="bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-pliant-blue h-2 rounded-full" 
                style={{ width: `${dashboardData.co2Data.compensationPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-pliant-sand/30">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">✈️</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-pliant-charcoal">Travel CO₂</div>
                  <div className="text-xs text-pliant-charcoal/60">{dashboardData.co2Data.totalEmissions.toFixed(2)} t total</div>
                </div>
              </div>
              <div className="text-lg font-semibold text-pliant-charcoal">
                {dashboardData.co2Data.travelEmissions.toFixed(2)} t
              </div>
            </div>
          </Card>

          {/* Cashback */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-pliant-charcoal">Cashback</h3>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Info size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <DotsThree size={16} />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs font-bold">€</span>
              </div>
              <div className="text-2xl font-bold text-pliant-charcoal">
                €{dashboardData.cashback.totalEarned.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-pliant-charcoal/60 mb-1">This Month</div>
                <div className="text-lg font-semibold text-green-600">
                  €{dashboardData.cashback.thisMonth.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-pliant-charcoal/60 mb-1">Last Month</div>
                <div className="text-lg font-semibold text-pliant-charcoal">
                  €{dashboardData.cashback.lastMonth.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-pliant-sand/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-pliant-charcoal">Available</div>
                  <div className="text-sm text-pliant-charcoal/60">Ready to redeem</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-pliant-charcoal">
                    €{dashboardData.cashback.available.toLocaleString()}
                  </span>
                  <Button variant="primary" size="sm">Redeem</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Export */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-pliant-charcoal">Account Export</h3>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm">
                  <Info size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <DotsThree size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-pliant-red">{dashboardData.accountExport.missingReceipts}</div>
                <div className="text-xs text-pliant-charcoal/60">Missing</div>
                <div className="text-xs text-pliant-red">Receipts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">{dashboardData.accountExport.daysLeft}</div>
                <div className="text-xs text-pliant-charcoal/60">Days left</div>
                <div className="text-xs text-orange-600">Until deadline</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-pliant-charcoal/60">Export Progress</span>
                <span className="text-pliant-charcoal/60">{dashboardData.accountExport.progress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pliant-blue h-2 rounded-full" 
                  style={{ width: `${dashboardData.accountExport.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-pliant-sand/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-pliant-charcoal">Ready</div>
                  <div className="text-sm text-pliant-charcoal/60">{dashboardData.accountExport.readyTransactions} transactions • {dashboardData.accountExport.readyAmount}€</div>
                </div>
                <Button variant="primary" size="sm">
                  Export
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Third Row: Money Movement and Transactions - Full Width */}
        <div className="grid grid-cols-2 gap-6">
          {/* Money Movement */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-pliant-charcoal">Money movement</h3>
                <CaretLeft size={16} className="text-gray-400" />
                <span className="text-gray-600">{dashboardData.moneyMovement.period}</span>
                <CaretRight size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Money In */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Money in</h4>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">
                  ${dashboardData.moneyMovement.moneyIn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                
                <div className="space-y-3 mb-4">
                  <h5 className="text-sm font-medium text-gray-600">Top sources</h5>
                  {dashboardData.moneyMovement.topSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">{source.icon}</span>
                        </div>
                        <span className="text-sm text-gray-900">{source.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${source.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ArrowUpRight size={14} className="text-gray-600" />
                    </div>
                    <span className="text-sm text-pliant-blue">View all</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Last 3 months average</div>
                  <div className="text-lg font-semibold text-gray-900">${dashboardData.moneyMovement.avgMoneyIn}K</div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div className="bg-pliant-blue h-1 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              {/* Money Out */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Money out</h4>
                  <Info size={14} className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  ${Math.abs(dashboardData.moneyMovement.moneyOut).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                
                <div className="space-y-3 mb-4">
                  <h5 className="text-sm font-medium text-gray-600">Top spend</h5>
                  {dashboardData.moneyMovement.topSpend.map((spend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">{spend.icon}</span>
                        </div>
                        <span className="text-sm text-gray-900">{spend.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${Math.abs(spend.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ArrowUpRight size={14} className="text-gray-600" />
                    </div>
                    <span className="text-sm text-pliant-blue">View all</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Last 3 months average</div>
                  <div className="text-lg font-semibold text-gray-900">${Math.abs(dashboardData.moneyMovement.avgMoneyOut)}K</div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div className="bg-pliant-blue h-1 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Transactions */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-pliant-charcoal">Transactions</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-pliant-blue">View all</span>
                <CaretRight size={16} className="text-pliant-blue" />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-6">
              <button className="px-3 py-2 bg-pliant-charcoal text-white text-xs rounded-lg">Recent</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">My transactions</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">Monthly money in</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">Monthly money out</button>
              <button className="px-3 py-2 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">Operating expenses</button>
            </div>

            {/* Transaction Headers */}
            <div className="grid grid-cols-12 gap-4 text-xs text-gray-500 font-medium mb-4 pb-2 border-b border-gray-100">
              <div className="col-span-2">Date</div>
              <div className="col-span-3">To/From</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2">Account</div>
              <div className="col-span-3">Method</div>
            </div>

            {/* Transaction List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {dashboardData.transactions.map((transaction, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="col-span-2 text-sm text-gray-900">{transaction.date}</div>
                  <div className="col-span-3 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {transaction.merchant.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{transaction.merchant}</div>
                      {transaction.status && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {transaction.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`col-span-2 text-right text-sm font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">{transaction.account}</div>
                  <div className="col-span-3 flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{transaction.method}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Card Creation Flow Modal */}
      {showCardCreation && (
        <CardCreationFlow onClose={() => {
          console.log('Closing Card Creation Flow')
          setShowCardCreation(false)
        }} />
      )}
      
      {/* Debug info */}
      {(() => {
        console.log('showCardCreation state:', showCardCreation)
        return null
      })()}
    </div>
  )
}

export default Dashboard 