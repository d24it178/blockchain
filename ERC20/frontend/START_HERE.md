#!/usr/bin/env bash
# Getting Started with Archit Token Frontend
# Run: bash START_HERE.md (or just follow the instructions)

cat << 'EOF'

╔═════════════════════════════════════════════════════════════════╗
║                                                                 ║
║           🎉 Welcome to Archit Token DApp Frontend! 🎉          ║
║                                                                 ║
║        A Production-Grade Web3 DApp for Your ERC-20 Token      ║
║                                                                 ║
╚═════════════════════════════════════════════════════════════════╝

📋 PROJECT OVERVIEW
═════════════════════════════════════════════════════════════════

What you have:
  ✅ Complete React + Vite frontend
  ✅ Web3 integration with MetaMask
  ✅ Beautiful dark theme with glassmorphism
  ✅ Smooth animations with Framer Motion
  ✅ Responsive design (mobile, tablet, desktop)
  ✅ Production-ready code
  ✅ Complete documentation

Tech Stack:
  • React 18 + Vite (fast bundler)
  • Tailwind CSS (utility-first styling)
  • Framer Motion (smooth animations)
  • Ethers.js v6 (blockchain interaction)
  • MetaMask (wallet connection)

═════════════════════════════════════════════════════════════════

⚡ QUICK START (5 MINUTES)
═════════════════════════════════════════════════════════════════

Step 1: Install Dependencies
────────────────────────────→
$ npm install

Step 2: Configure Contract Address
──────────────────────────────────→

Open: src/config/constants.js

Change line 53 from:
  export const TOKEN_CONTRACT_ADDRESS = '0x'

To: (your contract address)
  export const TOKEN_CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f42e...'

Step 3: Start Development Server
────────────────────────────────→
$ npm run dev

Step 4: Open in Browser
──────────────────────→
Visit: http://localhost:3000

Step 5: Connect MetaMask
───────────────────────→
1. Click "Connect MetaMask" button
2. Approve the connection in MetaMask popup
3. Start using your token DApp! 🚀

═════════════════════════════════════════════════════════════════

📚 DOCUMENTATION GUIDE
═════════════════════════════════════════════════════════════════

Choose based on your needs:

👤 "I just want it to work!"
  → Read: QUICKSTART.md (5 minutes)

🛠️  "I want to customize it"
  → Read: COMPONENTS.md + tailwind.config.js

🚀 "I want to deploy to production"
  → Read: DEPLOYMENT.md

📖 "I want to understand everything"
  → Read: README.md (complete documentation)

📋 "I need project overview"
  → Read: PROJECT_SUMMARY.md

═════════════════════════════════════════════════════════════════

🎯 WHAT CAN YOU ACTUALLY DO?
═════════════════════════════════════════════════════════════════

After connecting MetaMask, you can:

1. 👁️  View Your Token Balance
   → See real-time balance with animated counter
   → View total supply
   → Check your holdings percentage

2. 💰 Transfer Tokens
   → Enter recipient address
   → Enter amount
   → Approve in MetaMask
   → Transaction sent!

3. ✅ Approve Allowance
   → Set spending limit for contract/address
   → Great for DeFi integrations
   → MetaMask approval required

4. 📊 View Transaction History
   → See recent transactions
   → Track status (completed/pending)
   → See timestamps

5. 💾 Copy Contract Info
   → Easy clipboard copy of contract address
   → Open in block explorer

═════════════════════════════════════════════════════════════════

🎨 KEY CUSTOMIZATIONS
═════════════════════════════════════════════════════════════════

Before you deploy, customize these:

Token Name & Symbol:
  File: src/config/constants.js
  Lines: 60-64

  export const TOKEN_METADATA = {
    name: 'Archit Shah',
    symbol: 'ABT',
    decimals: 18,
    logo: '🎯',
  }

Contract Address:
  File: src/config/constants.js
  Line: 53

  export const TOKEN_CONTRACT_ADDRESS = '0x...'

Colors & Theme:
  File: tailwind.config.js
  Colors section

  neon: {
    cyan: '#00f0ff',    // Primary
    purple: '#c000ff',  // Secondary
    pink: '#ff006e',    // Accent
    green: '#39ff14',   // Success
  }

Social Links:
  File: src/components/Footer.jsx
  Line: 12

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    // Add more...
  ]

═════════════════════════════════════════════════════════════════

🚨 IMPORTANT THINGS TO CHECK
═════════════════════════════════════════════════════════════════

✓ Contract Address
  Make sure you add your ACTUAL contract address
  Don't leave it as '0x'

✓ Network Support
  Token runs on:
  • Ethereum (mainnet)
  • Sepolia (testnet)
  • Polygon
  • Goerli (deprecated)
  • Amoy

✓ MetaMask Installed
  Download from: https://metamask.io

✓ Sufficient Balance
  You need tokens in your wallet to test transfer

✓ Gas Fees
  Transactions require gas fees
  Use testnet (Sepolia) to test without real ETH

