import { Character } from '../types/game';

export const CHARACTER_CLASSES: Omit<Character, 'id' | 'name' | 'hp' | 'maxHp'>[] = [
  {
    class: "Brute",
    stats: { str: 10, agi: 4, spd: 3, res: 5, vit: 3 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeid6xf3jak3unybcxkxz4rg3arkn7nf6pqwb3nb66cz2tmlhafiale",
    description: "High damage, low speed glass cannon.",
    mainAttr: "STR"
  },
  {
    class: "Brawler",
    stats: { str: 8, agi: 5, spd: 4, res: 4, vit: 4 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeibdbbdz2lpojtpy3gtfxbhe4livztydhvvxbj3ukicqnxz5cfmx3u",
    description: "A balanced strength-based attacker.",
    mainAttr: "STR"
  },
  {
    class: "Assassin",
    stats: { str: 5, agi: 10, spd: 5, res: 3, vit: 2 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeid6n66uuo6zbkct5jzjdthozj7jv5suoptxiwi3vtsucczt52kb2e",
    description: "Extreme crit chance, very fragile.",
    mainAttr: "AGI"
  },
  {
    class: "Duelist",
    stats: { str: 4, agi: 8, spd: 6, res: 4, vit: 3 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeigsjlnma7cxsycnh4hcqq6cirdqlx2tdima6vdwkcgdjbde3nlu3y",
    description: "Agile fighter with good speed.",
    mainAttr: "AGI"
  },
  {
    class: "Swiftblade",
    stats: { str: 5, agi: 6, spd: 9, res: 3, vit: 2 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeidk2dxutve4uuanngyug2qnbrs2hr66g5axnpbmf6mbnnipvbrozm",
    description: "Attacks first, applies debuffs.",
    mainAttr: "SPD"
  },
  {
    class: "Windrunner",
    stats: { str: 4, agi: 5, spd: 8, res: 4, vit: 4 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeihv7fw46lwjp77ztjn4v4cu7pemsadwnfqay6r4jx4wrksm73zlgm",
    description: "Fast and evasive skirmisher.",
    mainAttr: "SPD"
  },
  {
    class: "Guardian",
    stats: { str: 4, agi: 3, spd: 3, res: 10, vit: 5 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeidbt5ccb4mjvxalbpeautjbbtzqldnjkh4gx42upswljdy2kljo6i",
    description: "Extreme damage sponge, very slow.",
    mainAttr: "RES"
  },
  {
    class: "Sentinel",
    stats: { str: 3, agi: 4, spd: 4, res: 8, vit: 6 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeifdjbygqmmpds4lvblldensdv7bdmzhh4uxaqo5myratcgy7a4m3i",
    description: "Defensive wall with high HP.",
    mainAttr: "RES"
  },
  {
    class: "Juggernaut",
    stats: { str: 6, agi: 2, spd: 2, res: 6, vit: 9 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeihgpdtrhaxhqiq5xlt3zquez6oi3jj7ilalw2fb2ypqvykiagok2q",
    description: "High HP pool, decent damage/defense.",
    mainAttr: "VIT"
  },
  {
    class: "Titan",
    stats: { str: 5, agi: 3, spd: 3, res: 5, vit: 9 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeibmo4gzduxr4uedvhe6xvx4yc4gqz3lecw2fy5dal7jr7nfhtbrii",
    description: "Pure health tank.",
    mainAttr: "VIT"
  },
  {
    class: "Battle Sage",
    stats: { str: 7, agi: 3, spd: 3, res: 7, vit: 5 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeif2me6pewh22u3jjpry3vskgbfucpoodw63chp35rtllyxohpeifq",
    description: "RARE Hybrid, offensive and defensive.",
    mainAttr: "STR/RES"
  },
  {
    class: "Shadow Weaver",
    stats: { str: 2, agi: 8, spd: 8, res: 2, vit: 5 },
    imageUrl: "https://blush-peculiar-fowl-927.mypinata.cloud/ipfs/bafybeihdags2usivqldtrc5lyoyjaz7lnofr246wvnr2zmyhqqcdk6qole",
    description: "RARE Hybrid, extremely fast with high crit.",
    mainAttr: "AGI/SPD"
  }
];

export const generateCharacterName = (className: string): string => {
  const prefixes = ['Brave', 'Mighty', 'Swift', 'Ancient', 'Legendary', 'Dark', 'Light', 'Storm', 'Shadow', 'Golden'];
  const suffixes = ['Warrior', 'Guardian', 'Champion', 'Hero', 'Legend', 'Master', 'Lord', 'Knight', 'Defender', 'Protector'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${className} ${suffix}`;
};


