import Link from 'next/link';
import { GlitchBracketText } from '@/components/GlitchBracketText';
import { ThemeToggle } from '@/components/ThemeToggle';

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
  return (
    <header className="sticky z-100 w-full bg-black/20 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-5 py-5">
        <div>FERVAL</div>
        <ul className="flex gap-20">
          <HeaderNavItem text="Sobre mi" href="#about" />
          <HeaderNavItem text="Proyectos" href="#projects" />
          <HeaderNavItem text="Contacto" href="#contact" />
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
