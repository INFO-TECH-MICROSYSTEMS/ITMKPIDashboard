# Developer Setup & Engineering Guide

**Document Version:** 1.0.0 (Open Source Edition)  
**System Classification:** Open-Source Developer & Contributor Guide  
**Target Audience:** Software Engineers, SDETs, UI Developers, and Open Source Contributors

[← Back to Main README](../README.md) • [User Guide](user_guide.md) • [Architecture Guide](architecture_and_modularization.md) • [Deployment Guide](deployment_guide.md) • [License](LICENSE.md)

---

## 1. Prerequisites & Environment Setup

Ensure your local workstation has the following installed:

| Requirement | Minimum Version | Recommended Version | Verification Command |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v20.0.0` | `v24.x LTS` | `node -v` |
| **npm** | `v10.0.0` | `v11.x` | `npm -v` |
| **Operating System** | Windows 10/11, macOS 13+, Linux (Ubuntu 22.04+) | Current LTS OS | `uname -a` or `ver` |
| **Git** | `v2.40.0` | `v2.47.x` | `git --version` |

---

## 2. Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/INFO-TECH-MICROSYSTEMS/ITMKPIDashboard.git
   cd ITMKPIDashboard
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`. Hot Module Replacement (HMR) powered by Vite enables instant UI updates as you edit.

4. **Run static analysis and production compilation:**
   ```bash
   npm run build
   ```

5. **Run linter:**
   ```bash
   npm run lint
   ```

---

## 3. Project Directory Map

```plaintext
ITMKPIDashboard/
├── docs/                        # Complete technical documentation suite
├── public/                      # Static assets and icons
├── src/
│   ├── components/
│   │   ├── kpi/                 # Filter bars, connector dialogs, and modals
│   │   │   ├── export/          # PDF and PowerPoint export components
│   │   │   └── views/           # Category views (Executive, Quality, Risk, etc.)
│   │   ├── Footer.tsx           # Application footer
│   │   ├── LanguageSelector.tsx # Accessible 11-language selector
│   │   ├── Sidebar.tsx          # Collapsible responsive sidebar
│   │   └── TopHeader.tsx        # Status header and mode toggles
│   ├── constants/               # KPI categories, thresholds, and color mappings
│   ├── context/                 # ThemeContext (Dark and Light modes)
│   ├── data/                    # Benchmark data and static catalogs
│   ├── db/                      # IndexedDB schema (Dexie.js) and synthetic seeder
│   ├── hooks/                   # Custom hooks (useKPIData)
│   ├── i18n/                    # i18next configuration and language definitions
│   ├── locales/                 # JSON translation dictionaries (11 languages)
│   ├── pages/                   # KPIPlatformPage root container
│   ├── services/                # Calculation, justification, and export engines
│   └── types/                   # TypeScript interfaces and telemetry contracts
├── CONTRIBUTING.md               # Contributor guidelines
├── LICENSE                       # Full Apache License 2.0
├── package.json                 # Dependencies and build scripts
└── vite.config.ts               # Vite bundler configuration
```

---

## 4. Engineering Standards & Conventions

### 4.1 TypeScript Rigor
- Strict typing is enforced via `tsconfig.app.json` (`"strict": true`).
- Avoid `any` types; define clear interfaces in `src/types/` for all new data structures.
- Ensure `tsc -b` passes cleanly without warnings or errors.

### 4.2 Styling & Tailwind CSS v4
- Use semantic Tailwind utility classes for consistent typography, spacing, and glassmorphism.
- Always provide both light and dark mode variants using the `dark:` modifier (e.g., `bg-white dark:bg-[#070913] text-slate-900 dark:text-slate-100`).
- Use designated status tokens:
  - Optimal / Compliant: `emerald-500` / `emerald-600`
  - Warning / Moderate: `amber-500` / `amber-600`
  - Breach / Critical: `rose-500` / `rose-600`

### 4.3 Adding a New KPI Metric
1. **Define Contract**: Add the metric key and structure to `src/types/kpiPlatform.ts`.
2. **Add Calculation**: Implement the formula in `src/services/kpiCalculatorService.ts`.
3. **Add Justification**: Provide default explanation, target formula, and remediation tips in `src/services/kpiRationalesCatalog.ts`.
4. **Register in Views**: Add the metric card component in the appropriate category view under `src/components/kpi/views/`.
5. **Localization**: Add translation keys for the metric title and summary across `src/locales/*.json`.

---

## 5. Testing & Verification

Before submitting pull requests:
```bash
# 1. Typecheck the entire project
npx tsc -b

# 2. Run static linter
npm run lint

# 3. Test production build output
npm run build

# 4. Preview compiled bundle locally
npm run preview
```
