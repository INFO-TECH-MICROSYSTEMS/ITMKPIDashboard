/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';

export interface NavSectionHeaderProps {
  label: string;
  isCollapsed: boolean;
  action?: React.ReactNode;
}

/**
 * NavSectionHeader: Navigation category divider and header with optional action button.
 */
export const NavSectionHeader: React.FC<NavSectionHeaderProps> = ({
  label,
  isCollapsed,
  action
}) => {
  return (
    <div className="pt-3 pb-1.5 px-3 flex items-center justify-between">
      <div className={`text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 ${isCollapsed ? 'lg:text-center lg:px-0' : ''}`}>
        {label}
      </div>
      {!isCollapsed && action}
    </div>
  );
};
