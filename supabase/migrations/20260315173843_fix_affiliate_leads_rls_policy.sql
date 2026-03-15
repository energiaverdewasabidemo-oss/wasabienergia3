/*
  # Fix affiliate_leads RLS policy
  
  ## Problem
  The current RLS policy uses a subquery that can return multiple rows,
  causing "more than one row returned by a subquery used as an expression" error.
  
  ## Solution
  Rewrite the policy to use EXISTS instead of IN with a subquery,
  which is more efficient and prevents the multiple rows error.
  
  ## Changes
  - Drop existing SELECT policy
  - Create new SELECT policy using EXISTS
*/

DROP POLICY IF EXISTS "Afiliados can read own affiliate_leads" ON affiliate_leads;

CREATE POLICY "Afiliados can read own affiliate_leads"
  ON affiliate_leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM afiliados a
      WHERE a.id = auth.uid()
      AND a.ref = affiliate_leads.ref
      LIMIT 1
    )
  );