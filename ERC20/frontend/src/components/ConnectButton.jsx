import { motion } from 'framer-motion'
import { useWeb3 } from '../context/Web3Context'
import { TOKEN_METADATA } from '../config/constants'
import { Wallet } from 'lucide-react'

export default function ConnectButton() {
  const { connectWallet, isConnecting, error } = useWeb3()

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass rounded-2xl p-8 text-center space-y-6 border border-cyan-500/20"
    >
      <div className="space-y-2">
        <div className="text-3xl md:text-4xl font-bold gradient-text">
          {TOKEN_METADATA.name}
        </div>
        <p className="text-sm text-gray-300">{TOKEN_METADATA.symbol} | ERC-20 DApp</p>
      </div>

      <div className="relative h-32 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl"
        />
        <Wallet className="w-16 h-16 text-cyan-400 relative z-10" />
      </div>

      <p className="text-gray-300 text-sm max-w-xs mx-auto">
        Connect your MetaMask wallet to get started with token transfers, approvals, and more.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full btn btn-primary py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet size={20} />
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-300"
        >
          {error}
        </motion.div>
      )}

      <p className="text-xs text-gray-400">
        Make sure MetaMask is installed and you're on a supported network.
      </p>
    </motion.div>
  )
}
