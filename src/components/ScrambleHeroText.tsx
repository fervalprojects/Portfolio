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
  trailingUnderscoreOnComplete?: boolean;
};

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
const BASE_HEADING_CLASSNAME = 'inline-flex min-w-[14ch] cursor-pointer justify-start text-left leading-[1.05] font-extrabold select-none';
const BASE_CHAR_CLASSNAME = 'inline-flex w-[1ch] justify-center';

function getCharClassName(hasCursor: boolean) {
  if (!hasCursor) {
    return BASE_CHAR_CLASSNAME;
  }

  return `${BASE_CHAR_CLASSNAME} relative before:absolute before:top-[10%] before:right-[-0.08em] before:h-[80%] before:w-[0.12em] before:bg-major before:shadow-[0_0_8px_color-mix(in_srgb,var(--color-major)_75%,transparent)] before:content-[''] before:animate-[terminal-cursor-blink_1s_steps(1,end)_infinite]`;
}

function createMaskedText(text: string, randomize = false) {
  return text
    .split('')
    .map((char, index) => {
      if (char === ' ') {
        return ' ';
      }

      if (randomize) {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }

      return CHARS[(index * 7 + text.length) % CHARS.length];
    })
    .join('');
}

function createInitialSettledIndexes(text: string) {
  return text.split('').map((char) => char === ' ');
}

export function ScrambleHeroText({
  text,
  className = '',
  scrambleColor = 'var(--color-major)',
  finalColor = 'var(--foreground)',
  speed = 30,
  delayStep = 60,
  cursorIndexes = [],
  trailingUnderscoreOnComplete = false,
}: ScrambleHeroTextProps) {
  const [displayText, setDisplayText] = useState<string>(() => createMaskedText(text));
  const [settledIndexes, setSettledIndexes] = useState<boolean[]>(() => createInitialSettledIndexes(text));
  const [showTrailingUnderscore, setShowTrailingUnderscore] = useState(false);

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

  const resetToMaskedText = useCallback(() => {
    setDisplayText(createMaskedText(text, true));
    setSettledIndexes(createInitialSettledIndexes(text));
    setShowTrailingUnderscore(false);
  }, [text]);

  const renderedText = displayText;

  const runScramble = useCallback(() => {
    clearTimers();
    setShowTrailingUnderscore(false);

    const chars = text.split('');
    const current = createMaskedText(text, true).split('');
    let pendingChars = chars.filter((char) => char !== ' ').length;

    setDisplayText(current.join(''));
    setSettledIndexes(createInitialSettledIndexes(text));

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
            pendingChars--;

            if (pendingChars === 0) {
              setShowTrailingUnderscore(true);
            }
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
          resetToMaskedText();
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
  }, [runScramble, clearTimers, resetToMaskedText]);

  return (
    <h1 ref={headingRef} className={`${BASE_HEADING_CLASSNAME} ${className}`} onClick={runScramble} title="Click para reiniciar la animación">
      {renderedText.split('').map((char, index) => (
        <span
          key={index}
          className={getCharClassName(cursorIndexes.includes(index))}
          style={{
            color: settledIndexes[index] || char === ' ' ? finalColor : scrambleColor,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {trailingUnderscoreOnComplete ? (
        <span
          className={`ml-[0.08em] inline-flex w-[1ch] justify-center text-major ${showTrailingUnderscore ? 'animate-[terminal-cursor-blink_1s_steps(1,end)_infinite] opacity-100' : 'opacity-0'}`}
          style={{ color: scrambleColor }}
          aria-hidden="true"
        >
          _
        </span>
      ) : null}
    </h1>
  );
}
