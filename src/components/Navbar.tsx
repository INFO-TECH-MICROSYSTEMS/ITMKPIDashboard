import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, ChevronDown, Phone, Mail, 
  Code2, Compass, GraduationCap, ShieldCheck, UserCheck, BarChart3, TrendingUp,
  Cpu, Wrench
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SERVICES_DATA } from '../data/servicesData';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Compass,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  BarChart3,
  TrendingUp,
};

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 backdrop-blur-xl border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm dark:border-cyan-500/20 dark:bg-[#070913]/95 dark:text-slate-100 dark:shadow-cyan-950/20">
      {/* Top Banner with Contact & Location */}
      <div className="bg-slate-100 border-b border-slate-200 text-slate-600 dark:bg-gradient-to-r dark:from-slate-950 dark:via-cyan-950/40 dark:to-slate-950 dark:border-cyan-500/10 dark:text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ottawa, Ontario, Canada (EST/EDT)</span>
            </span>
            <span className="text-slate-400 hidden lg:inline">|</span>
            <span className="text-slate-500 dark:text-slate-400 hidden lg:inline">113 Whernside Terrace, Ottawa, ON K2W0C7</span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+16132665285" 
              className="flex items-center space-x-1.5 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="font-semibold">+1 613 266 5285</span>
            </a>
            <a 
              href="mailto:info.tech.microsystems.ca@gmail.com" 
              className="flex items-center space-x-1.5 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>info.tech.microsystems.ca@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group py-2">
            <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-600/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300 shadow-sm">
              <img 
                src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
                alt="INFO TECH MICROSYSTEMS Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback in case of asset path delay
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col justify-center pl-1 sm:hidden">
                <span className="font-extrabold tracking-wider text-sm bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ITM</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-black tracking-wider text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors font-['Outfit']">
                INFO TECH MICROSYSTEMS
              </span>
              <span className="text-[11px] tracking-widest uppercase text-cyan-600 dark:text-cyan-400 font-semibold font-mono">
                Enterprise Software • QA • Consulting • KPIs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg transition-all ${
                location.pathname === '/' 
                  ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/40 dark:border-cyan-500/30 shadow-sm' 
                  : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  isActive('/services')
                    ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/40 dark:border-cyan-500/30'
                    : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                <span>Services (7)</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-500' : ''}`} />
              </button>

              {/* Mega-menu dropdown */}
              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-1 w-[460px] rounded-xl p-3 shadow-2xl backdrop-blur-2xl border border-slate-200 bg-white text-slate-800 dark:border-cyan-500/30 dark:bg-[#0a0e1f]/95 dark:text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                      Specialized Engineering Services
                    </span>
                    <Link 
                      to="/services" 
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                    >
                      Overview Grid →
                    </Link>
                  </div>
                  <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
                    {SERVICES_DATA.map((service, idx) => {
                      const IconComponent = iconMap[service.iconName] || Cpu;
                      return (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-cyan-950/50 hover:border-cyan-300 dark:hover:border-cyan-500/20 border border-transparent transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0 mt-0.5">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors flex items-center space-x-2">
                              <span>{idx + 1}. {service.shortTitle}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-normal">
                              {service.tagline}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Tools & KPIs Link */}
            <Link
              to="/tools"
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition-all ${
                isActive('/tools')
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50'
              }`}
            >
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>KPIs & Tools</span>
              <span className="text-[10px] bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-1.5 py-0.5 rounded-full ml-1 uppercase">
                Interactive
              </span>
            </Link>

            {/* Leadership & About */}
            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-lg transition-all ${
                isActive('/about')
                  ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/40 dark:border-cyan-500/30 shadow-sm'
                  : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50'
              }`}
            >
              Leadership & About
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-lg transition-all ${
                isActive('/contact')
                  ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-400 dark:bg-cyan-950/40 dark:border-cyan-500/30 shadow-sm'
                  : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/50'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Action Area: Theme Toggle & Consultation Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-lg border border-slate-300 hover:border-cyan-500 text-slate-700 hover:text-cyan-600 bg-slate-100 dark:border-slate-700 dark:hover:border-cyan-400 dark:text-slate-300 dark:hover:text-cyan-300 dark:bg-slate-900/60 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Consultation CTA */}
            <Link
              to="/contact"
              className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-500/25 transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl animate-gradient"></span>
              <span className="relative block px-4 py-2.5 rounded-[11px] bg-slate-900 text-white dark:bg-slate-950 dark:text-cyan-300 group-hover:bg-transparent group-hover:text-white transition-all duration-200">
                Request Consultation
              </span>
            </Link>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/60 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-slate-900/60"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/20 bg-[#090d1f] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>

          <div>
            <div className="px-3 py-1 text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">
              Services (7 Dedicated Offerings)
            </div>
            <div className="pl-2 space-y-1 mt-1 border-l-2 border-cyan-500/30 ml-2">
              {SERVICES_DATA.map((service, idx) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40 rounded"
                >
                  {idx + 1}. {service.shortTitle}
                </Link>
              ))}
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-purple-400 hover:underline font-semibold"
              >
                View Full Services Grid →
              </Link>
            </div>
          </div>

          <Link
            to="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800 text-cyan-300"
          >
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span>Interactive Tools & KPIs</span>
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
          >
            Leadership & About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-slate-200 hover:bg-slate-800"
          >
            Contact Us
          </Link>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <a href="tel:+16132665285" className="text-slate-200 font-semibold">+1 613 266 5285</a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a href="mailto:info.tech.microsystems.ca@gmail.com" className="text-slate-200">info.tech.microsystems.ca@gmail.com</a>
            </div>
            <div className="text-slate-400 pt-1">
              113 Whernside Terrace, Ottawa, ON, Canada K2W0C7
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
