<div align="center">
  <img src="public/assets/itm-logo-dark.png" alt="ITM KPI Dashboard Logo" width="110" height="110" />
  <h1>ITM Quality Engineering KPI & Data Mining Platform</h1>
  <p><b>Open-Source Client-Side Engineering Telemetry, DORA Analytics, Defect Governance & Executive Reporting Suite</b></p>
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.8-blue.svg" alt="React 19" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.3.1-646CFF.svg" alt="Vite 8" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.0.2-blue.svg" alt="TypeScript 6" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC.svg" alt="Tailwind CSS 4" /></a>
    <a href="https://dexie.org/"><img src="https://img.shields.io/badge/IndexedDB-Dexie_4.4.6-orange.svg" alt="Dexie.js IndexedDB" /></a>
    <a href="docs/globalization_guide.md"><img src="https://img.shields.io/badge/Languages-11_Supported-brightgreen.svg" alt="11 Languages" /></a>
    <a href="docs/accessibility_guide.md"><img src="https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success.svg" alt="WCAG 2.1 AA" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" alt="License: Apache 2.0" /></a>
  </p>
</div>

<br />

The **ITM Quality Engineering KPI & Data Mining Platform** is a modern, open-source analytical web application designed for engineering leaders, SDETs, DevOps practitioners, and agile teams. It delivers comprehensive software quality telemetry, DORA performance benchmarks, automated risk gating, defect root-cause mining, and publication-ready PDF/PowerPoint executive exports.

> [!NOTE]
> **Zero External Telemetry Trackers & 100% Client-Side Privacy**: All aggregation, data mining, and statistical computations run completely inside the browser using a high-performance **IndexedDB** database (Dexie.js). No proprietary user data is transmitted to external servers.

---

## 🌟 Key Capabilities

- 📊 **6 Comprehensive Analytical Perspectives**:
  1. **Executive Scorecard**: DORA tier badges, deployment velocity, change failure rate, and cross-squad health.
  2. **Quality & Defect Governance**: Defect severity breakdown, Defect Removal Efficiency (DRE), defect aging buckets, and discovery origin trends.
  3. **Risk & Release Gating**: Blast radius scoring, component coupling indices, and flaky test quarantine metrics.
  4. **Automation & Performance**: Automated test suite distribution, pass rates, test maintenance ROI, and execution duration.
  5. **Productivity & Flow**: Sprint burndown rates, story point velocity, cycle time, and PR review turnaround durations.
  6. **Governance, SLAs & Leading Indicators**: Production SLA compliance, regulatory audit gates, and leading vs. lagging near-miss tracking.
- 🖨️ **Visual-Fidelity Executive Exports**:
  - Export categorized metrics into presentation-grade **PDF documents** (via jsPDF) and **Microsoft PowerPoint presentations** (via pptxgenjs).
  - Every card matches the application's color-coded status badges (Optimal, Warning, Breach) and scope headers.
- 🔍 **Interactive Metric Explainability**:
  - Click any KPI card to view mathematical formulas, target deviation percentages, root-cause analyses, and actionable remediation checklists.
- 🌐 **11 International Languages**:
  - Full native localization across English, Chinese (Simplified), Hindi, Spanish, French, Arabic (with native RTL layout), Bengali, Portuguese, Russian, German, and Japanese.
- 🌓 **Adaptive Theming & WCAG 2.1 AA Accessibility**:
  - Cyberpunk dark mode and clean executive light mode with high-contrast color pairs and complete keyboard accessibility.
- 🔌 **Configurable ALM Connectors**:
  - Simulated and extensible connector integrations for Jira, GitHub Actions, TestRail, and SonarQube.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (`v20.0.0` or higher, `v24.x LTS` recommended)
