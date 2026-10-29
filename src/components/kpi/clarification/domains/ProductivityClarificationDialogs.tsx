/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { BaseClarificationDialog, type BaseClarificationDialogProps } from '../BaseClarificationDialog';
import { Zap, GitPullRequest, TrendingUp } from 'lucide-react';

/**
 * Concrete Clarification Dialog: Sprint Flow Efficiency
 */
export const FlowEfficiencyClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <Zap className="w-5 h-5 shrink-0 text-cyan-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Throughput Dynamics:</span> Ratio of active development time versus wait/queue time in sprint boards.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Dev-to-QA Ratio
 */
export const DevToQaRatioClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <GitPullRequest className="w-5 h-5 shrink-0 text-indigo-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Staffing Balance Index:</span> Optimizes quality assurance coverage per developer to prevent test bottlenecks.
          </div>
        </div>
      )}
    />
  );
};

/**
 * Concrete Clarification Dialog: Story Completion Velocity
 */
export const StoryVelocityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => {
  return (
    <BaseClarificationDialog
      {...props}
      renderTopCustomContent={(theme) => (
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
          <TrendingUp className="w-5 h-5 shrink-0 text-emerald-500" />
          <div className="font-mono text-[11px] leading-snug">
            <span className="font-bold">Delivery Predictability:</span> Assesses committed vs completed story points across consecutive sprint iterations.
          </div>
        </div>
      )}
    />
  );
};
