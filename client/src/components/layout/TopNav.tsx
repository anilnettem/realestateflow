import React from 'react';
import Icon from '../ui/Icon';
import Avatar from '../ui/Avatar';

export default function TopNav({ user }: { user?: { name: string; avatar?: string } }) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-3">
        <div className="text-xl font-bold text-blue-600">RealEstateFlow</div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 border rounded px-2 py-1">
          <Icon name="search" />
          <input placeholder="Search leads" className="outline-none" />
        </div>
        <Avatar src={user?.avatar} alt={user?.name ?? 'User'} />
      </div>
    </header>
  );
}
