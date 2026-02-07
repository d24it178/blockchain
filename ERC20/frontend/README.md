# Archit Token - ERC-20 DApp Frontend

A modern, production-grade decentralized application (DApp) frontend for the Archit (ABT) ERC-20 token with glassmorphism UI, Web3 integration, and smooth animations.

## 🎯 Features

### UI/UX
- **Dark Theme** with Web3/fintech aesthetics
- **Glassmorphism Design** with soft neon accents (cyan, purple, pink, green)
- **Responsive Layout** optimized for desktop, tablet, and mobile
- **Smooth Animations** using Framer Motion
  - Page transitions and staggered animations
  - Number count-up animations for balances
  - Animated gradients and glowing borders
  - Micro-interactions and hover effects
  - Button ripple effects with subtle glow

### Core Features
1. **Wallet Connection**
   - MetaMask integration
   - Display connected wallet address
   - Network indicator with chain-specific styling
   - Disconnect functionality

2. **Token Dashboard**
   - Real-time balance display with animated counter
   - Token metadata (name, symbol, decimals)
   - Total supply tracking
   - Holdings percentage calculation
   - Refresh button with loading animation

3. **Token Actions**
   - **Transfer Tokens**: Send ABT to any address
   - **Approve Allowance**: Set allowances for spenders
   - Form validation with real-time feedback
   - Transaction loading states

4. **Activity Section**
   - Recent transactions list
   - Transaction types: Send, Receive, Approve
   - Status indicators (Completed, Pending)
   - Time-ago formatting
   - Mock data with real blockchain integration ready

5. **Footer**
   - Smart contract address display
   - Copy to clipboard functionality
   - External link to block explorer
   - Social media links
   - Security notices

### Technical
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Blockchain**: Ethers.js v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- MetaMask browser extension
- Modern browser (Chrome, Firefox, Edge)

### Environment Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Configure Smart Contract Address**

Edit `src/config/constants.js` and add your deployed contract address:
```javascript
export const TOKEN_CONTRACT_ADDRESS = '0x...' // Your contract address
```

3. **Configure Network (Optional)**

If using a different network, update the `NETWORKS` object in `src/config/constants.js`:
```javascript
export const NETWORKS = {
  1: { name: 'Ethereum Mainnet', ... },
  11155111: { name: 'Sepolia Testnet', ... },
  // Add your network
}
```

### Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Production Build

Create optimized build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── WalletPanel.jsx       # Wallet connection UI
│   │   ├── ConnectButton.jsx      # Connect wallet button
│   │   ├── TokenDashboard.jsx     # Token info & balance display
│   │   ├── TokenActions.jsx       # Transfer & approve forms
│   │   ├── ActivitySection.jsx    # Transaction history
│   │   ├── AnimatedNumber.jsx     # Animated number counter
│   │   └── Footer.jsx             # Footer with contract info
│   ├── context/
│   │   └── Web3Context.jsx       # Web3 provider & hooks
│   ├── hooks/
│   │   ├── useToken.js           # Token contract hooks
│   │   └── useUtility.js         # Utility hooks
│   ├── config/
│   │   └── constants.js          # Contract ABI, addresses, networks
│   ├── utils/
│   │   └── helpers.js            # Helper functions
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Customization

### Colors & Theme

Edit `tailwind.config.js` to customize:
- Neon accent colors
- Glassmorphism effects
- Glow shadows
- Animations

### Token Metadata

Update `src/config/constants.js`:
```javascript
export const TOKEN_METADATA = {
  name: 'Your Token Name',
  symbol: 'YTK',
  decimals: 18,
  logo: '🎯', // or emoji
}
```

### Smart Contract ABI

If your contract has different function signatures, update `ARBITTOKEN_ABI` in `src/config/constants.js`

## 🔌 Web3 Integration

The app uses **ethers.js v6** for blockchain interaction:

```javascript
// Connect wallet
const { connectWallet, disconnectWallet } = useWeb3()

// Get contract instance
const { getContract } = useTokenContract()
const contract = getContract(true) // true = with signer for write operations

// Read token data
const balance = await contract.balanceOf(address)
const totalSupply = await contract.totalSupply()

// Write operations (requires wallet connection)
const tx = await contract.transfer(recipient, amount)
await tx.wait() // Wait for confirmation
```

## 🔐 Security Considerations

1. **Contract Address Validation**: Always verify contract addresses on block explorers
2. **Permission Management**: Users approve spenders with specific allowances
3. **Network Safety**: Chain ID validation before transactions
4. **Input Validation**: Address and amount validation before sending
5. **Error Handling**: User-friendly error messages with transaction details

## 🌐 Supported Networks

- Ethereum Mainnet (ChainID: 1)
- Goerli Testnet (ChainID: 5)
- Sepolia Testnet (ChainID: 11155111)
- Polygon Mainnet (ChainID: 137)
- Polygon Amoy (ChainID: 80002)

Add more networks in `src/config/constants.js`

## 🚨 Troubleshooting

### "MetaMask is not installed"
- Install MetaMask browser extension from https://metamask.io

### "Contract address not configured"
- Add your contract address to `src/config/constants.js`

### "Invalid contract ABI"
- Ensure the ABI in `src/config/constants.js` matches your contract functions

### Transaction failures
- Check gas prices and wallet balance
- Verify recipient address format
- Ensure you have token approval for transferFrom operations

## 📦 Dependencies

- **react@18.2.0**: UI library
- **ethers@6.8.0**: Blockchain library
- **framer-motion@10.16.4**: Animation library
- **tailwindcss@3.3.0**: CSS framework
- **react-hot-toast@2.4.1**: Toast notifications
- **lucide-react@0.263.1**: Icon library

## 📝 License

MIT License - Feel free to use this template for your projects

## 🤝 Contributing

Contributions are welcome! Feel free to fork, modify, and improve this template.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review component documentation in code comments
3. Verify contract deployment and configuration

---

**Built with React + Vite + Tailwind CSS + Framer Motion + Ethers.js**

🚀 Happy coding!
