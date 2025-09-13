'use client';

import { useScramble } from '@/lib/hooks/usescramble';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './scrambletext.module.scss';

type ScrambleTextProps = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  shouldScramble?: boolean;
  scrambleSpeed?: number;
  revealSpeed?: number;
  flashClassName?: string;
};

export function ScrambleText({
  children,
  as = 'span',
  className,
  style,
  shouldScramble = false,
  scrambleSpeed,
  revealSpeed,
  flashClassName,
}: ScrambleTextProps) {
  const [text, setText] = useState(children);
  const onScramble = useCallback((t: string) => setText(t), []);
  const { scramble, stopScramble } = useScramble(children, onScramble, {
    speed: scrambleSpeed,
    revealSpeed: revealSpeed,
  });

  // Keep internal text in sync if the source children changes (e.g., theme label cycles)
  useEffect(() => {
    setText(children);
  }, [children]);

  // Trigger scramble when shouldScramble prop changes
  useEffect(() => {
    if (shouldScramble) {
      scramble();
    }
  }, [shouldScramble, scramble]);

  // Mobile detection - hydration safe
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced scramble with mobile delay - only apply after hydration
  const handleScramble = useCallback(() => {
    if (mounted && isMobile) {
      // Add delay for mobile to make scramble more visible
      setTimeout(() => {
        scramble();
      }, 150);
    } else {
      scramble();
    }
  }, [mounted, isMobile, scramble]);

  const Comp = as as keyof React.JSX.IntrinsicElements;
  return (
    <Comp
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{
        ...style,
        // Ensure consistent width to prevent layout shift
        minWidth: 'fit-content',
        width: 'max-content',
      }}
      onMouseEnter={handleScramble}
      onMouseLeave={stopScramble}
      aria-label={text}
    >
      <span className={styles.placeholder} aria-hidden>
        {children}
      </span>
      <span className={`${styles.overlay} ${flashClassName || ''}`}>{text}</span>
    </Comp>
  );
}
