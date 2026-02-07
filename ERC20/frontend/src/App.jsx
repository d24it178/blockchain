import { Toaster } from 'react-hot-toast'
import { Web3Provider } from './context/Web3Context'
import WalletPanel from './components/WalletPanel'
import TokenDashboard from './components/TokenDashboard'
import TokenActions from './components/TokenActions'
import ActivitySection from './components/ActivitySection'
import Footer from './components/Footer'
import { useWeb3 } from './context/Web3Context'
import { TOKEN_METADATA } from './config/constants'

function AppContent() {
  const { isConnected } = useWeb3()

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
          {TOKEN_METADATA.name} Token
        </h1>
        <p className="text-gray-400 text-lg">
          ERC-20 Token Management DApp
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Panel */}
          <div className="lg:col-span-1">
            <WalletPanel />
          </div>

          {/* Token Info */}
          <div className="lg:col-span-2 space-y-6">
            {isConnected ? (
              <>
                <TokenDashboard />
                <TokenActions />
              </>
            ) : (
              <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-500/30 text-center">
                <p className="text-gray-300 mb-2">Connect your wallet to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Section */}
        {isConnected && (
          <div className="mt-8">
            <ActivitySection />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  )
}
