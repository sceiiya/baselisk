'use client'
import { useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export default function SDKInitializer() {
  useEffect(() => {
    const initSDK = async () => {
      try {
        await sdk.actions.ready()
        console.log('Farcaster miniapp SDK initialized successfully')
      } catch (error) {
        console.error('Failed to initialize SDK:', error)
      }
    }
    
    initSDK()
  }, [])

  return null // This component doesn't render anything
}
