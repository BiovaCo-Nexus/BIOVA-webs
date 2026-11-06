-- Migration: Ek Diya Aur 2026 Campaign Tables (Idempotent)
-- Target: 20 Families | ₹45,000 Goal
-- Entity: BiovaCo Nexus Pvt. Ltd. (CIN: U46300ME2026PTC475352)
-- Minimum Contribution Amount: ₹5
-- Commission: 2% transparent payment gateway coverage

-- 1. Create Contributions Table if not exists
CREATE TABLE IF NOT EXISTS public.diya_contributions (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  city TEXT,
  age_range TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  gateway_fee NUMERIC(10, 2) DEFAULT 0,
  gross_amount NUMERIC(10, 2) DEFAULT 0,
  reason TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  show_on_wall BOOLEAN DEFAULT TRUE,
  show_amount BOOLEAN DEFAULT FALSE,
  consent_email BOOLEAN DEFAULT TRUE,
  consent_whatsapp BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'captured',
  verified BOOLEAN NOT NULL DEFAULT TRUE,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure minimum amount constraint is >= 5 (safe alter if table exists)
ALTER TABLE public.diya_contributions DROP CONSTRAINT IF EXISTS diya_contributions_amount_check;
ALTER TABLE public.diya_contributions ADD CONSTRAINT diya_contributions_amount_check CHECK (amount >= 5);

-- Ensure gateway columns exist if table was already created
ALTER TABLE public.diya_contributions ADD COLUMN IF NOT EXISTS gateway_fee NUMERIC(10, 2) DEFAULT 0;
ALTER TABLE public.diya_contributions ADD COLUMN IF NOT EXISTS gross_amount NUMERIC(10, 2) DEFAULT 0;

-- Enable Row Level Security
ALTER TABLE public.diya_contributions ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to prevent PostgreSQL error 42710 (policy already exists)
DROP POLICY IF EXISTS "Public can view approved wall supporters" ON public.diya_contributions;
DROP POLICY IF EXISTS "Public can insert verified contributions" ON public.diya_contributions;
DROP POLICY IF EXISTS "Public can insert contributions" ON public.diya_contributions;

-- Recreate Policy for SELECT: Anyone can view approved wall supporters
CREATE POLICY "Public can view approved wall supporters"
  ON public.diya_contributions
  FOR SELECT
  USING (
    show_on_wall = TRUE 
    AND verified = TRUE 
    AND status = 'captured'
    AND razorpay_payment_id IS NOT NULL
  );

-- Recreate Policy for INSERT: Only verified captured payments with Razorpay Payment ID can be saved
CREATE POLICY "Public can insert verified contributions"
  ON public.diya_contributions
  FOR INSERT
  WITH CHECK (
    status = 'captured' 
    AND verified = TRUE 
    AND razorpay_payment_id IS NOT NULL
    AND length(razorpay_payment_id) > 5
  );

-- 3. Create Expenses Table
CREATE TABLE IF NOT EXISTS public.diya_expenses (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  item TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('kits', 'transport', 'packaging', 'contingency')),
  amount NUMERIC(10, 2) NOT NULL,
  vendor TEXT NOT NULL,
  location TEXT NOT NULL,
  invoice_ref TEXT NOT NULL,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'verified')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.diya_expenses ENABLE ROW LEVEL SECURITY;

-- Drop and recreate expense policy to prevent error 42710
DROP POLICY IF EXISTS "Public can view campaign expenses" ON public.diya_expenses;

CREATE POLICY "Public can view campaign expenses"
  ON public.diya_expenses
  FOR SELECT
  USING (TRUE);

-- Real-time Expense Ledger starts clean with 0 dummy records.
-- Invoices and verified receipts are published directly upon actual merchant procurement.
