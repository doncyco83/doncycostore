import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder strings during build time if environment variables are not set.
// This prevents createClient from throwing "supabaseUrl is required" errors.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project-id.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
