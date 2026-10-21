# Accessibility & Assistive Technology Guide

**Document Version:** 1.0.0 (Open Source Edition)  
**Standards:** W3C WCAG 2.1 Level AA, Section 508, ADA Title III  
**System Classification:** Open-Source Accessibility Compliance Specification

[← Back to Main README](../README.md) • [User Guide](user_guide.md) • [Globalization Guide](globalization_guide.md) • [Design System](design_system.md) • [License](LICENSE.md)

---

## 1. Accessibility Commitment & Core Principles

The **ITM KPI Dashboard** is committed to universal accessibility, ensuring that engineering metrics, quality scorecards, and audit reports are fully accessible to developers, SDETs, and technical leaders with disabilities.

Our accessibility implementation strictly follows the four WCAG principles:
1.  **Perceivable**: Content and data visualizations are readable with sufficient color contrast, clear typography, and meaningful text alternatives.
2.  **Operable**: All interface controls, navigation menus, filters, modals, and sliders can be operated completely via keyboard without traps.
3.  **Understandable**: UI states, formulas, and metric deviations are clearly explained with predictable layout behaviors.
4.  **Robust**: Markup follows semantic HTML5 and WAI-ARIA standards, ensuring compatibility across modern browsers and screen readers.

---

## 2. WCAG 2.1 Level AA Compliance Matrix

| WCAG Success Criteria | Level | Description | Implementation in ITMKPIDashboard | Status |
| :--- | :---: | :--- | :--- | :---: |
| **1.1.1 Non-text Content** | A | All non-text elements have text equivalents. | All icons (`lucide-react`) and images feature descriptive `alt` tags or `aria-hidden="true"`. | **PASS** |
| **1.3.1 Info & Relationships** | A | Structure is programmatically determinable. | Semantic HTML5 tags (`<header>`, `<aside>`, `<main>`, `<footer>`, `<h1>`-`<h3>`, `<dialog>`). | **PASS** |
| **1.4.1 Use of Color** | A | Color is not used as the only visual means of conveying info. | All KPI status badges combine background color, border, distinct icon glyph, and text status. | **PASS** |
| **1.4.3 Contrast (Minimum)** | AA | Text contrast ratio of at least 4.5:1 for normal text. | Body and title text exceed 11:1 on dark surfaces and 15:1 on light surfaces. Status tokens exceed 4.5:1. | **PASS** |
| **2.1.1 Keyboard Accessible** | A | All functionality operable via keyboard. | All filter dropdowns, category tabs, explainability modals, and exports are keyboard navigable. | **PASS** |
| **2.1.2 No Keyboard Trap** | A | Focus is never trapped in any component. | Modals and dropdowns release focus or close cleanly with `Escape` or `Tab`. | **PASS** |
| **2.4.3 Focus Order** | A | Logical, predictable tab order. | Natural DOM tab order following visual reading direction without positive `tabindex` disruptions. | **PASS** |
| **2.4.7 Focus Visible** | AA | Visible focus indicators on interactive elements. | High-visibility focus rings (`focus:ring-2 focus:ring-cyan-500`) styled across all buttons and inputs. | **PASS** |
| **3.1.1 Language of Page** | A | Default language is programmatically identified. | Synchronizes `<html lang="...">` dynamically upon switching any of the 11 supported languages. | **PASS** |
| **3.1.2 Language of Parts** | AA | Bidirectional text direction handled properly. | Dynamic `<html dir="rtl">` switching for Arabic with layout mirroring. | **PASS** |
| **4.1.2 Name, Role, Value** | A | Accessible names and roles for custom controls. | Accessible WAI-ARIA roles (`role="combobox"`, `role="dialog"`, `aria-expanded`, `aria-label`). | **PASS** |

---

## 3. Keyboard Navigation Guide

| Component | Keyboard Key | Action |
| :--- | :--- | :--- |
| **Language Selector** | `Enter` / `Space` / `Down Arrow` | Opens language menu |
| | `Up Arrow` / `Down Arrow` | Cycles through languages with visual focus |
| | `Enter` / `Space` | Selects language and updates dashboard translations |
| | `Escape` | Closes language menu without changing language |
| **Sidebar Drawer** | `Enter` / `Space` | Toggles collapse/expand state or closes mobile drawer |
| **Category Tabs** | `Enter` / `Space` / `Arrow Keys` | Switches active category view (Executive, Quality, Risk, etc.) |
| **Metric Cards** | `Enter` / `Space` | Opens Metric Justification & Explainability Modal |
| **Modal Dialogs** | `Escape` | Closes active modal and restores focus to triggering element |

---

## 4. Contrast Verification

- **Dark Mode**:
  - Primary text (`#f8fafc` on `#070913`): Contrast ratio **18.4:1** (Exceeds 4.5:1 AA)
  - Cyan accents (`#22d3ee` on `#070913`): Contrast ratio **10.6:1**
- **Light Mode**:
  - Primary text (`#0f172a` on `#ffffff`): Contrast ratio **16.1:1**
  - Cyan accents (`#0e7490` on `#ffffff`): Contrast ratio **7.2:1**
