'use client';

import { AmbientMatrixGlow } from '@/components/background';
import { Header } from '@/components/Header';
import { PixelFolder } from '@/components/icons/pixel/folder';
import { PixelGithub } from '@/components/icons/pixel/github';
import { PixelInstagram } from '@/components/icons/pixel/instagram';
import { PixelThreads } from '@/components/icons/pixel/threads';
import { TechIconCard } from '@/components/TechIconCard';
import { ScrambleHeroText } from '@/components/ScrambleHeroText';
import { useLanguage } from '@/components/translate/LanguageProvider';
import { siteCopy } from '@/components/translate/translations';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function HeroActionButton({
  href,
  label,
  icon: Icon,
  variant = 'default',
}: {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: 'default' | 'green-hover' | 'glitch' | 'glitch-green';
}) {
  const isGlitch = variant === 'glitch' || variant === 'glitch-green';
  const isGreen = variant === 'green-hover' || variant === 'glitch-green';

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'group relative inline-flex items-center gap-2 overflow-hidden border-2 border-foreground/70 bg-background/50 px-3 py-2 text-foreground transition-colors duration-200',
        isGreen ? 'hover:border-major hover:bg-major/12 hover:text-major' : 'hover:bg-foreground hover:text-background',
        isGlitch && 'group-hover:[text-shadow:0_0_8px_color-mix(in_srgb,var(--color-major)_55%,transparent)]',
      )}
    >
      <span className={cn('relative z-[3] inline-flex items-center gap-2', isGlitch && 'group-hover:animate-[glitch-main_0.45s_steps(2,end)]')}>
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </span>
      {isGlitch ? (
        <>
          <span
            className="pointer-events-none absolute inset-0 z-[2] opacity-0 [color:inherit] group-hover:opacity-60 group-hover:animate-[glitch-layer-left_0.45s_steps(2,end)]"
            aria-hidden="true"
          >
            <span className="inline-flex h-full w-full items-center justify-center gap-2">
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </span>
          </span>
          <span
            className="pointer-events-none absolute inset-0 z-[1] opacity-0 [color:inherit] group-hover:opacity-60 group-hover:animate-[glitch-layer-right_0.45s_steps(2,end)]"
            aria-hidden="true"
          >
            <span className="inline-flex h-full w-full items-center justify-center gap-2">
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </span>
          </span>
        </>
      ) : null}
    </Link>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const copy = siteCopy[language];
  const heroLinks = [
    {
      href: 'https://github.com/marcofernandez',
      label: copy.hero.socialGithub,
      icon: PixelGithub,
    },
    {
      href: 'https://www.threads.net/@marcofernandez.dev',
      label: copy.hero.socialThreads,
      icon: PixelThreads,
    },
    {
      href: 'https://www.instagram.com/marcofernandez.dev/',
      label: copy.hero.socialInstagram,
      icon: PixelInstagram,
    },
    {
      href: '/MarcoFernandezCV.pdf',
      label: copy.hero.socialCv,
      icon: PixelFolder,
    },
  ];
  const testLinks = [
    {
      href: 'https://github.com/marcofernandez',
      label: 'Test Green Hover',
      icon: PixelGithub,
      variant: 'green-hover' as const,
    },
    {
      href: 'https://github.com/marcofernandez',
      label: 'Test Glitch',
      icon: PixelThreads,
      variant: 'glitch' as const,
    },
    {
      href: 'https://github.com/marcofernandez',
      label: 'Test Glitch Green',
      icon: PixelInstagram,
      variant: 'glitch-green' as const,
    },
  ];

  return (
    <div className="main-background flex flex-col items-center">
      <AmbientMatrixGlow />
      <Header />
      <main className="max-w-7xl flex flex-col">
        <section className="relative z-3 flex min-h-screen flex-col items-center justify-center px-6 text-center gap-2">
          <ScrambleHeroText text="Marco Fernandez" className="text-6xl" trailingUnderscoreOnComplete />
          <ScrambleHeroText text={copy.hero.role} className="text-3xl" />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 [html[data-theme='dark']_&]:text-foreground/90 sm:text-lg">{copy.hero.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            {heroLinks.map(({ href, label, icon: Icon }) => (
              <HeroActionButton key={label} href={href} label={label} icon={Icon} />
            ))}
            {testLinks.map(({ href, label, icon, variant }) => (
              <HeroActionButton key={label} href={href} label={label} icon={icon} variant={variant} />
            ))}
          </div>
        </section>
        <section id="about" className="flex flex-col gap-4 scroll-mt-8">
          <ScrambleHeroText text={`>_ ${copy.about.title}`} className="text-3xl" />
          <p>{copy.about.introduction}</p>
          <p>{copy.about.description}</p>
          <div>
            <span>{copy.about.technologies}</span>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 bg-gray-700/10 backdrop-blur-[3px]">
              <TechIconCard title="HTML" src="/logos/html.svg" alt="HTML logo" />
              <TechIconCard title="CSS" src="/logos/css.svg" alt="CSS logo" />
              <TechIconCard title="TypeScript" src="/logos/typescript.svg" alt="TypeScript logo" />
              <TechIconCard title="React" src="/logos/react.svg" alt="React logo" />
              <TechIconCard title="Next.js" src="/logos/nextjs.svg" alt="Next.js logo" />
            </div>
          </div>
        </section>
        <section id="projects" className="py-25 scroll-mt-8">
          <ScrambleHeroText text={`>_ ${copy.projects.title}`} className="text-3xl" />
          <p>{copy.projects.description}</p>
        </section>
        <section id="contact" className="py-25 scroll-mt-8">
          <ScrambleHeroText text={`>_ ${copy.contact.title}`} className="text-3xl" />
          <p>{copy.contact.description}</p>
        </section>
      </main>
    </div>
  );
}
