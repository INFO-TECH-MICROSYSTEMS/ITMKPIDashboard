/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { X, HelpCircle, Maximize2, Minimize2 } from 'lucide-react';

export interface BaseKPIWidgetProps {
  id?: string;
  title: string;
  subtitle?: string;
  onJustify?: () => void;
  clarificationLabel?: string;
  
  // Custom Category Interactive Controls
  isEditable?: boolean;
  onRemove?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;

  // Visual & Children
  className?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * KPIButtonPanel: Standardized top-right action toolbar for all KPI widgets.
 * Aligns the question mark (?) justification trigger and close (X) button cleanly,
 * and provides ready extension points for maximize/restore buttons.
 */
export const KPIButtonPanel: React.FC<{
  onJustify?: () => void;
  clarificationLabel?: string;
  onRemove?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  extraActions?: React.ReactNode;
}> = ({
  onJustify,
  clarificationLabel = 'View formula & justification',
  onRemove,
  onMaximize,
  isMaximized,
  extraActions
}) => {
  if (!onJustify && !onRemove && !onMaximize && !extraActions) return null;

  return (
    <div className="flex items-center gap-1 shrink-0 z-10">
      {extraActions}

      {/* Maximize / Restore Toggle */}
      {onMaximize && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          title={isMaximized ? 'Restore widget' : 'Maximize widget'}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Question mark (?) justification trigger */}
      {onJustify && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onJustify();
          }}
          title={clarificationLabel}
          className="p-1 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Close / Remove (X) button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          title="Remove KPI from this category"
          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

/**
 * BaseKPIWidget: The super parent class/component in the KPI hierarchy.
 * Enforces unified styling, title layout, and standardized top-right KPIButtonPanel.
 */
export const BaseKPIWidget: React.FC<BaseKPIWidgetProps> = ({
  title,
  subtitle,
  onJustify,
  clarificationLabel,
  onRemove,
  onMaximize,
  isMaximized,
  className = '',
  headerAction,
  children
}) => {
  return (
    <div 
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1021] border border-slate-200/90 dark:border-cyan-500/20 shadow-xs hover:shadow-md hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-200 ${className}`}
    >
      {/* Top Header Row with Title and Top-Right Action Button Panel */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-['Outfit'] truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5 font-mono">
              {subtitle}
            </p>
          )}
        </div>

        {/* Top-Right Action Button Panel: [?] then [X] */}
        <KPIButtonPanel
          onJustify={onJustify}
          clarificationLabel={clarificationLabel}
          onRemove={onRemove}
          onMaximize={onMaximize}
          isMaximized={isMaximized}
          extraActions={headerAction}
        />
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
