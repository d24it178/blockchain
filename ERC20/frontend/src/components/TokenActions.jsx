import { motion } from 'framer-motion'
import { useState } from 'react'
import { useWeb3 } from '../context/Web3Context'
import { useTokenContract } from '../hooks/useToken'
import { isValidAddress } from '../utils/helpers'
import { TOKEN_CONTRACT_ADDRESS, TOKEN_METADATA } from '../config/constants'
import { Send, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TokenActions() {
  const { account, isConnected } = useWeb3()
  const { getContract } = useTokenContract()

  // Check if contract is configured
  const isContractConfigured = TOKEN_CONTRACT_ADDRESS && TOKEN_CONTRACT_ADDRESS !== '0x'

  if (!isContractConfigured) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5"
      >
        <div className="flex items-center gap-3 text-yellow-300">
          <AlertCircle size={20} />
          <span>Token contract address not configured. Deploy the contract first.</span>
        </div>
      </motion.div>
    )
  }

  const [activeTab, setActiveTab] = useState('transfer')
  const [transfer, setTransfer] = useState({ to: '', amount: '' })
  const [approve, setApprove] = useState({ spender: '', amount: '' })
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'transfer', label: 'Transfer' },
    { id: 'approve', label: 'Approve' },
  ]

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
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const handleTransfer = async () => {
    if (!isConnected) {
      toast.error('Please connect wallet first')
      return
    }

    if (!isValidAddress(transfer.to)) {
      toast.error('Invalid recipient address')
      return
    }

    if (!transfer.amount || parseFloat(transfer.amount) <= 0) {
      toast.error('Enter valid amount')
      return
    }

    try {
      setLoading(true)
      console.log('Starting transfer...')
      console.log('Recipient:', transfer.to)
      console.log('Amount input:', transfer.amount)
      
      const contract = await getContract(true)
      console.log('Contract instance created')
      
      // Convert amount to Wei with proper precision handling
      const amountStr = transfer.amount.trim()
      const amount = parseFloat(amountStr)
      
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid amount')
      }
      
      // Better precision: use string manipulation instead of floating point math
      let amountWei
      if (amountStr.includes('.')) {
        const [whole, decimals] = amountStr.split('.')
        const paddedDecimals = decimals.padEnd(18, '0').slice(0, 18)
        amountWei = (whole || '0') + paddedDecimals
      } else {
        amountWei = amountStr + '000000000000000000'
      }
      
      console.log('Amount string:', amountStr)
      console.log('Amount in Wei (string):', amountWei)
      
      // Validate it's a valid number
      const weiValue = BigInt(amountWei)
      console.log('Amount in Wei (BigInt):', weiValue.toString())

      console.log('Calling transfer function...')
      const tx = await contract.transfer(transfer.to, weiValue)
      console.log('Transaction hash:', tx.hash)
      
      toast.loading('Transaction pending...')
      const receipt = await tx.wait()
      console.log('Transaction confirmed:', receipt?.blockNumber)
      console.log('Gas used:', receipt?.gasUsed?.toString())

      toast.success('Tokens transferred successfully!')
      setTransfer({ to: '', amount: '' })
    } catch (error) {
      console.error('Full error object:', error)
      console.error('Error message:', error.message)
      console.error('Error code:', error.code)
      toast.error(`Transfer failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!isConnected) {
      toast.error('Please connect wallet first')
      return
    }

    if (!isValidAddress(approve.spender)) {
      toast.error('Invalid spender address')
      return
    }

    if (!approve.amount || parseFloat(approve.amount) <= 0) {
      toast.error('Enter valid amount')
      return
    }

    try {
      setLoading(true)
      console.log('Starting approval...')
      console.log('Spender:', approve.spender)
      console.log('Amount input:', approve.amount)
      
      const contract = await getContract(true)
      console.log('Contract instance created')
      
      // Convert amount to Wei with proper precision handling
      const amountStr = approve.amount.trim()
      const amount = parseFloat(amountStr)
      
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid amount')
      }
      
      // Better precision: use string manipulation instead of floating point math
      let amountWei
      if (amountStr.includes('.')) {
        const [whole, decimals] = amountStr.split('.')
        const paddedDecimals = decimals.padEnd(18, '0').slice(0, 18)
        amountWei = (whole || '0') + paddedDecimals
      } else {
        amountWei = amountStr + '000000000000000000'
      }
      
      console.log('Amount string:', amountStr)
      console.log('Amount in Wei (string):', amountWei)
      
      // Validate it's a valid number
      const weiValue = BigInt(amountWei)
      console.log('Amount in Wei (BigInt):', weiValue.toString())

      console.log('Calling approve function...')
      const tx = await contract.approve(approve.spender, weiValue)
      console.log('Transaction hash:', tx.hash)
      
      toast.loading('Transaction pending...')
      const receipt = await tx.wait()
      console.log('Transaction confirmed:', receipt?.blockNumber)
      console.log('Gas used:', receipt?.gasUsed?.toString())

      toast.success('Approval successful!')
      setApprove({ spender: '', amount: '' })
    } catch (error) {
      console.error('Full error object:', error)
      console.error('Error message:', error.message)
      console.error('Error code:', error.code)
      toast.error(`Approval failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-lg rounded-2xl border border-cyan-500/20 overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-cyan-500/20">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-4 font-semibold text-sm transition-colors relative ${
              activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {activeTab === 'transfer' && (
          <motion.div
            key="transfer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Recipient Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={transfer.to}
                onChange={(e) => setTransfer({ ...transfer, to: e.target.value })}
                className="w-full glass rounded-lg px-4 py-3 border border-cyan-500/20 focus:border-cyan-500/60 focus:outline-none transition-colors text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                {transfer.to && !isValidAddress(transfer.to) && 'Invalid address format'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Amount ({TOKEN_METADATA.symbol})
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={transfer.amount}
                onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
                className="w-full glass rounded-lg px-4 py-3 border border-cyan-500/20 focus:border-cyan-500/60 focus:outline-none transition-colors text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTransfer}
              disabled={loading || !isConnected}
              className="w-full btn btn-primary py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={16} />
              {loading ? 'Transferring...' : 'Transfer Tokens'}
            </motion.button>
          </motion.div>
        )}

        {activeTab === 'approve' && (
          <motion.div
            key="approve"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Spender Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={approve.spender}
                onChange={(e) => setApprove({ ...approve, spender: e.target.value })}
                className="w-full glass rounded-lg px-4 py-3 border border-cyan-500/20 focus:border-cyan-500/60 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Amount ({TOKEN_METADATA.symbol})
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={approve.amount}
                onChange={(e) => setApprove({ ...approve, amount: e.target.value })}
                className="w-full glass rounded-lg px-4 py-3 border border-cyan-500/20 focus:border-cyan-500/60 focus:outline-none transition-colors text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Set an allowance for the spender to transfer tokens on your behalf
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApprove}
              disabled={loading || !isConnected}
              className="w-full btn btn-primary py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <plus size={16} />
              {loading ? 'Approving...' : 'Approve Allowance'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
