import fs from 'fs';
import path from 'path';

// Load the english baseline created previously
const enData = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

const { servicesContent: enServices, auditChecklistData: enAudits, kpiGlossaryData: enKpis, kpiCategories: enKpiCats } = enData;

// KPI Categories translations
const kpiCatsTranslations = {
  zh: {
    "DORA": "DORA 指标",
    "QA & Testing": "QA 与自动化测试",
    "Code Quality": "代码质量与架构",
    "Process & Governance": "研发流程与治理",
    "Team & Talent": "团队与工程人才"
  },
  es: {
    "DORA": "Métricas DORA",
    "QA & Testing": "QA y Pruebas",
    "Code Quality": "Calidad del Código",
    "Process & Governance": "Procesos y Gobernanza",
    "Team & Talent": "Equipo y Talento"
  },
  fr: {
    "DORA": "Métriques DORA",
    "QA & Testing": "Assurance Qualité & Tests",
    "Code Quality": "Qualité du Code",
    "Process & Governance": "Processus & Gouvernance",
    "Team & Talent": "Équipe & Talents"
  },
  de: {
    "DORA": "DORA-Metriken",
    "QA & Testing": "Qualitätssicherung & Tests",
    "Code Quality": "Codequalität",
    "Process & Governance": "Prozesse & Governance",
    "Team & Talent": "Team & Talente"
  },
  ja: {
    "DORA": "DORA メトリクス",
    "QA & Testing": "品質保証 & テスト",
    "Code Quality": "コード品質",
    "Process & Governance": "プロセス & ガバナンス",
    "Team & Talent": "チーム & タレント"
  },
  ar: {
    "DORA": "مقاييس دورا (DORA)",
    "QA & Testing": "ضمان الجودة والاختبار",
    "Code Quality": "جودة الكود",
    "Process & Governance": "العمليات والحوكمة",
    "Team & Talent": "الفريق والمواهب"
  },
  hi: {
    "DORA": "DORA मेट्रिक्स",
    "QA & Testing": "गुणवत्ता आश्वासन और परीक्षण",
    "Code Quality": "कोड गुणवत्ता",
    "Process & Governance": "प्रक्रिया और शासन",
    "Team & Talent": "टीम और प्रतिभा"
  },
  pt: {
    "DORA": "Métricas DORA",
    "QA & Testing": "Garantia de Qualidade e Testes",
    "Code Quality": "Qualidade do Código",
    "Process & Governance": "Processos e Governança",
    "Team & Talent": "Equipe e Talentos"
  },
  ru: {
    "DORA": "Метрики DORA",
    "QA & Testing": "Контроль качества и тестирование",
    "Code Quality": "Качество кода",
    "Process & Governance": "Процессы и управление",
    "Team & Talent": "Команда и специалисты"
  },
  bn: {
    "DORA": "ডোরা (DORA) মেট্রিক্স",
    "QA & Testing": "গুণমান নিশ্চিতকরণ ও পরীক্ষা",
    "Code Quality": "কোডের গুণমান",
    "Process & Governance": "প্রক্রিয়া ও পরিচালনা",
    "Team & Talent": "দল ও প্রতিভা"
  }
};

// Checklists translations
const auditTranslations = {
  zh: {
    t1: {
      title: "软件架构与可扩展性审计",
      items: [
        "分层关注点分离 (表现层、业务逻辑层、数据访问层)",
        "无状态微服务 / 容器化可扩展性配置",
        "数据库连接池、索引及查询性能分析",
        "API 速率限制、身份验证 (OAuth2/OIDC) 及有效负载验证",
        "容错机制 (熔断器、舱壁隔离、指数退避)",
        "源代码控制中的基础设施即代码 (IaC) 版本管理"
      ]
    },
    t2: {
      title: "质量保证与自动化测试审计",
      items: [
        "涵盖单元、API、UI 和安全测试的文档化总体测试策略",
        "在拉取请求 (PR) 上触发的 CI/CD 自动化回归执行",
        "具备明确严重级别 (P1-P4) SLA 的缺陷分类工作流",
        "具备不稳定测试隔离机制的自动化测试结果仪表板",
        "跨浏览器与移动设备兼容性验证矩阵",
        "峰值并发用户模拟下的性能 / 负载测试基准"
      ]
    },
    t3: {
      title: "安全性、合规性与审计追踪矩阵",
      items: [
        "CI 流程中的静态应用程序安全测试 (SAST) 与依赖项扫描",
        "数据加密标准：传输中 TLS 1.3 与静态 AES-256",
        "基于角色的访问控制 (RBAC) 与最小特权凭据治理",
        "针对用户访问、交易及管理员操作的全面审计日志",
        "具备经检验恢复演练的自动化数据库备份计划",
        "符合灾难恢复 (DR) RTO (<1小时) 与 RPO (<15分钟) 标准"
      ]
    },
    t4: {
      title: "工程流程与治理审计",
      items: [
        "要求同行评审与 CI 检查通过的拉取请求评审策略",
        "标准化的分支策略 (主干开发或 GitFlow)",
        "冲刺燃尽跟踪与回顾行动项解决率",
        "详尽的开发人员入职文档与沙箱运行手册",
        "与代码保持同步的 API 规范文档 (OpenAPI / Swagger)",
        "分配 15-20% 冲刺容量的技术债务积压治理"
      ]
    }
  },
  es: {
    t1: {
      title: "Auditoría de Arquitectura de Software y Escalabilidad",
      items: [
        "Separación de responsabilidades en capas (Presentación, Lógica de Negocio, Acceso a Datos)",
        "Configuraciones de escalabilidad de microservicios sin estado y contenedores",
        "Optimización de pools de conexiones, índices y rendimiento de base de datos",
        "Límites de tasa de API, autenticación (OAuth2/OIDC) y validación de payloads",
        "Mecanismos de tolerancia a fallos (Circuit Breakers, Bulkheads, retroceso exponencial)",
        "Versionado de Infraestructura como Código (IaC) en control de código fuente"
      ]
    },
    t2: {
      title: "Auditoría de Control de Calidad y Automatización de Pruebas",
      items: [
        "Estrategia Maestra de Pruebas documentada (Unitarias, API, UI y Seguridad)",
        "Regresiones automatizadas ejecutadas en CI/CD en cada Pull Request",
        "Flujo de triaje de defectos con SLAs definidos por severidad (P1-P4)",
        "Paneles de resultados de pruebas automatizadas con aislamiento de pruebas inestables",
        "Matrices de verificación de compatibilidad multidispositivo y navegadores",
        "Línea base de pruebas de rendimiento y carga bajo usuarios concurrentes"
      ]
    },
    t3: {
      title: "Matriz de Seguridad, Cumplimiento y Trazabilidad",
      items: [
        "Análisis de seguridad estático (SAST) y escaneo de dependencias en CI",
        "Estándares de cifrado: TLS 1.3 en tránsito y AES-256 en reposo",
        "Control de Acceso Basado en Roles (RBAC) y principio de menor privilegio",
        "Registro de auditoría completo para accesos, transacciones y acciones de admin",
        "Respaldos de base de datos automatizados con simulacros de recuperación verificados",
        "Cumplimiento de recuperación ante desastres: RTO (<1 hora) y RPO (<15 min)"
      ]
    },
    t4: {
      title: "Auditoría de Procesos de Ingeniería y Gobernanza",
      items: [
        "Política de revisión de código por pares obligatoria y checks de CI en verde",
        "Estrategia de ramas estandarizada (Trunk-based o GitFlow)",
        "Seguimiento de burndown de sprint y resolución de mejoras de retrospectivas",
        "Documentación completa de incorporación de desarrolladores y runbooks",
        "Especificaciones de API actualizadas (OpenAPI / Swagger) sincronizadas con código",
        "Backlog de deuda técnica con asignación dedicada del 15-20% de capacidad"
      ]
    }
  }
};

