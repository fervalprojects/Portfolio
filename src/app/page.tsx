import Link from 'next/link';
import { AmbientMatrixGlow } from '@/components/AmbientMatrixGlow';
import { TechIconCard } from '@/components/TechIconCard';
import { GlitchBracketText } from '@/components/GlitchBracketText';
import { ScrambleHeroText } from '@/components/ScrambleHeroText';
import { ThemeToggle } from '@/components/ThemeToggle';
function itemList(text: string, href: string) {
  return (
    <li className="group relative flex items-center overflow-visible text-sm font-medium">
      <Link href={href}>
        <GlitchBracketText className="text-base font-medium">{text}</GlitchBracketText>
      </Link>
    </li>
  );
}

export default function Home() {
  return (
    <div className="main-background flex flex-col items-center">
      <AmbientMatrixGlow />
      <header className="w-full bg-black/20 backdrop-blur-sm sticky z-100">
        <nav className="flex justify-between items-center px-5 py-5">
          <div>FERVAL</div>
          <ul className="flex gap-20">
            {itemList('Sobre mi', '#about')}
            {itemList('Proyectos', '#projects')}
            {itemList('Contacto', '#contact')}
          </ul>
          <ThemeToggle />
        </nav>
      </header>
      <main className="max-w-7xl flex flex-col">
        <section className="relative z-3 flex min-h-screen flex-col items-center justify-center px-6 text-center gap-2">
          <ScrambleHeroText text=">_ Marco Fernandez" className="text-6xl" />
          <ScrambleHeroText text="Ingeniero de Software" className="text-3xl" />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">Desarrollo aplicaciones web modernas con enfoque en rendimiento, diseño y experiencia de usuario.</p>
        </section>
        <section id="about" className="flex flex-col gap-4 scroll-mt-8">
          <ScrambleHeroText text=">_ Sobre mi" className="text-3xl" />
          <p>Soy un desarrollador Full Stack con experiencia en tecnologías como JavaScript, React, Node.js y bases de datos SQL y NoSQL. Me apasiona crear aplicaciones web eficientes y escalables, y siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades.</p>
          <div>
            <span>Tecnologías</span>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 bg-gray-700/10 backdrop-blur-[3px]">
              <TechIconCard title="HTML" src="/logos/html.svg" alt="HTML logo" />
              <TechIconCard title="CSS" src="/logos/html.svg" alt="CSS logo" />
              <TechIconCard title="TypeScript" src="/logos/html.svg" alt="TypeScript logo" />
              <TechIconCard title="React" src="/logos/html.svg" alt="React logo" />
              <TechIconCard title="Next.js" src="/logos/html.svg" alt="Next.js logo" />
            </div>
          </div>
        </section>
        <section id="projects" className="py-25 scroll-mt-8">
          <ScrambleHeroText text=">_ Proyectos" className="text-3xl" />
          <p>Lista de proyectos destacados.</p>
        </section>
        <section id="contact" className="py-25 scroll-mt-8">
          <ScrambleHeroText text=">_ Contacto" className="text-3xl" />
          <p>Información de contacto.</p>
        </section>
      </main>
    </div>
  );
}
