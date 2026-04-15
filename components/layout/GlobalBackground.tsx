"use client";

import { memo } from 'react';

const GlobalBackground = memo(() => {
  return (
    <div className="global-bg">
      <div className="global-bg-gradient" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      {/* Subtle Glow Orbs - Made static for better performance */}
      <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-amber-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[15%] w-[25vw] h-[25vw] bg-orange-500/10 rounded-full blur-[100px]" />
    </div>
  );
});

GlobalBackground.displayName = 'GlobalBackground';

export default GlobalBackground;
