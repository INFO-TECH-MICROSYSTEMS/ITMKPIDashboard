/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserAccount, UserCustomCategory } from '../types/kpiPlatform';
import { userService } from '../services/userService';

interface UserContextType {
  currentUser: UserAccount | null;
  customCategories: UserCustomCategory[];
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
  updateProfile: (profile: { name: string; email: string; password?: string; department?: string; role?: string }) => Promise<void>;
  createCategory: (title: string, iconName?: string, description?: string) => Promise<UserCustomCategory>;
  deleteCategory: (categoryId: string) => Promise<void>;
  reorderKPIs: (categoryId: string, kpiIds: string[]) => Promise<void>;
  moveKPI: (categoryId: string, kpiId: string, direction: 'up' | 'down' | 'left' | 'right', columns?: number) => Promise<void>;
  addKPIsToCategory: (categoryId: string, kpiIds: string[]) => Promise<void>;
  removeKPIFromCategory: (categoryId: string, kpiId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [customCategories, setCustomCategories] = useState<UserCustomCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = useCallback(async () => {
    try {
      const user = await userService.getCurrentUser();
      const categories = await userService.getUserCustomCategories();
      setCurrentUser(user);
      setCustomCategories(categories);
    } catch (err) {
      console.error('Failed to load user account or custom categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const updateProfile = async (profile: { name: string; email: string; password?: string; department?: string; role?: string }) => {
    const updated = await userService.updateProfile(profile);
    setCurrentUser(updated);
  };

  const createCategory = async (title: string, iconName?: string, description?: string) => {
    const created = await userService.createCustomCategory(title, iconName, description);
    await refreshUserData();
    return created;
  };

  const deleteCategory = async (categoryId: string) => {
    await userService.deleteCustomCategory(categoryId);
    await refreshUserData();
  };

  const reorderKPIs = async (categoryId: string, kpiIds: string[]) => {
    await userService.reorderCustomKPIs(categoryId, kpiIds);
    setCustomCategories(prev => prev.map(cat => cat.id === categoryId ? { ...cat, kpiIds: [...kpiIds] } : cat));
  };

  const moveKPI = async (categoryId: string, kpiId: string, direction: 'up' | 'down' | 'left' | 'right', columns: number = 2) => {
    const updatedIds = await userService.moveKPI(categoryId, kpiId, direction, columns);
    setCustomCategories(prev => prev.map(cat => cat.id === categoryId ? { ...cat, kpiIds: updatedIds } : cat));
  };

  const addKPIsToCategory = async (categoryId: string, kpiIds: string[]) => {
    await userService.addMultipleKPIsToCategory(categoryId, kpiIds);
    await refreshUserData();
  };

  const removeKPIFromCategory = async (categoryId: string, kpiId: string) => {
    await userService.removeKPIFromCategory(categoryId, kpiId);
    setCustomCategories(prev => prev.map(cat => cat.id === categoryId ? {
      ...cat,
      kpiIds: cat.kpiIds.filter(id => id !== kpiId)
    } : cat));
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        customCategories,
        isLoading,
        refreshUserData,
        updateProfile,
        createCategory,
        deleteCategory,
        reorderKPIs,
        moveKPI,
        addKPIsToCategory,
        removeKPIFromCategory
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
