/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Home, ShieldCheck, Activity, AlertTriangle, 
  Cpu, TrendingUp, Gauge, Compass, Plus, Sparkles, Layers 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { KPI_CATEGORIES } from '../constants/kpiConstants';
import { useUser } from '../context/UserContext';
import { CreateCategoryModal } from './kpi/CreateCategoryModal';
import { NavHeader, NavItem, NavSectionHeader, NavFooter } from './navigation';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-4 h-4 shrink-0" />,
  Activity: <Activity className="w-4 h-4 shrink-0" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4 shrink-0" />,
  Cpu: <Cpu className="w-4 h-4 shrink-0" />,
  TrendingUp: <TrendingUp className="w-4 h-4 shrink-0" />,
  Gauge: <Gauge className="w-4 h-4 shrink-0" />,
  Compass: <Compass className="w-4 h-4 shrink-0" />,
  Sparkles: <Sparkles className="w-4 h-4 shrink-0" />,
  Layers: <Layers className="w-4 h-4 shrink-0" />
};

export interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

/**
 * Sidebar: Fully Modular Navigation Panel composing NavHeader, NavItem,
 * NavSectionHeader, and NavFooter submodules.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const { customCategories } = useUser();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isHomeActive = location.pathname === '/';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Pane */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between bg-white text-slate-900 dark:bg-[#070913] dark:text-slate-100 border-r border-slate-200 dark:border-cyan-500/20 shadow-xl lg:shadow-none transition-all duration-300 ease-in-out overflow-x-hidden ${
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-20' : 'lg:w-72'
        }`}
      >
        {/* Modular Header */}
        <NavHeader
          theme={theme}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Middle Navigation Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1 custom-scrollbar">
          {/* Home Landing Page Link */}
          <NavItem
            to="/"
            icon={<Home className="w-5 h-5 shrink-0 text-cyan-600 dark:text-cyan-400" />}
            label={t('nav.home', 'Home')}
            isActive={isHomeActive}
            isCollapsed={isCollapsed}
            onClick={() => setIsMobileOpen(false)}
            className={isCollapsed ? 'lg:justify-center lg:px-2' : ''}
          />

          {/* Section Divider & Header: Built-in Categories */}
          <NavSectionHeader
            label={isCollapsed ? 'Standard' : 'Standard Categories'}
            isCollapsed={isCollapsed}
          />

          {/* Individual Built-in Category Pages */}
          {KPI_CATEGORIES.map(category => {
            const isCatActive = location.pathname === category.path;
            const categoryName = t(`kpiPlatform.categories.${category.id}`, category.name);
            const badgeText = t(`kpiPlatform.categories.${category.id}Badge`, category.badge);

            return (
              <NavItem
                key={category.id}
                to={category.path}
                icon={iconMap[category.iconName]}
                label={categoryName}
                badge={badgeText}
                isActive={isCatActive}
                isCollapsed={isCollapsed}
                onClick={() => setIsMobileOpen(false)}
              />
            );
          })}

          {/* User Custom KPI Categories Section */}
          <NavSectionHeader
            label={isCollapsed ? 'Custom' : 'My Custom Categories'}
            isCollapsed={isCollapsed}
            action={
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                title="Create New Custom KPI Category"
                className="p-1 rounded text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            }
          />

          {/* List of Custom Categories */}
          {customCategories.map(cat => {
            const customPath = `/custom/${cat.id}`;
            const isCatActive = location.pathname === customPath;

            return (
              <NavItem
                key={cat.id}
                to={customPath}
                icon={iconMap[cat.iconName] || <Sparkles className="w-4 h-4 shrink-0" />}
                label={cat.title}
                badge={`${cat.kpiIds.length} KPI${cat.kpiIds.length !== 1 ? 's' : ''}`}
                isActive={isCatActive}
                isCollapsed={isCollapsed}
                onClick={() => setIsMobileOpen(false)}
              />
            );
          })}
        </div>

        {/* Modular Footer */}
        <NavFooter
          theme={theme}
          toggleTheme={toggleTheme}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          themeToggleLabel={t('header.toggleTheme', 'Toggle Dark/Light Mode')}
          hqLocationLabel={t('nav.ottawaCanada', 'Ottawa, Canada (EST)')}
          collapseLabel={t('nav.collapseSidebar', 'Collapse sidebar')}
        />
      </aside>

      {/* Create Custom Category Modal */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
