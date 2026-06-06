-- 1. ADD REFERRAL CODE COLUMNS TO LEADS TABLES
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS referral_code text;
CREATE INDEX IF NOT EXISTS contact_submissions_referral_code_idx ON public.contact_submissions(referral_code);

ALTER TABLE public.estimate_requests ADD COLUMN IF NOT EXISTS referral_code text;
CREATE INDEX IF NOT EXISTS estimate_requests_referral_code_idx ON public.estimate_requests(referral_code);

-- 2. CREATE THE ANTI-TAMPER TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION process_lead_referral()
RETURNS TRIGGER AS $$
DECLARE
    matching_affiliate_id uuid;
BEGIN
    -- Only proceed if the new lead has a referral code
    IF NEW.referral_code IS NOT NULL THEN
        -- Find the affiliate that owns this code
        SELECT id INTO matching_affiliate_id
        FROM public.affiliates
        WHERE referral_code = NEW.referral_code
        LIMIT 1;

        -- If a matching affiliate is found, natively create a referral ledger entry
        IF matching_affiliate_id IS NOT NULL THEN
            INSERT INTO public.referrals (
                client_name,
                client_email,
                client_company,
                affiliate_id,
                status
            ) VALUES (
                NEW.name,
                NEW.email,
                NEW.company,
                matching_affiliate_id,
                'PENDING'
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. BIND THE TRIGGER TO CONTACT FORMS
DROP TRIGGER IF EXISTS trigger_contact_referral ON public.contact_submissions;
CREATE TRIGGER trigger_contact_referral
AFTER INSERT ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION process_lead_referral();


-- 4. BIND THE TRIGGER TO DIAGNOSTIC/ESTIMATE FORMS
DROP TRIGGER IF EXISTS trigger_estimate_referral ON public.estimate_requests;
CREATE TRIGGER trigger_estimate_referral
AFTER INSERT ON public.estimate_requests
FOR EACH ROW
EXECUTE FUNCTION process_lead_referral();
