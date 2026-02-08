import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useTokenContract } from '../hooks/useToken'
import { formatNumber } from '../utils/helpers'
import { TOKEN_CONTRACT_ADDRESS, TOKEN_METADATA } from '../config/constants'
import AnimatedNumber from './AnimatedNumber'
import { TrendingUp, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TokenDashboard() {
  const { account, provider, isConnected } = useWeb3()
  const { getContract } = useTokenContract()
  const [tokenInfo, setTokenInfo] = useState({
    balance: '0',
    totalSupply: '0',
    symbol: TOKEN_METADATA.symbol,
    name: TOKEN_METADATA.name,
  })
  const [loading, setLoading] = useState(false)

  // Check if contract is configured
  const isContractConfigured = TOKEN_CONTRACT_ADDRESS && TOKEN_CONTRACT_ADDRESS !== '0x'

  useEffect(() => {
    if (isConnected && account && provider && isContractConfigured) {
      fetchTokenData()
    }
  }, [isConnected, account, provider, isContractConfigured])

  const fetchTokenData = async () => {
    try {
      setLoading(true)
      const contract = await getContract(false)
      const [balance, totalSupply, symbol, name] = await Promise.all([
        contract.balanceOf(account),
        contract.totalSupply(),
        contract.symbol(),
        contract.name(),
      ])

      setTokenInfo({
        balance: (BigInt(balance) / BigInt(10 ** 18)).toString(),
        totalSupply: (BigInt(totalSupply) / BigInt(10 ** 18)).toString(),
        symbol: symbol || TOKEN_METADATA.symbol,
        name: name || TOKEN_METADATA.name,
      })
    } catch (error) {
      console.error('Error fetching token data:', error)
      console.error('Contract address:', TOKEN_CONTRACT_ADDRESS)
      console.error('Account:', account)
      console.error('Full error:', error.message)
      if (error.message.includes('Contract address not configured')) {
        toast.error('Token contract not deployed yet')
      } else {
        toast.error('Failed to fetch token data: ' + (error.message || error))
      }
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{TOKEN_METADATA.logo}</div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              {tokenInfo.name} Assets
            </h2>
            <p className="text-sm text-slate-400 font-semibold">{tokenInfo.symbol} • Digital Token</p>
          </div>
        </div>
      </motion.div>

      {/* Main Balance Card */}
      <motion.div
        variants={itemVariants}
        className="glass-lg rounded-3xl p-8 border border-emerald-500/40 overflow-hidden relative shadow-2xl shadow-emerald-500/20"
      >
        {/* Animated background */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5 opacity-50"
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-black uppercase tracking-widest opacity-70 text-emerald-300">
              Portfolio Balance
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchTokenData}
              disabled={loading}
              className="p-2 hover:bg-emerald-500/20 rounded-lg transition-all disabled:opacity-50"
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
              >
                <TrendingUp size={18} className="text-emerald-400" />
              </motion.div>
            </motion.button>
          </div>

          <div className="space-y-2">
            <motion.div
              key={tokenInfo.balance}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300"
            >
              {loading ? (
                <div className="skeleton w-full h-12 rounded" />
              ) : (
                <AnimatedNumber value={tokenInfo.balance} suffix={` ${tokenInfo.symbol}`} />
              )}
            </motion.div>

            <div className="text-sm text-slate-400 font-medium">
              {loading ? (
                <div className="skeleton w-32 h-4 rounded" />
              ) : (
                `≈ $${formatNumber(parseFloat(tokenInfo.balance) * 0.5, 2)}`
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        {/* Total Supply Card */}
        <motion.div
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.1)' }}
          className="glass rounded-2xl p-6 border border-emerald-500/30 space-y-3 shadow-lg shadow-emerald-500/5 transition-all"
        >
          <div className="text-xs uppercase tracking-widest opacity-70 font-black text-emerald-300">
            Total Circulation
          </div>
          {loading ? (
            <div className="skeleton w-full h-8 rounded" />
          ) : (
            <div className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
              <AnimatedNumber value={tokenInfo.totalSupply} suffix={` ${tokenInfo.symbol}`} format="short" />
            </div>
          )}
        </motion.div>

        {/* Holdings Percentage */}
        <motion.div
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)' }}
          className="glass rounded-2xl p-6 border border-indigo-500/30 space-y-3 shadow-lg shadow-indigo-500/5 transition-all"
        >
          <div className="text-xs uppercase tracking-widest opacity-70 font-black text-indigo-300">
            Your Share
          </div>
          {loading ? (
            <div className="skeleton w-full h-8 rounded" />
          ) : (
            <div className="text-xl md:text-2xl font-black text-indigo-300">
              {tokenInfo.totalSupply > 0
                ? ((parseFloat(tokenInfo.balance) / parseFloat(tokenInfo.totalSupply)) * 100).toFixed(4)
                : '0'}
              %
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Info Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 text-xs">
        <div className="glass-lg rounded-lg p-4 border border-slate-700/30 shadow-lg shadow-slate-900/20">
          <div className="opacity-70 mb-2 font-bold text-slate-300">Decimals</div>
          <div className="font-bold text-emerald-400">18</div>
        </div>
        <div className="glass-lg rounded-lg p-4 border border-slate-700/30 shadow-lg shadow-slate-900/20">
          <div className="opacity-70 mb-2 font-bold text-slate-300">Standard</div>
          <div className="font-bold text-cyan-400">ERC-20</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
