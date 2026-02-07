# Archit Token DApp - Quick Start Guide

## ⚡ Fastest Setup (5 minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Add Your Contract Address
Open `src/config/constants.js` and replace:
```javascript
export const TOKEN_CONTRACT_ADDRESS = '0x...' // your contract address
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` and connect your MetaMask wallet!

---

## 🎯 Key Files to Customize

| File | Purpose |
|------|---------|
| `src/config/constants.js` | Contract address, ABI, token metadata |
| `tailwind.config.js` | Colors, animations, themes |
| `src/components/Footer.jsx` | Social links, company info |
| `src/components/ActivitySection.jsx` | Transaction history data source |

---

## 🔑 Web3 Setup

### Connect MetaMask Wallet
- Button automatically appears when wallet not connected
- MetaMask popup appears on click
- Automatically reads balance and network

### Transaction Flow
1. User enters recipient address & amount
2. Click "Transfer Tokens" button
3. MetaMask prompts for confirmation
4. Toast notification shows pending status
5. Wait for blockchain confirmation
6. Success message appears

---

## 🎨 Design System

### Colors
- **Neon Cyan**: `#00f0ff` - Primary accents
- **Neon Purple**: `#c000ff` - Secondary accents  
- **Dark BG**: `#0a0e27` - Dark theme
- **Glass**: Frosted glass effect with 10px blur

### Components
- **Glass Card**: `.glass` class with border glow
- **Buttons**: Hover scale + glow effect
- **Text**: Gradient text with neon glow option
- **Icons**: Lucide React (18px default)

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (full screen width)
- **Tablet**: 768px - 1024px 
- **Desktop**: > 1024px (max-w-4xl container)

---

## ⚠️ Important Configuration

### Before Deploying

1. ✅ Update contract address in `src/config/constants.js`
2. ✅ Verify contract ABI matches your functions
3. ✅ Add social links in `src/components/Footer.jsx`
4. ✅ Update TOKEN_METADATA with your token info
5. ✅ Add supported networks if needed
6. ✅ Set up environment variables for API keys

### Environment Variables (Optional)
Create `.env.local`:
```
VITE_CONTRACT_ADDRESS=0x...
VITE_INFURA_KEY=your_key
VITE_ALCHEMY_KEY=your_key
```

---

## 🐛 Testing Locally

### Test Transfer
1. Go to dashboard
2. Paste test address (any valid 0x address)
3. Enter amount (e.g., 100)
4. Click "Transfer Tokens"
5. Approve in MetaMask

### Test Approve
1. Enter spender address
2. Enter allowance amount
3. Click "Approve Allowance"
4. Confirm in MetaMask

---

## 📊 Available Hooks

```javascript
// Wallet & Network
const { account, chainId, isConnected, connectWallet } = useWeb3()

// Token Operations
const { getContract } = useTokenContract()

// Token Data Fetching
const { getTokenInfo } = useTokenData()

// Utilities
const { copy } = useCopyToClipboard()
const { execute, status, data } = useAsync(asyncFn)
const debouncedValue = useDebounce(value, 500)
```

---

## 🚀 Production Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Environment Variables for Production
Set in hosting platform:
- Contract address
- Network RPC endpoints
- Analytics keys

---

## 💡 Pro Tips

1. **Gas Optimization**: Batch transactions when possible
2. **UX**: Show pending states during blockchain calls  
3. **Security**: Always verify addresses before approval
4. **Performance**: Lazy load components for large lists
5. **Accessibility**: Use semantic HTML and ARIA labels

---

## 🎓 Learning Resources

- [Ethers.js Docs](https://docs.ethers.org/v6/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MetaMask Docs](https://docs.metamask.io/)
- [Vite Guide](https://vitejs.dev/)

---

**Questions? Check the main README.md for full documentation!**
