import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Cpu, Code2, Compass, 
  GraduationCap, UserCheck, BarChart3, TrendingUp, Filter, Sparkles 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Compass,
  GraduationCap,
  Cpu,
  UserCheck,
  BarChart3,
  TrendingUp,
};

export const ServicesOverviewPage: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<string>('All');

  const badges = ['All', 'Core Engineering', 'Strategic Advisory', 'Talent Empowerment', 'Quality Engineering', 'Talent Acquisition', 'Governance & Audits', 'People Governance'];

  const filteredServices = selectedBadge === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.badge === selectedBadge);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-700 dark:bg-cyan-950/80 dark:text-cyan-400 dark:border-cyan-500/30 mb-3 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>7 ENTERPRISE SERVICE DISCIPLINES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-['Outfit'] mb-4">
          Professional Software & Engineering Services
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          INFO TECH MICROSYSTEMS delivers specialized engineering, advisory, testing, talent, and metrics governance. 
          Explore our dedicated offerings below or select a service for full architectural specifications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center space-x-1 mr-2">
          <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Filter:</span>
        </span>
        {badges.map((badge) => (
          <button
            key={badge}
            onClick={() => setSelectedBadge(badge)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedBadge === badge
                ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold shadow-md shadow-cyan-600/20'
                : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            {badge}
          </button>
        ))}
      </div>

      {/* Service Cards List */}
      <div className="space-y-8">
        {filteredServices.map((service) => {
          const originalIndex = SERVICES_DATA.findIndex(s => s.id === service.id);
          const IconComponent = iconMap[service.iconName] || Cpu;
          
          return (
            <div
              key={service.id}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-xl group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Col: Info */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
                      SERVICE 0{originalIndex + 1}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                      {service.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-sm text-cyan-700 dark:text-cyan-400 font-medium italic">
                    "{service.tagline}"
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.summary}
                  </p>

                  {/* Capabilities Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.capabilities.map((cap, cIdx) => (
                      <span key={cIdx} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {cap.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Col: Deliverables & Direct CTA */}
                <div className="lg:col-span-4 lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-6 space-y-4">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    Primary Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {service.keyDeliverables.slice(0, 3).map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
                    >
                      <span>Read Dedicated Specifications</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engagement Models Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] mb-2">
          Flexible Client Engagement Models
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
          Whether you need a dedicated turnkey delivery squad, strategic advisory retainer, 
          or individual elite staff augmentation in Ottawa or globally, INFO TECH MICROSYSTEMS adapts to your operating cadence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-left max-w-4xl mx-auto">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block mb-1">Turnkey Projects</span>
            <span className="text-slate-600 dark:text-slate-400">Fixed-scope or milestone-driven full product delivery with guaranteed SLAs.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block mb-1">Staff Augmentation</span>
            <span className="text-slate-600 dark:text-slate-400">Vetted engineers, SDETs, and managers integrated into your daily scrums.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block mb-1">Strategic Retainer</span>
            <span className="text-slate-600 dark:text-slate-400">Ongoing architectural governance, sprint audits, and executive advisory.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-cyan-700 dark:text-cyan-400 font-bold block mb-1">Corporate Bootcamps</span>
            <span className="text-slate-600 dark:text-slate-400">Targeted upskilling for QA automation, modern frameworks, and requirements.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
