import React, { useState } from 'react';
import { 
  BarChart3, ShieldCheck, Users, 
  Copy, Check, ArrowRight, Gauge, Activity
} from 'lucide-react';
import { CORE_KPIS, AUDIT_CHECKLIST_TEMPLATES } from '../data/kpiData';
import { Link } from 'react-router-dom';

export const ToolsPage: React.FC = () => {
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

    if (score >= 11) return { tier: 'Elite High-Performer', color: 'text-emerald-400', bg: 'bg-emerald-950/80', border: 'border-emerald-500/40', grade: 'A+' };
    if (score >= 8) return { tier: 'High Performer', color: 'text-cyan-400', bg: 'bg-cyan-950/80', border: 'border-cyan-500/40', grade: 'A' };
    if (score >= 5) return { tier: 'Medium Performer', color: 'text-amber-400', bg: 'bg-amber-950/80', border: 'border-amber-500/40', grade: 'B' };
    return { tier: 'Low / At Risk', color: 'text-rose-400', bg: 'bg-rose-950/80', border: 'border-rose-500/40', grade: 'C-' };
  };

  const doraResult = getDoraTier();

  // --- TOOL 2: Interactive QA & Process Audit State ---
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>({
    'Software Architecture & Scalability Audit-0': true,
    'Software Architecture & Scalability Audit-1': true,
    'Quality Assurance & Test Automation Audit-0': true,
    'Security, Compliance & Audit Trail Matrix-0': true,
    'Engineering Process & Governance Audit-0': true,
  });
  const [auditReportCopied, setAuditReportCopied] = useState(false);

  const toggleAuditItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setCheckedAuditItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalAuditItems = AUDIT_CHECKLIST_TEMPLATES.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedAuditItems = Object.values(checkedAuditItems).filter(Boolean).length;
  const auditMaturityPercentage = Math.round((completedAuditItems / totalAuditItems) * 100);

  const copyAuditSummary = () => {
    let report = `INFO TECH MICROSYSTEMS - SOFTWARE PROJECT AUDIT REPORT\n`;
    report += `Generated at: ${new Date().toLocaleDateString()}\n`;
    report += `Overall Engineering Maturity Score: ${auditMaturityPercentage}%\n\n`;

    AUDIT_CHECKLIST_TEMPLATES.forEach(cat => {
      report += `[${cat.title}]\n`;
      cat.items.forEach((item, idx) => {
        const checked = checkedAuditItems[`${cat.title}-${idx}`] ? '✓ PASS' : '✗ ACTION REQUIRED';
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
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 mb-3 font-mono">
          <Gauge className="w-3.5 h-3.5" />
          <span>LATEST ENGINEERING TECHNOLOGY SUITE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] mb-4">
          Software KPIs, Audits & Engineering Tools
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          INFO TECH MICROSYSTEMS provides interactive tools to help engineering executives, 
          product owners, and developers measure delivery velocity, audit QA maturity, and model team capacity.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>DORA & KPI Health Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>QA Strategy & Audit Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('capacity')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'capacity'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Capacity & Staffing Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'kpis'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>KPI Glossary & Benchmarks</span>
        </button>
      </div>

      {/* --- TAB 1: DORA & KPI Health Calculator --- */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0a0e20] border border-cyan-500/20 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-['Outfit'] mb-1">
                Engineering Velocity & Quality Input Parameters
              </h2>
              <p className="text-xs text-slate-400">
                Adjust sliders to reflect your project's current deployment cadence, defect rates, and recovery metrics.
              </p>
            </div>

            {/* Deploy Frequency */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">Deployment Frequency:</span>
                <span className="text-cyan-400 font-bold">{deployFreq} deployments / month</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={deployFreq}
                onChange={(e) => setDeployFreq(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1/month (Low)</span>
                <span>4/month (Weekly)</span>
                <span>30+/month (Daily/Elite)</span>
              </div>
            </div>

            {/* Lead Time */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">Lead Time for Changes:</span>
                <span className="text-cyan-400 font-bold">{leadTimeHours} hours ({Math.round(leadTimeHours/24)} days)</span>
              </div>
              <input
                type="range"
                min="1"
                max="336"
                value={leadTimeHours}
                onChange={(e) => setLeadTimeHours(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>&lt; 24h (Elite)</span>
                <span>48h (Good)</span>
                <span>14 days (High friction)</span>
              </div>
            </div>

            {/* Change Failure Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">Change Failure Rate (CFR):</span>
                <span className={`${changeFailRate <= 5 ? 'text-emerald-400' : changeFailRate <= 15 ? 'text-amber-400' : 'text-rose-400'} font-bold`}>
                  {changeFailRate}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={changeFailRate}
                onChange={(e) => setChangeFailRate(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0-5% (Elite)</span>
                <span>15% (Moderate)</span>
                <span>30%+ (Critical)</span>
              </div>
            </div>

            {/* Mean Time to Restore (MTTR) */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">Mean Time to Restore (MTTR):</span>
                <span className="text-cyan-400 font-bold">{mttrHours} hours</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="48"
                step="0.5"
                value={mttrHours}
                onChange={(e) => setMttrHours(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>&lt; 1 hour (Elite)</span>
                <span>4-8 hours</span>
                <span>24-48 hours (Severe impact)</span>
              </div>
            </div>

            {/* Automated Test Coverage */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">Automated Test Coverage:</span>
                <span className="text-purple-400 font-bold">{testCoverage}% branch coverage</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={testCoverage}
                onChange={(e) => setTestCoverage(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>20% (High risk)</span>
                <span>75% (Target)</span>
                <span>90%+ (Optimal)</span>
              </div>
            </div>

            {/* Defect Escape Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-300 font-semibold">Defect Escape Rate (DER):</span>
                <span className={`${defectEscapeRate <= 2 ? 'text-emerald-400' : defectEscapeRate <= 5 ? 'text-amber-400' : 'text-rose-400'} font-bold`}>
                  {defectEscapeRate}% bugs in production
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={defectEscapeRate}
                onChange={(e) => setDefectEscapeRate(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Scorecard Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl ${doraResult.bg} border ${doraResult.border} shadow-2xl relative overflow-hidden`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-300">
                  DORA Performance Scorecard
                </span>
                <span className={`text-2xl font-black font-mono ${doraResult.color}`}>
                  Grade: {doraResult.grade}
                </span>
              </div>

              <div className="mb-6">
                <div className={`text-2xl sm:text-3xl font-black ${doraResult.color} font-['Outfit']`}>
                  {doraResult.tier}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Benchmarked against Google Cloud DORA State of DevOps industry standards.
                </p>
              </div>

              {/* Breakdown metrics summary */}
              <div className="space-y-2 text-xs font-mono border-t border-slate-700/60 pt-4 mb-6">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Release Cadence:</span>
                  <span className="text-white font-semibold">
                    {deployFreq >= 20 ? 'Continuous Delivery (Daily)' : deployFreq >= 4 ? 'Agile Bi-Weekly' : 'Slow Cadence'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Pipeline Velocity:</span>
                  <span className="text-white font-semibold">
                    {leadTimeHours <= 24 ? 'High Velocity (<24h)' : leadTimeHours <= 72 ? 'Moderate' : 'Stale Branch Friction'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Production Stability:</span>
                  <span className={changeFailRate <= 5 ? 'text-emerald-400' : 'text-amber-400'}>
                    {changeFailRate <= 5 ? 'Rock Solid (<5% fail)' : 'Needs Rollback Protection'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">QA Safety Net:</span>
                  <span className={testCoverage >= 75 ? 'text-emerald-400' : 'text-rose-400'}>
                    {testCoverage >= 75 ? 'Robust Automated Shield' : 'Under-tested / Vulnerable'}
                  </span>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2 mb-6">
                <span className="text-cyan-400 font-bold block font-mono">
                  ITM Strategic Recommendation:
                </span>
                {doraResult.grade.includes('A') ? (
                  <p className="text-slate-300 leading-relaxed">
                    Your pipeline shows high velocity. Focus on automated canary deployments, advanced APM distributed tracing, and reducing MTTR below 30 minutes via runbook automation.
                  </p>
                ) : (
                  <p className="text-slate-300 leading-relaxed">
                    Recommended immediate priority: Implement automated test gates in CI to suppress the Change Failure Rate, and streamline code reviews to shorten Lead Time for Changes below 24 hours.
                  </p>
                )}
              </div>

              <Link
                to="/services/kpis-and-audits"
                className="inline-flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all"
              >
                <span>Engage ITM for a Formal Engineering Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: Interactive QA Strategy & Audit Checklist Matrix --- */}
      {activeTab === 'audit' && (
        <div className="space-y-8">
          {/* Audit Header Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  Software Project Audit Checklist
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  {completedAuditItems} / {totalAuditItems} Completed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Check off verified capabilities across architecture, automated testing, security, and governance to calculate your project's readiness score.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-black text-cyan-400 font-mono">
                  {auditMaturityPercentage}%
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Maturity Score</div>
              </div>

              <button
                onClick={copyAuditSummary}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all cursor-pointer"
              >
                {auditReportCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{auditReportCopied ? 'Report Copied!' : 'Copy Audit Report'}</span>
              </button>
            </div>
          </div>

          {/* 4 Pillars Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUDIT_CHECKLIST_TEMPLATES.map((cat, cIdx) => (
              <div key={cIdx} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>{cat.title}</span>
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    {cat.items.filter((_, idx) => checkedAuditItems[`${cat.title}-${idx}`]).length}/{cat.items.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {cat.items.map((item, iIdx) => {
                    const key = `${cat.title}-${iIdx}`;
                    const isChecked = !!checkedAuditItems[key];
                    return (
                      <label 
                        key={iIdx}
                        onClick={() => toggleAuditItem(cat.title, iIdx)}
                        className={`flex items-start space-x-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-cyan-950/40 border-cyan-500/30 text-white' 
                            : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600 bg-slate-900'
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
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 text-center">
            <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">
              Need a Formal Third-Party Audit for Compliance or Due Diligence?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-4">
              INFO TECH MICROSYSTEMS delivers signed executive reports covering architecture viability, code quality indices, SOC2/ISO controls, and QA coverage.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Schedule Formal Audit with Sudarsha Wijenayake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* --- TAB 3: Team Capacity & Staffing Calculator --- */}
      {activeTab === 'capacity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-['Outfit'] mb-1">
                Engineering Squad Capacity Modeling
              </h2>
              <p className="text-xs text-slate-400">
                Model sprint velocity, team ratios, and delivery output across development, testing, and management.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Devs */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Software Developers: <span className="text-cyan-400 font-bold">{numDevs} engineers</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={numDevs}
                  onChange={(e) => setNumDevs(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Testers */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  QA / SDET Automation Engineers: <span className="text-purple-400 font-bold">{numTesters} testers</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={numTesters}
                  onChange={(e) => setNumTesters(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>

              {/* Managers */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Project Managers / Scrum Masters: <span className="text-white font-bold">{numManagers}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={numManagers}
                  onChange={(e) => setNumManagers(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              {/* Sprint Length */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Sprint Cadence: <span className="text-emerald-400 font-bold">{sprintWeeks} Weeks</span>
                </label>
                <select
                  value={sprintWeeks}
                  onChange={(e) => setSprintWeeks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                >
                  <option value={1}>1 Week (High frequency)</option>
                  <option value={2}>2 Weeks (Standard Scrum)</option>
                  <option value={3}>3 Weeks</option>
                  <option value={4}>4 Weeks (Monthly)</option>
                </select>
              </div>
            </div>

            {/* Velocity per dev slider */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Estimated Velocity per Developer per Sprint: <span className="text-cyan-400 font-bold">{pointsPerDevSprint} Story Points</span>
              </label>
              <input
                type="range"
                min="3"
                max="15"
                value={pointsPerDevSprint}
                onChange={(e) => setPointsPerDevSprint(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Outputs Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0a0f25] border border-cyan-500/30 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Projected Squad Throughput
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                  {sprintCapacityPoints}
                </span>
                <span className="text-xs text-slate-400 block mt-1">Story Points / Sprint</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
                  ~{monthlyCapacityPoints}
                </span>
                <span className="text-xs text-slate-400 block mt-1">Story Points / Month</span>
              </div>
            </div>

            {/* Staffing Health Check */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Dev-to-QA Ratio:</span>
                <span className="text-white font-semibold">{qaToDevRatio} : 1</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Ratio Assessment:</span>
                <span className={Number(qaToDevRatio) <= 3 ? 'text-emerald-400' : Number(qaToDevRatio) <= 5 ? 'text-amber-400' : 'text-rose-400'}>
                  {Number(qaToDevRatio) <= 3 ? 'Balanced QA Safety' : Number(qaToDevRatio) <= 5 ? 'Moderate QA Load' : 'High Bottleneck Risk'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Squad Headcount:</span>
                <span className="text-cyan-400 font-bold">{numDevs + numTesters + numManagers} Specialists</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Need to scale up or staff missing roles? INFO TECH MICROSYSTEMS recruits pre-vetted Developers, SDETs, and Managers.
            </p>

            <Link
              to="/services/technical-recruitment"
              className="inline-flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Explore Technical Recruitment Services</span>
            </Link>
          </div>
        </div>
      )}

      {/* --- TAB 4: Core KPI Reference Glossary --- */}
      {activeTab === 'kpis' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6">
            <h2 className="text-xl font-bold text-white font-['Outfit'] mb-1">
              Enterprise Software KPI Reference Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Standardized metrics, calculation formulas, target benchmarks, and business justifications used by INFO TECH MICROSYSTEMS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_KPIS.map((kpi) => (
              <div 
                key={kpi.id}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    {kpi.category}
                  </span>
                  <span className="text-xs font-mono text-purple-400 font-semibold">
                    Target: {kpi.targetBenchmark.split('|')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  {kpi.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {kpi.description}
                </p>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Formula:</span>
                  <span className="text-cyan-300">{kpi.calculationFormula}</span>
                </div>

                <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                  <strong className="text-slate-200">Business Impact:</strong> {kpi.businessImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
