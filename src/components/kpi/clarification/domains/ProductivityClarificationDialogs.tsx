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
  CheckSquare, Users, TrendingUp, UserCheck, 
  Zap, CornerDownRight, GitPullRequest 
} from 'lucide-react';

/**
 * 1. Average QA Test Completion Rate
 */
export const TestCompletionRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <CheckSquare className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Execution Velocity:</span> Ratio of scheduled manual and automated tests executed to completion in the active sprint cycle.
        </div>
      </div>
    )}
  />
);

/**
 * 2. Over-Committed Engineers
 */
export const OvercommittedEngineersClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Users className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Capacity & Burnout Warning:</span> Engineers assigned story points or test executions exceeding 120% of nominal capacity.
        </div>
      </div>
    )}
  />
);

/**
 * 3. Sprint Story Completion Rate
 */
export const StoryVelocityClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <TrendingUp className="w-5 h-5 shrink-0 text-emerald-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Delivery Predictability:</span> Proportion of planned sprint backlog stories marked "Done" and verified before sprint review.
        </div>
      </div>
    )}
  />
);

/**
 * 4. Active QA Specialists & Capacity
 */
export const ActiveSpecialistsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <UserCheck className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Resource Allocation:</span> Number of dedicated QA and SDET engineers actively participating in test creation and execution.
        </div>
      </div>
    )}
  />
);

/**
 * 5. Sprint Flow Efficiency (Active vs Wait Time)
 */
export const FlowEfficiencyClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Zap className="w-5 h-5 shrink-0 text-cyan-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Throughput Dynamics:</span> Ratio of active development time versus wait/queue time in sprint boards (&ge; 40%).
        </div>
      </div>
    )}
  />
);

/**
 * 6. Sprint Carry-Over & Spillover Rate
 */
export const SpilloverRateClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <CornerDownRight className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Carryover Friction:</span> Percentage of committed story points carried over unresolved into subsequent sprint iterations (&le; 10%).
        </div>
      </div>
    )}
  />
);

/**
 * 7. Developer to QA Staffing Ratio
 */
export const DevToQaRatioClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <GitPullRequest className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Staffing Balance Index:</span> Optimizes quality assurance coverage per developer to prevent test bottlenecks (Target 3:1 to 4:1).
        </div>
      </div>
    )}
  />
);
