/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface NavHeaderProps {
  theme: string;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  brandTitle?: string;
  brandSubtitle?: string;
}

/**
 * NavHeader: Sidebar top branding and expand/collapse button.
 */
export const NavHeader: React.FC<NavHeaderProps> = ({
  theme,
  isCollapsed,
  setIsCollapsed,
  setIsMobileOpen,
  brandTitle = 'ITM KPI',
  brandSubtitle = 'PLATFORM'
}) => {
  return (
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
              {brandTitle}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-cyan-600 dark:text-cyan-400 font-semibold font-mono truncate">
              {brandSubtitle}
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
  );
};
