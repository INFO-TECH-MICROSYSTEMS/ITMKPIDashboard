/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { MapPin, Phone, Mail, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

export interface NavFooterProps {
  theme: string;
  toggleTheme: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  themeToggleLabel?: string;
  hqLocationLabel?: string;
  collapseLabel?: string;
}

/**
 * NavFooter: Sidebar bottom controls including Dark/Light mode toggle,
 * Ottawa HQ direct contact telemetry, and expand/collapse button.
 */
export const NavFooter: React.FC<NavFooterProps> = ({
  theme,
  toggleTheme,
  isCollapsed,
  setIsCollapsed,
  themeToggleLabel = 'Toggle Theme',
  hqLocationLabel = 'Ottawa, Canada (EST)',
  collapseLabel = 'Collapse sidebar'
}) => {
  return (
    <div className="shrink-0 p-3 border-t border-slate-200 dark:border-cyan-500/15 bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
      {/* Theme Switcher Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeToggleLabel}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>

      {/* Headquarters Info Details (Only in Expanded Mode) */}
      <div className={`space-y-1.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400 ${
        isCollapsed ? 'lg:hidden' : 'block'
      }`}>
        <div className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 font-semibold font-mono">
          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span className="truncate">{hqLocationLabel}</span>
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
          aria-label={isCollapsed ? 'Expand sidebar' : collapseLabel}
          className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300 transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>{collapseLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
