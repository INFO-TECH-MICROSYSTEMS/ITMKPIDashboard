/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Component: MetricJustificationModal
 * Provides in-depth audit trail, mathematical formulas, rule violations,
 * root causes, and recommended actions for any KPI in the platform.
 * Restores the exact original pixel-perfect layout and typography.
 * Implements clean OOP design pattern with BaseClarificationDialog and
 * concrete polymorphic subclasses per KPI.
 */

import React from 'react';
import type { KPIJustification } from '../../types/kpiPlatform';
import { getClarificationDialogForKPI } from './clarification';

export interface MetricJustificationModalProps {
  justification: KPIJustification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MetricJustificationModal: React.FC<MetricJustificationModalProps> = ({
  justification,
  isOpen,
  onClose
}) => {
  if (!isOpen || !justification) return null;

  // Resolve concrete polymorphic dialog based on KPI definition, or fallback to BaseClarificationDialog
  const SpecificClarificationDialog = getClarificationDialogForKPI(justification.title);

  return (
    <SpecificClarificationDialog
      justification={justification}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
