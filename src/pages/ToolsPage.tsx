import React, { useState } from 'react';
import { 
  BarChart3, ShieldCheck, Users, 
  Copy, Check, ArrowRight, Gauge, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalizedAuditTemplates, useLocalizedCoreKPIs } from '../hooks/useLocalizedData';

export const ToolsPage: React.FC = () => {
  const { t } = useTranslation();
  const auditTemplates = useLocalizedAuditTemplates();
  const coreKpis = useLocalizedCoreKPIs();
  const [activeTab, setActiveTab] = useState<'calculator' | 'audit' | 'capacity' | 'kpis'>('calculator');

  // --- TOOL 1: KPI & DORA Health Calculator State ---
  const [deployFreq, setDeployFreq] = useState<number>(10); // per month
  const [leadTimeHours, setLeadTimeHours] = useState<number>(48); // hours
  const [changeFailRate, setChangeFailRate] = useState<number>(8); // percent
  const [mttrHours, setMttrHours] = useState<number>(4); // hours
  const [testCoverage, setTestCoverage] = useState<number>(75); // percent
  const [defectEscapeRate, setDefectEscapeRate] = useState<number>(4); // percent

  // Calculate DORA Tier
  const getDoraTier = () => {
    let score = 0;
    if (deployFreq >= 30) score += 3;
    else if (deployFreq >= 4) score += 2;
    else score += 1;

    if (leadTimeHours <= 24) score += 3;
    else if (leadTimeHours <= 168) score += 2;
    else score += 1;

    if (changeFailRate <= 5) score += 3;
    else if (changeFailRate <= 15) score += 2;
    else score += 1;

    if (mttrHours <= 1) score += 3;
    else if (mttrHours <= 24) score += 2;
    else score += 1;

    if (score >= 11) return { 
      tier: 'Elite High-Performer', 
      color: 'text-emerald-600 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/80', 
      border: 'border-emerald-200 dark:border-emerald-500/40', 
      grade: 'A+' 
    };
    if (score >= 8) return { 
      tier: 'High Performer', 
      color: 'text-cyan-700 dark:text-cyan-400', 
      bg: 'bg-cyan-50 dark:bg-cyan-950/80', 
      border: 'border-cyan-200 dark:border-cyan-500/40', 
      grade: 'A' 
    };
    if (score >= 5) return { 
      tier: 'Medium Performer', 
      color: 'text-amber-600 dark:text-amber-400', 
      bg: 'bg-amber-50 dark:bg-amber-950/80', 
      border: 'border-amber-200 dark:border-amber-500/40', 
      grade: 'B' 
    };
    return { 
      tier: 'Low / At Risk', 
      color: 'text-rose-600 dark:text-rose-400', 
      bg: 'bg-rose-50 dark:bg-rose-950/80', 
      border: 'border-rose-200 dark:border-rose-500/40', 
      grade: 'C-' 
    };
  };

  const doraResult = getDoraTier();

  // --- TOOL 2: Interactive QA & Process Audit State ---
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>({
    '0-0': true,
    '0-1': true,
    '1-0': true,
    '2-0': true,
    '3-0': true,
  });
  const [auditReportCopied, setAuditReportCopied] = useState(false);

  const toggleAuditItem = (cIdx: number, index: number) => {
    const key = `${cIdx}-${index}`;
    setCheckedAuditItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalAuditItems = auditTemplates.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedAuditItems = Object.values(checkedAuditItems).filter(Boolean).length;
  const auditMaturityPercentage = Math.round((completedAuditItems / totalAuditItems) * 100);

  const copyAuditSummary = () => {
    let report = `INFO TECH MICROSYSTEMS - SOFTWARE PROJECT AUDIT REPORT\n`;
    report += `Generated at: ${new Date().toLocaleDateString()}\n`;
    report += `Overall Engineering Maturity Score: ${auditMaturityPercentage}%\n\n`;

    auditTemplates.forEach((cat, cIdx) => {
      report += `[${cat.title}]\n`;
      cat.items.forEach((item, idx) => {
        const checked = checkedAuditItems[`${cIdx}-${idx}`] ? '✓ PASS' : '✗ ACTION REQUIRED';
        report += `  ${checked}: ${item}\n`;
      });
      report += `\n`;
    });
    report += `Contact INFO TECH MICROSYSTEMS at info.tech.microsystems.ca@gmail.com (CC: sudarsha.wijenayake@gmail.com) / +1 613 266 5285 for remediation.\n`;

    navigator.clipboard.writeText(report);
    setAuditReportCopied(true);
    setTimeout(() => setAuditReportCopied(false), 3000);
  };

  // --- TOOL 3: Team Capacity & Staffing Estimator State ---
  const [numDevs, setNumDevs] = useState<number>(5);
  const [numTesters, setNumTesters] = useState<number>(2);
  const [numManagers, setNumManagers] = useState<number>(1);
  const [sprintWeeks, setSprintWeeks] = useState<number>(2);
  const [pointsPerDevSprint, setPointsPerDevSprint] = useState<number>(8);

  const sprintCapacityPoints = numDevs * pointsPerDevSprint;
  const qaToDevRatio = numTesters > 0 ? (numDevs / numTesters).toFixed(1) : 'N/A';
  const monthlyCapacityPoints = Math.round((sprintCapacityPoints / sprintWeeks) * 4);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-500/30 mb-3 font-mono">
          <Gauge className="w-3.5 h-3.5" />
          <span>{t('toolsPage.badge', 'ONLINE AUDIT & MATURITY SUITE')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-['Outfit'] mb-4">
          {t('toolsPage.title', 'Interactive Engineering Tools & Calculators')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {t('toolsPage.subtitle', 'Use our live interactive calculators and audit templates to evaluate your DevOps velocity (DORA), QA maturity, team capacity, and software quality metrics.')}
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md font-bold'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t('toolsPage.tabCalculator', 'DORA & Velocity Health Calculator')}</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md font-bold'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{t('toolsPage.tabAudit', 'Interactive QA & Architecture Audit Matrix')}</span>
        </button>

        <button
          onClick={() => setActiveTab('capacity')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'capacity'
              ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md font-bold'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('toolsPage.tabCapacity', 'Team Staffing & Capacity Estimator')}</span>
        </button>

        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'kpis'
              ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md font-bold'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t('toolsPage.tabKpis', 'Standard KPI Reference Catalog')}</span>
        </button>
      </div>

      {/* --- TAB 1: DORA & KPI Health Calculator --- */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/20 shadow-sm dark:shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-1">
                {t('toolsCalculator.inputParamsTitle', 'Engineering Velocity & Quality Input Parameters')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('toolsCalculator.inputParamsDesc', "Adjust sliders to reflect your project's current deployment cadence, defect rates, and recovery metrics.")}
              </p>
            </div>

            {/* Deploy Frequency */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('toolsPage.deployFreq', 'Deployment Frequency')}:</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">
                  {t('toolsCalculator.deploymentsPerMonth', '{{count}} deployments / month', { count: deployFreq })}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={deployFreq}
                onChange={(e) => setDeployFreq(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>{t('toolsCalculator.lowCadence', '1/month (Low)')}</span>
                <span>{t('toolsCalculator.weeklyCadence', '4/month (Weekly)')}</span>
                <span>{t('toolsCalculator.eliteCadence', '30+/month (Daily/Elite)')}</span>
              </div>
            </div>

            {/* Lead Time */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('toolsPage.leadTime', 'Lead Time for Changes')}:</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">
                  {t('toolsCalculator.leadTimeHoursDays', '{{hours}} hours ({{days}} days)', { hours: leadTimeHours, days: Math.round(leadTimeHours/24) })}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="336"
                value={leadTimeHours}
                onChange={(e) => setLeadTimeHours(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>{t('toolsCalculator.leadTimeElite', '< 24h (Elite)')}</span>
                <span>{t('toolsCalculator.leadTimeGood', '48h (Good)')}</span>
                <span>{t('toolsCalculator.leadTimeFriction', '14 days (High friction)')}</span>
              </div>
            </div>

            {/* Change Failure Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('toolsPage.changeFailRate', 'Change Failure Rate (CFR)')}:</span>
                <span className={`${changeFailRate <= 5 ? 'text-emerald-600 dark:text-emerald-400' : changeFailRate <= 15 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'} font-bold`}>
                  {changeFailRate}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={changeFailRate}
                onChange={(e) => setChangeFailRate(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>{t('toolsCalculator.cfrElite', '0-5% (Elite)')}</span>
                <span>{t('toolsCalculator.cfrModerate', '15% (Moderate)')}</span>
                <span>{t('toolsCalculator.cfrCritical', '30%+ (Critical)')}</span>
              </div>
            </div>

            {/* Mean Time to Restore (MTTR) */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('toolsPage.mttr', 'Mean Time to Restore (MTTR)')}:</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">
                  {t('toolsCalculator.hoursValue', '{{count}} hours', { count: mttrHours })}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="48"
                step="0.5"
                value={mttrHours}
                onChange={(e) => setMttrHours(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>{t('toolsCalculator.mttrElite', '< 1 hour (Elite)')}</span>
                <span>{t('toolsCalculator.mttrModerate', '4-8 hours')}</span>
                <span>{t('toolsCalculator.mttrSevere', '24-48 hours (Severe impact)')}</span>
              </div>
            </div>

            {/* Automated Test Coverage */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('toolsPage.testCoverage', 'Automated Test Coverage')}:</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">
                  {t('toolsCalculator.branchCoverageValue', '{{pct}}% branch coverage', { pct: testCoverage })}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={testCoverage}
                onChange={(e) => setTestCoverage(Number(e.target.value))}
                className="w-full accent-purple-600 dark:accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>{t('toolsCalculator.testCovRisk', '20% (High risk)')}</span>
                <span>{t('toolsCalculator.testCovTarget', '75% (Target)')}</span>
                <span>{t('toolsCalculator.testCovOptimal', '90%+ (Optimal)')}</span>
              </div>
            </div>

            {/* Defect Escape Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('toolsPage.defectEscape', 'Defect Escape Rate (DER)')}:</span>
                <span className={`${defectEscapeRate <= 2 ? 'text-emerald-600 dark:text-emerald-400' : defectEscapeRate <= 5 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'} font-bold`}>
                  {t('toolsCalculator.defectEscapeValue', '{{pct}}% bugs in production', { pct: defectEscapeRate })}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={defectEscapeRate}
                onChange={(e) => setDefectEscapeRate(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Scorecard Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl ${doraResult.bg} border ${doraResult.border} shadow-lg dark:shadow-2xl relative overflow-hidden`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-700 dark:text-slate-300">
                  {t('toolsCalculator.scorecardTitle', 'DORA Performance Scorecard')}
                </span>
                <span className={`text-2xl font-black font-mono ${doraResult.color}`}>
                  {t('toolsCalculator.gradeLabel', 'Grade: {{grade}}', { grade: doraResult.grade })}
                </span>
              </div>

              <div className="mb-6">
                <div className={`text-2xl sm:text-3xl font-black ${doraResult.color} font-['Outfit']`}>
                  {doraResult.tier}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {t('toolsCalculator.benchmarkNote', 'Benchmarked against Google Cloud DORA State of DevOps industry standards.')}
                </p>
              </div>

              {/* Breakdown metrics summary */}
              <div className="space-y-2 text-xs font-mono border-t border-slate-200 dark:border-slate-700/60 pt-4 mb-6">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-600 dark:text-slate-400">{t('toolsCalculator.releaseCadence', 'Release Cadence:')}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {deployFreq >= 20 ? t('toolsCalculator.continuousDeliveryDaily', 'Continuous Delivery (Daily)') : deployFreq >= 4 ? t('toolsCalculator.agileBiWeekly', 'Agile Bi-Weekly') : t('toolsCalculator.slowCadence', 'Slow Cadence')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-600 dark:text-slate-400">{t('toolsCalculator.pipelineVelocity', 'Pipeline Velocity:')}</span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {leadTimeHours <= 24 ? t('toolsCalculator.highVelocity24h', 'High Velocity (<24h)') : leadTimeHours <= 72 ? t('toolsCalculator.moderateVelocity', 'Moderate') : t('toolsCalculator.staleBranchFriction', 'Stale Branch Friction')}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-600 dark:text-slate-400">{t('toolsCalculator.productionStability', 'Production Stability:')}</span>
                  <span className={changeFailRate <= 5 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400 font-semibold'}>
                    {changeFailRate <= 5 ? t('toolsCalculator.rockSolidStability', 'Rock Solid (<5% fail)') : t('toolsCalculator.needsRollbackProtection', 'Needs Rollback Protection')}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600 dark:text-slate-400">{t('toolsCalculator.qaSafetyNet', 'QA Safety Net:')}</span>
                  <span className={testCoverage >= 75 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400 font-semibold'}>
                    {testCoverage >= 75 ? t('toolsCalculator.robustAutomatedShield', 'Robust Automated Shield') : t('toolsCalculator.underTestedVulnerable', 'Under-tested / Vulnerable')}
                  </span>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2 mb-6 shadow-sm">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold block font-mono">
                  {t('toolsCalculator.strategicRecTitle', 'ITM Strategic Recommendation:')}
                </span>
                {doraResult.grade.includes('A') ? (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t('toolsCalculator.recHigh', 'Your pipeline shows high velocity. Focus on automated canary deployments, advanced APM distributed tracing, and reducing MTTR below 30 minutes via runbook automation.')}
                  </p>
                ) : (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t('toolsCalculator.recLow', 'Recommended immediate priority: Implement automated test gates in CI to suppress the Change Failure Rate, and streamline code reviews to shorten Lead Time for Changes below 24 hours.')}
                  </p>
                )}
              </div>

              <Link
                to="/services/kpis-and-audits"
                className="inline-flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>{t('toolsCalculator.engageAuditBtn', 'Engage ITM for a Formal Engineering Audit')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: Interactive QA Strategy & Audit Checklist Matrix --- */}
      {activeTab === 'audit' && (
        <div className="space-y-8">
          {/* Audit Header Banner */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {t('toolsAudit.checklistTitle', 'Software Project Audit Checklist')}
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/40">
                  {t('toolsAudit.completedCount', '{{completed}} / {{total}} Completed', { completed: completedAuditItems, total: totalAuditItems })}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                {t('toolsAudit.checklistDesc', "Check off verified capabilities across architecture, automated testing, security, and governance to calculate your project's readiness score.")}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-700 dark:text-cyan-400 font-mono">
                  {auditMaturityPercentage}%
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{t('toolsAudit.maturityScore', 'Maturity Score')}</div>
              </div>

              <button
                onClick={copyAuditSummary}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium transition-all cursor-pointer"
              >
                {auditReportCopied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                <span>{auditReportCopied ? t('toolsAudit.reportCopied', 'Report Copied!') : t('toolsAudit.copyReportBtn', 'Copy Audit Report')}</span>
              </button>
            </div>
          </div>

          {/* 4 Pillars Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditTemplates.map((cat, cIdx) => (
              <div key={cIdx} className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                    <span>{cat.title}</span>
                  </h3>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                    {cat.items.filter((_, idx) => checkedAuditItems[`${cIdx}-${idx}`]).length}/{cat.items.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cat.items.map((item, iIdx) => {
                    const key = `${cIdx}-${iIdx}`;
                    const isChecked = !!checkedAuditItems[key];
                    return (
                      <label 
                        key={iIdx}
                        onClick={() => toggleAuditItem(cIdx, iIdx)}
                        className={`flex items-start space-x-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-cyan-50 border-cyan-300 text-cyan-950 dark:bg-cyan-950/40 dark:border-cyan-500/30 dark:text-white' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-slate-950/50 dark:border-slate-800/80 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-cyan-600 border-cyan-600 text-white dark:bg-cyan-500 dark:border-cyan-400 dark:text-slate-950' : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs leading-relaxed">{item}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Audit CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50 via-white to-purple-50 dark:from-cyan-950/60 dark:to-purple-950/60 border border-cyan-200 dark:border-cyan-500/30 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] mb-2">
              {t('toolsAudit.formalAuditCtaTitle', 'Need a Formal Third-Party Audit for Compliance or Due Diligence?')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-4">
              {t('toolsAudit.formalAuditCtaDesc', 'INFO TECH MICROSYSTEMS delivers signed executive reports covering architecture viability, code quality indices, SOC2/ISO controls, and QA coverage.')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{t('toolsAudit.scheduleAuditBtn', 'Schedule Formal Audit with Sudarsha Wijenayake')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}

      {/* --- TAB 3: Team Capacity & Staffing Calculator --- */}
      {activeTab === 'capacity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-1">
                {t('toolsCapacity.squadCapacityTitle', 'Engineering Squad Capacity Modeling')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('toolsCapacity.squadCapacityDesc', 'Model sprint velocity, team ratios, and delivery output across development, testing, and management.')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Devs */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-2">
                  {t('toolsCapacity.developersLabel', { count: numDevs, defaultValue: `Software Developers: ${numDevs} engineers` })}
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={numDevs}
                  onChange={(e) => setNumDevs(Number(e.target.value))}
                  className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Testers */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-2">
                  {t('toolsCapacity.testersLabel', { count: numTesters, defaultValue: `QA / SDET Automation Engineers: ${numTesters} testers` })}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={numTesters}
                  onChange={(e) => setNumTesters(Number(e.target.value))}
                  className="w-full accent-purple-600 dark:accent-purple-400 cursor-pointer"
                />
              </div>

              {/* Managers */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-2">
                  {t('toolsCapacity.managersLabel', { count: numManagers, defaultValue: `Project Managers / Scrum Masters: ${numManagers}` })}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={numManagers}
                  onChange={(e) => setNumManagers(Number(e.target.value))}
                  className="w-full accent-slate-800 dark:accent-white cursor-pointer"
                />
              </div>

              {/* Sprint Length */}
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-2">
                  {t('toolsCapacity.cadenceLabel', { weeks: sprintWeeks, defaultValue: `Sprint Cadence: ${sprintWeeks} Weeks` })}
                </label>
                <select
                  value={sprintWeeks}
                  onChange={(e) => setSprintWeeks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono"
                >
                  <option value={1} className="bg-white dark:bg-slate-900">{t('toolsCapacity.cadence1Week', '1 Week (High frequency)')}</option>
                  <option value={2} className="bg-white dark:bg-slate-900">{t('toolsCapacity.cadence2Weeks', '2 Weeks (Standard Scrum)')}</option>
                  <option value={3} className="bg-white dark:bg-slate-900">{t('toolsCapacity.cadence3Weeks', '3 Weeks')}</option>
                  <option value={4} className="bg-white dark:bg-slate-900">{t('toolsCapacity.cadence4Weeks', '4 Weeks (Monthly)')}</option>
                </select>
              </div>
            </div>

            {/* Velocity per dev slider */}
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 mb-2">
                {t('toolsCapacity.velocityPerDevLabel', { points: pointsPerDevSprint, defaultValue: `Estimated Velocity per Developer per Sprint: ${pointsPerDevSprint} Story Points` })}
              </label>
              <input
                type="range"
                min="3"
                max="15"
                value={pointsPerDevSprint}
                onChange={(e) => setPointsPerDevSprint(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Outputs Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 shadow-md dark:shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              {t('toolsCapacity.projectedThroughputTitle', 'Projected Squad Throughput')}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-2xl sm:text-3xl font-black text-cyan-700 dark:text-cyan-400 font-mono">
                  {sprintCapacityPoints}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">{t('toolsCapacity.pointsPerSprint', 'Story Points / Sprint')}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-400 font-mono">
                  ~{monthlyCapacityPoints}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">{t('toolsCapacity.pointsPerMonth', 'Story Points / Month')}</span>
              </div>
            </div>

            {/* Staffing Health Check */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-600 dark:text-slate-400">{t('toolsCapacity.devToQaRatio', 'Dev-to-QA Ratio:')}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{qaToDevRatio} : 1</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-600 dark:text-slate-400">{t('toolsCapacity.ratioAssessment', 'Ratio Assessment:')}</span>
                <span className={Number(qaToDevRatio) <= 3 ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : Number(qaToDevRatio) <= 5 ? 'text-amber-700 dark:text-amber-400 font-semibold' : 'text-rose-700 dark:text-rose-400 font-semibold'}>
                  {Number(qaToDevRatio) <= 3 
                    ? t('toolsCapacity.balancedQaSafety', 'Balanced QA Safety') 
                    : Number(qaToDevRatio) <= 5 
                      ? t('toolsCapacity.moderateQaLoad', 'Moderate QA Load') 
                      : t('toolsCapacity.highBottleneckRisk', 'High Bottleneck Risk')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{t('toolsCapacity.totalHeadcount', { count: numDevs + numTesters + numManagers, defaultValue: `Total Squad Headcount: ${numDevs + numTesters + numManagers} Specialists` })}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('toolsCapacity.recruitmentBlurb', 'Need to scale up or staff missing roles? INFO TECH MICROSYSTEMS recruits pre-vetted Developers, SDETs, and Managers.')}
            </p>

            <Link
              to="/services/technical-recruitment"
              className="inline-flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>{t('toolsCapacity.exploreRecruitmentBtn', 'Explore Technical Recruitment Services')}</span>
            </Link>
          </div>
        </div>
      )}

      {/* --- TAB 4: Core KPI Reference Glossary --- */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-1">
                {t('toolsGlossary.directoryTitle', 'Enterprise Software KPI Reference Directory')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {t('toolsGlossary.directorySubtitle', 'Standardized metrics, calculation formulas, target benchmarks, and business justifications used by INFO TECH MICROSYSTEMS.')}
              </p>
            </div>
            <Link
              to="/kpi"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-xs shadow-md shrink-0 transition-all cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{t('toolsGlossary.launchLiveKpi', 'Launch Live KPI Platform →')}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreKpis.map((kpi) => (
              <div 
                key={kpi.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/30 transition-all space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
                    {t(`kpiCategories.${kpi.category}`, kpi.category)}
                  </span>
                  <span className="text-xs font-mono text-purple-700 dark:text-purple-400 font-semibold">
                    {t('toolsGlossary.targetPrefix', 'Target: ')}{t(`kpiGlossaryData.${kpi.id}.targetBenchmark`, kpi.targetBenchmark.split('|')[0])}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {t(`kpiGlossaryData.${kpi.id}.name`, kpi.name)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(`kpiGlossaryData.${kpi.id}.description`, kpi.description)}
                </p>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold mb-1">
                    {t('toolsGlossary.formulaPrefix', 'Formula:')}
                  </span>
                  <span className="text-cyan-800 dark:text-cyan-300">
                    {t(`kpiGlossaryData.${kpi.id}.calculationFormula`, kpi.calculationFormula)}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <strong className="text-slate-900 dark:text-slate-200">
                    {t('toolsGlossary.businessImpactPrefix', 'Business Impact:')}{' '}
                  </strong>
                  {t(`kpiGlossaryData.${kpi.id}.businessImpact`, kpi.businessImpact)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
