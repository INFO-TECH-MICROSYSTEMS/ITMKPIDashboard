/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { 
  X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  HelpCircle 
} from 'lucide-react';

export interface BaseKPIWidgetProps {
  id?: string;
  title: string;
  subtitle?: string;
  onJustify?: () => void;
  clarificationLabel?: string;
  
  // Custom Category Interactive Controls
  isEditable?: boolean;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  canMoveLeft?: boolean;
  canMoveRight?: boolean;

  // Visual & Children
  className?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * BaseKPIWidget: The foundational container class/component in the KPI hierarchy.
 * Enforces unified styling, header action symmetry, help justification triggers,
 * and positional controls (Up, Down, Left, Right) and deletion (Close button).
 */
export const BaseKPIWidget: React.FC<BaseKPIWidgetProps> = ({
  title,
  subtitle,
  onJustify,
  clarificationLabel = 'View formula & justification',
  isEditable = false,
  onRemove,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  canMoveUp = true,
  canMoveDown = true,
  canMoveLeft = true,
  canMoveRight = true,
  className = '',
  headerAction,
  children
}) => {
  return (
    <div 
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1021] border border-slate-200/90 dark:border-cyan-500/20 shadow-xs hover:shadow-md hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-all duration-200 ${className}`}
    >
      {/* Top Header Row with Commonality Actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100 truncate font-['Outfit']">
              {title}
            </h3>
            {onJustify && (
              <button
                type="button"
                onClick={onJustify}
                title={clarificationLabel}
                className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-mono">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Controls & Positional Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {headerAction}

          {isEditable && (
            <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/80">
              {/* Left / Right directional movement */}
              {onMoveLeft && (
                <button
                  type="button"
                  onClick={onMoveLeft}
                  disabled={!canMoveLeft}
                  title="Move KPI Left"
                  className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}
              {onMoveRight && (
                <button
                  type="button"
                  onClick={onMoveRight}
                  disabled={!canMoveRight}
                  title="Move KPI Right"
                  className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Up / Down directional movement */}
              {onMoveUp && (
                <button
                  type="button"
                  onClick={onMoveUp}
                  disabled={!canMoveUp}
                  title="Move KPI Up"
                  className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              )}
              {onMoveDown && (
                <button
                  type="button"
                  onClick={onMoveDown}
                  disabled={!canMoveDown}
                  title="Move KPI Down"
                  className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Close / Remove button */}
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  title="Remove KPI from this category"
                  className="p-1 ml-1 rounded text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};