// KPI Glossary translations (10 metrics)
const kpiGlossaryTranslations = {
  zh: {
    "kpi-df": {
      name: "部署频率 (DF)",
      description: "组织成功向生产或运行环境发布代码的频率。",
      targetBenchmark: "卓越: 每天多次发布 | 高: 每周一次至每月一次",
      calculationFormula: "成功生产部署总次数 / 时间周期 (天或周)",
      businessImpact: "缩短上市时间，缩小单次发布的风险范围，加快客户反馈闭环。"
    },
    "kpi-ltc": {
      name: "变更前置时间 (LTFC)",
      description: "代码提交到成功在生产环境中运行所需的时间。",
      targetBenchmark: "卓越: 少于 1 小时 | 高: 1 天至 1 周",
      calculationFormula: "生产发布时间戳 - 分支上首次提交时间戳",
      businessImpact: "减少陈旧分支，简化合并冲突解决，加速功能交付。"
    },
    "kpi-cfr": {
      name: "变更失败率 (CFR)",
      description: "导致生产服务降级并需要紧急修复或回滚的部署百分比。",
      targetBenchmark: "卓越: 0% - 5% | 高: 5% - 15%",
      calculationFormula: "(失败的生产部署数 / 总部署数) * 100",
      businessImpact: "减少系统停机时间，维护客户信任，避免工程师陷入紧急救火。"
    },
    "kpi-mttr": {
      name: "平均恢复时间 (MTTR)",
      description: "从生产环境的意外故障或严重事件中恢复所需的平均时间。",
      targetBenchmark: "卓越: 少于 1 小时 | 高: 少于 1 天",
      calculationFormula: "关键生产故障总停机时间 / 故障事件总数",
      businessImpact: "保护业务连续性，严格满足合同 SLA 要求，降低经济损失。"
    },
    "kpi-der": {
      name: "缺陷逃逸率 (DER)",
      description: "最终用户在生产环境中发现的 Bug 占总缺陷的百分比。",
      targetBenchmark: "最优: < 3% 的总缺陷数",
      calculationFormula: "(生产环境发现的缺陷 / (QA发现缺陷 + 生产环境缺陷)) * 100",
      businessImpact: "测试用例有效性和发布前验证严密性的直接指标。"
    },
    "kpi-dre": {
      name: "缺陷消除效率 (DRE)",
      description: "在发布到生产环境之前识别并消除的缺陷比例。",
      targetBenchmark: "最优: > 95%",
      calculationFormula: "(发布前消除缺陷 / 发布前后发现的全部缺陷) * 100",
      businessImpact: "体现质保体系成熟度，有效保障客户满意度。"
    },
    "kpi-tcov": {
      name: "自动化测试覆盖率 (单元与集成)",
      description: "经自动化测试验证的应用程序代码库分支比例。",
      targetBenchmark: "最优: 80% - 90% 分支覆盖率",
      calculationFormula: "(测试期间执行的代码分支 / 总代码分支) * 100",
      businessImpact: "为代码重构提供安全保障，大幅加快版本发布节奏。"
    },
    "kpi-tdr": {
      name: "技术债务比率 (TDR)",
      description: "修复可维护性问题的预估成本与重写软件成本的比值。",
      targetBenchmark: "最优: < 5% (SonarQube A 级评级)",
      calculationFormula: "(修复耗时小时数 * 开发人员时薪) / 软件总重构成本",
      businessImpact: "防止架构腐化，大幅削减长期维护成本，提升后续开发速度。"
    },
    "kpi-sp": {
      name: "冲刺可预测性指数 (SPI)",
      description: "每个冲刺中实际完成的故事点与承诺故事点的比例。",
      targetBenchmark: "最优: 85% - 100%",
      calculationFormula: "(已完成故事点 / 计划承诺故事点) * 100",
      businessImpact: "确保产品路线图交付可控，提高对业务干系人的承诺准确度。"
    },
    "kpi-eng-ret": {
      name: "工程人员留存与满意度",
      description: "在 12 个月评估期内保留的高绩效技术人员百分比。",
      targetBenchmark: "最优: > 92% 年度留存率",
      calculationFormula: "(留存的核心技术人员数 / 技术人员总数) * 100",
      businessImpact: "保护企业核心技术认知沉淀，避免昂贵的招聘与重构周期。"
    }
  },
  es: {
    "kpi-df": {
      name: "Frecuencia de Despliegue (DF)",
      description: "Con qué frecuencia su organización despliega código en entornos de producción con éxito.",
      targetBenchmark: "Élite: Múltiples al día | Alto: Una vez por semana o mes",
      calculationFormula: "Total de despliegues exitosos / Periodo de tiempo",
      businessImpact: "Lanzamientos más rápidos, menor radio de impacto y ciclos de retroalimentación ágiles."
    },
    "kpi-ltc": {
      name: "Tiempo de Entrega de Cambios (LTFC)",
      description: "Tiempo requerido desde el commit hasta que el código se ejecuta con éxito en producción.",
      targetBenchmark: "Élite: < 1 hora | Alto: 1 día a 1 semana",
      calculationFormula: "Hora de despliegue en producción - Hora del primer commit",
      businessImpact: "Minimiza ramas obsoletas, reduce conflictos y acelera la entrega de funciones."
    },
    "kpi-cfr": {
      name: "Tasa de Fallos en Cambios (CFR)",
      description: "Porcentaje de despliegues que causan degradación y requieren hotfix o rollback.",
      targetBenchmark: "Élite: 0% - 5% | Alto: 5% - 15%",
      calculationFormula: "(Despliegues fallidos / Total de despliegues) * 100",
      businessImpact: "Reduce el tiempo de inactividad, protege la confianza del cliente y evita emergencias."
    },
    "kpi-mttr": {
      name: "Tiempo Medio de Recuperación (MTTR)",
      description: "Tiempo medio necesario para recuperarse de un fallo crítico en producción.",
      targetBenchmark: "Élite: < 1 hora | Alto: < 1 día",
      calculationFormula: "Tiempo total de inactividad / Número de incidentes",
      businessImpact: "Garantiza la continuidad del negocio y el cumplimiento de SLAs contractuales."
    },
    "kpi-der": {
      name: "Tasa de Escape de Defectos (DER)",
      description: "Porcentaje de errores detectados en producción por usuarios finales frente a QA.",
      targetBenchmark: "Óptimo: < 3% de los errores totales",
      calculationFormula: "(Defectos en Producción / Defectos Totales) * 100",
      businessImpact: "Indicador clave de la eficacia de la suite de pruebas antes de producción."
    },
    "kpi-dre": {
      name: "Eficiencia de Eliminación de Defectos (DRE)",
      description: "Proporción de defectos detectados y corregidos antes de lanzar a producción.",
      targetBenchmark: "Óptimo: > 95%",
      calculationFormula: "(Defectos antes del lanzamiento / Defectos totales) * 100",
      businessImpact: "Demuestra la madurez del equipo de QA y salvaguarda la satisfacción del cliente."
    },
    "kpi-tcov": {
      name: "Cobertura de Pruebas Automatizadas",
      description: "Proporción de ramas de código validadas por pruebas automatizadas.",
      targetBenchmark: "Óptimo: 80% - 90% cobertura de ramas",
      calculationFormula: "(Ramas ejecutadas / Total de ramas de código) * 100",
      businessImpact: "Proporciona seguridad para refactorizaciones y agiliza el ritmo de despliegues."
    },
    "kpi-tdr": {
      name: "Ratio de Deuda Técnica (TDR)",
      description: "Coste estimado de corregir problemas de mantenibilidad frente al coste de reescribir.",
      targetBenchmark: "Óptimo: < 5% (Calificación SonarQube Grado A)",
      calculationFormula: "(Horas de remediación * Tarifa hora) / Coste total de desarrollo",
      businessImpact: "Previene la degradación arquitectónica y reduce costes de mantenimiento a largo plazo."
    },
    "kpi-sp": {
      name: "Índice de Previsibilidad del Sprint (SPI)",
      description: "Ratio de puntos de historia completados frente a los puntos comprometidos.",
      targetBenchmark: "Óptimo: 85% - 100%",
      calculationFormula: "(Puntos completados / Puntos comprometidos) * 100",
      businessImpact: "Permite una planificación fiable de la hoja de ruta y presupuestos precisos."
    },
    "kpi-eng-ret": {
      name: "Retención y Satisfacción del Equipo Técnico",
      description: "Porcentaje de talento técnico de alto rendimiento retenido en un periodo de 12 meses.",
      targetBenchmark: "Óptimo: > 92% de retención anual",
      calculationFormula: "(Personal clave retenido / Total de ingenieros) * 100",
      businessImpact: "Preserva el conocimiento institucional y elimina costes elevados de contratación."
    }
  }
};

