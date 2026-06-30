export const glitchBaseClassName = [
  'relative inline-flex items-center justify-center overflow-visible',
  '[--glitch-duration:0.45s]',
  '[--glitch-step-mode:steps(2,end)]',
  '[--glitch-layer-opacity:0.65]',
  '[--glitch-main-15-x:-1px]',
  '[--glitch-main-15-y:1px]',
  '[--glitch-main-30-x:1px]',
  '[--glitch-main-30-y:-1px]',
  '[--glitch-main-45-x:-1px]',
  '[--glitch-main-45-y:0]',
  '[--glitch-main-60-x:1px]',
  '[--glitch-main-60-y:1px]',
].join(' ');

export const glitchMainClassName = 'relative z-[3] group-hover:animate-[glitch-main_var(--glitch-duration)_var(--glitch-step-mode)]';

export const glitchLayerClassName = 'pointer-events-none absolute inset-0 z-[2] opacity-0 [color:inherit] group-hover:opacity-[var(--glitch-layer-opacity)]';

export const glitchLeftLayerAnimationClassName = 'group-hover:animate-[glitch-layer-left_var(--glitch-duration)_var(--glitch-step-mode)]';

export const glitchRightLayerAnimationClassName = 'group-hover:animate-[glitch-layer-right_var(--glitch-duration)_var(--glitch-step-mode)]';

export const glitchBracketTextClassName = [
  glitchBaseClassName,
  'min-h-8 text-foreground leading-none transition-[color,text-shadow] duration-[250ms]',
  'group-hover:text-major group-hover:italic',
  'group-hover:[text-shadow:0_0_10px_color-mix(in_srgb,var(--color-major)_80%,transparent)]',
  '[--glitch-left-15-x:-4px]',
  '[--glitch-left-15-y:1px]',
  '[--glitch-left-30-x:-2px]',
  '[--glitch-left-30-y:-2px]',
  '[--glitch-left-45-x:-5px]',
  '[--glitch-left-45-y:2px]',
  '[--glitch-left-60-x:-2px]',
  '[--glitch-left-60-y:-1px]',
  '[--glitch-right-15-x:4px]',
  '[--glitch-right-15-y:-1px]',
  '[--glitch-right-30-x:2px]',
  '[--glitch-right-30-y:2px]',
  '[--glitch-right-45-x:5px]',
  '[--glitch-right-45-y:-2px]',
  '[--glitch-right-60-x:2px]',
  '[--glitch-right-60-y:1px]',
].join(' ');

export const glitchBracketTextContentClassName = 'relative inline-flex items-center';

export const glitchBracketSymbolClassName = [
  'absolute top-1/2 z-[4] inline-block text-[1.875rem] font-extrabold italic leading-none',
  'opacity-0 [filter:drop-shadow(0_0_10px_color-mix(in_srgb,var(--color-major)_90%,transparent))]',
  '[transform:translateY(calc(-50%-2px))] transition-opacity duration-200',
  'text-major group-hover:opacity-100',
].join(' ');

export const glitchBracketSymbolInnerClassName = [
  'inline-block px-[0.2em] py-[0.15em] [clip-path:var(--move1)] [transform:translateZ(0)]',
  '[--move1:inset(50%_0_50%_0)]',
  '[--move2:inset(31%_0_40%_0)]',
  '[--move3:inset(39%_0_15%_0)]',
  '[--move4:inset(45%_0_40%_0)]',
  '[--move5:inset(45%_0_6%_0)]',
  '[--move6:inset(14%_0_61%_0)]',
  '[--move7:inset(0_0_0_0)]',
  'group-hover:[clip-path:var(--move7)]',
  'group-hover:animate-[glitch-bracket-symbol_0.4s_steps(2,end)_forwards]',
].join(' ');

export const glitchIconClassName = [
  glitchBaseClassName,
  '[--glitch-left-15-x:-5px]',
  '[--glitch-left-15-y:1px]',
  '[--glitch-left-30-x:-3px]',
  '[--glitch-left-30-y:-2px]',
  '[--glitch-left-45-x:-6px]',
  '[--glitch-left-45-y:2px]',
  '[--glitch-left-60-x:-2px]',
  '[--glitch-left-60-y:-1px]',
  '[--glitch-right-15-x:5px]',
  '[--glitch-right-15-y:-1px]',
  '[--glitch-right-30-x:3px]',
  '[--glitch-right-30-y:2px]',
  '[--glitch-right-45-x:6px]',
  '[--glitch-right-45-y:-2px]',
  '[--glitch-right-60-x:2px]',
  '[--glitch-right-60-y:1px]',
].join(' ');

export const glitchIconImageClassName = 'block h-full w-full object-contain';
