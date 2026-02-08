# Advanced Setup & Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Contract Integration](#contract-integration)
3. [Network Configuration](#network-configuration)
4. [Advanced Customization](#advanced-customization)
5. [Deployment](#deployment)
6. [Performance Optimization](#performance-optimization)
7. [Security Checklist](#security-checklist)

---

## Local Development Setup

### Prerequisites
```bash
# Check versions
node --version    # Should be 16.x or higher
npm --version     # Should be 8.x or higher
```

### Installation
```bash
cd frontend

# Install dependencies
npm install

# If using specific versions:
npm install -S react@18.2.0 ethers@6.8.0 framer-motion@10.16.4

# Install dev dependencies if needed
npm install -D vite @vitejs/plugin-react
```

### Development Server
```bash
npm run dev

# Custom port
npm run dev -- --port 5173
```

---

## Contract Integration

### Step 1: Get Contract Address & ABI

**From Hardhat/Truffle:**
```javascript
// Get address
const TOKEN = await Archit.deploy(initialSupply)
console.log('Contract address:', TOKEN.address)

// Export ABI (usually in artifacts/)
const abi = require('./artifacts/contracts/Archit.sol/Archit.json').abi
```

**From Block Explorer:**
- Go to Etherscan / Polygonscan
- Search your contract
- Get address from URL
- Copy ABI from "Contract" tab

### Step 2: Update Contract Configuration

Edit `src/config/constants.js`:

```javascript
import { parseEther } from 'ethers'

export const TOKEN_CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f42e...'

// If ABI is different, update ARBITTOKEN_ABI
export const ARBITTOKEN_ABI = [
  // Your contract functions
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  // ... more functions
]
```

### Step 3: Test Contract Connection

Create `src/test-contract.js`:
```javascript
import { BrowserProvider, Contract } from 'ethers'
import { TOKEN_CONTRACT_ADDRESS, ARBITTOKEN_ABI } from './config/constants'

async function testConnection() {
  const provider = new BrowserProvider(window.ethereum)
  const contract = new Contract(
    TOKEN_CONTRACT_ADDRESS,
    ARBITTOKEN_ABI,
    provider
  )
  
  try {
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()
    console.log('✓ Contract connected:', { name, symbol, totalSupply })
  } catch (error) {
    console.error('✗ Contract error:', error)
  }
}

// Run in console: testConnection()
```

---

## Network Configuration

### Supported Networks
Configured in `src/config/constants.js`:

```javascript
export const NETWORKS = {
  1: {
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/',
    blockExplorer: 'https://etherscan.io',
    chainName: 'Ethereum'
  },
  11155111: {
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/',
    blockExplorer: 'https://sepolia.etherscan.io',
    chainName: 'Sepolia'
  },
  137: {
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    chainName: 'Polygon'
  },
  // Add more networks...
}
```

### Add Custom Network

```javascript
// In MetaMask programmatically
async function addNetwork() {
  await window.ethereum?.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x1f', // 31 in hex
        chainName: 'Your Network',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ['https://your-rpc-url'],
        blockExplorerUrls: ['https://your-block-explorer'],
      },
    ],
  })
}
```

### Switch Network Programmatically

```javascript
async function switchNetwork(chainId) {
  try {
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    })
  } catch {
    // Network not found, add it
    await addNetwork()
  }
}
```

---

## Advanced Customization

### 1. Custom Token Logo

Replace emoji with image URL in `src/config/constants.js`:

```javascript
export const TOKEN_METADATA = {
  name: 'Archit Shah',
  symbol: 'ABT',
  decimals: 18,
  logo: 'https://your-logo-url.png',
  logoSize: '48px', // CSS size
}
```

Update component:
```jsx
// In TokenDashboard.jsx
<img 
  src={TOKEN_METADATA.logo} 
  alt={TOKEN_METADATA.symbol}
  style={{ width: TOKEN_METADATA.logoSize }}
/>
```

### 2. Custom Animations

Modify `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      keyframes: {
        'custom-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'custom-glow': {
          '0%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)' },
          '100%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.5)' },
        },
      },
      animation: {
        'custom-pulse': 'custom-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'custom-glow': 'custom-glow 3s ease-in-out infinite',
      },
    },
  },
}
```

### 3. Custom Color Scheme

Update `tailwind.config.js`:

```javascript
colors: {
  dark: {
    900: '#0a0e27',  // Change background
    800: '#111628',
    700: '#1a1f3a',
  },
  neon: {
    cyan: '#00f0ff',      // Change primary
    purple: '#c000ff',    // Change secondary
    pink: '#ff006e',      // Change accent
    green: '#39ff14',     // Change success
  }
}
```

### 4. Add Google Analytics

```javascript
// In src/main.jsx
import ReactGA from 'react-ga4'

ReactGA.initialize('G-YOUR_TRACKING_ID')

// Track page views
function trackPageView() {
  ReactGA.send('pageview')
}
```

### 5. Add Dark/Light Mode Toggle

```jsx
import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return { isDark, toggleTheme: () => setIsDark(!isDark) }
}
```

---

## Deployment

### Option 1: Vercel (Recommended)

**Setup:**
```bash
npm install -g vercel
vercel
```

**Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**Environment Variables in Vercel Dashboard:**
- `VITE_CONTRACT_ADDRESS`
- `VITE_NETWORK_CHAIN_ID`

### Option 2: Netlify

**Manual:**
1. Build: `npm run build`
2. Upload `dist/` folder to Netlify

**With CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: AWS S3 + CloudFront

```bash
npm run build

# Configure AWS CLI
aws configure

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Option 4: Self-Hosted (VPS)

```bash
npm run build

# SSH to your server
ssh user@your-server.com

# Copy build files
scp -r dist/* user@your-server.com:/var/www/html/

# Or use nginx/apache configuration
```

**Nginx config:**
```nginx
server {
  listen 80;
  server_name your-domain.com;

  root /var/www/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## Performance Optimization

### 1. Code Splitting

```jsx
import { lazy, Suspense } from 'react'

const ActivitySection = lazy(() => import('./components/ActivitySection'))
const TokenActions = lazy(() => import('./components/TokenActions'))

// In App.jsx
<Suspense fallback={<div>Loading...</div>}>
  <ActivitySection />
</Suspense>
```

### 2. Image Optimization

```jsx
// Use webp with fallback
<picture>
  <source srcSet="logo.webp" type="image/webp" />
  <img src="logo.png" alt="Logo" />
</picture>
```

### 3. Component Memoization

```jsx
import { memo } from 'react'

const TokenDashboard = memo(function TokenDashboard() {
  return (...)
})
```

### 4. Lighthouse Optimization

Run audit:
```bash
# Chrome DevTools > Lighthouse
# Or use CLI
npm install -g lighthouse
lighthouse https://your-site.com --output=html
```

### 5. Bundle Analysis

```bash
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

---

## Security Checklist

### Before Production

- [ ] Contract address verified on multiple sources
- [ ] Contract ABI matches deployed contract
- [ ] No private keys in environment variables
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Contract security audit completed
- [ ] MetaMask network validation in place
- [ ] Input validation on all forms
- [ ] Error messages don't expose sensitive info
- [ ] Rate limiting implemented for API calls

### Contract Security

```javascript
// Validate contract before interaction
async function validateContract() {
  const contract = new Contract(
    TOKEN_CONTRACT_ADDRESS,
    ARBITTOKEN_ABI,
    provider
  )
  
  try {
    // Check basic functions exist
    await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
    ])
    return true
  } catch {
    throw new Error('Invalid or unverified contract')
  }
}
```

### User Security

```javascript
// Warn before approving large amounts
function showApprovalWarning(amount, threshold) {
  if (amount > threshold) {
    return confirm(
      `⚠️ You're approving ${amount} tokens. ` +
      `This is a large amount. Continue?`
    )
  }
  return true
}
```

### Environment Security

```bash
# Never commit .env files
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore

# Keep dependencies updated
npm audit
npm audit fix
npm update
```

---

## Monitoring & Analytics

### Error Tracking (Sentry)

```javascript
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://your-sentry-dsn',
  environment: process.env.NODE_ENV,
})

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorPage />}>
      <AppContent />
    </Sentry.ErrorBoundary>
  )
}
```

### Transaction Logging

```javascript
function logTransaction(tx) {
  console.log({
    timestamp: new Date(),
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
  })
  
  // Send to analytics service
  // analytics.track('transaction', {...})
}
```

---

## Troubleshooting Deployment

### Issue: Contract not found
- Verify address is correct
- Check network chain ID
- Test on etherscan first

### Issue: Wrong network
- Show network mismatch warning
- Offer to switch programmatically
- Validate before each transaction

### Issue: Slow loading
- Enable code splitting
- Optimize images
- Use lazy loading
- Cache responses

### Issue: MetaMask not connecting
- Check MetaMask extension
- Try incognito mode
- Clear browser cache
- Test on different browser

---

## Next Steps

1. ✅ Update config files with your contract
2. ✅ Test locally with MetaMask
3. ✅ Build and preview production build
4. ✅ Deploy to staging environment
5. ✅ Run security audit
6. ✅ Deploy to production
7. ✅ Monitor and optimize

Happy deploying! 🚀
