/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { KPIActionToolbar } from '../../../components/kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceEnterpriseSlasMatrixKPI: React.FC<KPIWidgetRenderProps> = ({
  onJustifyMetric,
  onRemove
}) => {
  const slas = [
    { name: 'Defect Triage SLA (P1 < 4h, P2 < 24h)', desc: 'Rapid initial triage and assessment for blocking and critical defects.', adherence: '97.7%', target: '95.0%', status: 'Compliant' },
    { name: 'Regression Execution SLA', desc: 'Execution of complete regression cycle within scheduled sprint window.', adherence: '95.9%', target: '90.0%', status: 'Compliant' },
    { name: 'Test Case Creation SLA', desc: 'Test plans authored and reviewed prior to development handoff.', adherence: '87%', target: '90.0%', status: 'At Risk' },
    { name: 'Daily QA Status Report SLA', desc: 'Automated executive and squad reporting published every day at 17:00.', adherence: '100%', target: '98.0%', status: 'Compliant' },
    { name: 'Automation Delivery SLA', desc: 'In-sprint test automation completed within the same sprint as feature code.', adherence: '93.5%', target: '85.0%', status: 'Compliant' },
    { name: 'Customer Defect Resolution SLA', desc: 'Hotfix turnaround for high-impact customer APARs (83/167).', adherence: '49.7%', target: '90.0%', status: 'Breached' }
  ];

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative">
      <KPIActionToolbar
        onJustify={() => onJustifyMetric?.('enterpriseSlasMatrix')}
        onRemove={onRemove}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 pr-16">
        <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
          Enterprise Quality Service Level Agreements (SLAs)
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slas.map((sla) => (
          <div key={sla.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-['Outfit']">
                {sla.name}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                sla.status === 'Compliant' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                  : sla.status === 'At Risk'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
              }`}>
                {sla.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {sla.desc}
            </p>
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <span className="text-slate-600 dark:text-slate-400">
                Adherence: <strong className={sla.status === 'Breached' ? 'text-rose-600' : 'text-emerald-600'}>{sla.adherence}</strong>
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Target SLA: {sla.target}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
