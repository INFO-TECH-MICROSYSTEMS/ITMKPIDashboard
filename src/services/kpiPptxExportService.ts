/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Enterprise PowerPoint Presentation Export Service
 * Generates branded, editable 16:9 PowerPoint (.pptx) presentations
 * with dedicated cover slide, category breakdown slides, and status color cards.
 */

import pptxgen from 'pptxgenjs';
import type { KPIFilterState, ReleaseWindow } from '../types/kpiPlatform';
import { EXPORTABLE_KPI_CATALOG } from '../constants/kpiExportCatalog';

export interface PptxExportOptions {
  selectedKpiIds: Set<string>;
  filters: KPIFilterState;
  releaseWindow: ReleaseWindow;
  metrics: any;
  jiraItems: any[];
  testRailExecutions: any[];
  t: (key: string, defaultValue?: string) => string;
  language: string;
}

export class KPIPptxExportService {
  static async exportToPPTX(options: PptxExportOptions): Promise<void> {
    const {
      selectedKpiIds,
      filters,
      releaseWindow,
      metrics,
      jiraItems,
      testRailExecutions,
      t,
      language
    } = options;

    const pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';
    pres.title = `${filters.product} • ${filters.component} • Release v${filters.releaseVersion}`;
    pres.author = 'INFO TECH MICROSYSTEMS';

    // ==========================================
    // Slide 1: Cover Slide
    // ==========================================
    const coverSlide = pres.addSlide();
    coverSlide.background = { color: '0F172A' }; // slate-900

    // Top Brand Tag
    coverSlide.addText('INFO TECH MICROSYSTEMS • QUALITY ENGINEERING EXECUTIVE REPORT', {
      x: 0.8,
      y: 0.8,
      w: 11.5,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      bold: true,
      color: '06B6D4' // cyan-500
    });

    // Main Title (Scoped)
    const reportTitle = `${filters.product} • Release v${filters.releaseVersion}`;
    coverSlide.addText(reportTitle, {
      x: 0.8,
      y: 1.4,
      w: 11.5,
      h: 1.0,
      fontSize: 32,
      fontFace: 'Helvetica',
      bold: true,
      color: 'FFFFFF'
    });

    // Component Scope
    coverSlide.addText(`${t('kpiPlatform.filters.component', 'Scope Component')}: ${filters.component}`, {
      x: 0.8,
      y: 2.5,
      w: 11.5,
      h: 0.5,
      fontSize: 18,
      fontFace: 'Helvetica',
      bold: true,
      color: '94A3B8' // slate-400
    });

    // Telemetry Summary Card on Cover
    coverSlide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 3.5,
      w: 11.7,
      h: 1.8,
      rectRadius: 0.15,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 }
    });

    coverSlide.addText([
      { text: `${t('kpiPlatform.exportDialog.activeDataset', 'Active Dataset')}: `, options: { bold: true, color: 'FFFFFF' } },
      { text: `${testRailExecutions.length} Tests | ${jiraItems.length} Jira Work Items\n`, options: { color: '38BDF8' } },
      { text: `${t('kpiPlatform.filters.window', 'Release Window')}: `, options: { bold: true, color: 'FFFFFF' } },
      { text: `${releaseWindow.startDate} to ${releaseWindow.endDate} (${releaseWindow.totalDays} days total)\n`, options: { color: 'CBD5E1' } },
      { text: `${t('kpiPlatform.exportDialog.language', 'Export Language')}: `, options: { bold: true, color: 'FFFFFF' } },
      { text: `${language.toUpperCase()} | `, options: { color: 'CBD5E1' } },
      { text: `${t('kpiPlatform.exportDialog.generatedAt', 'Generated')}: `, options: { bold: true, color: 'FFFFFF' } },
      { text: `${new Date().toLocaleString()}`, options: { color: 'CBD5E1' } }
    ], {
      x: 1.1,
      y: 3.7,
      w: 11.1,
      h: 1.4,
      fontSize: 12,
      fontFace: 'Helvetica',
      lineSpacing: 22
    });

    // ==========================================
    // Slide per Selected Category
    // ==========================================
    const categoriesToRender = EXPORTABLE_KPI_CATALOG.filter(cat =>
      cat.items.some(item => selectedKpiIds.has(item.id))
    );

    const statusHexColors = {
      emerald: '10B981', // Green
      amber: 'F59E0B',   // Yellow
      rose: 'F43F5E',    // Red
      cyan: '06B6D4',    // Cyan
      purple: 'A855F7'   // Purple
    };

    for (const category of categoriesToRender) {
      const selectedItems = category.items.filter(item => selectedKpiIds.has(item.id));
      if (selectedItems.length === 0) continue;

      const slide = pres.addSlide();
      slide.background = { color: 'F8FAFC' }; // slate-50

      // Category Header Bar
      slide.addShape(pres.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 13.33,
        h: 1.0,
        fill: { color: '0F172A' }
      });

      const categoryName = t(category.nameKey, category.defaultName);
      const categoryBadge = t(category.badgeKey, category.defaultBadge);

      slide.addText(categoryName.toUpperCase(), {
        x: 0.6,
        y: 0.2,
        w: 8.0,
        h: 0.4,
        fontSize: 16,
        fontFace: 'Helvetica',
        bold: true,
        color: 'FFFFFF'
      });

      slide.addText(`${filters.product} • ${filters.component} • v${filters.releaseVersion}  [${categoryBadge}]`, {
        x: 0.6,
        y: 0.6,
        w: 12.0,
        h: 0.3,
        fontSize: 9,
        fontFace: 'Helvetica',
        color: '94A3B8'
      });

      // Render items in a 2-column or 3-column clean card grid
      const cols = selectedItems.length <= 4 ? 2 : 3;
      const cardW = cols === 2 ? 5.8 : 3.8;
      const cardH = cols === 2 ? 2.1 : 1.9;
      const gapX = 0.3;
      const gapY = 0.3;
      const originX = 0.6;
      const originY = 1.3;

      selectedItems.forEach((item, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const cardX = originX + col * (cardW + gapX);
        const cardY = originY + row * (cardH + gapY);

        if (row >= 2) return; // Keep max 6 items per slide cleanly

        const localizedName = t(item.nameKey, item.defaultName);
        const kpiVal = item.getValue(metrics, jiraItems, testRailExecutions);
        const accentHex = statusHexColors[kpiVal.statusColor] || '06B6D4';

        // Card Container
        slide.addShape(pres.ShapeType.roundRect, {
          x: cardX,
          y: cardY,
          w: cardW,
          h: cardH,
          rectRadius: 0.12,
          fill: { color: 'FFFFFF' },
          line: { color: 'E2E8F0', width: 1 }
        });

        // Top Accent Strip
        slide.addShape(pres.ShapeType.roundRect, {
          x: cardX,
          y: cardY,
          w: cardW,
          h: 0.08,
          rectRadius: 0.05,
          fill: { color: accentHex }
        });

        // Title
        slide.addText(localizedName, {
          x: cardX + 0.2,
          y: cardY + 0.18,
          w: cardW - 0.4,
          h: 0.35,
          fontSize: 10,
          fontFace: 'Helvetica',
          bold: true,
          color: '334155'
        });

        // Value
        slide.addText(String(kpiVal.value), {
          x: cardX + 0.2,
          y: cardY + 0.6,
          w: cardW - 1.6,
          h: 0.6,
          fontSize: 22,
          fontFace: 'Helvetica',
          bold: true,
          color: accentHex
        });

        // Status Badge Pill
        slide.addShape(pres.ShapeType.roundRect, {
          x: cardX + cardW - 1.4,
          y: cardY + 0.65,
          w: 1.2,
          h: 0.35,
          rectRadius: 0.08,
          fill: { color: `${accentHex}20` },
          line: { color: accentHex, width: 1 }
        });

        slide.addText(kpiVal.status.toUpperCase(), {
          x: cardX + cardW - 1.4,
          y: cardY + 0.65,
          w: 1.2,
          h: 0.35,
          fontSize: 8,
          fontFace: 'Helvetica',
          bold: true,
          align: 'center',
          color: accentHex
        });

        // Target / SLA & Trend Note
        const footerNote = `${t('kpiPlatform.targetLabel', 'Target')}: ${item.target}${kpiVal.trend ? ` | ${kpiVal.trend}` : ''}`;
        slide.addText(footerNote, {
          x: cardX + 0.2,
          y: cardY + cardH - 0.4,
          w: cardW - 0.4,
          h: 0.3,
          fontSize: 8,
          fontFace: 'Helvetica',
          color: '64748B'
        });
      });
    }

    // Save File
    const safeComponent = filters.component.replace(/[^a-zA-Z0-9]/g, '');
    const safeDate = new Date().toISOString().split('T')[0];
    const filename = `KPI_Report_${filters.product}_${safeComponent}_v${filters.releaseVersion}_${safeDate}.pptx`;

    await pres.writeFile({ fileName: filename });
  }
}
