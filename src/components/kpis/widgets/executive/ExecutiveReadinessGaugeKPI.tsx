/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertOctagon, CheckCircle2, Gauge, HelpCircle } from 'lucide-react';
import { GaugeMeter, KPIActionToolbar } from '../../../kpi/VisualWidgets';
import { KPI_STATUS_THEMES } from '../../../../constants/kpiConstants';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveReadinessGaugeKPI: React.FC<KPIWidgetRenderProps> = ({ 
  metrics, 
  metricsB, 
  isCompareMode, 
  onJustifyMetric, 
  onRemove,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2'
}) => {
  const scorecard = metrics.executiveScorecard;
  const scorecardB = metricsB?.executiveScorecard;

  const verdictStatusKeyA: 'emerald' | 'amber' | 'rose' = 
    scorecard?.readinessVerdict === 'Release Approved' 
      ? 'emerald' 
      : scorecard?.readinessVerdict === 'Conditional Warning' 
      ? 'amber' 
      : 'rose';

  const currentThemeA = KPI_STATUS_THEMES[verdictStatusKeyA];

  const verdictStatusKeyB: 'emerald' | 'amber' | 'rose' = 
    scorecardB?.readinessVerdict === 'Release Approved' 
      ? 'emerald' 
      : scorecardB?.readinessVerdict === 'Conditional Warning' 
      ? 'amber' 
      : 'rose';

  const currentThemeB = KPI_STATUS_THEMES[verdictStatusKeyB];

  if (!scorecard) return null;

  // Single-Scope Standard View
  if (!isCompareMode || !scorecardB) {
    return (
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentThemeA.card}`}>
        {onRemove && (
          <KPIActionToolbar
            onRemove={onRemove}
          />
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dial Meter */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r ${currentThemeA.footerBorder} pb-6 lg:pb-0 lg:pr-6`}>
            <GaugeMeter
              score={scorecard.overallScore}
              title="Release Quality Index"
              subtitle="Composite score across testing gates"
              grade={scorecard.releaseReadyGrade}
              size={185}
              onJustify={() => onJustifyMetric?.('releaseQualityIndex')}
            />
          </div>

          {/* Verdict & Executive Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
                Senior Management Executive Evaluation
              </span>
              <button 
                type="button"
                onClick={() => onJustifyMetric?.('releaseQualityIndex')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer ${currentThemeA.badge}`}
                title="Click to see why this release verdict was triggered"
              >
                {scorecard.readinessVerdict === 'Release Approved' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertOctagon className="w-4 h-4" />
                )}
                <span>{scorecard.readinessVerdict || 'Gated / Blocked'}</span>
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Gauge className="w-7 h-7 text-cyan-500 shrink-0" />
              <span>Pre-Release Quality & Risk Assessment</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('releaseQualityIndex')}
                  className="p-1 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              )}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Composite telemetry evaluating test coverage, regression cycle velocity, unresolved gating defects, and customer escape rate. Release status is automatically locked when active P1 blockers or critical regressions exceed compliance thresholds.
            </p>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Gating Defects</span>
                <span className={`text-xl font-bold font-mono ${scorecard.gatingDefectCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {scorecard.gatingDefectCount} Blockers
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Defect Leakage</span>
                <span className={`text-xl font-bold font-mono ${scorecard.defectLeakageRate <= 3.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {scorecard.defectLeakageRate}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Automation Coverage</span>
                <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400">
                  {scorecard.automationCoverage}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">SLA Adherence</span>
                <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {scorecard.slaAdherenceRate}%
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Dual Comparison Mode: Scope 1 (Blue) on top of Scope 2 (Purple) in the exact same format
  return (
    <div className="space-y-4 relative">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 Section (Blue accent) */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentThemeA.card}`}>
        {/* Scope 1 Header Tag */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div 
            className="flex items-center gap-2 cursor-help min-w-0"
            title={scopeALabel}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 truncate max-w-md">
              {scopeALabel}
            </span>
          </div>
          <button 
            type="button"
            onClick={() => onJustifyMetric?.('releaseQualityIndex', 'A')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer ${currentThemeA.badge}`}
            title="Click to see why this release verdict was triggered"
          >
            {scorecard.readinessVerdict === 'Release Approved' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertOctagon className="w-4 h-4" />
            )}
            <span>{scorecard.readinessVerdict || 'Gated / Blocked'}</span>
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dial Meter */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r ${currentThemeA.footerBorder} pb-6 lg:pb-0 lg:pr-6`}>
            <GaugeMeter
              score={scorecard.overallScore}
              title="Release Quality Index"
              subtitle="Composite score across testing gates"
              grade={scorecard.releaseReadyGrade}
              size={185}
              onJustify={() => onJustifyMetric?.('releaseQualityIndex', 'A')}
            />
          </div>

          {/* Verdict & Executive Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
                Senior Management Executive Evaluation
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Gauge className="w-7 h-7 text-cyan-500 shrink-0" />
              <span>Pre-Release Quality & Risk Assessment</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('releaseQualityIndex', 'A')}
                  className="p-1 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              )}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Composite telemetry evaluating test coverage, regression cycle velocity, unresolved gating defects, and customer escape rate. Release status is automatically locked when active P1 blockers or critical regressions exceed compliance thresholds.
            </p>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Gating Defects</span>
                <span className={`text-xl font-bold font-mono ${scorecard.gatingDefectCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {scorecard.gatingDefectCount} Blockers
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Defect Leakage</span>
                <span className={`text-xl font-bold font-mono ${scorecard.defectLeakageRate <= 3.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {scorecard.defectLeakageRate}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Automation Coverage</span>
                <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400">
                  {scorecard.automationCoverage}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeA.calloutBg} ${currentThemeA.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">SLA Adherence</span>
                <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {scorecard.slaAdherenceRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scope 2 Section (Purple accent) - Exact same structure & layout directly below Scope 1 */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentThemeB.card}`}>
        {/* Scope 2 Header Tag */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div 
            className="flex items-center gap-2 cursor-help min-w-0"
            title={scopeBLabel}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 truncate max-w-md">
              {scopeBLabel}
            </span>
          </div>
          <button 
            type="button"
            onClick={() => onJustifyMetric?.('releaseQualityIndex', 'B')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer ${currentThemeB.badge}`}
            title="Click to see why this release verdict was triggered"
          >
            {scorecardB.readinessVerdict === 'Release Approved' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertOctagon className="w-4 h-4" />
            )}
            <span>{scorecardB.readinessVerdict || 'Gated / Blocked'}</span>
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dial Meter */}
          <div className={`lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r ${currentThemeB.footerBorder} pb-6 lg:pb-0 lg:pr-6`}>
            <GaugeMeter
              score={scorecardB.overallScore}
              title="Scope 2 Quality Index"
              subtitle="Composite score across testing gates"
              grade={scorecardB.releaseReadyGrade}
              size={185}
              onJustify={() => onJustifyMetric?.('releaseQualityIndex', 'B')}
            />
          </div>

          {/* Verdict & Executive Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
              <span className="text-xs font-mono uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
                Senior Management Executive Evaluation
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Gauge className="w-7 h-7 text-purple-500 shrink-0" />
              <span>Pre-Release Quality & Risk Assessment</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('releaseQualityIndex', 'B')}
                  className="p-1 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              )}
            </h3>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Composite telemetry evaluating test coverage, regression cycle velocity, unresolved gating defects, and customer escape rate. Release status is automatically locked when active P1 blockers or critical regressions exceed compliance thresholds.
            </p>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className={`p-3 rounded-xl border ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Gating Defects</span>
                <span className={`text-xl font-bold font-mono ${scorecardB.gatingDefectCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {scorecardB.gatingDefectCount} Blockers
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Defect Leakage</span>
                <span className={`text-xl font-bold font-mono ${scorecardB.defectLeakageRate <= 3.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {scorecardB.defectLeakageRate}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">Automation Coverage</span>
                <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400">
                  {scorecardB.automationCoverage}%
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${currentThemeB.calloutBg} ${currentThemeB.calloutBorder} shadow-2xs`}>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">SLA Adherence</span>
                <span className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                  {scorecardB.slaAdherenceRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