- [npm](https://www.npmjs.com/) (`v10.0.0` or higher)
- [Git](https://git-scm.com/)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/INFO-TECH-MICROSYSTEMS/ITMKPIDashboard.git
   cd ITMKPIDashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to [http://localhost:5173](http://localhost:5173).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Architecture & Directory Layout

```plaintext
ITMKPIDashboard/
├── docs/                        # Project technical documentation
│   ├── accessibility_guide.md   # WCAG 2.1 AA keyboard & contrast specifications
│   ├── architecture_and_modularization.md # Layered system architecture
│   ├── deployment_guide.md      # Docker, edge hosting, and CDN guidelines
│   ├── design_system.md         # Color tokens, typography, and card designs
│   ├── developer_guide.md       # Engineering conventions & workflow
│   ├── globalization_guide.md   # 11-language i18n & RTL system
│   ├── implemented_requirements.md # Feature matrix & verification records
│   ├── LICENSE.md               # Apache 2.0 license summary
│   └── user_guide.md            # Interactive user manual
├── public/                      # Static logos and assets
├── src/
│   ├── components/
│   │   ├── kpi/                 # Filter bars, connector dialogs, and views
│   │   │   ├── export/          # PDF and PowerPoint export modals
│   │   │   └── views/           # Executive, Quality, Risk, Automation views
│   │   ├── Footer.tsx           # Application footer
│   │   ├── LanguageSelector.tsx # 11-language picker with flags
│   │   ├── Sidebar.tsx          # Collapsible responsive navigation drawer
│   │   └── TopHeader.tsx        # Status header and mode toggles
│   ├── constants/               # KPI definitions, categories, and thresholds
│   ├── context/                 # Reactive ThemeProvider (Dark / Light)
│   ├── db/                      # IndexedDB schema (Dexie.js) & synthetic seed generator
│   ├── i18n/                    # i18next configuration & language detectors
│   ├── locales/                 # JSON translation dictionaries (11 languages)
│   ├── pages/                   # KPIPlatformPage root container
│   ├── services/                # Calculation, justification, and export engines
│   └── types/                   # TypeScript interfaces and telemetry contracts
├── CONTRIBUTING.md               # Open source contribution guidelines
├── LICENSE                       # Apache License 2.0 full text
└── package.json                 # Project dependencies and build scripts
```

---

## 📚 Documentation Portfolio

Explore our comprehensive technical guides in the [`docs/`](docs/) directory:

- 📖 **[User Guide](docs/user_guide.md)**: Walkthrough of filtering, views, metric justifications, and exports.
- 🏗️ **[Architecture & Modularization](docs/architecture_and_modularization.md)**: Layered client-side architecture and data flow.
- 💻 **[Developer Guide](docs/developer_guide.md)**: Development setup, coding guidelines, and scripts.
- 🚀 **[Deployment Guide](docs/deployment_guide.md)**: Containerization and static edge hosting instructions.
- 🎨 **[Design System](docs/design_system.md)**: Glassmorphic cyber theme tokens, typography, and status indicators.
- ♿ **[Accessibility Guide](docs/accessibility_guide.md)**: WCAG 2.1 AA keyboard navigation, contrast ratios, and screen reader testing.
- 🌐 **[Globalization Guide](docs/globalization_guide.md)**: RTL handling, locale detection, and translation workflow.
- ✅ **[Implemented Requirements Matrix](docs/implemented_requirements.md)**: Verification status across all features.

---

## 🤝 Contributing

Contributions from the open-source community are warmly welcomed! Please read our [Contributing Guidelines](CONTRIBUTING.md) to learn how to propose bug fixes, add new metrics, or translate additional languages.

---

## ⚠️ Disclaimer & Limitation of Liability

> [!WARNING]
> ### Use at Your Own Risk
> This project is licensed under the **Apache License 2.0**. By using, reproducing, or distributing this code or any part of it, you acknowledge and agree that it is provided on an **"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND**, either express or implied.
> 
> The authors and contributors **DENY ALL LIABILITY** for any damages, including direct, indirect, special, incidental, or consequential damages, arising out of the use or inability to use this software. For full details, please refer to the [LICENSE](LICENSE) file.

---

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.
