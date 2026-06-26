import React from "react";

export default function SoundwavePattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Concentric rings representing sound waves */}
        <div className="w-[300px] h-[300px] rounded-full border border-brand-magenta/30 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-brand-coral/20 animate-pulse [animation-delay:0.3s]" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-brand-magenta/10 animate-pulse [animation-delay:0.6s]" />
        <div className="absolute w-[900px] h-[900px] rounded-full border border-brand-cyan/10 animate-pulse [animation-delay:0.9s]" />
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-white/5 animate-pulse [animation-delay:1.2s]" />
      </div>
      
      {/* Dynamic soundwaves at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1.5 px-4 opacity-30">
        <div className="w-1.5 h-12 bg-brand-magenta rounded-full animate-wave-1"></div>
        <div className="w-1.5 h-20 bg-brand-coral rounded-full animate-wave-2"></div>
        <div className="w-1.5 h-16 bg-brand-neon rounded-full animate-wave-3"></div>
        <div className="w-1.5 h-24 bg-brand-cyan rounded-full animate-wave-4"></div>
        <div className="w-1.5 h-14 bg-brand-magenta rounded-full animate-wave-5"></div>
        <div className="w-1.5 h-18 bg-brand-coral rounded-full animate-wave-2"></div>
        <div className="w-1.5 h-10 bg-brand-neon rounded-full animate-wave-1"></div>
        <div className="w-1.5 h-20 bg-brand-cyan rounded-full animate-wave-3"></div>
        <div className="w-1.5 h-14 bg-brand-magenta rounded-full animate-wave-4"></div>
      </div>
    </div>
  );
}
