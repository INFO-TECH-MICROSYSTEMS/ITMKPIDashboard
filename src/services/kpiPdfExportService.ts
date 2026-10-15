/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

/**
 * Enterprise PDF Export Service
 * Generates branded, localized quality engineering PDF reports with scoped titles,
 * multi-dimensional filter banners, and status-colored metric cards/tables.
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
    const margin = 14;

    // Header Background Accent
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 42, 'F');

    // Brand Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(6, 182, 212); // cyan-400
    doc.text('INFO TECH MICROSYSTEMS • QUALITY ENGINEERING PLATFORM', margin, 12);

    // Scoped Document Title
    const reportTitle = `${filters.product} • ${filters.component} • Release v${filters.releaseVersion}`;
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(reportTitle, margin, 22);

    // Subtitle & Filter Scope details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184); // slate-400
    const filterInfo = `${t('kpiPlatform.filters.window', 'Window')}: ${releaseWindow.startDate} - ${releaseWindow.endDate} (${releaseWindow.totalDays}d) | ${t('kpiPlatform.exportDialog.activeDataset', 'Dataset')}: ${testRailExecutions.length} Tests, ${jiraItems.length} Work Items | ${t('kpiPlatform.exportDialog.language', 'Language')}: ${language.toUpperCase()}`;
    doc.text(filterInfo, margin, 30);

    // Timestamp
    const exportedAt = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.text(`${t('kpiPlatform.exportDialog.generatedAt', 'Generated')}: ${exportedAt}`, margin, 36);

    let startY = 48;

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

    for (const category of categoriesToRender) {
      const selectedItems = category.items.filter(item => selectedKpiIds.has(item.id));
      if (selectedItems.length === 0) continue;

      // Category Header Banner
      const categoryName = t(category.nameKey, category.defaultName);
      const categoryBadge = t(category.badgeKey, category.defaultBadge);

      if (startY > 250) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(241, 245, 249); // slate-100
      doc.roundedRect(margin, startY, pageWidth - margin * 2, 8, 2, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text(categoryName.toUpperCase(), margin + 3, startY + 5.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`[${categoryBadge}]`, pageWidth - margin - 3, startY + 5.5, { align: 'right' });

      startY += 11;

      // Table Data Rows
      const tableRows = selectedItems.map(item => {
        const localizedName = t(item.nameKey, item.defaultName);
        const kpiVal = item.getValue(metrics, jiraItems, testRailExecutions);
        return [
          localizedName,
          String(kpiVal.value),
          item.target,
          kpiVal.status.toUpperCase(),
          kpiVal.trend || '-'
        ];
      });

      autoTable(doc, {
        startY,
        margin: { left: margin, right: margin },
        head: [[
          t('kpiPlatform.exportDialog.colKpi', 'KPI Indicator'),
          t('kpiPlatform.exportDialog.colValue', 'Current Value'),
          t('kpiPlatform.exportDialog.colTarget', 'Target / SLA'),
          t('kpiPlatform.exportDialog.colStatus', 'Status'),
          t('kpiPlatform.exportDialog.colInsight', 'Context / Trend')
        ]],
        body: tableRows,
        theme: 'striped',
        styles: {
          fontSize: 8,
          cellPadding: 2.2,
          font: 'helvetica'
        },
        headStyles: {
          fillColor: [15, 23, 42],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        columnStyles: {
          0: { cellWidth: 55, fontStyle: 'bold' },
          1: { cellWidth: 32, fontStyle: 'bold' },
          2: { cellWidth: 32 },
          3: { cellWidth: 26 },
          4: { cellWidth: 'auto' }
        },
        didParseCell: (data) => {
          // Colorize the Status column
          if (data.section === 'body' && data.column.index === 3) {
            const raw = String(data.cell.raw).toUpperCase();
            if (raw === 'OPTIMAL') {
              data.cell.styles.textColor = [16, 185, 129]; // Emerald
              data.cell.styles.fontStyle = 'bold';
            } else if (raw === 'WARNING') {
              data.cell.styles.textColor = [217, 119, 6]; // Amber
              data.cell.styles.fontStyle = 'bold';
            } else if (raw === 'BREACHED') {
              data.cell.styles.textColor = [225, 29, 72]; // Rose
              data.cell.styles.fontStyle = 'bold';
            }
          }
        }
      });

      const finalY = (doc as any).lastAutoTable?.finalY;
      startY = finalY ? finalY + 8 : startY + 30;
    }

    // Footer with Page Numbers
    const totalPages = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `ITM Quality Engineering Platform • ${reportTitle} • Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 6,
        { align: 'center' }
      );
    }

    // Filename
    const safeComponent = filters.component.replace(/[^a-zA-Z0-9]/g, '');
    const safeDate = new Date().toISOString().split('T')[0];
    const filename = `KPI_Report_${filters.product}_${safeComponent}_v${filters.releaseVersion}_${safeDate}.pdf`;

    doc.save(filename);
  }
}
