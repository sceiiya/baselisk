export interface Character {
  id: string;
  name: string;
  class: string;
  stats: {
    str: number;
    agi: number;
    spd: number;
    res: number;
    vit: number;
  };
  hp: number;
  maxHp: number;
  position?: number;
  imageUrl: string;
  description: string;
  mainAttr: string;
}

export interface BattleTeam {
  userId: string;
  characters: Character[];
}

export interface BattleEvent {
  type: 'attack' | 'dodge' | 'critical' | 'death';
  attacker: string;
  target: string;
  damage?: number;
  message: string;
  timestamp: number;
}

export interface BattleState {
  battleId: string;
  team1: Character[];
  team2: Character[];
  currentTurn: number;
  turnOrder: Character[];
  events: BattleEvent[];
  isComplete: boolean;
  winner?: 'team1' | 'team2';
}

export interface WaitingPlayer {
  userId: string;
  team: Character[];
  timestamp: number;
}

export interface BattleQueueResponse {
  success: boolean;
  battleId?: string;
  message: string;
}

