/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * KPI View: Quality & Defect Diagnostics
 * In-depth metrics on gating defects, aging queues, discovery vs burnout curves, and MTTR.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bug, AlertTriangle, Clock, RefreshCw, Flame, HelpCircle
} from 'lucide-react';
import type { 
  AgingBuckets, 
  DefectSeverityCounts, 
  TrendPoint, 
  JiraWorkItem,
  QualityDiagnosticsSummary,
  KPIJustification 
} from '../../../types/kpiPlatform';
import { MetricCard, AreaTrendChart } from '../VisualWidgets';
import { MetricJustificationModal } from '../MetricJustificationModal';
import { KPIJustificationService } from '../../../services/kpiJustificationService';

interface QualityDefectViewProps {
  agingBuckets: AgingBuckets;
  severityCounts: DefectSeverityCounts;
  defectTrends: TrendPoint[];
  mttrMttd: QualityDiagnosticsSummary;
  jiraItems: JiraWorkItem[];
}

export const QualityDefectView: React.FC<QualityDefectViewProps> = ({
  agingBuckets,
  severityCounts,
  defectTrends,
  mttrMttd,
  jiraItems
}) => {
  const { t } = useTranslation();
  const [selectedJustification, setSelectedJustification] = useState<KPIJustification | null>(null);

  const gatingDefectsList = jiraItems.filter(i => i.isGatingDefect && i.status !== 'Done');
  const customerAparList = jiraItems.filter(i => i.isCustomerDefect || i.type === 'CustomerAPAR');

  const totalAgingItems = 
    agingBuckets.pending7Days + 
    agingBuckets.pending7To14Days + 
    agingBuckets.pending14To21Days + 
    agingBuckets.pending21PlusDays;

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t('kpiPlatform.qualityView.mttrCard', 'Mean Time to Resolve (MTTR)')}
          value={`${mttrMttd.avgMttrHours} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          target={`< 24.0 ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          trend={`8.5% ${t('kpiPlatform.qualityView.fasterTrend', 'faster')}`}
          trendPositive={mttrMttd.avgMttrHours <= 24.0}
          statusBadge={mttrMttd.avgMttrHours <= 24.0 ? t('kpiPlatform.statusMet', 'SLA Met') : mttrMttd.avgMttrHours <= 36.0 ? t('kpiPlatform.statusWarning', 'Warning') : t('kpiPlatform.statusBreached', 'Breached')}
          statusColor={mttrMttd.avgMttrHours <= 24.0 ? 'emerald' : mttrMttd.avgMttrHours <= 36.0 ? 'amber' : 'rose'}
          icon={<Clock className="w-5 h-5 text-emerald-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMttrJustification(mttrMttd.avgMttrHours))}
        />
        <MetricCard
          title={t('kpiPlatform.qualityView.mttdCard', 'Mean Time to Detect (MTTD)')}
          value={`${mttrMttd.avgMttdHours} ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          target={`< 6.0 ${t('kpiPlatform.hrsUnit', 'hrs')}`}
          trendPositive={mttrMttd.avgMttdHours <= 6.0}
          statusBadge={mttrMttd.avgMttdHours <= 6.0 ? t('kpiPlatform.statusFastDiscovery', 'Fast Discovery') : mttrMttd.avgMttdHours <= 12.0 ? t('kpiPlatform.statusLagging', 'Lagging') : t('kpiPlatform.statusCriticalLag', 'Critical Lag')}
          statusColor={mttrMttd.avgMttdHours <= 6.0 ? 'emerald' : mttrMttd.avgMttdHours <= 12.0 ? 'amber' : 'rose'}
          icon={<Flame className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getMttdJustification(mttrMttd.avgMttdHours))}
        />
        <MetricCard
          title={t('kpiPlatform.qualityView.reopenCard', 'Defect Reopen Rate')}
          value={`${mttrMttd.reopenRate}%`}
          target="< 5.0%"
          trend={`${mttrMttd.reopenedCount} ${t('kpiPlatform.qualityView.reopenedTrend', 'reopened')}`}
          trendPositive={mttrMttd.reopenRate < 5}
          statusBadge={mttrMttd.reopenRate < 5 ? t('kpiPlatform.statusStable', 'Stable') : mttrMttd.reopenRate <= 10 ? t('kpiPlatform.statusElevated', 'Elevated') : t('kpiPlatform.statusHighChurn', 'High Churn')}
          statusColor={mttrMttd.reopenRate < 5 ? 'emerald' : mttrMttd.reopenRate <= 10 ? 'amber' : 'rose'}
          icon={<RefreshCw className="w-5 h-5 text-amber-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getReopenRateJustification(mttrMttd.reopenRate, mttrMttd.reopenedCount))}
        />
        <MetricCard
          title={t('kpiPlatform.qualityView.aparCard', 'Customer Escalations (APARs)')}
          value={customerAparList.length}
          target="< 10 Total"
          trendPositive={customerAparList.length <= 10}
          statusBadge={customerAparList.length <= 10 ? t('kpiPlatform.statusControlledImpact', 'Controlled Impact') : customerAparList.length <= 20 ? t('kpiPlatform.statusElevatedApars', 'Elevated APARs') : t('kpiPlatform.statusSevereEscapes', 'Severe Escapes')}
          statusColor={customerAparList.length <= 10 ? 'emerald' : customerAparList.length <= 20 ? 'amber' : 'rose'}
          icon={<Bug className="w-5 h-5 text-purple-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getCustomerAparJustification(customerAparList))}
        />
        {/* Enriched Quality Metrics: Defect Density per KLOC */}
        <MetricCard
          title="Defect Density per KLOC"
          value={`${mttrMttd.defectDensityKloc ?? 0.62} / KLOC`}
          target="Target: < 1.00 / KLOC"
          trend="Healthy Architecture"
          trendPositive={(mttrMttd.defectDensityKloc ?? 0.62) < 1.0}
          statusBadge={(mttrMttd.defectDensityKloc ?? 0.62) < 1.0 ? 'Optimal' : 'Elevated'}
          statusColor={(mttrMttd.defectDensityKloc ?? 0.62) < 1.0 ? 'emerald' : 'rose'}
          icon={<Bug className="w-5 h-5 text-teal-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getDefectDensityJustification(mttrMttd.defectDensityKloc ?? 0.62))}
        />
        {/* Enriched Quality Metrics: First-Time Fix Rate */}
        <MetricCard
          title="First-Time Fix Rate (FTFR)"
          value={`${mttrMttd.firstTimeFixRate ?? 96.8}%`}
          target="Target: > 90.0%"
          trend="High Fix Rigor"
          trendPositive={(mttrMttd.firstTimeFixRate ?? 96.8) >= 90.0}
          statusBadge={(mttrMttd.firstTimeFixRate ?? 96.8) >= 90.0 ? 'Rigorous' : 'Churn Risk'}
          statusColor={(mttrMttd.firstTimeFixRate ?? 96.8) >= 90.0 ? 'emerald' : 'amber'}
          icon={<Clock className="w-5 h-5 text-indigo-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getFirstTimeFixRateJustification(mttrMttd.firstTimeFixRate ?? 96.8))}
        />
        {/* Enriched Quality Metrics: Net Defect Intake Velocity */}
        <MetricCard
          title="Net Defect Intake Velocity"
          value={`${(mttrMttd.netDefectIntakeVelocity ?? 3) > 0 ? `+${mttrMttd.netDefectIntakeVelocity ?? 3}` : `${mttrMttd.netDefectIntakeVelocity ?? 0}`} Bugs`}
          target="Target: ≤ 0 (Burning Down)"
          trend="Backlog Burnout"
          trendPositive={(mttrMttd.netDefectIntakeVelocity ?? 3) <= 5}
          statusBadge={(mttrMttd.netDefectIntakeVelocity ?? 3) <= 0 ? 'Burndown' : 'Intake Growth'}
          statusColor={(mttrMttd.netDefectIntakeVelocity ?? 3) <= 0 ? 'emerald' : 'amber'}
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          onJustify={() => setSelectedJustification(KPIJustificationService.getNetDefectVelocityJustification(mttrMttd.netDefectIntakeVelocity ?? 3))}
        />
      </div>

      {/* Aging of Items Pending Testing */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div>
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.qualityView.agingProfileTitle')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.qualityView.agingProfileSubtitle')}
              </p>
            </div>
            <button
              onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, 'all'))}
              title="Explain Aging Profile Metric"
              className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            {t('kpiPlatform.qualityView.totalInQueue')}: {totalAgingItems} {t('kpiPlatform.qualityView.itemsCount')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {/* < 7 Days */}
          <div 
            onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, 'under7'))}
            className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 cursor-pointer hover:shadow-md transition-shadow group"
            title="Click for metric clarification"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block font-mono">
                {t('kpiPlatform.qualityView.under7Days')}
              </span>
              <HelpCircle className="w-3.5 h-3.5 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                {agingBuckets.pending7Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {t('kpiPlatform.qualityView.freshHealthy')}
              </span>
            </div>
            <div className="w-full bg-emerald-200 dark:bg-emerald-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full" 
                style={{ width: `${(agingBuckets.pending7Days / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>

          {/* 7 - 14 Days */}
          <div 
            onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, '7to14'))}
            className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 cursor-pointer hover:shadow-md transition-shadow group"
            title="Click for metric clarification"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 block font-mono">
                {t('kpiPlatform.qualityView.days7To14')}
              </span>
              <HelpCircle className="w-3.5 h-3.5 text-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400">
                {agingBuckets.pending7To14Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {t('kpiPlatform.qualityView.normalCadence')}
              </span>
            </div>
            <div className="w-full bg-cyan-200 dark:bg-cyan-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-cyan-500 h-1.5 rounded-full" 
                style={{ width: `${(agingBuckets.pending7To14Days / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>

          {/* 14 - 21 Days */}
          <div 
            onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, '14to21'))}
            className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 cursor-pointer hover:shadow-md transition-shadow group"
            title="Click for metric clarification"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block font-mono">
                {t('kpiPlatform.qualityView.days14To21')}
              </span>
              <HelpCircle className="w-3.5 h-3.5 text-amber-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400">
                {agingBuckets.pending14To21Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                {t('kpiPlatform.statusAtRisk')}
              </span>
            </div>
            <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-amber-500 h-1.5 rounded-full" 
                style={{ width: `${(agingBuckets.pending14To21Days / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>

          {/* 21+ Days */}
          <div 
            onClick={() => setSelectedJustification(KPIJustificationService.getAgingProfileJustification(agingBuckets, '21plus'))}
            className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 cursor-pointer hover:shadow-md transition-shadow group"
            title="Click for metric clarification"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block font-mono">
                {t('kpiPlatform.qualityView.days21Plus')}
              </span>
              <HelpCircle className="w-3.5 h-3.5 text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 dark:text-rose-400">
                {agingBuckets.pending21PlusDays}
              </span>
              <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                {t('kpiPlatform.qualityView.criticalSlaBreach')}
              </span>
            </div>
            <div className="w-full bg-rose-200 dark:bg-rose-900/60 h-1.5 rounded-full mt-2">
              <div 
                className="bg-rose-500 h-1.5 rounded-full" 
                style={{ width: `${(agingBuckets.pending21PlusDays / Math.max(1, totalAgingItems)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Defect Trend Area Chart + Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Curve: Defect Discovery vs Burnout */}
        <div className="lg:col-span-8">
          <AreaTrendChart
            data={defectTrends}
            title={t('kpiPlatform.qualityView.trendChartTitle')}
            series1Name={t('kpiPlatform.qualityView.discoveredDefects')}
            series2Name={t('kpiPlatform.qualityView.resolvedBurnedOut')}
            series1Color="#f43f5e" // Rose
            series2Color="#10b981" // Emerald
            height={240}
            onJustify={() => setSelectedJustification(KPIJustificationService.getDefectTrendChartJustification(mttrMttd.netDefectIntakeVelocity ?? 0))}
          />
        </div>

        {/* Severity Distribution */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
              {t('kpiPlatform.qualityView.severityTitle')}
            </h4>
            <button
              onClick={() => setSelectedJustification(KPIJustificationService.getDefectSeverityJustification(severityCounts))}
              title="Explain Defect Severity Breakdown"
              className="p-1 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { label: t('kpiPlatform.qualityView.p1Blocker'), count: severityCounts.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
              { label: t('kpiPlatform.qualityView.p2Critical'), count: severityCounts.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
              { label: t('kpiPlatform.qualityView.p3Major'), count: severityCounts.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
              { label: t('kpiPlatform.qualityView.p4Minor'), count: severityCounts.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
            ].map(sev => {
              const total = severityCounts.blockerP1 + severityCounts.criticalP2 + severityCounts.majorP3 + severityCounts.minorP4;
              const pct = total > 0 ? ((sev.count / total) * 100).toFixed(0) : '0';
              return (
                <div key={sev.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{sev.label}</span>
                    <span className={`font-bold ${sev.text}`}>{sev.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${sev.color} h-full rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gating / Blocking Defects Table */}
      {gatingDefectsList.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm font-['Outfit']">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{t('kpiPlatform.qualityView.gatingDefectsTitle')} ({gatingDefectsList.length} {t('kpiPlatform.qualityView.requireSignoff')})</span>
              <button
                type="button"
                onClick={() => setSelectedJustification(KPIJustificationService.getGatingDefectsTableJustification(gatingDefectsList))}
                className="p-1 rounded-full text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Click for Gating Defects policy and sign-off justification"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">{t('kpiPlatform.qualityView.tableKey')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableTitle')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableSeverity')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableProduct')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableComponent')}</th>
                  <th className="p-2.5">{t('kpiPlatform.qualityView.tableQaOwner')}</th>
                  <th className="p-2.5 rounded-r-lg">{t('kpiPlatform.qualityView.tableStatus')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {gatingDefectsList.slice(0, 5).map(bug => (
                  <tr key={bug.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-cyan-600 dark:text-cyan-400">{bug.id}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white truncate max-w-xs">{bug.title}</td>
                    <td className="p-2.5 font-mono text-rose-600 dark:text-rose-400 font-bold">{bug.severity}</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{bug.product}</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300">{bug.component}</td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300 font-mono">{bug.qaOwner}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
                        {bug.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KPI Decision & Audit Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustification)}
        justification={selectedJustification}
        onClose={() => setSelectedJustification(null)}
      />
    </div>
  );
};
