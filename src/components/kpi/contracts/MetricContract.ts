/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import type { KPIJustification } from '../../../types/kpiPlatform';

/**
 * =========================================================================
 * OOP CONTRACT / ABSTRACT INTERFACE PATTERNS FOR METRIC CLARIFICATIONS
 * =========================================================================
 * 
 * In Java / C++ OOP architectures:
 *   public abstract class AbstractMetricWidget<TData> {
 *       public abstract KPIJustification getClarification();
 *   }
 * 
 * In TypeScript / React:
 *   Every metric widget contract MANDATES a clarification provider.
 *   Subclasses and consumers MUST implement or provide `onJustify` or a 
 *   deterministic `getClarification()` provider. Failure to provide it
 *   triggers a compile-time TypeScript error.
 */

/**
 * 1. Concrete interface guaranteeing a complete, compliant clarification model.
 *    Notice: `description`, `trackedInfo`, `businessImportance`, `formulaOrRule`,
 *    and `recommendedAction` are strictly REQUIRED (not optional).
 */
export interface IMetricClarificationContract extends KPIJustification {
  title: string;
  statusBadge: string;
  statusColor: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  currentValue: string | number;
  targetValue: string;
  description: string;          // What the metric is (Mandatory overview piece 1)
  trackedInfo: string;          // What info it exposes (Mandatory overview piece 2)
  businessImportance: string;   // Why it matters (Mandatory overview piece 3)
  formulaOrRule: string;        // Exact mathematical equation / policy
  rationale: string;            // Why current value triggered the status
  recommendedAction: string;    // Actionable remediation steps
}

/**
 * 2. Abstract Clarifier Provider Contract.
 *    Any class or service generating metric justifications must implement this contract.
 */
export interface IMetricClarifier<TContext = unknown> {
  getClarification(context: TContext): IMetricClarificationContract;
}

/**
 * 3. Base Properties Contract for ALL Metric Widgets.
 *    Forces all widgets (cards, gauges, charts, tables) to mandate clarification.
 */
export interface IBaseMetricWidgetProps {
  /**
   * Mandatory Clarification Trigger / Modal Handler.
   * Required in all metric implementations.
   */
  onJustify: () => void;
  /**
   * Accessibility title / tooltip for the clarification trigger.
   */
  clarificationLabel?: string;
}

/**
 * 4. Contract for Metric Stat Cards (inherits from IBaseMetricWidgetProps).
 */
export interface IMetricCardContract extends IBaseMetricWidgetProps {
  title: string;
  value: string | number;
  target?: string;
  trend?: string;
  trendPositive?: boolean;
  statusBadge?: string;
  statusColor?: 'emerald' | 'amber' | 'rose' | 'cyan' | 'purple';
  icon?: React.ReactNode;
}

/**
 * 5. Abstract Factory / Helper to validate and build compliant justifications.
 *    Throws an error at development time if any required section is omitted,
 *    and guarantees complete compile-time type safety.
 */
export class MetricClarificationFactory {
  public static create(justification: IMetricClarificationContract): IMetricClarificationContract {
    if (!justification.title) throw new Error('MetricClarification: title is mandatory.');
    if (!justification.description) throw new Error(`MetricClarification [${justification.title}]: description is mandatory.`);
    if (!justification.trackedInfo) throw new Error(`MetricClarification [${justification.title}]: trackedInfo is mandatory.`);
    if (!justification.businessImportance) throw new Error(`MetricClarification [${justification.title}]: businessImportance is mandatory.`);
    if (!justification.formulaOrRule) throw new Error(`MetricClarification [${justification.title}]: formulaOrRule is mandatory.`);
    if (!justification.rationale) throw new Error(`MetricClarification [${justification.title}]: rationale is mandatory.`);
    if (!justification.recommendedAction) throw new Error(`MetricClarification [${justification.title}]: recommendedAction is mandatory.`);
    return justification;
  }
}

/**
 * 6. Contract for Complex Container / Section Headers (Tables, Matrices, Audits, Ledgers).
 *    Guarantees every major section or ledger table has a mandatory clarification trigger
 *    with a standard, prominent (?) HelpCircle icon button.
 */
export interface ISectionHeaderContract extends IBaseMetricWidgetProps {
  title: string;
  badgeText?: string;
  badgeVariant?: 'neutral' | 'rose' | 'amber' | 'emerald' | 'cyan' | 'purple';
  icon?: React.ReactNode;
  subtitle?: string;
  actionText?: string; // e.g. "Clarify Policy" or "Explain Metric"
}
