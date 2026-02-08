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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-8 px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          {TOKEN_METADATA.name} Hub
        </h1>
        <p className="text-slate-300 text-lg font-light tracking-wide">
          Decentralized Token Management Platform
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Wallet Panel */}
          <div className="lg:col-span-1">
            <WalletPanel />
          </div>

          {/* Token Info */}
          <div className="lg:col-span-3 space-y-6">
            {isConnected ? (
              <>
                <TokenDashboard />
                <TokenActions />
              </>
            ) : (
              <div className="bg-gradient-to-r from-indigo-900/30 to-emerald-900/30 rounded-2xl p-8 border border-indigo-500/40 text-center shadow-lg shadow-indigo-500/10">
                <p className="text-slate-300 mb-2 font-medium">Connect your MetaMask wallet to unlock features</p>
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
