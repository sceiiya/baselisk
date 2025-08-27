'use client';

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Character } from '../types/game';

export default function MintPage() {
  const { walletAddress, characters, mintCharacter } = useGameStore();
  const [isMinting, setIsMinting] = useState(false);
  const [lastMinted, setLastMinted] = useState<Character | null>(null);

  const handleMint = async () => {
    if (!walletAddress) return;
    
    setIsMinting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Mint character through store
      mintCharacter();
      
      // Get the last character minted
      const newCharacter = characters[characters.length - 1];
      setLastMinted(newCharacter);
      
      // Reset after showing for a bit
      setTimeout(() => setLastMinted(null), 8000);
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsMinting(false);
    }
  };

  if (!walletAddress) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 p-8 rounded-2xl border border-red-500/30">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold mb-4 text-red-400">Wallet Required</h2>
          <p className="text-gray-300 text-lg mb-6">You need to connect your wallet to mint characters.</p>
          <div className="inline-block p-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full">
            <div className="px-6 py-3 bg-gray-900 rounded-full">
              <span className="text-white font-medium">🔗 Connect Wallet First</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">🎨 Character Minting</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Mint unique characters to expand your collection and build your battle team
        </p>
      </div>

      {/* Minting Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-10 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-400">✨ Mint New Character</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-purple-400 mb-4">What You&apos;ll Get</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Random character from 12 unique classes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Unique name generation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>Balanced stats (25 total points)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span>High-quality character art</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/50">
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Stat System</h4>
              <div className="grid grid-cols-5 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-red-400 font-bold">STR</div>
                  <div className="text-gray-400">Strength</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">AGI</div>
                  <div className="text-gray-400">Agility</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">SPD</div>
                  <div className="text-gray-400">Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold">RES</div>
                  <div className="text-gray-400">Resistance</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold">VIT</div>
                  <div className="text-gray-400">Vitality</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleMint}
              disabled={isMinting}
              className={`mint-button px-12 py-6 rounded-2xl text-2xl font-bold transition-all duration-500 ${
                isMinting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105'
              }`}
            >
              {isMinting ? 'Minting...' : '🎲 Mint Character'}
            </button>

            {isMinting && (
              <div className="mt-8 space-y-4">
                <div className="loading-spinner rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent mx-auto"></div>
                <p className="text-purple-400 text-lg font-medium">Generating your character...</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Last Minted Character */}
      {lastMinted && (
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/50 p-8 rounded-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">New Character Minted!</h3>
            <p className="text-gray-300">Welcome to your collection!</p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/50">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative group">
                <img
                  src={lastMinted.imageUrl}
                  alt={lastMinted.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-green-500/50 group-hover:border-green-400 transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">{lastMinted.name}</h4>
                <div className="inline-block bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-3">
                  {lastMinted.class}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{lastMinted.description}</p>
                
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">STR</div>
                    <div className="text-2xl font-bold text-red-400">{lastMinted.stats.str}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">AGI</div>
                    <div className="text-2xl font-bold text-blue-400">{lastMinted.stats.agi}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">SPD</div>
                    <div className="text-2xl font-bold text-green-400">{lastMinted.stats.spd}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">RES</div>
                    <div className="text-2xl font-bold text-yellow-400">{lastMinted.stats.res}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">VIT</div>
                    <div className="text-2xl font-bold text-purple-400">{lastMinted.stats.vit}</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-lg text-gray-400">Total HP: </span>
                  <span className="text-3xl font-bold text-green-400">{lastMinted.hp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collection Summary */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
        <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">📚 Your Collection</h3>
        
        {characters.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📭</div>
            <p className="text-xl text-gray-400 mb-2">No characters in your collection yet</p>
            <p className="text-gray-500">Start minting to build your roster!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <div key={character.id} className="character-card bg-gray-700/50 p-4 rounded-xl border border-gray-600/50 group">
                <div className="relative mb-4">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-full h-32 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600/80 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {character.class}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                    {character.name}
                  </h4>
                  
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-400">STR</div>
                      <div className="font-bold text-red-400">{character.stats.str}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">AGI</div>
                      <div className="font-bold text-blue-400">{character.stats.agi}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">SPD</div>
                      <div className="font-bold text-green-400">{character.stats.spd}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">RES</div>
                      <div className="font-bold text-yellow-400">{character.stats.res}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">VIT</div>
                      <div className="font-bold text-purple-400">{character.stats.vit}</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-400">HP: </span>
                    <span className="font-bold text-green-400">{character.hp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {characters.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-purple-600/20 text-purple-300 px-6 py-3 rounded-full">
              <span className="font-medium">Total Characters: {characters.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
