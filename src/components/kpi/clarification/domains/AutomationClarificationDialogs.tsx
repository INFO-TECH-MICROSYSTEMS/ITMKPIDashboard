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
  Bot, Shuffle, Terminal, Clock, DollarSign, 
  Cpu, Zap, BarChart2 
} from 'lucide-react';

/**
 * 1. Automated Test Suite Pass Rate
 */
export const AutomationPassRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Bot className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">CI/CD Gate Requirement:</span> Test suites must maintain &ge; 95% pass rate to unblock production deployment.
        </div>
      </div>
    )}
  />
);

/**
 * 2. Flaky Test Detection Index & Nondeterminism
 */
export const FlakyTestClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Shuffle className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Nondeterministic Test Metric:</span> Tests failing intermittently across identical commits are isolated to prevent false alarms.
        </div>
      </div>
    )}
  />
);

/**
 * 3. CI/CD Pipeline Runtime Velocity
 */
export const PipelineRuntimeClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Terminal className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Build Velocity SLA:</span> Pipeline runs exceeding target threshold induce feedback loop latency across engineering teams.
        </div>
      </div>
    )}
  />
);

/**
 * 4. Manual Hours Saved (Automation ROI)
 */
export const ManualHoursSavedClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Clock className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Automation Productivity Yield:</span> Equivalent engineering person-hours saved per sprint through automated regressions.
        </div>
      </div>
    )}
  />
);

/**
 * 5. CI/CD Cloud Runner Compute Expenditure
 */
export const CicdComputeCostClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <DollarSign className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Cloud Infrastructure Cost:</span> Monthly spend on CI/CD runner compute hours across GitHub Actions and TestRail executors.
        </div>
      </div>
    )}
  />
);

/**
 * 6. Mean Time Between Test Flakes (MTBF)
 */
export const MtbfClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Cpu className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Test Suite Resilience:</span> Operating hours between test environment failures or pipeline flaky incidents (&ge; 72 hrs).
        </div>
      </div>
    )}
  />
);

/**
 * 7. Automation Defect Catch Ratio
 */
export const AutomationCatchRatioClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Zap className="w-5 h-5 shrink-0 text-purple-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Shift-Left Detection Power:</span> Proportion of all bugs caught during automated CI/CD runs before reaching manual QA testers.
        </div>
      </div>
    )}
  />
);

/**
 * 8. Test Automation Burnout & Velocity Forecast
 */
export const AutomationForecastClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <BarChart2 className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Automation Migration Velocity:</span> Trajectory of converting manual regression test cases to automated test scripts.
        </div>
      </div>
    )}
  />
);
