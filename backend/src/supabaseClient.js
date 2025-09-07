import { createClient } from '@supabase/supabase-js';

// These will be set in the .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);