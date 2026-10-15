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
 * where each KPI is rendered as an authentic status-colored card widget with
 * left accent border, status badge, hero metric value, and target indicators.
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

const PPT_THEMES: Record<string, {
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeBorder: string;
  text: string;
  strip: string;
}> = {
  emerald: {
    cardBg: 'F0FDF4',       // emerald-50
    cardBorder: '6EE7B7',   // emerald-300
    badgeBg: 'D1FAE5',      // emerald-100
    badgeBorder: '6EE7B7',  // emerald-300
    text: '059669',         // emerald-600
    strip: '10B981'         // emerald-500
  },
  amber: {
    cardBg: 'FEFCE8',       // amber-50
    cardBorder: 'FCD34D',   // amber-300
    badgeBg: 'FEF3C7',      // amber-100
    badgeBorder: 'FCD34D',  // amber-300
    text: 'D97706',         // amber-600
    strip: 'F59E0B'         // amber-500
  },
  rose: {
    cardBg: 'FFF1F2',       // rose-50
    cardBorder: 'FDA4AF',   // rose-300
    badgeBg: 'FFE4E6',      // rose-100
    badgeBorder: 'FDA4AF',  // rose-300
    text: 'E11D48',         // rose-600
    strip: 'F43F5E'         // rose-500
  },
  cyan: {
    cardBg: 'ECFEFF',       // cyan-50
    cardBorder: '67E8F9',   // cyan-300
    badgeBg: 'CFFAFE',      // cyan-100
    badgeBorder: '67E8F9',  // cyan-300
    text: '0891B2',         // cyan-600
    strip: '06B6D4'         // cyan-500
  },
  purple: {
    cardBg: 'FAF5FF',       // purple-50
    cardBorder: 'D8B4FE',   // purple-300
    badgeBg: 'F3E8FF',      // purple-100
    badgeBorder: 'D8B4FE',  // purple-300
    text: '9333EA',         // purple-600
    strip: 'A855F7'         // purple-500
  }
};

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
      color: '38BDF8' // sky-400
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
      fontFace: 'Helvetica'
    });

    // ==========================================
    // Slide per Selected Category
    // ==========================================
    const categoriesToRender = EXPORTABLE_KPI_CATALOG.filter(cat =>
      cat.items.some(item => selectedKpiIds.has(item.id))
    );

    for (const category of categoriesToRender) {
      const selectedItems = category.items.filter(item => selectedKpiIds.has(item.id));
      if (selectedItems.length === 0) continue;

      const categoryName = t(category.nameKey, category.defaultName);
      const categoryBadge = t(category.badgeKey, category.defaultBadge);

      // Render items in groups of 6 (up to 2 rows x 3 columns per slide)
      const pageSize = 6;
      const totalSlidesForCategory = Math.ceil(selectedItems.length / pageSize);

      for (let sIdx = 0; sIdx < totalSlidesForCategory; sIdx++) {
        const slideItems = selectedItems.slice(sIdx * pageSize, (sIdx + 1) * pageSize);

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

        const slideSubtitle = totalSlidesForCategory > 1
          ? `${categoryName.toUpperCase()} (${sIdx + 1}/${totalSlidesForCategory})`
          : categoryName.toUpperCase();

        slide.addText(slideSubtitle, {
          x: 0.6,
          y: 0.18,
          w: 8.5,
          h: 0.4,
          fontSize: 15,
          fontFace: 'Helvetica',
          bold: true,
          color: 'FFFFFF'
        });

        slide.addText(`${filters.product} • ${filters.component} • v${filters.releaseVersion}  [${categoryBadge}]`, {
          x: 0.6,
          y: 0.58,
          w: 12.0,
          h: 0.3,
          fontSize: 9,
          fontFace: 'Helvetica',
          color: '94A3B8'
        });

        // 3 columns x 2 rows grid
        const cols = slideItems.length <= 4 ? 2 : 3;
        const cardW = cols === 2 ? 5.8 : 3.8;
        const cardH = cols === 2 ? 2.5 : 2.5;
        const gapX = 0.3;
        const gapY = 0.35;
        const originX = 0.6;
        const originY = 1.35;

        slideItems.forEach((item, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const cardX = originX + col * (cardW + gapX);
          const cardY = originY + row * (cardH + gapY);

          const localizedName = t(item.nameKey, item.defaultName);
          const kpiVal = item.getValue(metrics, jiraItems, testRailExecutions);
          const theme = PPT_THEMES[kpiVal.statusColor] || PPT_THEMES.cyan;

          // 1. Card Container (Rounded Card with status tint)
          slide.addShape(pres.ShapeType.roundRect, {
            x: cardX,
            y: cardY,
            w: cardW,
            h: cardH,
            rectRadius: 0.12,
            fill: { color: theme.cardBg },
            line: { color: theme.cardBorder, width: 1.5 }
          });

          // 2. Left Status Accent Bar (Strip)
          slide.addShape(pres.ShapeType.roundRect, {
            x: cardX,
            y: cardY,
            w: 0.14,
            h: cardH,
            rectRadius: 0.06,
            fill: { color: theme.strip }
          });

          // 3. Card Title (Top Left)
          slide.addText(localizedName, {
            x: cardX + 0.25,
            y: cardY + 0.18,
            w: cardW - 1.6,
            h: 0.45,
            fontSize: 9.5,
            fontFace: 'Helvetica',
            bold: true,
            color: '334155'
          });

          // 4. Status Badge (Top Right Pill)
          const badgeW = 1.25;
          const badgeH = 0.32;
          const badgeX = cardX + cardW - badgeW - 0.2;
          const badgeY = cardY + 0.18;

          slide.addShape(pres.ShapeType.roundRect, {
            x: badgeX,
            y: badgeY,
            w: badgeW,
            h: badgeH,
            rectRadius: 0.08,
            fill: { color: theme.badgeBg },
            line: { color: theme.badgeBorder, width: 1 }
          });

          slide.addText(kpiVal.status.toUpperCase(), {
            x: badgeX,
            y: badgeY,
            w: badgeW,
            h: badgeH,
            fontSize: 7.5,
            fontFace: 'Helvetica',
            bold: true,
            align: 'center',
            color: theme.text
          });

          // 5. Main Hero Value (Large Status-Colored Text)
          slide.addText(String(kpiVal.value), {
            x: cardX + 0.25,
            y: cardY + 0.72,
            w: cardW - 0.5,
            h: 0.75,
            fontSize: 24,
            fontFace: 'Helvetica',
            bold: true,
            color: theme.text
          });

          // 6. Target / SLA Section
          slide.addText([
            { text: `${t('kpiPlatform.targetLabel', 'Target')}: `, options: { color: '64748B', bold: false } },
            { text: item.target, options: { color: '059669', bold: true } }
          ], {
            x: cardX + 0.25,
            y: cardY + 1.55,
            w: cardW - 0.5,
            h: 0.35,
            fontSize: 8.5,
            fontFace: 'Helvetica'
          });

          // 7. Context / Trend Sub-line
          if (kpiVal.trend) {
            slide.addText(`• ${kpiVal.trend}`, {
              x: cardX + 0.25,
              y: cardY + 1.95,
              w: cardW - 0.5,
              h: 0.4,
              fontSize: 8,
              fontFace: 'Helvetica',
              color: '475569'
            });
          }
        });
      }
    }

    // Save File
    const safeComponent = filters.component.replace(/[^a-zA-Z0-9]/g, '');
    const safeDate = new Date().toISOString().split('T')[0];
    const filename = `KPI_Report_${filters.product}_${safeComponent}_v${filters.releaseVersion}_${safeDate}.pptx`;

    await pres.writeFile({ fileName: filename });
  }
}
