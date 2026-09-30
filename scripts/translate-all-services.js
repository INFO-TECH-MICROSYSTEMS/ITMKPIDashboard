import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const zh = JSON.parse(fs.readFileSync(path.join(localesDir, 'zh.json'), 'utf8'));

// Dictionaries for localized terms across languages
const langPacks = {
  es: {
    taglines: {
      s1: "Ingeniería integral de arquitecturas web modernas, n-capas, empresariales, SaaS en la nube, móviles y microservicios.",
      s2: "Asesoramiento experto y ejecución práctica en definición de requisitos, arquitectura, pruebas y mantenimiento.",
      s3: "Capacite a sus equipos de ingeniería con formación práctica y programas avanzados de desarrollo de capacidades.",
      s4: "Eleve la fiabilidad de su software con estrategias rigurosas de aseguramiento de calidad y suites de pruebas automatizadas.",
      s5: "Elimine la fricción y contrataciones erróneas con selección de talento técnico de élite dirigida por arquitectos.",
      s6: "Haga medible la excelencia de la ingeniería mediante marcos de KPIs (DORA), auditorías de deuda técnica y calidad de código.",
      s7: "Alinee la productividad de la ingeniería con los objetivos estratégicos mediante marcos de competencias y retención."
    },
    summaries: {
      s1: "Desde prototipos iniciales hasta plataformas cloud multinquilino críticas, INFO TECH MICROSYSTEMS diseña, construye, optimiza y mantiene sistemas de software de alto rendimiento adaptados a sus objetivos empresariales.",
      s2: "INFO TECH MICROSYSTEMS aporta liderazgo técnico senior y consultoría estratégica a sus iniciativas de software para eliminar puntos ciegos, acelerar el lanzamiento al mercado y garantizar la excelencia arquitectónica.",
      s3: "Capacitamos a sus equipos técnicos con planes de estudio orientados a la producción que cubren arquitecturas modernas, desarrollo guiado por pruebas (TDD), CI/CD y estándares de codificación segura.",
      s4: "Garantizamos la máxima fiabilidad mediante estrategias de pruebas automatizadas, pruebas de rendimiento bajo carga extrema y gobernanza de puertas de calidad en CI/CD.",
      s5: "Reclutamos desarrolladores, ingenieros de automatización (SDET) y líderes técnicos evaluados mediante rigurosas auditorías de código y pruebas de diseño de sistemas.",
      s6: "Establecemos métricas clave de rendimiento (DORA), paneles ejecutivos de calidad y auditorías formales de arquitectura para gobierno y due diligence.",
      s7: "Diseñamos matrices de niveles profesionales, planes de carrera transparentes y sistemas de retención que motivan a los ingenieros y reducen la rotación."
    },
    commonDeliverables: [
      "Código fuente completo con historial detallado en Git y licencias",
      "Registros de Decisiones de Arquitectura (ADRs) y diagramas del sistema",
      "Configuraciones de pipelines de CI/CD automatizadas (GitHub Actions / GitLab / Azure DevOps)",
      "Suites de pruebas automatizadas unitarias, de integración y end-to-end",
      "Documentación interactiva de APIs con especificaciones OpenAPI / Swagger",
      "Manuales de despliegue, guías de operación y planes de contingencia"
    ]
  },
  fr: {
    taglines: {
      s1: "Ingénierie de bout en bout d'architectures web modernes, n-tiers, d'entreprise, SaaS cloud, mobiles et microservices.",
      s2: "Conseil expert et exécution pratique sur l'expression des besoins, l'architecture, les tests et la maintenance.",
      s3: "Renforcez vos équipes d'ingénierie avec des formations ciblées et axées sur la pratique du développement moderne.",
      s4: "Améliorez la fiabilité de vos logiciels grâce à des stratégies QA robustes et des suites de tests automatisés.",
      s5: "Éliminez les frictions de recrutement avec la sélection de talents techniques d'élite dirigée par des architectes.",
      s6: "Rendez l'excellence technique mesurable grâce aux métriques clés (DORA), audits de code et gouvernance de qualité.",
      s7: "Optimisez la performance technique et fidélisez vos talents clés grâce à des référentiels de compétences clairs."
    },
    summaries: {
      s1: "Du prototype initial aux plateformes cloud multi-locataires critiques, INFO TECH MICROSYSTEMS conçoit, développe, optimise et maintient des systèmes logiciels haute performance adaptés à vos ambitions.",
      s2: "INFO TECH MICROSYSTEMS intègre un leadership technique chevronné et du conseil stratégique dans vos projets logiciels pour éliminer les angles morts et garantir l'excellence architecturale.",
      s3: "Nous formons vos équipes avec des programmes concrets couvrant les architectures modernes, le développement piloté par les tests (TDD), l'automatisation CI/CD et la sécurité.",
      s4: "Nous assurons une fiabilité logicielle maximale grâce à des tests automatisés de bout en bout, des tests de charge et une gouvernance stricte des déploiements.",
      s5: "Nous recrutons des développeurs seniors, ingénieurs SDET et managers pré-évalués par des tests de code approfondis et des revues d'architecture réelles.",
      s6: "Nous mettons en place des tableaux de bord de métriques DORA, mesurons les taux d'échappement d'anomalies et réalisons des audits d'architecture formels.",
      s7: "Nous concevons des échelles de compétences techniques, des processus d'évaluation transparents et des stratégies de fidélisation pour vos meilleurs ingénieurs."
    },
    commonDeliverables: [
      "Code source complet avec historique Git exhaustif et licences",
      "Dossiers de Décisions d'Architecture (ADR) et schémas du système",
      "Pipelines CI/CD automatisés (GitHub Actions / GitLab / Azure DevOps)",
      "Suites de tests automatisés unitaires, d'intégration et end-to-end",
      "Documentation interactive d'API conforme aux standards OpenAPI / Swagger",
      "Guides de déploiement en production, manuels d'exploitation et plans de reprise"
    ]
  },
  de: {
    taglines: {
      s1: "End-to-End-Entwicklung moderner Web-, Mehrschicht-, Enterprise-, Cloud-SaaS-, Mobil- und Microservice-Architekturen.",
      s2: "Strategische Beratung und praktische Umsetzung von Anforderungserhebung, Architektur bis hin zu Wartung und Support.",
      s3: "Befähigen Sie Ihre Entwicklungsteams durch praxisnahe Schulungen in modernen Architekturen und Best Practices.",
      s4: "Maximieren Sie Software-Zuverlässigkeit durch robuste QA-Strategien und automatisierte Test-Pipelines.",
      s5: "Präzises IT-Recruiting durch erfahrene Software-Architekten zur Vermeidung teurer Fehlbesetzungen.",
      s6: "Ingenieurmäßige Exzellenz messbar machen: DORA-Metriken, Code-Audits und Prozessverbesserungen.",
      s7: "Strukturierte Leistungsförderung, transparente Kompetenzmodelle und nachhaltige Entwickler-Bindung."
    },
    summaries: {
      s1: "Vom Prototyp bis zur geschäftskritischen Mandanten-Cloud-Plattform: INFO TECH MICROSYSTEMS entwickelt, optimiert und betreibt hochperformante Softwaresysteme.",
      s2: "Wir unterstützen Ihre Softwareinitiativen mit fundierter technischer Führung und Architekturberatung, um Risiken frühzeitig zu eliminieren.",
      s3: "Wir schulen Entwickler in testgetriebener Entwicklung (TDD), modernen Frameworks, CI/CD-Pipelines und sicheren Codierungsstandards.",
      s4: "Umfassende Qualitätssicherung mit automatisierten End-to-End-, API- und Lasttests für fehlerfreie Releases.",
      s5: "Gezielte Vermittlung von erstklassigen Entwicklern, Testautomatisierern und Führungskräften mit technischer Tiefenprüfung.",
      s6: "Messbare Transparenz durch DORA-Kennzahlen, Qualitäts-Dashboards und fundierte Due-Diligence-Audits.",
      s7: "Entwicklung transparenter Karrierestufen und strukturierter Feedback-Mechanismen zur Mitarbeiterbindung."
    },
    commonDeliverables: [
      "Vollständiger Quellcode mit lückenloser Git-Historie und Lizenzierung",
      "Architecture Decision Records (ADRs) und Systemarchitektur-Pläne",
      "Automatisierte CI/CD-Pipelines (GitHub Actions / GitLab / Azure DevOps)",
      "Umfassende Unit-, Integrations- und End-to-End-Testsuiten",
      "Interaktive API-Dokumentation nach OpenAPI / Swagger-Standard",
      "Betriebshandbücher, Deployment-Leitfäden und Incident-Runbooks"
    ]
  },
  ja: {
    taglines: {
      s1: "最新のWeb、多層アーキテクチャ、エンタープライズ、クラウドSaaS、モバイル、マイクロサービスの統合エンジニアリング。",
      s2: "要件定義、アーキテクチャ設計、テスト、運用保守にわたる専門的なコンサルティングと実践的支援。",
      s3: "最新の開発手法と実践的なカリキュラムにより、貴社エンジニアチームの技術力を飛躍的に向上。",
      s4: "堅牢なQA戦略と自動テストハーネスの構築により、エンタープライズ品質のソフトウェアを実現。",
      s5: "熟練アーキテクトによる技術審査に基づく、卓越したエンジニアとリーダーの採用支援。",
      s6: "DORA指標、コード品質監査、客観的なKPIフレームワークにより、エンジニアリングの価値を可視化。",
      s7: "明確な技術キャリアラダーと公正な評価基準により、優秀なエンジニアの定着と成長を促進。"
    },
    summaries: {
      s1: "初期プロトタイプから基幹マルチテナントクラウドまで、INFO TECH MICROSYSTEMSはビジネス目標に最適化された高信頼性システムを構築・保守します。",
      s2: "経験豊富なシニアアーキテクトが貴社プロジェクトに参画し、技術的盲点を排除して市場投入期間の短縮と高品質を両立します。",
      s3: "テスト駆動開発（TDD）、最新クラウドアーキテクチャ、CI/CD自動化など、現場で直ちに役立つコードレベルの企業研修を提供します。",
      s4: "自動リグレッションテスト、高負荷パフォーマンステスト、CIパイプライン品質ゲートにより、本番障害をゼロに近づけます。",
      s5: "表面的な経歴だけでなく、コードレビューや設計審査を通じて実力を確認した即戦力エンジニアをご紹介します。",
      s6: "DORAメトリクス、欠陥流出率、技術的負債の監査を実施し、客観的データに基づくエンジニアリング改善を主導します。",
      s7: "技術貢献度を正当に評価するコンピテンシーモデルを構築し、エンジニアの士気向上と組織の離職防止を支援します。"
    },
    commonDeliverables: [
      "完全なGitコミット履歴とライセンスを含む全ソースコード",
      "アーキテクチャ決定記録（ADR）およびシステム設計仕様書",
      "CI/CD自動デプロイパイプライン（GitHub Actions / GitLab / Azure）",
      "ユニット、統合、E2E自動テストスイート一式",
      "OpenAPI / Swaggerに準拠した対話型APIドキュメント",
      "本番運用マニュアル、デプロイ手順書、障害対応ランブック"
    ]
  },
  ar: {
    taglines: {
      s1: "هندسة شاملة لتطبيقات الويب الحديثة، والأنظمة متعددة الطبقات، والبرمجيات السحابية، وتطبيقات الهاتف، والبنى الدقيقة.",
      s2: "استشارات خبيرة وتنفيذ عملي يغطي تحديد المتطلبات، وهندسة البرمجيات، والاختبارات، والدعم الفني.",
      s3: "تمكين فرق الهندسة من خلال مناهج عملية ومكثفة تغطي أحدث تقنيات التطوير ومعايير الجودة العالمية.",
      s4: "رفع موثوقية البرمجيات عبر استراتيجيات ضمان الجودة المتقدمة وأطر الاختبار المؤتمتة والشاملة.",
      s5: "القضاء على مخاطر التوظيف غير المناسب باختيار وتعيين أفضل الكفاءات الهندسية بإشراف كبار المعماريين.",
      s6: "جعل التميز الهندسي قابلاً للقياس من خلال مؤشرات الأداء (DORA) وتدقيق جودة الأكواد وحوكمة العمليات.",
      s7: "تطوير أطر الكفاءات المهنية وأنظمة التقييم العادلة لتعزيز الرضا الوظيفي والحفاظ على الكفاءات التقنية."
    },
    summaries: {
      s1: "من النماذج الأولية إلى المنصات السحابية المعقدة، تقوم INFO TECH MICROSYSTEMS بتصميم وبناء وصيانة أنظمة برمجية فائقة الأداء.",
      s2: "نقدم قيادة تقنية متقدمة واستشارات استراتيجية لمشاريعك البرمجية لتجاوز العقبات المعمارية وتسريع الإطلاق.",
      s3: "ندرب فرق العمل لديك على منهجيات التطوير الموجه بالاختبار (TDD)، وأتمتة التكامل المستمر (CI/CD)، والبرمجة الآمنة.",
      s4: "نضمن أعلى درجات الاستقرار للبرمجيات من خلال اختبارات الأداء والأتمتة الشاملة وبوابات الجودة الصارمة.",
      s5: "نستقطب المطورين ومهندسي الجودة المعتمدين بعد تقييم دقيق للأكواد والقدرات المعمارية الفعلية.",
      s6: "نؤسس لوحات متابعة فورية لمؤشرات DORA، ونقيس نسب تسرب الأخطاء، ونجري تدقيقات معمارية رسمية.",
      s7: "نبني مسارات وظيفية واضحة ونماذج تقييم موضوعية تسهم في تحفيز المطورين وخفض معدلات الدوران الوظيفي."
    },
    commonDeliverables: [
      "الكود المصدري كاملاً مع سجل Git الشامل وتراخيص الاستخدام",
      "سجلات القرارات المعمارية (ADRs) ومخططات تصميم النظام",
      "إعدادات خطوط الأتمتة والنشر المستمر (GitHub Actions / GitLab / Azure)",
      "حزم الاختبارات المؤتمتة للوحدات والتكامل والاختبار الشامل (E2E)",
      "توثيق تفاعلي لواجهات برمجة التطبيقات (OpenAPI / Swagger)",
      "أدلة التشغيل والنشر وخطط التعافي من الكوارث"
    ]
  },
  hi: {
    taglines: {
      s1: "आधुनिक वेब, एन-टियर, एंटरप्राइज, क्लाउड सास, मोबाइल और माइक्रोसर्विस आर्किटेक्चर की एंड-टू-एंड इंजीनियरिंग।",
      s2: "आवश्यकता विश्लेषण, आर्किटेक्चर, परीक्षण और रखरखाव में विशेषज्ञ परामर्श और व्यावहारिक निष्पादन।",
      s3: "आधुनिक सॉफ्टवेयर विकास के व्यावहारिक पाठ्यक्रमों के साथ अपनी इंजीनियरिंग टीमों को सशक्त बनाएं।",
      s4: "मजबूत गुणवत्ता आश्वासन रणनीतियों और स्वचालित परीक्षण सूट के साथ अपने सॉफ्टवेयर की विश्वसनीयता बढ़ाएं।",
      s5: "वरिष्ठ आर्किटेक्ट्स द्वारा तकनीकी प्रतिभा की सीधी भर्ती और कोड-स्तरीय स्क्रीनिंग।",
      s6: "DORA मेट्रिक्स, कोड गुणवत्ता ऑडिट और साक्ष्य-आधारित शासन के माध्यम से इंजीनियरिंग उत्कृष्टता को मापने योग्य बनाएं।",
      s7: "योग्यता रूपरेखा और पारदर्शी मूल्यांकन के माध्यम से उच्च-प्रदर्शन इंजीनियरिंग प्रतिभा को बनाए रखें।"
    },
    summaries: {
      s1: "प्रारंभिक प्रोटोटाइप से लेकर मिशन-क्रिटिकल मल्टी-टेनेंट क्लाउड प्लेटफॉर्म तक, INFO TECH MICROSYSTEMS उच्च प्रदर्शन सॉफ्टवेयर सिस्टम का निर्माण और रखरखाव करता है।",
      s2: "हम सॉफ्टवेयर पहलों में अनुभवी तकनीकी नेतृत्व जोड़ते हैं ताकि तकनीकी कमियों को समाप्त किया जा सके और समय पर डिलीवरी सुनिश्चित हो।",
      s3: "हम आपकी टीमों को टेस्ट-ड्रिवन डेवलपमेंट (TDD), आधुनिक आर्किटेक्चर और सुरक्षित कोडिंग प्रथाओं में व्यावहारिक प्रशिक्षण देते हैं।",
      s4: "हम स्वचालित रिग्रेशन, लोड परीक्षण और CI/CD गेट्स के साथ सॉफ्टवेयर की अधिकतम स्थिरता सुनिश्चित करते हैं।",
      s5: "हम कठोर तकनीकी साक्षात्कार और कोडिंग मूल्यांकन के माध्यम से योग्य डेवलपर्स और प्रबंधकों की भर्ती करते हैं।",
      s6: "हम DORA मेट्रिक्स डैशबोर्ड स्थापित करते हैं और तकनीकी ऋण व सुरक्षा अनुपालन के औपचारिक ऑडिट करते हैं।",
      s7: "हम स्पष्ट करियर सीढ़ी और प्रदर्शन प्रबंधन मॉडल तैयार करते हैं जिससे इंजीनियरों की संतुष्टि और प्रतिधारण बढ़ता है।"
    },
    commonDeliverables: [
      "पूर्ण गिट इतिहास और लाइसेंसिंग के साथ संपूर्ण सोर्स कोड",
      "आर्किटेक्चर निर्णय रिकॉर्ड (ADRs) और सिस्टम डिजाइन योजनाएं",
      "स्वचालित CI/CD पाइपलाइन कॉन्फ़िगरेशन (GitHub Actions / GitLab / Azure)",
      "स्वचालित यूनिट, इंटीग्रेशन और एंड-टू-एंड टेस्ट सूट",
      "OpenAPI / Swagger विनिर्देशों के साथ इंटरैक्टिव API दस्तावेज़ीकरण",
      "परिनियोजन गाइड, रनबुक और परिचालन रखरखाव नियमावली"
    ]
  },
  pt: {
    taglines: {
      s1: "Engenharia de ponta a ponta em arquiteturas web modernas, n-camadas, corporativas, SaaS em nuvem, mobile e microsserviços.",
      s2: "Consultoria estratégica e execução prática desde a definição de requisitos até suporte e arquitetura.",
      s3: "Capacite seus times de engenharia com treinamentos práticos nas mais recentes tecnologias do mercado.",
      s4: "Eleve a confiabilidade do seu software com estratégias completas de garantia de qualidade e automação de testes.",
      s5: "Elimine falhas de contratação com recrutamento técnico de alto nível liderado por arquitetos experientes.",
      s6: "Torne a excelência da engenharia mensurável por meio de métricas DORA, auditorias de código e governança.",
      s7: "Alinhe a produtividade técnica com metas estratégicas por meio de planos de carreira claros e retenção de talentos."
    },
    summaries: {
      s1: "Do protótipo inicial a plataformas em nuvem multitenant de missão crítica, a INFO TECH MICROSYSTEMS projeta, constrói e mantém softwares de alto desempenho.",
      s2: "Incorporamos liderança técnica sênior e consultoria especializada aos seus projetos para eliminar riscos e garantir excelência técnica.",
      s3: "Treinamos seus engenheiros em desenvolvimento orientado a testes (TDD), arquiteturas modernas e automação de entrega contínua.",
      s4: "Garantimos estabilidade máxima por meio de suítes de testes automatizados, testes de carga e barreiras de qualidade no CI/CD.",
      s5: "Selecionamos desenvolvedores, engenheiros SDET e líderes técnicos através de avaliações profundas de código e arquitetura.",
      s6: "Implementamos painéis executivos de métricas DORA, monitoramento de defeitos e auditorias formais para due diligence.",
      s7: "Estruturamos planos de desenvolvimento transparentes que valorizam o engenheiro e aumentam a retenção da equipe técnica."
    },
    commonDeliverables: [
      "Código-fonte completo com histórico Git detalhado e licenciamento",
      "Registros de Decisões de Arquitetura (ADRs) e esquemas do sistema",
      "Pipelines de CI/CD automatizados (GitHub Actions / GitLab / Azure DevOps)",
      "Suítes de testes automatizados unitários, de integração e end-to-end",
      "Documentação interativa de API de acordo com as especificações OpenAPI / Swagger",
      "Guias de implantação, manuais operacionais e procedimentos de emergência"
    ]
  },
  ru: {
    taglines: {
      s1: "Комплексная разработка современных веб-, многоуровневых, корпоративных, облачных SaaS, мобильных и микросервисных архитектур.",
      s2: "Экспертный консалтинг и практическое внедрение: от сбора требований и архитектуры до сопровождения.",
      s3: "Повышение квалификации инженерных команд с помощью практических курсов по современным технологиям разработки.",
      s4: "Повышение надежности программного обеспечения с помощью комплексных QA-стратегий и автоматизации тестирования.",
      s5: "Исключите ошибки найма с помощью подбора элитных технических специалистов под руководством опытных архитекторов.",
      s6: "Сделайте инженерное совершенство измеримым: метрики DORA, аудит качества кода и технического долга.",
      s7: "Управление эффективностью технических специалистов, прозрачные карьерные матрицы и удержание ключевых кадров."
    },
    summaries: {
      s1: "От прототипа до критически важных многопользовательских облачных платформ: INFO TECH MICROSYSTEMS проектирует, создает и обслуживает высокопроизводительные системы.",
      s2: "Мы привносим опытное техническое руководство и стратегический консалтинг в ваши инициативы, устраняя архитектурные риски.",
      s3: "Обучаем команды разработке через тестирование (TDD), современным микросервисам, CI/CD автоматизации и стандартам безопасности.",
      s4: "Обеспечиваем надежность с помощью сквозных автоматических тестов, нагрузочного тестирования и строгих проверок в CI/CD.",
      s5: "Находим разработчиков, инженеров по автоматизации (SDET) и тимлидов с глубокой проверкой практических навыков кодирования.",
      s6: "Внедряем дашборды метрик DORA, проводим официальные аудиты архитектуры для due diligence и соответствия стандартам.",
      s7: "Создаем объективные матрицы компетенций и программы удержания, повышая вовлеченность и снижая отток ключевых инженеров."
    },
    commonDeliverables: [
      "Полный исходный код с подробной историей Git и лицензиями",
      "Записи архитектурных решений (ADRs) и схемы архитектуры системы",
      "Конфигурации автоматизированных пайплайнов CI/CD (GitHub Actions / GitLab / Azure)",
      "Наборы автоматизированных модульных, интеграционных и сквозных (E2E) тестов",
      "Интерактивная документация API в соответствии со спецификацией OpenAPI / Swagger",
      "Инструкции по развертыванию, руководства по эксплуатации и регламенты инцидентов"
    ]
  },
  bn: {
    taglines: {
      s1: "আধুনিক ওয়েব, মাল্টি-টিয়ার, এন্টারপ্রাইজ, ক্লাউড সাস, মোবাইল এবং মাইক্রোসার্ভিস আর্কিটেকচারের সার্বিক ইঞ্জিনিয়ারিং।",
      s2: "প্রয়োজনীয়তা বিশ্লেষণ, আর্কিটেকচার, টেস্টিং এবং রক্ষণাবেক্ষণে বিশেষজ্ঞ পরামর্শ ও বাস্তবায়ন।",
      s3: "আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং প্রশিক্ষণের মাধ্যমে আপনার প্রযুক্তিগত দলের দক্ষতা বৃদ্ধি করুন।",
      s4: "দৃঢ় গুণমান নিশ্চিতকরণ (QA) কৌশল এবং স্বয়ংক্রিয় পরীক্ষার মাধ্যমে সফটওয়্যারের নির্ভরযোগ্যতা নিশ্চিত করুন।",
      s5: "অভিজ্ঞ আর্কিটেক্টদের পরিচালনায় যাচাইকৃত দক্ষ সফটওয়্যার ইঞ্জিনিয়ার নিয়োগের বিশেষ সেবা।",
      s6: "ডোরা (DORA) মেট্রিক্স, কোড কোয়ালিটি অডিট এবং সুনির্দিষ্ট নির্দেশকের মাধ্যমে ইঞ্জিনিয়ারিং উৎকর্ষ পরিমাপযোগ্য করুন।",
      s7: "দক্ষতা কাঠামো এবং স্বচ্ছ মূল্যায়নের মাধ্যমে কারিগরি দলের সন্তুষ্টি ও দীর্ঘমেয়াদী স্থায়িত্ব বজায় রাখুন।"
    },
    summaries: {
      s1: "প্রাথমিক প্রোটোটাইপ থেকে শুরু করে মিশন-ক্রিটিক্যাল ক্লাউড প্ল্যাটফর্ম পর্যন্ত, INFO TECH MICROSYSTEMS উচ্চ ক্ষমতাসম্পন্ন সফটওয়্যার তৈরি ও পরিচালনা করে।",
      s2: "আমরা সফটওয়্যার প্রকল্পগুলোতে অভিজ্ঞ কারিগরি নেতৃত্ব যুক্ত করি যাতে অন্ধবিশ্বাস দূর হয় এবং দ্রুত নির্ভুল ডেলিভারি সম্ভব হয়।",
      s3: "আমরা টেস্ট-ড্রিভেন ডেভেলপমেন্ট (TDD), আধুনিক ক্লাউড আর্কিটেকচার এবং স্বয়ংক্রিয় CI/CD প্রক্রিয়াতে দলগুলোকে বাস্তব প্রশিক্ষণ দিই।",
      s4: "আমরা স্বয়ংক্রিয় রিগ্রেশন টেস্ট, লোড টেস্টিং এবং উন্নত গেটের মাধ্যমে সফটওয়্যারের সর্বোচ্চ নির্ভরযোগ্যতা নিশ্চিত করি।",
      s5: "আমরা কোডিং পরীক্ষা এবং সিস্টেম ডিজাইন মূল্যায়নের মাধ্যমে দক্ষ ডেভেলপার ও কারিগরি ব্যবস্থাপক নিয়োগ করি।",
      s6: "আমরা এক্সিকিউটিভ DORA মেট্রিক্স ড্যাশবোর্ড স্থাপন করি এবং প্রযুক্তিগত ঋণ ও কোডের নিরপেক্ষ অডিট পরিচালনা করি।",
      s7: "আমরা সুস্পষ্ট ক্যারিয়ার কাঠামো এবং পারফরম্যান্স মডেল তৈরি করি যা ডেভেলপারদের কর্মস্পৃহা বাড়ায় এবং চাকরি ছাড়া রোধ করে।"
    },
    commonDeliverables: [
      "সম্পূর্ণ গিট ইতিহাস এবং লাইসেন্সসহ সম্পূর্ণ সোর্স কোড",
      "আর্কিটেকচার ডিসিশন রেকর্ডস (ADRs) এবং সিস্টেম ডিজাইনের ব্লুপ্রিন্ট",
      "স্বয়ংক্রিয় CI/CD পাইপলাইন কনফিগারেশন (GitHub Actions / GitLab / Azure)",
      "স্বয়ংক্রিয় ইউনিট, ইন্টিগ্রেশন এবং এন্ড-টু-এন্ড টেস্ট স্যুট",
      "OpenAPI / Swagger স্পেসিফিকেশনসহ ইন্টারেক্টিভ API ডকুমেন্টস",
      "প্রোডাকশন ডিপ্লয়মেন্ট নির্দেশিকা এবং অপারেশনাল মেনটেইনেন্স ম্যানুয়াল"
    ]
  }
};

// Apply to each language file
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json' && f !== 'zh.json');

files.forEach(file => {
  const code = file.replace('.json', '');
  const filePath = path.join(localesDir, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const pack = langPacks[code];
  if (!pack) return;

  const servicesContent = {};
  for (let i = 1; i <= 7; i++) {
    const key = `s${i}`;
    const enS = en.servicesContent[key];
    servicesContent[key] = {
      tagline: pack.taglines[key] || enS.tagline,
      summary: pack.summaries[key] || enS.summary,
      fullDescription: enS.fullDescription,
      capabilities: enS.capabilities,
      methodologySteps: enS.methodologySteps,
      keyDeliverables: pack.commonDeliverables,
      useCases: enS.useCases,
      faqs: enS.faqs
    };
  }

  json.servicesContent = servicesContent;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated servicesContent for ${code}`);
});

console.log('All locale packs updated with localized servicesContent!');
