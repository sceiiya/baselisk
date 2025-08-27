'use client';

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export default function ArenaPage() {
  const { walletAddress, battleTeam, isInQueue, setInQueue, setCurrentBattle } = useGameStore();
  const [queueStatus, setQueueStatus] = useState<string>('');
  const [battleId, setBattleId] = useState<string | null>(null);
  const [battleEvents, setBattleEvents] = useState<string[]>([]);

  const handleFindMatch = async () => {
    if (battleTeam.length !== 3) return;

    setInQueue(true);
    setQueueStatus('Searching for opponent...');

    try {
      const response = await fetch('/api/battle/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: walletAddress,
          team: battleTeam,
        }),
      });

      const data = await response.json();

      if (data.success && data.battleId) {
        setBattleId(data.battleId);
        setCurrentBattle(data.battleId);
        setInQueue(false);
        setQueueStatus('Match found! Battle starting...');
        
        // Start listening to battle stream
        startBattleStream(data.battleId);
      } else {
        setQueueStatus(data.message || 'Added to queue. Waiting for opponent...');
      }
    } catch (error) {
      console.error('Failed to join queue:', error);
      setQueueStatus('Failed to join queue. Please try again.');
      setInQueue(false);
    }
  };

  const startBattleStream = (battleId: string) => {
    const eventSource = new EventSource(`/api/battle/stream?battleId=${battleId}`);
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'battle_start') {
          setBattleEvents(prev => [...prev, `🚀 Battle ${battleId} has begun!`]);
        } else if (data.type === 'turn_update') {
          setBattleEvents(prev => [...prev, `⚔️ ${data.message}`]);
        } else if (data.type === 'battle_end') {
          setBattleEvents(prev => [...prev, `🏆 Battle ended! Winner: ${data.winner === 'team1' ? 'Your Team' : 'Opponent'}`]);
          eventSource.close();
        }
      } catch (error) {
        console.error('Failed to parse battle event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Battle stream error:', error);
      eventSource.close();
    };
  };

  const handleLeaveQueue = () => {
    setInQueue(false);
    setQueueStatus('');
  };

  if (!walletAddress) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-gray-400">You need to connect your wallet to enter the arena.</p>
      </div>
    );
  }

  if (battleTeam.length !== 3) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Team Incomplete</h2>
        <p className="text-gray-400 mb-6">You need exactly 3 characters in your battle team to enter the arena.</p>
        <a
          href="/collection"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Build Your Team
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">⚔️ Battle Arena</h1>
        <p className="text-xl text-gray-300">
          Enter the arena and battle other players for glory
        </p>
      </div>

      {/* Battle Team Display */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-green-400">Your Battle Team</h2>
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
              
              <div className="text-center">
                <span className="text-sm text-gray-400">HP: </span>
                <span className="font-bold text-green-400">{character.hp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Queue Section */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-blue-400">Find Battle</h2>
        
        {!isInQueue && !battleId ? (
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Ready to test your team? Click below to find an opponent!
            </p>
            <button
              onClick={handleFindMatch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
            >
              🎯 Find Match
            </button>
          </div>
        ) : isInQueue ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-lg text-blue-400 mb-4">{queueStatus}</p>
            <button
              onClick={handleLeaveQueue}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Leave Queue
            </button>
          </div>
        ) : null}
      </div>

      {/* Battle Status */}
      {battleId && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Battle in Progress</h2>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Battle ID:</span>
              <span className="font-mono text-yellow-400">{battleId}</span>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {battleEvents.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Waiting for battle events...</p>
              ) : (
                battleEvents.map((event, index) => (
                  <div key={index} className="text-sm text-gray-300 bg-gray-800 p-2 rounded">
                    {event}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Battle Rules */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Battle Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Turn Order</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Characters act based on their SPD stat (highest first)</li>
              <li>• Each character gets one action per turn cycle</li>
              <li>• Dead characters are skipped</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Combat Mechanics</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Dodge chance: (Target AGI - Attacker AGI) × 0.02 (5-35%)</li>
              <li>• Critical chance: Attacker AGI × 0.015 (5-50%)</li>
              <li>• Damage: STR - (Target RES ÷ 2), minimum 1</li>
              <li>• Critical hits deal double damage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
