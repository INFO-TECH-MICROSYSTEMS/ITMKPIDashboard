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
  FileCode, Cpu, GitBranch, Clock, 
  Layers, AlertOctagon 
} from 'lucide-react';

/**
 * 1. Items With No Unit Tests
 */
export const NoUnitTestsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <FileCode className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Code Coverage Enforcement:</span> Features and bug fixes merged without accompanying unit test assertions.
        </div>
      </div>
    )}
  />
);

/**
 * 2. Items With No API Tests
 */
export const NoApiTestsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Cpu className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">API Integration Safety:</span> Backend endpoints and microservices lacking automated contract/API test cases.
        </div>
      </div>
    )}
  />
);

/**
 * 3. High Dependency Depth (Depth &ge; 4)
 */
export const DependencyDepthClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <GitBranch className="w-5 h-5 shrink-0 text-amber-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Architectural Coupling Risk:</span> User stories and features blocked behind multi-tier inter-team dependencies (&ge; 4 levels).
        </div>
      </div>
    )}
  />
);

/**
 * 4. High Execution Time Tests (&gt;300s)
 */
export const HighExecutionTestsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Clock className="w-5 h-5 shrink-0 text-indigo-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Test Suite Bottlenecks:</span> Individual end-to-end test cases that run for more than 5 minutes, slowing CI pipelines.
        </div>
      </div>
    )}
  />
);

/**
 * 5. Component Failure Risk Matrix
 */
export const ComponentMatrixRiskClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <Layers className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Architectural Blast Radius:</span> Risk score computed across defect severity, test pass rates, and change churn per component.
        </div>
      </div>
    )}
  />
);

/**
 * 6. Blocked Development Items
 */
export const BlockedDevItemsClarificationDialog: React.FC<BaseClarificationDialogProps> = (props) => (
  <BaseClarificationDialog
    {...props}
    renderTopCustomContent={(theme) => (
      <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${theme.card}`}>
        <AlertOctagon className="w-5 h-5 shrink-0 text-rose-500" />
        <div className="font-mono text-[11px] leading-snug">
          <span className="font-bold">Impediment Watchlist:</span> Tracks features stuck on external environment dependencies or third-party blockers.
        </div>
      </div>
    )}
  />
);
