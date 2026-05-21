'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ScrambleHeroTextProps = {
  text: string;
  className?: string;
  scrambleColor?: string;
  finalColor?: string;
  speed?: number;
  delayStep?: number;
  cursorIndexes?: number[];
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';

export function ScrambleHeroText({ text, className = '', scrambleColor = 'var(--color-major)', finalColor = 'var(--foreground)', speed = 30, delayStep = 60, cursorIndexes = [] }: ScrambleHeroTextProps) {
  const [displayText, setDisplayText] = useState<string | null>(null);
  const [settledIndexes, setSettledIndexes] = useState<boolean[]>(Array(text.length).fill(true));

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const isVisibleRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    intervalsRef.current.forEach(clearInterval);
    timeoutsRef.current = [];
    intervalsRef.current = [];
  }, []);

  const resetToFinalText = useCallback(() => {
    setDisplayText(null);
    setSettledIndexes(Array(text.length).fill(true));
  }, [text]);

  const renderedText = displayText ?? text;

  const runScramble = useCallback(() => {
    clearTimers();

    const chars = text.split('');
    const current = [...chars];

    setDisplayText(text);
    setSettledIndexes(Array(text.length).fill(false));

    chars.forEach((char, index) => {
      if (char === ' ') {
        setSettledIndexes((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        return;
      }

      const timeout = setTimeout(() => {
        let ticks = 0;
        const settle = 10 + Math.floor(Math.random() * 1);

        const interval = setInterval(() => {
          if (ticks >= settle) {
            current[index] = char;

            setSettledIndexes((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });

            setDisplayText(current.join(''));
            clearInterval(interval);
            return;
          }

          current[index] = CHARS[Math.floor(Math.random() * CHARS.length)];
          setDisplayText(current.join(''));
          ticks++;
        }, speed);

        intervalsRef.current.push(interval);
      }, index * delayStep);

      timeoutsRef.current.push(timeout);
    });
  }, [text, speed, delayStep, clearTimers]);

  useEffect(() => {
    const node = headingRef.current;
    if (!node) {
      return () => {
        clearTimers();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            runScramble();
          }
          return;
        }

        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          clearTimers();
          resetToFinalText();
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      isVisibleRef.current = false;
      clearTimers();
    };
  }, [runScramble, clearTimers, resetToFinalText]);

  return (
    <h1 ref={headingRef} className={`scramble-hero-text cursor-pointer select-none ${className}`} onClick={runScramble} title="Click para reiniciar la animación">
      {renderedText.split('').map((char, index) => (
        <span
          key={index}
          className={`scramble-char ${cursorIndexes.includes(index) ? 'scramble-char-terminal-cursor' : ''}`}
          style={{
            color: settledIndexes[index] || char === ' ' ? finalColor : scrambleColor,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}
