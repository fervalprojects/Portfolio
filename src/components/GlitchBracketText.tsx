// components/GlitchBracketText.tsx

import type { ReactNode } from 'react';

type GlitchBracketTextProps = {
  children: ReactNode;
  className?: string;
};

export function GlitchBracketText({ children, className = '' }: GlitchBracketTextProps) {
  return (
    <span className={`glitch-bracket-text ${className}`}>
      <span className="glitch-bracket-text-symbol glitch-bracket-text-left" aria-hidden="true">
        <span className="glitch-bracket-text-symbol-inner">[</span>
      </span>
      <span className="glitch-bracket-text-content">
        <span className="glitch-bracket-text-main">{children}</span>
        <span className="glitch-bracket-text-layer glitch-bracket-text-layer-left" aria-hidden="true">
          {children}
        </span>
        <span className="glitch-bracket-text-layer glitch-bracket-text-layer-right" aria-hidden="true">
          {children}
        </span>
      </span>
      <span className="glitch-bracket-text-symbol glitch-bracket-text-right" aria-hidden="true">
        <span className="glitch-bracket-text-symbol-inner">]</span>
      </span>
    </span>
  );
}
