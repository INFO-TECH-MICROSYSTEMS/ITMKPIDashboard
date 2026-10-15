import type { KPIJustification } from '../types/kpiPlatform';
import i18n from '../i18n';
import { KPI_OVERVIEWS } from './kpiOverviewsCatalog';
import { KPI_RATIONALES } from './kpiRationalesCatalog';

/**
 * Normalizes title for lookup in catalog
 */
function normalizeTitle(title: string): string {
  if (!title) return '';
  if (title.includes('Test Suite Execution Distribution')) {
    return 'Test Suite Execution Distribution';
  }
  if (title.startsWith('Items Pending Testing:')) {
    return 'Aging Work Items Under QA';
  }
  if (title.startsWith('P1 - Blocker Defect Volume') || title.startsWith('P2 - Critical Release Defect Volume') || title.startsWith('Defect Severity Distribution')) {
    return 'Defect Severity Distribution & Triage Hierarchy';
  }
  return title;
}

/**
 * Returns localized overview and significance text for a KPI by title.
 */
export function getLocalizedOverview(title: string, fallback: string): string {
  const lang = (i18n.language || 'en').split('-')[0];
  const normTitle = normalizeTitle(title);
  const catalogForLang = KPI_OVERVIEWS[lang] || KPI_OVERVIEWS['en'];
  if (catalogForLang && catalogForLang[normTitle]) {
    return catalogForLang[normTitle];
  }
  if (catalogForLang && catalogForLang[title]) {
    return catalogForLang[title];
  }
  return fallback;
}

/**
 * Returns localized rationale explanation based on current status and telemetry.
 */
export function getLocalizedRationale(justification: KPIJustification, fallback: string): string {
  const lang = (i18n.language || 'en').split('-')[0];
  const normTitle = normalizeTitle(justification.title);
  const catalogForLang = KPI_RATIONALES[lang] || KPI_RATIONALES['en'];
  if (catalogForLang && catalogForLang[normTitle]) {
    const fnOrText = catalogForLang[normTitle];
    if (typeof fnOrText === 'function') {
      return fnOrText(justification);
    }
    return fnOrText;
  }
  return fallback;
}

/**
 * Returns localized recommended action based on current status.
 */
export function getLocalizedAction(justification: KPIJustification, fallback: string): string {
  const lang = (i18n.language || 'en').split('-')[0];
  if (lang === 'zh') {
    const isClean = justification.statusColor === 'emerald';
    if (isClean) {
      return '继续保持当前研发与自动化测试推进节奏，确保各项质量门禁与安全扫描持续通过。';
    } else {
      return '组织专项敏捷攻坚并优先处理未解决阻塞缺陷，推进相关自动化测试与热修复验证以达到放行标准。';
    }
  }
  return fallback;
}

/**
 * Formats values like "15% (Grade F)" or "≥ 90% (Grade A)" into localized strings.
 */
export function formatLocalizedGradeString(val: string | number | undefined | null, t: (key: any, def?: any) => any): string {
  if (val === undefined || val === null) return '';
  const str = String(val);
  const gradeWord = t('kpiPlatform.grade', 'Grade');
  return str.replace(/\bGrade ([A-F])\b/g, `${gradeWord} $1`);
}

/**
 * Formats status badges like "Gated / Blocked (Grade F)" or "On Schedule".
 */
