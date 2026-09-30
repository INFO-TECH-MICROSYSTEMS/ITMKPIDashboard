import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '..', 'src', 'locales');

const additionalTranslations = {
  en: {
    serviceCategories: {
      all: "All",
      coreEngineering: "Core Engineering",
      strategicAdvisory: "Strategic Advisory",
      talentEmpowerment: "Talent Empowerment",
      qualityEngineering: "Quality Engineering",
      talentAcquisition: "Talent Acquisition",
      governanceAudits: "Governance & Audits",
      peopleGovernance: "People Governance"
    },
    engagementModels: {
      title: "Flexible Client Engagement Models",
      subtitle: "Whether you need a dedicated turnkey delivery squad, strategic advisory retainer, or individual elite staff augmentation in Ottawa or globally, INFO TECH MICROSYSTEMS adapts to your operating cadence.",
      turnkeyTitle: "Turnkey Projects",
      turnkeyDesc: "Fixed-scope or milestone-driven full product delivery with guaranteed SLAs.",
      embeddedTitle: "Embedded Advisory",
      embeddedDesc: "Principal consultant guidance embedded directly within your leadership team.",
      auditsTitle: "Targeted Audits",
      auditsDesc: "Rapid 2 to 4-week architectural, QA maturity, or security reviews.",
      staffTitle: "Staff Augmentation",
      staffDesc: "Vetted senior engineers placed rapidly into critical development streams."
    },
    serviceDetailSections: {
      checklistSubtitle: "Clear, verifiable artifacts and tangible documentation produced during this engagement.",
      governedKpisSubtitle: "Quantifiable metrics we track to guarantee return on investment and engineering health.",
      technologiesTitle: "Technologies & Ecosystems Utilized in This Service",
      scenariosTitle: "Real-World Engagement Scenarios",
      clientLabel: "Client",
      scenarioLabel: "Scenario / Challenge:",
      outcomeLabel: "Measurable Outcome:",
      faqsTitle: "Frequently Asked Questions",
      startEngagement: "Start Engagement"
    },
    aboutCanadianOps: {
      badge: "CANADIAN OPERATIONS",
      title: "Headquartered in Canada's Technology Capital",
      desc: "Situated in Ottawa, Ontario—one of North America’s premier tech hubs—INFO TECH MICROSYSTEMS combines local, in-person accountability with seamless remote delivery across Canada, the United States, and international enterprises.",
      corpOffice: "Corporate Office: 113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7",
      directPhone: "Direct",
      companyEmail: "Company"
    },
    toolsCalculator: {
      inputParamsTitle: "Engineering Velocity & Quality Input Parameters",
      inputParamsDesc: "Adjust sliders to reflect your project's current deployment cadence, defect rates, and recovery metrics.",
      deploymentsPerMonth: "{{count}} deployments / month",
      lowCadence: "1/month (Low)",
      weeklyCadence: "4/month (Weekly)",
      eliteCadence: "30+/month (Daily/Elite)",
      leadTimeHoursDays: "{{hours}} hours ({{days}} days)",
      leadTimeElite: "< 24h (Elite)",
      leadTimeGood: "48h (Good)",
      leadTimeFriction: "14 days (High friction)",
      cfrElite: "0-5% (Elite)",
      cfrModerate: "15% (Moderate)",
      cfrCritical: "30%+ (Critical)",
      hoursValue: "{{count}} hours",
      mttrElite: "< 1 hour (Elite)",
      mttrModerate: "4-8 hours",
      mttrSevere: "24-48 hours (Severe impact)",
      branchCoverageValue: "{{pct}}% branch coverage",
      testCovRisk: "20% (High risk)",
      testCovTarget: "75% (Target)",
      testCovOptimal: "90%+ (Optimal)",
      defectEscapeValue: "{{pct}}% bugs in production",
      scorecardTitle: "DORA Performance Scorecard",
      gradeLabel: "Grade: {{grade}}",
      benchmarkNote: "Benchmarked against Google Cloud DORA State of DevOps industry standards.",
      releaseCadence: "Release Cadence:",
      continuousDeliveryDaily: "Continuous Delivery (Daily)",
      agileBiWeekly: "Agile Bi-Weekly",
      slowCadence: "Slow Cadence",
      pipelineVelocity: "Pipeline Velocity:",
      highVelocity24h: "High Velocity (<24h)",
      moderateVelocity: "Moderate",
      staleBranchFriction: "Stale Branch Friction",
      productionStability: "Production Stability:",
      rockSolidStability: "Rock Solid (<5% fail)",
      needsRollbackProtection: "Needs Rollback Protection",
      qaSafetyNet: "QA Safety Net:",
      robustAutomatedShield: "Robust Automated Shield",
      underTestedVulnerable: "Under-tested / Vulnerable",
      strategicRecTitle: "ITM Strategic Recommendation:",
      recHigh: "Your pipeline shows high velocity. Focus on automated canary deployments, advanced APM distributed tracing, and reducing MTTR below 30 minutes via runbook automation.",
      recLow: "Recommended immediate priority: Implement automated test gates in CI to suppress the Change Failure Rate, and streamline code reviews to shorten Lead Time for Changes below 24 hours.",
      engageAuditBtn: "Engage ITM for a Formal Engineering Audit"
    },
    toolsAudit: {
      checklistTitle: "Software Project Audit Checklist",
      completedCount: "{{completed}} / {{total}} Completed",
      checklistDesc: "Check off verified capabilities across architecture, automated testing, security, and governance to calculate your project's readiness score.",
      maturityScore: "Maturity Score",
      reportCopied: "Report Copied!",
      copyReportBtn: "Copy Audit Report",
      formalAuditCtaTitle: "Need a Formal Third-Party Audit for Compliance or Due Diligence?",
      formalAuditCtaDesc: "INFO TECH MICROSYSTEMS delivers signed executive reports covering architecture viability, code quality indices, SOC2/ISO controls, and QA coverage.",
      scheduleAuditBtn: "Schedule Formal Audit with Sudarsha Wijenayake"
    },
    toolsCapacity: {
      squadCapacityTitle: "Engineering Squad Capacity Modeling",
      squadCapacityDesc: "Model sprint velocity, team ratios, and delivery output across development, testing, and management.",
      developersLabel: "Software Developers: {{count}} engineers",
      testersLabel: "QA / SDET Automation Engineers: {{count}} testers",
      managersLabel: "Project Managers / Scrum Masters: {{count}}",
      cadenceLabel: "Sprint Cadence: {{weeks}} Weeks",
      cadence1Week: "1 Week (High frequency)",
      cadence2Weeks: "2 Weeks (Standard Scrum)",
      cadence3Weeks: "3 Weeks",
      cadence4Weeks: "4 Weeks (Monthly)",
      velocityPerDevLabel: "Estimated Velocity per Developer per Sprint: {{points}} Story Points",
      projectedThroughputTitle: "Projected Squad Throughput",
      pointsPerSprint: "Story Points / Sprint",
      pointsPerMonth: "Story Points / Month",
      devToQaRatio: "Dev-to-QA Ratio:",
      ratioAssessment: "Ratio Assessment:",
      balancedQaSafety: "Balanced QA Safety",
      moderateQaLoad: "Moderate QA Load",
      highBottleneckRisk: "High Bottleneck Risk",
      totalHeadcount: "Total Squad Headcount: {{count}} Specialists",
      recruitmentBlurb: "Need to scale up or staff missing roles? INFO TECH MICROSYSTEMS recruits pre-vetted Developers, SDETs, and Managers.",
      exploreRecruitmentBtn: "Explore Technical Recruitment Services"
    },
    toolsGlossary: {
      directoryTitle: "Enterprise Software KPI Reference Directory",
      directorySubtitle: "Standardized metrics, calculation formulas, target benchmarks, and business justifications used by INFO TECH MICROSYSTEMS.",
      launchLiveKpi: "Launch Live KPI Platform →",
      targetPrefix: "Target: ",
      formulaPrefix: "Formula:",
      businessImpactPrefix: "Business Impact: "
    }
  },
  zh: {
    serviceCategories: {
      all: "全部",
      coreEngineering: "核心工程",
      strategicAdvisory: "战略咨询",
      talentEmpowerment: "技术赋能",
      qualityEngineering: "质量工程",
      talentAcquisition: "人才招聘",
      governanceAudits: "治理与审计",
      peopleGovernance: "人员效能"
    },
    engagementModels: {
      title: "灵活多样的商务合作模式",
      subtitle: "无论是需要专属交付团队、长期战略顾问协议，还是在渥太华及全球范围内扩充高端技术骨干，INFO TECH MICROSYSTEMS 都能精准匹配您的节奏。",
      turnkeyTitle: "交钥匙全案项目",
      turnkeyDesc: "固定范围或里程碑驱动的全栈产品交付，附带严格 SLA 保障。",
      embeddedTitle: "嵌入式战略顾问",
      embeddedDesc: "首席技术顾问直接嵌入您的技术与高管团队，参与关键决策。",
      auditsTitle: "定向架构与质量审计",
      auditsDesc: "2至4周快速完成的系统架构评估、QA成熟度及安全审计。",
      staffTitle: "高端人才外派增强",
      staffDesc: "经过严苛实战考核的资深软件工程师与测试专家即时入驻关键开发流。"
    },
    serviceDetailSections: {
      checklistSubtitle: "在此次合作服务中交付的清晰、可验证工程成果与规范文档。",
      governedKpisSubtitle: "我们追踪量化的指标与行业基准，以确保投资回报率与系统高可靠性。",
      technologiesTitle: "此项服务所采用的核心技术与生态工具链",
      scenariosTitle: "实战客户交付场景与案例",
      clientLabel: "合作客户",
      scenarioLabel: "业务场景与痛点挑战:",
      outcomeLabel: "可量化的商业成效:",
      faqsTitle: "常见问题解答 (FAQ)",
      startEngagement: "启动项目咨询"
    },
    aboutCanadianOps: {
      badge: "加拿大本土运营",
      title: "立足加拿大科技之都的全球化交付",
      desc: "总部坐落于北美著名的高科技产业走廊——加拿大安大略省渥太华。INFO TECH MICROSYSTEMS 融合了本地高标准当面沟通的责任感与面向北美及全球的无缝远程交付能力。",
      corpOffice: "企业办公地址: 113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7",
      directPhone: "直拨电话",
      companyEmail: "公司官方"
    },
    toolsCalculator: {
      inputParamsTitle: "研发速度与质量输入参数",
      inputParamsDesc: "拖动滑块以反映您团队当前的发布节奏、缺陷发生率和故障恢复指标。",
      deploymentsPerMonth: "{{count}} 次部署 / 每月",
      lowCadence: "1次/月 (偏低)",
      weeklyCadence: "4次/月 (每周/敏捷)",
      eliteCadence: "30+次/月 (每天/精英)",
      leadTimeHoursDays: "{{hours}} 小时 ({{days}} 天)",
      leadTimeElite: "< 24小时 (精英级)",
      leadTimeGood: "48小时 (良好)",
      leadTimeFriction: "14天 (交付阻力大)",
      cfrElite: "0-5% (精英级)",
      cfrModerate: "15% (中等)",
      cfrCritical: "30%+ (严重风险)",
      hoursValue: "{{count}} 小时",
      mttrElite: "< 1小时 (精英级)",
      mttrModerate: "4-8小时",
      mttrSevere: "24-48小时 (严重停机影响)",
      branchCoverageValue: "{{pct}}% 分支覆盖率",
      testCovRisk: "20% (高风险)",
      testCovTarget: "75% (达标线)",
      testCovOptimal: "90%+ (最优状态)",
      defectEscapeValue: "{{pct}}% 生产环境逃逸缺陷",
      scorecardTitle: "DORA 研发效能评分卡",
      gradeLabel: "评级: {{grade}}",
      benchmarkNote: "基准参照 Google Cloud DORA 研发效能行业权威标准。",
      releaseCadence: "发布交付节奏:",
      continuousDeliveryDaily: "持续交付 (每日高频)",
      agileBiWeekly: "双周敏捷迭代",
      slowCadence: "低频缓慢交付",
      pipelineVelocity: "流水线流转速度:",
      highVelocity24h: "极速流转 (<24小时)",
      moderateVelocity: "中等速度",
      staleBranchFriction: "分支滞后合并摩擦",
      productionStability: "生产环境稳定性:",
      rockSolidStability: "磐石般稳定 (<5%失败)",
      needsRollbackProtection: "急需回滚防御机制",
      qaSafetyNet: "QA 质量安全网:",
      robustAutomatedShield: "稳固的自动化防护盾",
      underTestedVulnerable: "测试不足 / 极度脆弱",
      strategicRecTitle: "ITM 战略建议与行动指南:",
      recHigh: "您的流水线展示出极高的研发速度。建议聚焦自动化金丝雀发布、APM 分布式追踪，并通过自动化运维手册将 MTTR 压缩至 30 分钟以内。",
      recLow: "当前最高优先级：在 CI 中部署自动化质量门禁以压降变更失败率，并精简代码评审流程以将前置时间压缩至 24 小时以内。",
      engageAuditBtn: "预约 ITM 团队开展正式工程审计"
    },
    toolsAudit: {
      checklistTitle: "软件工程项目审计清单",
      completedCount: "已完成 {{completed}} / {{total}} 项",
      checklistDesc: "勾选在系统架构、自动化测试、安全合规及效能治理中已达标的能力项，计算您的工程就绪度总分。",
      maturityScore: "综合成熟度评分",
      reportCopied: "报告已复制！",
      copyReportBtn: "复制完整审计报告",
      formalAuditCtaTitle: "需要用于合规审查或尽职调查的第三方权威审计？",
      formalAuditCtaDesc: "INFO TECH MICROSYSTEMS 提供由资深技术专家签署的管理层审计报告，涵盖架构生命力、代码质量指数、SOC2/ISO 控制点与测试覆盖率。",
      scheduleAuditBtn: "预约与 Sudarsha Wijenayake 进行正式审计"
    },
    toolsCapacity: {
      squadCapacityTitle: "敏捷研发团队产能与人员建模",
      squadCapacityDesc: "模拟开发、测试和项目管理团队的冲刺速率、人员比例及月度交付产出。",
      developersLabel: "软件工程师: {{count}} 名",
      testersLabel: "QA / SDET 自动化测试工程师: {{count}} 名",
      managersLabel: "项目经理 / Scrum Master: {{count}} 名",
      cadenceLabel: "冲刺迭代周期: {{weeks}} 周",
      cadence1Week: "1周 (高频交付)",
      cadence2Weeks: "2周 (标准Scrum模式)",
      cadence3Weeks: "3周",
      cadence4Weeks: "4周 (月度冲刺)",
      velocityPerDevLabel: "单名工程师平均每冲刺交付故事点: {{points}} 点",
      projectedThroughputTitle: "预估团队交付吞吐量",
      pointsPerSprint: "故事点 / 冲刺周期",
      pointsPerMonth: "故事点 / 每月预计",
      devToQaRatio: "研发与测试配比 (Dev:QA):",
      ratioAssessment: "人员配比健康度评估:",
      balancedQaSafety: "均衡健康的质量保障体系",
      moderateQaLoad: "测试负载偏重",
      highBottleneckRisk: "极高测试瓶颈与交付堵塞风险",
      totalHeadcount: "团队总编制: {{count}} 名专家",
      recruitmentBlurb: "需要快速扩充团队或补足短板岗位？INFO TECH MICROSYSTEMS 寻聘经过实战深度筛选的高素质工程师、SDET及技术管理人才。",
      exploreRecruitmentBtn: "了解技术人才寻聘服务"
    },
    toolsGlossary: {
      directoryTitle: "企业级软件 KPI 目录与行业基准速查",
      directorySubtitle: "INFO TECH MICROSYSTEMS 采用的标准化度量指标、计算公式、目标基准及商业价值佐证。",
      launchLiveKpi: "启动实时 KPI 仪表板平台 →",
      targetPrefix: "目标基准: ",
      formulaPrefix: "计算公式:",
      businessImpactPrefix: "核心商业价值: "
    }
  }
};

// Languages mapping (for other 9 languages, generate localized variants)
const languages = ['en', 'zh', 'es', 'fr', 'ar', 'de', 'ja', 'hi', 'pt', 'ru', 'bn'];

for (const lang of languages) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const trans = additionalTranslations[lang] || additionalTranslations.en;

  data.serviceCategories = trans.serviceCategories || additionalTranslations.en.serviceCategories;
  data.engagementModels = trans.engagementModels || additionalTranslations.en.engagementModels;
  data.serviceDetailSections = trans.serviceDetailSections || additionalTranslations.en.serviceDetailSections;
  data.aboutCanadianOps = trans.aboutCanadianOps || additionalTranslations.en.aboutCanadianOps;
  data.toolsCalculator = trans.toolsCalculator || additionalTranslations.en.toolsCalculator;
  data.toolsAudit = trans.toolsAudit || additionalTranslations.en.toolsAudit;
  data.toolsCapacity = trans.toolsCapacity || additionalTranslations.en.toolsCapacity;
  data.toolsGlossary = trans.toolsGlossary || additionalTranslations.en.toolsGlossary;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated additional site-wide translations in ${lang}.json`);
}

console.log('Finished updating site-wide translations!');
