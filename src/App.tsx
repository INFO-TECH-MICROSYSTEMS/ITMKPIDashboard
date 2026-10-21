/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { KPIDataProvider } from './context/KPIDataContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { KPIPlatformPage } from './pages/KPIPlatformPage';
import { KPICategoryPage } from './pages/KPICategoryPage';

export function App() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('itm_sidebar_collapsed');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('itm_sidebar_collapsed', JSON.stringify(isCollapsed));
    } catch {
      // ignore storage errors
    }
  }, [isCollapsed]);

  return (
    <ThemeProvider>
      <KPIDataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-[#070913] dark:text-slate-100 transition-colors duration-300">
            
            {/* Collapsible Left Side Navigation Pane */}
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
            />

            {/* Main Viewport Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
              <TopHeader onMenuClick={() => setIsMobileOpen(true)} />
              
              <main className="flex-grow">
                <Routes>
                  {/* Root Route: Informative Landing Page */}
                  <Route path="/" element={<HomePage />} />

                  {/* Unified KPI Overview Dashboard */}
                  <Route path="/kpi" element={<KPIPlatformPage />} />
                  <Route path="/kpis" element={<KPIPlatformPage />} />

                  {/* Dedicated Category Pages */}
                  <Route path="/executive" element={<KPICategoryPage categoryId="executive" />} />
                  <Route path="/quality" element={<KPICategoryPage categoryId="quality" />} />
                  <Route path="/risk" element={<KPICategoryPage categoryId="risk" />} />
                  <Route path="/automation" element={<KPICategoryPage categoryId="automation" />} />
                  <Route path="/productivity" element={<KPICategoryPage categoryId="productivity" />} />
                  <Route path="/governance" element={<KPICategoryPage categoryId="governance" />} />
                  <Route path="/leading-lagging" element={<KPICategoryPage categoryId="leadingLagging" />} />

                  {/* Fallback to root */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>

          </div>
        </BrowserRouter>
      </KPIDataProvider>
    </ThemeProvider>
  );
}

export default App;
