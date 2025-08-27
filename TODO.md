Project: Baselisk: The On-Chain Arena (Web2 Prototype)
Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS

Objective: Create a functional web game prototype that simulates the intended blockchain game mechanics. This includes character minting (simulated), team management, and online PvP battle matching. The backend will handle the game logic and live battle queue.

Core Requirements:

1. Simulated Wallet & NFT Ownership:

    Create a User context that stores a simulated wallet address and an array of Character objects the user "owns".

    Implement a "Mint" button. Clicking it should randomly generate a new Character (from the 12 predefined classes) and add it to the user's collection. This simulates the NFT minting process without a blockchain.

2. Character System:

    Define a TypeScript Character interface with: id: string, name: string, class: string, stats: { str: number, agi: number, spd: number, res: number, vit: number }, hp: number, maxHp: number, position?: number.

    Predefine the 12 character classes exactly as specified in the previous GDD table (Brute, Brawler, etc.), each with their fixed stat allocations (25 total points). hp is calculated as vit * 10.

3. Team Management:

    Create a "Collection" page where users can view their minted characters.

    Users must be able to select exactly 3 characters to form their "Battle Team". This team should be saved to the user's context/localStorage.

4. Online PvP Battle Arena:

    Implement a Next.js API Route (/api/battle/queue) that acts as a WebSocket-like hub using Server-Sent Events (SSE) or long polling for simplicity.

    When a user with a full team clicks "Find Match", the frontend sends a POST request to /api/battle/queue with the user's ID and team data.

    The backend maintains a pool of waiting players. When two players are in the pool, it matches them, generates a unique battleId, and starts a game simulation on the server.

    The frontend then opens a long-lived connection to GET /api/battle/stream?battleId=123 to receive real-time updates on the battle's turn-by-turn progress.

5. Battle Mechanics (Backend Logic):

    The battle is a turn-based simulation run on the server.

    Turn Order: All 6 characters (3 from each team) are pooled. The server sorts them by their spd stat in descending order to determine the attack sequence.

    Positioning: Assign a position (1, 2, 3) to each character in a team. This can be used to simple targeting rules (e.g., characters can only attack the frontmost living opponent, or attacks are random).

    On a character's turn:

        Target Selection: Based on the positioning rules (e.g., random enemy, or target enemy in position 1 first).

        Dodge Check: Calculate dodgeChance = (targetAgi - attackerAgi) * 0.02. Cap between 5% and 35%. Roll a random number to see if the attack misses.

        Crit Check: Calculate critChance = attackerAgi * 0.015. Cap between 5% and 50%. Roll for a critical hit.

        Damage Calculation:
        baseDmg = attackerStr
        dmgReduction = targetRes / 2
        finalDmg = Math.max(1, baseDmg - dmgReduction)
        if (crit) { finalDmg *= 2 }

        Update HP: Subtract finalDmg from the target's currentHp.

        Log the event.

    The battle continues until all characters on one team have hp <= 0.

6. Frontend Battle Display:

    Create a battle screen that listens to the SSE stream from GET /api/battle/stream.

    Display the two teams facing each other, showing their art, stats, and current HP.

    Animate the battle log, printing out each event (e.g., "Brute attacks Sentinel for 12 damage! CRITICAL HIT!").

7. Deployment:

    The application must be ready to be deployed on Vercel.

    The backend API routes must handle the battle queueing and simulation.

Technical Specifications:

    Use modern React (hooks) and TypeScript.

    Use Tailwind CSS for styling. The design should be clean and mobile-first.

    Use zustand or React Context for state management to handle the user's collection and team.

    For the backend queue, use a simple in-memory store for now (e.g., const waitingPool: Array<{userId: string, team: Character[]}> = []). Note: This will not persist across Vercel serverless function instances, but is sufficient for a prototype.

Deliverables:

    A minting page to generate characters.

    A collection/team management page.

    An arena page to queue for and view live battles.

    Next.js API routes for /api/mint (simulated), /api/battle/queue, and /api/battle/stream.

    Full battle simulation logic implemented in the backend.


