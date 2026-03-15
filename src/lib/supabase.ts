import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://blgvdjpduwquydcjwrdi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZ3ZkanBkdXdxdXlkY2p3cmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjMwNjQsImV4cCI6MjA4OTEzOTA2NH0.qcTNtuLFDaSZKG0iz_yjD2e7biz8yW-iltVjIVobztY'
);

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
