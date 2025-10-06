// components/AddressBook.tsx
'use client';
import { useState } from 'react';

export default function AddressBook({ onAddressSelect }: { onAddressSelect: (address: string) => void }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const addToFavorites = (address: string) => {
    if (address && !favorites.includes(address)) {
      setFavorites([...favorites, address]);
    }
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setShowFavorites(!showFavorites)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
      >
        <span>⭐</span>
        {favorites.length > 0 ? `Favorite Addresses (${favorites.length})` : 'Favorite Addresses'}
      </button>
      
      {showFavorites && (
        <div className="mt-2 p-3 border rounded-lg bg-gray-50">
          {favorites.length === 0 ? (
            <p className="text-sm text-gray-500">Favorite address is empty</p>
          ) : (
            <div className="space-y-2">
              {favorites.map((address, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-mono">{address.slice(0, 10)}...{address.slice(-8)}</span>
                  <button
                    onClick={() => onAddressSelect(address)}
                    className="text-blue-600 text-sm"
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}