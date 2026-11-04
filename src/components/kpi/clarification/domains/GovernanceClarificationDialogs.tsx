/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { 
  Scale, ShieldCheck, Activity, Smile, 
  DollarSign, FileText 
} from 'lucide-react';

/**
 * 1. Enterprise Quality SLA Adherence
 */
export const SlaAdherenceClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Scale className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Contractual SLA Governance:</span> Penalties occur whenever SLA commitments drop below contractual uptime thresholds (&ge; 99.5%).
        </div>
      </div>
    )}
  />
);

/**
 * 2. WCAG 2.2 AA Accessibility Compliance
 */
export const AccessibilityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <ShieldCheck className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">WCAG 2.2 AA Compliance Standard:</span> Non-compliant UI elements trigger legal and enterprise audit findings requiring remediation.
        </div>
      </div>
    )}
  />
);

/**
 * 3. Performance P95 Latency Benchmark
 */
export const PerformanceLatencyClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Activity className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">API Responsiveness Target:</span> 95th percentile response time for end-user web and API queries (&le; 250ms).
        </div>
      </div>
    )}
  />
);

/**
 * 4. Stakeholder Satisfaction (CSAT)
 */
export const CsatClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Smile className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Customer Experience Index:</span> Quarterly satisfaction score provided by executive sponsors and product partners (&ge; 4.0 / 5.0).
        </div>
      </div>
    )}
  />
);

/**
 * 5. Contractual SLA Credit Penalties Incurred
 */
export const SlaPenaltiesClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <DollarSign className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Financial Penalty Governance:</span> Rebate credits owed to customers due to SLA uptime breaches ($0 target).
        </div>
      </div>
    )}
  />
);

/**
 * 6. Audit Trail & Requirement Traceability Index
 */
export const TraceabilityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <FileText className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Traceability Matrix Compliance:</span> Every user story must be mapped to automated or manual test cases before release (&ge; 98%).
        </div>
      </div>
    )}
  />
);
