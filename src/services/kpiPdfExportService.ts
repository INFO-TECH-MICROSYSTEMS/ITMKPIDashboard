/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Enterprise PDF Export Service
 * Generates branded, localized quality engineering PDF reports rendering each KPI
 * as a visual, status-colored KPI card widget exactly as it appears in the web application.
 */

import jsPDF from 'jspdf';
import type { KPIFilterState, ReleaseWindow } from '../types/kpiPlatform';
import { EXPORTABLE_KPI_CATALOG } from '../constants/kpiExportCatalog';

export interface PDFExportOptions {
  selectedKpiIds: Set<string>;
  filters: KPIFilterState;
  releaseWindow: ReleaseWindow;
  metrics: any;
  jiraItems: any[];
  testRailExecutions: any[];
  t: (key: string, defaultValue?: string) => string;
  language: string;
}

const STATUS_RGB_PALETTE: Record<string, {
  border: [number, number, number];
  bg: [number, number, number];
  badgeBg: [number, number, number];
  badgeBorder: [number, number, number];
  text: [number, number, number];
  strip: [number, number, number];
}> = {
  emerald: {
    border: [110, 231, 183],       // emerald-300
    bg: [240, 253, 244],           // emerald-50/70
    badgeBg: [209, 250, 229],      // emerald-100
    badgeBorder: [110, 231, 183],  // emerald-300
    text: [5, 150, 105],           // emerald-600
    strip: [16, 185, 129]          // emerald-500
  },
  amber: {
    border: [252, 211, 77],        // amber-300
    bg: [254, 252, 232],           // amber-50/70
    badgeBg: [254, 243, 199],      // amber-100
    badgeBorder: [252, 211, 77],   // amber-300
    text: [217, 119, 6],           // amber-600
    strip: [245, 158, 11]          // amber-500
  },
  rose: {
    border: [253, 164, 175],       // rose-300
    bg: [255, 241, 242],           // rose-50/70
    badgeBg: [255, 228, 230],      // rose-100
    badgeBorder: [253, 164, 175],  // rose-300
    text: [225, 29, 72],           // rose-600
    strip: [244, 63, 94]           // rose-500
  },
  cyan: {
    border: [103, 232, 249],       // cyan-300
    bg: [236, 254, 255],           // cyan-50/70
    badgeBg: [207, 250, 254],      // cyan-100
    badgeBorder: [103, 232, 249],  // cyan-300
    text: [8, 145, 178],           // cyan-600
    strip: [6, 182, 212]           // cyan-500
  },
  purple: {
    border: [216, 180, 254],       // purple-300
    bg: [250, 245, 255],           // purple-50/70
    badgeBg: [243, 232, 255],      // purple-100
    badgeBorder: [216, 180, 254],  // purple-300
    text: [147, 51, 234],          // purple-600
    strip: [168, 85, 247]          // purple-500
  }
};

export class KPIPdfExportService {
  static exportToPDF(options: PDFExportOptions): void {
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

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;

    const renderHeader = (isCover = false) => {
      // Header Background Accent (Dark Slate)
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, isCover ? 38 : 22, 'F');

      // Brand Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(6, 182, 212); // cyan-400
      doc.text('INFO TECH MICROSYSTEMS • QUALITY ENGINEERING PLATFORM', margin, 10);

      // Scoped Document Title: Product • Component • Release Target
      const reportTitle = `${filters.product} • ${filters.component} • Release v${filters.releaseVersion}`;
      doc.setFontSize(isCover ? 14 : 11);
      doc.setTextColor(255, 255, 255);
      doc.text(reportTitle, margin, isCover ? 20 : 18);

      if (isCover) {
        // Subtitle & Filter Scope details
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        const filterInfo = `${t('kpiPlatform.filters.window', 'Window')}: ${releaseWindow.startDate} - ${releaseWindow.endDate} (${releaseWindow.totalDays}d) | ${t('kpiPlatform.exportDialog.activeDataset', 'Dataset')}: ${testRailExecutions.length} Tests, ${jiraItems.length} Work Items | ${t('kpiPlatform.exportDialog.language', 'Language')}: ${language.toUpperCase()}`;
        doc.text(filterInfo, margin, 28);

        // Timestamp
        const exportedAt = new Date().toLocaleString();
        doc.setFontSize(7.5);
        doc.text(`${t('kpiPlatform.exportDialog.generatedAt', 'Generated')}: ${exportedAt}`, margin, 34);
      }
    };

    // Render initial page header
    renderHeader(true);
    let currentY = 46;

    // Filter categories that have selected items
    const categoriesToRender = EXPORTABLE_KPI_CATALOG.filter(cat =>
      cat.items.some(item => selectedKpiIds.has(item.id))
    );

