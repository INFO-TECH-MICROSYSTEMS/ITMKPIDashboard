/**
 * Copyright (c) 2026 INFO TECH MICROSYSTEMS. All Rights Reserved.
 * 
 * Proprietary and Confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * via any medium, is strictly prohibited.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface StorageStatus {
  activeProvider: 'supabase' | 'dexie';
  displayName: string;
  url?: string;
  isCloud: boolean;
  isOnline: boolean;
  lastChecked: string;
  details: string;
}

export async function checkStorageHealth(): Promise<StorageStatus> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      activeProvider: 'dexie',
      displayName: 'Local Browser IndexedDB (Dexie.js)',
      isCloud: false,
      isOnline: true,
      lastChecked: new Date().toISOString(),
      details: 'Operating on client-side persistent IndexedDB storage.'
    };
  }

  try {
    // Probe Supabase connectivity with a lightweight ping
    const { error } = await supabase.from('connectors').select('id').limit(1);
    if (error) {
      console.warn('[Storage] Supabase reachable test failed, falling back to IndexedDB:', error.message);
      return {
        activeProvider: 'dexie',
        displayName: 'Local Browser IndexedDB (Dexie Fallback)',
        url: supabaseUrl,
        isCloud: false,
        isOnline: false,
        lastChecked: new Date().toISOString(),
        details: `Supabase credentials present, but cloud table query reported: ${error.message}. Local storage active.`
      };
    }

    return {
      activeProvider: 'supabase',
      displayName: 'Supabase PostgreSQL Cloud DB',
      url: supabaseUrl,
      isCloud: true,
      isOnline: true,
      lastChecked: new Date().toISOString(),
      details: 'Connected securely via Supabase client to managed PostgreSQL cloud instance.'
    };
  } catch (err: any) {
    console.warn('[Storage] Supabase connection exception:', err);
    return {
      activeProvider: 'dexie',
      displayName: 'Local Browser IndexedDB (Dexie Fallback)',
      url: supabaseUrl,
      isCloud: false,
      isOnline: false,
      lastChecked: new Date().toISOString(),
      details: `Cloud connection error: ${err?.message || 'Network unreachable'}. Fallback to local IndexedDB active.`
    };
  }
}
