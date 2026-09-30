/**
 * Component: MetricJustificationModal
 * Provides in-depth audit trail, mathematical formulas, rule violations,
 * root causes, and recommended actions for any KPI in the platform.
 */

import React, { useEffect } from 'react';
import { 
  X, AlertOctagon, AlertTriangle, CheckCircle2, 
  HelpCircle, Lightbulb 
} from 'lucide-react';
import type { KPIJustification } from '../../types/kpiPlatform';

interface MetricJustificationModalProps {
  justification: KPIJustification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MetricJustificationModal: React.FC<MetricJustificationModalProps> = ({
  justification,
  isOpen,
  onClose
}) => {
  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !justification) return null;

  const headerStatusStyles = {
    rose: {
      border: 'border-rose-300 dark:border-rose-500/40',
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-500/40',
      icon: <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
    },
    amber: {
      border: 'border-amber-300 dark:border-amber-500/40',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-500/40',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
    },
    emerald: {
      border: 'border-emerald-300 dark:border-emerald-500/40',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
    },
    cyan: {
      border: 'border-cyan-300 dark:border-cyan-500/40',
      badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40',
      icon: <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
    },
    purple: {
      border: 'border-purple-300 dark:border-purple-500/40',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-500/40',
      icon: <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
    }
  };

  const currentTheme = headerStatusStyles[justification.statusColor] || headerStatusStyles.cyan;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-slate-800/40 ${currentTheme.border}`}>
          <div className="flex items-start gap-3">
            {currentTheme.icon}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  KPI Decision Audit & Justification
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold shadow-2xs ${currentTheme.badge}`}>
                  {justification.statusBadge}
                </span>
              </div>
              <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
                {justification.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Status & Values Overview Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Current Telemetry</span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
                {justification.currentValue}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">Governance Target</span>
              <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">
                {justification.targetValue}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 dark:text-slate-400 block">Status Verdict</span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
                {justification.statusBadge}
              </span>
            </div>
          </div>

          {/* Rationale & Root Cause Explanation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>Why Is This Status / Grade Assigned?</span>
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
              {justification.rationale}
            </div>
          </div>

          {/* Evaluated Rule or Formula */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
              Governing Rule & Metric Formula
            </h4>
            <pre className="p-3.5 rounded-xl bg-slate-900 dark:bg-slate-950 text-cyan-400 text-xs font-mono overflow-x-auto border border-slate-800 whitespace-pre-wrap">
              {justification.formulaOrRule}
            </pre>
          </div>

          {/* Breakdown of Contributing Factors (if provided) */}
          {justification.factors && justification.factors.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                Evaluation Factors & Score Penalties
              </h4>
              <div className="space-y-2">
                {justification.factors.map((f, i) => (
                  <div 
                    key={i} 
                    className="p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800"
                  >
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block font-['Outfit']">
                        {f.factor}
                      </span>
                      <p className="text-slate-600 dark:text-slate-400">{f.details}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md font-mono font-bold text-[11px] shrink-0 ${
                      f.status === 'critical'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : f.status === 'warning'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {f.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offending Items / Evidence Sample (from DB) */}
          {justification.offendingItems && justification.offendingItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                  Offending Entities (Evidence From Database)
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  {justification.offendingItems.length} Identified
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                {justification.offendingItems.map(item => (
                  <div key={item.id} className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
                        {item.source}: {item.id}
                      </span>
                      <span className="truncate text-slate-800 dark:text-slate-200 font-medium">
                        {item.title}
                      </span>
                    </div>
                    {item.severityOrStatus && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold shrink-0">
                        {item.severityOrStatus}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Path to Green */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Recommended Remediation (Path to Green)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {justification.recommendedAction}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-mono text-xs font-bold transition-all shadow-sm"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
