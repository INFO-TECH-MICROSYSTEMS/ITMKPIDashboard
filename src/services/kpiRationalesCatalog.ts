import type { KPIJustification } from '../types/kpiPlatform';

export type RationaleGenerator = (j: KPIJustification) => string;

export const KPI_RATIONALES: Record<string, Record<string, RationaleGenerator | string>> = {
  en: {},
  zh: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `当前先行质量健康评分为 ${j.currentValue}。先行门禁指标（代码提测测试覆盖率与自动化推进跑道）对后期生产环境缺陷逃逸率和变更失败率具有显著的前瞻预测效力。持续保持先行指标绿灯能有效杜绝昂贵的高成本投产故障返工。`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `当前非形式化测试共截获 ${j.currentValue}，通过敏捷探索和即兴排查成功化解了潜在的客户级重大瘫痪事故。必须确保所有未遂缺陷的重现场景 100% 录入 TestRail 自动化回归套件，实现从险情发现到制度化防御的完整闭环。`,

    "Release Quality Index & Executive Evaluation": (j) => {
      const isBlocked = j.statusBadge.includes('Gated') || j.statusBadge.includes('阻断');
      const isWarn = j.statusBadge.includes('Warning') || j.statusBadge.includes('警告');
      if (isBlocked) {
        return `评级 ${j.currentValue} 与“已阻断 / 门禁拦截”状态被触发，原因为代码库中当前存在未关闭的发布阻断缺陷或客户缺陷逃逸率偏高。企业发布治理规范强制要求：凡存在未解决的 P1 致命缺陷或逃逸率威胁生产稳定性时，系统将自动触发硬性发布中止。`;
      }
      if (isWarn) {
        return `评级 ${j.currentValue} 代表“有条件警告”。尽管目前不存在硬性 P1 阻塞项，但有一项或多项关键质量指标（如自动化测试覆盖率或回归测试周期时长）略微偏离了目标门禁基准。`;
      }
      return `评级 ${j.currentValue} 代表完全符合“批准发布”规范。代码库零未解决发布阻断缺陷，回归执行速度敏捷高效，客户缺陷逃逸率完全受控于企业安全阈值之内。`;
    },
    "Blocking / Gating Defects": (j) => {
      const valStr = String(j.currentValue ?? '');
      const hasBlockers = valStr !== '0 Blockers' && !valStr.startsWith('0');
      return hasBlockers
        ? `当前检测到 ${valStr} 个尚未解决的发布门禁致命缺陷。企业发布管理规范明确要求：在投产部署前，阻断性工单数量必须彻底清零，否则严禁放行。`
        : '当前系统中不存在任何未解决的发布阻断缺陷。所有高优先级验收标准均已验证通过，门禁准入放行。';
    },
    "Defect Leakage (Customer APARs)": (j) => {
      const isHigh = j.statusColor === 'rose' || j.statusColor === 'amber';
      return isHigh
        ? `客户缺陷逃逸率为 ${j.currentValue}，已超出企业安全目标 (< 3.0%)。生产环境出现的逃逸缺陷表明发布前的回归测试套件存在覆盖漏洞或集成验证盲区。`
        : `当前客户缺陷逃逸率为 ${j.currentValue}，严格受控于企业安全阈值 (< 3.0%) 以内，验证了发布前测试流程的严密拦截成效。`;
    },
    "Mean Time to Resolve (MTTR)": (j) => `当前平均缺陷修复时长为 ${j.currentValue}。持续缩短 MTTR 能够显著减少跨团队交付等待，避免未修复缺陷在分支中积压并保障敏捷迭代节奏。`,
    "Items With No Unit Tests": (j) => `当前主分支中存在 ${j.currentValue} 个缺乏单元测试覆盖的代码合并工单。未受单元测试保护的代码改动容易在后续迭代重构中诱发隐蔽的逻辑回归。`,
    "Automated Test Suite Pass Rate": (j) => `自动化测试套件当前总体通过率为 ${j.currentValue}。保持高通过率能确保 CI/CD 持续交付流水线的可靠性，并赋予团队快速迭代发布的信心。`,
    "Flaky Test Detection Index": (j) => `当前不稳定测试占比为 ${j.currentValue}。非确定性失败会增加团队无谓的构建重试排查成本，必须及时将不稳定用例移入隔离观察队列并彻底修复。`,
    "Over-Committed Engineers": (j) => `当前有 ${j.currentValue} 位测试工程师承担了超出健康负荷上限的工作量。合理再平衡团队用例分配能有效防止测试遗漏并避免团队工作倦怠。`,
    "Enterprise Quality SLA Adherence": (j) => `企业级复合质量 SLA 履约达标率为 ${j.currentValue}，覆盖缺陷定级、全量回归执行、测试计划与客户热修等核心运营服务承诺。`,
    "Cost of Poor Quality (CoPQ) & Rework Impact": (j) => `因缺陷排查修复和客户热修造成的估算返工损耗成本为 ${j.currentValue}。持续通过自动化测试将质量左移能够直接降低企业研发运营支出。`,
    "DORA Change Failure Rate (CFR)": (j) => `当前变更失败率为 ${j.currentValue}。保持极低的服务变更回滚率是 Google DORA 精英级效能团队的核心标志，保障了业务连续性。`,
    "Sprint Predictability Index (SPI)": (j) => `当前敏捷迭代交付可预测性指数为 ${j.currentValue}。高预测性能够确保团队按承诺兑现业务需求，助力管理层进行精准的路线图规划。`,
    "Regression Cycle Time": (j) => `全量回归测试套件当前执行耗时为 ${j.currentValue}。保持敏捷紧凑的回归周期允许研发团队持续部署修复，无需经历数天的封版冻结。`,
    "Performance P95 Latency Benchmark": (j) => `系统 P95 接口响应延迟当前为 ${j.currentValue}。95% 的合成与并发压测请求均在此延迟包络线内完成，保障了流畅的用户交互体验。`,
    "Feature Lead Time (Commit-to-Customer)": (j) => `新功能从首行代码提交到生产可用平均需要 ${j.currentValue}。短前置时间有助于敏捷响应市场变化并建立极速的客户反馈循环。`,
    "Security Gate Vulnerabilities & CVE Compliance": (j) => `当前发布版本中检测到 ${j.currentValue} 个高危安全漏洞。严格遵循 CISO 门禁策略，确保所有已知安全漏洞在上线前完成修复封堵。`,
    "Contractual Production SLA Uptime": (j) => `当前生产环境服务复合可用率为 ${j.currentValue}，充分满足面向高价值企业客户的高可用性服务等级承诺。`,
    "WCAG 2.2 AA Accessibility Compliance": (j) => `axe-core 自动化无障碍合规审计得分为 ${j.currentValue}，符合国际通用无障碍标准与公共服务准入规范。`,
    "Test Execution Burnout & Predictive Velocity Forecast": (j) => `当前测试执行进度为 ${j.currentValue}。基于当前执行速率模型推演，测试进度保持在健康交付跑道之内，确保在发布节点前完成全量验证。`,
    "Test Automation Burnout & Predictive Velocity Forecast": (j) => `当前自动化开发推进速率为 ${j.currentValue}。数学推导模型持续预测何时达成 100% 自动化，确保团队稳步消除手工测试瓶颈。`
  },
  es: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `La puntuación de salud de indicadores adelantados es de ${j.currentValue}. El rigor en las puertas de código de los PRs y la velocidad de automatización anticipan con alta precisión la estabilidad posterior en producción y la tasa de fallas DORA.`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `Se han interceptado ${j.currentValue} mediante sesiones exploratorias no formales, evitando costosos cortes en producción. Es prioritario completar el registro del 100% de estos escenarios en TestRail para blindar las suites de regresión.`,

    "Release Quality Index & Executive Evaluation": (j) => `La calificación ${j.currentValue} refleja el estado de preparación ejecutiva. Evalúa defectos bloqueadores, cobertura de pruebas automatizadas y estabilidad de entrega según las políticas de gobernanza corporativa.`,
    "Blocking / Gating Defects": (j) => `Actualmente se registran ${j.currentValue} defectos bloqueadores de lanzamiento sin resolver. La política de calidad exige 0 bloqueadores antes de pasar a producción.`,
    "Defect Leakage (Customer APARs)": (j) => `La tasa de fuga de defectos es de ${j.currentValue}. Mantener este valor bajo control (< 3.0%) protege la experiencia del cliente y evita penalizaciones contractuales.`,
    "Mean Time to Resolve (MTTR)": (j) => `El tiempo medio de resolución es de ${j.currentValue}. Una resolución más ágil acelera los ciclos de entrega y desbloquea el avance del sprint.`,
    "Automated Test Suite Pass Rate": (j) => `La tasa de aprobación de pruebas automatizadas se sitúa en ${j.currentValue}, garantizando estabilidad y confianza en el proceso de entrega continua.`,
    "Flaky Test Detection Index": (j) => `El índice de pruebas inestables es de ${j.currentValue}. Aislar pruebas no deterministas evita falsas alarmas y optimiza el uso de recursos en la nube.`,
    "Regression Cycle Time": (j) => `La duración del ciclo de regresión es de ${j.currentValue}. Mantener tiempos de ciclo reducidos permite desplegar mejoras de forma continua sin congelar el código.`,
    "Performance P95 Latency Benchmark": (j) => `La latencia P95 es de ${j.currentValue}, asegurando que el 95% de las transacciones críticas responden dentro de los umbrales de servicio esperados.`,
    "Contractual Production SLA Uptime": (j) => `La disponibilidad del servicio en producción es de ${j.currentValue}, cumpliendo con los acuerdos de nivel de servicio suscritos con los clientes.`,
    "Security Gate Vulnerabilities & CVE Compliance": (j) => `Se registran ${j.currentValue} vulnerabilidades de seguridad abiertas. La gobernanza de ciberseguridad requiere resolver vulnerabilidades críticas antes del pase a producción.`
  },
  fr: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `Le score des indicateurs avancés est de ${j.currentValue}. La conformité des portes de PR et la progression de l'automatisation prédisent directement la stabilité des livraisons et la limitation des incidents clients ultérieurs.`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `Un total de ${j.currentValue} a été neutralisé grâce aux tests exploratoires, évitant des interruptions de service directes. L'ensemble des cas doit être rétro-documenté dans TestRail pour garantir une barrière de régression pérenne.`,

    "Release Quality Index & Executive Evaluation": (j) => `La note ${j.currentValue} reflète l'indice de maturité logicielle, synthétisant les anomalies bloquantes, la couverture d'automatisation et la stabilité des versions selon la gouvernance d'entreprise.`,
    "Blocking / Gating Defects": (j) => `Actuellement, ${j.currentValue} anomalies bloquantes sont en cours. La politique d'entreprise exige zéro anomalie critique P1/P2 avant le déploiement en production.`,
    "Defect Leakage (Customer APARs)": (j) => `Le taux d'échappement client s'élève à ${j.currentValue}. Le maintenir sous le seuil de 3,0% protège la satisfaction client et évite les pénalités de SLA.`,
    "Mean Time to Resolve (MTTR)": (j) => `Le délai moyen de résolution est de ${j.currentValue}. Une résolution rapide fluidifie le travail des équipes et préserve la vélocité du sprint.`,
    "Automated Test Suite Pass Rate": (j) => `Le taux de réussite des tests automatisés est de ${j.currentValue}, confirmant la robustesse du pipeline d'intégration continue.`,
    "Flaky Test Detection Index": (j) => `L'indice de tests instables est de ${j.currentValue}. La mise en quarantaine des tests non déterministes restaure la confiance dans les signaux de CI.`,
    "Regression Cycle Time": (j) => `Le cycle de régression nécessite ${j.currentValue}. Une exécution rapide permet de livrer en continu sans blocage prolongé des environnements.`,
    "Performance P95 Latency Benchmark": (j) => `Le temps de réponse P95 s'établit à ${j.currentValue}, garantissant une expérience fluide pour 95% des requêtes sous charge.`,
    "Contractual Production SLA Uptime": (j) => `La disponibilité contractuelle s'élève à ${j.currentValue}, satisfaisant aux engagements de haute disponibilité pris envers les clients.`,
    "Security Gate Vulnerabilities & CVE Compliance": (j) => `${j.currentValue} vulnérabilités de sécurité sont identifiées. La gouvernance CISO impose la remédiation de toute faille critique avant livraison.`
  },
  de: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `Der Frühindikator-Score beträgt ${j.currentValue}. Frühzeitige Prüfdisziplin in PR-Gates korreliert direkt mit geringen Fehlerentweichungen und stabiler DORA-Verfügbarkeit nach dem Release.`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `Durch explorative Tests wurden ${j.currentValue} rechtzeitig abgefangen, wodurch kostspielige Produktionsstillstände vermieden wurden. Die lückenlose Erfassung in TestRail stellt sicher, dass diese Fehler dauerhaft automatisiert geprüft werden.`,

    "Release Quality Index & Executive Evaluation": (j) => `Die Bewertung ${j.currentValue} spiegelt die Release-Reife wider und fasst Blocker-Tickets, Automatisierungsabdeckung und Systemstabilität gemäß Unternehmensrichtlinien zusammen.`,
    "Blocking / Gating Defects": (j) => `Derzeit sind ${j.currentValue} release-blockierende Fehler offen. Die Qualitätsrichtlinie erfordert 0 Blocker vor der Freigabe für die Produktion.`,
    "Defect Leakage (Customer APARs)": (j) => `Die Fehlerentweichungsrate beträgt ${j.currentValue}. Ein kontrollierter Wert (< 3,0%) sichert Kundenzufriedenheit und verhindert SLA-Pönalen.`,
    "Mean Time to Resolve (MTTR)": (j) => `Die durchschnittliche Behebungszeit liegt bei ${j.currentValue}. Eine zügige Fehlerbehebung verhindert Engpässe im laufenden Sprint.`,
    "Automated Test Suite Pass Rate": (j) => `Die Erfolgsquote der automatisierten Tests liegt bei ${j.currentValue}, was eine verlässliche kontinuierliche Bereitstellung ermöglicht.`,
    "Flaky Test Detection Index": (j) => `Der Anteil unzuverlässiger Tests beträgt ${j.currentValue}. Die Quarantäne fehlerhafter Tests schützt das Vertrauen in CI-Build-Ergebnisse.`,
    "Regression Cycle Time": (j) => `Die Regressionsdauer beträgt ${j.currentValue}. Kurze Regressionszyklen erlauben kontinuierliche Updates ohne tagelange Release-Blockaden.`,
    "Performance P95 Latency Benchmark": (j) => `Die P95-Latenz liegt bei ${j.currentValue}, wodurch 95% aller Nutzeranfragen innerhalb des Performance-Solls bedient werden.`,
    "Contractual Production SLA Uptime": (j) => `Die Service-Verfügbarkeit beträgt ${j.currentValue} und erfüllt die vertraglichen Service Level Agreements vollumfänglich.`,
    "Security Gate Vulnerabilities & CVE Compliance": (j) => `Es wurden ${j.currentValue} Sicherheitslücken festgestellt. Richtlinien verlangen die Schließung kritischer CVEs vor dem Produktions-Rollout.`
  },
  ja: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `先行品質ヘルススコアは ${j.currentValue} です。PR品質ゲートの遵守と自動化推進速度は、その後の本番不具合流出率および変更失敗率の抑制に極めて強い相関を示します。`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `探索的テストおよび非形式的検証により ${j.currentValue} が未然に阻止され、重大な本番障害損失を回避しました。検出されたシナリオを TestRail に100%登録し、恒久的な回帰防止体制を確立することが重要です。`,

    "Release Quality Index & Executive Evaluation": (j) => `評価 ${j.currentValue} は、ブロッカー不具合、テスト自動化率、リグレッション速度を統合したリリース準備状況を示しています。`,
    "Blocking / Gating Defects": (j) => `現在 ${j.currentValue} 件のリリース阻害不具合が未解決です。企業品質基準により、本番導入前にブロッカーゼロの達成が義務付けられています。`,
    "Defect Leakage (Customer APARs)": (j) => `顧客への不具合流出率は ${j.currentValue} です。3.0%未満の適正水準を維持することで、顧客信頼とSLA遵守を確実に保護します。`,
    "Mean Time to Resolve (MTTR)": (j) => `平均不具合解決時間は ${j.currentValue} です。迅速な障害復旧により、依存するスプリントタスクの停滞を解消します。`,
    "Automated Test Suite Pass Rate": (j) => `自動テストスイート全体の合格率は ${j.currentValue} であり、CI/CDパイプラインの高い信頼性と安定稼働を証明しています。`,
    "Flaky Test Detection Index": (j) => `不安定テストの割合は ${j.currentValue} です。非決定的なテストを隔離し修正することで、CIシグナルに対する信頼を維持します。`,
    "Regression Cycle Time": (j) => `回帰テスト全体の所要時間は ${j.currentValue} です。迅速なサイクルにより、長期間のコード凍結なしに継続的リリースを実現します。`,
    "Performance P95 Latency Benchmark": (j) => `P95応答遅延は ${j.currentValue} です。95%の処理が許容時間内に完了し、快適なユーザー操作性を保証しています。`,
    "Contractual Production SLA Uptime": (j) => `本番稼働率は ${j.currentValue} であり、顧客との契約SLAコミットメントを完全に達成しています。`,
    "Security Gate Vulnerabilities & CVE Compliance": (j) => `未解決のセキュリティ脆弱性が ${j.currentValue} 件検出されました。CISOガバナンスに従い、リリース前に修正が必要です。`
  },
  pt: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `A pontuação dos indicadores antecipados é de ${j.currentValue}. O rigor nas validações de PRs e o avanço da automação correlacionam-se diretamente com a redução da fuga de defeitos para clientes e a estabilidade DORA.`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `Foram interceptados ${j.currentValue} por testes exploratórios, prevenindo interrupções graves em produção. É essencial catalogar 100% desses casos no TestRail para garantir proteção contínua de regressão.`,

    "Release Quality Index & Executive Evaluation": (j) => `A classificação ${j.currentValue} reflete o índice de prontidão executiva, sintetizando defeitos bloqueadores, cobertura de testes e estabilidade conforme as diretrizes corporativas.`,
    "Blocking / Gating Defects": (j) => `Existem atualmente ${j.currentValue} defeitos bloqueadores não resolvidos. A política corporativa exige zero bloqueadores antes da entrada em produção.`,
    "Defect Leakage (Customer APARs)": (j) => `A taxa de escape de defeitos para clientes é de ${j.currentValue}. Manter este valor sob controle (< 3.0%) protege a satisfação do cliente e evita penalidades contratuais.`,
    "Automated Test Suite Pass Rate": (j) => `A taxa de aprovação dos testes automatizados é de ${j.currentValue}, garantindo confiança nas entregas contínuas.`,
    "Performance P95 Latency Benchmark": (j) => `A latência P95 é de ${j.currentValue}, assegurando respostas rápidas para 95% das transações sob carga de trabalho normal.`,
    "Contractual Production SLA Uptime": (j) => `A disponibilidade operacional é de ${j.currentValue}, atendendo integralmente aos acordos de nível de serviço com os clientes.`
  },
  ru: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `Опережающий индекс надежности составляет ${j.currentValue}. Строгий контроль PR-ворот и темп автоматизации напрямую гарантируют минимальный уровень клиентских инцидентов и стабильность изменений в проде.`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `Неформальным тестированием было перехвачено ${j.currentValue}, что предотвратило критические сбои в производственной среде. Обязательным требованием является 100% внесение этих сценариев в каталог TestRail.`,

    "Release Quality Index & Executive Evaluation": (j) => `Оценка ${j.currentValue} отражает общую готовность релиза, агрегируя блокирующие дефекты, охват автоматизацией и стабильность системы.`,
    "Blocking / Gating Defects": (j) => `В настоящее время зарегистрировано ${j.currentValue} нерешенных блокирующих дефектов. Регламент требует полного устранения блокеров до развертывания в прод.`,
    "Defect Leakage (Customer APARs)": (j) => `Уровень утечки дефектов клиентам составляет ${j.currentValue}. Поддержание показателя ниже 3.0% защищает репутацию сервиса и исключает штрафы по SLA.`,
    "Automated Test Suite Pass Rate": (j) => `Успешность выполнения автоматизированных тестов составляет ${j.currentValue}, что подтверждает стабильность пайплайна непрерывной интеграции.`,
    "Performance P95 Latency Benchmark": (j) => `Задержка P95 составляет ${j.currentValue}, обеспечивая быстрый отклик системы для 95% пользовательских запросов.`,
    "Contractual Production SLA Uptime": (j) => `Доступность сервиса в производственной среде составляет ${j.currentValue}, полностью отвечая контрактным обязательствам SLA.`
  },
  hi: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `अग्रणी स्वास्थ्य स्कोर ${j.currentValue} है। PR परीक्षण गेट्स और ऑटोमेशन की गति सीधे तौर पर रिलीज़ के बाद उत्पादन स्थिरता और कम ग्राहक दोष रिसाव से संबंधित है।`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `अन्वेषणात्मक परीक्षण के माध्यम से ${j.currentValue} को रोका गया है, जिससे गंभीर उत्पादन आउटेज को टाला जा सका। इन सभी मामलों को स्थायी टेस्टरेल रिग्रेशन सूट में पंजीकृत करना अनिवार्य है।`,

    "Release Quality Index & Executive Evaluation": (j) => `ग्रेड ${j.currentValue} रिलीज की समग्र गुणवत्ता और तत्परता को दर्शाता है, जिसमें ब्लॉकर दोष और स्वचालन कवरेज शामिल हैं।`,
    "Blocking / Gating Defects": (j) => `वर्तमान में ${j.currentValue} अनसुलझे ब्लॉकर दोष मौजूद हैं। उत्पादन में रिलीज करने से पहले कॉर्पोरेट नीति शून्य ब्लॉकर की मांग करती है।`,
    "Defect Leakage (Customer APARs)": (j) => `ग्राहक दोष रिसाव दर ${j.currentValue} है। इसे 3.0% से कम रखना ग्राहकों के विश्वास और अनुबंध अनुपालन को बनाए रखता है।`,
    "Automated Test Suite Pass Rate": (j) => `स्वचालित परीक्षण सफलता दर ${j.currentValue} है, जो निरंतर वितरण पाइपलाइन में उच्च स्थिरता सुनिश्चित करती है।`,
    "Performance P95 Latency Benchmark": (j) => `P95 विलंबता ${j.currentValue} है, जो सुनिश्चित करती है कि 95% महत्वपूर्ण अनुरोध समय सीमा के भीतर हल होते हैं।`,
    "Contractual Production SLA Uptime": (j) => `उत्पादन सेवा उपलब्धता ${j.currentValue} है, जो ग्राहकों के साथ अनुबंधित SLA प्रतिबद्धताओं को पूरा करती है।`
  },
  bn: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `অগ্রণী স্বাস্থ্য স্কোর হলো ${j.currentValue}। PR টেস্ট গেট এবং অটোমেশনের গতি রিলিজের পরবর্তী উৎপাদন স্থায়িত্ব ও কম গ্রাহক ত্রুটির সাথে সরাসরি সম্পর্কিত।`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `অনুসন্ধানমূলক পরীক্ষার মাধ্যমে ${j.currentValue} রোধ করা হয়েছে, যা মারাত্মক সিস্টেম বিপর্যয় আটকেছে। এই ত্রুটিগুলি স্থায়ীভাবে TestRail সুইটে অন্তর্ভুক্ত করা আবশ্যক।`,

    "Release Quality Index & Executive Evaluation": (j) => `গ্রেড ${j.currentValue} রিলিজের সার্বিক স্বাস্থ্য ও প্রস্তুতি নির্দেশ করে, যা ব্লকার ত্রুটি ও অটোমেশন কভারেজ মূল্যায়ন করে।`,
    "Blocking / Gating Defects": (j) => `বর্তমানে ${j.currentValue} টি অমীমাংসিত ব্লকার ত্রুটি রয়েছে। উৎপাদনে যাওয়ার পূর্বে কর্পোরেট নীতি অনুসারে শূন্য ব্লকার থাকা বাধ্যতামূলক।`,
    "Defect Leakage (Customer APARs)": (j) => `গ্রাহক ত্রুটি লিক হওয়ার হার ${j.currentValue}। এটি ৩.০% এর নিচে রাখা গ্রাহক সন্তুষ্টি ও চুক্তির শর্ত রক্ষা করে।`,
    "Automated Test Suite Pass Rate": (j) => `স্বয়ংক্রিয় পরীক্ষার সাফল্যের হার ${j.currentValue}, যা ক্রমাগত ডেলিভারি পাইপলাইনের স্থিতিশীলতা প্রমাণ করে।`,
    "Performance P95 Latency Benchmark": (j) => `P95 প্রতিক্রিয়া সময় ${j.currentValue}, যা নিশ্চিত করে যে ৯৫% অনুরোধ অনুমোদিত সময়ের মধ্যে সম্পন্ন হয়।`,
    "Contractual Production SLA Uptime": (j) => `উৎপাদন সেবার প্রাপ্যতা ${j.currentValue}, যা ক্লায়েন্টদের সাথে চুক্তিবদ্ধ SLA পুরোপুরি পূরণ করে।`
  },
  ar: {
    "Leading & Lagging Quality Indicator Correlation": (j) => `مؤشر الصحة الاستباقي يبلغ ${j.currentValue}. إن الالتزام بفحص الأكواد وسرعة الأتمتة يرتبطان بشكل مباشر باستقرار النظام بعد الإطلاق وتقليل تسرب العيوب.`,
    "Near Miss Analysis & Non-Formal Testing Telemetry": (j) => `تم اعتراض ${j.currentValue} عبر الاختبارات الاستكشافية، مما جنب النظام فترات توقف مكلفة في الإنتاج. من الضروري توثيق هذه السيناريوهات بنسبة 100% في TestRail.`,

    "Release Quality Index & Executive Evaluation": (j) => `تعكس الدرجة ${j.currentValue} مستوى جاهزية الإصدار، حيث تجمع بين العيوب المعطلة ومعدل الأتمتة واستقرار النظام وفق معايير الحوكمة.`,
    "Blocking / Gating Defects": (j) => `يوجد حاليًا ${j.currentValue} عيوب حرجة غير معالجة. تتطلب سياسة الإطلاق عدم وجود أي عيوب معطلة قبل النشر في الإنتاج.`,
    "Defect Leakage (Customer APARs)": (j) => `معدل تسرب العيوب للعملاء يبلغ ${j.currentValue}. الحفاظ على المعدل تحت 3.0% يحمي سمعة الخدمة ويمنع غرامات مستوى الخدمة.`,
    "Automated Test Suite Pass Rate": (j) => `نسبة نجاح الاختبارات المؤتمتة تبلغ ${j.currentValue}، مما يضمن كفاءة واستقرار خطوط الإنتاج والتسليم المستمر.`,
    "Performance P95 Latency Benchmark": (j) => `زمن الاستجابة P95 يبلغ ${j.currentValue}، مما يضمن معالجة 95% من الطلبات الحرجة ضمن النطاق الزمني المحدد.`,
    "Contractual Production SLA Uptime": (j) => `مستوى جاهزية الخدمة في الإنتاج يبلغ ${j.currentValue}، مما يفي بكافة التزامات اتفاقية مستوى الخدمة التعاقدية.`
  }
};
