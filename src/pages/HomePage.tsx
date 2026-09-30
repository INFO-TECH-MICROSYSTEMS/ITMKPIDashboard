import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Cpu, Code2, Compass, 
  GraduationCap, UserCheck, BarChart3, TrendingUp, Sparkles, MapPin, 
  Phone, Mail, Layers, Award, Wrench, ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocalizedServices } from '../hooks/useLocalizedData';
import { useTheme } from '../context/ThemeContext';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Compass,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  BarChart3,
  TrendingUp,
};

export const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const services = useLocalizedServices();

  return (
    <div className="relative overflow-hidden">
      {/* Background Circuit & Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 circuit-pattern opacity-40"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-20 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:border-cyan-500/30 dark:text-cyan-300 mb-6 backdrop-blur-md shadow-sm dark:shadow-lg dark:shadow-cyan-950/30 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping"></span>
            <span>{t('hero.pill', 'ENTERPRISE SOFTWARE • QA EXCELLENCE • STRATEGIC ADVISORY')}</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-[1.1] mb-6">
            {t('hero.titlePart1', 'Architecting Resilient Software.')} <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t('hero.titlePart2', 'Empowering High-Velocity Teams.')}
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            <strong className="text-slate-900 dark:text-white">INFO TECH MICROSYSTEMS (ITM)</strong>{' '}
            {t('hero.subtitle', 'provides end-to-end software development, hands-on project consulting, workforce training, automated QA frameworks, technical talent acquisition, software KPIs, and performance governance.')}
          </p>

          {/* Quick Location & Direct Phone Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-10">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{t('hero.ottawaLocation', 'Ottawa, Ontario, Canada')}</span>
            </div>
            <a 
              href="tel:+16132665285"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
              aria-label="Direct Telephone"
            >
              <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="font-semibold">+1 613 266 5285</span>
            </a>
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>{t('hero.standards', 'Enterprise Delivery Standards')}</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-cyan-600/25 transition-all duration-300 group cursor-pointer"
            >
              <span>{t('hero.exploreServices', 'Explore All 7 Services')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>

            <Link
              to="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-cyan-700 dark:hover:white border border-slate-200 dark:border-cyan-500/30 hover:border-cyan-400 font-semibold text-base transition-all duration-300 shadow-sm dark:shadow-lg cursor-pointer"
            >
              <Wrench className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span>{t('hero.interactiveTools', 'Interactive KPI & QA Tools')}</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white border border-slate-200 dark:border-slate-800 font-semibold text-base transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>{t('hero.contactSudarsha', 'Contact Sudarsha')}</span>
            </Link>
          </div>
        </div>

        {/* Brand Banner Display */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl overflow-hidden p-2 sm:p-3 bg-gradient-to-r from-cyan-200/50 via-blue-100/40 to-purple-200/50 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-purple-500/20 border border-cyan-200 dark:border-cyan-500/30 shadow-xl">
          <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center p-4 sm:p-8">
            <img 
              src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
              alt="INFO TECH MICROSYSTEMS Banner" 
              className="w-full max-h-56 object-contain filter drop-shadow-[0_0_25px_rgba(0,180,216,0.25)] dark:drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]"
            />
          </div>
        </div>

        {/* Quick Numbers / Metrics Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: t('metrics.coreServices', 'Core Services'), val: t('metrics.coreServicesVal', '7 Dedicated'), desc: t('metrics.coreServicesDesc', 'From architecture to performance') },
            { label: t('metrics.qualityStandard', 'Quality Standard'), val: t('metrics.qualityStandardVal', '99.8%'), desc: t('metrics.qualityStandardDesc', 'Pre-production defect prevention') },
            { label: t('metrics.engineeringStack', 'Engineering Stack'), val: t('metrics.engineeringStackVal', 'Cloud & Microservices'), desc: t('metrics.engineeringStackDesc', 'AWS, Azure, .NET, React, K8s') },
            { label: t('metrics.locationBase', 'Location Base'), val: t('metrics.locationBaseVal', 'Ottawa, Canada'), desc: t('metrics.locationBaseDesc', 'National & international delivery') },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-sm text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400 font-['Outfit']">{item.val}</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">{item.label}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The 7 Dedicated Services Section */}
      <section className="relative z-10 py-16 bg-slate-100/70 dark:bg-[#080c1d] border-y border-slate-200 dark:border-cyan-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-500/30 mb-2 font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>{t('homeServices.badge', 'COMPREHENSIVE CAPABILITIES')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                {t('homeServices.title', '7 Specialized Software & Talent Services')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                {t('homeServices.description', 'Each service is backed by dedicated methodologies, verifiable KPIs, automated toolchains, and seasoned technical leadership.')}
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-cyan-700 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold text-sm group"
            >
              <span>{t('homeServices.exploreDirectory', 'Explore Detailed Service Directory')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>
          </div>

          {/* Grid of the 7 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Cpu;
              const serviceShort = service.shortTitle;
              return (
                <div 
                  key={service.id}
                  className="rounded-2xl p-6 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-cyan-500/10 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Service Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
                        {t('homeServices.servicePrefix', 'SERVICE 0')}{index + 1}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-purple-600/20 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                      {serviceShort}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {service.summary}
                    </p>

                    {/* Key Highlights Bullet points */}
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-6 border-t border-slate-200 dark:border-slate-800/80 pt-3">
                      {service.keyDeliverables.slice(0, 3).map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-xs font-semibold text-cyan-700 hover:text-cyan-800 dark:bg-slate-950/80 dark:hover:bg-cyan-950/60 dark:border-slate-800 dark:hover:border-cyan-500/40 dark:text-cyan-400 dark:group-hover:text-white transition-all"
                  >
                    <span>{t('homeServices.viewSpecifications', 'View Dedicated Page & Specifications')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                  </Link>
                </div>
              );
            })}

            {/* 8th Card: Interactive Tools Promo Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-50 via-white to-purple-50 dark:from-cyan-950/40 dark:via-slate-900 dark:to-purple-950/40 border border-cyan-200 dark:border-cyan-400/40 shadow-sm dark:shadow-xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-xs font-mono font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('toolsPromo.badge', 'ONLINE AUDIT SUITE')}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-2">
                  {t('toolsPromo.title', 'Interactive KPIs, Tools & Maturity Calculators')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {t('toolsPromo.description', 'Evaluate your software project health instantly using our online DORA metrics calculator, QA strategy maturity auditor, and staffing capacity estimator.')}
                </p>
                <div className="space-y-2 text-xs text-cyan-700 dark:text-cyan-300">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                    <span>{t('toolsPromo.bullet1', 'DORA Metrics & Velocity Health Score')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                    <span>{t('toolsPromo.bullet2', 'Automated QA & Security Audit Matrix')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
                    <span>{t('toolsPromo.bullet3', 'Team Capacity & Resource Modeling')}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/tools"
                className="mt-6 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>{t('toolsPromo.launchSuite', 'Launch Interactive Tools Suite')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founder Spotlight Section */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-50/70 via-white to-purple-50/70 dark:from-slate-900/90 dark:via-[#0d1326]/95 dark:to-slate-900/90 border border-slate-200 dark:border-cyan-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Portrait with frame */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-50 dark:opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-950 p-1 border border-cyan-300 dark:border-cyan-400/40 shadow-xl">
                  <img 
                    src="/assets/sudarsha-wijenayake.jpg" 
                    alt="Sudarsha Wijenayake - Founder of INFO TECH MICROSYSTEMS" 
                    className="w-64 h-72 sm:w-72 sm:h-80 object-cover rounded-xl"
                  />
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/95 text-center border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-slate-900 dark:text-white font-bold text-base font-['Outfit']">{t('founderSpotlight.founderName', 'Sudarsha Wijenayake')}</h4>
                    <p className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-semibold">{t('founderSpotlight.founderRole', 'Founder & Principal Technology Consultant')}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t('founderSpotlight.companyName', 'INFO TECH MICROSYSTEMS')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Message & Credentials */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-500/30 font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>{t('founderSpotlight.badge', 'EXECUTIVE CONSULTING & RIGOR')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                {t('founderSpotlight.title', 'Leadership Grounded in Deep Technical Competence')}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {t('founderSpotlight.quote', '"At INFO TECH MICROSYSTEMS, our philosophy is anchored in tangible engineering excellence. Whether we are writing complex cloud-native microservices, designing fail-safe automated QA frameworks, recruiting specialized technical personnel, or establishing board-level software KPIs, we bring an uncompromising dedication to precision, transparency, and client ROI."')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {t('founderSpotlight.bio', 'Based out of Ottawa, Ontario, Sudarsha leads INFO TECH MICROSYSTEMS with decades of hands-on software development, enterprise architecture, quality engineering, and technical workforce mentorship.')}
              </p>

              {/* Contact Direct Strip */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <a 
                  href="tel:+16132665285" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-cyan-500/30 text-slate-800 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{t('founderSpotlight.callFounder', 'Call Sudarsha: +1 613 266 5285')}</span>
                </a>
                <a 
                  href="mailto:sudarsha.wijenayake@gmail.com" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/30 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>sudarsha.wijenayake@gmail.com</span>
                </a>
                <Link
                  to="/about"
                  className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <span>{t('founderSpotlight.readFullBio', 'Read Full Bio & Methodology')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Modern Technologies Section */}
      <section className="relative z-10 py-16 bg-white dark:bg-[#060814] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 mb-2 font-bold">
            {t('techStack.badge', 'MODERN TOOLCHAINS & ECOSYSTEMS')}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-8">
            {t('techStack.title', 'Engineered with the Latest Technologies')}
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
            {[
              'React 19 & Next.js', 'TypeScript', 'Node.js & Express', '.NET Core 8', 
              'Python & FastAPI', 'Java Spring Boot', 'Kubernetes & Docker', 
              'AWS Cloud & Lambda', 'Microsoft Azure', 'Google Cloud Platform (GCP)',
              'PostgreSQL & MongoDB', 'Redis & Kafka', 'Playwright & Cypress', 
              'k6 Load Testing', 'DORA Metrics', 'SonarQube Quality Gates', 'CI/CD Pipelines'
            ].map((tech, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 text-xs font-mono transition-colors shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA & Direct Consultation Banner */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-100/80 via-blue-50 to-purple-100/80 dark:from-cyan-900/40 dark:via-blue-900/30 dark:to-purple-900/40 border border-cyan-200 dark:border-cyan-400/30 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-4">
              {t('ctaSection.title', 'Ready to Upgrade Your Software Operations?')}
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mb-8">
              {t('ctaSection.description', 'Connect directly with INFO TECH MICROSYSTEMS for software product development, strategic project consulting, QA automation, workforce upskilling, staffing, or engineering audits.')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/25 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{t('ctaSection.contactButton', 'Contact Sudarsha Wijenayake')}</span>
              </Link>
              <a
                href="tel:+16132665285"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-white border border-slate-300 dark:border-cyan-500/30 font-semibold text-sm transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>{t('ctaSection.callButton', 'Call +1 613 266 5285')}</span>
              </a>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-6">
              {t('ctaSection.address', '113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
