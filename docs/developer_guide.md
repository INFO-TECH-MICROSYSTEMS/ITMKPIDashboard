# Developer Setup & Engineering Guide

**Document Version:** 2.4.0  
**Effective Date:** September 2026  
**Audience:** Contributing Engineers, Architecture Consultants, DevOps Specialists

[← Back to Main README](../README.md) • [User Guide](user_guide.md) • [Architecture & Modularization](architecture_and_modularization.md) • [Deployment Guide](deployment_guide.md) • [License](LICENSE.md)

---

## 1. Prerequisites & Environment Setup

Ensure your local workstation meets the following specifications:

| Requirement | Minimum Version | Recommended Version | Verification Command |
| :--- | :--- | :--- | :--- |
| **Node.js** | `v20.0.0` | `v24.x LTS` | `node -v` |
| **npm** | `v10.0.0` | `v11.x` | `npm -v` |
| **Operating System** | Windows 10/11, macOS 13+, Ubuntu 22.04+ | Windows 11 / macOS Sequoia | `uname -a` or `ver` |
| **Git** | `v2.40.0` | `v2.47.x` | `git --version` |

> [!IMPORTANT]
> This project uses modern ESM modules (`"type": "module"` in `package.json`). All custom scripts in `/scripts` must use ES module syntax (`import`/`export`).

---

## 2. Installation & Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/INFO-TECH-MICROSYSTEMS/ITMWebSite.git
   cd ITMWebSite
   ```

2. **Install exact dependencies:**
   ```bash
   npm install
   ```

3. **Launch the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to [http://localhost:5173](http://localhost:5173). The local server features Hot Module Replacement (HMR) powered by Vite 8.

4. **Verify static analysis and compile checks:**
   ```bash
   npm run build
   ```

---

## 3. Project Directory Structure

```plaintext
ITMWebSite/
├── .github/                     # CI/CD workflows and automated verification
├── docs/                        # Comprehensive documentation portfolio
│   ├── accessibility_guide.md   # WCAG 2.1 AA compliance & assistive technology
│   ├── architecture_and_modularization.md # System architecture & component design
│   ├── deployment_guide.md      # Production build, hosting, and cloud deployment
│   ├── design_system.md         # UI tokens, color palettes, and glassmorphism specs
│   ├── developer_guide.md       # Setup, workflow, and engineering standards
│   ├── globalization_guide.md   # i18n architecture, 11 languages, and RTL
│   ├── implemented_requirements.md # Requirement traceability matrix
│   ├── LICENSE.md               # Proprietary license agreement & terms of use
│   └── user_guide.md            # End-user interactive manual
├── public/                      # Static assets, logos, and founder portrait
│   ├── assets/
│   │   ├── itm-logo-dark.png    # High-res dark mode corporate emblem
│   │   ├── itm-logo-light.png   # High-res light mode corporate emblem
│   │   └── sudarsha-wijenayake.jpg # Principal consultant portrait
├── scripts/                     # Node automation scripts for i18n and builds
├── src/                         # Application source code
│   ├── components/              # Reusable UI widgets and layout modules
│   │   ├── kpi/                 # Telemetry widgets, filter bars, and modals
│   │   │   └── views/           # Category views (Executive, Quality, Risk, etc.)
│   │   ├── ContactForm.tsx      # Interactive inquiry form with clipboard & mailto
│   │   ├── Footer.tsx           # Multi-column footer with contact strip
│   │   ├── LanguageSelector.tsx # Accessible language picker with flags
│   │   ├── Sidebar.tsx          # Collapsible navigation drawer
│   │   └── TopHeader.tsx        # Sticky top bar with quick actions & theme toggle
│   ├── constants/               # Global KPI constants and UI themes
│   ├── context/                 # React Contexts (ThemeContext)
│   ├── data/                    # Master service specs & baseline KPI definitions
│   ├── db/                      # IndexedDB schema, Dexie instance, and seeder
│   ├── hooks/                   # Custom hooks (useKPIData, useLocalizedData)
│   ├── i18n/                    # i18next configuration and language definitions
│   ├── locales/                 # 11 Locale JSON packs (en, zh, es, fr, ar, etc.)
│   ├── pages/                   # Top-level route pages
│   ├── services/                # Pure business logic, calculations, and repos
│   ├── types/                   # TypeScript interfaces and type definitions
│   ├── App.tsx                  # Root component and router configuration
│   └── main.tsx                 # Application entry point with i18n initialization
├── package.json                 # Project dependencies and script declarations
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite 8 build and plugin configuration
└── README.md                    # Main repository landing documentation
```

---

## 4. Available Scripts

The following scripts are defined in `package.json`:

```bash
# Start Vite development server with hot-reload
npm run dev

