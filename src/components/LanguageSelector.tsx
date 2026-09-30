import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type Language } from '../i18n/languages';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Normalize current language code (e.g. 'en-US' -> 'en')
  const currentCode = (i18n.language || 'en').split('-')[0].toLowerCase();
  const currentLanguage: Language =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentCode) || SUPPORTED_LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = SUPPORTED_LANGUAGES.findIndex((l) => l.code === currentLanguage.code);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % SUPPORTED_LANGUAGES.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? SUPPORTED_LANGUAGES.length - 1 : prev - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < SUPPORTED_LANGUAGES.length) {
          handleSelectLanguage(SUPPORTED_LANGUAGES[highlightedIndex].code);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            const currentIndex = SUPPORTED_LANGUAGES.findIndex((l) => l.code === currentLanguage.code);
            setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
          }
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="language-dropdown-menu"
        aria-label={t('header.selectLanguage', 'Select language')}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs font-medium transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
        title={t('header.selectLanguage', 'Select language')}
      >
        <span className="text-sm select-none" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        <span className="hidden sm:inline font-semibold">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Accessible Dropdown Listbox */}
      {isOpen && (
        <ul
          id="language-dropdown-menu"
          ref={listboxRef}
          role="listbox"
          aria-label={t('header.selectLanguage', 'Select language')}
          tabIndex={-1}
          className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#0a0f24] border border-slate-200 dark:border-cyan-500/30 shadow-2xl py-1.5 z-50 focus:outline-none max-h-80 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>{t('header.selectLanguage', 'Languages')}</span>
            </span>
            <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-bold">
              {SUPPORTED_LANGUAGES.length}
            </span>
          </div>

          {SUPPORTED_LANGUAGES.map((lang, index) => {
            const isSelected = lang.code === currentLanguage.code;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={lang.code}
                id={`lang-option-${lang.code}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectLanguage(lang.code)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`flex items-center justify-between px-3 py-2 text-xs cursor-pointer transition-colors ${
                  isHighlighted
                    ? 'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-200'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                } ${isSelected ? 'font-bold' : 'font-normal'}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0 select-none" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <div className="flex flex-col text-left rtl:text-right truncate">
                    <span className="truncate">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {lang.name}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <Check
                    className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 ml-2 rtl:mr-2 rtl:ml-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
