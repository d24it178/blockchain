# Component Architecture & Documentation

## Core Components

### 1. WalletPanel.jsx
**Purpose**: Display wallet connection status and details

**Features**:
- Shows connected wallet address (formatted)
- Network indicator with chain-specific styling
- Copy address to clipboard
- Disconnect button
- Error state handling

**Props**: None (uses Web3Context)

**Usage**:
```jsx
<WalletPanel />
```

---

### 2. ConnectButton.jsx
**Purpose**: Wallet connection entry point

**Features**:
- MetaMask detection
- Loading states
- Error messages
- Animated wallet icon
- Instructions for users

**Props**: None

**Usage**:
```jsx
<ConnectButton />
```

---

### 3. TokenDashboard.jsx
**Purpose**: Display token information and user balance

**Features**:
- Real-time balance fetching
- Animated number counter
- Total supply display
- Holdings percentage calculation
- Refresh button with loading animation
- Skeleton loaders

**Props**: None (uses Web3Context & Hooks)

**State**:
```javascript
{
  balance: string,      // User's token balance
  totalSupply: string,  // Total token supply
  symbol: string,       // Token symbol (ABT)
  name: string          // Token name
}
```

**Usage**:
```jsx
<TokenDashboard />
```

---

### 4. TokenActions.jsx
**Purpose**: Handle token transfers and approvals

**Features**:
- Tab-based interface (Transfer / Approve)
- Address validation
- Amount input with number formatting
- Loading states during transactions
- Error handling
- Toast notifications

**State**:
```javascript
{
  transfer: { to: string, amount: string },
  approve: { spender: string, amount: string },
  loading: boolean
}
```

**Usage**:
```jsx
<TokenActions />
```

---

### 5. ActivitySection.jsx
**Purpose**: Display transaction history

**Features**:
- List of recent transactions
- Transaction type indicators (Send/Receive/Approve)
- Status badges (Completed/Pending)
- Time-ago formatting
- Hover animations
- Empty state

**Props**: None

**Transaction Object**:
```javascript
{
  id: number,
  type: 'send' | 'receive' | 'approve',
  address: string,    // Recipient/sender address
  amount: string,     // Token amount
  status: 'completed' | 'pending',
  timestamp: Date
}
```

**Usage**:
```jsx
<ActivitySection />
```

---

### 6. footer.jsx
**Purpose**: Display footer with contract info and links

**Features**:
- Smart contract address display
- Copy to clipboard
- External link button
- Social media links
- Security notice
- Copyright info

**Props**: None

**Customizable**:
- Social links (Twitter, GitHub, Website)
- Contract address (from constants)
- Security message

**Usage**:
```jsx
<Footer />
```

---

### 7. AnimatedNumber.jsx
**Purpose**: Animated number counter component

**Props**:
```javascript
{
  value: number | string,        // Value to animate
  prefix: string,                // Prefix (optional)
  suffix: string,                // Suffix (optional)
  format: 'long' | 'short'       // Format style
}
```

**Usage**:
```jsx
<AnimatedNumber 
  value={1234.56} 
  prefix="$"
  suffix=" ABT"
  format="short"
/>
// Output: $1.23K ABT (animates from 0)
```

---

## Context & Providers

### Web3Context
**Purpose**: Global Web3 state management

**Provides**:
```javascript
{
  account: string | null,         // Connected wallet address
  provider: BrowserProvider,      // Ethers provider
  chainId: number | null,         // Current chain ID
  isConnecting: boolean,          // Connection loading state
  error: string | null,           // Connection error
  connectWallet: () => Promise,   // Connect wallet function
  disconnectWallet: () => void,   // Disconnect function
  isConnected: boolean            // Connected status
}
```

**Usage**:
```jsx
import { useWeb3 } from './context/Web3Context'

function MyComponent() {
  const { account, connectWallet, isConnected } = useWeb3()
  return (...)
}
```

---

## Custom Hooks

### useTokenContract()
Get contract instance for read/write operations

```javascript
const { getContract } = useTokenContract()
const contract = getContract(true) // true = with signer
const balance = await contract.balanceOf(address)
```

---

### useTokenData()
Fetch token information

```javascript
const { getTokenInfo } = useTokenData()
const { name, symbol, totalSupply } = await getTokenInfo()
```

---

### useCopyToClipboard()
Copy text to clipboard with notification

```javascript
const { copy } = useCopyToClipboard()
await copy('text to copy')
// Shows success/error toast
```

---

### useAsync()
Async function wrapper with loading state

```javascript
const { execute, status, data, error } = useAsync(
  async () => {
    // async operation
  },
  true // immediate execution
)
```

---

### useDebounce()
Debounced value for optimized operations

```javascript
const debouncedValue = useDebounce(searchTerm, 500)
// Waits 500ms after typing stops
```

---

## Animation Patterns

### Motion Containers
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {/* Staggered children */}
</motion.div>
```

### Item Animation
```jsx
<motion.div
  custom={index}
  variants={itemVariants}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

### Hover Effects
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

---

## Styling Guide

### Glass Effect Classes
- `.glass`: Standard glassmorphism
- `.glass-lg`: Larger blur with less opacity
- `.glass-lg.rounded-2xl`: Rounded glass cards

### Gradient Text
- `.gradient-text`: Cyan to purple gradient
- `.neon-text`: Glowing text effect

### Button Styles
- `.btn.btn-primary`: Primary button
- `.btn.btn-secondary`: Secondary button
- `.btn`: Base button styles

### Shadows
- `.shadow-glow-cyan`: Cyan glow
- `.shadow-glow-purple`: Purple glow
- `.shadow-glow-pink`: Pink glow

---

## Typography

```css
/* Font */
font-family: 'Inter', sans-serif;

/* Sizes */
text-xs   /* 12px - labels, captions */
text-sm   /* 14px - small text */
text-base /* 16px - body text */
text-lg   /* 18px - subheadings */
text-2xl  /* 24px - headings */
text-3xl  /* 30px - large headings */
text-4xl  /* 36px - hero text */
text-5xl  /* 48px - extra large */

/* Colors */
text-cyan-400   /* Neon cyan */
text-purple-600 /* Neon purple */
text-pink-400   /* Neon pink */
text-green-400  /* Neon green */
```

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Neon Cyan | #00f0ff | Primary accent |
| Neon Purple | #c000ff | Secondary accent |
| Neon Pink | #ff006e | Status/alerts |
| Neon Green | #39ff14 | Success/positive |
| Dark 900 | #0a0e27 | Background |
| Dark 700 | #1a1f3a | Cards |

---

## Form Input Styling

```jsx
<input
  className="w-full glass rounded-lg px-4 py-3 
             border border-cyan-500/20 
             focus:border-cyan-500/60 
             focus:outline-none 
             transition-colors text-sm"
/>
```

---

## Responsive Grid

```jsx
{/* 1 col on mobile, 2 on tablet, 3 on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* items */}
</div>

{/* 2 col sidebar layout */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">Sidebar</div>
  <div className="lg:col-span-2">Content</div>
</div>
```

---

## Adding New Components

1. Create `.jsx` file in `src/components/`
2. Import Framer Motion and necessary hooks
3. Use consistent naming: `{ComponentName}.jsx`
4. Export default function
5. Use variant patterns for animations
6. Add to `App.jsx`

Example:
```jsx
import { motion } from 'framer-motion'
import { useWeb3 } from '../context/Web3Context'

export default function NewComponent() {
  const { isConnected } = useWeb3()
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  )
}
```

---

**All components are fully typed and production-ready!**
