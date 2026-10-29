/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Link } from 'react-router-dom';

export interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
  title?: string;
  className?: string;
}

/**
 * NavItem: Standardized polymorphic navigation item for standard and custom categories.
 */
export const NavItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
  badge,
  isActive,
  isCollapsed,
  onClick,
  title,
  className = ''
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      title={isCollapsed ? (title || label) : undefined}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
        isActive
          ? 'text-cyan-700 bg-cyan-50/80 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/50 dark:border-cyan-500/40 shadow-sm font-semibold'
          : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50'
      } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''} ${className}`}
    >
      <span className={`${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`}>
        {icon}
      </span>
      <div className={`flex flex-col min-w-0 flex-1 ${isCollapsed ? 'lg:hidden' : 'flex'}`}>
        <span className="truncate leading-tight">{label}</span>
        {badge && (
          <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 truncate mt-0.5">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
};
