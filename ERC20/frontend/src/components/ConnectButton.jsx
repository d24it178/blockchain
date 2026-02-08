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
      className="glass rounded-2xl p-8 text-center space-y-6 border border-indigo-500/30 shadow-2xl shadow-indigo-500/20"
    >
      <div className="space-y-2">
        <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          {TOKEN_METADATA.name}
        </div>
        <p className="text-sm text-slate-300 font-semibold">{TOKEN_METADATA.symbol} • Decentralized Platform</p>
      </div>

      <div className="relative h-32 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-full blur-2xl"
        />
        <Wallet className="w-16 h-16 text-emerald-400 relative z-10" />
      </div>

      <p className="text-slate-300 text-sm max-w-xs mx-auto font-light">
        Securely connect your MetaMask wallet to manage tokens, execute transfers, and control approvals.
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

      <p className="text-xs text-slate-400 font-light">
        Ensure MetaMask is installed and active on a compatible blockchain network.
      </p>
    </motion.div>
  )
}
