import fs from 'fs';

// Read extracted english data
const data = JSON.parse(fs.readFileSync('scripts/extracted-english-data.json', 'utf8'));

// Format servicesContent
const servicesContent = {};
data.services.forEach((s, idx) => {
  const key = `s${idx + 1}`;
  servicesContent[key] = {
    tagline: s.tagline,
    summary: s.summary,
    fullDescription: s.fullDescription,
    capabilities: s.capabilities,
    methodologySteps: s.methodologySteps.map(m => ({
      step: m.step,
      title: m.title,
      description: m.description
    })),
    keyDeliverables: s.keyDeliverables,
    useCases: s.useCases,
    faqs: s.faqs
  };
});

// Format auditChecklistData
const auditChecklistData = {};
data.checklists.forEach((c, idx) => {
  const key = `t${idx + 1}`;
  auditChecklistData[key] = {
    title: c.title,
    items: c.items
  };
});

// Format kpiGlossaryData
const kpiGlossaryData = {};
data.kpis.forEach(k => {
  kpiGlossaryData[k.id] = {
    name: k.name,
    category: k.category,
    description: k.description,
    targetBenchmark: k.targetBenchmark,
    calculationFormula: k.calculationFormula,
    businessImpact: k.businessImpact
  };
});

const kpiCategories = {
  "DORA": "DORA",
  "QA & Testing": "QA & Testing",
  "Code Quality": "Code Quality",
  "Process & Governance": "Process & Governance",
  "Team & Talent": "Team & Talent"
};

// Update en.json
const enPath = 'src/locales/en.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
en.servicesContent = servicesContent;
en.auditChecklistData = auditChecklistData;
en.kpiGlossaryData = kpiGlossaryData;
en.kpiCategories = kpiCategories;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
console.log('Successfully updated en.json with comprehensive servicesContent, auditChecklistData, and kpiGlossaryData');
