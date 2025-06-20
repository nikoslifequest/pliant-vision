const Features = () => {
  const features = [
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description: "Advanced encryption and biometric authentication keep your transactions secure",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "⚡",
      title: "Instant Transfers",
      description: "Send and receive money instantly with our real-time payment processing",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description: "Manage your cards seamlessly across all devices with our intuitive app",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: "💰",
      title: "Smart Rewards",
      description: "Earn cashback and rewards automatically on every purchase you make",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: "🌍",
      title: "Global Acceptance",
      description: "Use your card anywhere in the world with zero foreign transaction fees",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: "📊",
      title: "Spending Analytics",
      description: "Get detailed insights into your spending patterns with smart categorization",
      color: "from-indigo-500 to-blue-600"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PliantCard?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of financial technology with features designed for the modern world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect arrow */}
                <div className="mt-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">Learn more →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already made the switch to the future of payments.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105">
              Apply for Your Card Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 