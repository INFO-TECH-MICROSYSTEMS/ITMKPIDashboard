import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Cpu, Code2, 
  Compass, GraduationCap, UserCheck, BarChart3, TrendingUp, Sparkles, 
  ChevronDown, ChevronUp, Check, Target
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocalizedServices } from '../hooks/useLocalizedData';
import { ContactForm } from '../components/ContactForm';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Compass,
  GraduationCap,
  Cpu,
  UserCheck,
  BarChart3,
  TrendingUp,
};

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const services = useLocalizedServices();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const serviceIndex = services.findIndex((s) => s.slug === slug);
  const service = services[serviceIndex];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const prevService = serviceIndex > 0 ? services[serviceIndex - 1] : null;
  const nextService = serviceIndex < services.length - 1 ? services[serviceIndex + 1] : null;
  const IconComponent = iconMap[service.iconName] || Cpu;

  const serviceShortTitle = service.shortTitle;
  const serviceFullTitle = service.title;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-8 font-mono">
        <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          {t('nav.home', 'Home')}
        </Link>
        <span>/</span>
        <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          {t('nav.services', 'Services')}
        </Link>
        <span>/</span>
        <span className="text-cyan-700 dark:text-cyan-400 font-semibold truncate max-w-xs">{serviceShortTitle}</span>
      </nav>

      {/* Hero Banner for this Dedicated Service */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-50/70 via-white to-purple-50/70 dark:from-slate-900/95 dark:via-[#0d142b]/95 dark:to-slate-900/95 border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl mb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 text-xs font-mono font-bold">
            {t('serviceDetail.servicePrefix', 'SERVICE 0')}{serviceIndex + 1} {t('serviceDetail.ofSeven', 'OF 07')}
          </span>
          <span className="px-3 py-1 rounded-md bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-xs font-mono">
            {t(`serviceCategories.${service.badge.toLowerCase().replace(/[^a-z0-9]/g, '')}`, service.badge)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-9 space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-['Outfit'] leading-tight">
              {serviceFullTitle}
            </h1>
            <p className="text-lg sm:text-xl text-cyan-700 dark:text-cyan-300 font-medium">
              {service.tagline}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {service.summary}
            </p>
          </div>

          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cyan-50 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:via-blue-600/20 dark:to-purple-600/20 border-2 border-cyan-300 dark:border-cyan-400/50 flex items-center justify-center text-cyan-600 dark:text-cyan-300 shadow-md dark:shadow-xl dark:shadow-cyan-500/20">
              <IconComponent className="w-12 h-12" />
            </div>
          </div>
        </div>

        {/* Quick Nav Anchor Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3 text-xs font-mono">
          <a href="#capabilities" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800 shadow-sm">
            {t('serviceDetail.navCapabilities', '↓ Capabilities')}
          </a>
          <a href="#methodology" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800 shadow-sm">
            {t('serviceDetail.navMethodology', '↓ Methodology')}
          </a>
          <a href="#deliverables" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800 shadow-sm">
            {t('serviceDetail.navDeliverables', '↓ Deliverables & KPIs')}
          </a>
          <a href="#inquiry" className="px-3 py-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-950 text-white dark:text-cyan-300 hover:opacity-90 border border-cyan-600 dark:border-cyan-500/40 font-bold shadow-sm">
            {t('serviceDetail.navRequest', '↓ Request This Service')}
          </a>
        </div>
      </div>

      {/* In-depth Full Description */}
      <section className="mb-14 p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-4 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <span>{t('serviceDetail.overviewTitle', 'Executive Overview & Technical Depth')}</span>
        </h2>
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {service.fullDescription.map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Core Capabilities Breakdown */}
      <section id="capabilities" className="mb-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 tracking-wider font-bold">
            {t('serviceDetail.capabilitiesScope', 'Scope of Execution')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
            {t('serviceDetail.capabilitiesTitle', 'Detailed Capabilities & Specializations')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.capabilities.map((cap, cIdx) => (
            <div 
              key={cIdx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/30 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {cap.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {cap.description}
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-3">
                {cap.bulletPoints.map((bp, bIdx) => (
                  <li key={bIdx} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Methodology */}
      <section id="methodology" className="mb-16 p-8 sm:p-10 rounded-3xl bg-slate-100/70 dark:bg-[#090d1f] border border-slate-200 dark:border-cyan-500/20 shadow-sm">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 tracking-wider font-bold">
            {t('serviceDetail.methodologyBadge', 'Rigorous Methodology')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
            {t('serviceDetail.methodologyTitle', 'How We Deliver High-Reliability Results')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.methodologySteps.map((step, sIdx) => (
            <div key={sIdx} className="p-5 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 relative group hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all shadow-sm">
              <span className="text-3xl font-black text-cyan-600/30 dark:text-cyan-500/30 font-mono block mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400/60 transition-colors">
                {step.step}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 font-['Outfit']">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables & Relevant KPIs */}
      <section id="deliverables" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Deliverables */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              {t('serviceDetail.verifiedDeliverables', 'Standard Deliverables Checklist')}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            {t('serviceDetailSections.checklistSubtitle', 'Clear, verifiable artifacts and tangible documentation produced during this engagement.')}
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {service.keyDeliverables.map((del, dIdx) => (
              <li key={dIdx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0"></span>
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* KPIs & Benchmark Targets */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              {t('serviceDetail.governedKpis', 'Governing KPIs & Target Benchmarks')}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            {t('serviceDetailSections.governedKpisSubtitle', 'Quantifiable metrics we track to guarantee return on investment and engineering health.')}
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {service.relevantKPIs.map((kpi, kIdx) => (
              <li key={kIdx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span className="font-mono text-cyan-700 dark:text-cyan-300 font-medium">{kpi}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech Stack & Tooling Pills */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#080c1e] border border-slate-200 dark:border-cyan-500/20 mb-16 text-center shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] mb-3">
          {t('serviceDetailSections.technologiesTitle', 'Technologies & Ecosystems Utilized in This Service')}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {service.technologies.map((tech, tIdx) => (
            <span key={tIdx} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-cyan-700 dark:text-cyan-300 font-mono text-xs shadow-sm">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-6 text-center">
          {t('serviceDetailSections.scenariosTitle', 'Real-World Engagement Scenarios')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.useCases.map((uc, uIdx) => (
            <div key={uIdx} className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 px-2.5 py-1 rounded bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30">
                {t('serviceDetailSections.clientLabel', 'Client')}: {uc.clientType}
              </span>
              <div>
                <span className="text-xs uppercase text-slate-500 dark:text-slate-400 font-bold block mb-1">
                  {t('serviceDetailSections.scenarioLabel', 'Scenario / Challenge:')}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{uc.scenario}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <span className="text-xs uppercase text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                  {t('serviceDetailSections.outcomeLabel', 'Measurable Outcome:')}
                </span>
                <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200/90 font-medium">{uc.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-6 text-center">
          {t('serviceDetailSections.faqsTitle', 'Frequently Asked Questions')}
        </h3>
        <div className="space-y-3">
          {service.faqs.map((faq, fIdx) => (
            <div 
              key={fIdx}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === fIdx ? null : fIdx)}
                className="w-full p-4 text-left rtl:text-right flex justify-between items-center text-sm font-semibold text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaqIndex === fIdx ? <ChevronUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaqIndex === fIdx && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Direct Service Inquiry Form Section */}
      <section id="inquiry" className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 tracking-wider font-bold">
            {t('serviceDetailSections.startEngagement', 'Start Engagement')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
            {t('serviceDetail.ctaTitle', 'Ready to Engage on This Service?')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            {t('serviceDetail.ctaDesc', 'Submit an inquiry directly for this offering or speak with Sudarsha Wijenayake to discuss timeline, architecture, or resource allocation.')}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <ContactForm defaultService={service.title} />
        </div>
      </section>

      {/* Next & Previous Service Navigation */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-mono">
        {prevService ? (
          <Link 
            to={`/services/${prevService.slug}`}
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span className="hidden sm:inline">{t('serviceDetail.previousService', 'Previous Service')}:</span>
            <span className="font-semibold">{t(`serviceNames.s${serviceIndex}Short`, prevService.shortTitle)}</span>
          </Link>
        ) : <div />}

        {nextService ? (
          <Link 
            to={`/services/${nextService.slug}`}
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <span className="hidden sm:inline">{t('serviceDetail.nextService', 'Next Service')}:</span>
            <span className="font-semibold">{t(`serviceNames.s${serviceIndex + 2}Short`, nextService.shortTitle)}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        ) : (
          <Link 
            to="/services/software-development"
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <span>{t('serviceDetail.allServices', 'All Services')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        )}
      </div>
    </div>
  );
};
