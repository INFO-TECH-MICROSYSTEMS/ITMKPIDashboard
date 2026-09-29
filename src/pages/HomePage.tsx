import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Cpu, Code2, Compass, 
  GraduationCap, UserCheck, BarChart3, TrendingUp, Sparkles, MapPin, 
  Phone, Mail, Layers, Award, Wrench, ChevronRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
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
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/30 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>ENTERPRISE SOFTWARE • QA EXCELLENCE • STRATEGIC ADVISORY</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-['Outfit'] leading-[1.1] mb-6">
            Architecting Resilient Software. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Empowering High-Velocity Teams.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            <strong className="text-white">INFO TECH MICROSYSTEMS (ITM)</strong> provides end-to-end software development, 
            hands-on project consulting, workforce training, automated QA frameworks, 
            technical talent acquisition, software KPIs, and performance governance.
          </p>

          {/* Quick Location & Direct Phone Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 mb-10">
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Ottawa, Ontario, Canada</span>
            </div>
            <a 
              href="tel:+16132665285"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-400 text-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">+1 613 266 5285</span>
            </a>
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enterprise Delivery Standards</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 transition-all duration-300 group"
            >
              <span>Explore All 7 Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/tools"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-semibold text-base transition-all duration-300 shadow-lg"
            >
              <Wrench className="w-5 h-5 text-cyan-400" />
              <span>Interactive KPI & QA Tools</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 font-semibold text-base transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-purple-400" />
              <span>Contact Sudarsha</span>
            </Link>
          </div>
        </div>

        {/* Brand Banner Display */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl overflow-hidden p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 shadow-2xl">
          <div className="rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-4 sm:p-8">
            <img 
              src={theme === 'dark' ? '/assets/itm-logo-dark.png' : '/assets/itm-logo-light.png'} 
              alt="INFO TECH MICROSYSTEMS Banner" 
              className="w-full max-h-56 object-contain filter drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]"
            />
          </div>
        </div>

        {/* Quick Numbers / Metrics Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: 'Core Services', val: '7 Dedicated', desc: 'From architecture to performance' },
            { label: 'Quality Standard', val: '99.8%', desc: 'Pre-production defect prevention' },
            { label: 'Engineering Stack', val: 'Cloud & Microservices', desc: 'AWS, Azure, .NET, React, K8s' },
            { label: 'Location Base', val: 'Ottawa, Canada', desc: 'National & international delivery' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-center">
              <div className="text-xl sm:text-2xl font-black text-cyan-400 font-['Outfit']">{item.val}</div>
              <div className="text-xs font-semibold text-white mt-0.5">{item.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The 7 Dedicated Services Section */}
      <section className="relative z-10 py-16 bg-[#080c1d] border-y border-cyan-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 mb-2 font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>COMPREHENSIVE CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                7 Specialized Software & Talent Services
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Each service is backed by dedicated methodologies, verifiable KPIs, automated toolchains, and seasoned technical leadership.
              </p>
            </div>
            <Link 
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm group"
            >
              <span>Explore Detailed Service Directory</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid of the 7 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Cpu;
              return (
                <div 
                  key={service.id}
                  className="rounded-2xl p-6 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-[#0c1226]/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Service Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                        SERVICE 0{index + 1}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {service.summary}
                    </p>

                    {/* Key Highlights Bullet points */}
                    <ul className="space-y-1.5 text-xs text-slate-300 mb-6 border-t border-slate-800/80 pt-3">
                      {service.keyDeliverables.slice(0, 3).map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-950/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-cyan-400 group-hover:text-white transition-all"
                  >
                    <span>View Dedicated Page & Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}

            {/* 8th Card: Interactive Tools Promo Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-400/40 shadow-xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-purple-900/60 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ONLINE AUDIT SUITE</span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">
                  Interactive KPIs, Tools & Maturity Calculators
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  Evaluate your software project health instantly using our online DORA metrics calculator, QA strategy maturity auditor, and staffing capacity estimator.
                </p>
                <div className="space-y-2 text-xs text-cyan-300">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>DORA Metrics & Velocity Health Score</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Automated QA & Security Audit Matrix</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>Team Capacity & Resource Modeling</span>
                  </div>
                </div>
              </div>

              <Link
                to="/tools"
                className="mt-6 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>Launch Interactive Tools Suite</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founder Spotlight Section */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900/90 via-[#0d1326]/95 to-slate-900/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Portrait with cyber frame */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 p-1 border border-cyan-400/40">
                  <img 
                    src="/assets/sudarsha-wijenayake.jpg" 
                    alt="Sudarsha Wijenayake - Founder of INFO TECH MICROSYSTEMS" 
                    className="w-64 h-72 sm:w-72 sm:h-80 object-cover rounded-xl"
                  />
                  <div className="p-3 bg-slate-950/95 text-center border-t border-slate-800">
                    <h4 className="text-white font-bold text-base font-['Outfit']">Sudarsha Wijenayake</h4>
                    <p className="text-xs text-cyan-400 font-mono">Founder & Principal Technology Consultant</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">INFO TECH MICROSYSTEMS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Message & Credentials */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>EXECUTIVE CONSULTING & RIGOR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                Leadership Grounded in Deep Technical Competence
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                "At INFO TECH MICROSYSTEMS, our philosophy is anchored in tangible engineering excellence. 
                Whether we are writing complex cloud-native microservices, designing fail-safe automated QA frameworks, 
                recruiting specialized technical personnel, or establishing board-level software KPIs, we bring an 
                uncompromising dedication to precision, transparency, and client ROI."
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Based out of Ottawa, Ontario, Sudarsha leads INFO TECH MICROSYSTEMS with decades of hands-on software development, 
                enterprise architecture, quality engineering, and technical workforce mentorship.
              </p>

              {/* Contact Direct Strip */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <a 
                  href="tel:+16132665285" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-950 border border-cyan-500/30 text-white hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Call Sudarsha: +1 613 266 5285</span>
                </a>
                <a 
                  href="mailto:sudarsha.wijenayake@gmail.com" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-950 border border-purple-500/30 text-white hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>sudarsha.wijenayake@gmail.com</span>
                </a>
                <Link
                  to="/about"
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold inline-flex items-center space-x-1"
                >
                  <span>Read Full Bio & Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Modern Technologies Section */}
      <section className="relative z-10 py-16 bg-[#060814] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            MODERN TOOLCHAINS & ECOSYSTEMS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mb-8">
            Engineered with the Latest Technologies
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
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA & Direct Consultation Banner */}
      <section className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-purple-900/40 border border-cyan-400/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] mb-4">
              Ready to Upgrade Your Software Operations?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Connect directly with INFO TECH MICROSYSTEMS for software product development, 
              strategic project consulting, QA automation, workforce upskilling, staffing, or engineering audits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Sudarsha Wijenayake</span>
              </Link>
              <a
                href="tel:+16132665285"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white border border-cyan-500/30 font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call +1 613 266 5285</span>
              </a>
            </div>
            <div className="text-xs text-slate-400 mt-6">
              113 Whernside Terrace, Ottawa, Ontario, Canada, K2W0C7
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
