/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, Mail, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { LanguageSelector } from './LanguageSelector';
import { useUser } from '../context/UserContext';
import { UserProfileModal } from './profile/UserProfileModal';

interface TopHeaderProps {
  onMenuClick: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 transition-colors duration-300 backdrop-blur-xl border-b border-slate-200/80 bg-white/90 text-slate-900 shadow-sm dark:border-cyan-500/20 dark:bg-[#070913]/90 dark:text-slate-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile View: Hamburger + Brand */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              type="button"
              onClick={onMenuClick}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-50 dark:bg-slate-900/80 cursor-pointer"
              aria-label={t('header.openNavigationMenu', 'Open navigation menu')}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
                alt="ITM Logo" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-extrabold text-sm tracking-wide bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent font-['Outfit']">
                ITM KPI DASHBOARD
              </span>
            </Link>
          </div>

          {/* Desktop View: Corporate Status & Quick Direct Contact */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-cyan-700 dark:text-cyan-400 font-mono">
                {t('header.hqLocation', 'Ottawa HQ, Ontario, Canada (EST/EDT)')}
              </span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+16132665285" 
                className="flex items-center space-x-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="Telephone"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {t('header.phone', '+1 613 266 5285')}
                </span>
              </a>
              <a 
                href="mailto:info.tech.microsystems.ca@gmail.com" 
                className="flex items-center space-x-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>info.tech.microsystems.ca@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Action Icons (Both Mobile & Desktop): User Account, Language Selector, Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* User Profile Pill */}
            <button
              type="button"
              onClick={() => setIsProfileOpen(true)}
              title="User Account & Profile (Database Connected)"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 bg-slate-50 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white font-bold text-[10px] shadow-xs">
                {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'SW'}
              </div>
              <div className="hidden md:flex flex-col text-left leading-none">
                <span className="text-xs font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {currentUser?.name || 'Sudarsha W.'}
                </span>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                  {currentUser?.email || 'sudarsha.wijenayake@gmail.com'}
                </span>
              </div>
            </button>

            {/* Language Selector Dropdown with Flags */}
            <LanguageSelector />

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t('header.toggleTheme', 'Toggle Dark/Light Mode')}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300 bg-slate-50 dark:bg-slate-900/80 transition-colors cursor-pointer"
              title={theme === 'dark' ? t('header.switchToLight', 'Switch to Light Mode') : t('header.switchToDark', 'Switch to Dark Mode')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
          </div>

        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
};
