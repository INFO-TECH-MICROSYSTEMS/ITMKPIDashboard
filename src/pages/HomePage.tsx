/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, ShieldCheck, Activity, AlertTriangle, Cpu, 
  TrendingUp, Gauge, Compass, ArrowRight, Database, 
  Layers, Lock, Sparkles, FileText
} from 'lucide-react';
import { KPI_CATEGORIES } from '../constants/kpiConstants';
import { useKPIDataContext } from '../context/KPIDataContext';

const categoryIcons: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
  Activity: <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
  Cpu: <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
  Gauge: <Gauge className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
  Compass: <Compass className="w-6 h-6 text-blue-600 dark:text-blue-400" />
};

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { metrics, jiraItems, testRailExecutions } = useKPIDataContext();

  const totalGatingDefects = metrics.executiveScorecard.gatingDefectCount;
  const overallQualityScore = metrics.executiveScorecard.overallScore;
  const releaseReadyGrade = metrics.executiveScorecard.releaseReadyGrade;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-10 space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-cyan-500/20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0a0d1d] dark:via-[#070913] dark:to-[#0a0d1d] p-8 sm:p-12 shadow-xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Enterprise Quality Engineering Platform
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry & Diagnostics
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-tight">
            INFO TECH MICROSYSTEMS <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quality & Defect Intelligence Platform
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A comprehensive, multi-dimensional quality intelligence application engineered for modern software organizations. 
            Automates release gating, tracks test execution velocity, isolates flaky automation suites, monitors SLA adherence, and surfaces predictive risk telemetry across enterprise software suites.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/kpi"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Launch Unified KPI Platform</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/executive"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>View Executive Scorecard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Live System Telemetry Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-cyan-500/20 shadow-sm">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Release Grade</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono mt-1">
            Grade {releaseReadyGrade}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Composite Quality Index</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-cyan-500/20 shadow-sm">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Overall Quality</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {overallQualityScore}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Target: ≥ 85% Compliant</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-cyan-500/20 shadow-sm">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Active Work Items</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-1">
            {jiraItems.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{totalGatingDefects} Blockers / Gating</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-cyan-500/20 shadow-sm">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Automated Executions</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-1">
            {testRailExecutions.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Telemetry Ingestion Active</div>
        </div>
      </div>

      {/* Core Capabilities Section */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
            What This Platform Delivers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
            Engineered to replace fragmented quality reporting with an automated, defensible single source of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 w-fit border border-cyan-200 dark:border-cyan-500/30">
              <Database className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-['Outfit']">
              Multi-Connector Telemetry Mining
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Integrates directly with Jira Enterprise, TestRail Test Case Management, GitHub PR Code Quality Gates, and CI/CD Cloud Runners with local IndexedDB persistent caching.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 w-fit border border-purple-200 dark:border-purple-500/30">
              <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-['Outfit']">
              Predictive Burnout & Forecasting
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculates daily test execution velocity, projects runway to sprint freeze, models automation ROI against manual hours, and flags over-committed engineering squad members.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 w-fit border border-emerald-200 dark:border-emerald-500/30">
              <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 font-['Outfit']">
              Automated Release Governance & Export
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enforces P1/P2 defect stop-ships, evaluates accessibility (WCAG 2.2 AA) and P95 latency SLAs, and exports branded visual PDF audit decks and PowerPoint presentations with one click.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Category Directory (7 Specialized Web Pages) */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              Specialized Views
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
              Explore KPI Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            Each category is hosted on its own dedicated web page with deep-linkable URL routing and live data filtering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KPI_CATEGORIES.map(category => {
            const localizedName = t(`kpiPlatform.categories.${category.id}`, category.name);
            const localizedBadge = t(`kpiPlatform.categories.${category.id}Badge`, category.badge);

            return (
              <Link
                key={category.id}
                to={category.path}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-200 cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 group-hover:scale-110 transition-transform">
                      {categoryIcons[category.iconName]}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {localizedBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white font-['Outfit'] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {localizedName}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Open {localizedName}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Export & Reporting Suite Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
            Executive Artifacts
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-['Outfit']">
            Ready to share quality metrics with stakeholders?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Export presentation-ready PDF audit documents and editable PowerPoint (PPTX) decks containing status-colored metric cards for board meetings and sprint reviews.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/kpi"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Open Export Modal in Unified View</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
export default HomePage;
