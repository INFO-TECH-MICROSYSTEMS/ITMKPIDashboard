/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { kpiDb } from '../db/kpiDatabase';
import type { UserAccount, UserCustomCategory } from '../types/kpiPlatform';

export interface IUserRepository {
  initDefaultUser(): Promise<UserAccount>;
  getUserById(id: string): Promise<UserAccount | undefined>;
  getUserByEmail(email: string): Promise<UserAccount | undefined>;
  updateUser(user: Partial<UserAccount> & { id: string }): Promise<UserAccount>;
  getCustomCategories(userId: string): Promise<UserCustomCategory[]>;
  saveCustomCategory(category: UserCustomCategory): Promise<void>;
  deleteCustomCategory(id: string): Promise<void>;
}

export const DEFAULT_USER: UserAccount = {
  id: 'usr_sudarsha_001',
  name: 'Sudarsha Wijenayake',
  email: 'sudarsha.wijenayake@gmail.com',
  password: 'password',
  role: 'Quality Engineering Director & Chief Architect',
  department: 'Enterprise Quality & Delivery Operations',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const INITIAL_DEFAULT_CATEGORY: UserCustomCategory = {
  id: 'cat_my_critical_watchlist',
  userId: 'usr_sudarsha_001',
  title: 'My Critical Quality Watchlist',
  badge: 'Custom Deck',
  description: 'Curated executive watchlist tracking critical release readiness and defect burn-down metrics.',
  iconName: 'Sparkles',
  kpiIds: [
    'executive-readiness-gauge',
    'executive-blocker-card',
    'quality-defect-burnout-chart',
    'automation-pass-rate-gauge',
    'risk-untested-commits-card',
    'governance-sla-gauge'
  ],
  orderIndex: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export class UserRepository implements IUserRepository {
  async initDefaultUser(): Promise<UserAccount> {
    const existing = await kpiDb.users.get(DEFAULT_USER.id);
    if (!existing) {
      await kpiDb.users.put(DEFAULT_USER);
      // Also seed an initial custom watchlist for the user
      const catCount = await kpiDb.userCustomCategories.where('userId').equals(DEFAULT_USER.id).count();
      if (catCount === 0) {
        await kpiDb.userCustomCategories.put(INITIAL_DEFAULT_CATEGORY);
      }
      return DEFAULT_USER;
    }
    return existing;
  }

  async getUserById(id: string): Promise<UserAccount | undefined> {
    return await kpiDb.users.get(id);
  }

  async getUserByEmail(email: string): Promise<UserAccount | undefined> {
    return await kpiDb.users.where('email').equalsIgnoreCase(email.trim()).first();
  }

  async updateUser(user: Partial<UserAccount> & { id: string }): Promise<UserAccount> {
    const existing = await kpiDb.users.get(user.id);
    if (!existing) {
      throw new Error(`User with ID ${user.id} not found.`);
    }

    const updated: UserAccount = {
      ...existing,
      ...user,
      updatedAt: new Date().toISOString()
    };

    await kpiDb.users.put(updated);
    return updated;
  }

  async getCustomCategories(userId: string): Promise<UserCustomCategory[]> {
    const list = await kpiDb.userCustomCategories
      .where('userId')
      .equals(userId)
      .sortBy('orderIndex');
    return list;
  }

  async saveCustomCategory(category: UserCustomCategory): Promise<void> {
    const record: UserCustomCategory = {
      ...category,
      updatedAt: new Date().toISOString()
    };
    await kpiDb.userCustomCategories.put(record);
  }

  async deleteCustomCategory(id: string): Promise<void> {
    await kpiDb.userCustomCategories.delete(id);
  }
}

export const userRepository = new UserRepository();
