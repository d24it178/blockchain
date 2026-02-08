import { createContext, useContext, useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'

const Web3Context = createContext()

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkIfConnected()
    setupListeners()
  }, [])

  const checkIfConnected = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          const provider = new BrowserProvider(window.ethereum)
          setProvider(provider)
          const network = await provider.getNetwork()
          setChainId(Number(network.chainId))
        }
      } catch (err) {
        console.error('Error checking if wallet is connected:', err)
      }
    }
  }

  const setupListeners = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          // Update provider when account changes
          const newProvider = new BrowserProvider(window.ethereum)
          setProvider(newProvider)
        } else {
          setAccount(null)
          setProvider(null)
        }
      })

      window.ethereum.on('chainChanged', (chain) => {
        setChainId(Number(chain))
        // Reconnect provider on chain change
        if (window.ethereum) {
          const newProvider = new BrowserProvider(window.ethereum)
          setProvider(newProvider)
        }
      })

      window.ethereum.on('disconnect', () => {
        setAccount(null)
        setProvider(null)
      })
    }
  }

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0])
        const provider = new BrowserProvider(window.ethereum)
        setProvider(provider)
        const network = await provider.getNetwork()
        setChainId(Number(network.chainId))
      } else {
        setError('MetaMask is not installed')
      }
    } catch (err) {
      setError(err.message || 'Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setChainId(null)
  }

  const value = {
    account,
    provider,
    chainId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    isConnected: !!account,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider')
  }
  return context
}
