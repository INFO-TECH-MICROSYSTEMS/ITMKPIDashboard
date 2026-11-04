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
  Compass, Activity, ShieldCheck, DollarSign, 
  GitPullRequest, Link2, Zap, Target 
} from 'lucide-react';

/**
 * 1. Proactive Leading Health Index
 */
export const LeadingHealthIndexClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Compass className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Proactive Indicator:</span> Evaluates code hygiene, branch health, and early sprint signals before downstream QA cycles (&ge; 90.0).
        </div>
      </div>
    )}
  />
);

/**
 * 2. Lagging Outcome Stability
 */
export const LaggingStabilityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Activity className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Post-Deployment Health:</span> Measures production incident volume, defect escape severity, and user MTTR stability (&ge; 85.0).
        </div>
      </div>
    )}
  />
);

/**
 * 3. Pre-Production Near Misses Intercepted
 */
export const NearMissesInterceptedClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Pre-Production Interception:</span> High-severity defects caught by shift-left testing prior to release staging (&ge; 90.0%).
        </div>
      </div>
    )}
  />
);

/**
 * 4. Avoided Outage Loss ($ COPQ)
 */
export const AvoidedOutageLossClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
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

/**
 * 5. PR Code Quality Gate Compliance
 */
export const PrQualityGateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <GitPullRequest className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Pull Request Hygiene:</span> Compliance with static analysis, linting, and automated code review benchmarks before merge (&ge; 90%).
        </div>
      </div>
    )}
  />
);

/**
 * 6. High Dependency Coupling Ratio
 */
export const HighDependencyRatioClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Link2 className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Cross-Component Coupling:</span> Proportion of codebase modules tightly coupled to external shared libraries (&le; 15%).
        </div>
      </div>
    )}
  />
);

/**
 * 7. In-Flight Automated Test Coverage
 */
export const InFlightAutomationClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Zap className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Sprint Test Authoring:</span> Automation tests written in-sprint alongside new feature development (&ge; 80%).
        </div>
      </div>
    )}
  />
);

/**
 * 8. Exploratory & Ad-Hoc Shift-Left Ratio
 */
export const ExploratoryRatioClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Target className="w-5 h-5 shrink-0 text-purple-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Creative Testing Balance:</span> Proportion of testing capacity allocated to time-boxed exploratory charters (&ge; 20%).
        </div>
      </div>
    )}
  />
);
