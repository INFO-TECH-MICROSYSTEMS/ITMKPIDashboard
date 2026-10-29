/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { Bug, History, Activity } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Defect Density
 */
export const DefectDensityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Bug className="w-5 h-5 shrink-0 text-cyan-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Code Quality Index:</span> Evaluates normalized defects per 1,000 lines of code (KLOC) across modified files.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Defect Aging Profile
 */
export const DefectAgingClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <History className="w-5 h-5 shrink-0 text-amber-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Backlog Stagnation Metric:</span> Tracks the time defects remain unresolved before remediation.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Defect Reopen Rate
 */
export const DefectReopenRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Activity className="w-5 h-5 shrink-0 text-rose-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Fix Verification Efficiency:</span> High reopen rate indicates incomplete root-cause resolutions during initial triage.
          </div>
        </div>
      )}
    />
  );
};
