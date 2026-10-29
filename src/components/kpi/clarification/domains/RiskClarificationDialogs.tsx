/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { ShieldAlert, AlertOctagon, Layers } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Component Failure Matrix Risk
 */
export const ComponentMatrixRiskClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Layers className="w-5 h-5 shrink-0 text-rose-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Architectural Blast Radius:</span> Measures failure vulnerability across interrelated backend microservices.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: High Dependency Depth Risk
 */
export const DependencyDepthClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Coupling & Dependency Risk:</span> Modules exceeding recursion depth limits carry exponential regression risk.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Blocked Development Items
 */
export const BlockedDevItemsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <AlertOctagon className="w-5 h-5 shrink-0 text-rose-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Impediment Watchlist:</span> Tracks features stuck on external environment dependencies or third-party blockers.
          </div>
        </div>
      )}
    />
  );
};
