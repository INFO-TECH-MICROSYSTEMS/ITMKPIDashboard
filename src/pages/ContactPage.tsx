import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from '../components/ContactForm';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-500/30 mb-3 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('contactPage.badge', 'DIRECT EXECUTIVE COMMUNICATION')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-['Outfit'] mb-4">
          {t('contactPage.title', 'Contact INFO TECH MICROSYSTEMS')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          {t('contactPage.description', 'Reach out directly to Principal Consultant Sudarsha Wijenayake to discuss your software engineering, quality assurance, training, staffing, or audit requirements.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Contact Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900/90 dark:to-[#0a0f25] border border-slate-200 dark:border-cyan-500/30 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] border-b border-slate-200 dark:border-slate-800 pb-3">
              {t('contactPage.corpCardTitle', 'Corporate Contact Information')}
            </h2>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  {t('contactPage.officeAddress', 'Office Address')}
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1 leading-snug">
                  113 Whernside Terrace
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Ottawa, Ontario, Canada
                </p>
                <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400 mt-0.5">
                  {t('contactPage.postalCode', 'Postal Code: K2W0C7')}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  {t('contactPage.telephone', 'Telephone (Canada)')}
                </span>
                <a 
                  href="tel:+16132665285"
                  className="text-base font-bold text-cyan-700 dark:text-cyan-300 hover:underline mt-1 inline-block transition-colors font-mono"
                >
                  +1 613 266 5285
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('contactPage.countryCode', 'Country Code: +1 (Canadian Domestic & International)')}
                </p>
              </div>
            </div>

            {/* Company Email */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  {t('contactPage.companyEmailLabel', 'Company Inquiries Email')}
                </span>
                <a 
                  href="mailto:info.tech.microsystems.ca@gmail.com"
                  className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 hover:underline mt-1 inline-block transition-colors break-all"
                >
                  info.tech.microsystems.ca@gmail.com
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('contactPage.generalInquiries', 'General & Project Inquiries')}
                </p>
              </div>
            </div>

            {/* Principal Consultant Email */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  {t('contactPage.principalEmailLabel', 'Principal Consultant Direct')}
                </span>
                <a 
                  href="mailto:sudarsha.wijenayake@gmail.com"
                  className="text-sm font-semibold text-purple-700 dark:text-purple-300 hover:underline mt-1 inline-block transition-colors break-all"
                >
                  sudarsha.wijenayake@gmail.com
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('contactPage.attnSudarsha', 'Attn: Sudarsha Wijenayake (Founder)')}
                </p>
              </div>
            </div>

            {/* Hours & Timezone */}
            <div className="flex items-start space-x-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                  {t('contactPage.operatingTimezone', 'Operating Timezone')}
                </span>
                <p className="text-slate-900 dark:text-white font-medium">
                  {t('contactPage.estTimezone', 'Eastern Standard Time (EST / EDT) • Ottawa, ON')}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('contactPage.hours', 'Monday – Friday: 8:30 AM – 6:00 PM EST')}
                </p>
                <div className="inline-flex items-center space-x-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{t('contactPage.emergencySla', '24/7 SLA Emergency Support available for contracted clients')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ottawa Location Map Preview Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">
                {t('contactPage.locationPreview', 'Location Preview')}
              </span>
              <a 
                href="https://maps.google.com/?q=113+Whernside+Terrace,+Ottawa,+Ontario,+Canada,+K2W0C7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline flex items-center space-x-1 font-mono"
              >
                <span>{t('contactPage.openGoogleMaps', 'Open in Google Maps')}</span>
                <ExternalLink className="w-3 h-3 rtl:rotate-180" />
              </a>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-center">
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
                <div className="font-bold text-slate-900 dark:text-white mb-1">
                  {t('contactPage.hqTitle', 'INFO TECH MICROSYSTEMS Headquarters')}
                </div>
                <div className="text-slate-600 dark:text-slate-400">113 Whernside Terrace, Ottawa, ON K2W0C7, Canada</div>
                <div className="mt-2 text-cyan-700 dark:text-cyan-400 font-mono">
                  {t('contactPage.kanataTech', 'Kanata North Technology Corridor')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
