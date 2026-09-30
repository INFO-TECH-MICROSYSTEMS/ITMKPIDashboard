/**
 * KPI View: Quality & Defect Diagnostics
 * In-depth metrics on gating defects, aging queues, discovery vs burnout curves, and MTTR.
 */

import React from 'react';
import { 
  Bug, AlertTriangle, Clock, RefreshCw, Flame 
} from 'lucide-react';
import type { 
  AgingBuckets, 
  DefectSeverityCounts, 
  TrendPoint, 
  JiraWorkItem 
} from '../../../types/kpiPlatform';
import { MetricCard, AreaTrendChart } from '../VisualWidgets';

interface QualityDefectViewProps {
  agingBuckets: AgingBuckets;
  severityCounts: DefectSeverityCounts;
  defectTrends: TrendPoint[];
  mttrMttd: {
    avgMttrHours: number;
    avgMttdHours: number;
    reopenRate: number;
    reopenedCount: number;
  };
  jiraItems: JiraWorkItem[];
}

export const QualityDefectView: React.FC<QualityDefectViewProps> = ({
  agingBuckets,
  severityCounts,
  defectTrends,
  mttrMttd,
  jiraItems
}) => {
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
          title="Mean Time to Resolve (MTTR)"
          value={`${mttrMttd.avgMttrHours} hrs`}
          target="< 24.0 hrs"
          trend="8.5% faster"
          trendPositive={true}
          statusBadge="Active SLA"
          statusColor="emerald"
          icon={<Clock className="w-5 h-5 text-emerald-500" />}
        />
        <MetricCard
          title="Mean Time to Detect (MTTD)"
          value={`${mttrMttd.avgMttdHours} hrs`}
          target="< 6.0 hrs"
          statusBadge="Fast Discovery"
          statusColor="cyan"
          icon={<Flame className="w-5 h-5 text-cyan-500" />}
        />
        <MetricCard
          title="Defect Reopen Rate"
          value={`${mttrMttd.reopenRate}%`}
          target="< 5.0%"
          trend={`${mttrMttd.reopenedCount} reopened`}
          trendPositive={mttrMttd.reopenRate < 5}
          statusBadge={mttrMttd.reopenRate < 5 ? 'Stable' : 'Elevated'}
          statusColor={mttrMttd.reopenRate < 5 ? 'emerald' : 'amber'}
          icon={<RefreshCw className="w-5 h-5 text-amber-500" />}
        />
        <MetricCard
          title="Customer Escalations (APARs)"
          value={customerAparList.length}
          target="< 10 Total"
          statusBadge="Direct Customer Impact"
          statusColor={customerAparList.length > 15 ? 'rose' : 'purple'}
          icon={<Bug className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* Aging of Items Pending Testing (PPT Requirement: 7, 7-14, 14-21, 21+ days) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Items Pending Testing Aging Profile
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Backlog latency for items queued in "Under QA" state before verification completion.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
            Total In QA Queue: {totalAgingItems} Items
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {/* < 7 Days */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block font-mono">
              &lt; 7 Days Pending
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                {agingBuckets.pending7Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Fresh / Healthy
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
          <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30">
            <span className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 block font-mono">
              7 - 14 Days Pending
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-700 dark:text-cyan-400">
                {agingBuckets.pending7To14Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                Normal Cadence
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
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block font-mono">
              14 - 21 Days Pending
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-700 dark:text-amber-400">
                {agingBuckets.pending14To21Days}
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                At Risk
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
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30">
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block font-mono">
              21+ Days (Stale / Gated)
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-rose-700 dark:text-rose-400">
                {agingBuckets.pending21PlusDays}
              </span>
              <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                Critical SLA Breach
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
            title="Defect Discovery Rate vs. Defect Resolution Burnout (14-Day Velocity)"
            series1Name="Discovered Defects"
            series2Name="Resolved / Burned Out"
            series1Color="#f43f5e" // Rose
            series2Color="#10b981" // Emerald
            height={240}
          />
        </div>

        {/* Severity Distribution */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h4 className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white">
            Defect Severity Breakdown
          </h4>

          <div className="space-y-3">
            {[
              { label: 'P1 - Blocker (Gating)', count: severityCounts.blockerP1, color: 'bg-rose-600', text: 'text-rose-600 dark:text-rose-400' },
              { label: 'P2 - Critical Release Defect', count: severityCounts.criticalP2, color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
              { label: 'P3 - Major Functional Defect', count: severityCounts.majorP3, color: 'bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400' },
              { label: 'P4 - Minor / Cosmetic Defect', count: severityCounts.minorP4, color: 'bg-slate-400', text: 'text-slate-600 dark:text-slate-400' }
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
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm font-['Outfit']">
            <AlertTriangle className="w-4 h-4" />
            <span>Active Release Gating Defects ({gatingDefectsList.length} Items Require Sign-off)</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">Key</th>
                  <th className="p-2.5">Title</th>
                  <th className="p-2.5">Severity</th>
                  <th className="p-2.5">Product</th>
                  <th className="p-2.5">Component</th>
                  <th className="p-2.5">QA Owner</th>
                  <th className="p-2.5 rounded-r-lg">Status</th>
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
    </div>
  );
};
