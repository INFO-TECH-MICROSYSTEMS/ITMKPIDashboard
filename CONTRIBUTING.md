# Contributing to ITMKPIDashboard

Thank you for your interest in contributing to the **ITM Quality Engineering KPI & Data Mining Platform**! This project is an open-source, client-side analytical platform delivering deep engineering telemetry, automated quality gating, and executive scorecards.

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. Please treat fellow contributors, reviewers, and users with professional respect, constructive feedback, and collaboration.

---

## How to Contribute

### 1. Reporting Bugs & Feature Requests
- Check existing [GitHub Issues](https://github.com/INFO-TECH-MICROSYSTEMS/ITMKPIDashboard/issues) before opening a new ticket.
- Provide a clear and descriptive title, steps to reproduce, expected vs. actual behavior, and relevant browser/OS details.

### 2. Local Development Workflow
1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/ITMKPIDashboard.git
   cd ITMKPIDashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Run static validation and production compilation before submitting changes:
   ```bash
   npm run build
   npm run lint
   ```

### 3. Branching & Commit Conventions
- Use descriptive branch names:
  - `feat/kpi-export-enhancement`
  - `fix/dora-mttr-calculation`
  - `docs/update-architecture`
- Follow Conventional Commits:
  - `feat(...)`: New capability or dashboard widget
  - `fix(...)`: Bug fix in calculations or rendering
  - `docs(...)`: Documentation updates
  - `refactor(...)`: Code adjustments without behavior changes

### 4. Pull Request Guidelines
- Ensure all TypeScript types pass (`tsc -b`).
- Keep PRs focused on a single logical change.
- Include screenshots or brief descriptions when updating visual UI components or PDF/PPTX exports.

---

## Licensing of Contributions

By submitting code, documentation, or other assets to this repository, you agree that your contributions are licensed under the [Apache License, Version 2.0](LICENSE).
