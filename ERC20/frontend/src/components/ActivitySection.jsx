import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useTokenContract } from '../hooks/useToken'
import { formatAddress, formatNumber } from '../utils/helpers'
import { TOKEN_CONTRACT_ADDRESS } from '../config/constants'
import { ArrowUpRight, ArrowDownLeft, Clock, Loader } from 'lucide-react'

export default function ActivitySection() {
  const { account, provider } = useWeb3()
  const { getContract } = useTokenContract()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (account && provider && TOKEN_CONTRACT_ADDRESS) {
      fetchTransactionHistory()
      // Set up listener for Transfer events
      setupEventListener()
    }
  }, [account, provider])

  const setupEventListener = async () => {
    try {
      if (!provider || !TOKEN_CONTRACT_ADDRESS) return
      
      const contract = await getContract(false)
      
      // Listen for Transfer events
      contract.on('Transfer', (from, to, value, event) => {
        console.log('Transfer event received:', { from, to, value: value.toString() })
        fetchTransactionHistory() // Refresh transactions when event occurs
      })
      
      return () => {
        // Cleanup listener
        contract.removeAllListeners('Transfer')
      }
    } catch (error) {
      console.error('Error setting up event listener:', error)
    }
  }

  const fetchTransactionHistory = async () => {
    try {
      setLoading(true)
      if (!provider || !account || !TOKEN_CONTRACT_ADDRESS) {
        setTransactions([])
        return
      }

      const contract = await getContract(false)
      
      // Get past 50 blocks for Transfer events
      const currentBlock = await provider.getBlockNumber()
      const fromBlock = Math.max(0, currentBlock - 5000)
      
      // Query Transfer events where this account is sender or receiver
      const sentFilter = contract.filters.Transfer(account)
      const receivedFilter = contract.filters.Transfer(null, account)
      
      const [sentEvents, receivedEvents] = await Promise.all([
        contract.queryFilter(sentFilter, fromBlock),
        contract.queryFilter(receivedFilter, fromBlock),
      ])

      // Process and format events
      const txs = []
      
      // Add sent transactions
      sentEvents.forEach(event => {
        const args = event.args
        txs.push({
          id: `sent-${event.transactionHash}-${event.logIndex}`,
          type: 'send',
          txHash: event.transactionHash,
          from: args[0],
          to: args[1],
          address: args[1],
          amount: (BigInt(args[2]) / BigInt(10 ** 18)).toString(),
          status: 'completed',
          blockNumber: event.blockNumber,
          timestamp: null, // Will get block timestamp below
        })
      })
      
      // Add received transactions
      receivedEvents.forEach(event => {
        const args = event.args
        // Skip if it's already in sent (self-transfer)
        if (args[0].toLowerCase() !== account.toLowerCase()) {
          txs.push({
            id: `received-${event.transactionHash}-${event.logIndex}`,
            type: 'receive',
            txHash: event.transactionHash,
            from: args[0],
            to: args[1],
            address: args[0],
            amount: (BigInt(args[2]) / BigInt(10 ** 18)).toString(),
            status: 'completed',
            blockNumber: event.blockNumber,
            timestamp: null,
          })
        }
      })
      
      // Get timestamps for blocks
      for (const tx of txs) {
        try {
          const block = await provider.getBlock(tx.blockNumber)
          if (block) {
            tx.timestamp = new Date(block.timestamp * 1000)
          }
        } catch (err) {
          console.error('Error getting block timestamp:', err)
        }
      }
      
      // Sort by block number descending (newest first)
      txs.sort((a, b) => b.blockNumber - a.blockNumber)
      
      console.log('Fetched transactions:', txs)
      setTransactions(txs)
    } catch (error) {
      console.error('Error fetching transaction history:', error)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'just now'
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'send':
        return 'text-pink-400'
      case 'receive':
        return 'text-green-400'
      case 'approve':
        return 'text-cyan-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-500/20' : 'bg-yellow-500/20'
  }

  const getStatusText = (status) => {
    return status === 'completed' ? 'Completed' : 'Pending'
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-lg rounded-2xl overflow-hidden border border-cyan-500/20"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-cyan-500/20 flex items-center gap-2">
        <Clock size={18} className="text-cyan-400" />
        <h3 className="font-bold text-lg">Recent Activity</h3>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-cyan-500/10">
        {loading ? (
          <div className="px-6 py-8 flex items-center justify-center gap-2 text-gray-400">
            <Loader size={18} className="animate-spin" />
            Loading transactions...
          </div>
        ) : transactions.length > 0 ? (
          transactions.slice(0, 10).map((tx, idx) => (
            <motion.div
              key={tx.id}
              custom={idx}
              variants={itemVariants}
              whileHover={{ backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
              className="px-6 py-4 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left Side - Icon & Details */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-lg ${getStatusColor(
                      tx.status
                    )} flex-shrink-0`}
                  >
                    {tx.type === 'send' ? (
                      <ArrowUpRight size={18} className="text-pink-400" />
                    ) : tx.type === 'receive' ? (
                      <ArrowDownLeft size={18} className="text-green-400" />
                    ) : (
                      <div className="w-4 h-4 rounded bg-cyan-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm capitalize">
                      {tx.type === 'approve'
                        ? 'Approval'
                        : `${tx.type === 'send' ? 'Sent' : 'Received'} Tokens`}
                    </div>
                    <div className="text-xs text-gray-400 truncate" title={tx.address}>
                      {formatAddress(tx.address)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {tx.timestamp ? getTimeAgo(tx.timestamp) : 'pending'}
                    </div>
                  </div>
                </div>

                {/* Right Side - Amount & Status */}
                <div className="flex flex-col items-end gap-1">
                  <div className={`font-semibold text-sm ${getTypeColor(tx.type)}`}>
                    {tx.type === 'receive' ? '+' : '-'}
                    {formatNumber(parseFloat(tx.amount), 2)} ABT
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-xs px-2 py-1 rounded-full ${
                      tx.status === 'completed'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300 animate-pulse'
                    }`}
                  >
                    {getStatusText(tx.status)}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="px-6 py-12 text-center text-gray-400"
          >
            <div className="space-y-2">
              <Clock size={32} className="mx-auto opacity-40" />
              <p>No transactions yet</p>
              <p className="text-xs opacity-60">
                Your transaction history will appear here
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* View More Button */}
      {transactions.length > 0 && (
        <motion.button
          whileHover={{ backgroundColor: 'rgba(0, 240, 255, 0.1)' }}
          className="w-full px-6 py-3 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors border-t border-cyan-500/20"
        >
          View All Transactions
        </motion.button>
      )}
    </motion.div>
  )
}
