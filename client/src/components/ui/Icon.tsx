import React from 'react';

export type IconProps = {
  name: 'search' | 'phone' | 'whatsapp' | 'user' | 'mail';
  size?: number;
  className?: string;
};

export default function Icon({ name, size = 20, className = '' }: IconProps) {
  const baseProps = { width: size, height: size, className: `inline-block ${className}` };

  switch (name) {
    case 'search':
      return (
        <svg {...baseProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      );
    case 'phone':
      return (
        <svg {...baseProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.84.36 1.66.72 2.44a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.64-1.64a2 2 0 0 1 2.11-.45c.78.36 1.6.6 2.44.72A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...baseProps} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .01 5.36 0 12c-.01 1.98.52 3.91 1.52 5.6L0 24l6.57-1.7A11.92 11.92 0 0 0 12 24c6.63 0 12-5.36 12-12 0-3.2-1.25-6.2-3.48-8.52z" />
        </svg>
      );
    case 'user':
      return (
        <svg {...baseProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    case 'mail':
      return (
        <svg {...baseProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16v16H4z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      );
    default:
      return null;
  }
}
