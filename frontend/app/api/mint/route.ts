import { NextResponse } from 'next/server';
import { CHARACTER_CLASSES, generateCharacterName } from '../../data/characters';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  try {
    // Simulate blockchain delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Randomly select a character class
    const randomClass = CHARACTER_CLASSES[Math.floor(Math.random() * CHARACTER_CLASSES.length)];
    
    // Generate unique character
    const newCharacter = {
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

    return NextResponse.json({
      success: true,
      character: newCharacter,
      message: `Successfully minted ${newCharacter.name}!`
    });
  } catch (error) {
    console.error('Minting error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to mint character' },
      { status: 500 }
    );
  }
}
