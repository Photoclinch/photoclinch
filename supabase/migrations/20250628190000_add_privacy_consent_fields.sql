/*
  # Add Privacy and Consent Fields

  1. New Columns
    - `phone` (text, nullable) - User's phone number
    - `marketing_consent` (boolean) - Whether user consented to marketing communications
    - `terms_accepted_at` (timestamptz) - When user accepted terms of service
    - `privacy_accepted_at` (timestamptz) - When user accepted privacy policy
    - `consent_ip_address` (text, nullable) - IP address when consent was given
    - `data_processing_consent` (boolean) - General data processing consent

  2. Security
    - Update RLS policies to include new fields
    - Add indexes for performance
*/

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS marketing_consent boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS privacy_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS consent_ip_address text,
ADD COLUMN IF NOT EXISTS data_processing_consent boolean DEFAULT true;

-- Add comments for documentation
COMMENT ON COLUMN users.phone IS 'User phone number for booking confirmations and urgent communications';
COMMENT ON COLUMN users.marketing_consent IS 'Whether user consented to receive marketing communications';
COMMENT ON COLUMN users.terms_accepted_at IS 'Timestamp when user accepted Terms of Service';
COMMENT ON COLUMN users.privacy_accepted_at IS 'Timestamp when user accepted Privacy Policy';
COMMENT ON COLUMN users.consent_ip_address IS 'IP address when consent was given for legal compliance';
COMMENT ON COLUMN users.data_processing_consent IS 'General consent for data processing as required by GDPR';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_marketing_consent ON users(marketing_consent);
CREATE INDEX IF NOT EXISTS idx_users_terms_accepted ON users(terms_accepted_at);

-- Update RLS policies to ensure users can read/update their consent preferences
-- (The existing policies already cover these fields since they apply to the entire users table)

-- Create a function to track consent changes for audit purposes
CREATE OR REPLACE FUNCTION track_consent_changes()
RETURNS trigger AS $$
BEGIN
  -- Log significant consent changes
  IF OLD.marketing_consent IS DISTINCT FROM NEW.marketing_consent OR
     OLD.data_processing_consent IS DISTINCT FROM NEW.data_processing_consent THEN
    
    INSERT INTO consent_audit_log (
      user_id,
      field_changed,
      old_value,
      new_value,
      changed_at,
      changed_by_ip
    ) VALUES (
      NEW.id,
      CASE 
        WHEN OLD.marketing_consent IS DISTINCT FROM NEW.marketing_consent THEN 'marketing_consent'
        WHEN OLD.data_processing_consent IS DISTINCT FROM NEW.data_processing_consent THEN 'data_processing_consent'
      END,
      CASE 
        WHEN OLD.marketing_consent IS DISTINCT FROM NEW.marketing_consent THEN OLD.marketing_consent::text
        WHEN OLD.data_processing_consent IS DISTINCT FROM NEW.data_processing_consent THEN OLD.data_processing_consent::text
      END,
      CASE 
        WHEN OLD.marketing_consent IS DISTINCT FROM NEW.marketing_consent THEN NEW.marketing_consent::text
        WHEN OLD.data_processing_consent IS DISTINCT FROM NEW.data_processing_consent THEN NEW.data_processing_consent::text
      END,
      now(),
      NEW.consent_ip_address
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create consent audit log table for compliance
CREATE TABLE IF NOT EXISTS consent_audit_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  field_changed text NOT NULL,
  old_value text,
  new_value text,
  changed_at timestamptz DEFAULT now(),
  changed_by_ip text
);

-- Enable RLS on audit log
ALTER TABLE consent_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Only admins can read consent audit logs"
  ON consent_audit_log
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create trigger for consent tracking
DROP TRIGGER IF EXISTS trigger_track_consent_changes ON users;
CREATE TRIGGER trigger_track_consent_changes
  AFTER UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION track_consent_changes();

-- Add indexes to audit log
CREATE INDEX IF NOT EXISTS idx_consent_audit_user_id ON consent_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_consent_audit_changed_at ON consent_audit_log(changed_at);
