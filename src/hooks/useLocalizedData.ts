/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { useTranslation } from 'react-i18next';
import { SERVICES_DATA } from '../data/servicesData';
import { CORE_KPIS, AUDIT_CHECKLIST_TEMPLATES } from '../data/kpiData';
import type { ServiceItem, KPIAuditMetric } from '../types';

export function useLocalizedServices(): ServiceItem[] {
  const { t } = useTranslation();

  return SERVICES_DATA.map((service, index) => {
    const sKey = `s${index + 1}`;
    const prefix = `servicesContent.${sKey}`;

    const title = t(`serviceNames.s${index + 1}Title`, service.title);
    const shortTitle = t(`serviceNames.s${index + 1}Short`, service.shortTitle);
    
    // Normalize badge for category lookup
    const badgeKeyMap: Record<string, string> = {
      'Core Engineering': 'coreEngineering',
      'Strategic Advisory': 'strategicAdvisory',
      'Talent Empowerment': 'talentEmpowerment',
      'Quality Engineering': 'qualityEngineering',
      'Talent Acquisition': 'talentAcquisition',
      'Governance & Audits': 'governanceAudits',
      'People Governance': 'peopleGovernance',
    };
    const badgeLookup = badgeKeyMap[service.badge] || service.badge;
    const badge = t(`serviceCategories.${badgeLookup}`, service.badge);

    const tagline = t(`${prefix}.tagline`, service.tagline);
    const summary = t(`${prefix}.summary`, service.summary);

    const localizedFullDesc = t(`${prefix}.fullDescription`, { returnObjects: true, defaultValue: service.fullDescription }) as string[];
    const fullDescription = Array.isArray(localizedFullDesc) ? localizedFullDesc : service.fullDescription;

    const localizedCaps = t(`${prefix}.capabilities`, { returnObjects: true, defaultValue: service.capabilities }) as any[];
    const capabilities = Array.isArray(localizedCaps)
      ? localizedCaps.map((cap, cIdx) => ({
          title: cap?.title || service.capabilities[cIdx]?.title || '',
          description: cap?.description || service.capabilities[cIdx]?.description || '',
          bulletPoints: Array.isArray(cap?.bulletPoints) ? cap.bulletPoints : service.capabilities[cIdx]?.bulletPoints || []
        }))
      : service.capabilities;

    const localizedMeth = t(`${prefix}.methodologySteps`, { returnObjects: true, defaultValue: service.methodologySteps }) as any[];
    const methodologySteps = Array.isArray(localizedMeth)
      ? localizedMeth.map((step, mIdx) => ({
          step: service.methodologySteps[mIdx]?.step || `0${mIdx + 1}`,
          title: step?.title || service.methodologySteps[mIdx]?.title || '',
          description: step?.description || service.methodologySteps[mIdx]?.description || ''
        }))
      : service.methodologySteps;

    const localizedDeliv = t(`${prefix}.keyDeliverables`, { returnObjects: true, defaultValue: service.keyDeliverables }) as string[];
    const keyDeliverables = Array.isArray(localizedDeliv) ? localizedDeliv : service.keyDeliverables;

    const localizedUseCases = t(`${prefix}.useCases`, { returnObjects: true, defaultValue: service.useCases }) as any[];
    const useCases = Array.isArray(localizedUseCases)
      ? localizedUseCases.map((uc, uIdx) => ({
          clientType: uc?.clientType || service.useCases[uIdx]?.clientType || '',
          scenario: uc?.scenario || service.useCases[uIdx]?.scenario || '',
          outcome: uc?.outcome || service.useCases[uIdx]?.outcome || ''
        }))
      : service.useCases;

    const localizedFaqs = t(`${prefix}.faqs`, { returnObjects: true, defaultValue: service.faqs }) as any[];
    const faqs = Array.isArray(localizedFaqs)
      ? localizedFaqs.map((faq, fIdx) => ({
          q: faq?.q || service.faqs[fIdx]?.q || '',
          a: faq?.a || service.faqs[fIdx]?.a || ''
        }))
      : service.faqs;

    return {
      ...service,
      title,
      shortTitle,
      badge,
      tagline,
      summary,
      fullDescription,
      capabilities,
      methodologySteps,
      keyDeliverables,
      useCases,
      faqs,
    };
  });
}

export function useLocalizedAuditTemplates() {
  const { t } = useTranslation();

  return AUDIT_CHECKLIST_TEMPLATES.map((tmpl, index) => {
    const key = `t${index + 1}`;
    const localized = t(`auditChecklistData.${key}`, { returnObjects: true, defaultValue: null }) as any;
    if (localized && localized.title && Array.isArray(localized.items)) {
      return {
        title: localized.title as string,
        items: localized.items as string[],
      };
    }
    return tmpl;
  });
}

export function useLocalizedCoreKPIs(): KPIAuditMetric[] {
  const { t } = useTranslation();

  return CORE_KPIS.map((kpi) => {
    const localized = t(`kpiGlossaryData.${kpi.id}`, { returnObjects: true, defaultValue: null }) as any;
    const cat = t(`kpiCategories.${kpi.category}`, kpi.category) as any;
    if (localized) {
      return {
        ...kpi,
        category: cat,
        name: localized.name || kpi.name,
        description: localized.description || kpi.description,
        targetBenchmark: localized.targetBenchmark || kpi.targetBenchmark,
        calculationFormula: localized.calculationFormula || kpi.calculationFormula,
        businessImpact: localized.businessImpact || kpi.businessImpact,
      };
    }
    return {
      ...kpi,
      category: cat,
    };
  });
}
