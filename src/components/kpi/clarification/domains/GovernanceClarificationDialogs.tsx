/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Enterprise SLA Adherence
 */
export const SlaAdherenceClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Scale className="w-5 h-5 shrink-0 text-emerald-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Contractual SLA Governance:</span> Penalties occur whenever SLA commitments drop below contractual uptime thresholds.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Requirement Traceability
 */
export const TraceabilityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <FileText className="w-5 h-5 shrink-0 text-cyan-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Traceability Matrix Compliance:</span> Every user story must be mapped to automated or manual test cases before release.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: WCAG Accessibility Compliance
 */
export const AccessibilityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <ShieldCheck className="w-5 h-5 shrink-0 text-indigo-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">WCAG 2.1 AA Compliance Standard:</span> Non-compliant elements generate accessibility audit findings requiring remediation.
          </div>
        </div>
      )}
    />
  );
};
