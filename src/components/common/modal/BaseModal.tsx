/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  size?: ModalSize;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-[95vw]'
};

/**
 * BaseModal: The foundational Object-Oriented Modal Component.
 * Provides unified backdrop, ESC key handling, standardized responsive container,
 * header titlebar with optional icon, subtitle, close button, body and footer actions.
 */
export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  size = 'lg',
  headerAction,
  footer,
  children,
  className = '',
  bodyClassName = 'p-6',
  closeOnEsc = true,
  closeOnBackdrop = true
}) => {
  // ESC key listener
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${sizeClasses[size]} max-h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c1021] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-cyan-500/30 shadow-2xl overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Standardized Header */}
        {(title || icon || subtitle) && (
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
            <div className="flex items-center gap-3 min-w-0 pr-4">
              {icon && (
                <div className="shrink-0">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                {typeof title === 'string' ? (
                  <h2 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit'] truncate">
                    {title}
                  </h2>
                ) : (
                  title
                )}
                {subtitle && (
                  typeof subtitle === 'string' ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
                      {subtitle}
                    </p>
                  ) : (
                    subtitle
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {headerAction}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className={`flex-1 overflow-y-auto ${bodyClassName}`}>
          {children}
        </div>

        {/* Standardized Footer */}
        {footer && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
