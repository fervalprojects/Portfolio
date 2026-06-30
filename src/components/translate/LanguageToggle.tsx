'use client';

import { ToggleSwitch } from '@/components/ToggleSwitch';
import { useLanguage } from '@/components/translate/LanguageProvider';
import { siteCopy } from '@/components/translate/translations';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const copy = siteCopy[language].controls;
  const isEnglish = language === 'en';

  return (
    <ToggleSwitch
      ariaLabel={copy.toggleLanguage}
      title={copy.changeLanguage}
      onClick={toggleLanguage}
      leftContent={<span className="text-[10px] leading-none font-bold text-black [html[data-theme='dark']_&]:text-white">EN</span>}
      rightContent={<span className="text-[10px] leading-none font-bold text-black [html[data-theme='dark']_&]:text-white">ES</span>}
      leftContentClassName={isEnglish ? 'opacity-100' : 'opacity-0'}
      rightContentClassName={isEnglish ? 'opacity-0' : 'opacity-100'}
      thumbActive={isEnglish}
      buttonClassName="gap-2"
    />
  );
}
