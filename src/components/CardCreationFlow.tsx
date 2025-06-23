import React, { useState } from 'react'
import { X, Check, ArrowLeft, ArrowRight, User, CreditCard, Gear, Palette, FileText } from 'phosphor-react'
import { Button, Card, Select, Input } from '../design-system'

interface CardCreationFlowProps {
  onClose: () => void
}

interface FormData {
  // Step 1
  assignee: string
  useTemplate: boolean
  cardType: string
  
  // Step 2
  validPeriod: string
  limitPeriod: string
  limitAmount: string
  limitCount: string
  transactionLimit: string
  
  // Step 3
  categoriesMode: 'allow' | 'block'
  categories: string[]
  merchantsMode: 'allow' | 'block'
  merchants: string[]
  timeMode: 'allow' | 'block'
  allowedDays: string[]
  allowedTimes: { start: string; end: string }
  regionsMode: 'allow' | 'block'
  regions: string[]
  atmWithdrawal: boolean
  
  // Step 4
  cardName: string
  cardColor: string
  team: string
  project: string
}

const CardCreationFlow: React.FC<CardCreationFlowProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    assignee: '',
    useTemplate: false,
    cardType: '',
    validPeriod: '',
    limitPeriod: '',
    limitAmount: '',
    limitCount: '',
    transactionLimit: '',
    categoriesMode: 'allow',
    categories: [],
    merchantsMode: 'allow',
    merchants: [],
    timeMode: 'allow',
    allowedDays: [],
    allowedTimes: { start: '', end: '' },
    regionsMode: 'allow',
    regions: [],
    atmWithdrawal: false,
    cardName: '',
    cardColor: 'grey',
    team: '',
    project: ''
  })

  const steps = [
    { id: 1, title: 'Card Setup', description: 'Choose recipient and type', icon: User },
    { id: 2, title: 'Limits & Validity', description: 'Set spending limits', icon: CreditCard },
    { id: 3, title: 'Card Controls', description: 'Configure restrictions', icon: Gear },
    { id: 4, title: 'Customization', description: 'Name and appearance', icon: Palette },
    { id: 5, title: 'Summary', description: 'Review and confirm', icon: FileText }
  ]

  const cardTypes = [
    { id: 'virtual', name: 'Virtual Card', description: 'Digital card for online purchases' },
    { id: 'travel', name: 'Travel Purchasing Card', description: 'For business travel expenses' },
    { id: 'single-use', name: 'Single-Use Card', description: 'One-time payment card' },
    { id: 'standard-physical', name: 'Standard Physical', description: 'Regular plastic card' },
    { id: 'premium-physical', name: 'Premium Physical', description: 'Metal card with premium features' },
    { id: 'lodge', name: 'Lodge Card', description: 'Specialized accommodation card' }
  ]

  const cardColors = [
    { id: 'grey', name: 'Grey', color: '#9CA3AF' },
    { id: 'lime', name: 'Lime', color: '#E6FF52' },
    { id: 'fawn', name: 'Fawn', color: '#E4D7CF' },
    { id: 'blue', name: 'Blue', color: '#A5C3C3' },
    { id: 'orange', name: 'Orange', color: '#FFA070' },
    { id: 'red', name: 'Red', color: '#FF727E' }
  ]

  const categories = [
    'Food & Dining', 'Office Equipment', 'Software', 'Travel', 'Entertainment',
    'Fuel', 'Hotels', 'Marketing', 'Professional Services', 'Utilities'
  ]

  const [newMerchantInput, setNewMerchantInput] = useState('')
  const [newRegionInput, setNewRegionInput] = useState('')

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item]
    updateFormData(field, newArray)
  }

  const addMerchant = (merchantName: string) => {
    if (merchantName.trim() && !formData.merchants.includes(merchantName.trim())) {
      const updatedArray = [...formData.merchants, merchantName.trim()]
      updateFormData('merchants', updatedArray)
    }
  }

  const removeMerchant = (merchantName: string) => {
    const updatedArray = formData.merchants.filter(m => m !== merchantName)
    updateFormData('merchants', updatedArray)
  }

  const addRegion = (regionName: string) => {
    if (regionName.trim() && !formData.regions.includes(regionName.trim())) {
      const updatedArray = [...formData.regions, regionName.trim()]
      updateFormData('regions', updatedArray)
    }
  }

  const removeRegion = (regionName: string) => {
    const updatedArray = formData.regions.filter(r => r !== regionName)
    updateFormData('regions', updatedArray)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-pliant-charcoal mb-2">Who is this card for?</h2>
              <p className="text-pliant-charcoal/60 mb-6">Select the person who will receive this card</p>
              
              <div className="mb-8">
                <Input
                  label="Assignee"
                  type="text"
                  placeholder="Search for team member..."
                  value={formData.assignee}
                  onChange={(e) => updateFormData('assignee', e.target.value)}
                />
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-pliant-charcoal mb-4">Card Creation Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`p-6 cursor-pointer transition-all border rounded-lg ${!formData.useTemplate ? 'ring-2 ring-pliant-blue bg-pliant-blue/5 border-pliant-blue' : 'hover:bg-gray-50 border-gray-200'}`}
                    onClick={() => updateFormData('useTemplate', false)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${!formData.useTemplate ? 'border-pliant-blue bg-pliant-blue' : 'border-gray-300'}`}>
                        {!formData.useTemplate && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                      </div>
                      <div>
                        <h4 className="font-semibold text-pliant-charcoal">Create New Card</h4>
                        <p className="text-sm text-pliant-charcoal/60">Configure from scratch</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-6 cursor-pointer transition-all border rounded-lg ${formData.useTemplate ? 'ring-2 ring-pliant-blue bg-pliant-blue/5 border-pliant-blue' : 'hover:bg-gray-50 border-gray-200'}`}
                    onClick={() => updateFormData('useTemplate', true)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${formData.useTemplate ? 'border-pliant-blue bg-pliant-blue' : 'border-gray-300'}`}>
                        {formData.useTemplate && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                      </div>
                      <div>
                        <h4 className="font-semibold text-pliant-charcoal">Use Template</h4>
                        <p className="text-sm text-pliant-charcoal/60">Start with existing setup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-pliant-charcoal mb-4">Card Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {cardTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 cursor-pointer transition-all border rounded-lg ${formData.cardType === type.id ? 'ring-2 ring-pliant-blue bg-pliant-blue/5 border-pliant-blue' : 'hover:bg-gray-50 border-gray-200'}`}
                      onClick={() => updateFormData('cardType', type.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 mt-1 ${formData.cardType === type.id ? 'border-pliant-blue bg-pliant-blue' : 'border-gray-300'}`}>
                          {formData.cardType === type.id && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                        </div>
                        <div>
                          <h4 className="font-semibold text-pliant-charcoal">{type.name}</h4>
                          <p className="text-sm text-pliant-charcoal/60">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-pliant-charcoal mb-2">Limits & Validity</h2>
              <p className="text-pliant-charcoal/60 mb-6">Set spending limits and validity period</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                    Valid Period
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                    value={formData.validPeriod}
                    onChange={(e) => updateFormData('validPeriod', e.target.value)}
                  >
                    <option value="">Select period</option>
                    <option value="1-month">1 Month</option>
                    <option value="3-months">3 Months</option>
                    <option value="6-months">6 Months</option>
                    <option value="1-year">1 Year</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                    Limit Period
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                    value={formData.limitPeriod}
                    onChange={(e) => updateFormData('limitPeriod', e.target.value)}
                  >
                    <option value="">Select period</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                    Limit Amount (€)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                    value={formData.limitAmount}
                    onChange={(e) => updateFormData('limitAmount', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                    Transaction Count Limit
                  </label>
                  <input
                    type="number"
                    placeholder="Unlimited"
                    className="w-full px-4 py-3 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                    value={formData.limitCount}
                    onChange={(e) => updateFormData('limitCount', e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                    Single Transaction Limit (€)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                    value={formData.transactionLimit}
                    onChange={(e) => updateFormData('transactionLimit', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-pliant-charcoal mb-2">Card Controls</h2>
              <p className="text-pliant-charcoal/60 mb-6">Configure spending restrictions and controls</p>
              
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-pliant-charcoal mb-4">Spending Categories</h3>
                  
                  {/* Mode Selection */}
                  <div className="mb-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="categoriesMode"
                          checked={formData.categoriesMode === 'allow'}
                          onChange={() => updateFormData('categoriesMode', 'allow')}
                          className="w-4 h-4 text-pliant-blue border-gray-300 focus:ring-pliant-blue"
                        />
                        <span className="text-sm font-medium text-pliant-charcoal">Allow only selected categories</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="categoriesMode"
                          checked={formData.categoriesMode === 'block'}
                          onChange={() => updateFormData('categoriesMode', 'block')}
                          className="w-4 h-4 text-pliant-red border-gray-300 focus:ring-pliant-red"
                        />
                        <span className="text-sm font-medium text-pliant-charcoal">Block selected categories</span>
                      </label>
                    </div>
                  </div>

                  {/* Categories List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => toggleArrayItem('categories', category)}
                          className={`w-4 h-4 border-gray-300 rounded ${
                            formData.categoriesMode === 'allow' 
                              ? 'text-pliant-blue focus:ring-pliant-blue' 
                              : 'text-pliant-red focus:ring-pliant-red'
                          }`}
                        />
                        <span className="text-sm text-pliant-charcoal">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Merchants */}
                <div>
                  <h3 className="text-lg font-semibold text-pliant-charcoal mb-4">Merchants</h3>
                  
                  {/* Mode Selection */}
                  <div className="mb-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="merchantsMode"
                          checked={formData.merchantsMode === 'allow'}
                          onChange={() => updateFormData('merchantsMode', 'allow')}
                          className="w-4 h-4 text-pliant-blue border-gray-300 focus:ring-pliant-blue"
                        />
                        <span className="text-sm font-medium text-pliant-charcoal">Allow only selected merchants</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="merchantsMode"
                          checked={formData.merchantsMode === 'block'}
                          onChange={() => updateFormData('merchantsMode', 'block')}
                          className="w-4 h-4 text-pliant-red border-gray-300 focus:ring-pliant-red"
                        />
                        <span className="text-sm font-medium text-pliant-charcoal">Block selected merchants</span>
                      </label>
                    </div>
                  </div>

                  {/* Input field to add new merchant */}
                  <div className="mb-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter merchant name..."
                        className={`flex-1 px-3 py-2 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:border-transparent text-sm ${
                          formData.merchantsMode === 'allow' 
                            ? 'focus:ring-pliant-blue' 
                            : 'focus:ring-pliant-red'
                        }`}
                        value={newMerchantInput}
                        onChange={(e) => setNewMerchantInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addMerchant(newMerchantInput)
                            setNewMerchantInput('')
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        variant={formData.merchantsMode === 'allow' ? 'primary' : 'secondary'}
                        onClick={() => {
                          addMerchant(newMerchantInput)
                          setNewMerchantInput('')
                        }}
                        disabled={!newMerchantInput.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* List of merchants */}
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formData.merchants.map((merchant) => (
                      <div key={merchant} className={`flex items-center justify-between p-2 rounded-lg border ${
                        formData.merchantsMode === 'allow' 
                          ? 'bg-pliant-blue/5 border-pliant-blue/20' 
                          : 'bg-pliant-red/5 border-pliant-red/20'
                      }`}>
                        <span className="text-sm text-pliant-charcoal">{merchant}</span>
                        <button
                          type="button"
                          onClick={() => removeMerchant(merchant)}
                          className="text-pliant-charcoal/40 hover:text-pliant-red transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {formData.merchants.length === 0 && (
                      <p className="text-sm text-pliant-charcoal/40 italic">
                        No merchants {formData.merchantsMode === 'allow' ? 'allowed' : 'blocked'} yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Time Restrictions */}
                <div>
                  <h3 className="text-lg font-semibold text-pliant-charcoal mb-4">Time Restrictions</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                        Allowed Days
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <label key={day} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.allowedDays.includes(day)}
                              onChange={() => toggleArrayItem('allowedDays', day)}
                              className="w-4 h-4 text-pliant-blue border-gray-300 rounded focus:ring-pliant-blue"
                            />
                            <span className="text-sm text-pliant-charcoal">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                          value={formData.allowedTimes.start}
                          onChange={(e) => updateFormData('allowedTimes', { ...formData.allowedTimes, start: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-pliant-charcoal mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:ring-pliant-blue focus:border-transparent"
                          value={formData.allowedTimes.end}
                          onChange={(e) => updateFormData('allowedTimes', { ...formData.allowedTimes, end: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location & ATM */}
                <div>
                  <h3 className="text-lg font-semibold text-pliant-charcoal mb-4">Location & ATM</h3>
                  <div className="space-y-4">
                                          <div>
                        {/* Mode Selection */}
                        <div className="mb-4">
                          <div className="flex space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="regionsMode"
                                checked={formData.regionsMode === 'allow'}
                                onChange={() => updateFormData('regionsMode', 'allow')}
                                className="w-4 h-4 text-pliant-blue border-gray-300 focus:ring-pliant-blue"
                              />
                              <span className="text-sm font-medium text-pliant-charcoal">Allow only selected regions</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                name="regionsMode"
                                checked={formData.regionsMode === 'block'}
                                onChange={() => updateFormData('regionsMode', 'block')}
                                className="w-4 h-4 text-pliant-red border-gray-300 focus:ring-pliant-red"
                              />
                              <span className="text-sm font-medium text-pliant-charcoal">Block selected regions</span>
                            </label>
                          </div>
                        </div>

                        {/* Input field to add new region */}
                        <div className="mb-4">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Enter region name..."
                              className={`flex-1 px-3 py-2 border border-pliant-sand/50 rounded-lg focus:ring-2 focus:border-transparent text-sm ${
                                formData.regionsMode === 'allow' 
                                  ? 'focus:ring-pliant-blue' 
                                  : 'focus:ring-pliant-red'
                              }`}
                              value={newRegionInput}
                              onChange={(e) => setNewRegionInput(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addRegion(newRegionInput)
                                  setNewRegionInput('')
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant={formData.regionsMode === 'allow' ? 'primary' : 'secondary'}
                              onClick={() => {
                                addRegion(newRegionInput)
                                setNewRegionInput('')
                              }}
                              disabled={!newRegionInput.trim()}
                            >
                              Add
                            </Button>
                          </div>
                        </div>

                        {/* List of regions */}
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {formData.regions.map((region) => (
                            <div key={region} className={`flex items-center justify-between p-2 rounded-lg border ${
                              formData.regionsMode === 'allow' 
                                ? 'bg-pliant-blue/5 border-pliant-blue/20' 
                                : 'bg-pliant-red/5 border-pliant-red/20'
                            }`}>
                              <span className="text-sm text-pliant-charcoal">{region}</span>
                              <button
                                type="button"
                                onClick={() => removeRegion(region)}
                                className="text-pliant-charcoal/40 hover:text-pliant-red transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          {formData.regions.length === 0 && (
                            <p className="text-sm text-pliant-charcoal/40 italic">
                              No regions {formData.regionsMode === 'allow' ? 'allowed' : 'blocked'} yet
                            </p>
                          )}
                        </div>
                      </div>
                    <div>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.atmWithdrawal}
                          onChange={(e) => updateFormData('atmWithdrawal', e.target.checked)}
                          className="w-4 h-4 text-pliant-blue border-gray-300 rounded focus:ring-pliant-blue"
                        />
                        <span className="text-sm font-medium text-pliant-charcoal">Allow ATM Withdrawals</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-pliant-charcoal mb-2">Customization</h2>
              <p className="text-pliant-charcoal/60 mb-6">Personalize your card with name, color and assignment</p>
              
              <div className="space-y-6">
                <Input
                  label="Card Name"
                  type="text"
                  placeholder="Enter card name..."
                  value={formData.cardName}
                  onChange={(e) => updateFormData('cardName', e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-pliant-charcoal mb-4">
                    Card Color
                  </label>
                  <div className="grid grid-cols-6 gap-4">
                    {cardColors.map((color) => (
                      <div
                        key={color.id}
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${formData.cardColor === color.id ? 'border-pliant-charcoal' : 'border-transparent hover:border-gray-300'}`}
                        onClick={() => updateFormData('cardColor', color.id)}
                      >
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: color.color }}
                        ></div>
                        <p className="text-xs text-center text-pliant-charcoal font-medium">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Select
                    label="Team"
                    value={formData.team}
                    onChange={(e) => updateFormData('team', e.target.value)}
                  >
                    <option value="">Select team</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="operations">Operations</option>
                    <option value="finance">Finance</option>
                  </Select>

                  <Select
                    label="Project"
                    value={formData.project}
                    onChange={(e) => updateFormData('project', e.target.value)}
                  >
                    <option value="">Select project</option>
                    <option value="product-development">Product Development</option>
                    <option value="marketing-campaign">Marketing Campaign</option>
                    <option value="office-expansion">Office Expansion</option>
                    <option value="conference-travel">Conference Travel</option>
                    <option value="general">General</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-pliant-charcoal mb-2">Summary</h2>
              <p className="text-pliant-charcoal/60 mb-6">Review your card configuration before creating</p>
              
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-pliant-charcoal mb-4">Card Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-pliant-charcoal/60">Assignee:</span>
                      <span className="ml-2 font-medium">{formData.assignee || 'Not specified'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Card Type:</span>
                      <span className="ml-2 font-medium">{cardTypes.find(t => t.id === formData.cardType)?.name || 'Not selected'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Card Name:</span>
                      <span className="ml-2 font-medium">{formData.cardName || 'Unnamed Card'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Color:</span>
                      <span className="ml-2 font-medium">{cardColors.find(c => c.id === formData.cardColor)?.name}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-pliant-charcoal mb-4">Limits & Validity</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-pliant-charcoal/60">Valid Period:</span>
                      <span className="ml-2 font-medium">{formData.validPeriod || 'Not set'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Limit Amount:</span>
                      <span className="ml-2 font-medium">{formData.limitAmount ? `€${formData.limitAmount}` : 'Unlimited'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Limit Period:</span>
                      <span className="ml-2 font-medium">{formData.limitPeriod || 'Not set'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Transaction Limit:</span>
                      <span className="ml-2 font-medium">{formData.transactionLimit ? `€${formData.transactionLimit}` : 'Unlimited'}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-pliant-charcoal mb-4">Controls & Restrictions</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-pliant-charcoal/60">Categories:</span>
                      <span className="ml-2 font-medium">
                        {formData.categories.length > 0 
                          ? `${formData.categoriesMode === 'allow' ? 'Allow only' : 'Block'}: ${formData.categories.join(', ')}`
                          : 'All categories allowed'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Merchants:</span>
                      <span className="ml-2 font-medium">
                        {formData.merchants.length > 0 
                          ? `${formData.merchantsMode === 'allow' ? 'Allow only' : 'Block'}: ${formData.merchants.join(', ')}`
                          : 'All merchants allowed'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Regions:</span>
                      <span className="ml-2 font-medium">
                        {formData.regions.length > 0 
                          ? `${formData.regionsMode === 'allow' ? 'Allow only' : 'Block'}: ${formData.regions.join(', ')}`
                          : 'All regions allowed'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">ATM Withdrawals:</span>
                      <span className="ml-2 font-medium">{formData.atmWithdrawal ? 'Allowed' : 'Blocked'}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-pliant-charcoal mb-4">Assignment</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-pliant-charcoal/60">Team:</span>
                      <span className="ml-2 font-medium">{formData.team || 'Not assigned'}</span>
                    </div>
                    <div>
                      <span className="text-pliant-charcoal/60">Project:</span>
                      <span className="ml-2 font-medium">{formData.project || 'Not assigned'}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Sidebar with Stepper */}
      <div className="w-80 bg-pliant-charcoal text-white p-8 flex flex-col">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-xl font-bold">Create New Card</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1">
          <div className="relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              const isUpcoming = currentStep < step.id

              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start space-x-4 mb-8">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all relative z-10 ${
                      isCompleted ? 'bg-green-500' : 
                      isCurrent ? 'bg-pliant-blue' : 
                      'bg-white/20'
                    }`}>
                      {isCompleted ? (
                        <Check size={16} weight="bold" />
                      ) : (
                        <Icon size={16} weight={isCurrent ? 'bold' : 'regular'} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${isCurrent ? 'text-white' : isCompleted ? 'text-green-400' : 'text-white/60'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${isCurrent ? 'text-white/80' : 'text-white/50'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  

                </div>
              )
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>Progress</span>
            <span>{currentStep}/5</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-pliant-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-12">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>

            <div className="flex items-center space-x-3">
              {currentStep < 5 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    // Handle card creation
                    console.log('Creating card with data:', formData)
                    onClose()
                  }}
                  className="flex items-center space-x-2"
                >
                  <span>Create Card</span>
                  <Check size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCreationFlow 