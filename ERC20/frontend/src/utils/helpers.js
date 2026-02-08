export function formatAddress(address, chars = 4) {
  if (!address) return ''
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export function formatNumber(num, decimals = 2) {
  if (!num) return '0'
  
  if (typeof num === 'string') {
    // Handle large numbers from BigInt
    if (num.length > 18) {
      const wholePart = num.slice(0, -18)
      const decimalPart = num.slice(-18)
      return (wholePart + '.' + decimalPart.substring(0, decimals)).replace(/\.?0+$/, '')
    }
    num = parseFloat(num)
  }
  
  return parseFloat(num).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}

export function formatShortNumber(num) {
  if (!num) return '0'
  
  const n = typeof num === 'string' ? parseFloat(num) : num
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K'
  
  return n.toFixed(2)
}

export function convertToWei(amount, decimals = 18) {
  if (!amount) return '0'
  const factor = Math.pow(10, decimals)
  return Math.floor(parseFloat(amount) * factor).toString()
}

export function convertFromWei(wei, decimals = 18) {
  if (!wei) return '0'
  const factor = Math.pow(10, decimals)
  return (BigInt(wei) / BigInt(factor)).toString()
}

export function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function truncateText(text, length = 50) {
  if (!text || text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function getChainName(chainId) {
  const names = {
    1: 'Ethereum',
    5: 'Goerli',
    11155111: 'Sepolia',
    137: 'Polygon',
    80002: 'Amoy',
  }
  return names[chainId] || 'Unknown'
}

export function getChainColor(chainId) {
  const colors = {
    1: 'from-blue-500 to-blue-600',
    5: 'from-orange-500 to-orange-600',
    11155111: 'from-purple-500 to-purple-600',
    137: 'from-pink-500 to-pink-600',
    80002: 'from-pink-500 to-pink-600',
  }
  return colors[chainId] || 'from-gray-500 to-gray-600'
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
