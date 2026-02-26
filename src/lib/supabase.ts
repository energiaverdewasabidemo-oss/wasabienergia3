import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  nombre: string;
  telefono: string;
  email: string;
  codigo_postal: string;
  cups?: string;
  factura_url?: string;
  status?: 'nuevo' | 'contactado' | 'convertido' | 'rechazado';
  created_at?: string;
  updated_at?: string;
}