This is the configuration for the characters and its stats:
[
  {
    "CLASS_NAME": "Brute",
    "MAIN_ATTR": "STR",
    "STR": 10,
    "AGI": 4,
    "SPD": 3,
    "RES": 5,
    "VIT": 3,
    "HP": 30,
    "DESCRIPTION": "High damage, low speed glass cannon.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeid6xf3jak3unybcxkxz4rg3arkn7nf6pqwb3nb66cz2tmlhafiale"
  },
  {
    "CLASS_NAME": "Brawler",
    "MAIN_ATTR": "STR",
    "STR": 8,
    "AGI": 5,
    "SPD": 4,
    "RES": 4,
    "VIT": 4,
    "HP": 40,
    "DESCRIPTION": "A balanced strength-based attacker.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeibdbbdz2lpojtpy3gtfxbhe4livztydhvvxbj3ukicqnxz5cfmx3u"
  },
  {
    "CLASS_NAME": "Assassin",
    "MAIN_ATTR": "AGI",
    "STR": 5,
    "AGI": 10,
    "SPD": 5,
    "RES": 3,
    "VIT": 2,
    "HP": 20,
    "DESCRIPTION": "Extreme crit chance, very fragile.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeid6n66uuo6zbkct5jzjdthozj7jv5suoptxiwi3vtsucczt52kb2e"
  },
  {
    "CLASS_NAME": "Duelist",
    "MAIN_ATTR": "AGI",
    "STR": 4,
    "AGI": 8,
    "SPD": 6,
    "RES": 4,
    "VIT": 3,
    "HP": 30,
    "DESCRIPTION": "Agile fighter with good speed.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeigsjlnma7cxsycnh4hcqq6cirdqlx2tdima6vdwkcgdjbde3nlu3y"
  },
  {
    "CLASS_NAME": "Swiftblade",
    "MAIN_ATTR": "SPD",
    "STR": 5,
    "AGI": 6,
    "SPD": 9,
    "RES": 3,
    "VIT": 2,
    "HP": 20,
    "DESCRIPTION": "Attacks first, applies debuffs.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeidk2dxutve4uuanngyug2qnbrs2hr66g5axnpbmf6mbnnipvbrozm"
  },
  {
    "CLASS_NAME": "Windrunner",
    "MAIN_ATTR": "SPD",
    "STR": 4,
    "AGI": 5,
    "SPD": 8,
    "RES": 4,
    "VIT": 4,
    "HP": 40,
    "DESCRIPTION": "Fast and evasive skirmisher.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeihv7fw46lwjp77ztjn4v4cu7pemsadwnfqay6r4jx4wrksm73zlgm"
  },
  {
    "CLASS_NAME": "Guardian",
    "MAIN_ATTR": "RES",
    "STR": 4,
    "AGI": 3,
    "SPD": 3,
    "RES": 10,
    "VIT": 5,
    "HP": 50,
    "DESCRIPTION": "Extreme damage sponge, very slow.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeidbt5ccb4mjvxalbpeautjbbtzqldnjkh4gx42upswljdy2kljo6i"
  },
  {
    "CLASS_NAME": "Sentinel",
    "MAIN_ATTR": "RES",
    "STR": 3,
    "AGI": 4,
    "SPD": 4,
    "RES": 8,
    "VIT": 6,
    "HP": 60,
    "DESCRIPTION": "Defensive wall with high HP.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeifdjbygqmmpds4lvblldensdv7bdmzhh4uxaqo5myratcgy7a4m3i"
  },
  {
    "CLASS_NAME": "Juggernaut",
    "MAIN_ATTR": "VIT",
    "STR": 6,
    "AGI": 2,
    "SPD": 2,
    "RES": 6,
    "VIT": 9,
    "HP": 90,
    "DESCRIPTION": "High HP pool, decent damage/defense.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeihgpdtrhaxhqiq5xlt3zquez6oi3jj7ilalw2fb2ypqvykiagok2q"
  },
  {
    "CLASS_NAME": "Titan",
    "MAIN_ATTR": "VIT",
    "STR": 5,
    "AGI": 3,
    "SPD": 3,
    "RES": 5,
    "VIT": 9,
    "HP": 90,
    "DESCRIPTION": "Pure health tank.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeibmo4gzduxr4uedvhe6xvx4yc4gqz3lecw2fy5dal7jr7nfhtbrii"
  },
  {
    "CLASS_NAME": "Battle Sage",
    "MAIN_ATTR": "STR/RES",
    "STR": 7,
    "AGI": 3,
    "SPD": 3,
    "RES": 7,
    "VIT": 5,
    "HP": 50,
    "DESCRIPTION": "RARE Hybrid, offensive and defensive.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeif2me6pewh22u3jjpry3vskgbfucpoodw63chp35rtllyxohpeifq"
  },
  {
    "CLASS_NAME": "Shadow Weaver",
    "MAIN_ATTR": "AGI/SPD",
    "STR": 2,
    "AGI": 8,
    "SPD": 8,
    "RES": 2,
    "VIT": 5,
    "HP": 50,
    "DESCRIPTION": "RARE Hybrid, extremely fast with high crit.",
    "IMAGE_URL": "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeihdags2usivqldtrc5lyoyjaz7lnofr246wvnr2zmyhqqcdk6qole"
  }
]