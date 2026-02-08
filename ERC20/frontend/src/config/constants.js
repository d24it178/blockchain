export const ARBITTOKEN_ABI = [{
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'standard',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            { name: '', type: 'address' },
            { name: '', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: '_initialSupply', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: '_from', type: 'address' },
            { indexed: true, name: '_to', type: 'address' },
            { indexed: false, name: '_value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: '_owner', type: 'address' },
            { indexed: true, name: '_spender', type: 'address' },
            { indexed: false, name: '_value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_from', type: 'address' },
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
]

// Token contract address - Update this with your deployed contract address
export const TOKEN_CONTRACT_ADDRESS = '0xA28dB4E2096B45A40e96aa30697848febEB9E866'
export const SALE_CONTRACT_ADDRESS = '0xc4269DdD041f8360e9c2145de5fb07147fE972b3'

// Network configurations
export const NETWORKS = {
    1: { name: 'Ethereum Mainnet', symbol: 'ETH', rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/' },
    5: { name: 'Goerli Testnet', symbol: 'ETH', rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/' },
    11155111: { name: 'Sepolia Testnet', symbol: 'ETH', rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/' },
    137: { name: 'Polygon', symbol: 'MATIC', rpcUrl: 'https://polygon-rpc.com' },
    80002: { name: 'Polygon Amoy Testnet', symbol: 'MATIC', rpcUrl: 'https://rpc-amoy.polygon.technology/' },
}

// Token metadata
export const TOKEN_METADATA = {
    name: 'Devansh',
    symbol: 'DP',
    decimals: 18,
    logo: '✨',
}