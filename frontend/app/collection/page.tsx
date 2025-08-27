'use client';

import { useGameStore } from '../store/gameStore';
import { Character } from '../types/game';

export default function CollectionPage() {
  const { walletAddress, characters, battleTeam, addToBattleTeam, removeFromBattleTeam, clearBattleTeam } = useGameStore();

  const isInTeam = (characterId: string) => {
    return battleTeam.some(char => char.id === characterId);
  };

  const handleAddToTeam = (character: Character) => {
    if (battleTeam.length >= 3) return;
    addToBattleTeam(character);
  };

  const handleRemoveFromTeam = (characterId: string) => {
    removeFromBattleTeam(characterId);
  };

  if (!walletAddress) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400">You need to connect your wallet to view your collection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">📚 Your Collection</h1>
        <p className="text-xl text-gray-300">
          Manage your characters and build your battle team
        </p>
      </div>

      {/* Battle Team Section */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-400">⚔️ Battle Team</h2>
          {battleTeam.length > 0 && (
            <button
              onClick={clearBattleTeam}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Team
            </button>
          )}
        </div>

        {battleTeam.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg mb-2">No characters selected</p>
            <p className="text-sm">Select 3 characters from your collection to form your battle team</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {battleTeam.map((character) => (
              <div key={character.id} className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                <div className="text-center mb-3">
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Position {character.position}
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{character.name}</h4>
                    <p className="text-green-400 font-medium">{character.class}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-1 mb-3 text-xs">
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
                
                <div className="text-center mb-3">
                  <span className="text-sm text-gray-400">HP: </span>
                  <span className="font-bold text-green-400">{character.hp}</span>
                </div>
                
                <button
                  onClick={() => handleRemoveFromTeam(character.id)}
                  className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Remove from Team
                </button>
              </div>
            ))}
          </div>
        )}

        {battleTeam.length === 3 && (
          <div className="mt-6 text-center">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg inline-block">
              <span className="text-lg font-bold">🎉 Team Complete!</span>
              <p className="text-sm">You&apos;re ready to enter the arena!</p>
            </div>
          </div>
        )}
      </div>

      {/* Character Collection */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">All Characters</h2>
        
        {characters.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg mb-2">No characters in your collection</p>
            <p className="text-sm">Head to the Mint page to create your first character</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {characters.map((character) => (
              <div key={character.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{character.name}</h4>
                    <p className="text-purple-400 text-sm">{character.class}</p>
                    <p className="text-gray-400 text-xs truncate">{character.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-1 mb-3 text-xs">
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
                
                <div className="text-center mb-3">
                  <span className="text-sm text-gray-400">HP: </span>
                  <span className="font-bold text-green-400">{character.hp}</span>
                </div>
                
                {isInTeam(character.id) ? (
                  <button
                    disabled
                    className="w-full px-3 py-2 bg-gray-600 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    In Battle Team
                  </button>
                ) : battleTeam.length >= 3 ? (
                  <button
                    disabled
                    className="w-full px-3 py-2 bg-gray-600 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    Team Full
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToTeam(character)}
                    className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Add to Team
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
