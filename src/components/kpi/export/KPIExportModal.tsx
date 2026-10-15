/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, FileText, Presentation, CheckSquare, Square, 
  ChevronDown, ChevronRight, Download, Filter, Layers, Check
} from 'lucide-react';
import type { KPIFilterState, ReleaseWindow } from '../../../types/kpiPlatform';
import { EXPORTABLE_KPI_CATALOG } from '../../../constants/kpiExportCatalog';
import type { ExportableKPICategory } from '../../../constants/kpiExportCatalog';
import { KPIPdfExportService } from '../../../services/kpiPdfExportService';
import { KPIPptxExportService } from '../../../services/kpiPptxExportService';

export interface KPIExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: KPIFilterState;
  releaseWindow: ReleaseWindow;
  metrics: any;
  jiraItems: any[];
  testRailExecutions: any[];
  initialFormat?: 'pdf' | 'pptx';
}

export const KPIExportModal: React.FC<KPIExportModalProps> = ({
  isOpen,
  onClose,
  filters,
  releaseWindow,
  metrics,
  jiraItems,
  testRailExecutions,
  initialFormat = 'pdf'
}) => {
  const { t, i18n } = useTranslation();
  
  // Format state: 'pdf' or 'pptx'
  const [format, setFormat] = useState<'pdf' | 'pptx'>(initialFormat);

  // Initialize all KPI IDs as selected
  const allKpiIds = React.useMemo(() => {
    const ids: string[] = [];
    EXPORTABLE_KPI_CATALOG.forEach(cat => {
      cat.items.forEach(item => ids.push(item.id));
    });
    return ids;
  }, []);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(allKpiIds));
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const expanded: Record<string, boolean> = {};
    EXPORTABLE_KPI_CATALOG.forEach(cat => {
      expanded[cat.id] = true; // start with all categories expanded
    });
    return expanded;
  });

  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Reset selection when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormat(initialFormat);
      setSelectedIds(new Set(allKpiIds));
    }
  }, [isOpen, initialFormat, allKpiIds]);

  if (!isOpen) return null;

  const totalCount = allKpiIds.length;
  const selectedCount = selectedIds.size;
  const isAllSelected = selectedCount === totalCount;
  const isNoneSelected = selectedCount === 0;

  // Toggle single KPI
  const toggleKpi = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle category
  const toggleCategory = (category: ExportableKPICategory) => {
    const catItemIds = category.items.map(item => item.id);
    const allCatSelected = catItemIds.every(id => selectedIds.has(id));

    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allCatSelected) {
        catItemIds.forEach(id => next.delete(id));
      } else {
        catItemIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(allKpiIds));
  };

  const clearAll = () => {
    setSelectedIds(new Set());
  };

  const toggleAccordion = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Perform Export
  const handleExport = async () => {
    if (selectedCount === 0) return;
    setIsExporting(true);

    try {
      const options = {
        selectedKpiIds: selectedIds,
        filters,
        releaseWindow,
        metrics,
        jiraItems,
        testRailExecutions,
        t: (key: string, defaultValue?: string) => t(key, defaultValue ?? key),
        language: i18n.language || 'en'
      };

      if (format === 'pdf') {
        KPIPdfExportService.exportToPDF(options);
      } else {
        await KPIPptxExportService.exportToPPTX(options);
      }
      
      onClose();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                {t('kpiPlatform.exportModal.title', 'Export Quality Engineering KPIs')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.exportModal.subtitle', 'Configure export document parameters, format, and select specific metrics')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scope Context & Document Format Selection */}
        <div className="px-6 py-4 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Active Filter Scope Callout */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-500" />
              {t('kpiPlatform.exportModal.appliedScope', 'Export Scope')}:
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-medium">
              <span className="text-slate-400 mr-1">{t('kpiPlatform.product')}:</span>
              <strong className="text-cyan-600 dark:text-cyan-400">{filters.product}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-medium">
              <span className="text-slate-400 mr-1">{t('kpiPlatform.component')}:</span>
              <strong className="text-cyan-600 dark:text-cyan-400">{filters.component}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-medium">
              <span className="text-slate-400 mr-1">{t('kpiPlatform.releaseTarget')}:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{filters.releaseVersion}</strong>
            </span>
          </div>

          {/* Format Radio / Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1">
              {t('kpiPlatform.exportModal.formatLabel', 'Format')}:
            </span>
            <button
              type="button"
              onClick={() => setFormat('pdf')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                format === 'pdf'
                  ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-500/30 font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Document</span>
            </button>
            <button
              type="button"
              onClick={() => setFormat('pptx')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                format === 'pptx'
                  ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/30 font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>PowerPoint (16:9)</span>
            </button>
          </div>
        </div>

        {/* Selection Toolbar: Select All / Clear All & Counter */}
        <div className="px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={selectAll}
              disabled={isAllSelected}
              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer"
            >
              {t('kpiPlatform.exportModal.selectAll', 'Select All')}
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              type="button"
              onClick={clearAll}
              disabled={isNoneSelected}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer"
            >
              {t('kpiPlatform.exportModal.clearAll', 'Clear All')}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {t('kpiPlatform.exportModal.selectedCount', { current: selectedCount, total: totalCount }) || `${selectedCount} of ${totalCount} Selected`}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              selectedCount > 0 
                ? 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700' 
                : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
            }`}>
              {Math.round((selectedCount / totalCount) * 100)}%
            </span>
          </div>
        </div>

        {/* Scrollable KPI Category & Item Selection List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {EXPORTABLE_KPI_CATALOG.map(category => {
            const catItemIds = category.items.map(item => item.id);
            const selectedInCatCount = catItemIds.filter(id => selectedIds.has(id)).length;
            const isCatFullySelected = selectedInCatCount === catItemIds.length;
            const isCatPartiallySelected = selectedInCatCount > 0 && selectedInCatCount < catItemIds.length;
            const isExpanded = !!expandedCategories[category.id];

            return (
              <div 
                key={category.id} 
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-slate-900/60"
              >
                {/* Category Header Accordion Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer"
                      title={isCatFullySelected ? 'Deselect category' : 'Select category'}
                    >
                      {isCatFullySelected ? (
                        <CheckSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      ) : isCatPartiallySelected ? (
                        <div className="w-4 h-4 rounded bg-cyan-600 dark:bg-cyan-400 flex items-center justify-center text-white">
                          <div className="w-2 h-0.5 bg-white rounded" />
                        </div>
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    <div 
                      className="cursor-pointer select-none flex items-center gap-2"
                      onClick={() => toggleAccordion(category.id)}
                    >
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-['Outfit']">
                        {t(category.nameKey, category.defaultName)}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {selectedInCatCount} / {catItemIds.length}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleAccordion(category.id)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Items in Category */}
                {isExpanded && (
                  <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/50 dark:bg-slate-950/40">
                    {category.items.map(item => {
                      const isSelected = selectedIds.has(item.id);
                      let computedData: { value: string | number; status: string; statusColor: string } = {
                        value: '—',
                        status: 'Optimal',
                        statusColor: 'emerald'
                      };

                      try {
                        computedData = item.getValue(metrics, jiraItems, testRailExecutions);
                      } catch {
                        // ignore compute preview error
                      }

                      return (
                        <label
                          key={item.id}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white dark:bg-slate-900 border-cyan-500/40 shadow-xs'
                              : 'bg-transparent border-slate-200/60 dark:border-slate-800/60 opacity-60 hover:opacity-90'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleKpi(item.id)}
                            className="mt-0.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                                {t(item.nameKey, item.defaultName)}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                                {computedData.value}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                              <span>Target: {item.target}</span>
                              <span className={`capitalize font-semibold ${
                                computedData.statusColor === 'emerald'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : computedData.statusColor === 'amber'
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-rose-600 dark:text-rose-400'
                              }`}>
                                {computedData.status}
                              </span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {format === 'pdf' ? (
              <span>Outputs styled document with metadata and metric tags</span>
            ) : (
              <span>Generates 16:9 widescreen PowerPoint deck with categorized slides</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              {t('common.cancel', 'Cancel')}
            </button>

            <button
              type="button"
              onClick={handleExport}
              disabled={selectedCount === 0 || isExporting}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                format === 'pdf'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500'
              }`}
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('kpiPlatform.exportModal.generating', 'Generating...')}</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {format === 'pdf'
                      ? t('kpiPlatform.exportModal.btnPdf', 'Export to PDF')
                      : t('kpiPlatform.exportModal.btnPptx', 'Export Presentation (.pptx)')}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
