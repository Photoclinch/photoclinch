-- SQL script to create an admin user in Supabase
-- Run this in your Supabase SQL Editor

-- Update an existing user to admin role (replace 'your-email@example.com' with actual email)
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';

-- Or create a new admin user directly (you'll need to sign up first with regular signup, then run this)
-- Replace the UUID with the actual user ID from auth.users table
-- UPDATE users 
-- SET role = 'admin' 
-- WHERE id = 'your-user-uuid-here';

-- To see all users and their roles:
SELECT id, email, firstname, lastname, role, phone, createdat 
FROM users 
ORDER BY createdat DESC;

-- To make yourself admin, first sign up normally, then run:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
