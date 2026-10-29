/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * BaseClarificationDialog
 * Foundational Object-Oriented base component for all KPI metric clarification dialogs.
 * Restores the exact original pixel-perfect design, typography, color themes, badges,
 * collapsible sections, and layouts. Concrete metric dialogs inherit these commonalities
 * and supply or override specialized sections (factors, evidence, custom telemetry, etc.).
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, AlertOctagon, AlertTriangle, CheckCircle2, 
  HelpCircle, Lightbulb, Info, ChevronDown, ChevronUp 
} from 'lucide-react';
import type { KPIJustification, KPIContributingFactor } from '../../../types/kpiPlatform';
import { KPI_STATUS_THEMES, type KPIStatusTheme } from '../../../constants/kpiConstants';
import { 
  getLocalizedOverview, 
  getLocalizedRationale, 
  getLocalizedAction,
  formatLocalizedStatusBadge, 
  formatLocalizedGradeString 
} from '../../../services/kpiJustificationLocalization';

export interface BaseClarificationDialogProps {
  justification: KPIJustification | null;
  isOpen: boolean;
  onClose: () => void;
  /** Optional custom title override */
  customTitle?: React.ReactNode;
  /** Optional slot to render specialized content before factors */
  renderTopCustomContent?: (theme: KPIStatusTheme) => React.ReactNode;
  /** Optional slot to render custom contributing factors */
  renderFactors?: (factors: KPIContributingFactor[], theme: KPIStatusTheme) => React.ReactNode;
  /** Optional slot to render custom offending entities / evidence */
  renderEvidence?: (items: NonNullable<KPIJustification['offendingItems']>, theme: KPIStatusTheme) => React.ReactNode;
  /** Optional slot to render custom action recommendation */
  renderActionPlan?: (actionText: string, theme: KPIStatusTheme) => React.ReactNode;
  /** Optional slot to render custom footer */
  renderFooter?: (onClose: () => void, theme: KPIStatusTheme) => React.ReactNode;
  /** Additional children rendered at the bottom of the scrollable content */
  children?: React.ReactNode;
}

