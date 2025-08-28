# 🐉 Baselisk: The On-Chain Arena

A web3 battle arena game prototype that simulates blockchain gaming mechanics. Players can mint unique characters, build teams, and engage in turn-based PvP battles with real-time updates.

## Base Keep:
• jmaesora.base.eth
• riewagmization.base.eth
• cartss.base.eth
• delatorrecj.base.eth
• sceiiya.base.eth

## 📖 Project Overview

Baselisk is a Next.js-based web application that demonstrates how blockchain games could work, featuring:
- **Character Minting System**: Generate unique characters with randomized stats and classes
- **Team Building**: Create strategic 3-character teams for battle
- **Real-Time Combat**: Turn-based battles with live updates via Server-Sent Events
- **PvP Arena**: Queue-based matchmaking system for competitive play

The project serves as a proof-of-concept for web3 gaming mechanics without requiring actual blockchain integration, making it perfect for testing and development.

## ✨ Features

### 🎭 Character System
- **12 Unique Character Classes** with distinct playstyles
- **Randomized Generation** ensuring each character is unique
- **Stat-Based System** with STR, AGI, SPD, RES, and VIT attributes
- **Health Points** calculated from VIT × 10

### 🎨 Minting & Collection
- **Simulated NFT Minting** process
- **Character Collection** management
- **Random Class Assignment** for variety
- **Persistent Storage** using Zustand state management

### ⚔️ Battle System
- **Turn-Based Combat** with speed-based turn order
- **Real-Time Updates** via Server-Sent Events
- **Advanced Mechanics** including dodge, critical hits, and damage calculation
- **Position-Based Strategy** with front/back positioning

### 🏆 Arena & Matchmaking
- **PvP Queue System** for finding opponents
- **Team Validation** ensuring 3-character requirements
- **Battle History** tracking
- **Responsive UI** with live battle progress

## 🏗️ Project Structure

```
app/
├── api/                    # Backend API endpoints
│   ├── battle/            # Battle system APIs
│   │   ├── queue/         # Matchmaking queue
│   │   └── stream/        # Real-time battle updates
│   └── mint/              # Character minting API
├── arena/                  # Battle arena page
├── collection/             # Character collection view
├── components/             # Reusable React components
│   ├── Navigation.tsx     # Main navigation
│   └── SDKInitializer.tsx # SDK setup
├── data/                   # Game data and constants
│   └── characters.ts      # Character class definitions
├── lib/                    # Utility functions and helpers
├── mint/                   # Character minting page
├── store/                  # State management
│   └── gameStore.ts       # Zustand store
├── types/                  # TypeScript type definitions
│   └── game.ts            # Game-related interfaces
└── globals.css            # Global styles and Tailwind CSS
```

## 🎮 Game Mechanics

### How to Play

#### 1. **Character Minting**
- Navigate to the Mint page
- Click "Mint Character" to generate a new character
- Each character gets random class and stats
- Characters are automatically added to your collection

#### 2. **Team Building**
- Go to Collection page to view your characters
- Select exactly 3 characters for your battle team
- Characters are assigned positions (1, 2, 3) automatically
- Position 1 is the front line, taking damage first

#### 3. **Entering Battle**
- Navigate to Arena page
- Click "Enter Queue" to find opponents
- System matches you with other players
- Battle starts automatically when match is found

#### 4. **Combat System**
- **Turn Order**: Characters act based on SPD stat (highest first)
- **Targeting**: Attacks prioritize front position, then random selection
- **Dodge**: AGI difference affects dodge chance
- **Critical Hits**: AGI-based critical strike system
- **Damage**: STR vs RES calculation with minimum damage guarantee

### Character Classes & Strategies

| Class | Playstyle | Key Stats | Strategy |
|-------|-----------|-----------|----------|
| **Brute** | Glass Cannon | High STR, Low SPD | High damage but fragile |
| **Assassin** | Critical Striker | High AGI, Low VIT | Extreme crit chance, very fragile |
| **Guardian** | Tank | High VIT, Low SPD | Damage sponge, very slow |
| **Swiftblade** | Debuffer | High SPD, Balanced | Attack first, apply debuffs |
| **Battle Sage** | Hybrid | Balanced All | Versatile offensive/defensive |
| **Shadow Weaver** | Speed Demon | High SPD, High AGI | Fast with high crit chance |

### Battle Tips
- **Speed Matters**: Higher SPD characters act first
- **Position Strategy**: Place tanky characters in front
- **Team Composition**: Balance damage, tanking, and speed
- **Critical Thinking**: AGI affects both dodge and crit chance

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

## 🔧 Technical Details

### Frontend Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management

### Backend Features
- **API Routes** for game logic
- **Server-Sent Events** for real-time updates
- **Queue System** for player matching
- **Battle Engine** with turn-based mechanics

### State Management
- **Persistent Storage** using Zustand
- **Character Collection** management
- **Battle State** tracking
- **Team Configuration** storage

## 🎯 Future Roadmap

- [ ] Persistent battle history
- [ ] Character leveling and progression
- [ ] Equipment and item systems
- [ ] Guild and social features
- [ ] Tournament brackets
- [ ] Actual blockchain integration
- [ ] Mobile-responsive design
- [ ] Advanced battle mechanics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This is a prototype that simulates blockchain game mechanics. The backend uses in-memory storage and won't persist across serverless function instances on Vercel.

### Special Thanks to Tomeku, Base PH, Base PH NCR Regional for conducting Base Build and giving us awareness and teaching us on how to deploy a mini app project in Farcaster