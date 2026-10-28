/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { userRepository, type IUserRepository } from './userRepository';
import type { UserAccount, UserCustomCategory } from '../types/kpiPlatform';

export interface IUserService {
  getCurrentUser(): Promise<UserAccount>;
  updateProfile(profile: { name: string; email: string; password?: string; department?: string; role?: string }): Promise<UserAccount>;
  getUserCustomCategories(): Promise<UserCustomCategory[]>;
  createCustomCategory(title: string, iconName?: string, description?: string): Promise<UserCustomCategory>;
  updateCustomCategory(category: UserCustomCategory): Promise<void>;
  deleteCustomCategory(categoryId: string): Promise<void>;
  reorderCustomKPIs(categoryId: string, kpiIds: string[]): Promise<void>;
  moveKPI(categoryId: string, kpiId: string, direction: 'up' | 'down' | 'left' | 'right', columns?: number): Promise<string[]>;
  addKPIToCategory(categoryId: string, kpiId: string): Promise<void>;
  addMultipleKPIsToCategory(categoryId: string, newKpiIds: string[]): Promise<void>;
  removeKPIFromCategory(categoryId: string, kpiId: string): Promise<void>;
}

export class UserService implements IUserService {
  private repo: IUserRepository;
  private currentUserId: string = 'usr_sudarsha_001';

  constructor(repo: IUserRepository = userRepository) {
    this.repo = repo;
  }

  async getCurrentUser(): Promise<UserAccount> {
    const user = await this.repo.initDefaultUser();
    this.currentUserId = user.id;
    return user;
  }

  async updateProfile(profile: { name: string; email: string; password?: string; department?: string; role?: string }): Promise<UserAccount> {
    const updated = await this.repo.updateUser({
      id: this.currentUserId,
      name: profile.name.trim(),
      email: profile.email.trim(),
      ...(profile.password ? { password: profile.password } : {}),
      ...(profile.department !== undefined ? { department: profile.department } : {}),
      ...(profile.role !== undefined ? { role: profile.role } : {})
    });
    return updated;
  }

  async getUserCustomCategories(): Promise<UserCustomCategory[]> {
    return await this.repo.getCustomCategories(this.currentUserId);
  }

  async createCustomCategory(title: string, iconName: string = 'Layers', description?: string): Promise<UserCustomCategory> {
    const existing = await this.getUserCustomCategories();
    const newCategory: UserCustomCategory = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: this.currentUserId,
      title: title.trim(),
      badge: 'Custom Deck',
      description: description || 'Custom quality engineering workspace',
      iconName,
      kpiIds: [],
      orderIndex: existing.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await this.repo.saveCustomCategory(newCategory);
    return newCategory;
  }

  async updateCustomCategory(category: UserCustomCategory): Promise<void> {
    await this.repo.saveCustomCategory(category);
  }

  async deleteCustomCategory(categoryId: string): Promise<void> {
    await this.repo.deleteCustomCategory(categoryId);
  }

  async reorderCustomKPIs(categoryId: string, kpiIds: string[]): Promise<void> {
    const categories = await this.getUserCustomCategories();
    const target = categories.find(c => c.id === categoryId);
    if (!target) return;

    target.kpiIds = [...kpiIds];
    await this.repo.saveCustomCategory(target);
  }

  /**
   * Moves a KPI widget in a 2D responsive grid.
   * - 'left': moves index - 1
   * - 'right': moves index + 1
   * - 'up': moves index - columns (defaults to 2 for standard dashboard column grids)
   * - 'down': moves index + columns
   */
  async moveKPI(categoryId: string, kpiId: string, direction: 'up' | 'down' | 'left' | 'right', columns: number = 2): Promise<string[]> {
    const categories = await this.getUserCustomCategories();
    const target = categories.find(c => c.id === categoryId);
    if (!target) return [];

    const list = [...target.kpiIds];
    const currentIndex = list.indexOf(kpiId);
    if (currentIndex === -1) return list;

    let targetIndex = currentIndex;

    switch (direction) {
      case 'left':
        targetIndex = currentIndex - 1;
        break;
      case 'right':
        targetIndex = currentIndex + 1;
        break;
      case 'up':
        targetIndex = currentIndex - columns;
        break;
      case 'down':
        targetIndex = currentIndex + columns;
        break;
    }

    // Bound check
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= list.length) targetIndex = list.length - 1;

    if (targetIndex !== currentIndex) {
      // Remove item and re-insert at target position
      const [movedItem] = list.splice(currentIndex, 1);
      list.splice(targetIndex, 0, movedItem);

      target.kpiIds = list;
      await this.repo.saveCustomCategory(target);
    }

    return list;
  }

  async addKPIToCategory(categoryId: string, kpiId: string): Promise<void> {
    const categories = await this.getUserCustomCategories();
    const target = categories.find(c => c.id === categoryId);
    if (!target) return;

    if (!target.kpiIds.includes(kpiId)) {
      target.kpiIds = [...target.kpiIds, kpiId];
      await this.repo.saveCustomCategory(target);
    }
  }

  async addMultipleKPIsToCategory(categoryId: string, newKpiIds: string[]): Promise<void> {
    const categories = await this.getUserCustomCategories();
    const target = categories.find(c => c.id === categoryId);
    if (!target) return;

    // Append items preserving user order while avoiding duplicates
    const updated = [...target.kpiIds];
    for (const id of newKpiIds) {
      if (!updated.includes(id)) {
        updated.push(id);
      }
    }
    target.kpiIds = updated;
    await this.repo.saveCustomCategory(target);
  }

  async removeKPIFromCategory(categoryId: string, kpiId: string): Promise<void> {
    const categories = await this.getUserCustomCategories();
    const target = categories.find(c => c.id === categoryId);
    if (!target) return;

    target.kpiIds = target.kpiIds.filter(id => id !== kpiId);
    await this.repo.saveCustomCategory(target);
  }
}

export const userService = new UserService();