export function formatLocalizedStatusBadge(badge: string | undefined | null, t: (key: any, def?: any) => any): string {
  if (!badge) return '';

  const gradeWord = t('kpiPlatform.grade', 'Grade');
  let result = badge.replace(/\bGrade ([A-F])\b/g, `${gradeWord} $1`);

  if (result.includes('Gated / Blocked')) {
    result = result.replace('Gated / Blocked', t('kpiPlatform.statusGated', 'Gated / Blocked'));
  }
  if (result.includes('Conditional Warning')) {
    result = result.replace('Conditional Warning', t('kpiPlatform.statusWarning', 'Conditional Warning'));
  }
  if (result.includes('Release Approved')) {
    result = result.replace('Release Approved', t('kpiPlatform.statusOptimal', 'Release Approved'));
  }

  const directMap: Record<string, string> = {
    'Zero Penalty': t('kpiPlatform.governanceView.zeroPenalty', 'Zero Penalty'),
    'Audit Verified': t('kpiPlatform.governanceView.auditVerified', 'Audit Verified'),
    'Clear Gate': t('kpiPlatform.executiveView.statusPassed', 'Clear Gate'),
    'Gate Clear': t('kpiPlatform.executiveView.statusPassed', 'Gate Clear'),
    'Action Required': t('kpiPlatform.executiveView.actionRequired', 'Action Required'),
    'Compliant': t('kpiPlatform.statusCompliant', 'Compliant'),
    'Optimal': t('kpiPlatform.statusOptimal', 'Optimal'),
    'Optimal Flow': t('kpiPlatform.statusOptimal', 'Optimal Flow'),
    'Acceptable': t('kpiPlatform.statusAcceptable', 'Acceptable'),
    'Controlled': t('kpiPlatform.statusControlled', 'Controlled'),
    'Elevated': t('kpiPlatform.statusElevated', 'Elevated'),
    'Breached': t('kpiPlatform.statusBreached', 'Breached'),
    'SLA Met': t('kpiPlatform.statusMet', 'SLA Met'),
    'Warning': t('kpiPlatform.statusWarning', 'Warning'),
    'At Risk': t('kpiPlatform.statusAtRisk', 'At Risk'),
    'At Risk SLA': t('kpiPlatform.statusAtRisk', 'At Risk SLA'),
    'Critical SLA Breach': t('kpiPlatform.statusBreached', 'Critical SLA Breach'),
    'On Schedule': t('kpiPlatform.automationView.onSchedule', 'On Schedule'),
    'Pace Warning': t('kpiPlatform.automationView.paceWarning', 'Pace Warning'),
    'Velocity At Risk': t('kpiPlatform.statusAtRisk', 'Velocity At Risk'),
    'On Target': t('kpiPlatform.statusOnTarget', 'On Target'),
    'On Roadmap': t('kpiPlatform.statusOnTarget', 'On Roadmap'),
    'Behind Schedule': t('kpiPlatform.statusBehindSchedule', 'Behind Schedule'),
    'High Trust': t('kpiPlatform.statusHighTrust', 'High Trust'),
    'Balanced': t('kpiPlatform.statusBalanced', 'Balanced'),
    'Rebalance Needed': t('kpiPlatform.statusRebalanceNeeded', 'Rebalance Needed'),
    'Flow Unblocked': t('kpiPlatform.statusOptimal', 'Flow Unblocked'),
    'Gate Passed': t('kpiPlatform.statusCompliant', 'Gate Passed'),
    'Passed': t('kpiPlatform.statusCompliant', 'Passed'),
    'Gate Violation': t('kpiPlatform.statusGateViolation', 'Gate Violation'),
    'Hard Gate Lock': t('kpiPlatform.statusGateViolation', 'Hard Gate Lock'),
    'Gated by Blockers': t('kpiPlatform.statusGateViolation', 'Gated by Blockers'),
    'Controlled Severity': t('kpiPlatform.statusControlled', 'Controlled Severity'),
    'High Defect Churn': t('kpiPlatform.statusWarning', 'High Defect Churn'),
    'Quarantine Active': t('kpiPlatform.statusQuarantineActive', 'Quarantine Active'),
    'High Performance': t('kpiPlatform.statusOptimal', 'High Performance'),
    'Fast Pipeline': t('kpiPlatform.statusFastPipeline', 'Fast Pipeline'),
    'Fast Discovery': t('kpiPlatform.statusFastDiscovery', 'Fast Discovery'),
    'Audit Passed': t('kpiPlatform.statusAuditPassed', 'Audit Passed'),
    'Minor Violations': t('kpiPlatform.statusMinorViolations', 'Minor Violations'),
    'Delayed': t('kpiPlatform.statusDelayed', 'Delayed'),
    'Latency Warning': t('kpiPlatform.executiveView.latencyWarning', 'Latency Warning'),
    'Spike Latency': t('kpiPlatform.statusSpikeLatency', 'Spike Latency'),
    'Security Halt': t('kpiPlatform.statusGateViolation', 'Security Halt'),
    'Under Budget': t('kpiPlatform.statusControlled', 'Under Budget'),
    'High Rework Cost': t('kpiPlatform.statusElevated', 'High Rework Cost'),
    'Four Nines': t('kpiPlatform.statusOptimal', 'Four Nines'),
    'Penalty Risk': t('kpiPlatform.statusBreached', 'Penalty Risk')
  };

  return directMap[result] || result;
}
