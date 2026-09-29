export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  iconName: string;
  summary: string;
  fullDescription: string[];
  capabilities: {
    title: string;
    description: string;
    bulletPoints: string[];
  }[];
  methodologySteps: {
    step: string;
    title: string;
    description: string;
  }[];
  keyDeliverables: string[];
  relevantKPIs: string[];
  technologies: string[];
  useCases: {
    clientType: string;
    scenario: string;
    outcome: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export interface KPIAuditMetric {
  id: string;
  category: 'DORA' | 'Code Quality' | 'QA & Testing' | 'Process & Governance' | 'Team & Talent';
  name: string;
  description: string;
  targetBenchmark: string;
  calculationFormula: string;
  businessImpact: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceRequested: string;
  urgency: 'Immediate' | 'Within 1-2 Weeks' | 'Within 1 Month' | 'Exploratory';
  budgetRange?: string;
  message: string;
}
