/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { Bot, Shuffle, Terminal } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Automation Suite Pass Rate
 */
export const AutomationPassRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Bot className="w-5 h-5 shrink-0 text-cyan-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">CI/CD Gate Requirement:</span> Test suites must maintain {'>='} 95% pass rate to unblock production deployment.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Flaky Test Index
 */
export const FlakyTestClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
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
};

/**
 * Concrete Clarification Dialog: Pipeline Runtime Velocity
 */
export const PipelineRuntimeClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
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
};
