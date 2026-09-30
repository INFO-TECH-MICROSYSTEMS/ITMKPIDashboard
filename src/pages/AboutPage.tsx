/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, ShieldCheck, MapPin, Phone, Mail, 
  Target, Code2, Users, ArrowRight 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-500/30 mb-3 font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>{t('aboutPage.badge', 'ABOUT INFO TECH MICROSYSTEMS')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-['Outfit'] mb-4">
          {t('aboutPage.heroTitle', 'Architectural Rigor. Measurable Engineering ROI.')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {t('aboutPage.heroDesc', 'INFO TECH MICROSYSTEMS was founded to close the gap between high-level technology strategy and production-grade software delivery. Based in Ottawa, Ontario, Canada, we partner with enterprises, startups, and public agencies to engineer enduring software solutions.')}
        </p>
      </div>

      {/* Founder Spotlight Card */}
      <section id="founder" className="mb-20">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-50/70 via-white to-purple-50/70 dark:from-slate-900/95 dark:via-[#0d1428]/95 dark:to-slate-900/95 border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Portrait Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur opacity-50 dark:opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-950 p-1.5 border border-cyan-300 dark:border-cyan-400/50 shadow-xl">
                  <img 
                    src="/assets/sudarsha-wijenayake.jpg" 
                    alt="Sudarsha Wijenayake - Founder of INFO TECH MICROSYSTEMS" 
                    className="w-72 h-84 sm:w-80 sm:h-96 object-cover rounded-xl"
                  />
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 text-center border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">{t('founderSpotlight.founderName', 'Sudarsha Wijenayake')}</h3>
                    <p className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-semibold mt-0.5">
                      {t('founderSpotlight.founderRole', 'Founder & Principal Technology Consultant')}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('founderSpotlight.companyName', 'INFO TECH MICROSYSTEMS')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 text-xs font-mono">
                <span>{t('aboutPage.missionBadge', "FOUNDER'S MISSION & PHILOSOPHY")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                {t('aboutPage.missionTitle', "A Practitioner's Commitment to Quality")}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {t('aboutPage.missionP1', '"Throughout my career in software engineering, architecture, and technology leadership, I have observed a recurring industry pitfall: organizations frequently overpay for bloated, brittle software systems because they lack disciplined architectural guidance, shift-left quality assurance, and objective performance metrics."')}
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {t('aboutPage.missionP2', '"I established INFO TECH MICROSYSTEMS to provide a different paradigm. When we partner with a client, we do not simply advise from the sidelines—we embed hands-on technical excellence. Whether we are developing modern microservices, authoring automated test suites, training your development team, or placing high-caliber engineers, our work is governed by verifiable data and transparent accountability."')}
              </p>

              {/* Direct Founder Contact Strip */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/90 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <a href="tel:+16132665285" className="hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-900 dark:text-white font-semibold transition-colors">
                    +1 613 266 5285 ({t('aboutPage.direct', 'Direct')})
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <a href="mailto:info.tech.microsystems.ca@gmail.com" className="hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-900 dark:text-white font-semibold transition-colors">
                    info.tech.microsystems.ca@gmail.com ({t('aboutPage.company', 'Company')})
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <a href="mailto:sudarsha.wijenayake@gmail.com" className="hover:text-purple-600 dark:hover:text-purple-400 text-slate-700 dark:text-slate-300 transition-colors">
                    sudarsha.wijenayake@gmail.com ({t('aboutPage.direct', 'Direct')})
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / 4 Pillars */}
      <section className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 tracking-wider font-bold">
            {t('aboutPage.principlesBadge', 'FOUNDATIONAL PRINCIPLES')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mt-1">
            {t('aboutPage.principlesTitle', 'How INFO TECH MICROSYSTEMS Operates')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: t('aboutPage.pillar1Title', 'Engineering Rigor'),
              desc: t('aboutPage.pillar1Desc', 'We do not take shortcuts. Every codebase, microservice, and test harness is built for maintainability, security, and low total cost of ownership.'),
              icon: Code2
            },
            {
              title: t('aboutPage.pillar2Title', 'Quality as a Culture'),
              desc: t('aboutPage.pillar2Desc', 'Quality is not an afterthought handled at the end of a sprint. We embed automated testing and shift-left verification into every developer workflow.'),
              icon: ShieldCheck
            },
            {
              title: t('aboutPage.pillar3Title', 'Measurable KPIs'),
              desc: t('aboutPage.pillar3Desc', 'We replace subjective feelings with quantifiable benchmarks: DORA metrics, Defect Escape Rates, automated code coverage, and sprint predictability.'),
              icon: Target
            },
            {
              title: t('aboutPage.pillar4Title', 'Workforce Elevation'),
              desc: t('aboutPage.pillar4Desc', 'We leave every client team stronger than we found it through hands-on pairing, comprehensive documentation, and structured training programs.'),
              icon: Users
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ottawa Headquarters Card */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase text-cyan-700 dark:text-cyan-400 font-bold">
              {t('aboutCanadianOps.badge', 'CANADIAN OPERATIONS')}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
              {t('aboutCanadianOps.title', "Headquartered in Canada's Technology Capital")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('aboutCanadianOps.desc', 'Situated in Ottawa, Ontario—one of North America’s premier tech hubs—INFO TECH MICROSYSTEMS combines local, in-person accountability with seamless remote delivery across Canada, the United States, and international enterprises.')}
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono pt-2">
              {t('aboutCanadianOps.corpOffice', 'Corporate Office: 113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7')}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{t('header.requestConsultation', 'Schedule an In-Person or Virtual Meeting')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
