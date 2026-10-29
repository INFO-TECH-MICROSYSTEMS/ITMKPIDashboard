/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { Compass, ShieldCheck, DollarSign } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Leading Health Index
 */
export const LeadingHealthIndexClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Compass className="w-5 h-5 shrink-0 text-cyan-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Proactive Indicator:</span> Evaluates code hygiene, branch health, and early sprint signals before downstream QA cycles.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Near Misses Intercepted
 */
export const NearMissesInterceptedClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Pre-Production Interception:</span> High-severity defects caught by shift-left testing prior to release staging.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Avoided Outage Loss ($ COPQ)
 */
export const AvoidedOutageLossClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <DollarSign className="w-5 h-5 shrink-0 text-emerald-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Economic Quality Impact:</span> Projected financial business loss prevented through automated test gating.
          </div>
        </div>
      )}
    />
  );
};
