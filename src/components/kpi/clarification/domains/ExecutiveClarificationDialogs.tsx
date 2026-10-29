/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { ShieldAlert, AlertTriangle, Bug } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Release Quality Index & Executive Evaluation
 * Specializes contributing factor cards and highlights hard blocker violations.
 */
export const ReleaseQualityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <ShieldAlert className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Executive Governance Mandate:</span> All releases are subject to hard gating policies. Zero unresolved P1 blockers are tolerated.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Defect Leakage & Production Escapes
 */
export const DefectLeakageClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Production Escape Metric:</span> Measures customer-reported APARs relative to internal QA detections.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Blocker & Gating Defects
 */
export const BlockerDefectsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Bug className="w-5 h-5 shrink-0 text-rose-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Zero-Tolerance Gating Rule:</span> Unresolved P1/P2 issues immediately trigger Gated / Blocked verdict.
          </div>
        </div>
      )}
    />
  );
};
