/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseModal, type BaseModalProps } from './BaseModal';

export interface BaseDialogProps extends Omit<BaseModalProps, 'footer'> {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  isLoading?: boolean;
  confirmDisabled?: boolean;
  confirmVariant?: 'primary' | 'danger' | 'success';
}

const confirmVariantClasses = {
  primary: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20',
  danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20',
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
};

/**
 * BaseDialog: Subclass / Specialized Modal for Confirmation and Action Dialogs.
 * Enforces unified primary action buttons and cancel buttons across all dialog flows.
 */
export const BaseDialog: React.FC<BaseDialogProps> = ({
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
  confirmDisabled = false,
  confirmVariant = 'primary',
  children,
  ...modalProps
}) => {
  const footerContent = (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={modalProps.onClose}
        disabled={isLoading}
        className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
      >
        {cancelLabel}
      </button>

      {onConfirm && (
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading || confirmDisabled}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${confirmVariantClasses[confirmVariant]}`}
        >
          {isLoading && (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          <span>{confirmLabel}</span>
        </button>
      )}
    </div>
  );

  return (
    <BaseModal {...modalProps} footer={footerContent}>
      {children}
    </BaseModal>
  );
};
