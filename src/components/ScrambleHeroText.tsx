'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ScrambleHeroTextProps = {
  text: string;
  className?: string;
  scrambleColor?: string;
  finalColor?: string;
  speed?: number;
  delayStep?: number;
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';

export function ScrambleHeroText({ text, className = '', scrambleColor = '#80FF80', finalColor = '#ADB5BD', speed = 50, delayStep = 50 }: ScrambleHeroTextProps) {
  const [displayText, setDisplayText] = useState(text);
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
    setDisplayText(text);
    setSettledIndexes(Array(text.length).fill(true));
  }, [text]);

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
    resetToFinalText();

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
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      isVisibleRef.current = false;
      clearTimers();
      resetToFinalText();
    };
  }, [runScramble, clearTimers, resetToFinalText]);

  return (
    <h1 ref={headingRef} className={`scramble-hero-text cursor-pointer select-none ${className}`} onClick={runScramble} title="Click para reiniciar la animación">
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className="scramble-char"
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
