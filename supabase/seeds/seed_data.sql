-- Seed data for Supabase
-- Admin user profile (role: admin)
INSERT INTO public.profiles (id, full_name, role, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin', 'admin@example.com', now());

-- Sample pages
INSERT INTO public.pages (id, title, slug, content, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000101', 'Home', 'home', '# Welcome to the Home Page\n\nThis is the home page content.', now()),
  ('00000000-0000-0000-0000-000000000102', 'About', 'about', '# About Us\n\nInformation about the company.', now()),
  ('00000000-0000-0000-0000-000000000103', 'Services', 'services', '# Our Services\n\nDetails of services offered.', now());

-- Sample clients
INSERT INTO public.clients (id, name, email, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000201', 'Acme Corp', 'contact@acme.com', now()),
  ('00000000-0000-0000-0000-000000000202', 'Globex Inc', 'info@globex.com', now());

-- Sample projects
INSERT INTO public.projects (id, name, description, status, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000301', 'Website Redesign', 'Redesign the corporate website for a modern look.', 'active', now()),
  ('00000000-0000-0000-0000-000000000302', 'Mobile App', 'Develop a cross‑platform mobile application.', 'active', now());

-- Sample messages
INSERT INTO public.messages (id, sender_name, sender_email, subject, body, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000401', 'John Doe', 'john.doe@example.com', 'Inquiry about services', 'Hi, I would like to know more about your services.', now()),
  ('00000000-0000-0000-0000-000000000402', 'Jane Smith', 'jane.smith@example.com', 'Support request', 'I need help with my account.', now());
