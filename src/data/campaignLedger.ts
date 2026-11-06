export interface ExpenseItem {
  id: string;
  date: string;
  item: string;
  category: "Kits" | "Logistics" | "Contingency" | "Packaging";
  amount: number;
  invoiceRef: string;
}

export interface Supporter {
  id: string;
  name: string;
  city?: string;
  amount?: number;
  message?: string;
  date: string;
  isAnonymous: boolean;
  showAmount: boolean;
}

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "exp-001",
    date: "2026-10-18",
    item: "Handmade terracotta diyas (120 pcs) & cotton wicks directly from Kumbhartoli Artisans, Nagpur",
    category: "Kits",
    amount: 1800,
    invoiceRef: "KT-NGP-2026-041",
  },
  {
    id: "exp-002",
    date: "2026-10-22",
    item: "Eco-friendly corrugated storage hampers & food-grade packaging bags (25 units)",
    category: "Packaging",
    amount: 1450,
    invoiceRef: "BVP-PKG-882",
  },
  {
    id: "exp-003",
    date: "2026-10-26",
    item: "Advance booking for electric distribution delivery van across Pardi & Wadi clusters",
    category: "Logistics",
    amount: 1200,
    invoiceRef: "EV-NGP-LOG-19",
  },
];

export const INITIAL_SUPPORTERS: Supporter[] = [
  {
    id: "sup-001",
    name: "Nakul Mundhada",
    city: "Nagpur",
    amount: 5000,
    message: "May this Diwali bring genuine peace, dignity, and light into every household.",
    date: "2026-10-15",
    isAnonymous: false,
    showAmount: true,
  },
  {
    id: "sup-002",
    name: "Richa Rajan",
    city: "Nagpur",
    amount: 5000,
    message: "Every child deserves to experience the magic of new clothes and sweet smiles.",
    date: "2026-10-16",
    isAnonymous: false,
    showAmount: true,
  },
  {
    id: "sup-003",
    name: "BiovaCo Nexus Team",
    city: "Nagpur",
    amount: 10000,
    message: "Standing together with our community. Ek Diya Aur for our extended family in Nagpur.",
    date: "2026-10-17",
    isAnonymous: false,
    showAmount: true,
  },
  {
    id: "sup-004",
    name: "A Caring Well-wisher",
    city: "Mumbai",
    amount: 2500,
    message: "Heartfelt wishes to the wonderful families in Nagpur. Happy Diwali!",
    date: "2026-10-20",
    isAnonymous: true,
    showAmount: false,
  },
  {
    id: "sup-005",
    name: "Dr. Aniruddha Deshpande",
    city: "Pune",
    amount: 2000,
    message: "Proud of the transparency and respectful approach of this initiative.",
    date: "2026-10-24",
    isAnonymous: false,
    showAmount: true,
  },
];

export const CAMPAIGN_TARGET_AMOUNT = 45000;
export const TARGET_FAMILIES = 20;
