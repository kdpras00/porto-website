'use client';

export default function FooterMarquee() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap z-30 pointer-events-none pb-4">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <div className="inline-block animate-marquee w-[200%]">
        <span 
          className="font-display uppercase tracking-wider inline-block"
          style={{ 
            WebkitTextStroke: '1px rgba(255,255,255,0.15)',
            color: 'transparent',
            fontSize: 'clamp(60px, 15vw, 150px)',
            lineHeight: 0.8
          }}
        >
          KURNIAWAN DWI PRASETYO // FULL STACK DEVELOPER // KURNIAWAN DWI PRASETYO // FULL STACK DEVELOPER // KURNIAWAN DWI PRASETYO // FULL STACK DEVELOPER // KURNIAWAN DWI PRASETYO // FULL STACK DEVELOPER //
        </span>
      </div>
    </div>
  );
}
