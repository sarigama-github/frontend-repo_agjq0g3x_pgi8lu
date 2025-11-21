import { createClient } from '@supabase/supabase-js'

// Prefer environment variables. If not provided, fall back to hardcoded values supplied by the user.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://hoqvpekcpxhwnjemjzuh.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Lz21ZjqEjYJYBzXgtoAoWA_cYfvanTC'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
