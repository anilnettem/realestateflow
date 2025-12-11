import React from 'react';
import LeadCard, { Lead } from './LeadCard';

export default function LeadsList({ leads, onMessage, onAssign }: { leads: Lead[]; onMessage?: (id: string) => void; onAssign?: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {leads.map((l) => (
        <LeadCard key={l.id} lead={l} onMessage={() => onMessage?.(l.id)} onAssign={() => onAssign?.(l.id)} />
      ))}
    </div>
  );
}
