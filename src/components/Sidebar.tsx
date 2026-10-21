/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, ChevronLeft, ChevronRight, Sun, Moon,
  MapPin, Phone, Mail, X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname.startsWith('/kpi');
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Pane */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between bg-white text-slate-900 dark:bg-[#070913] dark:text-slate-100 border-r border-slate-200 dark:border-cyan-500/20 shadow-xl lg:shadow-none transition-all duration-300 ease-in-out overflow-x-hidden ${
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-20' : 'lg:w-72'
        }`}
      >
        {/* Top Section: Logo & Toggle */}
        <div className="flex flex-col shrink-0">
          <div className="h-20 flex items-center justify-between px-3.5 border-b border-slate-200 dark:border-cyan-500/15">
            {/* Logo and Brand Name */}
            <Link 
              to="/" 
              className={`flex items-center gap-2.5 overflow-hidden transition-all duration-200 group ${
                isCollapsed ? 'lg:justify-center lg:w-full' : ''
              }`}
              title="ITM KPI Dashboard"
            >
              <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-600/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-all shrink-0">
                <img 
                  src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
                  alt="ITM Logo" 
                  className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Text shown when expanded or mobile */}
              <div className={`flex flex-col min-w-0 transition-opacity duration-200 ${isCollapsed ? 'lg:hidden' : 'block'}`}>
                <span className="text-sm font-black tracking-wider text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors font-['Outfit'] truncate">
                  ITM KPI
                </span>
                <span className="text-[10px] tracking-widest uppercase text-cyan-600 dark:text-cyan-400 font-semibold font-mono truncate">
                  DASHBOARD
                </span>
              </div>
            </Link>

            {/* Collapse toggle button on desktop */}
            <button
              type="button"
              onClick={() => setIsCollapsed(prev => !prev)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300 bg-slate-50 dark:bg-slate-900/80 transition-colors cursor-pointer shrink-0 ${
                isCollapsed ? 'mt-2 mx-auto' : ''
              }`}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Close button on mobile */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Sub-toggle bar when collapsed */}
          {isCollapsed && (
            <div className="hidden lg:flex justify-center py-2 border-b border-slate-100 dark:border-slate-800/60">
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                title="Expand navigation pane"
                className="p-1 rounded-md text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-xs flex items-center gap-1 font-mono transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Middle Navigation Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1.5 custom-scrollbar">
          {/* Quality Engineering KPI Platform Link */}
          <Link
            to="/"
            title={isCollapsed ? t('nav.kpiDashboard', 'KPI Dashboard') : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive('/')
                ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
          >
            <BarChart3 className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
            <div className={`flex items-center gap-2 truncate ${isCollapsed ? 'lg:hidden' : 'flex'}`}>
              <span className="truncate">{t('nav.kpiDashboard', 'KPI Dashboard')}</span>
              <span className="text-[9px] bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                {t('nav.live', 'Live')}
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom Section: Theme Toggle and HQ Contact Info */}
        <div className="shrink-0 p-3 border-t border-slate-200 dark:border-cyan-500/15 bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('header.toggleTheme', 'Toggle Dark/Light Mode')}
            title={theme === 'dark' ? t('header.switchToLight', 'Switch to Light Mode') : t('header.switchToDark', 'Switch to Dark Mode')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300 bg-white dark:bg-slate-900 transition-colors cursor-pointer text-xs font-medium ${
              isCollapsed ? 'lg:justify-center lg:px-0 lg:w-10 lg:h-10 lg:mx-auto' : ''
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
            )}
            <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>
              {theme === 'dark' ? t('nav.lightMode', 'Light Mode') : t('nav.darkMode', 'Dark Mode')}
            </span>
          </button>

          {/* Headquarters Info Details (Only in Expanded Mode) */}
          <div className={`space-y-1.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400 ${
            isCollapsed ? 'lg:hidden' : 'block'
          }`}>
            <div className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 font-semibold font-mono">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="truncate">{t('nav.ottawaCanada', 'Ottawa, Canada (EST)')}</span>
            </div>
            
            <a 
              href="tel:+16132665285" 
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors truncate"
            >
              <Phone className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="font-medium">+1 613 266 5285</span>
            </a>

            <a 
              href="mailto:info.tech.microsystems.ca@gmail.com" 
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors truncate"
              title="info.tech.microsystems.ca@gmail.com"
            >
              <Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="truncate">info.tech.microsystems.ca...</span>
            </a>
          </div>

          {/* Bottom collapse / expand bar on desktop */}
          <div className="hidden lg:block pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
            <button
              type="button"
              onClick={() => setIsCollapsed(prev => !prev)}
              aria-label={isCollapsed ? t('nav.expandSidebar', 'Expand sidebar') : t('nav.collapseSidebar', 'Collapse sidebar')}
              className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t('nav.collapseSidebar', 'Collapse sidebar')}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};
