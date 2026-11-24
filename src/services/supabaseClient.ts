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
  activeProvider: 'supabase';
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
      activeProvider: 'supabase',
      displayName: 'Supabase Cloud (Unconfigured)',
      isCloud: true,
      isOnline: false,
      lastChecked: new Date().toISOString(),
      details: 'Supabase credentials missing or unconfigured.'
    };
  }

  try {
    const { error } = await supabase.from('connectors').select('id').limit(1);
    if (error) {
      return {
        activeProvider: 'supabase',
        displayName: 'Supabase Cloud (Error)',
        url: supabaseUrl,
        isCloud: true,
        isOnline: false,
        lastChecked: new Date().toISOString(),
        details: `Cloud table query error: ${error.message}`
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
    return {
      activeProvider: 'supabase',
      displayName: 'Supabase Cloud (Offline)',
      url: supabaseUrl,
      isCloud: true,
      isOnline: false,
      lastChecked: new Date().toISOString(),
      details: `Cloud connection error: ${err?.message || 'Network unreachable'}`
    };
  }
}
