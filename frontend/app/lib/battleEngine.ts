import { Character, BattleEvent, BattleState } from '../types/game';

export class BattleEngine {
  private battleState: BattleState;
  private turnIndex = 0;

  constructor(team1: Character[], team2: Character[]) {
    // Assign positions to characters
    const positionedTeam1 = team1.map((char, index) => ({ ...char, position: index + 1 }));
    const positionedTeam2 = team2.map((char, index) => ({ ...char, position: index + 1 }));

    // Create turn order based on speed
    const allCharacters = [...positionedTeam1, ...positionedTeam2];
    const turnOrder = allCharacters.sort((a, b) => b.stats.spd - a.stats.spd);

    this.battleState = {
      battleId: `battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      team1: positionedTeam1,
      team2: positionedTeam2,
      currentTurn: 1,
      turnOrder,
      events: [],
      isComplete: false,
    };
  }

  public getBattleState(): BattleState {
    return { ...this.battleState };
  }

  public simulateNextTurn(): BattleEvent | null {
    if (this.battleState.isComplete) return null;

    const currentCharacter = this.battleState.turnOrder[this.turnIndex];
    
    // Skip dead characters
    if (currentCharacter.hp <= 0) {
      this.turnIndex = (this.turnIndex + 1) % this.battleState.turnOrder.length;
      this.battleState.currentTurn++;
      return this.simulateNextTurn();
    }

    // Determine target
    const target = this.selectTarget(currentCharacter);
    if (!target) {
      this.turnIndex = (this.turnIndex + 1) % this.battleState.turnOrder.length;
      this.battleState.currentTurn++;
      return this.simulateNextTurn();
    }

    // Simulate attack
    const event = this.simulateAttack(currentCharacter, target);
    this.battleState.events.push(event);

    // Check if battle is complete
    if (this.checkBattleComplete()) {
      this.battleState.isComplete = true;
      this.battleState.winner = this.getTeam1AliveCount() === 0 ? 'team2' : 'team1';
    }

    // Move to next turn
    this.turnIndex = (this.turnIndex + 1) % this.battleState.turnOrder.length;
    this.battleState.currentTurn++;

    return event;
  }

  private selectTarget(attacker: Character): Character | null {
    const isAttackerTeam1 = this.battleState.team1.some(char => char.id === attacker.id);
    const targetTeam = isAttackerTeam1 ? this.battleState.team2 : this.battleState.team1;
    const aliveTargets = targetTeam.filter(char => char.hp > 0);
    
    if (aliveTargets.length === 0) return null;

    // Simple targeting: prioritize front position (position 1), then random
    const frontTarget = aliveTargets.find(char => char.position === 1);
    if (frontTarget) return frontTarget;
    
    return aliveTargets[Math.floor(Math.random() * aliveTargets.length)];
  }

  private simulateAttack(attacker: Character, target: Character): BattleEvent {
    // Dodge check
    const dodgeChance = Math.max(0.05, Math.min(0.35, (target.stats.agi - attacker.stats.agi) * 0.02));
    const isDodge = Math.random() < dodgeChance;

    if (isDodge) {
      return {
        type: 'dodge',
        attacker: attacker.name,
        target: target.name,
        message: `${attacker.name} attacks ${target.name} but they dodge!`,
        timestamp: Date.now()
      };
    }

    // Crit check
    const critChance = Math.max(0.05, Math.min(0.50, attacker.stats.agi * 0.015));
    const isCrit = Math.random() < critChance;

    // Damage calculation
    const baseDmg = attacker.stats.str;
    const dmgReduction = target.stats.res / 2;
    let finalDmg = Math.max(1, baseDmg - dmgReduction);
    
    if (isCrit) {
      finalDmg *= 2;
    }

    // Apply damage
    target.hp = Math.max(0, target.hp - finalDmg);

    // Create event message
    let message = `${attacker.name} attacks ${target.name} for ${finalDmg} damage!`;
    if (isCrit) {
      message += ' CRITICAL HIT!';
    }
    if (target.hp <= 0) {
      message += ` ${target.name} has fallen!`;
    }

    const event: BattleEvent = {
      type: isCrit ? 'critical' : 'attack',
      attacker: attacker.name,
      target: target.name,
      damage: finalDmg,
      message,
      timestamp: Date.now()
    };

    return event;
  }

  public checkBattleComplete(): boolean {
    return this.getTeam1AliveCount() === 0 || this.getTeam2AliveCount() === 0;
  }

  private getTeam1AliveCount(): number {
    return this.battleState.team1.filter(char => char.hp > 0).length;
  }

  private getTeam2AliveCount(): number {
    return this.battleState.team2.filter(char => char.hp > 0).length;
  }

  public simulateFullBattle(): BattleState {
    while (!this.battleState.isComplete) {
      this.simulateNextTurn();
    }
    return this.getBattleState();
  }
}
