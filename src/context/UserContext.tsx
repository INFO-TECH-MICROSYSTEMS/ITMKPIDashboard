/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserAccount, UserCustomCategory, UserRole } from '../types/kpiPlatform';
import { AuthService, type RegisterDTO, type LoginDTO } from '../services/authService';
import { CryptoService } from '../services/cryptoService';
import { kpiRepository } from '../services/kpiRepository';
import { kpiDb } from '../db/kpiDatabase';

interface UserContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  allUsers: UserAccount[];
  adminCount: number;
  customCategories: UserCustomCategory[];
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (dto: LoginDTO) => Promise<UserAccount>;
  register: (dto: RegisterDTO) => Promise<UserAccount>;
  logout: () => void;
  updateProfile: (profile: { name: string; email: string; department?: string; password?: string }) => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUserRole: (targetUserId: string, newRole: UserRole) => Promise<void>;
  deleteUser: (targetUserId: string) => Promise<void>;
  createCategory: (title: string, iconName?: string, description?: string) => Promise<UserCustomCategory>;
  deleteCategory: (categoryId: string) => Promise<void>;
  reorderKPIs: (categoryId: string, kpiIds: string[]) => Promise<void>;
  moveKPI: (categoryId: string, kpiId: string, direction: 'up' | 'down' | 'left' | 'right', columns?: number) => Promise<void>;
  addKPIsToCategory: (categoryId: string, kpiIds: string[]) => Promise<void>;
  removeKPIFromCategory: (categoryId: string, kpiId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => AuthService.getStoredSession());
  const [allUsers, setAllUsers] = useState<UserAccount[]>([]);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [customCategories, setCustomCategories] = useState<UserCustomCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const refreshUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [users, admins] = await Promise.all([
        kpiRepository.getAllUsers(),
        kpiRepository.getAdminCount()
      ]);
      setAllUsers(users);
      setAdminCount(admins);

      // Verify and sync active session from DB
      const session = AuthService.getStoredSession();
      if (session) {
        const freshUser = users.find(u => u.id === session.id);
        if (freshUser) {
          setCurrentUser(freshUser);
          AuthService.setStoredSession(freshUser);
          
          // Load custom categories for logged in user
          const categories = await kpiDb.userCustomCategories
            .where('userId')
            .equals(freshUser.id)
            .sortBy('orderIndex');
          setCustomCategories(categories);
        } else {
          // User was deleted from DB
          setCurrentUser(null);
          AuthService.setStoredSession(null);
          setCustomCategories([]);
        }
      } else {
        setCurrentUser(null);
        setCustomCategories([]);
      }
    } catch (err) {
      console.error('Failed to load user session & accounts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const login = async (dto: LoginDTO) => {
    const user = await AuthService.login(dto);
    setCurrentUser(user);
    await refreshUserData();
    setIsAuthModalOpen(false);
    return user;
  };

  const register = async (dto: RegisterDTO) => {
    const user = await AuthService.register(dto);
    setCurrentUser(user);
    await refreshUserData();
    setIsAuthModalOpen(false);
    return user;
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setCustomCategories([]);
  };

  const updateProfile = async (profile: { name: string; email: string; department?: string; password?: string }) => {
    if (!currentUser) return;
    const user = await kpiRepository.getUserById(currentUser.id);
    if (!user) return;

    user.name = profile.name.trim();
    user.email = profile.email.trim().toLowerCase();
    if (profile.department !== undefined) user.department = profile.department.trim();
    if (profile.password && profile.password.trim().length >= 6) {
      const salt = CryptoService.generateSalt();
      user.passwordSalt = salt;
      user.passwordHash = await CryptoService.hashPassword(profile.password.trim(), salt);
    }
    user.updatedAt = new Date().toISOString();
    await kpiRepository.saveUser(user);
    await refreshUserData();
  };

  const updateUserRole = async (targetUserId: string, newRole: UserRole) => {
    if (!currentUser || currentUser.role !== 'admin') {
      throw new Error('Only an Administrator can update user roles.');
    }
    await kpiRepository.updateUserRole(targetUserId, newRole);
    await refreshUserData();
  };

  const deleteUser = async (targetUserId: string) => {
    if (!currentUser || currentUser.role !== 'admin') {
      throw new Error('Only an Administrator can remove user accounts.');
    }
    await kpiRepository.deleteUser(targetUserId);
    await refreshUserData();
  };

  const createCategory = async (title: string, iconName: string = 'Layers', description?: string) => {
    if (!currentUser) throw new Error('Please sign in to create custom decks.');

    const newCategory: UserCustomCategory = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser.id,
      title: title.trim(),
      badge: 'Custom Deck',
      description: description || 'Custom quality engineering workspace',
      iconName,
      kpiIds: [],
      orderIndex: customCategories.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kpiDb.userCustomCategories.put(newCategory);
    await refreshUserData();
    return newCategory;
  };

  const deleteCategory = async (categoryId: string) => {
    await kpiDb.userCustomCategories.delete(categoryId);
    await refreshUserData();
  };

  const reorderKPIs = async (categoryId: string, kpiIds: string[]) => {
    const cat = await kpiDb.userCustomCategories.get(categoryId);
    if (cat) {
      cat.kpiIds = [...kpiIds];
      cat.updatedAt = new Date().toISOString();
      await kpiDb.userCustomCategories.put(cat);
      setCustomCategories(prev => prev.map(c => c.id === categoryId ? { ...c, kpiIds: [...kpiIds] } : c));
    }
  };

  const moveKPI = async (categoryId: string, kpiId: string, direction: 'up' | 'down' | 'left' | 'right', columns: number = 2) => {
    const cat = customCategories.find(c => c.id === categoryId);
    if (!cat) return;

    const list = [...cat.kpiIds];
    const index = list.indexOf(kpiId);
    if (index === -1) return;

    let targetIndex = index;
    if (direction === 'left' && index > 0) targetIndex = index - 1;
    else if (direction === 'right' && index < list.length - 1) targetIndex = index + 1;
    else if (direction === 'up' && index >= columns) targetIndex = index - columns;
    else if (direction === 'down' && index + columns < list.length) targetIndex = index + columns;

    if (targetIndex !== index) {
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      await reorderKPIs(categoryId, list);
    }
  };

  const addKPIsToCategory = async (categoryId: string, kpiIds: string[]) => {
    const cat = await kpiDb.userCustomCategories.get(categoryId);
    if (cat) {
      const set = new Set(cat.kpiIds);
      kpiIds.forEach(id => set.add(id));
      cat.kpiIds = Array.from(set);
      cat.updatedAt = new Date().toISOString();
      await kpiDb.userCustomCategories.put(cat);
      await refreshUserData();
    }
  };

  const removeKPIFromCategory = async (categoryId: string, kpiId: string) => {
    const cat = await kpiDb.userCustomCategories.get(categoryId);
    if (cat) {
      cat.kpiIds = cat.kpiIds.filter(id => id !== kpiId);
      cat.updatedAt = new Date().toISOString();
      await kpiDb.userCustomCategories.put(cat);
      setCustomCategories(prev => prev.map(c => c.id === categoryId ? {
        ...c,
        kpiIds: cat.kpiIds
      } : c));
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        isAdmin: currentUser?.role === 'admin',
        allUsers,
        adminCount,
        customCategories,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        register,
        logout,
        updateProfile,
        refreshUserData,
        updateUserRole,
        deleteUser,
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
