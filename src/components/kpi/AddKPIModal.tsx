/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { X, Search, Check, Plus, Layers, Filter } from 'lucide-react';
import { KPI_REGISTRY, type KPICategoryFamily } from '../../kpis/registry/kpiRegistry';

interface AddKPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingKpiIds: string[];
  onAddSelectedKPIs: (selectedIds: string[]) => void;
}

const familyLabels: Record<KPICategoryFamily, string> = {
  executive: 'Executive Scorecard',
  quality: 'Quality & Defects',
  risk: 'Risk & Gates',
  automation: 'Automation ROI',
  productivity: 'Productivity & Capacity',
  governance: 'Governance & SLAs',
  leadingLagging: 'Leading, Lagging & Near Misses',
};

export const AddKPIModal: React.FC<AddKPIModalProps> = ({
  isOpen,
  onClose,
  existingKpiIds,
  onAddSelectedKPIs,
}) => {
  const [search, setSearch] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredKPIs = KPI_REGISTRY.filter(kpi => {
    const matchesSearch = 
      kpi.title.toLowerCase().includes(search.toLowerCase()) ||
      kpi.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      kpi.description.toLowerCase().includes(search.toLowerCase());
    const matchesFamily = selectedFamily === 'all' || kpi.family === selectedFamily;
    return matchesSearch && matchesFamily;
  });

  const availableFilteredKPIs = filteredKPIs.filter(kpi => !existingKpiIds.includes(kpi.id));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    const newIds = new Set([...selectedIds, ...availableFilteredKPIs.map(k => k.id)]);
    setSelectedIds(Array.from(newIds));
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  const handleConfirm = () => {
    onAddSelectedKPIs(selectedIds);
    setSelectedIds([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c1021] border border-slate-200 dark:border-cyan-500/30 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                Add Metrics to Custom KPI Category
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Select from the modular engineering catalog in your preferred order
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by metric name, domain or formula..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-[#070913] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedFamily}
                onChange={e => setSelectedFamily(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 text-xs rounded-xl bg-white dark:bg-[#070913] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Domains ({KPI_REGISTRY.length})</option>
                <option value="executive">Executive Scorecard</option>
                <option value="quality">Quality & Defects</option>
                <option value="risk">Risk & Gates</option>
                <option value="automation">Automation ROI</option>
                <option value="productivity">Productivity</option>
                <option value="governance">Governance & SLAs</option>
                <option value="leadingLagging">Near Misses</option>
              </select>
            </div>
          </div>

          {/* Quick Selection Actions: Select All / Clear All */}
          <div className="flex items-center justify-between pt-1 text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">
              Showing {filteredKPIs.length} KPIs ({availableFilteredKPIs.length} available to add)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={availableFilteredKPIs.length === 0}
                className="px-2.5 py-1 rounded-lg border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 bg-cyan-50/50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 font-semibold disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                disabled={selectedIds.length === 0}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* List of KPIs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
          {filteredKPIs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-mono">
              No matching KPI widgets found for current filters.
            </div>
          ) : (
            filteredKPIs.map(kpi => {
              const isAlreadyPresent = existingKpiIds.includes(kpi.id);
              const isSelected = selectedIds.includes(kpi.id);

              return (
                <div
                  key={kpi.id}
                  onClick={() => !isAlreadyPresent && toggleSelect(kpi.id)}
                  className={`flex items-start justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isAlreadyPresent
                      ? 'opacity-50 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                      : isSelected
                      ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-500 shadow-xs'
                      : 'bg-white dark:bg-[#070913] border-slate-200 dark:border-slate-800/80 hover:border-cyan-300 dark:hover:border-cyan-600'
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-['Outfit']">
                        {kpi.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {familyLabels[kpi.family]}
                      </span>
                      {isAlreadyPresent && (
                        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">
                          (Already Added)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {kpi.subtitle}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">
                      {kpi.description}
                    </p>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {isAlreadyPresent ? (
                      <span className="text-xs font-mono text-slate-400">In View</span>
                    ) : (
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-cyan-600 border-cyan-600 text-white' 
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {selectedIds.length} KPI{selectedIds.length !== 1 ? 's' : ''} selected
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={selectedIds.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Selected KPIs</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
