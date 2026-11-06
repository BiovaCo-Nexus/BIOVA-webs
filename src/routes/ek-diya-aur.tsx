import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  Language,
  ContributionFormData,
  CampaignStats,
  ExpenseRecord,
  SupporterRecord,
} from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";
import { INITIAL_CAMPAIGN_STATS, INITIAL_EXPENSE_LEDGER } from "@/lib/ek-diya-aur/campaign-data";
import { fetchCampaignData } from "@/lib/ek-diya-aur/api";

import { CampaignHeader } from "@/components/ek-diya-aur/CampaignHeader";
import { HeroSection } from "@/components/ek-diya-aur/HeroSection";
import { PurposeSection } from "@/components/ek-diya-aur/PurposeSection";
import { GoalProgressSection } from "@/components/ek-diya-aur/GoalProgressSection";
import { BudgetSection } from "@/components/ek-diya-aur/BudgetSection";
import { ContributionSection } from "@/components/ek-diya-aur/ContributionSection";
import { SupporterWallSection } from "@/components/ek-diya-aur/SupporterWallSection";
import { TransparencySection } from "@/components/ek-diya-aur/TransparencySection";
import { PromiseSection } from "@/components/ek-diya-aur/PromiseSection";
import { FaqLegalSection } from "@/components/ek-diya-aur/FaqLegalSection";
import { CampaignFooter } from "@/components/ek-diya-aur/CampaignFooter";
import { ReceiptModal } from "@/components/ek-diya-aur/ReceiptModal";

