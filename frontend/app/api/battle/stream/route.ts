import { NextRequest, NextResponse } from 'next/server';
import { battleStateManager } from '../../../lib/battleState';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const battleId = searchParams.get('battleId');

  if (!battleId) {
    return NextResponse.json({ error: 'Battle ID required' }, { status: 400 });
  }

  // Check if battle exists
  const battle = battleStateManager.getActiveBattle(battleId);
  if (!battle) {
    return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
  }

  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  };

  const stream = new ReadableStream({
    start(controller) {
      // Send initial battle state
      const initialState = battle.getBattleState();
      controller.enqueue(`data: ${JSON.stringify({ 
        type: 'battle_start', 
        battleId,
        state: initialState,
        message: 'Battle is starting...'
      })}\n\n`);

      // Subscribe to battle updates
      const unsubscribe = battleStateManager.subscribeToBattle(battleId, (data) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
          
          // Close stream if battle ended
          if (data.type === 'battle_end') {
            controller.close();
          }
        } catch (error) {
          console.error('Error sending battle update:', error);
        }
      });

      // Clean up on client disconnect
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        controller.close();
      });

      // Send heartbeat every 30 seconds to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(`data: ${JSON.stringify({ 
            type: 'heartbeat', 
            timestamp: Date.now() 
          })}\n\n`);
        } catch (error) {
          clearInterval(heartbeat);
        }
      }, 30000);

      // Clean up heartbeat on disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
      });
    }
  });

  return new Response(stream, { headers });
}
