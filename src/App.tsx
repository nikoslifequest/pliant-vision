import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Cards from './components/Cards'
import Transactions from './components/Transactions'
import Login from './components/Login'

type CurrentPage = 'dashboard' | 'cards' | 'transactions'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleNavigation = (page: CurrentPage) => {
    setCurrentPage(page)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'cards':
        return <Cards />
      case 'transactions':
        return <Transactions />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  )
}

export default App