// Services content translations for zh (Full Chinese translations for all 7 services)
const zhServices = {
  s1: {
    tagline: "现代 Web、多层架构、企业级、云 SaaS、移动及微服务架构的端到端工程交付。",
    summary: "从初始原型到关键任务的多租户云平台，INFO TECH MICROSYSTEMS 设计、构建、优化并维护契合您业务目标的高性能软件系统。",
    fullDescription: [
      "INFO TECH MICROSYSTEMS 在整个应用生命周期中提供前沿的软件工程服务。无论是从头构建弹性云原生微服务，将遗留单体系统重构为模块化多层架构，还是打造高响应度的跨平台 Web 和移动体验，我们都采用严格的工程标准与现代工具链。",
      "我们的工程实力涵盖响应式渐进式 Web 应用 (PWA)、企业级 ERP/CRM 扩展、安全多租户 SaaS 门户、高扩展微服务网络以及 iOS 和 Android 原生/混合应用。我们不仅交付代码，更保证软件的可维护性、可观测性、完备的自动化测试框架以及可预测的持续交付。",
      "我们还提供 7x24 小时 SLA 维护、安全补丁治理、性能调优和技术债务消除，确保您的软件系统随着用户规模的扩大依然敏捷与安全。"
    ],
    capabilities: [
      {
        title: "现代 Web 与渐进式 Web 应用 (PWA)",
        description: "基于 React、Next.js、Vue 和 Angular 构建的高性能、高无障碍、响应迅速的 Web 应用，具备服务端渲染和边缘缓存能力。",
        bulletPoints: ["单页应用 (SPA) 与服务端渲染 (SSR)", "毫秒级页面加载与核心 Web 指标优化", "响应式移动端优先设计", "状态管理与离线优先 Service Worker"]
      },
      {
        title: "云原生与分布式微服务",
        description: "在 AWS、Microsoft Azure 和 Google Cloud Platform 上基于 Docker 和 Kubernetes 构建的解耦事件驱动架构。",
        bulletPoints: ["REST、gRPC 与 GraphQL API 网关", "异步消息队列 (Kafka, RabbitMQ, SQS)", "弹性设计模式 (熔断器、重试、舱壁隔离)", "分布式链路追踪、结构化日志与 APM 遥测"]
      },
      {
        title: "企业级多层架构与云 SaaS 平台",
        description: "分离表现层、业务逻辑层与高吞吐数据层的可扩展多层解决方案，实现故障隔离与企业级安全性。",
        bulletPoints: ["多租户数据隔离与基于角色的 RBAC", "高可用数据库分片与 Redis 缓存", "合规级传输中与静态数据加密", "自动化 CI/CD 持续交付流水线"]
      },
      {
        title: "跨平台与原生移动端工程",
        description: "采用 React Native、Flutter、Swift 和 Kotlin 构建的直观移动应用，兼具原生性能与统一代码库优势。",
        bulletPoints: ["生物识别认证与设备级安全钥匙串", "推送通知编排与实时数据同步", "离线数据同步与本地缓存", "App Store 与 Google Play 合规上架交付"]
      },
      {
        title: "持续演进与 7x24 小时 SLA 维护",
        description: "主动式运维管理、突发事件响应、零停机平滑升级、安全补丁应用与技术债务消减。",
        bulletPoints: ["明确保障的事件响应 SLA (P1 至 P4)", "零停机滚动更新与金丝雀发布", "数据库查询调优与内存泄漏排查", "第三方 API 版本弃用与平滑升级管理"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "架构蓝图与原型验证", description: "领域驱动设计 (DDD)、威胁建模、技术栈基准测试与可交互概念验证。" },
      { step: "02", title: "敏捷冲刺与左移质量保证", description: "结合测试驱动开发 (TDD)、每日站会与持续自动化构建的两周迭代冲刺。" },
      { step: "03", title: "生产加固与多维验证", description: "预发布环境对齐、自动化集成测试、安全渗透扫描与蓝绿部署发布。" },
      { step: "04", title: "全链路观测与持续演进", description: "实时遥测大屏、用户行为分析、主动错误日志监控与待办项持续优先级排序。" }
    ],
    keyDeliverables: [
      "包含完整 Git 历史与许可协议的全部源代码",
      "架构决策记录 (ADR) 与系统设计蓝图",
      "自动化 CI/CD 流水线配置 (GitHub Actions / GitLab / Azure DevOps)",
      "单元、集成与端到端自动化测试套件",
      "基于 OpenAPI / Swagger 的交互式 API 文档",
      "生产部署手册、运行指南与运维应急预案"
    ],
    useCases: [
      {
        clientType: "北美金融科技企业",
        scenario: "多租户结算平台吞吐量不足，单体架构频繁发生发布故障。",
        outcome: "迁移至 Kubernetes 微服务架构，吞吐量提升 400%，实现零停机发布。"
      },
      {
        clientType: "医疗健康 SaaS 平台",
        scenario: "需要满足 HIPAA 和 SOC2 严格合规标准的移动端与 Web 端患者门户。",
        outcome: "准时交付具备端到端加密与审计追踪的跨平台系统，顺利通过第三方安全审计。"
      }
    ],
    faqs: [
      {
        q: "你们采用何种代码所有权模型？",
        a: "客户拥有 100% 的知识产权与源代码所有权。所有代码、提交历史、文档与资产在交付时均完全归客户所有。"
      },
      {
        q: "项目上线后如何提供技术支持？",
        a: "我们提供结构化的 24/7 SLA 维护支持包，包括监控、安全补丁、性能优化及应急缺陷响应。"
      }
    ]
  },
  s2: {
    tagline: "贯穿需求挖掘、系统架构、全面测试、运行支持与长期演进的专家级咨询与实战交付。",
    summary: "INFO TECH MICROSYSTEMS 为您的软件项目注入资深技术领导力与战略咨询，消除昂贵的架构盲区，缩短产品上市周期并确保卓越架构。",
    fullDescription: [
      "许多软件项目并非因编码能力而失败，而是由于前期的架构假设错误、需求边界不清或缺乏科学的生命周期管理。INFO TECH MICROSYSTEMS 为企业提供首席技术顾问级别的指导与实战工程支持。",
      "我们协助管理层与工程团队在系统选型、云迁移策略、分布式数据一致性以及微服务拆分等关键决策上做出明智选择，避免技术债务滚雪球式的积累。",
      "我们的咨询顾问直接参与设计评审、制定企业级技术标准，并建立可量化的交付跟踪机制，确保商业目标与技术实现高度对齐。"
    ],
    capabilities: [
      {
        title: "需求挖掘与领域建模",
        description: "将复杂的业务逻辑分解为清晰的领域模型、用户故事和可验证的技术规格说明书。",
        bulletPoints: ["领域驱动设计 (DDD) 战略与战术建模", "非功能性需求 (NFR) 规格定义", "业务干系人与工程师对齐工坊", "验收标准与测试用例前置设计"]
      },
      {
        title: "系统架构与技术可行性验证",
        description: "评估技术栈适用性、设计高可用高容错架构方案，并完成核心技术攻关 PoC。",
        bulletPoints: ["微服务与事件驱动架构设计", "高并发与分布式数据一致性方案", "云厂商多活与混合云架构规划", "架构决策记录 (ADR) 体系建立"]
      },
      {
        title: "技术债审计与系统重构规划",
        description: "深入分析遗留代码库瓶颈，制定平滑迭代重构路线图，确保业务连续性。",
        bulletPoints: ["静态代码质量扫描与圈复杂度分析", "数据库性能调优与架构瘦身", "单体向微服务平滑绞杀者模式实施", "遗留系统接口适配层构建"]
      },
      {
        title: "工程文化与交付流程规范化",
        description: "导入业界顶尖的 DevOps 理念与敏捷实践，提升团队整体交付节奏与工程成熟度。",
        bulletPoints: ["CI/CD 自动化门禁与左移质保流程", "分支规范与代码审查 (Code Review) 机制", "敏捷 Scrum / Kanban 节奏落地", "工程效能指标监控体系"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "现状评估与痛点梳理", description: "深度访谈团队，审计现有系统架构、交付流程与基础设施成本。" },
      { step: "02", title: "目标蓝图与实施路线图", description: "制定切合业务目标的目标架构蓝图与分阶段实施里程碑计划。" },
      { step: "03", title: "技术攻关与标准落地", description: "主导核心原型研发，建立统一的技术规范、脚手架与自动化流水线。" },
      { step: "04", title: "知识沉淀与团队赋能", description: "通过结对编程与内训，将工程最佳实践深植于内部团队，确保持续自主迭代。" }
    ],
    keyDeliverables: [
      "全套软件需求规格说明书 (SRS) 与领域模型",
      "高层系统架构蓝图与详细数据流设计文档",
      "技术栈评估、总体拥有成本 (TCO) 及 ROI 分析报告",
      "架构决策记录 (ADRs) 全集与技术规范库",
      "关键技术 PoC 可运行代码与基准性能测试报告",
      "企业工程实践规范与团队治理手册"
    ],
    useCases: [
      {
        clientType: "传统大型制造集团",
        scenario: "核心 ERP 系统由于 15 年技术债积累导致任何新功能修改都引发系统崩溃。",
        outcome: "设计事件驱动的微服务外挂架构，在零中断前提下完成核心模块拆解，交付周期从几个月缩短为两周。"
      },
      {
        clientType: "成长型 SaaS 创新公司",
        scenario: "用户数爆发式增长引发数据库锁死，系统在高峰期频繁不可用。",
        outcome: "重构数据读写分离架构并引入分布式缓存策略，系统支撑能力提升 10 倍，云成本降低 35%。"
      }
    ],
    faqs: [
      {
        q: "咨询顾问是否会编写实际代码？",
        a: "是的！我们坚信躬身入局。我们的顾问不仅输出高层次架构蓝图，还会主导编写核心架构 PoC、脚手架代码和自动化测试套件。"
      },
      {
        q: "咨询合作通常采用哪种形式？",
        a: "我们提供灵活的合作模式：包括针对特定架构瓶颈的 2-4 周专项诊断审计、按月常驻的顾问指导，或端到端交付的交钥匙项目。"
      }
    ]
  },
  s3: {
    tagline: "通过源自实战的现代全栈工程课程，为您的内部技术团队提供定向赋能与能力跃升。",
    summary: "INFO TECH MICROSYSTEMS 为企业工程团队提供专业技术内训，覆盖现代架构、测试驱动开发、CI/CD 自动化与安全工程，系统化提升团队交付能力。",
    fullDescription: [
      "软件技术的快速迭代要求工程团队持续更新技能库。然而，通用型的在线课程往往脱离企业实际业务场景，培训效果难以转化为生产力。",
      "INFO TECH MICROSYSTEMS 提供完全基于实战的代码级培训。我们的课程结合企业正在开发的代码库与真实业务场景，针对团队的实际技术短板量身定制教学内容。",
      "通过手把手的结对编码、沙箱实验和即时代码评审，我们帮助您的工程师掌握现代云原生架构、自动化测试策略与敏捷交付精髓，打造具备高战斗力的自驱型工程团队。"
    ],
    capabilities: [
      {
        title: "现代全栈开发与云架构内训",
        description: "深入掌握 React 19、TypeScript、Node.js、.NET 8、微服务设计与容器化部署实践。",
        bulletPoints: ["企业级 TypeScript 严格类型与高级模式", "微服务架构与云原生开发实践", "容器化与 Kubernetes 编排实战", "现代异步状态管理与高并发设计"]
      },
      {
        title: "测试驱动开发 (TDD) 与自动化实战",
        description: "培养左移测试思维，掌握单元测试、API 测试与 UI 自动化测试工具链。",
        bulletPoints: ["TDD 核心红绿重构循环实战", "Playwright 与 Cypress 端到端自动化", "Mock 策略与集成测试稳定性优化", "高测试覆盖率的代码库设计模式"]
      },
      {
        title: "DevOps 与持续交付自动化流水线",
        description: "让每位开发者具备现代 DevOps 交付能力，打通代码提交到自动化部署全链路。",
        bulletPoints: ["GitHub Actions / GitLab CI 进阶流水线编写", "基础设施即代码 (Terraform / Docker)", "金丝雀部署与自动化回滚策略", "生产遥测与 APM 链路排错实战"]
      },
      {
        title: "安全编码与企业代码审查标准",
        description: "防患于未然，在编码阶段杜绝 OWASP Top 10 安全漏洞并建立高效的代码审查文化。",
        bulletPoints: ["安全编码指南与身份验证最佳实践", "静态代码扫描 (SAST) 工具集成与门禁", "高价值的代码审查 (Code Review) 实操", "架构防御与依赖漏洞防范"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "团队能力评估与课程定制", description: "通过代码审计与访谈评估当前技术栈成熟度，定制专属培训大纲。" },
      { step: "02", title: "沙箱实验室与实战工作坊", description: "在真实的代码仓库沙箱中进行案例教学与实操练习，告别枯燥的纯理论讲解。" },
      { step: "03", title: "结对编程与业务代码演练", description: "导师与学员直接结对重构或开发真实业务功能，将新知识即刻转化为生产力。" },
      { step: "04", title: "能力达标考核与持续答疑", description: "前后能力对比测试，颁发培训认证，并提供为期 30 天的后续答疑指导。" }
    ],
    keyDeliverables: [
      "专为团队定制的全套教学大纲、配套代码仓库与交互式沙箱实验",
      "详尽的步骤式技术参考手册、速查表 (Cheatsheets) 与开发模板",
      "培训前后能力评估对比矩阵与管理层评估报告",
      "可在团队内部永久复用的工程规范、测试策略与审查清单模板",
      "学员技术认证证书与个性化学习成长路径建议",
      "培训后 30 天专属专家答疑与技术支持通道"
    ],
    useCases: [
      {
        clientType: "政府机构 IT 部门",
        scenario: "传统 Java/JSP 团队急需转型现代 TypeScript 与 React 云原生架构。",
        outcome: "开展为期 4 周的密集实战内训，团队全员成功通过考核并独立交付了首个现代化市民服务门户。"
      },
      {
        clientType: "金融服务企业研发中心",
        scenario: "团队缺乏自动化测试文化，依赖手工测试导致发布周期长达数月且线上 Bug 频发。",
        outcome: "植入 TDD 与 Playwright 自动化工程培训，项目测试覆盖率提升至 82%，交付周期压缩 65%。"
      }
    ],
    faqs: [
      {
        q: "培训可以远程在线进行还是必须现场面授？",
        a: "我们同时支持远程交互式在线直播授课与现场面授。在渥太华及大多伦多地区，我们可提供本地面对面封闭工作坊。"
      },
      {
        q: "培训班通常适合多大规模的团队？",
        a: "为了保证结对指导和代码辅导的质量，我们建议每个班级规模为 5 到 15 名工程师。"
      }
    ]
  },
  s4: {
    tagline: "以严谨的质量保证战略打造高可靠性软件，设计、实施并运行全自动化测试框架。",
    summary: "INFO TECH MICROSYSTEMS 构建高韧性的端到端质量工程体系，通过自动化回归、性能压测、安全审计与持续质量门禁，杜绝生产事故与严重缺陷。",
    fullDescription: [
      "在现代软件工程中，质量不是最后阶段的检验，而是贯穿架构与开发全程的基因。缺乏系统化质量保障的软件不仅运维成本高昂，更随时面临重大业务中断和安全风险。",
      "INFO TECH MICROSYSTEMS 拥有深厚的大型企业级质量工程经验。我们帮助客户建立从单元测试、API 接口自动化、跨浏览器端到端测试，到高并发负载压测与安全渗透的全链路防护网。",
      "我们引入行业顶尖的自动化框架与智能测试调度，消除不稳定测试 (Flaky Tests)，将回归测试时间从数天缩短至几分钟，让持续交付变得坚如磐石。"
    ],
    capabilities: [
      {
        title: "总体质量保证战略与流程规范",
        description: "制定符合行业监管与企业目标的全面测试策略，明确各测试阶段准入与准出标准。",
        bulletPoints: ["测试策略 (Master Test Plan) 制定", "严重级别 (P1-P4) 与缺陷流转 SLA", "缺陷预防与根因分析 (RCA) 机制", "质量门禁与敏捷发布审批流程"]
      },
      {
        title: "全自动化测试框架架构与实施",
        description: "基于 Playwright、Cypress、Selenium 与 RestAssured 打造生产级自动化测试套件。",
        bulletPoints: ["Page Object Model 与组件化设计模式", "API 接口自动化与数据驱动测试", "跨浏览器与真实移动设备云测兼容", "并行测试执行与 CI 流水线秒级反馈"]
      },
      {
        title: "性能、负载与高并发压力测试",
        description: "使用 k6、JMeter 和 Locust 模拟海量并发场景，找出系统性能瓶颈与崩溃临界点。",
        bulletPoints: ["高并发并发峰值与持续浸泡压测", "数据库慢查询与内存泄漏监控分析", "吞吐量 (RPS) 与 99 分位响应延迟优化", "弹性伸缩阈值与容量规划报告"]
      },
      {
        title: "持续质量集成与自动化测试报表",
        description: "在 CI/CD 中嵌入自动化门禁，实时输出直观的执行趋势与测试质量仪表板。",
        bulletPoints: ["PR 自动化测试门禁与分支保护", "不稳定测试 (Flaky Test) 隔离与重试治理", "SonarQube 质量门禁与测试覆盖率跟踪", "Allure / ExtentReports 实时可视化报告"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "质量成熟度诊断与差距分析", description: "评估当前测试流程、自动化覆盖率与生产缺陷逃逸率，明确痛点与优先级。" },
      { step: "02", title: "自动化测试架构搭建", description: "搭建现代可维护的自动化测试框架，编写核心主流程回归用例。" },
      { step: "03", title: "CI/CD 流水线深度集成", description: "将自动化测试套件接入持续集成，实现每次代码提交自动触发验证与门禁检查。" },
      { step: "04", title: "持续监控与效能提升", description: "监控测试运行稳定性与执行效率，持续扩充边界用例并调优测试执行速度。" }
    ],
    keyDeliverables: [
      "详尽的企业级总体质量保证战略 (QAS) 规范文档",
      "生产就绪的自动化测试框架源代码仓库 (Playwright / Cypress / API)",
      "端到端全量自动化回归与冒烟测试用例全集",
      "包含真实并发数据的性能与负载基准测试评估报告",
      "CI/CD 自动化流水线集成配置与测试门禁规则",
      "自动化测试用例维护指南与团队移交文档"
    ],
    useCases: [
      {
        clientType: "大型跨国电商企业",
        scenario: "黑五购物节前面临系统可能崩溃的风险，且每次版本发布需要全员加班手工测试三天。",
        outcome: "实施 k6 并发压测调优，并搭建 Playwright 自动化回归套件，回归时间从 3 天缩短为 18 分钟，黑五实现零宕机。"
      },
      {
        clientType: "移动银行解决方案商",
        scenario: "核心移动 App 跨多机型兼容性缺陷频出，用户应用商店评分严重下滑。",
        outcome: "构建跨设备自动化测试农场，覆盖 120+ 款主流设备，缺陷逃逸率直降 85%，商店评分回升至 4.8。"
      }
    ],
    faqs: [
      {
        q: "你们推荐使用哪些自动化测试工具？",
        a: "我们根据客户的技术栈和需求因地制宜。现代 Web 端首选 Playwright 或 Cypress；API 端推荐 RestAssured 或 Axios/Supertest；性能压测推荐 k6 或 JMeter。"
      },
      {
        q: "如何解决测试用例不稳定 (Flaky) 的问题？",
        a: "我们遵循严谨的测试架构原则：采用确定性的数据准备策略、智能显式等待代替硬编码延时，并引入自动化隔离协议防止假阳性干扰 CI。"
      }
    ]
  },
  s5: {
    tagline: "消除招聘摩擦与昂贵的用人失误，为您的企业精准猎寻顶级软件工程与技术管理专家。",
    summary: "INFO TECH MICROSYSTEMS 依托深厚的工程实战底蕴，提供由资深技术架构师主导的深度技术人才猎寻服务，确保每位候选人兼具卓越技术力与文化契合度。",
    fullDescription: [
      "传统猎头公司通常由不具备技术背景的顾问负责筛选简历，导致技术企业在面试中耗费大量核心工程资源来筛选不合格的候选人，且极易因误判而发生代价惨重的错误录用。",
      "INFO TECH MICROSYSTEMS 以完全不同的工程化思维开展技术人才甄选。我们本身就是从业数十年的资深工程师与架构师，每一位推荐给客户的候选人都经过我们严格的代码级深度考察。",
      "从全栈架构师、云原生开发工程师、自动化测试专家 (SDET) 到敏捷项目总监，我们为客户精准匹配即插即用、拥有实战战斗力的高素质技术人才。"
    ],
    capabilities: [
      {
        title: "架构师主导的深度技术考察与代码审计",
        description: "由技术专家亲自开展编码考核、架构白板演练与真实问题解决能力测试。",
        bulletPoints: ["真实业务场景代码考核与重构能力评估", "系统设计与高并发架构深度技术面试", "计算机基础、算法与代码风格审查", "详尽的技术评级与强弱项客观报告"]
      },
      {
        title: "高端核心技术职位定向寻访",
        description: "覆盖从资深软件开发、DevOps 专家到工程副总裁等核心关键岗位。",
        bulletPoints: ["首席架构师与资深技术顾问", "全栈、后端及前端高级工程师", "QA 自动化测试专家与 SDET 工程师", "技术项目经理、Scrum Master 与工程主管"]
      },
      {
        title: "全生命周期背景核查与软实力评估",
        description: "严格核验候选人的真实项目经历、交付履历、沟通协作与抗压解决问题能力。",
        bulletPoints: ["前雇主直属技术领导背调访谈", "团队协作与工程文化契合度评估", "代码库真实贡献与开源活跃度考证", "职业信誉与合规合法性审查"]
      },
      {
        title: "灵活的用工模式与人员扩充保障",
        description: "支持全职猎聘、短期专家外派、合同工增援及试用转正等多种灵活合作方案。",
        bulletPoints: ["全职核心骨干精准猎聘", "关键攻坚项目精英顾问派驻", "紧急突发项目团队快速人员扩充", "附带试用期质量保障与免费替换机制"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "职位画像与技术需求深度对齐", description: "与客户技术主管深入沟通，精准梳理技术栈、架构复杂度与团队文化特征。" },
      { step: "02", title: "精准寻访与第一轮技术初筛", description: "通过资深技术人脉网络搜寻，并由我们的首席顾问进行代码与架构初筛。" },
      { step: "03", title: "交付详尽候选人技术档案", description: "向客户提交附带详细代码评审记录、设计评分与实操录像的高价值候选人档案。" },
      { step: "04", title: "协助终面与入职跟进", description: "协助薪酬谈判、提供入职准备清单，并持续跟踪试用期工作表现与满意度。" }
    ],
    keyDeliverables: [
      "附带量化技术评分的候选人综合评估档案",
      "编码考核记录、架构白板演练综述与评分明细",
      "经多方核实的真实工作经历与前任领导背调报告",
      "岗位技能矩阵对比图与团队互补性分析",
      "符合当地法律法规的标准聘用协议与合规文件建议",
      "90 天候选人入职质量保障与履约跟踪承诺"
    ],
    useCases: [
      {
        clientType: "获得 B 轮融资的人工智能创新企业",
        scenario: "由于面试流程不严谨，连续招募两任架构师均因无法驾驭微服务架构而在试用期离职，导致核心系统延期半年。",
        outcome: "受托寻访首席架构师，经多轮代码实战考核推荐入职，新架构师 30 天内厘清技术架构并如期上线系统。"
      },
      {
        clientType: "北美知名电信解决方案供应商",
        scenario: "需在 3 周内为紧急 5G 网元项目增援 8 名精通 Kubernetes 与 Go 的高水平研发工程师。",
        outcome: "依托强大的专业技术人才库，14 天内完成精准匹配与面试入职，项目如期交付通过验收。"
      }
    ],
    faqs: [
      {
        q: "你们与传统猎头公司有何根本区别？",
        a: "最大区别在于我们的顾问全部拥有计算机和工程背景。我们不仅看简历关键字，更亲自审核候选人的代码与架构设计，绝不浪费客户宝贵的时间面见不合格人员。"
      },
      {
        q: "如果录用的候选人在试用期内离职或不达标怎么办？",
        a: "我们提供长达 90 天的质量保证期。在此期间若候选人因能力不符离职，我们将免费提供同等资历人员替换或根据合同退还猎头服务费用。"
      }
    ]
  },
  s6: {
    tagline: "让工程卓越变得客观可衡量，建立量化 KPI 治理体系并执行权威第三方质量审计。",
    summary: "INFO TECH MICROSYSTEMS 帮助企业建立透明、客观的工程度量体系，涵盖 DORA 速度指标、质量逃逸指数及合规性审计，赋能管理层科学决策。",
    fullDescription: [
      "很多企业在软件工程上投入了数百万美元，却难以回答核心问题：我们的开发速度是快是慢？代码质量是否在持续提升？下一个重大缺陷何时会爆发？",
      "管理学名言指出：'无法衡量，就无法管理'。INFO TECH MICROSYSTEMS 帮助企业将主观的模糊感觉转变为精确的量化工程数据。",
      "我们依据业界公认的 DORA 指标、代码健康度指数和自动化测试覆盖矩阵，为企业搭建工程治理大屏，并为投融资尽职调查、合规认证及重大架构评审提供权威的第三方独立审计报告。"
    ],
    capabilities: [
      {
        title: "DORA 指标体系与研发效能大屏",
        description: "实时采集并监控部署频率、变更前置时间、变更失败率与平均恢复时间。",
        bulletPoints: ["Git 与 CI/CD 遥测数据自动化采集插件", "DORA 四大核心速度与稳定性指标分析", "研发效能瓶颈 (PR 停滞、流水线耗时) 诊断", "高管层端到端交付效能大屏构建"]
      },
      {
        title: "第三方代码健康度与架构质量审计",
        description: "对企业核心代码资产进行无死角健康检查，出具权威技术审计与合规评估报告。",
        bulletPoints: ["SonarQube / SAST 静态代码质量与安全审计", "技术债务规模评估与偿还成本核算", "架构依赖耦合度与模块化隔离审计", "开源组件许可证合规与依赖漏洞排查"]
      },
      {
        title: "缺陷生命周期与逃逸率 (DER) 治理",
        description: "建立端到端缺陷度量体系，分析缺陷产生根因并提升前置消除效率 (DRE)。",
        bulletPoints: ["缺陷逃逸率 (DER) 与消除效率 (DRE) 监控", "缺陷存活时间 (Aging) 与修复 SLA 跟踪", "缺陷引入阶段 (需求/设计/编码) 根因分析", "前置测试门禁质量防线建设"]
      },
      {
        title: "投融资技术尽职调查与合规审计",
        description: "为风险投资机构 (VC)、私募股权 (PE) 或收购方提供严谨的被投企业技术审计。",
        bulletPoints: ["软件知识产权完整性与代码独创性核验", "系统可扩展性与云端运维成本真实性核查", "团队工程成熟度与关键人员依赖风险评估", "面向投资决策的清晰结论与红旗警示报告"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "度量目标对齐与数据接入", description: "与高管层明确业务指标诉求，自动化接入 GitHub、Jira、Jenkins 等研发工具链。" },
      { step: "02", title: "静态扫描与架构纵深审计", description: "运行全套自动化代码分析探针，结合专家审查识别隐性缺陷与架构风险。" },
      { step: "03", title: "建立统一的 KPI 治理平台", description: "部署实时更新的效能与质量大屏，制定明确的指标健康阈值与警报规则。" },
      { step: "04", title: "交付审计认证与持续改进计划", description: "交付由首席顾问签发的权威审计报告，并提供持续的季度复审与改进跟踪。" }
    ],
    keyDeliverables: [
      "企业工程度量体系全套指标定义与计算规范手册",
      "自动化高管层 DORA 指标与研发效能仪表板",
      "详尽的代码库健康度、安全性与技术债务官方审计报告",
      "缺陷根因分析与全周期质量预防改进方案",
      "针对投融资或合规审查的技术尽职调查报告 (Tech Due Diligence)",
      "面向工程团队的季度持续改进路线图与 OKR 建议"
    ],
    useCases: [
      {
        clientType: "知名私募股权投资机构",
        scenario: "拟出资 3000 万美元收购某医疗软件公司，需在 10 天内全面评估其技术资产的真实可扩展性与重构风险。",
        outcome: "出具权威技术尽职调查报告，揭示其核心系统存在未隔离的单点技术债务，协助投资方合理调整估值并锁定技术保障条款。"
      },
      {
        clientType: "高速发展的 SaaS 企业",
        scenario: "工程团队规模扩充至 80 人后，产出反而变慢，高管层无法判断问题根源出在流程还是人员。",
        outcome: "建立 DORA 指标自动化平台，精准识别出代码评审积压与集成测试耗时过长两大瓶颈，推行改进后交付周期缩减 50%。"
      }
    ],
    faqs: [
      {
        q: "收集这些度量指标是否会给开发人员带来额外工作负担？",
        a: "完全不会！我们的采集探针完全基于您现有的工具链 (GitHub, GitLab, Jira, CI/CD) 自动化静默抓取，工程师无需额外手工填报任何数据。"
      },
      {
        q: "审计报告通常需要多长时间出具？",
        a: "标准的第三方技术审计通常在 2 到 3 周内完成，包含代码自动化扫描、架构专家评估及最终正式报告交付。"
      }
    ]
  },
  s7: {
    tagline: "构建客观的技术人员胜任力评估模型，激发团队潜能，建立长效留存机制与卓越文化。",
    summary: "INFO TECH MICROSYSTEMS 协助企业建立科学的技术人员绩效评估与职业成长阶梯，摆脱主观印象考核，提升工程满意度并留存核心骨干。",
    fullDescription: [
      "软件工程师是高度脑力密集型群体，传统的销售式或通用 KPI 考核（如代码行数、工时统计）不仅极易被操纵，更会严重挫伤优秀开发者的工作积极性，导致核心技术人才流失。",
      "技术管理需要懂技术的专业方法。INFO TECH MICROSYSTEMS 帮助企业建立与现代软件工程实践相契合的研发胜任力模型与绩效评估体系。",
      "我们平衡商业成果交付、架构代码质量、同行评审贡献与团队技术赋能，为工程师指引清晰的职级晋升通道，打造具备高凝聚力与创造力的卓越工程团队。"
    ],
    capabilities: [
      {
        title: "工程职级阶梯与胜任力模型设计",
        description: "建立从初级工程师到首席架构师的清晰职级定义、期望行为与能力标准。",
        bulletPoints: ["清晰的工程技术职级通道 (Junior 至 Principal / Fellow)", "涵盖技术深度、架构影响、业务理解与领导力的评估维度", "客观的晋升评审委员会标准与答辩机制", "各职级对标薪酬市场竞争力校准"]
      },
      {
        title: "量化研发贡献度综合评估体系",
        description: "摒弃简单粗暴的单项统计，采用多维度的交付价值与协作贡献评价机制。",
        bulletPoints: ["功能交付价值与故事点交付准时率", "代码审查 (Code Review) 深度与同行反馈", "技术债务主动清理与架构优化贡献", "缺陷引入率与生产环境运维责任心"]
      },
      {
        title: "核心骨干人才留存与防流失机制",
        description: "识别核心关键人员流失风险，建立针对性的激励方案与团队工作倦怠预警机制。",
        bulletPoints: ["关键技术单点依赖风险 (Bus Factor) 分析", "研发团队士气、加班负荷与满意度定期脉搏调研", "高绩效技术骨干个性化挽留与激励方案", "健康的技术分享与持续学习文化营造"]
      },
      {
        title: "工程管理层领导力赋能与辅导",
        description: "为从优秀程序员提拔为技术经理 (Tech Lead / EM) 的人员提供领导力转型辅导。",
        bulletPoints: ["从单兵作战到赋能团队的思维模式转变", "高质量 1-on-1 沟通与绩效辅导实操技巧", "有效任务委派、进度把控与心理安全感营造", "处理团队技术分歧与低绩效人员淘汰规范"]
      }
    ],
    methodologySteps: [
      { step: "01", title: "现有考核痛点与团队调研", description: "匿名调研工程师与技术主管，了解当前考核痛点、晋升困惑与流失根因。" },
      { step: "02", title: "定制职级矩阵与评估标准", description: "结合企业战略与行业前沿，设计清晰透明的工程师职级图谱与胜任力标准。" },
      { step: "03", title: "试点推行与管理层赋能培训", description: "在核心部门开展首轮试点考核，对技术经理进行 1-on-1 评估与反馈技巧培训。" },
      { step: "04", title: "全面落地与年度优化复盘", description: "在全公司工程团队全面推广，建立季度评审节奏并根据反馈持续调优模型。" }
    ],
    keyDeliverables: [
      "完整的企业软件工程师职级阶梯与胜任力标准矩阵手册",
      "多维度技术人员绩效评估模板与自评/他评考核表格",
      "技术经理专属的 1-on-1 沟通指南与绩效反馈实战手册",
      "核心骨干人员留存风险雷达图与激励建议方案",
      "技术团队心理安全感与研发满意度调研基准报告",
      "工程文化建设与技术共享机制落地指导计划"
    ],
    useCases: [
      {
        clientType: "中型企业级软件公司",
        scenario: "缺乏统一的技术职级体系，工程师晋升依赖部门经理主观好恶，导致骨干工程师跳槽率高达 35%。",
        outcome: "建立公开透明的工程职级标准与答辩评审会，核心人员年度离职率降至 6%，团队满意度提升 48%。"
      },
      {
        clientType: "科技金融集团研发中心",
        scenario: "管理层使用'代码行数'考核开发人员，引发团队恶意刷代码提交、单元测试无人愿意编写的恶性循环。",
        outcome: "推倒重构为涵盖业务价值、评审质量与系统稳定性的三维绩效模型，代码库精简 20%，系统稳定性显著提高。"
      }
    ],
    faqs: [
      {
        q: "很多开发人员反感传统绩效考核，如何打消他们的抵触情绪？",
        a: "开发人员反感的是不公正、不懂技术的外行考核。当他们看到清晰、透明、能够真实反映技术深度并对职业发展有实质指导意义的标准时，反而会积极拥抱。"
      },
      {
        q: "如何平衡技术深度与业务交付两个维度的考核？",
        a: "我们的模型明确将个人技术产出（业务功能交付）与架构治理贡献（代码审查、组件复用、降低技术债）赋予不同权重，鼓励既懂业务又注重代码质量的工程师获得更高回报。"
      }
    ]
  }
};

// Update all locale files
const localesDir = 'src/locales';
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const code = file.replace('.json', '');
  const filePath = path.join(localesDir, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. KPI Categories
  json.kpiCategories = kpiCatsTranslations[code] || kpiCatsTranslations.es || enKpiCats;

  // 2. Audit Checklist Data
  if (code === 'zh') {
    json.auditChecklistData = auditTranslations.zh;
  } else if (code === 'es') {
    json.auditChecklistData = auditTranslations.es;
  } else {
    // For other languages, generate localized versions based on available translations or fallback
    json.auditChecklistData = auditTranslations.es || enAudits;
  }

  // 3. KPI Glossary Data
  if (code === 'zh') {
    json.kpiGlossaryData = kpiGlossaryTranslations.zh;
  } else if (code === 'es') {
    json.kpiGlossaryData = kpiGlossaryTranslations.es;
  } else {
    json.kpiGlossaryData = kpiGlossaryTranslations.es || enKpis;
  }

  // 4. Services Content
  if (code === 'zh') {
    json.servicesContent = zhServices;
  } else if (code === 'en') {
    json.servicesContent = enServices;
  } else {
    // Use fallback for other languages initially, will enhance
    json.servicesContent = json.servicesContent || enServices;
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated locale pack for: ${code}`);
});

console.log('Finished updating locale packs successfully.');
