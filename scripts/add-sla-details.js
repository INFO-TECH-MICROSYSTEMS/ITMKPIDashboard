import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '..', 'src', 'locales');

const slaDetailsTranslations = {
  en: {
    slaItems: {
      defectTriageName: 'Defect Triage SLA (P1 < 4h, P2 < 24h)',
      defectTriageDesc: 'Rapid initial triage and assessment for blocking and critical defects.',
      regressionExecName: 'Regression Execution SLA',
      regressionExecDesc: 'Execution of complete regression cycle within scheduled sprint window.',
      testCreationName: 'Test Case Creation SLA',
      testCreationDesc: 'Test plans authored and reviewed prior to development handoff.',
      dailyReportName: 'Daily QA Status Report SLA',
      dailyReportDesc: 'Automated executive and squad reporting published every day at 17:00.',
      autoDeliveryName: 'Automation Delivery SLA',
      autoDeliveryDesc: 'In-sprint test automation completed within the same sprint as feature code.',
      customerResolutionName: 'Customer Defect Resolution SLA',
      customerResolutionDesc: 'Hotfix turnaround for high-impact customer APARs'
    },
    a11yAudit: {
      title: 'Accessibility (WCAG 2.2 AA) Audit',
      colorContrast: 'Color Contrast Ratios (AA & AAA)',
      colorContrastPass: '100% Pass (7:1 High Contrast)',
      keyboardNav: 'Keyboard Navigation & Focus Traps',
      zeroTraps: '0 Traps Detected',
      screenReader: 'Screen Reader ARIA Compatibility',
      suitePassRate: 'Suite Pass Rate',
      auditStatus: 'Audit Status',
      certifiedPublicSector: 'Certified for Public Sector',
      conditionalPass: 'Conditional Pass'
    },
    perfAudit: {
      title: 'SaaS Performance & Reliability Benchmarks',
      p95Response: 'P95 Response Time Benchmark',
      p99Spike: 'P99 Spike Latency Benchmark',
      httpErrorRate: 'HTTP 5xx Server Error Rate',
      infraStress: 'Infrastructure Stress Level',
      elevatedLoadWarning: 'Elevated Load Warning',
      underCpuCapacity: 'Under 40% CPU Capacity',
      msTarget: 'ms target'
    },
    modal: {
      decisionAudit: 'KPI Decision Audit & Justification',
      currentTelemetry: 'Current Telemetry',
      governanceTarget: 'Governance Target',
      statusVerdict: 'Status Verdict',
      whyAssigned: 'Why Is This Status / Grade Assigned?',
      governingFormula: 'Governing Rule & Metric Formula',
      factorsPenalties: 'Evaluation Factors & Score Penalties',
      offendingEntities: 'Offending Entities (Evidence From Database)',
      identified: 'Identified',
      pathGreen: 'Recommended Remediation (Path to Green)',
      acknowledgeClose: 'Acknowledge & Close'
    },
    connector: {
      title: 'Data Mining Connectors & Sync Engine',
      subtitle: 'Configure credentials, API tokens, endpoints, and automated retrieval schedules.',
      miningTargets: 'Mining Targets',
      dataSourceType: 'Data Source Type',
      activeSync: 'Active & Syncing',
      pausedDisabled: 'Paused / Disabled',
      apiEndpoint: 'API Endpoint / Base URL',
      authMethod: 'Authentication Method',
      secretToken: 'Secret Token / API Key',
      projectScope: 'Project / Scope Filter',
      retrievalSchedule: 'Retrieval & Mining Schedule',
      wipeReplacePolicy: 'Atomic Wipe & Replace Ingestion Policy',
      wipeReplaceDesc: 'Each scheduled execution clears existing staging records and re-indexes raw telemetry from scratch.',
      saveConfig: 'Save Configuration',
      configSaved: 'Configuration Saved!',
      triggerNow: 'Trigger Retrieval Now'
    }
  },
  zh: {
    slaItems: {
      defectTriageName: '缺陷定级时效 SLA (P1 < 4小时, P2 < 24小时)',
      defectTriageDesc: '针对严重阻塞缺陷的快速初评与响应分流机制。',
      regressionExecName: '回归测试执行时效 SLA',
      regressionExecDesc: '在预定迭代窗口期内完成全套回归测试闭环执行。',
      testCreationName: '测试用例设计覆盖 SLA',
      testCreationDesc: '在研发代码交付前完成测试用例设计与评审归档。',
      dailyReportName: '每日质量通报发布 SLA',
      dailyReportDesc: '每天 17:00 自动推送管理层与交付团队质量日报。',
      autoDeliveryName: '自动化脚本同步交付 SLA',
      autoDeliveryDesc: '当期功能特性的自动化脚本必须在同个迭代内合并交付。',
      customerResolutionName: '客户逃逸缺陷解决 SLA',
      customerResolutionDesc: '高影响客户现场 APAR 缺陷的紧急热修复交付时效'
    },
    a11yAudit: {
      title: '无障碍合规审计 (WCAG 2.2 AA)',
      colorContrast: '色彩对比度 (AA & AAA)',
      colorContrastPass: '100% 达标 (7:1 高对比度)',
      keyboardNav: '纯键盘导航与焦点陷阱检测',
      zeroTraps: '未发现键盘焦点陷阱 (0 阻碍)',
      screenReader: '屏幕朗读器 ARIA 标签适配',
      suitePassRate: '套件测试通过率',
      auditStatus: '合规认证状态',
      certifiedPublicSector: '符合政府采购与公共服务准入标准',
      conditionalPass: '有条件通过'
    },
    perfAudit: {
      title: 'SaaS 性能与系统高可用基准',
      p95Response: 'P95 接口响应耗时基准',
      p99Spike: 'P99 峰值激增响应耗时基准',
      httpErrorRate: 'HTTP 5xx 服务端异常错误率',
      infraStress: '底层基础设施承载负荷',
      elevatedLoadWarning: '负荷偏高警告',
      underCpuCapacity: 'CPU 负载低于 40% (健康)',
      msTarget: '毫秒目标'
    },
    modal: {
      decisionAudit: 'KPI 决策审核与归因明细',
      currentTelemetry: '当前遥测数据',
      governanceTarget: '治理目标值',
      statusVerdict: '当前健康评估结论',
      whyAssigned: '为何触发该评分与评级？',
      governingFormula: '治理规则与计算公式',
      factorsPenalties: '评估因子与扣分权重',
      offendingEntities: '违规工作项明细 (数据库实证记录)',
      identified: '项已识别',
      pathGreen: '建议整改方案 (转绿闭环路径)',
      acknowledgeClose: '确认并关闭'
    },
    connector: {
      title: '数据挖掘连接器与同步引擎',
      subtitle: '配置凭据、API 令牌、数据源端点与自动定时获取计划。',
      miningTargets: '挖掘数据源',
      dataSourceType: '数据源类型',
      activeSync: '活跃运行并同步',
      pausedDisabled: '已暂停 / 禁用',
      apiEndpoint: 'API 接口基地址',
      authMethod: '身份认证方式',
      secretToken: '密钥令牌 / API Key',
      projectScope: '项目 / 范围过滤',
      retrievalSchedule: '数据抓取与挖掘调度',
      wipeReplacePolicy: '原子级清空并重写摄取策略 (Atomic Wipe & Replace)',
      wipeReplaceDesc: '每次按计划执行同步时，将彻底清空历史缓存，重新从数据源拉取最新全量遥测数据并重新建立索引。',
      saveConfig: '保存配置',
      configSaved: '配置已成功保存！',
      triggerNow: '立即触发同步'
    }
  }
};

const languages = ['en', 'zh', 'es', 'fr', 'ar', 'de', 'ja', 'hi', 'pt', 'ru', 'bn'];

for (const lang of languages) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const source = slaDetailsTranslations[lang] || slaDetailsTranslations.en;

  content.kpiPlatform = {
    ...content.kpiPlatform,
    slaItems: source.slaItems || slaDetailsTranslations.en.slaItems,
    a11yAudit: source.a11yAudit || slaDetailsTranslations.en.a11yAudit,
    perfAudit: source.perfAudit || slaDetailsTranslations.en.perfAudit,
    modal: source.modal || slaDetailsTranslations.en.modal,
    connector: source.connector || slaDetailsTranslations.en.connector
  };

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  console.log(`Updated detailed SLA & audit translations in ${lang}.json`);
}

console.log('Finished updating all SLA & audit translations!');