    if (categoriesToRender.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139);
      doc.text(t('kpiPlatform.exportDialog.noKpisSelected', 'No KPIs were selected for export.'), margin, 60);
      doc.save(`KPI_Report_${filters.product}_${filters.releaseVersion}.pdf`);
      return;
    }

    // Grid measurements (2 columns of cards)
    const cardGap = 8;
    const cardWidth = (pageWidth - margin * 2 - cardGap) / 2; // ~87mm
    const cardHeight = 36; // mm per card widget

    for (const category of categoriesToRender) {
      const selectedItems = category.items.filter(item => selectedKpiIds.has(item.id));
      if (selectedItems.length === 0) continue;

      // Check if category header + at least one row of cards fits on current page
      if (currentY + 12 + cardHeight > pageHeight - 16) {
        doc.addPage();
        renderHeader(false);
        currentY = 28;
      }

      // Category Section Banner
      const categoryName = t(category.nameKey, category.defaultName);
      const categoryBadge = t(category.badgeKey, category.defaultBadge);

      doc.setFillColor(241, 245, 249); // slate-100
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 7.5, 2, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text(categoryName.toUpperCase(), margin + 3, currentY + 5.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`[${categoryBadge}]`, pageWidth - margin - 3, currentY + 5.2, { align: 'right' });

      currentY += 11;

      // Render items in a 2-column card grid exactly as rendered in the webapp
      for (let i = 0; i < selectedItems.length; i += 2) {
        // Check page overflow for this pair of cards
        if (currentY + cardHeight > pageHeight - 16) {
          doc.addPage();
          renderHeader(false);
          currentY = 28;
        }

        const rowItems = selectedItems.slice(i, i + 2);

        rowItems.forEach((item, colIdx) => {
          const cardX = margin + colIdx * (cardWidth + cardGap);
          const cardY = currentY;

          const localizedName = t(item.nameKey, item.defaultName);
          const kpiVal = item.getValue(metrics, jiraItems, testRailExecutions);
          const palette = STATUS_RGB_PALETTE[kpiVal.statusColor] || STATUS_RGB_PALETTE.cyan;

          // 1. Card Background
          doc.setFillColor(palette.bg[0], palette.bg[1], palette.bg[2]);
          doc.setDrawColor(palette.border[0], palette.border[1], palette.border[2]);
          doc.setLineWidth(0.4);
          doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 3, 3, 'FD');

          // 2. Left Status Accent Bar (Strip)
          doc.setFillColor(palette.strip[0], palette.strip[1], palette.strip[2]);
          doc.roundedRect(cardX, cardY, 2.5, cardHeight, 1.2, 1.2, 'F');

          // 3. Card Title (Top Left)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(51, 65, 85); // slate-700
          const truncatedTitle = localizedName.length > 36 ? localizedName.substring(0, 34) + '...' : localizedName;
          doc.text(truncatedTitle, cardX + 4.5, cardY + 6);

          // 4. Status Badge (Top Right Pill)
          const badgeWidth = 22;
          const badgeHeight = 5;
          const badgeX = cardX + cardWidth - badgeWidth - 3;
          const badgeY = cardY + 2.5;

          doc.setFillColor(palette.badgeBg[0], palette.badgeBg[1], palette.badgeBg[2]);
          doc.setDrawColor(palette.badgeBorder[0], palette.badgeBorder[1], palette.badgeBorder[2]);
          doc.setLineWidth(0.2);
          doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 1.5, 1.5, 'FD');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(palette.text[0], palette.text[1], palette.text[2]);
          doc.text(kpiVal.status.toUpperCase(), badgeX + badgeWidth / 2, badgeY + 3.6, { align: 'center' });

          // 5. Main KPI Value (Hero Number, Status-Colored)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(palette.text[0], palette.text[1], palette.text[2]);
          doc.text(String(kpiVal.value), cardX + 4.5, cardY + 19);

          // 6. Target / SLA Section (Bottom Left)
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(100, 116, 139); // slate-500
          doc.text(`${t('kpiPlatform.targetLabel', 'Target')}: `, cardX + 4.5, cardY + 26);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(5, 150, 105); // emerald-600
          doc.text(item.target, cardX + 14.5, cardY + 26);

          // 7. Trend / Insight Context (Bottom Sub-row)
          if (kpiVal.trend) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6.5);
            doc.setTextColor(71, 85, 105); // slate-600
            const truncatedTrend = kpiVal.trend.length > 40 ? kpiVal.trend.substring(0, 38) + '...' : kpiVal.trend;
            doc.text(`• ${truncatedTrend}`, cardX + 4.5, cardY + 31.5);
          }
        });

        currentY += cardHeight + 4;
      }

      currentY += 4; // gap between categories
    }

    // Footer with Page Numbers
    const totalPages = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `ITM Quality Engineering Platform • ${filters.product} • ${filters.component} • v${filters.releaseVersion} • Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 6,
        { align: 'center' }
      );
    }

    // Save File
    const safeComponent = filters.component.replace(/[^a-zA-Z0-9]/g, '');
    const safeDate = new Date().toISOString().split('T')[0];
    const filename = `KPI_Report_${filters.product}_${safeComponent}_v${filters.releaseVersion}_${safeDate}.pdf`;

    doc.save(filename);
  }
}
