"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Main dot follows instantly
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Larger follower has a slight lag for that "liquid" feel
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: 'rgba(251, 191, 36, 0.1)', // amber-400 with opacity
        borderColor: 'rgba(251, 191, 36, 0.5)',
        duration: 0.3
      });
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(251, 191, 36, 0.3)',
        duration: 0.3
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add listeners to all interactive elements
    const links = document.querySelectorAll('a, button, .magnetic');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkMobile);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Small central dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber-400 rounded-full z-[10000] pointer-events-none"
      />
      {/* Larger trailing circle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-amber-400/30 rounded-full z-[9999] pointer-events-none transition-transform duration-100 ease-out"
      />
    </>
  );
};

export default CustomCursor;
