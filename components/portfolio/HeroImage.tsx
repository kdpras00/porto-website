'use client';

export default function HeroImage() {
  return (
    <div className="absolute bottom-0 md:-bottom-48 left-1/2 -translate-x-1/2 z-10 w-full h-[65vh] md:h-[110vh] flex justify-center items-end pointer-events-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/default-img.webp?v=2" 
        alt="Kurniawan Dwi Prasetyo"
        className="h-full w-auto max-w-none object-contain object-bottom pointer-events-none
                   brightness-95 grayscale contrast-125 
                   drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}
