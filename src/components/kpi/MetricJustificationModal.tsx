/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Component: MetricJustificationModal
 * Provides in-depth audit trail, mathematical formulas, rule violations,
 * root causes, and recommended actions for any KPI in the platform.
 * Subclasses BaseModal to adhere to pure modular architecture.
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertOctagon, AlertTriangle, CheckCircle2, 
  HelpCircle, Lightbulb, Info, ChevronDown, ChevronUp 
} from 'lucide-react';
import type { KPIJustification } from '../../types/kpiPlatform';
import { KPI_STATUS_THEMES } from '../../constants/kpiConstants';
import { 
  getLocalizedOverview, 
  getLocalizedRationale, 
  getLocalizedAction,
  formatLocalizedStatusBadge, 
  formatLocalizedGradeString 
} from '../../services/kpiJustificationLocalization';
import { BaseModal } from '../common/modal/BaseModal';

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
  const { t } = useTranslation();
  const [isOverviewExpanded, setIsOverviewExpanded] = useState<boolean>(false);

  // Reset expanded state when modal opens for a new justification
  useEffect(() => {
    if (isOpen) {
      setIsOverviewExpanded(false);
    }
  }, [isOpen, justification?.title]);

  if (!justification) return null;

  const theme = KPI_STATUS_THEMES[justification.statusColor] || KPI_STATUS_THEMES.cyan;

  const statusIcons = {
    rose: <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
    amber: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
    emerald: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    cyan: <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />,
    purple: <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
  };

  const currentIcon = statusIcons[justification.statusColor] || statusIcons.cyan;

  const formatJustificationTitle = (title: string) => {
    return t(`kpiPlatform.modalTitles.${title}`, title);
  };

  const overviewFallback = justification.overviewAndSignificance || justification.description || '';
  const localizedOverview = getLocalizedOverview(justification.title, overviewFallback);
  const localizedRationale = getLocalizedRationale(justification, justification.rationale);
  const localizedAction = getLocalizedAction(justification, justification.recommendedAction);
  const localizedStatusBadge = formatLocalizedStatusBadge(justification.statusBadge, t);
  const localizedGradeString = formatLocalizedGradeString(justification.statusBadge, t);

  const isLongOverview = overviewFallback.length > 250;

  const modalFooter = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          ITM Telemetry Formula Engine v2.4 (Audited)
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
      >
        Close Audit Details
      </button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      icon={
        <div className={`p-2.5 rounded-2xl border ${theme.badge} shadow-xs`}>
          {currentIcon}
        </div>
      }
      title={formatJustificationTitle(justification.title)}
      subtitle={`Calculated Value: ${justification.currentValue} | Enterprise Benchmark: ${justification.targetValue}`}
      footer={modalFooter}
      bodyClassName="p-6 space-y-5"
    >
      {/* Metric Status Header Summary Bar */}
      <div className={`p-4 rounded-2xl border ${theme.badge} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Evaluation Status
            </span>
            <div className="text-base font-bold font-['Outfit'] capitalize">
              {localizedStatusBadge}
            </div>
          </div>
        </div>

        {justification.statusBadge && (
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Maturity Grade
            </span>
            <div className="text-base font-mono font-black text-cyan-600 dark:text-cyan-400">
              {localizedGradeString}
            </div>
          </div>
        )}
      </div>

      {/* Mathematical Formula Definition */}
      {justification.formulaOrRule && (
        <div className="space-y-1.5">
          <label className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Mathematical Formula & Derivation</span>
          </label>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-cyan-700 dark:text-cyan-300 overflow-x-auto">
            <code>{justification.formulaOrRule}</code>
          </div>
        </div>
      )}

      {/* Metric Rationale & Context */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>Metric Purpose & Strategic Objective</span>
        </label>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
          {localizedRationale}
        </p>
      </div>

      {/* Telemetry Overview & Operational Findings */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Operational Telemetry Findings
          </label>
          {isLongOverview && (
            <button
              type="button"
              onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
              className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isOverviewExpanded ? 'Show Less' : 'Show Full Findings'}</span>
              {isOverviewExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
          <p className={!isOverviewExpanded && isLongOverview ? 'line-clamp-3' : ''}>
            {localizedOverview}
          </p>
        </div>
      </div>

      {/* Recommended Engineering Action */}
      {justification.recommendedAction && (
        <div className="space-y-1.5">
          <label className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended Engineering Mitigation</span>
          </label>
          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-mono">
            {localizedAction}
          </div>
        </div>
      )}
    </BaseModal>
  );
};