export const BaseClarificationDialog: React.FC<BaseClarificationDialogProps> = ({
  justification,
  isOpen,
  onClose,
  customTitle,
  renderTopCustomContent,
  renderFactors,
  renderEvidence,
  renderActionPlan,
  renderFooter,
  children
}) => {
  const { t } = useTranslation();
  const [isOverviewExpanded, setIsOverviewExpanded] = useState<boolean>(false);

  // Handle ESC key to dismiss dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset expanded state when modal opens or metric changes
  useEffect(() => {
    if (isOpen) {
      setIsOverviewExpanded(false);
    }
  }, [isOpen, justification?.title]);

  if (!isOpen || !justification) return null;

  const theme: KPIStatusTheme = KPI_STATUS_THEMES[justification.statusColor] || KPI_STATUS_THEMES.cyan;

  const statusIcons: Record<string, React.ReactNode> = {
    rose: <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
    amber: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
    emerald: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    cyan: <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />,
    purple: <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
  };

  const currentIcon = statusIcons[justification.statusColor] || statusIcons.cyan;

  // Localized title & status helpers
  const formatJustificationTitle = (title: string) => {
    return t(`kpiPlatform.modalTitles.${title}`, title);
  };

  const formatStatusBadge = (badge: string) => {
    return formatLocalizedStatusBadge(badge, t);
  };

  // Single externalized Metric Overview & Significance text with localization
  const rawOverview = justification.overviewAndSignificance || justification.description || '';
  const localizedOverview = getLocalizedOverview(justification.title, rawOverview);
  const overviewParagraphs = localizedOverview.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  const isOverviewLong = overviewParagraphs.length > 1 || localizedOverview.length > 240;

  // Localized Rationale & Action
  const localizedRationale = getLocalizedRationale(justification, justification.rationale);
  const localizedAction = getLocalizedAction(justification, justification.recommendedAction);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className={`p-6 flex items-start justify-between gap-4 ${theme.headerBg}`}>
          <div className="flex items-start gap-3">
            {currentIcon}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold">
                  {t('kpiPlatform.modal.decisionAudit')}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                  {formatStatusBadge(justification.statusBadge)}
                </span>
              </div>
              <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 dark:text-white mt-1">
                {customTitle ?? formatJustificationTitle(justification.title)}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Status & Values Overview Banner - Restored original grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border ${theme.calloutBg} ${theme.calloutBorder} font-mono text-xs`}>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block font-sans text-[11px] font-medium">{t('kpiPlatform.modal.currentTelemetry')}</span>
              <span className={`text-base sm:text-lg mt-0.5 block ${theme.value}`}>
                {formatLocalizedGradeString(justification.currentValue, t)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block font-sans text-[11px] font-medium">{t('kpiPlatform.modal.governanceTarget')}</span>
              <span className={`text-base sm:text-lg mt-0.5 block ${theme.target}`}>
                {formatLocalizedGradeString(justification.targetValue, t)}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-500 dark:text-slate-400 block font-sans text-[11px] font-medium">{t('kpiPlatform.modal.statusVerdict')}</span>
              <span className={`text-base sm:text-lg mt-0.5 block ${theme.value}`}>
                {formatStatusBadge(justification.statusBadge)}
              </span>
            </div>
          </div>

          {/* Unified Educational Metric Overview & Significance */}
          {overviewParagraphs.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{t('kpiPlatform.modal.metricOverview', 'Metric Overview & Significance')}</span>
                </div>
                {isOverviewLong && (
                  <button
                    type="button"
                    onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{isOverviewExpanded ? t('kpiPlatform.modal.less', 'less...') : t('kpiPlatform.modal.more', 'more...')}</span>
                    {isOverviewExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {isOverviewExpanded || !isOverviewLong ? (
                  <div className="space-y-2.5 animate-fadeIn">
                    {overviewParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                ) : (
                  <p>
                    {overviewParagraphs[0]}{' '}
                    <button
                      type="button"
                      onClick={() => setIsOverviewExpanded(true)}
                      className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline font-mono ml-1 inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      {t('kpiPlatform.modal.more', 'more...')}
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Rationale & Root Cause Explanation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>{t('kpiPlatform.modal.whyAssigned')}</span>
            </h4>
            <div className={`p-4 rounded-2xl border leading-relaxed text-slate-800 dark:text-slate-200 text-xs sm:text-sm ${theme.calloutBg} ${theme.calloutBorder}`}>
              {localizedRationale}
            </div>
          </div>

          {/* Evaluated Rule or Formula */}
          {justification.formulaOrRule && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.modal.governingFormula')}
              </h4>
              <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap ${theme.codeBlock}`}>
                {justification.formulaOrRule}
              </pre>
            </div>
          )}

          {/* Optional Domain-Specific Top Custom Content */}
          {renderTopCustomContent && renderTopCustomContent(theme)}

          {/* Breakdown of Contributing Factors (if provided or custom rendered) */}
          {renderFactors ? (
            renderFactors(justification.factors || [], theme)
          ) : (
            justification.factors && justification.factors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                  {t('kpiPlatform.modal.factorsPenalties')}
                </h4>
                <div className="space-y-2">
                  {justification.factors.map((f, i) => {
                    const factorTheme = f.status === 'critical' 
                      ? KPI_STATUS_THEMES.rose 
                      : f.status === 'warning' 
                      ? KPI_STATUS_THEMES.amber 
                      : KPI_STATUS_THEMES.emerald;
                    return (
                      <div 
                        key={i} 
                        className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 text-xs ${factorTheme.card}`}
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 dark:text-white block font-['Outfit']">
                            {t(`kpiPlatform.modalFactors.${f.factor}`, f.factor)}
                          </span>
                          <p className="text-slate-600 dark:text-slate-400 leading-snug">{f.details}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md text-[11px] shrink-0 ${factorTheme.badge}`}>
                          {f.impact}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}

          {/* Offending Items / Evidence Sample (from DB) */}
          {renderEvidence ? (
            renderEvidence(justification.offendingItems || [], theme)
          ) : (
            justification.offendingItems && justification.offendingItems.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                    {t('kpiPlatform.modal.offendingEntities')}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    {justification.offendingItems.length} {t('kpiPlatform.modal.identified')}
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
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/40 font-bold shrink-0">
                          {item.severityOrStatus}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Actionable Path to Green */}
          {renderActionPlan ? (
            renderActionPlan(localizedAction, theme)
          ) : (
            <div className={`p-4 rounded-2xl border space-y-2 ${KPI_STATUS_THEMES.emerald.calloutBg} ${KPI_STATUS_THEMES.emerald.calloutBorder}`}>
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('kpiPlatform.modal.pathGreen')}</span>
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {localizedAction}
              </p>
            </div>
          )}

          {/* Subclass-injected children */}
          {children}
        </div>

        {/* Modal Footer */}
        {renderFooter ? (
          renderFooter(onClose, theme)
        ) : (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-end">
            <button
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${theme.buttonAccent}`}
            >
              {t('kpiPlatform.modal.acknowledgeClose')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
