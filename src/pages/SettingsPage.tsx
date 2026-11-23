/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { 
  Database, 
  Cloud, 
  HardDrive, 
  RefreshCw, 
  Radio, 
  Key, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Server,
  Shuffle,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { useKPIDataContext } from '../context/KPIDataContext';

export const SettingsPage: React.FC = () => {
  const { 
    storageStatus, 
    recordCounts, 
    connectorConfigs, 
    syncLogs, 
    isSyncing, 
    resetToSampleData, 
    triggerSyncNow, 
    reload 
  } = useKPIDataContext();

  const [seedInput, setSeedInput] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'storage' | 'connectors' | 'audit'>('storage');

  const handleRegenerate = async (useRandomSeed: boolean) => {
    try {
      setSuccessMessage(null);
      const chosenSeed = useRandomSeed ? undefined : (seedInput.trim() || undefined);
      const res = await resetToSampleData(chosenSeed);
      setIsConfirmModalOpen(false);
      setSuccessMessage(
        `Successfully purged database and generated ${res?.recordsCount.toLocaleString() || '10,000+'} realistic records! Seed used: "${res?.seed}". Timestamp: ${new Date(res?.timestamp || Date.now()).toLocaleTimeString()}`
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const isSupabase = storageStatus?.activeProvider === 'supabase';

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-8 space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Page Header */}
      <div className="space-y-1">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300">
          Platform Administration & Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-['Outfit']">
          Settings & Data Infrastructure
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Monitor active cloud database connectivity, inspect storage telemetry, configure ingestion connectors, and trigger on-demand dynamic dataset regeneration.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-cyan-500/20 gap-4">
        <button
          onClick={() => setActiveTab('storage')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'storage'
              ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Database className="w-4 h-4" />
          Database & Sample Data Engine
        </button>
        <button
          onClick={() => setActiveTab('connectors')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'connectors'
              ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Radio className="w-4 h-4" />
          Connectors & Sync Schedule
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'audit'
              ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          Sync Audit Trail
        </button>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3 shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{successMessage}</p>
            <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80">
              All views, trend snapshots, executive scorecards, and filter dropdowns have been refreshed with zero-latency reactive state.
            </p>
          </div>
        </div>
      )}

      {/* TAB 1: Database & Sample Data Engine */}
      {activeTab === 'storage' && (
        <div className="space-y-8">
          
          {/* Active Database Status Banner */}
          <div className={`p-6 rounded-2xl border transition-all shadow-sm ${
            isSupabase 
              ? 'border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/5 to-purple-500/10 dark:border-cyan-500/30 dark:bg-[#0c1222]' 
              : 'border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-slate-900/5 to-cyan-500/10 dark:border-indigo-500/30 dark:bg-[#0c1222]'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`p-3.5 rounded-2xl ${
                  isSupabase 
                    ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/30' 
                    : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/30'
                }`}>
                  {isSupabase ? <Cloud className="w-8 h-8" /> : <HardDrive className="w-8 h-8" />}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Active Storage Engine
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isSupabase 
                        ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300' 
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {isSupabase ? 'Cloud Managed PostgreSQL' : 'Local IndexedDB (Dexie)'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {storageStatus?.displayName || 'Loading Storage Status...'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                    {storageStatus?.details}
                  </p>
                  {storageStatus?.url && (
                    <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                      Cloud Endpoint: <span className="underline">{storageStatus.url}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => reload()}
                  disabled={isSyncing}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 bg-white dark:bg-slate-900 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  Refresh Connection
                </button>
              </div>
            </div>

            {/* Current Record Metrics Bar */}
            <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                  JIRA Work Items
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {recordCounts.jira.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                  TestRail Executions
                </span>
                <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                  {recordCounts.testRail.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                  GitHub Pull Requests
                </span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">
                  {recordCounts.githubPRs.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                  GitHub Commits
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {recordCounts.githubCommits.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Sample Data Regeneration Engine Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Enterprise Sample Data Generator
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl">
                  Re-generates fresh randomized data across all 5 products (YouTube, GMail, LinkedIn, Shopify, Amazon), all product components, and 4 release cycles (3 completed past + 1 ongoing in-flight). All timestamps are dynamically anchored to <strong>today's date ({new Date().toLocaleDateString()})</strong>.
                </p>
              </div>
            </div>

            {/* Specifications Recap */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  Dynamic 4-Week Cycles
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ongoing release started 16 days ago, ends in 12 days. Completed releases ended strictly in the past with no projection lines.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Pre-Release Quality Gates
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Completed past releases pass quality assessment with 0 untested tests and resolved blockers. Ongoing release actively in-flight.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                  <Shuffle className="w-4 h-4 text-purple-500" />
                  Progressive Automation
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Manual tests start higher at release kickoff and are progressively automated over the cycle to ~85% by release end.
                </p>
              </div>
            </div>

            {/* Seed Configuration & Execution Controls */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <label htmlFor="seedInput" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-cyan-500" />
                    Optional Reproducible Seed
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Leave blank for true random generation, or specify any alphanumeric seed (e.g. <code>demo-qa-2026</code>) to generate an identical repeatable dataset.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="seedInput"
                    type="text"
                    value={seedInput}
                    onChange={(e) => setSeedInput(e.target.value)}
                    placeholder="e.g. sprint-release-seed"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono w-48"
                  />
                  <button
                    type="button"
                    onClick={() => setSeedInput(`seed-${Math.floor(Math.random() * 900000 + 100000)}`)}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Generate Random Seed"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  disabled={isSyncing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md hover:shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Regenerating Dataset...' : 'Regenerate Fresh Sample Data (Purge & Replace)'}
                </button>

                <button
                  type="button"
                  onClick={() => handleRegenerate(true)}
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center gap-2 bg-white dark:bg-slate-900 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Quick Random Re-Seed
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Connectors & Sync Schedule */}
      {activeTab === 'connectors' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Connectors define external tool integrations (JIRA, TestRail, GitHub, SonarQube). When deployed on Vercel with Supabase, scheduled serverless cron jobs can poll these external APIs and atomically synchronize data directly into the database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectorConfigs.map((connector) => (
              <div 
                key={connector.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {connector.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                        Connector ID: {connector.id}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="text-xs space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Sync Cadence:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{connector.frequency}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Last Ingestion:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {connector.lastSyncTimestamp ? new Date(connector.lastSyncTimestamp).toLocaleTimeString() : 'Never'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerSyncNow(connector.id)}
                  disabled={isSyncing}
                  className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  Simulate Connector Ingestion
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Sync Audit Trail */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-500" />
            Ingestion & Synchronization Audit Log
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Immutable audit record of all wipe-and-replace synchronizations, dataset generations, and connector polls.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Sync ID</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Records Ingested</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-slate-700 dark:text-slate-300">
                {syncLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      No audit records logged yet.
                    </td>
                  </tr>
                ) : (
                  syncLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-cyan-600 dark:text-cyan-400">{log.id}</td>
                      <td className="py-2 px-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-2 px-3 uppercase text-slate-800 dark:text-slate-200 font-bold">{log.source}</td>
                      <td className="py-2 px-3">{log.recordsReplaced.toLocaleString()}</td>
                      <td className="py-2 px-3">{log.durationMs}ms</td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Purge & Regenerate Sample Data?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This action will permanently purge all existing sample records in the active database and generate 10,000+ brand new work items and test executions anchored dynamically to today ({new Date().toLocaleDateString()}).
            </p>
            {seedInput && (
              <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
                Target Seed: "{seedInput}"
              </p>
            )}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRegenerate(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Confirm & Regenerate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsPage;
