-- =========================================================================
-- EK DIYA AUR – BIOVACO NEXUS CAMPAIGN DATABASE SCHEMA
-- Target Table: campaign_donations & campaign_expenses
-- Database: PostgreSQL / Supabase
-- =========================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CAMPAIGN DONATIONS / PLEDGES TABLE
CREATE TABLE IF NOT EXISTS public.campaign_donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE,
    payment_id TEXT UNIQUE,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 100),
    currency TEXT NOT NULL DEFAULT 'INR',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp_number TEXT,
    age_range TEXT,
    city TEXT,
    inspiration TEXT,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    consent_public_display BOOLEAN NOT NULL DEFAULT FALSE,
    consent_display_amount BOOLEAN NOT NULL DEFAULT FALSE,
    consent_email_updates BOOLEAN NOT NULL DEFAULT FALSE,
    consent_whatsapp_updates BOOLEAN NOT NULL DEFAULT FALSE,
    consent_terms_policy BOOLEAN NOT NULL DEFAULT TRUE,
    status TEXT NOT NULL DEFAULT 'pledged' CHECK (status IN ('pledged', 'pending', 'captured', 'failed', 'refunded')),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_moderated BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CAMPAIGN EXPENSES / TRANSPARENCY LEDGER TABLE
CREATE TABLE IF NOT EXISTS public.campaign_expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_date DATE NOT NULL,
    item_description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Kits', 'Logistics', 'Contingency', 'Packaging')),
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    invoice_ref TEXT NOT NULL,
    invoice_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SECURE PUBLIC VIEW FOR SUPPORTER WALL (NO PII EXPOSURE)
-- Exposes only opted-in, moderated records and masks names if anonymous
CREATE OR REPLACE VIEW public.public_campaign_supporters AS
SELECT
    id,
    CASE 
        WHEN is_anonymous = TRUE THEN 'A Caring Well-wisher'
        ELSE full_name
    END AS display_name,
    city,
    CASE 
        WHEN consent_display_amount = TRUE THEN amount
        ELSE NULL
    END AS display_amount,
    inspiration AS message,
    created_at,
    is_anonymous
FROM public.campaign_donations
WHERE consent_public_display = TRUE
  AND is_moderated = TRUE
  AND status IN ('captured', 'pledged');

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.campaign_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_expenses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insertion of new pledge / donation intent
CREATE POLICY "Allow public inserts of donations" 
ON public.campaign_donations 
FOR INSERT 
WITH CHECK (TRUE);

-- Disallow public read of raw campaign_donations (prevents email / phone leak)
CREATE POLICY "Restrict raw donation reading to service role"
ON public.campaign_donations
FOR SELECT
USING (auth.role() = 'service_role');

-- Allow public read of verified campaign expenses
CREATE POLICY "Allow public read of verified expenses"
ON public.campaign_expenses
FOR SELECT
USING (is_verified = TRUE);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_campaign_donation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_campaign_donation_updated_at ON public.campaign_donations;
CREATE TRIGGER trigger_campaign_donation_updated_at
BEFORE UPDATE ON public.campaign_donations
FOR EACH ROW
EXECUTE FUNCTION update_campaign_donation_updated_at();
