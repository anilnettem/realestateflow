import React from 'react';

export default function Avatar({ src, alt = 'avatar', size = 40 }: { src?: string; alt?: string; size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="rounded-full overflow-hidden bg-gray-100">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">{alt[0]}</div>
      )}
    </div>
  );
}
