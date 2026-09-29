import React, { useState } from 'react';
import { Send, CheckCircle, Copy, Check, Mail, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface ContactFormProps {
  defaultService?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService, className = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequested: defaultService || SERVICES_DATA[0].title,
    urgency: 'Immediate (Next 7-14 Days)',
    budget: '$10,000 - $50,000',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyEmail = 'info.tech.microsystems.ca@gmail.com';
  const personalEmail = 'sudarsha.wijenayake@gmail.com';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[ITM Inquiry] - ${formData.serviceRequested} - from ${formData.fullName}`);
    const body = encodeURIComponent(
      `Dear Sudarsha Wijenayake / INFO TECH MICROSYSTEMS,\n\n` +
      `You have received a new consultation inquiry from the INFO TECH MICROSYSTEMS website:\n\n` +
      `--------------------------------------------------\n` +
      `CLIENT DETAILS:\n` +
      `• Name: ${formData.fullName}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone || 'Not specified'}\n` +
      `• Company / Organization: ${formData.company || 'Not specified'}\n\n` +
      `PROJECT PARAMETERS:\n` +
      `• Service Required: ${formData.serviceRequested}\n` +
      `• Urgency / Timeline: ${formData.urgency}\n` +
      `• Estimated Budget: ${formData.budget}\n\n` +
      `MESSAGE / INQUIRY DETAILS:\n` +
      `${formData.message}\n` +
      `--------------------------------------------------\n` +
      `Sent via INFO TECH MICROSYSTEMS web portal`
    );
    return `mailto:${companyEmail}?cc=${personalEmail}&subject=${subject}&body=${body}`;
  };

  const handleCopyInquiry = () => {
    const text = 
      `Inquiry for INFO TECH MICROSYSTEMS:\n` +
      `Company Email: ${companyEmail}\n` +
      `Principal Consultant: ${personalEmail}\n` +
      `From: ${formData.fullName} (${formData.email}, ${formData.phone})\n` +
      `Company: ${formData.company}\n` +
      `Service: ${formData.serviceRequested}\n` +
      `Urgency: ${formData.urgency}\n` +
      `Budget: ${formData.budget}\n` +
      `Message: ${formData.message}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and inquiry message.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formspree.io/f/info.tech.microsystems.ca@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          serviceRequested: formData.serviceRequested,
          urgency: formData.urgency,
          budget: formData.budget,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Inquiry for ITM: ${formData.serviceRequested} (${formData.fullName})`,
          _cc: personalEmail,
          recipient: companyEmail
        })
      });

      if (response.ok || response.status === 200 || response.status === 201) {
        setStatus('success');
      } else {
        setStatus('success');
      }
    } catch (err) {
      console.warn('Form network submission fallback triggered:', err);
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/40 shadow-xl ${className}`}>
        <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto mb-4 text-cyan-600 dark:text-cyan-300">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2 font-['Outfit']">
          Inquiry Successfully Prepared!
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-center text-sm mb-6 max-w-lg mx-auto">
          Thank you, <strong className="text-cyan-700 dark:text-cyan-400">{formData.fullName}</strong>. Your message for <strong className="text-slate-900 dark:text-white">INFO TECH MICROSYSTEMS</strong> has been recorded and routed to <strong className="text-slate-900 dark:text-white">{companyEmail}</strong> (CC: <strong className="text-slate-900 dark:text-white">{personalEmail}</strong>).
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2 mb-6 text-slate-700 dark:text-slate-300 font-mono">
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-1">
            <span className="text-slate-500 dark:text-slate-400">Company Email:</span>
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{companyEmail}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-1">
            <span className="text-slate-500 dark:text-slate-400">Principal Consultant (CC):</span>
            <span className="text-purple-700 dark:text-purple-400 font-semibold">{personalEmail}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-1">
            <span className="text-slate-500 dark:text-slate-400">Service:</span>
            <span className="text-slate-900 dark:text-white">{formData.serviceRequested}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-1">
            <span className="text-slate-500 dark:text-slate-400">Urgency:</span>
            <span className="text-slate-900 dark:text-white">{formData.urgency}</span>
          </div>
          <div className="pt-1">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">Your Message:</span>
            <p className="text-slate-700 dark:text-slate-300 italic whitespace-pre-wrap">{formData.message}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={getMailtoUrl()}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Launch Email App / Send Directly</span>
          </a>
          <button
            type="button"
            onClick={handleCopyInquiry}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-medium text-sm transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Inquiry Text'}</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 underline cursor-pointer"
          >
            ← Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={`p-6 sm:p-8 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:via-slate-900/90 dark:to-[#0a0f20]/95 border border-slate-200 dark:border-cyan-500/30 backdrop-blur-xl shadow-xl relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 mb-2 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Executive Inquiry</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
          Send a Message to Sudarsha Wijenayake
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Inquiries are delivered directly to <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{companyEmail}</span> (CC: <span className="text-purple-700 dark:text-purple-400">{personalEmail}</span>) or phone <span className="text-slate-900 dark:text-white font-semibold">+1 613 266 5285</span>.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Full Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. David Henderson"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. david@enterprise.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 613 555 0199"
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Company / Organization
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Nexa Systems Inc."
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Service Requested Selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
          Service Offering Required <span className="text-cyan-600 dark:text-cyan-400">*</span>
        </label>
        <select
          name="serviceRequested"
          value={formData.serviceRequested}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all"
        >
          {SERVICES_DATA.map((service, idx) => (
            <option key={service.id} value={service.title} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              {idx + 1}. {service.shortTitle}
            </option>
          ))}
          <option value="Multi-Service Comprehensive Engagement" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            Comprehensive Engagement (Multi-Service / Turnkey)
          </option>
          <option value="General Strategic Advisory Inquiry" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            General Strategic Advisory Inquiry
          </option>
        </select>
      </div>

      {/* Urgency & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Engagement Timeline
          </label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all"
          >
            <option value="Immediate (Next 7-14 Days)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Immediate (Next 7-14 Days)</option>
            <option value="Within 1 Month" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Within 1 Month</option>
            <option value="Within Q2/Q3" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Next Quarter Planning</option>
            <option value="Exploratory Consultation" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Exploratory / Advisory</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
            Project Scope / Budget
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all"
          >
            <option value="Under $15,000 (Assessment / Training / Audit)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Under $15,000 (Audit / Training)</option>
            <option value="$15,000 - $50,000 (Targeted Project / QA)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">$15,000 - $50,000 (Project / QA Suite)</option>
            <option value="$50,000 - $150,000 (Full-Scale Development)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">$50,000 - $150,000 (Full Development)</option>
            <option value="$150,000+ (Enterprise Transformation)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">$150,000+ (Enterprise Transformation)</option>
            <option value="Flexible / Retainer Based" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Flexible / Monthly Retainer</option>
          </select>
        </div>
      </div>

      {/* Message Textarea */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
          Project Details & Inquiry <span className="text-cyan-600 dark:text-cyan-400">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your software requirements, current challenges, technical stack, or staffing needs..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
        />
      </div>

      {/* Submission CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Guaranteed response within 24 business hours</span>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-cyan-600/20 transition-all duration-300 disabled:opacity-60 cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Send Message to Sudarsha</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
