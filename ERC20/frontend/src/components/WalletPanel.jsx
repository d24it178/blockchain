import { motion } from 'framer-motion'
import { useWeb3 } from '../context/Web3Context'
import { formatAddress, getChainName, getChainColor } from '../utils/helpers'
import { useCopyToClipboard } from '../hooks/useUtility'
import { Copy, LogOut, AlertCircle } from 'lucide-react'
import ConnectButton from './ConnectButton'

export default function WalletPanel() {
  const { account, isConnected, chainId, disconnectWallet, error } = useWeb3()
  const { copy } = useCopyToClipboard()

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  }

  if (!isConnected) {
    return <ConnectButton />
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass rounded-2xl p-6 space-y-4 border border-indigo-500/30 shadow-xl shadow-indigo-500/10"
    >
      {/* Network Status */}
      <motion.div
        custom={0}
        variants={itemVariants}
        className={`bg-gradient-to-r ${getChainColor(chainId)} rounded-lg p-3 flex items-center gap-3`}
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <div className="text-sm font-medium">{getChainName(chainId)}</div>
        <div className="flex-1" />
        <div className="text-xs opacity-80">Network</div>
      </motion.div>

      {/* Wallet Address */}
      <motion.div
        custom={1}
        variants={itemVariants}
        className="glass-lg rounded-xl p-4 space-y-2 border border-slate-700/30"
      >
        <div className="text-xs uppercase tracking-widest opacity-70 font-black text-emerald-300">
          Wallet Account
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="font-mono text-sm md:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 truncate">
            {formatAddress(account, 6)}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => copy(account)}
            className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
          >
            <Copy size={16} className="text-emerald-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        custom={2}
        variants={itemVariants}
        className="grid grid-cols-2 gap-3"
      >
        <div className="glass-lg rounded-lg p-3 text-center border border-slate-700/30 shadow-sm">
          <div className="text-xs opacity-70 mb-1 font-bold text-emerald-300">Status</div>
          <div className="text-emerald-400 font-bold text-sm">Active</div>
        </div>
        <div className="glass-lg rounded-lg p-3 text-center border border-slate-700/30 shadow-sm">
          <div className="text-xs opacity-70 mb-1 font-bold text-indigo-300">Network</div>
          <div className="text-indigo-400 font-bold text-sm">{chainId}</div>
        </div>
      </motion.div>

      {/* Disconnect Button */}
      <motion.button
        custom={3}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={disconnectWallet}
        className="w-full btn btn-secondary py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-red-900/40 to-orange-900/40 hover:from-red-900/60 hover:to-orange-900/60 border border-red-500/30"
      >
        <LogOut size={16} />
        Disconnect
      </motion.button>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-500/10 border border-orange-500/40 rounded-lg p-3 flex gap-2 text-sm text-orange-300 shadow-lg shadow-orange-500/10"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  )
}
