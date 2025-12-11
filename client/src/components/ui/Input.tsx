import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, className = '', ...rest }: InputProps) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm text-gray-700">{label}</div>}
      <input className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200 ${className}`} {...rest} />
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  );
}
