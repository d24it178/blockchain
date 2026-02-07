import { motion } from 'framer-motion'
import { Copy, ExternalLink, Github, Twitter, Globe } from 'lucide-react'
import { useCopyToClipboard } from '../hooks/useUtility'
import { TOKEN_CONTRACT_ADDRESS, TOKEN_METADATA } from '../config/constants'
import toast from 'react-hot-toast'

export default function Footer() {
  const { copy } = useCopyToClipboard()
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-cyan-400' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-purple-400' },
    { icon: Globe, href: '#', label: 'Website', color: 'hover:text-pink-400' },
  ]

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-lg rounded-2xl border border-cyan-500/20 p-6 mt-8"
    >
      <div className="space-y-6">
        {/* Contract Address */}
        <motion.div
          custom={0}
          variants={itemVariants}
          className="space-y-3"
        >
          <div className="text-xs uppercase tracking-wider opacity-60 font-semibold">
            Smart Contract
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 glass rounded-lg px-3 py-2 font-mono text-xs truncate border border-cyan-500/20">
              {TOKEN_CONTRACT_ADDRESS === '0x'
                ? 'Contract address not configured'
                : TOKEN_CONTRACT_ADDRESS}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (TOKEN_CONTRACT_ADDRESS !== '0x') {
                  copy(TOKEN_CONTRACT_ADDRESS)
                } else {
                  toast.error('Contract address not configured')
                }
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Copy size={16} className="text-cyan-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ExternalLink size={16} className="text-cyan-400" />
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0" />

        {/* Social Links & Info */}
        <motion.div
          custom={1}
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg hover:bg-white/5 transition-all ${link.color}`}
                  title={link.label}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-right">
            <div>© {currentYear} {TOKEN_METADATA.symbol} Token</div>
            <div>Built with React + Web3</div>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          custom={2}
          variants={itemVariants}
          className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 space-y-2"
        >
          <div className="text-xs font-semibold text-cyan-300 flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            Security Notice
          </div>
          <p className="text-xs text-gray-300">
            Always verify contract addresses and be cautious with permissions. This DApp interacts directly with blockchain contracts.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
