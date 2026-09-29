import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Briefcase, Wrench, Users, Mail, Phone,
  ChevronDown, ChevronLeft, ChevronRight, Sun, Moon,
  Code2, Compass, GraduationCap, ShieldCheck, UserCheck, BarChart3, TrendingUp,
  Cpu, Sparkles, MapPin, X
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

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [flyoutOpen, setFlyoutOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setFlyoutOpen(false);
  }, [location.pathname, setIsMobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Pane */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between bg-white text-slate-900 dark:bg-[#070913] dark:text-slate-100 border-r border-slate-200 dark:border-cyan-500/20 shadow-xl lg:shadow-none transition-all duration-300 ease-in-out overflow-x-hidden ${
          // Mobile state
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${
          // Desktop collapsed state
          isCollapsed ? 'lg:w-20' : 'lg:w-72'
        }`}
      >
        {/* Top Section: Logo & Toggle */}
        <div className="flex flex-col shrink-0">
          <div className="h-20 flex items-center justify-between px-3.5 border-b border-slate-200 dark:border-cyan-500/15">
            {/* Logo and Brand Name */}
            <Link 
              to="/" 
              className={`flex items-center gap-2.5 overflow-hidden transition-all duration-200 group ${
                isCollapsed ? 'lg:justify-center lg:w-full' : ''
              }`}
              title="INFO TECH MICROSYSTEMS"
            >
              <div className="relative overflow-hidden rounded-lg p-1 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-purple-600/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-all shrink-0">
                <img 
                  src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
                  alt="ITM Logo" 
                  className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Text shown when expanded or mobile */}
              <div className={`flex flex-col min-w-0 transition-opacity duration-200 ${isCollapsed ? 'lg:hidden' : 'block'}`}>
                <span className="text-sm font-black tracking-wider text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors font-['Outfit'] truncate">
                  INFO TECH
                </span>
                <span className="text-[10px] tracking-widest uppercase text-cyan-600 dark:text-cyan-400 font-semibold font-mono truncate">
                  MICROSYSTEMS
                </span>
              </div>
            </Link>

            {/* Collapse toggle button on desktop */}
            <button
              type="button"
              onClick={() => setIsCollapsed(prev => !prev)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300 bg-slate-50 dark:bg-slate-900/80 transition-colors cursor-pointer shrink-0 ${
                isCollapsed ? 'mt-2 mx-auto' : ''
              }`}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Close button on mobile */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Sub-toggle bar when collapsed */}
          {isCollapsed && (
            <div className="hidden lg:flex justify-center py-2 border-b border-slate-100 dark:border-slate-800/60">
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                title="Expand navigation pane"
                className="p-1 rounded-md text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 text-xs flex items-center gap-1 font-mono transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Middle Navigation Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1.5 custom-scrollbar">
          
          {/* Home Link */}
          <Link
            to="/"
            title={isCollapsed ? 'Home' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              location.pathname === '/'
                ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
          >
            <Home className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
            <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>Home</span>
          </Link>

          {/* Services Group */}
          <div className="relative">
            {/* In Collapsed Desktop Mode: Icon with Popover / Flyout */}
            {isCollapsed ? (
              <div 
                className="hidden lg:block relative"
                onMouseEnter={() => setFlyoutOpen(true)}
                onMouseLeave={() => setFlyoutOpen(false)}
              >
                <Link
                  to="/services"
                  className={`flex items-center justify-center p-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive('/services')
                      ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm'
                      : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60'
                  }`}
                  title="Services (7 Core Offerings)"
                >
                  <Briefcase className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </Link>

                {/* Flyout Menu for Collapsed Mode */}
                {flyoutOpen && (
                  <div className="absolute left-full top-0 ml-2 w-80 rounded-xl p-3 shadow-2xl backdrop-blur-2xl border border-slate-200 bg-white text-slate-800 dark:border-cyan-500/30 dark:bg-[#0a0e1f]/95 dark:text-slate-200 z-50 animate-in fade-in slide-in-from-left-2 duration-150">
                    <div className="px-2 py-1.5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center mb-2">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400 font-mono">
                        Enterprise Services (7)
                      </span>
                      <Link 
                        to="/services" 
                        className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                      >
                        All Services →
                      </Link>
                    </div>
                    <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
                      {SERVICES_DATA.map((service, idx) => {
                        const IconComponent = iconMap[service.iconName] || Cpu;
                        return (
                          <Link
                            key={service.id}
                            to={`/services/${service.slug}`}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-cyan-950/50 hover:border-cyan-300 dark:hover:border-cyan-500/20 border border-transparent transition-all group"
                          >
                            <div className="w-6 h-6 rounded-md bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 truncate">
                              {idx + 1}. {service.shortTitle}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* In Expanded Mode (or Mobile Drawer): Accordion Parent & Submenu */}
            <div className={isCollapsed ? 'lg:hidden' : 'block'}>
              <div className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group">
                <Link
                  to="/services"
                  className={`flex items-center gap-3 flex-1 transition-colors ${
                    isActive('/services')
                      ? 'text-cyan-700 dark:text-cyan-400 font-semibold'
                      : 'text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300'
                  }`}
                >
                  <Briefcase className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  <span className="truncate">Services</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 font-mono font-semibold">
                    7
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  aria-label="Toggle services list"
                  className="p-1 rounded text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-transform cursor-pointer"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesExpanded ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''}`} />
                </button>
              </div>

              {/* Submenu for 7 Services */}
              {servicesExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-1 ml-4 border-l border-cyan-500/20 dark:border-cyan-500/20 animate-in slide-in-from-top-1 duration-150">
                  {SERVICES_DATA.map((service, idx) => {
                    const IconComponent = iconMap[service.iconName] || Cpu;
                    const isSubActive = location.pathname === `/services/${service.slug}`;
                    return (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSubActive
                            ? 'text-cyan-700 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-950/50 font-semibold'
                            : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-cyan-300 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                        <span className="truncate">{idx + 1}. {service.shortTitle}</span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/services"
                    className="block px-2.5 py-1 text-[11px] text-purple-600 dark:text-purple-400 hover:underline font-medium"
                  >
                    View Overview Grid →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Tools & KPIs Link */}
          <Link
            to="/tools"
            title={isCollapsed ? 'Interactive Tools & KPIs' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive('/tools')
                ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
          >
            <Wrench className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
            <div className={`flex items-center gap-2 truncate ${isCollapsed ? 'lg:hidden' : 'flex'}`}>
              <span className="truncate">KPIs & Tools</span>
              <span className="text-[9px] bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Live
              </span>
            </div>
          </Link>

          {/* Leadership & About */}
          <Link
            to="/about"
            title={isCollapsed ? 'Leadership & About' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive('/about')
                ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
          >
            <Users className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
            <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>Leadership & About</span>
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact"
            title={isCollapsed ? 'Contact Us' : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive('/contact')
                ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/60 dark:border-cyan-500/40 shadow-sm'
                : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-300 dark:hover:bg-slate-800/60'
            } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
          >
            <Mail className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
            <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>Contact Us</span>
          </Link>
        </div>

        {/* Bottom Section: Theme Toggle, CTA, and HQ Contact Info */}
        <div className="shrink-0 p-3 border-t border-slate-200 dark:border-cyan-500/15 bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
          
          {/* Quick CTA Button */}
          <div>
            <Link
              to="/contact"
              title={isCollapsed ? 'Request Consultation' : undefined}
              className={`flex items-center justify-center gap-2 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white shadow-cyan-600/20 hover:shadow-md cursor-pointer ${
                isCollapsed ? 'p-2.5 lg:w-10 lg:h-10 lg:mx-auto' : 'px-4 py-2.5 w-full'
              }`}
            >
              <Sparkles className="w-4 h-4 text-white shrink-0" />
              <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>
                Request Consultation
              </span>
            </Link>
          </div>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300 bg-white dark:bg-slate-900 transition-colors cursor-pointer text-xs font-medium ${
              isCollapsed ? 'lg:justify-center lg:px-0 lg:w-10 lg:h-10 lg:mx-auto' : ''
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
            )}
            <span className={`truncate ${isCollapsed ? 'lg:hidden' : 'block'}`}>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Headquarters Info Details (Only in Expanded Mode) */}
          <div className={`space-y-1.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400 ${
            isCollapsed ? 'lg:hidden' : 'block'
          }`}>
            <div className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 font-semibold font-mono">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="truncate">Ottawa, Canada (EST)</span>
            </div>
            
            <a 
              href="tel:+16132665285" 
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors truncate"
            >
              <Phone className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="font-medium">+1 613 266 5285</span>
            </a>

            <a 
              href="mailto:info.tech.microsystems.ca@gmail.com" 
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors truncate"
              title="info.tech.microsystems.ca@gmail.com"
            >
              <Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="truncate">info.tech.microsystems.ca...</span>
            </a>
          </div>

          {/* Bottom collapse / expand bar on desktop */}
          <div className="hidden lg:block pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
            <button
              type="button"
              onClick={() => setIsCollapsed(prev => !prev)}
              className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300 transition-colors cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Collapse sidebar</span>
                </>
              )}
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};
