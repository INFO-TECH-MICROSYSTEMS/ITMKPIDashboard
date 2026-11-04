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
  Bug, History, Activity, Wrench, Clock, 
  Flame, TrendingUp, AlertTriangle 
} from 'lucide-react';

/**
 * 1. Mean Time to Resolve (MTTR)
 */
export const MttrResolveClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Clock className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Defect Turnaround Cadence:</span> Average hours from bug triage to code-fix deployment and verification (&le; 24h).
        </div>
      </div>
    )}
  />
);

/**
 * 2. Mean Time to Detect (MTTD)
 */
export const MttdDetectClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Clock className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Detection Speed:</span> Elapsed hours between code commit introduction and QA test execution failure detection.
        </div>
      </div>
    )}
  />
);

/**
 * 3. Defect Reopen Rate
 */
export const DefectReopenRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Activity className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Fix Verification Efficiency:</span> High reopen rates (&gt; 5%) indicate incomplete root-cause resolutions or shallow verification.
        </div>
      </div>
    )}
  />
);

/**
 * 4. Customer Escalations (APARs)
 */
export const CustomerAparClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Customer Severity Escapes:</span> Authorized Problem Analysis Reports filed by enterprise tier-1 customers post-release.
        </div>
      </div>
    )}
  />
);

/**
 * 5. Defect Density per 1,000 Lines of Code (KLOC)
 */
export const DefectDensityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Bug className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Normalized Code Quality:</span> Defects identified per 1,000 source lines of code changed in pull requests. Target is &le; 1.5.
        </div>
      </div>
    )}
  />
);

/**
 * 6. First-Time Fix Rate (FTFR)
 */
export const FirstTimeFixRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Wrench className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Remediation Accuracy:</span> Percentage of bug fixes verified and closed without subsequent reopening or rework (&ge; 88%).
        </div>
      </div>
    )}
  />
);

/**
 * 7. Net Defect Intake Velocity
 */
export const NetDefectVelocityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <TrendingUp className="w-5 h-5 shrink-0 text-purple-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Intake vs Resolution Convergence:</span> Net difference between new incoming bugs and closed bugs over the sprint.
        </div>
      </div>
    )}
  />
);

/**
 * 8. Defect Aging Profile
 */
export const DefectAgingClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <History className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Backlog Stagnation Profile:</span> Breakdown of unresolved bugs by active age (&lt;7d, 7-14d, 14-21d, &gt;21d).
        </div>
      </div>
    )}
  />
);

/**
 * 9. Defect Discovery vs. Resolution Burnout Trend
 */
export const DefectBurnoutTrendClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Flame className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Burnout Convergence Curve:</span> Tracking cumulative bugs reported vs verified resolved to establish release freeze readiness.
        </div>
      </div>
    )}
  />
);
