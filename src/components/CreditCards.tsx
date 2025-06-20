const CreditCards = () => {
  const cards = [
    {
      name: "PliantCard Elite",
      type: "Premium",
      gradient: "from-gray-900 via-gray-800 to-black",
      textColor: "text-white",
      features: ["5% cashback", "Travel insurance", "Concierge service"],
      chipColor: "bg-gradient-to-br from-yellow-400 to-yellow-600"
    },
    {
      name: "PliantCard Pro",
      type: "Business",
      gradient: "from-blue-600 via-blue-700 to-blue-900",
      textColor: "text-white",
      features: ["3% on business", "Expense tracking", "Team cards"],
      chipColor: "bg-gradient-to-br from-silver-400 to-gray-600"
    },
    {
      name: "PliantCard Start",
      type: "Student",
      gradient: "from-purple-500 via-purple-600 to-purple-800",
      textColor: "text-white",
      features: ["No annual fee", "Credit building", "Student rewards"],
      chipColor: "bg-gradient-to-br from-cyan-400 to-blue-500"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Card
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each card is designed with cutting-edge technology and tailored for your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div key={index} className="group perspective-1000">
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-rotate-y-12">
                {/* Card */}
                <div className={`relative w-full h-56 rounded-2xl bg-gradient-to-br ${card.gradient} p-6 shadow-2xl overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  {/* Card content */}
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-lg font-bold ${card.textColor}`}>{card.name}</h3>
                        <p className={`text-sm ${card.textColor} opacity-80`}>{card.type}</p>
                      </div>
                      <div className={`w-8 h-6 ${card.chipColor} rounded-sm`}></div>
                    </div>

                    <div className="space-y-2">
                      <div className={`text-lg font-mono ${card.textColor} tracking-wider`}>
                        **** **** **** 1234
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className={`text-xs ${card.textColor} opacity-60`}>VALID THRU</p>
                          <p className={`text-sm ${card.textColor} font-semibold`}>12/28</p>
                        </div>
                        <div className={`text-xl font-bold ${card.textColor}`}>
                          VISA
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card features */}
                <div className="mt-6 space-y-3">
                  {card.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CreditCards 