'use client';

import Link from 'next/link';
import { useGameStore } from './store/gameStore';

export default function Home() {
  const { walletAddress, characters, battleTeam } = useGameStore();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="float-animation">
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-6">
            🐉 Baselisk
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
            The On-Chain Arena
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Enter the arena where strategy meets strength. Mint unique characters, build your team, and battle for glory in this turn-based combat game.
        </p>
        
        {!walletAddress && (
          <div className="pt-6">
            <p className="text-gray-400 mb-6 text-lg">Connect your wallet to begin your journey</p>
            <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <div className="px-6 py-3 bg-gray-900 rounded-full">
                <span className="text-purple-400 font-medium">🔗 Wallet Connection Required</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Stats */}
      {walletAddress && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hover-card bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 text-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎭</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Characters Owned</h3>
            <p className="text-5xl font-bold text-white mb-2">{characters.length}</p>
            <p className="text-gray-400 text-sm">Mint more to expand your collection</p>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((characters.length / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="hover-card bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 text-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚔️</div>
            <h3 className="text-xl font-semibold text-green-400 mb-3">Battle Team</h3>
            <p className="text-5xl font-bold text-white mb-2">{battleTeam.length}/3</p>
            <p className="text-gray-400 text-sm">
              {battleTeam.length === 3 ? 'Ready for battle!' : 'Select 3 characters'}
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              {[1, 2, 3].map((pos) => (
                <div
                  key={pos}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    pos <= battleTeam.length 
                      ? 'bg-green-500 scale-110' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="hover-card bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 text-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏆</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Status</h3>
            <div className="mb-3">
              {battleTeam.length === 3 ? (
                <div className="inline-flex items-center space-x-2 bg-green-600/20 text-green-400 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Ready</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Incomplete</span>
                </div>
              )}
            </div>
            <p className="text-gray-400 text-sm">Team composition status</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {walletAddress && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/mint"
            className="group hover-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-10 rounded-2xl border border-purple-500/30 text-center transition-all duration-500 hover:border-purple-400/50"
          >
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎨</div>
            <h3 className="text-3xl font-bold mb-4 text-gradient">Mint Characters</h3>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              Generate new characters and expand your collection with unique abilities
            </p>
            <div className="inline-flex items-center space-x-2 bg-purple-600/20 text-purple-300 px-6 py-3 rounded-full group-hover:bg-purple-600/30 transition-colors">
              <span>Start Minting</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
          
          <Link
            href="/arena"
            className={`group hover-card p-10 rounded-2xl border text-center transition-all duration-500 ${
              battleTeam.length === 3
                ? 'bg-gradient-to-br from-green-600/20 to-blue-600/20 border-green-500/30 hover:border-green-400/50'
                : 'bg-gradient-to-br from-gray-700/20 to-gray-800/20 border-gray-600/30 cursor-not-allowed'
            }`}
          >
            <div className={`text-6xl mb-6 transition-all duration-300 ${
              battleTeam.length === 3 ? 'group-hover:scale-110' : 'opacity-50'
            }`}>⚔️</div>
            <h3 className="text-3xl font-bold mb-4 text-gradient">Enter Arena</h3>
            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
              {battleTeam.length === 3 
                ? 'Battle other players in the arena for glory and rewards'
                : 'Complete your team to enter the arena and start battling'
              }
            </p>
            {battleTeam.length === 3 ? (
              <div className="inline-flex items-center space-x-2 bg-green-600/20 text-green-300 px-6 py-3 rounded-full group-hover:bg-green-600/30 transition-colors">
                <span>Enter Arena</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2 bg-gray-600/20 text-gray-400 px-6 py-3 rounded-full">
                <span>Team Incomplete</span>
              </div>
            )}
          </Link>
        </div>
      )}

      {/* Game Features */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-10 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Game Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎭</div>
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">12 Unique Classes</h3>
            <p className="text-gray-300 leading-relaxed">
              From powerful Brutes to agile Assassins, each with unique stats and abilities
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center group">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⚔️</div>
            <h3 className="text-2xl font-semibold mb-4 text-green-400">Turn-Based Combat</h3>
            <p className="text-gray-300 leading-relaxed">
              Strategic battles with dodge, critical hits, and tactical positioning
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center group">
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">PvP Arena</h3>
            <p className="text-gray-300 leading-relaxed">
              Match against other players in real-time battles for supremacy
            </p>
            <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!walletAddress && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-2xl border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Begin Your Journey?</h3>
            <p className="text-gray-300 mb-6">
              Connect your wallet and start building your legendary team of warriors
            </p>
            <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <div className="px-8 py-4 bg-gray-900 rounded-full">
                <span className="text-white font-medium">🔗 Connect Wallet to Start</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
