/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import type { BaseClarificationDialogProps } from './BaseClarificationDialog';
import { BaseClarificationDialog } from './BaseClarificationDialog';
import {
  ReleaseQualityClarificationDialog,
  DefectLeakageClarificationDialog,
  BlockerDefectsClarificationDialog
} from './domains/ExecutiveClarificationDialogs';
import {
  AutomationPassRateClarificationDialog,
  FlakyTestClarificationDialog,
  PipelineRuntimeClarificationDialog
} from './domains/AutomationClarificationDialogs';
import {
  SlaAdherenceClarificationDialog,
  TraceabilityClarificationDialog,
  AccessibilityClarificationDialog
} from './domains/GovernanceClarificationDialogs';
import {
  ComponentMatrixRiskClarificationDialog,
  DependencyDepthClarificationDialog,
  BlockedDevItemsClarificationDialog
} from './domains/RiskClarificationDialogs';
import {
  DefectDensityClarificationDialog,
  DefectAgingClarificationDialog,
  DefectReopenRateClarificationDialog
} from './domains/QualityClarificationDialogs';
import {
  FlowEfficiencyClarificationDialog,
  DevToQaRatioClarificationDialog,
  StoryVelocityClarificationDialog
} from './domains/ProductivityClarificationDialogs';
import {
  LeadingHealthIndexClarificationDialog,
  NearMissesInterceptedClarificationDialog,
  AvoidedOutageLossClarificationDialog
} from './domains/LeadingLaggingClarificationDialogs';

export type ClarificationDialogComponent = React.FC<BaseClarificationDialogProps>;

/**
 * Polymorphic Registry mapping KPI clarification titles or identifiers
 * to concrete specialized dialog classes/components.
 */
export const CLARIFICATION_DIALOG_REGISTRY: Record<string, ClarificationDialogComponent> = {
  // Executive Scorecard
  'Release Quality Index & Executive Evaluation': ReleaseQualityClarificationDialog,
  'Customer Defect Leakage Rate': DefectLeakageClarificationDialog,
  'Gating Blockers & Critical Defects': BlockerDefectsClarificationDialog,

  // Automation
  'Automated Test Suite Pass Rate': AutomationPassRateClarificationDialog,
  'Flaky Test Index & Nondeterminism': FlakyTestClarificationDialog,
  'CI/CD Pipeline Execution Runtime': PipelineRuntimeClarificationDialog,

  // Governance & SLAs
  'Enterprise SLA Adherence & Uptime': SlaAdherenceClarificationDialog,
  'Requirement Traceability Matrix': TraceabilityClarificationDialog,
  'WCAG Accessibility Conformance': AccessibilityClarificationDialog,

  // Risk & Gating
  'Component Failure Risk Matrix': ComponentMatrixRiskClarificationDialog,
  'High Dependency Depth Architecture': DependencyDepthClarificationDialog,
  'Blocked Development Items': BlockedDevItemsClarificationDialog,

  // Quality & Defects
  'Defect Density': DefectDensityClarificationDialog,
  'Defect Aging Profile': DefectAgingClarificationDialog,
  'Defect Reopen Rate': DefectReopenRateClarificationDialog,

  // Productivity & Agility
  'Sprint Flow Efficiency': FlowEfficiencyClarificationDialog,
  'Dev-to-QA Ratio': DevToQaRatioClarificationDialog,
  'Story Completion Velocity': StoryVelocityClarificationDialog,

  // Leading & Lagging
  'Proactive Leading Health Index': LeadingHealthIndexClarificationDialog,
  'Pre-Production Near Misses Intercepted': NearMissesInterceptedClarificationDialog,
  'Avoided Outage Loss ($ COPQ)': AvoidedOutageLossClarificationDialog
};

/**
 * Factory resolver to look up the appropriate concrete clarification dialog component.
 * Defaults gracefully to the BaseClarificationDialog for any standard KPI.
 */
export function getClarificationDialogForKPI(title?: string): ClarificationDialogComponent {
  if (!title) return BaseClarificationDialog;
  return CLARIFICATION_DIALOG_REGISTRY[title] || BaseClarificationDialog;
}

export * from './BaseClarificationDialog';
export * from './domains/ExecutiveClarificationDialogs';
export * from './domains/AutomationClarificationDialogs';
export * from './domains/GovernanceClarificationDialogs';
export * from './domains/RiskClarificationDialogs';
export * from './domains/QualityClarificationDialogs';
export * from './domains/ProductivityClarificationDialogs';
export * from './domains/LeadingLaggingClarificationDialogs';
