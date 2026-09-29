import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-slate-100/90 text-slate-600 border-t border-slate-200/90 dark:bg-[#050711] dark:text-slate-400 dark:border-cyan-500/20 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background cyber glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Col 1 & 2: Branding & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center space-x-3">
                <img 
                  src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
                  alt="INFO TECH MICROSYSTEMS Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-md">
              <strong className="text-slate-900 dark:text-white font-semibold">INFO TECH MICROSYSTEMS</strong> is an engineering, quality assurance, 
              strategic advisory, and technical talent consultancy based in Ottawa, Ontario, Canada. 
              We architect resilient enterprise software, guarantee quality, track KPIs, and empower teams.
            </p>

            {/* Direct Contact Card */}
            <div className="pt-2 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href="tel:+16132665285" className="hover:text-cyan-700 dark:hover:text-cyan-400 font-semibold text-slate-800 dark:text-slate-200 transition-colors">
                  +1 613 266 5285 (Canada)
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href="mailto:info.tech.microsystems.ca@gmail.com" className="hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
                  info.tech.microsystems.ca@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-3">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-300/80 dark:bg-emerald-950/80 dark:text-emerald-400 dark:border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Accepting New Client Engagements</span>
              </span>
            </div>
          </div>

          {/* Col 3: Services Part 1 */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm uppercase tracking-wider font-mono border-l-2 border-cyan-600 dark:border-cyan-400 pl-2.5 mb-4">
              Core Services (1 - 4)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services/software-development" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  1. Software Product Development & Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services/software-consulting" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  2. Project Lifecycle & Architectural Consulting
                </Link>
              </li>
              <li>
                <Link to="/services/workforce-training" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  3. Workforce & Team Technical Training
                </Link>
              </li>
              <li>
                <Link to="/services/quality-assurance" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  4. Quality Assurance & Test Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services Part 2 */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm uppercase tracking-wider font-mono border-l-2 border-purple-600 dark:border-purple-400 pl-2.5 mb-4">
              Specialized Services (5 - 7)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services/technical-recruitment" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  5. Technical Staffing & Talent Recruitment
                </Link>
              </li>
              <li>
                <Link to="/services/kpis-and-audits" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  6. Software KPIs & Process Audits
                </Link>
              </li>
              <li>
                <Link to="/services/performance-management" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block leading-snug">
                  7. Personnel Performance Management
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/services" className="text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 font-semibold inline-flex items-center space-x-1">
                  <span>View All Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Tools & Quick Navigation */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm uppercase tracking-wider font-mono border-l-2 border-cyan-600 dark:border-cyan-400 pl-2.5 mb-4">
              Tools & Governance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/tools" className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Interactive KPI Calculators</span>
                </Link>
              </li>
              <li>
                <Link to="/tools#qa-audit" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block">
                  QA Strategy & Audit Matrix
                </Link>
              </li>
              <li>
                <Link to="/tools#capacity" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block">
                  Team Staffing & Capacity Estimator
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block">
                  About INFO TECH MICROSYSTEMS
                </Link>
              </li>
              <li>
                <Link to="/about#founder" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block">
                  Leadership (Sudarsha Wijenayake)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors block">
                  Contact Us & Location Map
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} INFO TECH MICROSYSTEMS. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Ottawa, Ontario, Canada</span>
            <span>•</span>
            <span>Phone: +1 613 266 5285</span>
            <span>•</span>
            <a href="mailto:info.tech.microsystems.ca@gmail.com" className="text-cyan-700 dark:text-cyan-400 hover:underline">
              info.tech.microsystems.ca@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
