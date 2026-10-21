/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import type { KPIJustification } from '../../../types/kpiPlatform';

export interface IMetricClarificationContract extends KPIJustification {
  title: string;
  statusBadge: string;
  statusColor: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  currentValue: string | number;
  targetValue: string;
  overviewAndSignificance?: string;
  description?: string;
  trackedInfo?: string;
  businessImportance?: string;
  formulaOrRule: string;
  rationale: string;
  recommendedAction: string;
}

export interface IMetricClarifier<TContext = unknown> {
  getClarification(context: TContext): IMetricClarificationContract;
}

export interface IBaseMetricWidgetProps {
  onJustify: () => void;
  clarificationLabel?: string;
}

export interface IMetricCardContract extends IBaseMetricWidgetProps {
  title: string;
  value: string | number;
  target?: string;
  trend?: string;
  trendPositive?: boolean;
  statusBadge?: string;
  statusColor?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  icon?: React.ReactNode;

  // Comparison extensions
  isComparing?: boolean;
  scopeALabel?: string;
  scopeBLabel?: string;
  compareValue?: string | number;
  compareStatusBadge?: string;
  compareStatusColor?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  delta?: string;
  deltaPositive?: boolean;
}

export class MetricClarificationFactory {
  public static create(justification: IMetricClarificationContract): IMetricClarificationContract {
    if (!justification.title) throw new Error('MetricClarification: title is mandatory.');
    if (!justification.overviewAndSignificance && !justification.description) {
      throw new Error(`MetricClarification [${justification.title}]: overviewAndSignificance is mandatory.`);
    }
    if (!justification.formulaOrRule) throw new Error(`MetricClarification [${justification.title}]: formulaOrRule is mandatory.`);
    if (!justification.rationale) throw new Error(`MetricClarification [${justification.title}]: rationale is mandatory.`);
    if (!justification.recommendedAction) throw new Error(`MetricClarification [${justification.title}]: recommendedAction is mandatory.`);
    return justification;
  }
}

export interface ISectionHeaderContract extends IBaseMetricWidgetProps {
  title: string;
  badgeText?: string;
  badgeVariant?: 'neutral' | 'rose' | 'amber' | 'emerald' | 'cyan' | 'purple';
  icon?: React.ReactNode;
  subtitle?: string;
  actionText?: string;
}
