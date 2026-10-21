/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { createContext, useContext } from 'react';
import { useKPIData } from '../hooks/useKPIData';

type KPIDataContextType = ReturnType<typeof useKPIData>;

const KPIDataContext = createContext<KPIDataContextType | null>(null);

export const KPIDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const kpiData = useKPIData();
  return (
    <KPIDataContext.Provider value={kpiData}>
      {children}
    </KPIDataContext.Provider>
  );
};

export function useKPIDataContext(): KPIDataContextType {
  const context = useContext(KPIDataContext);
  if (!context) {
    throw new Error('useKPIDataContext must be used within a KPIDataProvider');
  }
  return context;
}
