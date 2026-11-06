export type Language = "en" | "hi" | "mr";

export interface KitItem {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: string;
  costEstimate: number;
}

export interface ContributionFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  ageRange: string;
  city: string;
  amount: number | string;
  customAmount: string;
  reason: string;
  isAnonymous: boolean;
  consentTerms: boolean;
  consentEmailUpdates: boolean;
  consentWhatsappUpdates: boolean;
  consentPublicDisplay: boolean;
  consentPublicAmount: boolean;
}

export interface SupporterRecord {
  id: string;
  displayName: string;
  city?: string;
  amount?: number | null;
  message?: string;
  createdAt: string;
  isAnonymous: boolean;
  verified: boolean;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  item: string;
  category: "kits" | "transport" | "packaging" | "contingency";
  amount: number;
  vendor: string;
  location: string;
  invoiceRef: string;
  status: "verified" | "planned";
}

export interface CampaignStats {
  targetAmount: number;
  targetFamilies: number;
  totalCollected: number;
  totalSupporters: number;
  gatewayFeeDeducted: number;
  totalDisbursed: number;
  familiesSupported: number;
  kitsPacked: number;
  verifiedFamiliesIdentified: number;
}
