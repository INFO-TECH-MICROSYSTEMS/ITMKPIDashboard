/**
 * Data Source Connector Configuration & Scheduling Modal
 * Allows entering account credentials, API keys, endpoints, and retrieval frequencies
 * for JIRA, TestRail, and GitHub.
 * Explicitly manages the "Atomic Wipe & Replace" ingestion policy.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, Check, RefreshCw, Key, Globe, Shield, Clock, 
  Database, AlertCircle, Sparkles, Layers 
} from 'lucide-react';
import type { DataSourceConfig, DataSourceType } from '../../types/kpiPlatform';
import { RETRIEVAL_FREQUENCY_OPTIONS } from '../../constants/kpiConstants';

interface ConnectorConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  configs: DataSourceConfig[];
  onSaveConfig: (config: DataSourceConfig) => Promise<void>;
  onTriggerSync: (source?: DataSourceType) => Promise<void>;
  onResetSampleData: () => Promise<void>;
  isSyncing: boolean;
}

export const ConnectorConfigModal: React.FC<ConnectorConfigModalProps> = ({
  isOpen,
  onClose,
  configs,
  onSaveConfig,
  onTriggerSync,
  onResetSampleData,
  isSyncing
}) => {
  const { t } = useTranslation();
  const [selectedSource, setSelectedSource] = useState<DataSourceType>('jira');
  const [formState, setFormState] = useState<Record<string, DataSourceConfig>>(() => {
    const initial: Record<string, DataSourceConfig> = {};
    configs.forEach(c => {
      initial[c.id] = { ...c };
    });
    return initial;
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const currentConfig = formState[selectedSource] || configs.find(c => c.id === selectedSource);

  const handleFieldChange = (field: keyof DataSourceConfig, value: any) => {
    if (!currentConfig) return;
    const updated = { ...currentConfig, [field]: value };
    setFormState(prev => ({
      ...prev,
      [selectedSource]: updated
    }));
  };

  const handleSave = async () => {
    if (!currentConfig) return;
    await onSaveConfig(currentConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0b0f1e] text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white">
                {t('kpiPlatform.connector.title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('kpiPlatform.connector.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Tabs on left, Form on right */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
          {/* Left App Tabs */}
          <div className="w-full md:w-64 p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20 space-y-2 shrink-0">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider block px-2 mb-1">
              {t('kpiPlatform.connector.miningTargets')}
            </span>

            {[
              { id: 'jira', name: 'Atlassian JIRA', desc: 'Epics, Stories, Bugs, Sprints' },
              { id: 'testrail', name: 'TestRail QA', desc: 'Test Suites, Runs, Executions' },
              { id: 'github', name: 'GitHub Actions', desc: 'Commits, PRs, CI Runtimes' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedSource(tab.id as DataSourceType)}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer ${
                  selectedSource === tab.id
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-semibold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-sm font-['Outfit']">{tab.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{tab.desc}</div>
              </button>
            ))}

            {/* Atomic Wipe & Replace Notice */}
            <div className="mt-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{t('kpiPlatform.connector.wipeReplacePolicy')}</span>
              </div>
              <p className="leading-relaxed opacity-90">
                {t('kpiPlatform.connector.wipeReplaceDesc')}
              </p>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="flex-1 p-6 space-y-5">
            {currentConfig && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-slate-900 dark:text-white font-['Outfit']">
                      {currentConfig.name} {t('kpiPlatform.connector.dataSourceType')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                      {t('kpiPlatform.connector.activeSync')}
                    </span>
                  </div>

                  <label className="flex items-center gap-2 text-xs cursor-pointer font-mono">
                    <input
                      type="checkbox"
                      checked={currentConfig.enabled}
                      onChange={(e) => handleFieldChange('enabled', e.target.checked)}
                      className="accent-cyan-600 rounded"
                    />
                    <span>{t('kpiPlatform.connector.activeSync')}</span>
                  </label>
                </div>

                {/* API Endpoint */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>{t('kpiPlatform.connector.apiEndpoint')}</span>
                  </label>
                  <input
                    type="url"
                    value={currentConfig.endpointUrl}
                    onChange={(e) => handleFieldChange('endpointUrl', e.target.value)}
                    placeholder="https://jira.company.com/rest/api/3"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Auth Credential / Token */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Key className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>{t('kpiPlatform.connector.secretToken')}</span>
                    </label>
                    <input
                      type="password"
                      value={currentConfig.apiTokenOrKey}
                      onChange={(e) => handleFieldChange('apiTokenOrKey', e.target.value)}
                      placeholder="••••••••••••••••••••••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>{t('kpiPlatform.connector.projectScope')}</span>
                    </label>
                    <input
                      type="text"
                      value={currentConfig.projectOrOrgKey}
                      onChange={(e) => handleFieldChange('projectOrOrgKey', e.target.value)}
                      placeholder="e.g. ITM_CORE, ITM_BILLING"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Retrieval Frequency */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>{t('kpiPlatform.connector.retrievalSchedule')}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {RETRIEVAL_FREQUENCY_OPTIONS.map(opt => (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          currentConfig.frequency === opt.value
                            ? 'bg-cyan-50/60 dark:bg-cyan-950/40 border-cyan-400 text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          checked={currentConfig.frequency === opt.value}
                          onChange={() => handleFieldChange('frequency', opt.value)}
                          className="mt-0.5 accent-cyan-600"
                        />
                        <div>
                          <div className="font-semibold">{opt.label}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{opt.intervalDesc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    {saveSuccess ? <Check className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    <span>{saveSuccess ? t('kpiPlatform.connector.configSaved') : t('kpiPlatform.connector.saveConfig')}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onTriggerSync(selectedSource)}
                      disabled={isSyncing}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? t('kpiPlatform.syncInProgress') : t('kpiPlatform.connector.triggerNow')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onResetSampleData}
                      disabled={isSyncing}
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold text-xs border border-purple-200 dark:border-purple-500/30 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('kpiPlatform.resetSample')}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
