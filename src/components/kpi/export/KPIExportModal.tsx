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
  FileText, Presentation, CheckSquare, Square, 
  ChevronDown, ChevronRight, Download
} from 'lucide-react';
import type { KPIFilterState, ReleaseWindow } from '../../../types/kpiPlatform';
import { EXPORTABLE_KPI_CATALOG } from '../../../constants/kpiExportCatalog';
import { KPIPdfExportService } from '../../../services/kpiPdfExportService';
import { KPIPptxExportService } from '../../../services/kpiPptxExportService';
import { BaseModal } from '../../common/modal/BaseModal';

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

/**
 * KPIExportModal: Concrete modal subclassing BaseModal.
 * Standardizes executive PDF/PPTX generation dialog layout and actions.
 */
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
      expanded[cat.id] = true;
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

  const totalCount = allKpiIds.length;
  const selectedCount = selectedIds.size;
  const isAllSelected = selectedCount === totalCount;
  const isNoneSelected = selectedCount === 0;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allKpiIds));
    }
  };

  const toggleCategory = (categoryId: string) => {
    const category = EXPORTABLE_KPI_CATALOG.find(c => c.id === categoryId);
    if (!category) return;

    const catItemIds = category.items.map(i => i.id);
    const allCatSelected = catItemIds.every(id => selectedIds.has(id));

    const next = new Set(selectedIds);
    if (allCatSelected) {
      catItemIds.forEach(id => next.delete(id));
    } else {
      catItemIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
  };

  const toggleItem = (itemId: string) => {
    const next = new Set(selectedIds);
    if (next.has(itemId)) {
      next.delete(itemId);
    } else {
      next.add(itemId);
    }
    setSelectedIds(next);
  };

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleExport = async () => {
    if (selectedCount === 0 || isExporting) return;
    setIsExporting(true);

    try {
      if (format === 'pdf') {
        KPIPdfExportService.exportToPDF({
          selectedKpiIds: selectedIds,
          filters,
          releaseWindow,
          metrics,
          jiraItems,
          testRailExecutions,
          t: (key: string, def?: string) => String(t(key, def || '')),
          language: i18n.language
        });
      } else {
        await KPIPptxExportService.exportToPPTX({
          selectedKpiIds: selectedIds,
          filters,
          releaseWindow,
          metrics,
          jiraItems,
          testRailExecutions,
          t: (key: string, def?: string) => String(t(key, def || '')),
          language: i18n.language
        });
      }
      onClose();
    } catch (err) {
      console.error('Failed to generate export:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const modalFooter = (
    <div className="flex items-center justify-between">
      <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
        <span>{t('kpiPlatform.exportDialog.readyToExport', 'Ready to export')}: </span>
        <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{selectedCount}</strong>
        <span> / {totalCount} {t('kpiPlatform.exportDialog.metricsLabel', 'metrics')} ({format.toUpperCase()})</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={isExporting}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {t('kpiPlatform.exportDialog.cancel', 'Cancel')}
        </button>

        <button
          type="button"
          onClick={handleExport}
          disabled={selectedCount === 0 || isExporting}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>
            {isExporting 
              ? t('kpiPlatform.exportDialog.generating', 'Generating...') 
              : `${t('kpiPlatform.exportDialog.exportButton', 'Export')} ${format.toUpperCase()}`}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      icon={
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Download className="w-5 h-5" />
        </div>
      }
      title={t('kpiPlatform.exportDialog.title', 'Export Executive KPI Report')}
      subtitle={t('kpiPlatform.exportDialog.subtitle', 'Configure professional presentation decks or executive PDF audit documents')}
      footer={modalFooter}
      bodyClassName="p-5 space-y-4"
    >
      {/* Format Selection Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => setFormat('pdf')}
          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
            format === 'pdf'
              ? 'bg-cyan-50/70 dark:bg-cyan-950/40 border-cyan-500 text-cyan-900 dark:text-cyan-200 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className={`p-2 rounded-lg ${format === 'pdf' ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs">PDF Document</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Detailed executive briefing & compliance audit</div>
          </div>
        </div>

        <div
          onClick={() => setFormat('pptx')}
          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
            format === 'pptx'
              ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-500 text-purple-900 dark:text-purple-200 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className={`p-2 rounded-lg ${format === 'pptx' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs">PowerPoint Presentation (.pptx)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">16:9 widescreen boardroom presentation slides</div>
          </div>
        </div>
      </div>

      {/* Select All / Deselect All Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={toggleSelectAll}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
        >
          {isAllSelected ? (
            <CheckSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          ) : isNoneSelected ? (
            <Square className="w-4 h-4 text-slate-400" />
          ) : (
            <div className="w-4 h-4 rounded border border-cyan-500 bg-cyan-500/20 flex items-center justify-center">
              <div className="w-2 h-0.5 bg-cyan-600 dark:bg-cyan-400" />
            </div>
          )}
          <span>{isAllSelected ? t('kpiPlatform.exportDialog.deselectAll', 'Deselect All') : t('kpiPlatform.exportDialog.selectAll', 'Select All')} ({selectedCount}/{totalCount})</span>
        </button>

        <span className="text-[11px] font-mono text-slate-400">
          Scope: {filters.product} | {filters.component}
        </span>
      </div>

      {/* Category Tree */}
      <div className="space-y-3 max-h-[44vh] overflow-y-auto pr-1">
        {EXPORTABLE_KPI_CATALOG.map(category => {
          const isExpanded = expandedCategories[category.id] !== false;
          const catItemIds = category.items.map(i => i.id);
          const selectedInCat = catItemIds.filter(id => selectedIds.has(id)).length;
          const isCatFullySelected = selectedInCat === catItemIds.length;
          const isCatPartiallySelected = selectedInCat > 0 && selectedInCat < catItemIds.length;
          const categoryTitle = t(category.nameKey, category.defaultName);

          return (
            <div key={category.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden text-xs">
              {/* Category Header */}
              <div className="flex items-center justify-between p-2.5 bg-slate-100/70 dark:bg-slate-800/60 select-none">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(category.id)}
                    className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 transition-colors cursor-pointer"
                  >
                    {isCatFullySelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    ) : isCatPartiallySelected ? (
                      <div className="w-3.5 h-3.5 rounded border border-cyan-500 bg-cyan-500/20 flex items-center justify-center">
                        <div className="w-2 h-0.5 bg-cyan-600 dark:bg-cyan-400" />
                      </div>
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{categoryTitle}</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  {selectedInCat} / {catItemIds.length}
                </span>
              </div>

              {/* Items List */}
              {isExpanded && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {category.items.map(item => {
                    const isSelected = selectedIds.has(item.id);
                    const itemName = t(item.nameKey, item.defaultName);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-200'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isSelected ? (
                            <CheckSquare className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <span className="font-medium truncate">{itemName}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">{item.target}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </BaseModal>
  );
};
