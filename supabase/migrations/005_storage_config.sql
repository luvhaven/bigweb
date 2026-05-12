-- ================================================================
-- STORAGE BUCKETS CONFIGURATION
-- ================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('media', 'media', true),
('portfolios', 'portfolios', true),
('blog-images', 'blog-images', true),
('avatars', 'avatars', true),
('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- STORAGE POLICIES
-- ================================================================

-- Media bucket (public read, admin write)
CREATE POLICY "Public can view media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'media');

CREATE POLICY "Admins can upload media"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'media' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

CREATE POLICY "Admins can update media"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'media' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

CREATE POLICY "Admins can delete media"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'media' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

-- Portfolio bucket
CREATE POLICY "Public can view portfolios"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolios');

CREATE POLICY "Admins can manage portfolios"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'portfolios' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

-- Blog images bucket
CREATE POLICY "Public can view blog images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can manage blog images"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'blog-images' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

-- Avatars bucket
CREATE POLICY "Public can view avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Admins can manage avatars"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'avatars' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

-- Documents bucket (private)
CREATE POLICY "Admins can view documents"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'documents' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );

CREATE POLICY "Admins can manage documents"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'documents' AND
        auth.uid() IN (SELECT id FROM public.admin_users)
    );
