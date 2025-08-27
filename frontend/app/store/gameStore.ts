import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Character } from '../types/game';
import { CHARACTER_CLASSES, generateCharacterName } from '../data/characters';

interface GameState {
  walletAddress: string;
  characters: Character[];
  battleTeam: Character[];
  isInQueue: boolean;
  currentBattleId: string | null;
  
  // Actions
  generateWallet: () => void;
  mintCharacter: () => void;
  addToBattleTeam: (character: Character) => void;
  removeFromBattleTeam: (characterId: string) => void;
  clearBattleTeam: () => void;
  setInQueue: (inQueue: boolean) => void;
  setCurrentBattle: (battleId: string | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      walletAddress: '',
      characters: [],
      battleTeam: [],
      isInQueue: false,
      currentBattleId: null,

      generateWallet: () => {
        const address = '0x' + Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('');
        set({ walletAddress: address });
      },

      mintCharacter: () => {
        const randomClass = CHARACTER_CLASSES[Math.floor(Math.random() * CHARACTER_CLASSES.length)];
        const newCharacter: Character = {
          id: uuidv4(),
          name: generateCharacterName(randomClass.class),
          class: randomClass.class,
          stats: randomClass.stats,
          hp: randomClass.stats.vit * 10,
          maxHp: randomClass.stats.vit * 10,
          imageUrl: randomClass.imageUrl,
          description: randomClass.description,
          mainAttr: randomClass.mainAttr,
        };
        
        set((state) => ({
          characters: [...state.characters, newCharacter]
        }));
      },

      addToBattleTeam: (character: Character) => {
        const { battleTeam } = get();
        if (battleTeam.length >= 3) return;
        
        set((state) => ({
          battleTeam: [...state.battleTeam, { ...character, position: battleTeam.length + 1 }]
        }));
      },

      removeFromBattleTeam: (characterId: string) => {
        set((state) => ({
          battleTeam: state.battleTeam
            .filter(char => char.id !== characterId)
            .map((char, index) => ({ ...char, position: index + 1 }))
        }));
      },

      clearBattleTeam: () => {
        set({ battleTeam: [] });
      },

      setInQueue: (inQueue: boolean) => {
        set({ isInQueue: inQueue });
      },

      setCurrentBattle: (battleId: string | null) => {
        set({ currentBattleId: battleId });
      },

      resetGame: () => {
        set({
          characters: [],
          battleTeam: [],
          isInQueue: false,
          currentBattleId: null
        });
      },
    }),
    {
      name: 'baselisk-game-storage',
      partialize: (state) => ({
        walletAddress: state.walletAddress,
        characters: state.characters,
        battleTeam: state.battleTeam,
      }),
    }
  )
);
