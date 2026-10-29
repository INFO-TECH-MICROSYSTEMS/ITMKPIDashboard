/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { Search, Check, Plus, Layers, Filter } from 'lucide-react';
import { KPI_REGISTRY, type KPICategoryFamily } from '../../kpis/registry/kpiRegistry';
import { BaseModal } from '../common/modal/BaseModal';

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

/**
 * AddKPIModal: Concrete modal subclassing BaseModal.
 * Eliminates custom backdrop/overlay duplication and standardizes responsive modal behaviors.
 */
export const AddKPIModal: React.FC<AddKPIModalProps> = ({
  isOpen,
  onClose,
  existingKpiIds,
  onAddSelectedKPIs,
}) => {
  const [search, setSearch] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const modalFooter = (
    <div className="flex items-center justify-between">
      <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
        <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{selectedIds.length}</strong> KPIs selected
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={selectedIds.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Selected KPIs</span>
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
          <Layers className="w-5 h-5" />
        </div>
      }
      title="Add Metrics to Custom KPI Category"
      subtitle="Select from the modular engineering catalog in your preferred order"
      footer={modalFooter}
      bodyClassName="p-5 space-y-4"
    >
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by metric name, domain or formula..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedFamily}
            onChange={(e) => setSelectedFamily(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
          >
            <option value="all">All Domains ({KPI_REGISTRY.length})</option>
            {Object.entries(familyLabels).map(([key, label]) => {
              const count = KPI_REGISTRY.filter(k => k.family === key).length;
              return (
                <option key={key} value={key}>
                  {label} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Select All & Clear All Action Bar */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Showing {filteredKPIs.length} KPIs ({availableFilteredKPIs.length} available to add)
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            disabled={availableFilteredKPIs.length === 0}
            className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            disabled={selectedIds.length === 0}
            className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Metric List */}
      <div className="space-y-2 max-h-[46vh] overflow-y-auto pr-1">
        {filteredKPIs.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-slate-400">
            No matching KPIs found for "{search}"
          </div>
        ) : (
          filteredKPIs.map(kpi => {
            const isAlreadyAdded = existingKpiIds.includes(kpi.id);
            const isSelected = selectedIds.includes(kpi.id);

            return (
              <div
                key={kpi.id}
                onClick={() => !isAlreadyAdded && toggleSelect(kpi.id)}
                className={`p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 select-none ${
                  isAlreadyAdded
                    ? 'opacity-40 bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                    : isSelected
                    ? 'bg-cyan-50/70 dark:bg-cyan-950/50 border-cyan-400 dark:border-cyan-500/80 shadow-xs cursor-pointer'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer'
                }`}
              >
                {/* Selection Checkbox */}
                <div className="mt-0.5 shrink-0">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      isAlreadyAdded
                        ? 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-400'
                        : isSelected
                        ? 'bg-cyan-600 border-cyan-600 text-white shadow-xs'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {(isSelected || isAlreadyAdded) && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {kpi.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {familyLabels[kpi.family]}
                    </span>
                    {isAlreadyAdded && (
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                        (Already Added)
                      </span>
                    )}
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {kpi.subtitle}
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 text-[11px] mt-1 line-clamp-2">
                    {kpi.description}
                  </p>
                </div>

                <div className="shrink-0 text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-0.5">
                  {isAlreadyAdded ? 'In View' : kpi.defaultColSpan ? `${kpi.defaultColSpan} Col` : ''}
                </div>
              </div>
            );
          })
        )}
      </div>
    </BaseModal>
  );
};
