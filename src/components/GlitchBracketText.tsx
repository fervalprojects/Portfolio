// components/GlitchBracketText.tsx

import type { ReactNode } from 'react';
import {
  glitchBracketSymbolClassName,
  glitchBracketSymbolInnerClassName,
  glitchBracketTextClassName,
  glitchBracketTextContentClassName,
  glitchLayerClassName,
  glitchLeftLayerAnimationClassName,
  glitchMainClassName,
  glitchRightLayerAnimationClassName,
} from '@/components/glitchStyles';

type GlitchBracketTextProps = {
  children: ReactNode;
  className?: string;
};

export function GlitchBracketText({ children, className = '' }: GlitchBracketTextProps) {
  return (
    <span className={`${glitchBracketTextClassName} ${className}`}>
      <span className={`${glitchBracketSymbolClassName} left-[-2rem]`} aria-hidden="true">
        <span className={glitchBracketSymbolInnerClassName}>[</span>
      </span>
      <span className={glitchBracketTextContentClassName}>
        <span className={glitchMainClassName}>{children}</span>
        <span className={`${glitchLayerClassName} ${glitchLeftLayerAnimationClassName}`} aria-hidden="true">
          {children}
        </span>
        <span className={`${glitchLayerClassName} ${glitchRightLayerAnimationClassName}`} aria-hidden="true">
          {children}
        </span>
      </span>
      <span className={`${glitchBracketSymbolClassName} right-[-2rem]`} aria-hidden="true">
        <span className={glitchBracketSymbolInnerClassName}>]</span>
      </span>
    </span>
  );
}
