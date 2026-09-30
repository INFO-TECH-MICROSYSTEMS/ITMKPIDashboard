# Accessibility & Assistive Technology Guide

**Document Version:** 2.4.0  
**Effective Date:** September 2026  
**Standards:** W3C WCAG 2.1 Level AA, Section 508, EN 301 549, ADA Title III

[← Back to Main README](../README.md) • [User Guide](user_guide.md) • [Globalization Guide](globalization_guide.md) • [Design System](design_system.md) • [License](LICENSE.md)

---

## 1. Accessibility Commitment & Principles

INFO TECH MICROSYSTEMS is dedicated to providing an inclusive, universally accessible digital experience for all users, including software developers, engineering leaders, and auditors with visual, motor, auditory, or cognitive disabilities.

Our accessibility framework is built on the four core WCAG principles:
1.  **Perceivable**: Information and UI components are presentable to users in ways they can perceive (e.g. text contrast, screen reader compatibility).
2.  **Operable**: User interface components and navigation are operable entirely via keyboard and assistive hardware.
3.  **Understandable**: Content is readable, language is explicitly declared, and user inputs have clear validation feedback.
4.  **Robust**: Markup is standards-compliant, supporting current and future user agents and assistive software.

---

## 2. Compliance Checklist & Implementation Matrix

| WCAG Criteria | Level | Description | Implementation in ITM Web Suite |
| :--- | :---: | :--- | :--- |
| **1.1.1 Non-text Content** | A | All non-text content has text alternatives. | All icons (`lucide-react`) and images (`itm-logo`, founder photo) have meaningful `alt` or `aria-hidden` attributes. |
| **1.3.1 Info and Relationships** | A | Structure conveyed through presentation is programmatically determinable. | Proper semantic HTML5 hierarchy (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`-`<h3>`). |
| **1.4.3 Contrast (Minimum)** | AA | Visual presentation of text has a contrast ratio of at least 4.5:1. | Dark mode text (`slate-100`/`white`) on `#070913` exceeds 14:1. Light mode text (`slate-900`) on white exceeds 16:1. |
| **2.1.1 Keyboard** | A | All functionality is operable through a keyboard interface. | Full keyboard navigation across navigation drawer, sliders, modals, tabs, and language picker. |
| **2.1.2 No Keyboard Trap** | A | No keyboard traps in modals or popups. | `Escape` key closes modals, dropdowns, and drawers, restoring focus to triggering elements. |
| **2.4.3 Focus Order** | A | Focusable components receive focus in an order that preserves meaning. | Logical tab order following visual flow without positive `tabIndex` disruptions. |
| **2.4.7 Focus Visible** | AA | Any keyboard focusable interface has an operable focus indicator. | High-visibility focus rings (`focus:ring-2 focus:ring-cyan-500`) styled across all interactive elements. |
| **3.1.1 Language of Page** | A | Default language of each web page can be programmatically determined. | Dynamic synchronization of `<html lang="...">` on every language change. |
| **3.1.2 Language of Parts** | AA | Language of specific content parts can be determined. | Bidirectional text direction (`dir="ltr"` / `dir="rtl"`) set dynamically for Arabic. |
| **4.1.2 Name, Role, Value** | A | Name and role can be programmatically determined for all UI components. | Full WAI-ARIA implementation on custom components (`role="combobox"`, `role="tablist"`, `aria-expanded`). |

---

## 3. Keyboard Navigation Specifications

Every interactive control on the platform is fully operable without a mouse:

### 3.1 Language Selector Keyboard Map
*   **`Enter` / `Space` / `Down Arrow`**: Opens the language dropdown menu.
*   **`Down Arrow` / `Up Arrow`**: Cycles through available languages with visual highlight tracking.
*   **`Enter` / `Space`**: Selects the highlighted language, applies translations, closes menu, and refocuses the trigger button.
*   **`Escape`**: Dismisses the dropdown immediately without changing the active language.
*   **`Tab`**: Exits the dropdown menu cleanly.

### 3.2 Tools & KPI Platform Keyboard Navigation
*   **Tabs (`/tools`, `/kpi`)**: Standard arrow key navigation cycles between tool tabs (`DORA`, `Audit`, `Capacity`, `KPIs`).
*   **Sliders**: Native range inputs support `Left Arrow` / `Right Arrow` for precise increments and `Home` / `End` for minimum/maximum limits.
*   **Audit Checkboxes**: Fully toggleable with `Space` or `Enter`.
*   **Modal Overlays**: `Escape` immediately dismisses Metric Justification and Connector Configuration modals.

---

## 4. Color Contrast Standards & Colorblindness Safeguards

*   **Dual Coding**: Critical status information never relies solely on color. All KPI badges combine:
    1.  *Background & Border Color* (Emerald, Amber, Rose, Cyan)
    2.  *Icon Glyph* (Checkmark, Alert Triangle, Cross, Activity)
    3.  *Explicit Textual Status* ("Optimal", "Manageable", "Blast Radius Alert", "Gate Violation")
*   **Contrast Ratios**:
    *   Primary Headings (`text-slate-900` on `#ffffff`): **18.2:1**
    *   Dark Mode Body Text (`text-slate-200` on `#0d1428`): **11.4:1**
    *   Accent Text (`text-cyan-700` light / `text-cyan-400` dark): **6.8:1** (Exceeds 4.5:1 AA requirement)

---

<div align="center">
  <sub>Document maintained by INFO TECH MICROSYSTEMS Quality & Accessibility Engineering.</sub>
</div>
