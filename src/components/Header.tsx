const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gradient">PliantCard</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-primary-600 bg-primary-50">
                Dashboard
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Cards
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Transactions
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Settings
              </button>
            </div>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105">
              👤 Alex M.
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 