import React from 'react';

export default function StatusPill({ status }: { status: 'hot' | 'warm' | 'cold' | 'lost' }) {
  const map = {
    hot: 'bg-red-100 text-red-700',
    warm: 'bg-yellow-100 text-yellow-800',
    cold: 'bg-gray-100 text-gray-800',
    lost: 'bg-gray-50 text-gray-500',
  } as const;
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>{status.toUpperCase()}</span>;
}
