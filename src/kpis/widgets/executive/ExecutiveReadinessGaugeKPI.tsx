/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertOctagon, CheckCircle2 } from 'lucide-react';
import { GaugeMeter, KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import { KPI_STATUS_THEMES } from '../../../constants/kpiConstants';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const ExecutiveReadinessGaugeKPI: React.FC<KPIWidgetRenderProps> = ({ metrics, metricsB, isCompareMode, onJustifyMetric, onRemove }) => {
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

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${currentThemeA.card}`}>
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('releaseQualityIndex')}
        onRemove={onRemove}
      />

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

          <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-slate-900 dark:text-white">
            Pre-Release Quality & Risk Assessment
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

      {isCompareMode && scorecardB && (
        <div className={`mt-6 pt-6 border-t ${currentThemeB.footerBorder} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <GaugeMeter
              score={scorecardB.overallScore}
              title="Scope 2 Quality Index"
              subtitle="Comparative Gate Score"
              grade={scorecardB.releaseReadyGrade}
              size={165}
              onJustify={() => onJustifyMetric?.('releaseQualityIndex')}
            />
          </div>
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-bold uppercase text-purple-700 dark:text-purple-400 block mb-1">
              Scope 2 Readiness: {scorecardB.readinessVerdict}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 text-xs font-mono">
                <span className="text-slate-400 block">Blockers</span>
                <span className="font-bold">{scorecardB.gatingDefectCount}</span>
              </div>
              <div className="p-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 text-xs font-mono">
                <span className="text-slate-400 block">Leakage</span>
                <span className="font-bold">{scorecardB.defectLeakageRate}%</span>
              </div>
              <div className="p-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 text-xs font-mono">
                <span className="text-slate-400 block">Coverage</span>
                <span className="font-bold">{scorecardB.automationCoverage}%</span>
              </div>
              <div className="p-2.5 rounded-lg border bg-slate-50/50 dark:bg-slate-900/50 text-xs font-mono">
                <span className="text-slate-400 block">SLA</span>
                <span className="font-bold">{scorecardB.slaAdherenceRate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
