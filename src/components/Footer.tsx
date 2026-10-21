/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-100/90 text-slate-600 border-t border-slate-200/90 dark:bg-[#050711] dark:text-slate-400 dark:border-cyan-500/20 pt-10 pb-8 relative overflow-hidden transition-colors duration-300">
      {/* Background cyber glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Branding & Overview */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <img 
                src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
                alt="ITM Logo" 
                className="h-9 w-auto object-contain"
              />
              <span className="font-extrabold text-sm tracking-wide bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent font-['Outfit']">
                INFO TECH MICROSYSTEMS — KPI PLATFORM
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-xl">
              Enterprise Quality Engineering, Automated Defect Governance, Gating, and Predictive Data Mining Platform.
            </p>
          </div>

          {/* Direct Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Ottawa, Ontario, Canada</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <a href="tel:+16132665285" className="hover:text-cyan-700 dark:hover:text-cyan-400 font-semibold text-slate-800 dark:text-slate-200 transition-colors">
                +1 613 266 5285
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <a href="mailto:info.tech.microsystems.ca@gmail.com" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
                info.tech.microsystems.ca@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-2 md:space-y-0">
          <div>
            © {currentYear} INFO TECH MICROSYSTEMS. {t('footer.allRightsReserved', 'All rights reserved.')}
          </div>
          <div className="flex items-center space-x-4">
            <span>Quality Engineering & Process Audits</span>
            <span>•</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400">ITMKPIDashboard v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
