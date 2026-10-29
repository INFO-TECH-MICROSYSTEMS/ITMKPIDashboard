/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Check, RefreshCw, Key, Globe, Shield, Clock, 
  Database, AlertCircle
} from 'lucide-react';
import type { DataSourceConfig, DataSourceType, RetrievalFrequency } from '../../types/kpiPlatform';
import { RETRIEVAL_FREQUENCY_OPTIONS } from '../../constants/kpiConstants';
import { BaseModal } from '../common/modal/BaseModal';

interface ConnectorConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  configs: DataSourceConfig[];
  onSaveConfig: (config: DataSourceConfig) => Promise<void>;
  onTriggerSync: (source?: DataSourceType) => Promise<void>;
  onResetSampleData: () => Promise<void>;
  isSyncing: boolean;
}

/**
 * ConnectorConfigModal: Concrete modal subclassing BaseModal.
 * Configures enterprise ingestion policies, credentials, endpoints, and scheduled pipelines.
 */
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

  const modalFooter = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onResetSampleData()}
          disabled={isSyncing}
          className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-mono hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50"
        >
          {t('kpiPlatform.connectorModal.resetDemoData', 'Reset to Factory Mock Data')}
        </button>
      </div>

      <div className="flex items-center gap-3">
        {saveSuccess && (
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Saved!
          </span>
        )}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {t('kpiPlatform.connectorModal.close', 'Close')}
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
        >
          {t('kpiPlatform.connectorModal.save', 'Save Configuration')}
        </button>
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      icon={
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Database className="w-5 h-5" />
        </div>
      }
      title={t('kpiPlatform.connectorModal.title', 'Data Connectors & Telemetry Ingestion')}
      subtitle={t('kpiPlatform.connectorModal.subtitle', 'Enterprise REST API authentication, sync schedules, and automated atomic ingestion')}
      footer={modalFooter}
      bodyClassName="p-5 space-y-4"
    >
      {/* Source Selector Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-1">
        {configs.map(cfg => (
          <button
            key={cfg.id}
            onClick={() => setSelectedSource(cfg.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              selectedSource === cfg.id
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{cfg.name}</span>
            <span className={`w-2 h-2 rounded-full ${cfg.enabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          </button>
        ))}
      </div>

      {currentConfig && (
        <div className="space-y-4 pt-1">
          {/* Active Status & Immediate Sync Trigger */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Enable Connector Sync</span>
              <p className="text-[11px] text-slate-500 mt-0.5">Toggle active background data retrieval for this data source</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={currentConfig.enabled}
                onChange={(e) => handleFieldChange('enabled', e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded cursor-pointer"
              />
              <button
                type="button"
                onClick={() => onTriggerSync(selectedSource)}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-500" />
                <span>API Endpoint URL</span>
              </label>
              <input
                type="text"
                value={currentConfig.endpointUrl}
                onChange={(e) => handleFieldChange('endpointUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-500" />
                <span>API Token / Bearer Key</span>
              </label>
              <input
                type="password"
                value={currentConfig.apiTokenOrKey || ''}
                onChange={(e) => handleFieldChange('apiTokenOrKey', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-500" />
                <span>Project / Scope Filter</span>
              </label>
              <input
                type="text"
                value={currentConfig.projectOrOrgKey || ''}
                onChange={(e) => handleFieldChange('projectOrOrgKey', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                <span>Retrieval Frequency</span>
              </label>
              <select
                value={currentConfig.frequency}
                onChange={(e) => handleFieldChange('frequency', e.target.value as RetrievalFrequency)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {RETRIEVAL_FREQUENCY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ingestion Safety Notice */}
          <div className="p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-cyan-600 dark:text-cyan-400" />
            <div className="space-y-0.5">
              <div className="font-bold">Atomic Wipe-and-Replace Ingestion Policy Active</div>
              <p className="text-[11px] leading-relaxed opacity-90">
                To guarantee zero stale duplicate records, newly fetched live payloads replace the existing dataset within an atomic SQLite transaction.
              </p>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
