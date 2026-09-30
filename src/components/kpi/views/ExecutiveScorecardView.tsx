/**
 * KPI View: Executive & Senior Management Scorecard
 * High-level quality governance, release readiness dial, leakage rates, and operational stability.
 */

import React from 'react';
import { 
  AlertOctagon, CheckCircle2, 
  TrendingDown, Clock, Zap 
} from 'lucide-react';
import type { ReleaseQualityScorecard, TestStatusDistribution } from '../../../types/kpiPlatform';
import { GaugeMeter, MetricCard, StackedProgressBar } from '../VisualWidgets';

interface ExecutiveScorecardViewProps {
  scorecard: ReleaseQualityScorecard;
  testDistribution: TestStatusDistribution;
}

export const ExecutiveScorecardView: React.FC<ExecutiveScorecardViewProps> = ({
  scorecard,
  testDistribution
}) => {
  const verdictColors = {
    'Release Approved': 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-500/40',
    'Conditional Warning': 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-500/40',
    'Gated / Blocked': 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-500/40'
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Release Readiness Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white border border-cyan-500/20 shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Dial Meter */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-700/60 pb-6 lg:pb-0 lg:pr-6">
            <GaugeMeter
              score={scorecard.overallScore}
              title="Release Quality Index"
              subtitle="Composite score across testing gates"
              grade={scorecard.releaseReadyGrade}
              size={190}
            />
          </div>

          {/* Verdict & Executive Summary */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Senior Management Executive Evaluation
              </span>
              <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${verdictColors[scorecard.readinessVerdict]}`}>
                {scorecard.readinessVerdict === 'Release Approved' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertOctagon className="w-4 h-4" />
                )}
                <span>{scorecard.readinessVerdict}</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight">
              Pre-Release Quality & Risk Assessment
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Composite telemetry evaluating test coverage, regression cycle velocity, unresolved gating defects, and customer escape rate. Release status is automatically locked when active P1 blockers or critical regressions exceed compliance thresholds.
            </p>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-mono">Gating Defects</span>
                <span className={`text-xl font-bold font-mono ${scorecard.gatingDefectCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {scorecard.gatingDefectCount} Blockers
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-mono">Defect Leakage</span>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {scorecard.defectLeakageRate}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-mono">Automation Coverage</span>
                <span className="text-xl font-bold font-mono text-purple-400">
                  {scorecard.automationCoverage}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block font-mono">SLA Adherence</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {scorecard.slaAdherenceRate}%
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Blocking / Gating Defects"
          value={scorecard.gatingDefectCount}
          target="0 Blockers"
          statusBadge={scorecard.gatingDefectCount === 0 ? 'Clear Gate' : 'Action Required'}
          statusColor={scorecard.gatingDefectCount === 0 ? 'emerald' : 'rose'}
          icon={<AlertOctagon className="w-5 h-5 text-rose-500" />}
        />
        <MetricCard
          title="Defect Leakage (Customer APARs)"
          value={`${scorecard.defectLeakageRate}%`}
          target="< 3.0%"
          trend="-0.8% vs last sprint"
          trendPositive={true}
          statusBadge="Controlled"
          statusColor="cyan"
          icon={<TrendingDown className="w-5 h-5 text-cyan-500" />}
        />
        <MetricCard
          title="Regression Cycle Time"
          value={`${scorecard.regressionCycleTimeDays} Days`}
          target="< 2.5 Days"
          trend="42% faster via SDET"
          trendPositive={true}
          statusBadge="Optimal"
          statusColor="emerald"
          icon={<Clock className="w-5 h-5 text-emerald-500" />}
        />
        <MetricCard
          title="P95 Latency Benchmark"
          value={`${scorecard.performanceP95Ms} ms`}
          target="< 200 ms"
          statusBadge="P99: 380ms"
          statusColor="purple"
          icon={<Zap className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* Aggregate Test Suite Progress Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
          Enterprise Test Suite Execution Snapshot ({testDistribution.total.toLocaleString()} Executed Tests)
        </h4>
        <StackedProgressBar
          distribution={testDistribution}
          title="Consolidated QA Execution Health (Automated + Manual)"
        />
      </div>
    </div>
  );
};
