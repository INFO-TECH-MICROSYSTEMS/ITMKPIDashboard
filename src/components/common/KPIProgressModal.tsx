/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { RefreshCw, Database, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export interface ProgressState {
  isOpen: boolean;
  title: string;
  subtitle: string;
  progressPercent?: number;
  stage?: string;
  type: 'purging' | 'generating' | 'loading' | 'filtering';
}

interface KPIProgressModalProps {
  progress: ProgressState;
}

export const KPIProgressModal: React.FC<KPIProgressModalProps> = ({ progress }) => {
  if (!progress.isOpen) return null;

  const getIcon = () => {
    switch (progress.type) {
      case 'purging':
      case 'generating':
        return <Sparkles className="w-8 h-8 text-amber-500 animate-spin" />;
      case 'filtering':
        return <Filter className="w-8 h-8 text-cyan-500 animate-pulse" />;
      case 'loading':
      default:
        return <Database className="w-8 h-8 text-purple-500 animate-bounce" />;
    }
  };

  const getThemeGradient = () => {
    switch (progress.type) {
      case 'purging':
      case 'generating':
        return 'from-amber-500 to-purple-600';
      case 'filtering':
        return 'from-cyan-500 to-indigo-600';
      case 'loading':
      default:
        return 'from-cyan-500 to-purple-600';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/20 shadow-2xl shadow-cyan-500/10 space-y-5 transform transition-all scale-100">
        
        {/* Top Header & Visual Badge */}
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-inner shrink-0">
            {getIcon()}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
              ITM Quality Engine Telemetry
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug font-['Outfit']">
              {progress.title}
            </h3>
          </div>
        </div>

        {/* Subtitle / Descriptive Stage */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {progress.subtitle}
        </p>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
            {progress.progressPercent !== undefined ? (
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${getThemeGradient()} transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(100, Math.max(5, progress.progressPercent))}%` }}
              />
            ) : (
              <div className={`h-full rounded-full bg-gradient-to-r ${getThemeGradient()} animate-pulse w-full`} />
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 truncate">
              <RefreshCw className="w-3 h-3 animate-spin text-cyan-500 shrink-0" />
              <span className="truncate">{progress.stage || 'Processing data pipeline...'}</span>
            </span>
            {progress.progressPercent !== undefined && (
              <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">
                {Math.round(progress.progressPercent)}%
              </span>
            )}
          </div>
        </div>

        {/* Bottom Micro Details */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>Atomic DB Operations</span>
          <span className="flex items-center gap-1 text-emerald-500">
            <CheckCircle2 className="w-3 h-3" />
            Reactive Cache Sync
          </span>
        </div>

      </div>
    </div>
  );
};
