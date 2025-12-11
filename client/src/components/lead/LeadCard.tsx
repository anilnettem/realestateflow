import React from 'react';
import StatusPill from '../ui/StatusPill';

export type Lead = {
  id: string;
  name?: string;
  phone?: string;
  source?: string;
  status?: 'hot' | 'warm' | 'cold' | 'lost';
};

export default function LeadCard({ lead, onMessage, onAssign }: { lead: Lead; onMessage?: () => void; onAssign?: () => void }) {
  return (
    <div className="border rounded p-3 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{lead.name ?? '—'}</div>
          <div className="text-sm text-gray-500">{lead.phone ?? 'No phone'}</div>
          <div className="text-xs text-gray-400">{lead.source}</div>
        </div>
        <div className="text-right">
          <StatusPill status={lead.status ?? 'cold'} />
        </div>
      </div>
      <div className="mt-3 flex space-x-2">
        <button onClick={onMessage} className="text-sm px-3 py-1 rounded bg-blue-50">
          Message
        </button>
        <button onClick={onAssign} className="text-sm px-3 py-1 rounded bg-gray-50">
          Assign
        </button>
      </div>
    </div>
  );
}
