/*
  # Create afiliados system tables

  1. New Tables
    - `afiliados`
      - `id` (uuid, primary key) - linked to auth.users
      - `email` (text, unique) - affiliate email
      - `nombre` (text) - affiliate full name
      - `ref` (text, unique) - affiliate referral code (no spaces, no special chars)
      - `created_at` (timestamptz) - registration date

    - `affiliate_leads`
      - `id` (uuid, primary key)
      - `nombre` (text) - lead full name
      - `telefono` (text) - lead phone
      - `ref` (text) - referral code used
      - `tipo` (text) - 'hogar' or 'negocio'
      - `estado` (text) - 'nuevo', 'contactado', 'cerrado', 'rechazado'
      - `comision_activa` (boolean) - commission activated flag
      - `fecha` (timestamptz) - creation date

  2. Security
    - Enable RLS on both tables
    - afiliados: each user can only access their own affiliate profile
    - affiliate_leads: each affiliate can only read leads with their own ref code
*/

CREATE TABLE IF NOT EXISTS afiliados (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  nombre text NOT NULL DEFAULT '',
  ref text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE afiliados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Afiliados can read own profile"
  ON afiliados FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Afiliados can update own profile"
  ON afiliados FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Afiliados can insert own profile"
  ON afiliados FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS affiliate_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL DEFAULT '',
  telefono text NOT NULL DEFAULT '',
  ref text NOT NULL DEFAULT '',
  tipo text NOT NULL DEFAULT 'hogar',
  estado text NOT NULL DEFAULT 'nuevo',
  comision_activa boolean NOT NULL DEFAULT false,
  fecha timestamptz DEFAULT now()
);

ALTER TABLE affiliate_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Afiliados can read own affiliate_leads"
  ON affiliate_leads FOR SELECT
  TO authenticated
  USING (
    ref IN (
      SELECT a.ref FROM afiliados a WHERE a.id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS affiliate_leads_ref_idx ON affiliate_leads(ref);
CREATE INDEX IF NOT EXISTS afiliados_ref_idx ON afiliados(ref);
