# 🐉 Baselisk: The On-Chain Arena

A web3 battle arena game prototype built with Next.js 14, TypeScript, and Tailwind CSS. This project simulates blockchain game mechanics including character minting, team management, and online PvP battles.

## ✨ Features

### 🎭 Character System
- **12 Unique Classes**: From powerful Brutes to agile Assassins
- **Random Generation**: Each character has unique stats and names
- **Stat System**: STR, AGI, SPD, RES, VIT with 25 total points
- **HP Calculation**: VIT × 10 for health points

### 🎨 Minting System
- **Simulated NFT Minting**: Generate new characters without blockchain
- **Random Class Selection**: Each mint creates a unique character
- **Character Collection**: Build your roster of fighters

### ⚔️ Team Management
- **3-Character Teams**: Select exactly 3 characters for battle
- **Position Assignment**: Characters get battle positions (1, 2, 3)
- **Team Building**: Mix and match characters for optimal strategies

### 🏆 Battle Arena
- **Turn-Based Combat**: Characters act based on SPD stat
- **Advanced Mechanics**: Dodge, critical hits, damage calculation
- **Real-Time Updates**: Server-Sent Events for battle progress
- **PvP Matching**: Queue system for finding opponents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Architecture

### Frontend
- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Utility-first styling
- **Zustand**: State management with persistence
- **React Hooks**: Modern React patterns

### Backend
- **API Routes**: Next.js API endpoints
- **Battle Engine**: Turn-based combat simulation
- **Queue System**: Player matching and battle creation
- **Server-Sent Events**: Real-time battle updates

### Game Logic
- **Turn Order**: Based on character SPD stats
- **Combat**: Dodge, critical hits, damage reduction
- **Positioning**: Strategic character placement
- **Battle Flow**: Automated turn resolution

## 🎮 Game Mechanics

### Character Classes
1. **Brute** - High damage, low speed glass cannon
2. **Brawler** - Balanced strength-based attacker
3. **Assassin** - Extreme crit chance, very fragile
4. **Duelist** - Agile fighter with good speed
5. **Swiftblade** - Attacks first, applies debuffs
6. **Windrunner** - Fast and evasive skirmisher
7. **Guardian** - Extreme damage sponge, very slow
8. **Sentinel** - Defensive wall with high HP
9. **Juggernaut** - High HP pool, decent damage/defense
10. **Titan** - Pure health tank
11. **Battle Sage** - Rare hybrid, offensive and defensive
12. **Shadow Weaver** - Rare hybrid, extremely fast with high crit

### Battle System
- **Speed-Based Turns**: Higher SPD characters act first
- **Targeting**: Prioritize front position, then random
- **Dodge Mechanics**: AGI difference affects dodge chance
- **Critical Hits**: AGI-based critical strike system
- **Damage Calculation**: STR vs RES with minimum damage

## 📁 Project Structure

```
app/
├── api/                    # API routes
│   ├── mint/             # Character minting
│   └── battle/           # Battle system
├── components/            # React components
├── data/                  # Character data
├── lib/                   # Game logic
├── store/                 # State management
├── types/                 # TypeScript interfaces
└── globals.css           # Global styles
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Deployment
Ready for Vercel deployment with serverless functions.

## 🎯 Future Enhancements

- [ ] Persistent battle history
- [ ] Character leveling system
- [ ] Equipment and items
- [ ] Guild system
- [ ] Tournament brackets
- [ ] Blockchain integration
- [ ] Mobile app
- [ ] Social features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Character art from IPFS
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Zustand for lightweight state management

---

**Note**: This is a prototype that simulates blockchain game mechanics. The backend uses in-memory storage and won't persist across serverless function instances on Vercel.
