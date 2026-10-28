/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Plus, Trash2, ArrowLeft, 
  Layers, CheckCircle2, ChevronRight, AlertCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useKPIDataContext } from '../context/KPIDataContext';
import { KPIFilterBar } from '../components/kpi/KPIFilterBar';
import { AddKPIModal } from '../components/kpi/AddKPIModal';
import { MetricJustificationModal } from '../components/kpi/MetricJustificationModal';
import { KPI_COMPONENT_RESOLVER } from '../kpis/widgets/ConcreteKPIWidgets';
import { KPI_REGISTRY_MAP } from '../kpis/registry/kpiRegistry';
import { KPIJustificationService } from '../services/kpiJustificationService';
import type { KPIJustification } from '../types/kpiPlatform';

export const CustomCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { 
    customCategories, 
    deleteCategory, 
    removeKPIFromCategory, 
    addKPIsToCategory,
    reorderKPIs
  } = useUser();

  const {
    filters,
    filtersB,
    isCompareMode,
    setIsCompareMode,
    releaseWindow,
    releaseWindowB,
    updateFilter,
    updateFilterB,
    resetFilters,
    resetFiltersB,
    swapScopes,
    metrics,
    metricsB,
    jiraItems,
    testRailExecutions
  } = useKPIDataContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedJustifyMetric, setSelectedJustifyMetric] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState(false);
  
  // HTML5 Drag and Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const category = customCategories.find(c => c.id === categoryId);

  const metricsDeck = useMemo(() => {
    return {
      executiveScorecard: metrics.executiveScorecard,
      testDistributionAll: metrics.testDistributionAll,
      agingBuckets: metrics.agingBuckets,
      severityCounts: metrics.severityCounts,
      defectTrends: metrics.defectTrends,
      mttrMttd: metrics.mttrMttd,
      componentRisks: metrics.componentRisks,
      automationHealth: metrics.automationHealth,
      nearMissAnalytics: metrics.nearMissAnalytics
    };
  }, [metrics]);

  const metricsDeckB = useMemo(() => {
    if (!metricsB) return undefined;
    return {
      executiveScorecard: metricsB.executiveScorecard,
      testDistributionAll: metricsB.testDistributionAll,
      agingBuckets: metricsB.agingBuckets,
      severityCounts: metricsB.severityCounts,
      defectTrends: metricsB.defectTrends,
      mttrMttd: metricsB.mttrMttd,
      componentRisks: metricsB.componentRisks,
      automationHealth: metricsB.automationHealth,
      nearMissAnalytics: metricsB.nearMissAnalytics
    };
  }, [metricsB]);

  const activeJustification: KPIJustification | null = useMemo(() => {
    if (!selectedJustifyMetric) return null;
    return KPIJustificationService.getReleaseQualityIndexJustification(
      metrics.executiveScorecard,
      jiraItems,
      testRailExecutions
    );
  }, [selectedJustifyMetric, metrics.executiveScorecard, jiraItems, testRailExecutions]);

  if (!category) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center py-24">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Category Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
          The requested custom KPI category may have been deleted or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold shadow-md hover:bg-cyan-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard Home</span>
        </Link>
      </div>
    );
  }

  const handleAddKPIs = async (selectedIds: string[]) => {
    if (!categoryId) return;
    await addKPIsToCategory(categoryId, selectedIds);
  };

  const handleRemoveKPI = async (kpiId: string) => {
    if (!categoryId) return;
    await removeKPIFromCategory(categoryId, kpiId);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex || !categoryId) return;

    const list = [...category.kpiIds];
    const [moved] = list.splice(draggedIndex, 1);
    list.splice(targetIndex, 0, moved);

    await reorderKPIs(categoryId, list);
    setDraggedIndex(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1800);
  };

  const handleDeleteCategory = async () => {
    if (window.confirm(`Are you sure you want to delete "${category.title}"?`)) {
      if (categoryId) {
        await deleteCategory(categoryId);
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Top Breadcrumb & Title Bar */}
      <div className="bg-white/60 dark:bg-[#070913]/60 backdrop-blur-md border-b border-slate-200/80 dark:border-cyan-500/20 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
              <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>Custom Categories</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{category.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
                {category.title}
              </h1>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-600">
                {category.badge || 'Custom Deck'}
              </span>
            </div>
            {category.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                {category.description}
              </p>
            )}
          </div>

          {/* Action Buttons: Add KPI, Save Layout, Delete Category */}
          <div className="flex items-center gap-2 flex-wrap">
            {saveToast && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Layout Saved!</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add KPIs</span>
            </button>

            <button
              type="button"
              onClick={handleDeleteCategory}
              title="Delete this custom category"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 hover:border-rose-300 dark:hover:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <KPIFilterBar
          filters={filters}
          releaseWindow={releaseWindow}
          onFilterChange={updateFilter}
          onResetFilters={resetFilters}
          totalFilteredJira={jiraItems.length}
          totalFilteredTests={testRailExecutions.length}
          isCompareMode={isCompareMode}
          onToggleCompareMode={() => setIsCompareMode(!isCompareMode)}
          filtersB={filtersB}
          onFilterChangeB={updateFilterB}
          onResetFiltersB={resetFiltersB}
          onSwapScopes={swapScopes}
          totalFilteredJiraB={0}
          totalFilteredTestsB={0}
          releaseWindowB={releaseWindowB}
        />
      </div>

      {/* Main KPI Canvas / Grid with Smooth Drag & Drop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {category.kpiIds.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-['Outfit']">
              This category has no KPIs yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5 font-mono max-w-md mx-auto">
              Populate this custom deck by selecting metrics across Executive, Quality, Risk, Automation, and Governance catalogs.
            </p>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Select KPIs to Add</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.kpiIds.map((kpiId, index) => {
              const Component = KPI_COMPONENT_RESOLVER[kpiId];
              const descriptor = KPI_REGISTRY_MAP.get(kpiId);
              const colSpan = descriptor?.defaultColSpan === 4 
                ? 'col-span-1 md:col-span-2 lg:col-span-4' 
                : descriptor?.defaultColSpan === 2 
                ? 'col-span-1 md:col-span-2 lg:col-span-2' 
                : 'col-span-1';

              if (!Component) {
                return (
                  <div key={kpiId} className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs">
                    Widget not found: {kpiId}
                  </div>
                );
              }

              return (
                <div 
                  key={kpiId} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`${colSpan} group/drag relative transition-all duration-200 cursor-grab active:cursor-grabbing hover:scale-[1.01]`}
                >
                  <Component
                    metrics={metricsDeck}
                    metricsB={metricsDeckB}
                    isCompareMode={isCompareMode}
                    onRemove={() => handleRemoveKPI(kpiId)}
                    onJustifyMetric={(metricKey) => setSelectedJustifyMetric(metricKey)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add KPI Modal */}
      <AddKPIModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        existingKpiIds={category.kpiIds}
        onAddSelectedKPIs={handleAddKPIs}
      />

      {/* Metric Clarification / Justification Modal */}
      <MetricJustificationModal
        isOpen={Boolean(selectedJustifyMetric)}
        onClose={() => setSelectedJustifyMetric(null)}
        justification={activeJustification}
      />
    </div>
  );
};
