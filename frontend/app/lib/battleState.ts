import { BattleEngine } from './battleEngine';
import { WaitingPlayer } from '../types/game';

// Define the battle update data type
interface BattleUpdate {
  type: 'battle_start' | 'turn_update' | 'battle_state' | 'battle_end';
  battleId: string;
  state?: unknown;
  turn?: number;
  events?: unknown[];
  winner?: string;
  message: string;
}

// Shared in-memory state for battles
// Note: In production, this should be replaced with Redis or a database
export class BattleStateManager {
  private static instance: BattleStateManager;
  private waitingPool: WaitingPlayer[] = [];
  private activeBattles: Map<string, BattleEngine> = new Map();
  private battleSubscribers: Map<string, Set<(data: BattleUpdate) => void>> = new Map();

  private constructor() {}

  public static getInstance(): BattleStateManager {
    if (!BattleStateManager.instance) {
      BattleStateManager.instance = new BattleStateManager();
    }
    return BattleStateManager.instance;
  }

  // Add player to waiting pool
  public addToWaitingPool(player: WaitingPlayer): string | null {
    // Remove if already in queue
    const existingIndex = this.waitingPool.findIndex(p => p.userId === player.userId);
    if (existingIndex !== -1) {
      this.waitingPool.splice(existingIndex, 1);
    }

    this.waitingPool.push(player);

    // Check for match
    if (this.waitingPool.length >= 2) {
      const player1 = this.waitingPool.shift()!;
      const player2 = this.waitingPool.shift()!;

      // Create battle
      const battleEngine = new BattleEngine(player1.team, player2.team);
      const battleId = battleEngine.getBattleState().battleId;
      
      this.activeBattles.set(battleId, battleEngine);

      // Start battle simulation
      this.startBattleSimulation(battleId, battleEngine);

      return battleId;
    }

    return null;
  }

  // Get waiting pool status
  public getWaitingPoolStatus() {
    return {
      waitingCount: this.waitingPool.length,
      activeBattles: this.activeBattles.size
    };
  }

  // Get active battle
  public getActiveBattle(battleId: string): BattleEngine | undefined {
    return this.activeBattles.get(battleId);
  }

  // Subscribe to battle updates
  public subscribeToBattle(battleId: string, callback: (data: BattleUpdate) => void): () => void {
    if (!this.battleSubscribers.has(battleId)) {
      this.battleSubscribers.set(battleId, new Set());
    }

    const subscribers = this.battleSubscribers.get(battleId)!;
    subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        this.battleSubscribers.delete(battleId);
      }
    };
  }

  // Notify subscribers of battle update
  private notifySubscribers(battleId: string, data: BattleUpdate) {
    const subscribers = this.battleSubscribers.get(battleId);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in battle subscriber callback:', error);
        }
      });
    }
  }

  // Start battle simulation
  private startBattleSimulation(battleId: string, battleEngine: BattleEngine) {
    // Send initial state
    const initialState = battleEngine.getBattleState();
    this.notifySubscribers(battleId, {
      type: 'battle_start',
      battleId,
      state: initialState,
      message: 'Battle is starting...'
    });

    // Simulate battle turn by turn
    let turnCount = 0;
    const maxTurns = 50;
    
    const interval = setInterval(() => {
      turnCount++;
      
      if (turnCount > maxTurns || battleEngine.checkBattleComplete()) {
        // Battle ended
        const finalState = battleEngine.getBattleState();
        this.notifySubscribers(battleId, {
          type: 'battle_end',
          battleId,
          state: finalState,
          winner: finalState.winner || 'draw',
          message: 'Battle completed!'
        });
        
        clearInterval(interval);
        this.activeBattles.delete(battleId);
        this.battleSubscribers.delete(battleId);
        return;
      }

      // Simulate next turn
      const turnResult = battleEngine.simulateNextTurn();
      
      // Notify subscribers of turn update
      this.notifySubscribers(battleId, {
        type: 'turn_update',
        turn: turnCount,
        battleId,
        state: battleEngine.getBattleState(),
        events: turnResult ? [turnResult] : [],
        message: `Turn ${turnCount} completed`
      });

      // Send battle state update every few turns
      if (turnCount % 3 === 0) {
        this.notifySubscribers(battleId, {
          type: 'battle_state',
          turn: turnCount,
          battleId,
          state: battleEngine.getBattleState(),
          message: 'Battle state updated'
        });
      }

    }, 2000); // 2 seconds between turns
  }

  // Clean up battle
  public cleanupBattle(battleId: string) {
    this.activeBattles.delete(battleId);
    this.battleSubscribers.delete(battleId);
  }
}

// Export singleton instance
export const battleStateManager = BattleStateManager.getInstance();
