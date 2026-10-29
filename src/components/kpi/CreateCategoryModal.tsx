/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { FolderPlus } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { BaseModal } from '../common/modal/BaseModal';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (categoryId: string) => void;
}

const AVAILABLE_ICONS = [
  'Sparkles', 'Activity', 'ShieldCheck', 'TrendingUp', 
  'AlertTriangle', 'Cpu', 'Gauge', 'Compass', 'Layers'
];

/**
 * CreateCategoryModal: Concrete modal subclassing BaseModal.
 * Unifies dialog behaviors, header styling, and form actions.
 */
export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const { createCategory } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Sparkles');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const created = await createCategory(title, selectedIcon, description);
      setTitle('');
      setDescription('');
      onClose();
      onCreated?.(created.id);
    } catch (err) {
      console.error('Failed to create category:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalFooter = (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !title.trim()}
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-2"
      >
        {isSubmitting ? 'Creating...' : 'Create Category'}
      </button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      icon={
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <FolderPlus className="w-5 h-5" />
        </div>
      }
      title="Create KPI Category"
      subtitle="Add a new custom workspace to your navigation"
      footer={modalFooter}
      bodyClassName="p-5"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Category Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Q3 Cloud Migration Focus"
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Description / Strategic Focus
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional context about why this category was created..."
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* Icon Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Navigation Icon
          </label>
          <div className="grid grid-cols-5 gap-2">
            {AVAILABLE_ICONS.map(iconName => (
              <button
                key={iconName}
                type="button"
                onClick={() => setSelectedIcon(iconName)}
                className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  selectedIcon === iconName
                    ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-[10px] font-mono truncate">{iconName}</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </BaseModal>
  );
};
