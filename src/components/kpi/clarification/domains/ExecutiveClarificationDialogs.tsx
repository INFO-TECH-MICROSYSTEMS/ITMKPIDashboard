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
  ShieldAlert, AlertTriangle, Bug, TrendingDown, Clock, 
  DollarSign, Activity, Compass, Rocket, ShieldCheck, 
  PieChart, LineChart 
} from 'lucide-react';

/**
 * 1. Release Quality Index & Executive Evaluation
 */
export const ReleaseQualityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
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

/**
 * 2. Blocker & Gating Defects
 */
export const BlockerDefectsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Bug className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Zero-Tolerance Gating Rule:</span> Unresolved P1/P2 issues immediately trigger a Gated / Blocked verdict.
        </div>
      </div>
    )}
  />
);

/**
 * 3. Defect Leakage Rate
 */
export const DefectLeakageClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Production Escape Metric:</span> Measures customer-reported APARs relative to internal QA detections. Target is strictly &lt; 3.0%.
        </div>
      </div>
    )}
  />
);

/**
 * 4. Regression Cycle Time
 */
export const RegressionCycleClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Clock className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Delivery Cadence SLA:</span> Time required to run the full regression test suite across tier-1 test matrix environments.
        </div>
      </div>
    )}
  />
);

/**
 * 5. Cost of Poor Quality (CoPQ) & Rework Impact
 */
export const CopqClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <DollarSign className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Financial Waste & Rework:</span> Synthesizes engineering hours lost resolving post-code-freeze defects and production incidents.
        </div>
      </div>
    )}
  />
);

/**
 * 6. DORA Change Failure Rate (CFR)
 */
export const CfrClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <TrendingDown className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">DORA Elite Benchmark:</span> Percentage of deployments to production that fail and require a hotfix or rollback (&lt; 5.0%).
        </div>
      </div>
    )}
  />
);

/**
 * 7. Mean Time to Restore (MTTR)
 */
export const MttrRestoreClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Clock className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Incident Recovery Cadence:</span> Average elapsed hours from incident trigger to verified service restoration.
        </div>
      </div>
    )}
  />
);

/**
 * 8. Sprint Predictability Index (SPI)
 */
export const SprintPredictabilityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Compass className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Commitment Reliability:</span> Ratio of delivered story points to committed capacity across the sprint cycle (&ge; 85%).
        </div>
      </div>
    )}
  />
);

/**
 * 9. Feature Lead Time (Commit-to-Customer)
 */
export const FeatureLeadTimeClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Rocket className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Time-to-Market Velocity:</span> Total calendar days from first pull request commit to production rollout.
        </div>
      </div>
    )}
  />
);

/**
 * 10. Security Gate Vulnerabilities & CVE Compliance
 */
export const SecurityVulnsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <ShieldCheck className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Security Compliance Gate:</span> Zero open Critical or High CVEs permitted in container images and dependencies.
        </div>
      </div>
    )}
  />
);

/**
 * 11. Contractual Production SLA Uptime
 */
export const ContractUptimeClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Activity className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Enterprise Uptime Commitment:</span> System availability measured against the 99.9% service level agreement.
        </div>
      </div>
    )}
  />
);

/**
 * 12. Test Execution Burnout & Predictive Velocity Forecast
 */
export const TestBurnoutClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <LineChart className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Predictive Burnout Model:</span> Projects required run-rate vs remaining manual tests before release cutoff date.
        </div>
      </div>
    )}
  />
);

/**
 * 13. Test Suite Execution Distribution
 */
export const TestDistributionClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <PieChart className="w-5 h-5 shrink-0 text-purple-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Execution Health Breakdown:</span> Status distribution (Passed, Blocked, Failed, Untested) across all suites.
        </div>
      </div>
    )}
  />
);
