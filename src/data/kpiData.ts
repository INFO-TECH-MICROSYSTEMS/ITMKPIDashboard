import type { KPIAuditMetric } from '../types';

export const CORE_KPIS: KPIAuditMetric[] = [
  {
    id: 'kpi-df',
    category: 'DORA',
    name: 'Deployment Frequency (DF)',
    description: 'How often your organization successfully releases code to production or operational environments.',
    targetBenchmark: 'Elite: Multiple deploys per day | High: Once per week to once per month',
    calculationFormula: 'Total successful production deployments / Time period (days or weeks)',
    businessImpact: 'Faster time-to-market, smaller blast radius per release, and accelerated client feedback loops.'
  },
  {
    id: 'kpi-ltc',
    category: 'DORA',
    name: 'Lead Time for Changes (LTFC)',
    description: 'The amount of time it takes for a code commit to successfully run in production.',
    targetBenchmark: 'Elite: Less than 1 hour | High: One day to one week',
    calculationFormula: 'Timestamp of production release - Timestamp of first commit on branch',
    businessImpact: 'Minimizes stale branches, simplifies merge conflict resolution, and delivers features rapidly.'
  },
  {
    id: 'kpi-cfr',
    category: 'DORA',
    name: 'Change Failure Rate (CFR)',
    description: 'The percentage of deployments causing a degradation in service that requires remediation (e.g., hotfix or rollback).',
    targetBenchmark: 'Elite: 0% - 5% | High: 5% - 15%',
    calculationFormula: '(Number of failed production deployments / Total deployments) * 100',
    businessImpact: 'Reduces operational downtime, preserves client trust, and shields developers from emergency firefighting.'
  },
  {
    id: 'kpi-mttr',
    category: 'DORA',
    name: 'Mean Time to Restore (MTTR)',
    description: 'How long it takes to recover from an unplanned failure or critical incident in production.',
    targetBenchmark: 'Elite: Less than 1 hour | High: Less than 1 day',
    calculationFormula: 'Total downtime spent on critical production incidents / Number of incidents',
    businessImpact: 'Protects business continuity, enforces strict contractual SLAs, and reduces financial penalties.'
  },
  {
    id: 'kpi-der',
    category: 'QA & Testing',
    name: 'Defect Escape Rate (DER)',
    description: 'The percentage of bugs discovered in production by end users versus during internal QA.',
    targetBenchmark: 'Optimal: < 3% of total identified bugs',
    calculationFormula: '(Bugs found in Production / (Bugs found in QA + Bugs found in Production)) * 100',
    businessImpact: 'Direct indicator of test suite effectiveness and pre-release verification rigor.'
  },
  {
    id: 'kpi-dre',
    category: 'QA & Testing',
    name: 'Defect Removal Efficiency (DRE)',
    description: 'The proportion of defects found and eliminated prior to release to production.',
    targetBenchmark: 'Optimal: > 95%',
    calculationFormula: '(Defects found before release / Total defects found before & after release) * 100',
    businessImpact: 'Demonstrates QA maturity and safeguards customer satisfaction.'
  },
  {
    id: 'kpi-tcov',
    category: 'QA & Testing',
    name: 'Automated Test Coverage (Unit & Integration)',
    description: 'The proportion of application codebase branches validated by automated tests.',
    targetBenchmark: 'Optimal: 80% - 90% branch coverage',
    calculationFormula: '(Executed code branches during test / Total code branches) * 100',
    businessImpact: 'Provides psychological safety for refactoring and accelerates release cadence.'
  },
  {
    id: 'kpi-tdr',
    category: 'Code Quality',
    name: 'Technical Debt Ratio (TDR)',
    description: 'The estimated cost of fixing maintainability issues compared to the cost of rewriting the software.',
    targetBenchmark: 'Optimal: < 5% (SonarQube Grade A rating)',
    calculationFormula: '(Remediation effort in hours * Developer hourly rate) / Total development cost',
    businessImpact: 'Prevents architectural rot, slashes ongoing maintenance costs, and speeds feature velocity.'
  },
  {
    id: 'kpi-sp',
    category: 'Process & Governance',
    name: 'Sprint Predictability Index (SPI)',
    description: 'Ratio of committed story points versus completed story points per sprint.',
    targetBenchmark: 'Optimal: 85% - 100%',
    calculationFormula: '(Completed story points / Planned committed story points) * 100',
    businessImpact: 'Enables reliable product roadmapping and stakeholder budgeting accuracy.'
  },
  {
    id: 'kpi-eng-ret',
    category: 'Team & Talent',
    name: 'Engineering Retention & Satisfaction Rate',
    description: 'Percentage of high-performing technical staff retained over a 12-month period.',
    targetBenchmark: 'Optimal: > 92% annual retention',
    calculationFormula: '(Retained key engineering personnel / Total engineering personnel) * 100',
    businessImpact: 'Preserves institutional domain knowledge and eliminates expensive recruitment cycles.'
  }
];

export const AUDIT_CHECKLIST_TEMPLATES = [
  {
    title: 'Software Architecture & Scalability Audit',
    items: [
      'Layered separation of concerns (Presentation, Business Logic, Data Access)',
      'Stateless microservices / container scalability configurations',
      'Database connection pooling, indexing, and query performance profiles',
      'API rate limiting, authentication (OAuth2/OIDC), and payload validation',
      'Fault tolerance mechanisms (Circuit breakers, bulkheads, exponential backoff)',
      'Infrastructure as Code (IaC) versioning in source control'
    ]
  },
  {
    title: 'Quality Assurance & Test Automation Audit',
    items: [
      'Documented Master Test Strategy covering Unit, API, UI, and Security testing',
      'CI/CD automated regression execution triggered on pull requests',
      'Defect triage workflow with defined severity (P1-P4) SLAs',
      'Automated test result dashboards with flaky test quarantine protocols',
      'Cross-browser and mobile device compatibility verification matrices',
      'Performance / load testing baseline under peak concurrent user simulations'
    ]
  },
  {
    title: 'Security, Compliance & Audit Trail Matrix',
    items: [
      'Static Application Security Testing (SAST) and Dependency scanning in CI',
      'Data encryption standards: TLS 1.3 in-transit and AES-256 at-rest',
      'Role-Based Access Control (RBAC) and least-privilege credential governance',
      'Comprehensive audit logging for user access, transactions, and admin actions',
      'Automated database backup schedules with verified recovery drills',
      'Disaster Recovery (DR) RTO (< 1 hour) and RPO (< 15 mins) compliance'
    ]
  },
  {
    title: 'Engineering Process & Governance Audit',
    items: [
      'Pull request review policy requiring peer review and green CI checks',
      'Standardized branching strategy (Trunk-based or GitFlow)',
      'Sprint burndown tracking and retrospective action item resolution rate',
      'Comprehensive developer onboarding documentation and sandbox runbooks',
      'Documented API specifications (OpenAPI / Swagger) kept in sync with code',
      'Technical debt backlog with dedicated 15-20% sprint capacity allocation'
    ]
  }
];
