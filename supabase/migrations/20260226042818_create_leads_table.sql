/*
  # Create leads table for Wasabi Energy

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `nombre` (text, not null) - Customer's full name
      - `telefono` (text, not null) - Customer's phone number
      - `email` (text, not null) - Customer's email address
      - `codigo_postal` (text, not null) - Customer's postal code
      - `cups` (text) - CUPS code from electricity bill
      - `factura_url` (text) - URL to the uploaded invoice PDF in storage
      - `created_at` (timestamptz) - Timestamp when lead was created
      - `updated_at` (timestamptz) - Timestamp when lead was last updated
      - `status` (text) - Lead status: 'nuevo', 'contactado', 'convertido', 'rechazado'
      
  2. Security
    - Enable RLS on `leads` table
    - Add policy for anonymous users to insert their own lead data
    - Add policy for authenticated admin users to view all leads
    - Add policy for authenticated admin users to update lead status
    
  3. Indexes
    - Index on email for quick lookups
    - Index on created_at for sorting by date
    - Index on status for filtering leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  telefono text NOT NULL,
  email text NOT NULL,
  codigo_postal text NOT NULL,
  cups text,
  factura_url text,
  status text DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'contactado', 'convertido', 'rechazado')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert a lead (for public form submissions)
CREATE POLICY "Anyone can create a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can view all leads (for admin dashboard)
CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update leads (for admin dashboard)
CREATE POLICY "Authenticated users can update leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();