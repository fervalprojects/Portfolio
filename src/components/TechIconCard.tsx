// components/TechIconCard.tsx

import Image from 'next/image';
import { GlitchBracketText } from '@/components/GlitchBracketText';

type TechIconCardProps = {
  title: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function TechIconCard({ title, src, alt, width = 50, height = 50 }: TechIconCardProps) {
  return (
    <article className="group flex flex-col items-center gap-1 overflow-visible">
      <GlitchBracketText className="text-sm font-semibold">{title}</GlitchBracketText>
      <div
        className="glitch-icon"
        style={{
          width,
          height,
        }}
      >
        <Image src={src} alt={alt} width={width} height={height} className="glitch-icon-main" />
        <Image src={src} alt="" width={width} height={height} aria-hidden="true" className="glitch-icon-layer glitch-icon-layer-left" />
        <Image src={src} alt="" width={width} height={height} aria-hidden="true" className="glitch-icon-layer glitch-icon-layer-right" />
      </div>
    </article>
  );
}