export default function EkDiyaAurPage() {
  // 1. Language state: persisted in localStorage, defaults to English
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("ek_diya_lang");
      if (saved === "en" || saved === "hi" || saved === "mr") {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return "en";
  });

  const handleLanguageChange = useCallback((lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem("ek_diya_lang", lang);
    } catch {
      // ignore
    }
  }, []);

  // 2. Form state: persistent across language switches
  const [formData, setFormData] = useState<ContributionFormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    ageRange: "",
    city: "",
    amount: 101,
    customAmount: "",
    reason: "",
    isAnonymous: false,
    consentTerms: false,
    consentEmailUpdates: true,
    consentWhatsappUpdates: false,
    consentPublicDisplay: true,
    consentPublicAmount: false,
  });

  // 3. Campaign dynamic data state
  const [stats, setStats] = useState<CampaignStats>(INITIAL_CAMPAIGN_STATS);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSE_LEDGER);
  const [supporters, setSupporters] = useState<SupporterRecord[]>([]);

  // 4. Receipt modal state
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState<{
    id: string;
    amount: number;
    name: string;
    date: string;
    paymentId?: string;
  } | null>(null);

  // Load campaign data from Supabase & verified records ONLY
  const loadData = useCallback(async () => {
    try {
      const data = await fetchCampaignData();
      setStats(data.stats);
      setExpenses(data.expenses);
      setSupporters(data.supporters);
    } catch (err) {
      console.warn("Error loading campaign data:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Smooth scroll helpers
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleContributionSuccess = (receiptData: {
    id: string;
    amount: number;
    name: string;
    date: string;
    paymentId?: string;
  }) => {
    setLatestReceipt(receiptData);
    setReceiptModalOpen(true);
    // Reload campaign data so live stats and wall update immediately
    loadData();
  };

  const t = translations[currentLang];

  // Schema.org Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SocialEvent",
    name: "EK DIYA AUR 2026",
    alternateName: "एक दिया और - BiovaCo Nexus",
    description:
      "A Diwali Giving Initiative by BiovaCo Nexus Pvt. Ltd. supporting 20 economically vulnerable families with complete festive celebration kits.",
    url: "https://biovaco.in/ek-diya-aur",
    startDate: "2026-11-07T00:00:00+05:30",
    endDate: "2026-12-13T12:00:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Community Field Outreach",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "BiovaCo Nexus Private Limited",
      url: "https://biovaco.in",
      logo: "https://biovaco.in/Logo.png",
      identifier: "U46300ME2026PTC475352",
    },
    offers: {
      "@type": "Offer",
      price: "45000",
      priceCurrency: "INR",
      name: "Diwali 2026 20-Family Kit Fund",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-amber-500 selection:text-white">
      <Helmet>
        <title>
          {currentLang === "hi"
            ? "एक दिया और 2026 | बायोवाको नेक्सस की दिवाली परोपकार पहल"
            : currentLang === "mr"
              ? "एक दिवा आणखी 2026 | बायोव्हाको नेक्ससचा दिवाळी समाजहितोपक्रम"
              : "Ek Diya Aur 2026 | Diwali Giving Initiative by BiovaCo Nexus"}
        </title>
        <meta
          name="description"
          content="Ek Diya Aur is a transparent Diwali 2026 community giving initiative by BiovaCo Nexus Pvt. Ltd. Supporting 20 families in need with essential groceries, clothes, sweets and handcrafted clay diyas. Target: ₹45,000."
        />
        <meta
          name="keywords"
          content="Ek Diya Aur, Diwali Giving 2026, BiovaCo Nexus, Transparent Giving India, Diwali Grocery Kits, Community Fundraiser, Social Impact"
        />
        <link rel="canonical" href="https://biovaco.in/ek-diya-aur" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biovaco.in/ek-diya-aur" />
        <meta
          property="og:title"
          content="Ek Diya Aur 2026 – Kisi aur ke ghar mein bhi roshni ho"
        />
        <meta
          property="og:description"
          content="Join BiovaCo Nexus in illuminating 20 vulnerable homes this Diwali. 100% direct pass-through, zero admin fees, real-time verified transparency."
        />
        <meta property="og:image" content="https://biovaco.in/Logo.png" />
        <meta property="og:site_name" content="BiovaCo Nexus" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ek Diya Aur 2026 – BiovaCo Nexus" />
        <meta
          name="twitter:description"
          content="A Diwali Giving Initiative by BiovaCo Nexus Pvt. Ltd. supporting 20 families in need."
        />
        <meta name="twitter:image" content="https://biovaco.in/Logo.png" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Campaign Dedicated Navigation with Language Switcher */}
      <CampaignHeader currentLang={currentLang} onLanguageChange={handleLanguageChange} />

      <main>
        {/* 1. Hero Section */}
        <HeroSection
          currentLang={currentLang}
          onContributeClick={() => scrollTo("contribute")}
          onExploreClick={() => scrollTo("transparency")}
        />

        {/* 2. Our Purpose Section */}
        <PurposeSection currentLang={currentLang} />

        {/* 3. Campaign Goal & Verified Live Progress */}
        <GoalProgressSection currentLang={currentLang} stats={stats} />

        {/* 4. What We Are Building: Itemized Budget */}
        <BudgetSection currentLang={currentLang} />

        {/* 5. Contribution Form */}
        <ContributionSection
          currentLang={currentLang}
          formData={formData}
          setFormData={setFormData}
          onContributionSuccess={handleContributionSuccess}
        />

        {/* 6. Supporter Wall */}
        <SupporterWallSection currentLang={currentLang} supporters={supporters} />

        {/* 7. Public Transparency & Expense Ledger */}
        <TransparencySection currentLang={currentLang} stats={stats} expenses={expenses} />

        {/* 8. Our Promise (Fiduciary & Emotional copy) */}
        <PromiseSection currentLang={currentLang} />

        {/* 9. FAQ and Legal Information (Same-page accordions) */}
        <FaqLegalSection currentLang={currentLang} />
      </main>

      {/* Campaign Footer with BiovaCo Corporate Credentials */}
      <CampaignFooter currentLang={currentLang} />

      {/* Instant Digital Contribution Receipt Modal */}
      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        receiptData={latestReceipt}
        currentLang={currentLang}
      />
    </div>
  );
}
