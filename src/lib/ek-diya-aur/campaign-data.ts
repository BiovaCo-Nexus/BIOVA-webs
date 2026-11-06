import { ExpenseRecord, KitItem, CampaignStats } from "./types";

export const CAMPAIGN_TARGET_AMOUNT = 45000;
export const CAMPAIGN_TARGET_FAMILIES = 20;
export const COST_PER_FAMILY_KIT = 2000;
export const TOTAL_COST_PER_FAMILY_ALL_IN = 2250; // including transport & reserve

export const INITIAL_CAMPAIGN_STATS: CampaignStats = {
  targetAmount: CAMPAIGN_TARGET_AMOUNT,
  targetFamilies: CAMPAIGN_TARGET_FAMILIES,
  totalCollected: 0,
  totalSupporters: 0,
  gatewayFeeDeducted: 0,
  totalDisbursed: 0,
  familiesSupported: 0,
  kitsPacked: 0,
  verifiedFamiliesIdentified: 20,
};

// Clean initial ledger: Real receipts & invoices populated directly from verified database records
export const INITIAL_EXPENSE_LEDGER: ExpenseRecord[] = [];

export const KIT_PILLARS: KitItem[] = [
  {
    id: "groceries",
    titleKey: "groceriesTitle",
    descKey: "groceriesDesc",
    iconName: "ShoppingBag",
    costEstimate: 1100,
  },
  {
    id: "clothes",
    titleKey: "clothesTitle",
    descKey: "clothesDesc",
    iconName: "Shirt",
    costEstimate: 550,
  },
  {
    id: "sweets",
    titleKey: "sweetsTitle",
    descKey: "sweetsDesc",
    iconName: "Gift",
    costEstimate: 225,
  },
  {
    id: "diyas",
    titleKey: "diyasTitle",
    descKey: "diyasDesc",
    iconName: "Flame",
    costEstimate: 125,
  },
  {
    id: "children",
    titleKey: "childrenTitle",
    descKey: "childrenDesc",
    iconName: "Sparkles",
    costEstimate: 250,
  },
];
