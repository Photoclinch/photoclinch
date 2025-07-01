/*
  # Create user_requirements table

  1. New Tables
    - `user_requirements` - Store user service requests
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `service_type` (text)
      - `preferred_date` (date, nullable)
      - `budget` (text)
      - `description` (text, nullable)
      - `urgency` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_requirements` table
    - Add policies for authenticated users to manage their own requirements
*/

CREATE TABLE IF NOT EXISTS user_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('photography', 'videography', 'editing')),
  preferred_date date,
  budget text NOT NULL,
  description text,
  urgency text DEFAULT 'flexible' CHECK (urgency IN ('urgent', 'soon', 'flexible', 'planning')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_requirements ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert requirements (for public form submissions)
CREATE POLICY "Anyone can submit requirements"
  ON user_requirements
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own requirements (if authenticated)
CREATE POLICY "Users can read own requirements"
  ON user_requirements
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Allow admins to read all requirements
CREATE POLICY "Admins can read all requirements"
  ON user_requirements
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_requirements_email ON user_requirements(email);
CREATE INDEX IF NOT EXISTS idx_user_requirements_service_type ON user_requirements(service_type);
CREATE INDEX IF NOT EXISTS idx_user_requirements_created_at ON user_requirements(created_at);