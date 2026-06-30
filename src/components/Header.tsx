'use client';

import Link from 'next/link';
import { GlitchBracketText } from '@/components/glitch/GlitchBracketText';
import { LanguageToggle } from '@/components/translate/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLanguage } from '@/components/translate/LanguageProvider';
import { siteCopy } from '@/components/translate/translations';

function HeaderNavItem({ text, href }: { text: string; href: string }) {
  return (
    <li className="group relative flex items-center overflow-visible text-sm font-medium">
      <Link href={href}>
        <GlitchBracketText className="text-base font-medium">{text}</GlitchBracketText>
      </Link>
    </li>
  );
}

export function Header() {
  const { language } = useLanguage();
  const copy = siteCopy[language];

  return (
    <header className="sticky z-100 w-full bg-black/20 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-5 py-5">
        <div>FERVAL</div>
        <ul className="flex gap-20">
          <HeaderNavItem text={copy.header.about} href="#about" />
          <HeaderNavItem text={copy.header.projects} href="#projects" />
          <HeaderNavItem text={copy.header.contact} href="#contact" />
        </ul>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
