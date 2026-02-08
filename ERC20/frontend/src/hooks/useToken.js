import { useWeb3 } from '../context/Web3Context'
import { Contract } from 'ethers'
import { ARBITTOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from '../config/constants'

export function useTokenContract() {
  const { provider, account } = useWeb3()

  const getContract = async (withSigner = true) => {
    if (!provider) {
      console.error('Provider not available')
      throw new Error('Provider not connected')
    }

    if (!TOKEN_CONTRACT_ADDRESS || TOKEN_CONTRACT_ADDRESS === '0x') {
      console.error('Token contract address:', TOKEN_CONTRACT_ADDRESS)
      throw new Error('Contract address not configured')
    }

    if (withSigner && !account) {
      console.error('Wallet account not available')
      throw new Error('Wallet not connected')
    }

    let contractRunner = provider
    if (withSigner && account) {
      try {
        // For ethers v6: getSigner() without parameters uses the current account from provider
        contractRunner = await provider.getSigner()
        console.log('Signer obtained successfully')
      } catch (error) {
        console.error('Error getting signer:', error)
        console.warn('Falling back to provider (read-only mode)')
        contractRunner = provider
      }
    }
    
    console.log('Creating contract with address:', TOKEN_CONTRACT_ADDRESS)
    return new Contract(TOKEN_CONTRACT_ADDRESS, ARBITTOKEN_ABI, contractRunner)
  }

  return { getContract }
}

export function useTokenData() {
  const { provider } = useWeb3()

  const getTokenInfo = async () => {
    try {
      if (!provider || !TOKEN_CONTRACT_ADDRESS || TOKEN_CONTRACT_ADDRESS === '0x') {
        throw new Error('Contract address not configured')
      }

      const contract = new Contract(TOKEN_CONTRACT_ADDRESS, ARBITTOKEN_ABI, provider)
      const [name, symbol, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
      ])

      return {
        name,
        symbol,
        totalSupply: totalSupply.toString(),
      }
    } catch (error) {
      throw error
    }
  }

  return { getTokenInfo }
}