# Run TypeScript compiler check (tsc -b) followed by production Vite build
npm run build

# Fast linter powered by oxlint
npm run lint

# Preview the built production output in dist/ locally
npm run preview
```

---

## 5. Coding Standards & Conventions

### 5.1 Proprietary Copyright Header
Every `.ts` and `.tsx` file in `src/` must begin with the standard copyright header:

```typescript
/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */
```

### 5.2 TypeScript & Typing Integrity
*   Always enable strict mode (`"strict": true` in `tsconfig.json`).
*   Do not use `any` unless explicitly wrapping unknown third-party payloads with fallback guards.
*   Centralize entity interfaces in [`src/types/index.ts`](file:///c:/Users/Developer/Documents/GitHub/ITMWebSite/src/types/index.ts) or [`src/types/kpiPlatform.ts`](file:///c:/Users/Developer/Documents/GitHub/ITMWebSite/src/types/kpiPlatform.ts).

### 5.3 Tailwind CSS v4 Best Practices
*   Use semantic color tokens (`cyan`, `purple`, `slate`, `emerald`, `amber`, `rose`).
*   Support dual-theme styling using `dark:` variants:
    ```tsx
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white" />
    ```
*   Respect Right-to-Left (RTL) flipping with `rtl:rotate-180` or directional margins where appropriate.

---

## 6. Internationalization (i18n) Workflow

### 6.1 Adding a New Translation Key
1. Add the key and its English text into [`src/locales/en.json`](file:///c:/Users/Developer/Documents/GitHub/ITMWebSite/src/locales/en.json).
2. Add the corresponding translated strings to the remaining 10 locale files:
   - `zh.json` (Chinese)
   - `es.json` (Spanish)
   - `fr.json` (French)
   - `ar.json` (Arabic)
   - `de.json` (German)
   - `ja.json` (Japanese)
   - `hi.json` (Hindi)
   - `pt.json` (Portuguese)
   - `ru.json` (Russian)
   - `bn.json` (Bengali)
3. Consume the key in components via the `useTranslation` hook:
   ```tsx
   const { t } = useTranslation();
   <h1>{t('myNamespace.myKey', 'Fallback English Text')}</h1>
   ```

### 6.2 Translating Rich Arrays & Objects
Use the dedicated [`useLocalizedData`](file:///c:/Users/Developer/Documents/GitHub/ITMWebSite/src/hooks/useLocalizedData.ts) hooks:
*   `useLocalizedServices()`: Returns localized services with translated taglines, full descriptions, capabilities, deliverables, case studies, and FAQs.
*   `useLocalizedAuditTemplates()`: Returns localized QA audit checklist pillars and verification items.
*   `useLocalizedCoreKPIs()`: Returns localized formulas, benchmarks, and business justifications.

---

## 7. Telemetry & IndexedDB Debugging

To inspect or manipulate the client-side IndexedDB engine in Google Chrome or Microsoft Edge:
1. Open Developer Tools (`F12` or `Ctrl+Shift+I`).
2. Navigate to the **Application** tab.
3. In the left sidebar, expand **Storage** → **IndexedDB** → **`ITM_KPI_Platform_DB`**.
4. You can directly inspect `workItems`, `testExecutions`, `deployments`, and `codeQualityScans`.
5. To reset the database programmatically, use the "Reset Demo Data" button in the KPI Platform or execute in DevTools Console:
   ```javascript
   import { resetAndReseedDatabase } from './src/db/seeder';
   await resetAndReseedDatabase();
   ```

---

<div align="center">
  <sub>Document maintained by INFO TECH MICROSYSTEMS Developer Operations.</sub>
</div>
