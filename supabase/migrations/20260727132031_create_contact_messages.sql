/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's reply email
  - `idea` (text, not null) — the project idea / message body
  - `plan` (text, not null) — selected plan: 'basic' | 'premium' | 'deluxe' | 'discuss-later'
  - `created_at` (timestaptz, defaults to now())
2. Security
- Enable RLS on `contact_messages`.
- Allow anon + authenticated INSERT only (public contact form submissions).
- No SELECT/UPDATE/DELETE for anon or authenticated — submissions are write-only from the public form.
3. Notes
- This is a single-tenant app with no sign-in screen, so the public form runs as the anon role.
- Only INSERT is permitted publicly; reading submissions is reserved for the service role (used by the edge function that forwards them to email).
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  idea text NOT NULL,
  plan text NOT NULL DEFAULT 'discuss-later',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- INSERT only: public can submit contact messages
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
