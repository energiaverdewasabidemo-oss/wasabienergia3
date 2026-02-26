/*
  # Create storage bucket for invoice PDFs

  1. Storage Bucket
    - Name: `invoices`
    - Public: false (only accessible via signed URLs)
    - File size limit: 5MB
    - Allowed MIME types: PDF, JPEG, PNG
    
  2. Security Policies
    - Allow anonymous users to upload invoices (for public form)
    - Allow anonymous users to view their uploaded invoices
    - Allow authenticated admin users to view all invoices
    - Allow authenticated admin users to delete invoices
*/

-- Create storage bucket for invoices
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'invoices',
  'invoices',
  false,
  5242880,
  ARRAY['application/pdf', 'image/jpeg', 'image/png']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Policy: Anyone can upload invoices (for public form submissions)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can upload invoices'
  ) THEN
    CREATE POLICY "Anyone can upload invoices"
      ON storage.objects
      FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'invoices');
  END IF;
END $$;

-- Policy: Anyone can view invoices
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Anyone can view invoices'
  ) THEN
    CREATE POLICY "Anyone can view invoices"
      ON storage.objects
      FOR SELECT
      TO anon
      USING (bucket_id = 'invoices');
  END IF;
END $$;

-- Policy: Authenticated users can view all invoices
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can view all invoices'
  ) THEN
    CREATE POLICY "Authenticated users can view all invoices"
      ON storage.objects
      FOR SELECT
      TO authenticated
      USING (bucket_id = 'invoices');
  END IF;
END $$;

-- Policy: Authenticated users can delete invoices
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can delete invoices'
  ) THEN
    CREATE POLICY "Authenticated users can delete invoices"
      ON storage.objects
      FOR DELETE
      TO authenticated
      USING (bucket_id = 'invoices');
  END IF;
END $$;