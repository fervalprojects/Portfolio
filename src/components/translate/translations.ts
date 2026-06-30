export const LANGUAGE_COOKIE_NAME = 'portfolio-language';

export type Language = 'es' | 'en';

type SiteCopy = {
  header: {
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    role: string;
    description: string;
    socialGithub: string;
    socialThreads: string;
    socialInstagram: string;
    socialCv: string;
  };
  about: {
    introduction: string;
    title: string;
    description: string;
    technologies: string;
  };
  projects: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
  };
  controls: {
    changeTheme: string;
    changeLanguage: string;
    toggleTheme: string;
    toggleLanguage: string;
    language: string;
  };
};

export const siteCopy: Record<Language, SiteCopy> = {
  es: {
    header: {
      about: 'Sobre mi',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      role: 'Desarrollador de Software',
      description: 'Desarrollo aplicaciones web modernas con enfoque en rendimiento, diseno y experiencia de usuario.',
      socialGithub: 'GitHub',
      socialThreads: 'Threads',
      socialInstagram: 'Instagram',
      socialCv: 'Descargar CV',
    },
    about: {
      title: 'Sobre mi',
      introduction: 'Soy responsable, puntual y perseverante en el aprendizaje continuo. Me motiva enfrentar problemas y buscar soluciones efectivas, colaborar en equipo y seguir fortaleciendo mis habilidades técnicas.',
      description: 'Desarrollador web full stack especializado en el diseño, desarrollo y optimización de sitios web. Experiencia con Next.js, React, TypeScript, Node.js, APIs REST, bases de datos SQL y NoSQL, aplicando buenas prácticas de arquitectura de software, rendimiento, control de versiones con Git/GitHub y despliegue en producción.',
      technologies: 'Tecnologias',
    },
    projects: {
      title: 'Proyectos',
      description: 'Lista de proyectos destacados.',
    },
    contact: {
      title: 'Contacto',
      description: 'Informacion de contacto.',
    },
    controls: {
      changeTheme: 'Cambiar tema',
      changeLanguage: 'Cambiar idioma',
      toggleTheme: 'Cambiar entre tema claro y oscuro',
      toggleLanguage: 'Cambiar entre espanol e ingles',
      language: 'Idioma',
    },
  },
  en: {
    header: {
      about: 'About me',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      role: 'Software Engineer',
      description: 'I build modern web applications with a strong focus on performance, design, and user experience.',
      socialGithub: 'GitHub',
      socialThreads: 'Threads',
      socialInstagram: 'Instagram',
      socialCv: 'Download CV',
    },
    about: {
      title: 'About',
      introduction: 'Hello, I am a software engineer who is passionate about creating innovative solutions.',
      description: 'I am a Full Stack developer with experience in technologies such as JavaScript, React, Node.js, and SQL and NoSQL databases. I enjoy building efficient, scalable web applications and I am always looking to learn new technologies and sharpen my skills.',
      technologies: 'Technologies',
    },
    projects: {
      title: 'Projects',
      description: 'Featured projects list.',
    },
    contact: {
      title: 'Contact',
      description: 'Contact information.',
    },
    controls: {
      changeTheme: 'Change theme',
      changeLanguage: 'Change language',
      toggleTheme: 'Switch between light and dark theme',
      toggleLanguage: 'Switch between Spanish and English',
      language: 'Language',
    },
  },
};

export function isLanguage(value: string | undefined): value is Language {
  return value === 'es' || value === 'en';
}

export function getInitialLanguage(cookieValue: string | undefined): Language {
  if (isLanguage(cookieValue)) {
    return cookieValue;
  }

  return 'es';
}
