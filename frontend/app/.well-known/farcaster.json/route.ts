import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    frame: {
      name: "Baselisk",
      version: "1",
      iconUrl: "https://baselisk.vercel.app/favicon.ico",
      homeUrl: "https://baselisk.vercel.app",
      imageUrl: "https://baselisk.vercel.app/image.png",
      splashImageUrl: "https://baselisk.vercel.app/splash.png",
      splashBackgroundColor: "#A100FF",
      webhookUrl: "https://baselisk.vercel.app/api/webhook",
      description: "Players mint randomized, on-chain character NFTs (Basilisks) with unique stat distributions. They form a team of three and compete in fully on-chain automated battles, with outcomes determined by verifiable smart contract logic.",
      subtitle: "The On-Chain Arena",
      primaryCategory: "games"
    }
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
