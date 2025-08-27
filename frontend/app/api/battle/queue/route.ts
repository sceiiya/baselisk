import { NextRequest, NextResponse } from 'next/server';
import { battleStateManager } from '../../../lib/battleState';
import { WaitingPlayer } from '../../../types/game';

export async function POST(request: NextRequest) {
  try {
    const { userId, team } = await request.json();

    if (!userId || !team || team.length !== 3) {
      return NextResponse.json(
        { success: false, message: 'Invalid team data' },
        { status: 400 }
      );
    }

    // Add player to waiting pool using shared state manager
    const newPlayer: WaitingPlayer = {
      userId,
      team,
      timestamp: Date.now()
    };

    const battleId = battleStateManager.addToWaitingPool(newPlayer);

    if (battleId) {
      // Match found!
      return NextResponse.json({
        success: true,
        battleId,
        message: 'Match found! Battle starting...'
      });
    } else {
      // Still waiting for opponent
      return NextResponse.json({
        success: true,
        message: 'Added to queue. Waiting for opponent...'
      });
    }

  } catch (error) {
    console.error('Queue error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to join queue' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const status = battleStateManager.getWaitingPoolStatus();
  return NextResponse.json(status);
}
