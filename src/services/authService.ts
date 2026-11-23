/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { kpiRepository } from './kpiRepository';
import { CryptoService } from './cryptoService';
import { kpiDb } from '../db/kpiDatabase';
import type { UserAccount, UserCustomCategory, UserRole } from '../types/kpiPlatform';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  department?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  private static SESSION_KEY = 'itm_kpi_active_user_session';

  /**
   * Retrieves current authenticated user session if present in localStorage.
   */
  static getStoredSession(): UserAccount | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(this.SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static setStoredSession(user: UserAccount | null): void {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.SESSION_KEY);
    }
  }

  /**
   * Registers a new account:
   * Rule: If 0 admin accounts exist in the database, this newly registered user
   * automatically receives 'admin' permissions! Otherwise, they are created as 'user'.
   */
  static async register(dto: RegisterDTO): Promise<UserAccount> {
    const emailNormalized = dto.email.trim().toLowerCase();
    const existing = await kpiRepository.getUserByEmail(emailNormalized);
    if (existing) {
      throw new Error(`An account with email "${emailNormalized}" already exists.`);
    }

    const salt = CryptoService.generateSalt();
    const passwordHash = await CryptoService.hashPassword(dto.password, salt);

    // Check if an admin exists
    const adminCount = await kpiRepository.getAdminCount();
    const assignedRole: UserRole = adminCount === 0 ? 'admin' : 'user';

    const newUser: UserAccount = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: dto.name.trim(),
      email: emailNormalized,
      role: assignedRole,
      passwordHash,
      passwordSalt: salt,
      department: dto.department?.trim() || 'Quality Engineering',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    await kpiRepository.saveUser(newUser);

    // Create default starter custom deck for the new user
    const defaultDeck: UserCustomCategory = {
      id: `cat_${Date.now()}_watchlist`,
      userId: newUser.id,
      title: 'My Critical Quality Watchlist',
      badge: 'Custom Deck',
      description: 'Curated watchlist tracking release readiness, gating bugs, and defect trends.',
      iconName: 'Sparkles',
      kpiIds: [
        'executive-readiness-gauge',
        'executive-blocker-card',
        'quality-defect-burnout-chart',
        'automation-suite-pass-rate',
        'risk-no-unit-tests',
        'governance-sla-adherence'
      ],
      orderIndex: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await kpiDb.userCustomCategories.put(defaultDeck);

    this.setStoredSession(newUser);
    return newUser;
  }

  /**
   * Validates credentials and logs in the user.
   */
  static async login(dto: LoginDTO): Promise<UserAccount> {
    const emailNormalized = dto.email.trim().toLowerCase();
    const user = await kpiRepository.getUserByEmail(emailNormalized);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isValid = await CryptoService.verifyPassword(dto.password, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      throw new Error('Invalid email or password.');
    }

    user.lastLoginAt = new Date().toISOString();
    await kpiRepository.saveUser(user);

    this.setStoredSession(user);
    return user;
  }

  /**
   * Logs out the user.
   */
  static logout(): void {
    this.setStoredSession(null);
  }

  /**
   * Promotes a user to admin (Caller must be an Admin).
   */
  static async promoteToAdmin(targetUserId: string, callerRole: UserRole): Promise<void> {
    if (callerRole !== 'admin') {
      throw new Error('Permission denied: Only Administrators can grant admin privileges.');
    }
    await kpiRepository.updateUserRole(targetUserId, 'admin');
  }

  /**
   * Demotes an admin to user (Caller must be an Admin).
   */
  static async demoteToUser(targetUserId: string, callerRole: UserRole): Promise<void> {
    if (callerRole !== 'admin') {
      throw new Error('Permission denied: Only Administrators can modify roles.');
    }
    await kpiRepository.updateUserRole(targetUserId, 'user');
  }
}
