'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGameStore } from '../store/gameStore';

export default function Navigation() {
  const pathname = usePathname();
  const { walletAddress, generateWallet } = useGameStore();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/mint', label: 'Mint' },
    { href: '/collection', label: 'Collection' },
    { href: '/arena', label: 'Arena' },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-purple-400">
              🐉 Baselisk
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="text-sm text-gray-300">
                <span className="hidden sm:inline">Wallet: </span>
                <span className="font-mono text-purple-400">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={generateWallet}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
