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
          <div className="text-3xl">{TOKEN_METADATA.logo}</div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              {tokenInfo.name}
            </h2>
            <p className="text-sm text-gray-400">{tokenInfo.symbol}</p>
          </div>
        </div>
      </motion.div>

      {/* Main Balance Card */}
      <motion.div
        variants={itemVariants}
        className="glass-lg rounded-2xl p-8 border border-cyan-500/30 overflow-hidden relative"
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
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50"
          style={{ backgroundSize: '200% 200%' }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold uppercase tracking-wider opacity-60">
              Your Balance
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchTokenData}
              disabled={loading}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
            >
              <motion.div
                animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
              >
                <TrendingUp size={18} className="text-cyan-400" />
              </motion.div>
            </motion.button>
          </div>

          <div className="space-y-2">
            <motion.div
              key={tokenInfo.balance}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold neon-text"
            >
              {loading ? (
                <div className="skeleton w-full h-12 rounded" />
              ) : (
                <AnimatedNumber value={tokenInfo.balance} suffix={` ${tokenInfo.symbol}`} />
              )}
            </motion.div>

            <div className="text-sm text-gray-400">
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
          whileHover={{ y: -5 }}
          className="glass rounded-xl p-5 border border-purple-500/20 space-y-3"
        >
          <div className="text-xs uppercase tracking-wider opacity-60 font-semibold">
            Total Supply
          </div>
          {loading ? (
            <div className="skeleton w-full h-8 rounded" />
          ) : (
            <div className="text-xl md:text-2xl font-bold gradient-text">
              <AnimatedNumber value={tokenInfo.totalSupply} suffix={` ${tokenInfo.symbol}`} format="short" />
            </div>
          )}
        </motion.div>

        {/* Holdings Percentage */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass rounded-xl p-5 border border-pink-500/20 space-y-3"
        >
          <div className="text-xs uppercase tracking-wider opacity-60 font-semibold">
            Your Holdings
          </div>
          {loading ? (
            <div className="skeleton w-full h-8 rounded" />
          ) : (
            <div className="text-xl md:text-2xl font-bold text-pink-400">
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
        <div className="glass-lg rounded-lg p-3">
          <div className="opacity-60 mb-1">Decimals</div>
          <div className="font-semibold">18</div>
        </div>
        <div className="glass-lg rounded-lg p-3">
          <div className="opacity-60 mb-1">Standard</div>
          <div className="font-semibold">ERC-20</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