═════════════════════════════════════════════════════════════════

🔗 FILE STRUCTURE AT A GLANCE
═════════════════════════════════════════════════════════════════

frontend/
├── src/
│   ├── components/
│   │   ├── WalletPanel.jsx      ← Wallet UI
│   │   ├── TokenDashboard.jsx   ← Balance display
│   │   ├── TokenActions.jsx     ← Transfer/Approve
│   │   ├── ActivitySection.jsx  ← Transaction history
│   │   └── ... (3 more components)
│   ├── context/
│   │   └── Web3Context.jsx      ← Web3 state
│   ├── hooks/
│   │   ├── useToken.js          ← Token contract
│   │   └── useUtility.js        ← Helper hooks
│   ├── config/
│   │   └── constants.js         ← UPDATE THIS!
│   ├── utils/
│   │   └── helpers.js           ← Format functions
│   └── App.jsx                  ← Main app
├── package.json                 ← Dependencies
├── tailwind.config.js           ← Styling
├── vite.config.js              ← Build config
└── [Documentation files]        ← README, guides, etc.

═════════════════════════════════════════════════════════════════

❓ COMMON QUESTIONS
═════════════════════════════════════════════════════════════════

Q: Where do I add my contract address?
A: File: src/config/constants.js, line 53

Q: What if I don't have a contract deployed?
A: Deploy using Remix IDE (https://remix.ethereum.org)
   See DEPLOYMENT.md for more details

Q: How do I test on testnet?
A: Use Sepolia testnet
   Get test ETH from: https://sepoliafaucet.com

Q: Why is it showing dark theme?
A: That's the design! It's optimized for eyes and looks professional

Q: Can I change the colors?
A: Yes! Edit tailwind.config.js colors section

Q: How do I deploy to production?
A: Run 'npm run build' and upload to Vercel/Netlify
   See DEPLOYMENT.md for full guide

Q: Is it mobile-friendly?
A: Yes! Fully responsive (mobile, tablet, desktop)

Q: Can I add my own features?
A: Absolutely! Add components in src/components/

Q: Is it secure?
A: Yes! All security best practices implemented
   See DEPLOYMENT.md security checklist

═════════════════════════════════════════════════════════════════

🚀 DEPLOYMENT QUICK GUIDE
═════════════════════════════════════════════════════════════════

Option 1: Vercel (Easiest - Recommended)
─────────────────────────────────────────
1. Create account at vercel.com
2. Connect your GitHub repo
3. Vercel auto-deploys on each push
4. Add environment variable: VITE_CONTRACT_ADDRESS
5. Done! Your app is live 🎉

Option 2: Netlify
─────────────────
1. Run: npm run build
2. Drag dist/ folder to netlify.com
3. Done! Live in seconds

Both are FREE and have generous free tiers.

See DEPLOYMENT.md for more options (AWS, self-hosted, etc.)

═════════════════════════════════════════════════════════════════

💡 PRO TIPS
═════════════════════════════════════════════════════════════════

1. 🧪 Test with small amounts first
   Don't transfer your entire balance in the first test!

2. 🔐 Verify addresses carefully
   Copy-paste to avoid typos (use copy-to-clipboard)

3. ⛽  Monitor gas prices
   Better to deploy when gas is low

4. 📱 Test on mobile
   Your users will! Make sure it works on phones

5. 🔗 Use block explorer
   Verify transactions on Etherscan after sending

6. 📝 Read the docs
   All answers are in QUICKSTART.md or README.md

7. 🎨 Customize early
   Colors, logo, etc. make it feel like YOUR app

8. 🚀 Deploy early
   Get feedback from users sooner

═════════════════════════════════════════════════════════════════

📞 QUICK REFERENCE
═════════════════════════════════════════════════════════════════

npm install              Install dependencies
npm run dev             Start dev server (http://localhost:3000)
npm run build           Build for production
npm run preview         Preview production build locally

Files to edit:
  src/config/constants.js    → Contract address, metadata
  tailwind.config.js         → Colors, animations
  src/components/Footer.jsx  → Social links

Documentation:
  QUICKSTART.md              5-min setup
  COMPONENTS.md              Component docs
  DEPLOYMENT.md              Production guide
  README.md                  Full documentation

═════════════════════════════════════════════════════════════════

✨ YOU'RE READY!
═════════════════════════════════════════════════════════════════

Next steps:

1. Run: npm install
2. Add contract address to src/config/constants.js
3. Run: npm run dev
4. Open: http://localhost:3000
5. Connect MetaMask
6. Start using your DApp! 🎉

═════════════════════════════════════════════════════════════════

Questions? Check the documentation files:
  • QUICKSTART.md - for setup help
  • COMPONENTS.md - for customization
  • DEPLOYMENT.md - for going to production
  • README.md - for everything else

Good luck with your Archit Token DApp! 🚀

═════════════════════════════════════════════════════════════════
EOF
