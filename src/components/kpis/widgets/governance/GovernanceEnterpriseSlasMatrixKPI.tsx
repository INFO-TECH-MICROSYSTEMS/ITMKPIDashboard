/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { KPIActionToolbar } from '../../../kpi/VisualWidgets';
import type { KPIWidgetRenderProps } from '../../registry/kpiRegistry';

export const GovernanceEnterpriseSlasMatrixKPI: React.FC<KPIWidgetRenderProps> = ({
  metrics,
  metricsB,
  isCompareMode,
  scopeALabel = 'Scope 1',
  scopeBLabel = 'Scope 2',
  onJustifyMetric,
  onRemove
}) => {
  const scA = metrics.executiveScorecard;
  const scB = metricsB?.executiveScorecard;

  const slasA = [
    { id: 'defectTriage', name: 'Defect Triage SLA (P1 < 4h, P2 < 24h)', desc: 'Rapid initial triage and assessment for blocking and critical defects.', adherence: `${scA?.slaBreakdown?.p1P2TriageRate ?? 97.7}%`, rateNum: scA?.slaBreakdown?.p1P2TriageRate ?? 97.7, target: '95.0%', targetNum: 95.0 },
    { id: 'regressionExec', name: 'Regression Execution SLA', desc: 'Execution of complete regression cycle within scheduled sprint window.', adherence: `${scA?.slaBreakdown?.regressionExecutionRate ?? 95.9}%`, rateNum: scA?.slaBreakdown?.regressionExecutionRate ?? 95.9, target: '90.0%', targetNum: 90.0 },
    { id: 'testCreation', name: 'Test Case Creation SLA', desc: 'Test plans authored and reviewed prior to development handoff.', adherence: `${scA?.slaBreakdown?.testPlanCreationRate ?? 87}%`, rateNum: scA?.slaBreakdown?.testPlanCreationRate ?? 87, target: '90.0%', targetNum: 90.0 },
    { id: 'dailyReport', name: 'Daily QA Status Report SLA', desc: 'Automated executive and squad reporting published every day at 17:00.', adherence: `${scA?.slaBreakdown?.dailyReportRate ?? 100}%`, rateNum: scA?.slaBreakdown?.dailyReportRate ?? 100, target: '98.0%', targetNum: 98.0 },
    { id: 'autoDelivery', name: 'Automation Delivery SLA', desc: 'In-sprint test automation completed within the same sprint as feature code.', adherence: `${scA?.slaBreakdown?.automationDeliveryRate ?? 93.5}%`, rateNum: scA?.slaBreakdown?.automationDeliveryRate ?? 93.5, target: '85.0%', targetNum: 85.0 },
    { id: 'customerResolution', name: 'Customer Defect Resolution SLA', desc: 'Hotfix turnaround for high-impact customer APARs (83/167).', adherence: `${scA?.slaBreakdown?.customerDefectResolutionRate ?? 49.7}%`, rateNum: scA?.slaBreakdown?.customerDefectResolutionRate ?? 49.7, target: '90.0%', targetNum: 90.0 }
  ];

  const slasB = [
    { id: 'defectTriage', name: 'Defect Triage SLA (P1 < 4h, P2 < 24h)', desc: 'Rapid initial triage and assessment for blocking and critical defects.', adherence: `${scB?.slaBreakdown?.p1P2TriageRate ?? 94.2}%`, rateNum: scB?.slaBreakdown?.p1P2TriageRate ?? 94.2, target: '95.0%', targetNum: 95.0 },
    { id: 'regressionExec', name: 'Regression Execution SLA', desc: 'Execution of complete regression cycle within scheduled sprint window.', adherence: `${scB?.slaBreakdown?.regressionExecutionRate ?? 92.1}%`, rateNum: scB?.slaBreakdown?.regressionExecutionRate ?? 92.1, target: '90.0%', targetNum: 90.0 },
    { id: 'testCreation', name: 'Test Case Creation SLA', desc: 'Test plans authored and reviewed prior to development handoff.', adherence: `${scB?.slaBreakdown?.testPlanCreationRate ?? 85.0}%`, rateNum: scB?.slaBreakdown?.testPlanCreationRate ?? 85.0, target: '90.0%', targetNum: 90.0 },
    { id: 'dailyReport', name: 'Daily QA Status Report SLA', desc: 'Automated executive and squad reporting published every day at 17:00.', adherence: `${scB?.slaBreakdown?.dailyReportRate ?? 99.0}%`, rateNum: scB?.slaBreakdown?.dailyReportRate ?? 99.0, target: '98.0%', targetNum: 98.0 },
    { id: 'autoDelivery', name: 'Automation Delivery SLA', desc: 'In-sprint test automation completed within the same sprint as feature code.', adherence: `${scB?.slaBreakdown?.automationDeliveryRate ?? 88.0}%`, rateNum: scB?.slaBreakdown?.automationDeliveryRate ?? 88.0, target: '85.0%', targetNum: 85.0 },
    { id: 'customerResolution', name: 'Customer Defect Resolution SLA', desc: 'Hotfix turnaround for high-impact customer APARs.', adherence: `${scB?.slaBreakdown?.customerDefectResolutionRate ?? 52.4}%`, rateNum: scB?.slaBreakdown?.customerDefectResolutionRate ?? 52.4, target: '90.0%', targetNum: 90.0 }
  ];

  return (
    <div className="space-y-4 relative group">
      {onRemove && (
        <KPIActionToolbar
          onRemove={onRemove}
        />
      )}

      {/* Scope 1 SLA Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
          {isCompareMode && (
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider cursor-help"
              title={scopeALabel}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
              <span className="truncate">{scopeALabel}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Enterprise Quality Service Level Agreements (SLAs)</span>
              {onJustifyMetric && (
                <button
                  type="button"
                  onClick={() => onJustifyMetric('enterpriseSlasMatrix', 'A')}
                  className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Click for KPI justification and audit details"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slasA.map((sla) => {
            const isOptimal = sla.rateNum >= sla.targetNum;
            const isWarning = !isOptimal && sla.rateNum >= sla.targetNum - 10;
            const statusLabel = isOptimal ? 'Compliant' : isWarning ? 'At Risk' : 'Breached';
            return (
              <div key={sla.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-['Outfit']">
                    {sla.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                    statusLabel === 'Compliant' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                      : statusLabel === 'At Risk'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  }`}>
                    {statusLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {sla.desc}
                </p>
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    Adherence: <strong className={statusLabel === 'Breached' ? 'text-rose-600' : 'text-emerald-600'}>{sla.adherence}</strong>
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Target SLA: {sla.target}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scope 2 SLA Matrix Stacked Below */}
      {isCompareMode && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="space-y-1.5 pb-2 border-b border-slate-100 dark:border-slate-800 pr-6">
            <div 
              className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider cursor-help"
              title={scopeBLabel}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              <span className="truncate">{scopeBLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Enterprise Quality Service Level Agreements (SLAs)</span>
                {onJustifyMetric && (
                  <button
                    type="button"
                    onClick={() => onJustifyMetric('enterpriseSlasMatrix', 'B')}
                    className="p-0.5 rounded-full text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                    title="Click for Scope 2 KPI justification and audit details"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slasB.map((sla) => {
              const isOptimal = sla.rateNum >= sla.targetNum;
              const isWarning = !isOptimal && sla.rateNum >= sla.targetNum - 10;
              const statusLabel = isOptimal ? 'Compliant' : isWarning ? 'At Risk' : 'Breached';
              return (
                <div key={sla.name} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-['Outfit']">
                      {sla.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                      statusLabel === 'Compliant' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                        : statusLabel === 'At Risk'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {statusLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {sla.desc}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-slate-600 dark:text-slate-400">
                      Adherence: <strong className={statusLabel === 'Breached' ? 'text-rose-600' : 'text-emerald-600'}>{sla.adherence}</strong>
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Target SLA: {sla.target}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
