/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const NonFormalInterceptedDefectsTableKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  const defects = [
    { key: 'YOU-2812', title: 'Unexpected memory leak in Player Runtime & DRM under high concurrency', severity: 'P1-Blocker', origin: 'Exploratory / Ad-hoc', avoided: '$14,500', backfill: 'TR-REG-2812' },
    { key: 'YOU-1537', title: 'Unexpected memory leak in Recommendation Feed Algorithm', severity: 'P2-Critical', origin: 'Exploratory / Ad-hoc', avoided: '$6,800', backfill: 'TR-REG-1537' },
    { key: 'YOU-2027', title: 'Visual rendering regression on dark theme toggle in Video player', severity: 'P2-Critical', origin: 'Bug Bash / Dogfooding', avoided: '$6,800', backfill: 'Pending Backfill' },
    { key: 'YOU-1038', title: 'Session logout bypass during fast navigation across Recommendation Feed', severity: 'P1-Blocker', origin: 'Bug Bash / Dogfooding', avoided: '$14,500', backfill: 'TR-REG-1038' },
    { key: 'YOU-1561', title: 'Deadlock race condition in Recommendation Feed Algorithm', severity: 'P2-Critical', origin: 'Exploratory / Ad-hoc', avoided: '$6,800', backfill: 'TR-REG-1561' },
    { key: 'YOU-3038', title: 'Visual rendering regression on dark theme toggle in Live Streaming', severity: 'P1-Blocker', origin: 'Bug Bash / Dogfooding', avoided: '$14,500', backfill: 'TR-REG-3038' }
  ];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('nonFormalDefectsTable')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <div>
          <span className="text-sm font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Major Defects Intercepted via Non-Formal Testing</span>
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            High-severity bugs found during exploratory sessions that prevented production escape
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/60 font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px]">
            <tr>
              <th className="p-2.5 rounded-l-lg">Key</th>
              <th className="p-2.5">Title</th>
              <th className="p-2.5">Severity</th>
              <th className="p-2.5">Discovery Origin</th>
              <th className="p-2.5">Avoided Outage Impact</th>
              <th className="p-2.5 rounded-r-lg">TestRail Backfill</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
            {defects.map(d => (
              <tr key={d.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-2.5 font-bold text-cyan-600 dark:text-cyan-400">{d.key}</td>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-white max-w-xs truncate">{d.title}</td>
                <td className="p-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    d.severity === 'P1-Blocker' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                  }`}>
                    {d.severity}
                  </span>
                </td>
                <td className="p-2.5 text-slate-600 dark:text-slate-300">{d.origin}</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">{d.avoided}</td>
                <td className="p-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    d.backfill.includes('TR-') ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60' : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
                  }`}>
                    {d.backfill}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
