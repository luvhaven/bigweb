-- Add increment_spots_taken RPC function for campaign leads
CREATE OR REPLACE FUNCTION increment_spots_taken(package_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.campaign_packages
  SET spots_taken = spots_taken + 1,
      spots_available = GREATEST(spots_available - 1, 0)
  WHERE id = package_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
