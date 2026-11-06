import { Language } from "./types";

export interface Translations {
  nav: {
    backToHome: string;
    campaignTitle: string;
    purpose: string;
    goal: string;
    budget: string;
    contribute: string;
    supporters: string;
    transparency: string;
    promise: string;
    faq: string;
    contributeNow: string;
  };
  hero: {
    initiativeBadge: string;
    campaignName: string;
    tagline: string;
    bodyP1: string;
    bodyP2: string;
    bodyP3: string;
    bodyP4: string;
    bodyP5: string;
    primaryCta: string;
    secondaryCta: string;
    metaLocation: string;
    metaTarget: string;
    metaGoal: string;
  };
  purpose: {
    badge: string;
    heading: string;
    subheading: string;
    dignityTitle: string;
    dignityBody: string;
    kitBreakdownTitle: string;
    items: {
      groceriesTitle: string;
      groceriesDesc: string;
      clothesTitle: string;
      clothesDesc: string;
      sweetsTitle: string;
      sweetsDesc: string;
      diyasTitle: string;
      diyasDesc: string;
      childrenTitle: string;
      childrenDesc: string;
    };
  };
  goal: {
    badge: string;
    heading: string;
    subheading: string;
    raisedSoFar: string;
    ofTarget: string;
    familiesFunded: string;
    ofFamilies: string;
    supportersCount: string;
    daysNotice: string;
    verifiedNote: string;
  };
  budget: {
    badge: string;
    heading: string;
    subheading: string;
    disclaimer: string;
    items: {
      kitsTitle: string;
      kitsDesc: string;
      transportTitle: string;
      transportDesc: string;
      contingencyTitle: string;
      contingencyDesc: string;
    };
    totalLabel: string;
  };
  form: {
    badge: string;
    heading: string;
    subheading: string;
    selectAmount: string;
    customAmountPlaceholder: string;
    minAmountHint: string;
    impactHint500: string;
    impactHint1000: string;
    impactHint1500: string;
    impactHint2000: string;
    impactHintCustom: string;
    personalDetailsTitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    ageRangeLabel: string;
    ageRangeSelect: string;
    cityLabel: string;
    cityPlaceholder: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    anonymousCheckbox: string;
    consentsTitle: string;
    consentTerms: string;
    consentEmail: string;
    consentWhatsapp: string;
    consentPublicName: string;
    consentPublicAmount: string;
    termsLink: string;
    privacyLink: string;
    submitButton: string;
    submitting: string;
    gatewayLiveBadge: string;
    gatewayPendingBadge: string;
    gatewayPendingNotice: string;
    pledgeSuccessTitle: string;
    pledgeSuccessMsg: string;
    securityNotice: string;
    errors: {
      fullNameRequired: string;
      emailInvalid: string;
      amountInvalid: string;
      termsRequired: string;
    };
  };
  wall: {
    badge: string;
    heading: string;
    subheading: string;
    emptyState: string;
    anonymousDonor: string;
    amountShared: string;
    moderationNote: string;
  };
  transparency: {
    badge: string;
    heading: string;
    subheading: string;
    targetFund: string;
    verifiedReceived: string;
    gatewayFees: string;
    netAvailable: string;
    disbursed: string;
    balance: string;
    familiesVerified: string;
    kitsPacked: string;
    familiesDelivered: string;
    ledgerTitle: string;
    ledgerDate: string;
    ledgerItem: string;
    ledgerCategory: string;
    ledgerAmount: string;
    ledgerVendor: string;
    ledgerInvoice: string;
    ledgerStatus: string;
    statusVerified: string;
    statusPlanned: string;
    emptyLedgerNotice: string;
    downloadReportBtn: string;
    reportDisclaimer: string;
  };
  promise: {
    badge: string;
    heading: string;
    copyP1: string;
    copyP2: string;
    copyP3: string;
    copyP4: string;
    copyP5: string;
    pillars: {
      p1Title: string;
      p1Desc: string;
      p2Title: string;
      p2Desc: string;
      p3Title: string;
      p3Desc: string;
      p4Title: string;
      p4Desc: string;
    };
  };
  faq: {
    badge: string;
    heading: string;
    subheading: string;
    taxAlert: string;
    items: {
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
      q5: string;
      a5: string;
      q6: string;
      a6: string;
      q7: string;
      a7: string;
      q8: string;
      a8: string;
      q9: string;
      a9: string;
      q10: string;
      a10: string;
      q11: string;
      a11: string;
      q12: string;
      a12: string;
      q13: string;
      a13: string;
    };
  };
  receipt: {
    title: string;
    subtitle: string;
    reference: string;
    amount: string;
    donor: string;
    date: string;
    status: string;
    close: string;
    print: string;
    taxNote: string;
  };
  footer: {
    company: string;
    registeredOffice: string;
    businessOffice: string;
    cin: string;
    legalNote: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      backToHome: "biovaco.in",
      campaignTitle: "Ek Diya Aur 2026",
      purpose: "Our Purpose",
      goal: "Campaign Goal",
      budget: "Budget",
      contribute: "Contribute",
      supporters: "Supporters",
      transparency: "Transparency",
      promise: "Our Promise",
      faq: "FAQ & Disclosures",
      contributeNow: "Be Part of Celebration",
    },
    hero: {
      initiativeBadge: "A Diwali Giving Initiative by BiovaCo Nexus Pvt. Ltd.",
      campaignName: "EK DIYA AUR",
      tagline: "Kisi aur ke ghar mein bhi roshni ho.",
      bodyP1: "We celebrate Diwali with lights, sweets, new clothes and gifts.",
      bodyP2:
        "Lekin kuch gharon mein Diwali ki khushiyan rozmarra ki zarooraton ke beech kahin peeche reh jaati hain.",
      bodyP3:
        "For some parents, buying something special for their children during Diwali is not always possible.",
      bodyP4: "We believe every child deserves to experience the happiness of this festival.",
      bodyP5:
        "This Diwali, we invite you to include one more home in your celebrations. Ek Diya Aur.",
      primaryCta: "Be a Part of the Celebration",
      secondaryCta: "See Where Your Contribution Goes",
      metaLocation: "Direct Field Outreach",
      metaTarget: "20 Families Supported",
      metaGoal: "₹45,000 Verified Goal",
    },
    purpose: {
      badge: "The Intention Behind The Diya",
      heading: "Bringing Meaningful Warmth To 20 Homes",
      subheading:
        "Every festive kit is curated with care, respect and dignity — ensuring that struggling families celebrate Diwali not with charity leftovers, but with the very same joy and quality we share in our own homes.",
      dignityTitle: "Our Commitment to Beneficiary Dignity",
      dignityBody:
        "We never treat beneficiaries as objects of sympathy or publicity. Every kit is delivered quietly with gratitude, honoring the hard work, self-respect, and aspirations of the parents and children receiving it.",
      kitBreakdownTitle: "What Each Family Celebration Kit (₹2,000) Contains",
      items: {
        groceriesTitle: "1. Essential Month-Long Groceries",
        groceriesDesc:
          "Whole wheat flour (Atta 10kg), premium rice (5kg), toor dal (2kg), sunflower cooking oil (2L), sugar, iodized salt, and essential spice boxes.",
        clothesTitle: "2. New Festive Attire",
        clothesDesc:
          "Fresh, traditional new clothes tailored for children and parental figures so every family member greets Diwali morning in new festive dress.",
        sweetsTitle: "3. Pure Ghee Diwali Sweets & Snacks",
        sweetsDesc:
          "A celebratory box of fresh motichoor ladoo, besan barfi, savory chiwda, and dry fruits to share sweet moments with neighbors.",
        diyasTitle: "4. Handcrafted Mitti Diyas & Rangoli",
        diyasDesc:
          "Traditional clay diyas sourced directly from local traditional potters, pure sesame oil, cotton wicks, and bright natural rangoli colors.",
        childrenTitle: "5. Children's Festive Delight & Learning Set",
        childrenDesc:
          "Drawing kit, color pencils, storybook, and child-safe festive treats to bring genuine spark and joy to younger minds.",
      },
    },
    goal: {
      badge: "Target & Verified Progress",
      heading: "₹45,000 Goal to Warm 20 Families",
      subheading:
        "Every rupee is accounted for in real-time. We display only verified, captured contributions — never simulated or artificial numbers.",
      raisedSoFar: "Verified Funds Received",
      ofTarget: "of ₹45,000 Goal",
      familiesFunded: "Families Fully Covered",
      ofFamilies: "of 20 Families Target",
      supportersCount: "Verified Supporters",
      daysNotice: "Distribution Scheduled: Diwali Week 2026",
      verifiedNote: "Live ledger synced directly with verified payment records.",
    },
    budget: {
      badge: "Itemized Planning",
      heading: "Proposed Campaign Budget",
      subheading:
        "Calculated down to the rupee. Any surplus or savings are redirected to additional verified families.",
      disclaimer:
        "*Budget estimates may adjust marginally based on bulk procurement wholesale rates and verified logistics needs. All actual vendor invoices will be posted in the Transparency section.",
      items: {
        kitsTitle: "20 Family Festive Kits",
        kitsDesc:
          "20 comprehensive kits comprising dry ration, festive clothes, sweets, diyas, and children gifts at ₹2,000 per kit.",
        transportTitle: "Field Transport & Direct Distribution",
        transportDesc:
          "Direct logistics, field vehicle hire across verified clusters, and protective packaging containers.",
        contingencyTitle: "Packaging & Logistics Contingency",
        contingencyDesc:
          "Weather-proof sealing, unexpected price variations, and immediate emergency additions during distribution.",
      },
      totalLabel: "Total Verified Budget",
    },
    form: {
      badge: "Join Hands",
      heading: "Be the Reason Someone Smiles This Diwali.",
      subheading:
        "You don't need to do something big to make a difference. Sometimes, even a small contribution can become part of someone's happiness.",
      selectAmount: "Choose Contribution Amount",
      customAmountPlaceholder: "Enter custom amount (e.g. 750)",
      minAmountHint: "Minimum contribution is ₹5. Every amount counts.",
      impactHint500: "₹500 covers handcrafted diyas, oil, rangoli & fresh sweets for 2 families.",
      impactHint1000: "₹1,000 covers half of a complete month-long family celebration kit.",
      impactHint1500: "₹1,500 covers full festive groceries & sweets for 1 entire household.",
      impactHint2000:
        "₹2,000 fully sponsors 1 complete family celebration kit (ration, clothes, sweets, diyas).",
      impactHintCustom: "Custom contribution towards collective family kits and transport.",
      personalDetailsTitle: "Your Details (Kept Strictly Confidential)",
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "e.g. Aarav Sharma",
      emailLabel: "Email Address (for acknowledgement & audit report) *",
      emailPlaceholder: "aarav@example.com",
      emailHint: "Official payment acknowledgement and transparent report will be emailed here.",
      whatsappLabel: "WhatsApp Number (Optional)",
      whatsappPlaceholder: "+91 98765 43210",
      ageRangeLabel: "Age Range (Optional)",
      ageRangeSelect: "Select your age bracket",
      cityLabel: "City / Town (Optional)",
      cityPlaceholder: "e.g. Mumbai, Pune, Delhi...",
      reasonLabel: "What inspired you to be a part of this initiative? (Optional)",
      reasonPlaceholder: "Share a warm Diwali wish or your thought behind participating...",
      anonymousCheckbox: "Keep my name anonymous on the public supporter wall",
      consentsTitle: "Permissions & Transparency Consents",
      consentTerms: "I agree to the Terms of Contribution and BiovaCo Nexus Privacy Policy. *",
      consentEmail:
        "I would like to receive verified email updates with photo proof and final utilization report.",
      consentWhatsapp:
        "I would like to receive milestone updates on WhatsApp regarding packing and distribution.",
      consentPublicName:
        "I permit my name (or anonymous alias) and message to appear on the public Supporter Wall.",
      consentPublicAmount:
        "I permit my contribution amount to be displayed publicly on the Supporter Wall.",
      termsLink: "Terms",
      privacyLink: "Privacy Policy",
      submitButton: "Proceed to Contribute",
      submitting: "Processing Verification...",
      gatewayLiveBadge: "Razorpay Gateway Active · Instant Acknowledgement",
      gatewayPendingBadge: "Online Gateway Clearance Pending",
      gatewayPendingNotice:
        "BiovaCo Nexus is finalizing its corporate merchant banking clearance for Diwali 2026. If live card/UPI processing is currently paused for regulatory verification, your pledge will be recorded securely, and you will receive an official direct bank transfer or gateway activation notification.",
      pledgeSuccessTitle: "Gratitude From The BiovaCo Team!",
      pledgeSuccessMsg:
        "Your contribution / pledge has been recorded with deep respect. A formal acknowledgement has been dispatched to your email.",
      securityNotice:
        "Security Note: BiovaCo Nexus will never ask for your ATM PIN, CVV, OTP, or Net Banking credentials.",
      errors: {
        fullNameRequired: "Please enter your full name.",
        emailInvalid: "Please enter a valid email address.",
        amountInvalid: "Please choose or enter a valid amount (minimum ₹5).",
        termsRequired: "Please confirm acceptance of campaign terms and privacy policy.",
      },
    },
    wall: {
      badge: "Community of Giving",
      heading: "People Who Chose to Share Their Light.",
      subheading:
        "A heartfelt tribute to individuals who extended their Diwali table. Only supporters who explicitly opted into public display are shown.",
      emptyState:
        "The wall is ready to receive its first lamp of kindness. Be the one to light the first Diya!",
      anonymousDonor: "A Caring Friend",
      amountShared: "contributed",
      moderationNote:
        "All supporter messages undergo ethical moderation to maintain community warmth and respect.",
    },
    transparency: {
      badge: "Zero Compromise",
      heading: "Your Trust Deserves Transparency.",
      subheading:
        "We consider donor trust our highest fiduciary responsibility. Every single rupee collected and spent is cataloged below with direct proof.",
      targetFund: "Campaign Target",
      verifiedReceived: "Verified Collections",
      gatewayFees: "Payment Gateway / Banking (~2%)",
      netAvailable: "Net Campaign Funds",
      disbursed: "Disbursed / Procurement",
      balance: "Unspent Reserve",
      familiesVerified: "Families Screened",
      kitsPacked: "Kits Assembled",
      familiesDelivered: "Families Supported",
      ledgerTitle: "Itemized Campaign Procurement Ledger",
      ledgerDate: "Date",
      ledgerItem: "Expense / Procurement Item",
      ledgerCategory: "Category",
      ledgerAmount: "Amount",
      ledgerVendor: "Vendor / Source",
      ledgerInvoice: "Invoice Ref",
      ledgerStatus: "Verification Status",
      statusVerified: "Verified & Paid",
      statusPlanned: "Planned Allocation",
      emptyLedgerNotice:
        "No procurement expenses disbursed yet. As vendor procurement begins and GST invoices are cleared by BiovaCo Nexus accounts, each itemized receipt will be published here in real time.",
      downloadReportBtn: "Download Itemized Audit PDF",
      reportDisclaimer:
        "Vendor invoices, GST receipts, and signed delivery acknowledgements are audited by BiovaCo Nexus accounts and published upon campaign conclusion.",
    },
    promise: {
      badge: "The BiovaCo Nexus Charter",
      heading: "Our Promise to Every Supporter",
      copyP1: "Hum aapse sirf contribution nahi maang rahe.",
      copyP2: "Hum aapse ek chhoti si khushi share karne ki request kar rahe hain.",
      copyP3: "Aapka trust humari responsibility hai.",
      copyP4:
        "Isliye har contribution ka record rakha jayega, har campaign expense document kiya jayega aur final utilisation report publicly share ki jayegi.",
      copyP5: "We believe kindness should always come with accountability.",
      pillars: {
        p1Title: "100% Direct Pass-Through",
        p1Desc:
          "BiovaCo Nexus covers all managerial, staff, and tech costs out of our operational funds. 100% of your net contribution reaches the 20 families.",
        p2Title: "Zero Administrative Markups",
        p2Desc:
          "Not a single rupee is diverted to administrative profit, overhead commissions, or third-party marketing agencies.",
        p3Title: "Transparent Procurement",
        p3Desc:
          "All grocery and cloth purchases are made from verified local wholesalers with valid GST invoices made public.",
        p4Title: "Dignified Delivery",
        p4Desc:
          "We never demean beneficiaries with publicity stunts. Kits are delivered directly to doorsteps with humility and festive wishes.",
      },
    },
    faq: {
      badge: "Questions & Policies",
      heading: "Frequently Asked Questions & Disclosures",
      subheading:
        "Clear, unvarnished facts regarding our entity, fund handling, refund procedures, and privacy standards.",
      taxAlert:
        "Legal Notice: BiovaCo Nexus Pvt. Ltd. is an incorporated private limited enterprise. Contributions to this corporate social giving initiative are NOT eligible for Section 80G tax deductions.",
      items: {
        q1: "What is 'Ek Diya Aur' and why is BiovaCo Nexus organizing it?",
        a1: "Ek Diya Aur is a direct community outreach initiative created by BiovaCo Nexus Pvt. Ltd. for Diwali 2026. As an innovation house, we believe festive joy should not be a privilege of a few. Our team volunteers time and company resources to assemble and deliver festive grocery and celebration kits to 20 identified vulnerable households directly on the ground.",
        q2: "Who is the legal organizer and receiving entity for the funds?",
        a2: "The receiving legal entity is BiovaCo Nexus Private Limited (CIN: U46300ME2026PTC475352), incorporated under the Companies Act in India. Funds are received into an initiative-dedicated bank escrow account with fiduciary oversight.",
        q3: "How are the 20 beneficiary families selected?",
        a3: "Beneficiaries are identified through on-ground field surveys in informal settlement clusters and peri-urban areas, in consultation with local municipal social workers, community elders, and informal daily-wage groups. We prioritize single-parent households, families with disabled earning members, and daily-wage laborers who face severe seasonal financial distress.",
        q4: "How will my contribution be utilized?",
        a4: "100% of collected public funds are applied directly to the procurement of 20 family kits (₹40,000), local transport & distribution vehicle hire (₹3,000), and weather-safe packing/contingency (₹2,000). Any corporate overheads or digital platform charges are absorbed by BiovaCo Nexus.",
        q5: "Will I receive an immediate payment acknowledgement and receipt?",
        a5: "Yes. Immediately upon successful payment verification via Razorpay or direct banking confirmation, an automated digital receipt containing your unique transaction reference, date, timestamp, and amount will be displayed on screen and emailed to your address.",
        q6: "What happens if a transaction fails or my account is debited twice?",
        a6: "If an amount is debited from your bank account during a failed gateway transaction, banking systems typically auto-reconcile within 3 to 5 business days. In case of accidental duplicate contributions, email us at contact@biovaco.in with your reference numbers; duplicate amounts will be reversed to the original payment source within 5 working days.",
        q7: "Can I request a refund if I change my mind?",
        a7: "Yes. You may request a no-questions-asked refund at any time prior to the bulk procurement date (October 25, 2026) by writing to contact@biovaco.in from your registered email. Once procurement has taken place and vendor invoices are executed, contributions cannot be refunded.",
        q8: "What happens if there are unspent funds left in the campaign?",
        a8: "If wholesale discounts or logistics optimizations yield leftover funds, 100% of the balance will be allocated towards winter blankets and dry rations for underprivileged homeless elders during November/December 2026. A supplementary utilization note will be published on this page.",
        q9: "What if the campaign collects more than the ₹45,000 goal?",
        a9: "If contributions exceed ₹45,000, we do not divert the surplus. For every additional ₹2,250 verified, an additional vetted family from our standby verification list will be inducted into the initiative, up to the maximum capacity of our distribution volunteer team.",
        q10: "How is my personal data protected?",
        a10: "We comply strictly with Indian Digital Personal Data Protection standards. Your email and phone number are never shared, sold, or rented to any third party. Your details are used solely to send your transaction receipt and campaign transparency reports.",
        q11: "Can I withdraw my consent or request data deletion later?",
        a11: "Yes. You can withdraw consent for public supporter wall display or request permanent anonymization/erasure of your personal records at any time by sending an email to contact@biovaco.in.",
        q12: "Who is the grievance officer and how can I contact the team?",
        a12: "For any inquiries, feedback, or grievance redressal, you may reach out directly to our Community Initiatives Desk at contact@biovaco.in or visit BiovaCo Nexus corporate offices.",
        q13: "Is my contribution tax-deductible under Section 80G?",
        a13: "No. BiovaCo Nexus Pvt. Ltd. is an incorporated private limited enterprise and not an NGO or Section 8 non-profit with an 80G certificate. Consequently, contributions are not tax-deductible under Section 80G of the Indian Income Tax Act. Please consult your chartered accountant or tax advisor.",
      },
    },
    receipt: {
      title: "Contribution Acknowledgement",
      subtitle: "BiovaCo Nexus Pvt. Ltd. – Ek Diya Aur Campaign",
      reference: "Transaction Reference",
      amount: "Amount Paid",
      donor: "Contributor",
      date: "Date & Time",
      status: "Status: Verified & Confirmed",
      close: "Close Window",
      print: "Print / Save Receipt",
      taxNote:
        "This contribution is received towards the Diwali 2026 Community Giving Initiative by BiovaCo Nexus Pvt. Ltd. This document serves as an operational acknowledgement and is not an 80G tax exemption certificate.",
    },
    footer: {
      company: "BiovaCo Nexus Pvt. Ltd.",
      registeredOffice: "Regd. Office: H. No. 72, Bhagchand Nagar, Dhamangaon Rly, MH 444709",
      businessOffice: "Business: 1st Floor, RBU, TBI, Katol Rd, Bupeshnagar, Nagpur, MH 440013",
      cin: "CIN: U46300ME2026PTC475352",
      legalNote:
        "Ek Diya Aur is a dedicated social welfare initiative run directly by BiovaCo Nexus Pvt. Ltd. for Diwali 2026. All campaign records and expense ledgers are maintained under corporate fiduciary governance.",
      rights: "All rights reserved. Designed with respect and transparency.",
    },
  },
  hi: {
    nav: {
      backToHome: "biovaco.in",
      campaignTitle: "एक दिया और 2026",
      purpose: "हमारा उद्देश्य",
      goal: "अभियान लक्ष्य",
      budget: "बजट विवरण",
      contribute: "सहयोग करें",
      supporters: "सहयोगी दीवार",
      transparency: "पारदर्शिता",
      promise: "हमारा संकल्प",
      faq: "सवाल और नियम",
      contributeNow: "खुशियों में शामिल हों",
    },
    hero: {
      initiativeBadge: "बायोवाको नेक्सस प्रा. लि. की एक दीवाली परोपकार पहल",
      campaignName: "एक दिया और",
      tagline: "किसी और के घर में भी रोशनी हो।",
      bodyP1: "हम सब अपने घर में दिवाली की तैयारी करते हैं।",
      bodyP2:
        "लेकिन कुछ घरों में दिवाली की खुशियां रोज़मर्रा की ज़रूरतों के बीच कहीं पीछे रह जाती हैं।",
      bodyP3:
        "कुछ माता-पिता चाहते हैं कि उनके बच्चे भी नए कपड़े पहनें, मिठाई खाएं और दिवाली के उपहार पाएं।",
      bodyP4:
        "हमारा विश्वास है कि हर बच्चे और परिवार को इस त्योहार की खुशी महसूस करने का पूरा हक है।",
      bodyP5: "इस दिवाली, अपनी खुशियों में एक और घर को शामिल कीजिए। एक दिया और।",
      primaryCta: "खुशियों का हिस्सा बनें",
      secondaryCta: "देखें आपका सहयोग कहाँ जा रहा है",
      metaLocation: "प्रत्यक्ष ज़मीनी पहल",
      metaTarget: "20 परिवारों को संबल",
      metaGoal: "₹45,000 सत्यापित लक्ष्य",
    },
    purpose: {
      badge: "इस दीये के पीछे का भाव",
      heading: "20 जरूरतमंद परिवारों के आंगन में उजाला",
      subheading:
        "हर उत्सव किट पूरे आदर और गरिमा के साथ तैयार की जाती है — ताकि संघर्ष कर रहे परिवारों को दिवाली किसी की दया से नहीं, बल्कि उसी गरिमा और मिठास के साथ मिले जो हम अपने परिवारों में चाहते हैं।",
      dignityTitle: "सम्मान और गरिमा का हमारा संकल्प",
      dignityBody:
        "हम लाभार्थियों को कभी भी लाचारी या प्रचार की वस्तु नहीं मानते। हर किट पूरी विनम्रता और सम्मान के साथ परिवारों के द्वार तक पहुंचाई जाती है।",
      kitBreakdownTitle: "प्रत्येक परिवार उत्सव किट (₹2,000) में क्या शामिल है",
      items: {
        groceriesTitle: "1. पूरे महीने का अनिवार्य राशन",
        groceriesDesc:
          "उत्कृष्ट गेहूं का आटा (10 किग्रा), बासमती चावल (5 किग्रा), तुअर दाल (2 किग्रा), शुद्ध सूरजमुखी तेल (2 लीटर), शक्कर, आयोडीन नमक और आवश्यक मसाले।",
        clothesTitle: "2. नए उत्सव वस्त्र",
        clothesDesc:
          "बच्चों और अभिभावकों के लिए नए पारंपरिक परिधान, ताकि दिवाली की सुबह हर सदस्य नए वस्त्रों में मुस्करा सके।",
        sweetsTitle: "3. शुद्ध घी की मिठाइयां और नमकीन",
        sweetsDesc:
          "ताज़ा बेसन के लड्डू, मोतीचूर, चिवड़ा और सूखे मेवों का डिब्बा, ताकि पड़ोसियों के साथ मिठास बांटी जा सके।",
        diyasTitle: "4. हस्तनिर्मित मिट्टी के दीये और रंगोली",
        diyasDesc:
          "स्थानीय पारंपरिक कुम्हारों द्वारा तैयार मिट्टी के दीये, तिल का तेल, रुई की बत्तियां और प्राकृतिक रंगोली रंग।",
        childrenTitle: "5. बच्चों के लिए उपहार और शैक्षणिक किट",
        childrenDesc:
          "ड्राइंग बुक, रंग, ज्ञानवर्धक कहानियां और खिलौने, ताकि नन्हें चेहरों पर सच्ची खुशी और उत्साह खिल उठे।",
      },
    },
    goal: {
      badge: "लक्ष्य और लाइव प्रगति",
      heading: "20 परिवारों के लिए ₹45,000 का लक्ष्य",
      subheading:
        "हर एक रुपये का हिसाब लाइव पारदर्शी प्रणाली में दिखता है। यहाँ केवल बैंक-सत्यापित वास्तविक योगदान ही दर्शाया जाता है।",
      raisedSoFar: "अब तक प्राप्त सत्यापित सहयोग",
      ofTarget: "कुल ₹45,000 लक्ष्य में से",
      familiesFunded: "सुरक्षित हुए परिवार",
      ofFamilies: "कुल 20 परिवारों में से",
      supportersCount: "सत्यापित सहयोगी",
      daysNotice: "वितरण तिथि: दिवाली सप्ताह 2026",
      verifiedNote: "प्रत्यक्ष बैंक और गेटवे लेन-देन से लाइव सिंक।",
    },
    budget: {
      badge: "विस्तृत योजना",
      heading: "प्रस्तावित अभियान बजट",
      subheading:
        "पाई-पाई का पारदर्शी खाका। थोक खरीद से होने वाली किसी भी बचत का उपयोग अतिरिक्त परिवारों की मदद के लिए होगा।",
      disclaimer:
        "*वास्तविक थोक खरीद और परिवहन परिस्थितियों के आधार पर बजट में आंशिक बदलाव हो सकता है। सभी खरीद बिल पारदर्शिता अनुभाग में सार्वजनिक किए जाएंगे।",
      items: {
        kitsTitle: "20 परिवार उत्सव किट",
        kitsDesc:
          "20 संपूर्ण किट (राशन, नए कपड़े, मिठाइयां, दीये, उपहार) ₹2,000 प्रति परिवार की लागत पर।",
        transportTitle: "परिवहन और प्रत्यक्ष वितरण",
        transportDesc:
          "चिह्नित बस्तियों तक सुरक्षित वाहन परिवहन, ईंधन और सुरक्षात्मक पैकिंग बॉक्स।",
        contingencyTitle: "पैकिंग व आपातकालीन आरक्षित निधि",
        contingencyDesc:
          "मौसम अनुकूल सीलिंग, अचानक मूल्य परिवर्तन व वितरण के समय तत्काल आवश्यकता के लिए सुरक्षित राशि।",
      },
      totalLabel: "कुल सत्यापित अभियान बजट",
    },
    form: {
      badge: "हाथ बढ़ाएं",
      heading: "इस दिवाली किसी के चेहरे पर मुस्कान की वजह बनें।",
      subheading:
        "बदलाव लाने के लिए कुछ बहुत बड़ा करने की ज़रूरत नहीं होती। कभी-कभी एक छोटा सा सहयोग भी किसी की ज़िंदगी में बड़ी खुशी बन जाता है।",
      selectAmount: "सहयोग राशि चुनें",
      customAmountPlaceholder: "अपनी इच्छा अनुसार राशि (उदा. 750)",
      minAmountHint: "न्यूनतम सहयोग ₹5 है। आपका हर सहयोग अनमोल है।",
      impactHint500: "₹500 से 2 परिवारों के लिए दीये, तेल, रंगोली और मिठाइयां सुनिश्चित होती हैं।",
      impactHint1000: "₹1,000 से एक पूरे परिवार के उत्सव किट का आधा खर्च पूरा होता है।",
      impactHint1500: "₹1,500 से 1 पूरे परिवार के महीने भर का राशन और मिठाई सुनिश्चित होती है।",
      impactHint2000:
        "₹2,000 से 1 संपूर्ण परिवार उत्सव किट (राशन, कपड़े, मिठाई, दीये) प्रायोजित होता है।",
      impactHintCustom: "संयुक्त परिवार किट और वितरण के लिए आपकी ऐच्छिक राशि।",
      personalDetailsTitle: "आपकी जानकारी (पूर्णतः सुरक्षित व निजी)",
      fullNameLabel: "पूरा नाम *",
      fullNamePlaceholder: "उदा. आरव शर्मा",
      emailLabel: "ईमेल पता (पावती और ऑडिट रिपोर्ट के लिए) *",
      emailPlaceholder: "aarav@example.com",
      emailHint: "आधिकारिक डिजिटल पावती और अंतिम ऑडिट रिपोर्ट इस ईमेल पर भेजी जाएगी।",
      whatsappLabel: "व्हाट्सएप नंबर (वैकल्पिक)",
      whatsappPlaceholder: "+91 98765 43210",
      ageRangeLabel: "आयु वर्ग (वैकल्पिक)",
      ageRangeSelect: "आयु वर्ग चुनें",
      cityLabel: "शहर / कस्बा (वैकल्पिक)",
      cityPlaceholder: "उदा. मुंबई, पुणे, दिल्ली...",
      reasonLabel: "इस पहल से जुड़ने की आपकी क्या प्रेरणा रही? (वैकल्पिक)",
      reasonPlaceholder: "दीवाली की शुभकामना या अपने मन का भाव साझा करें...",
      anonymousCheckbox: "सहयोगी दीवार पर मेरा नाम गुप्त (Anonymous) रखें",
      consentsTitle: "सहमति एवं पारदर्शिता अनुमतियां",
      consentTerms: "मैं बायोवाको नेक्सस के अभियान नियमों और गोपनीयता नीति से सहमत हूँ। *",
      consentEmail:
        "मैं ईमेल पर वितरण की तस्वीरें और अंतिम ऑडिट रिपोर्ट प्राप्त करना चाहता/चाहती हूँ।",
      consentWhatsapp: "मैं व्हाट्सएप पर किट पैकिंग और वितरण के मुख्य अपडेट पाना चाहता/चाहती हूँ।",
      consentPublicName:
        "मैं अपना नाम और संदेश सार्वजनिक सहयोगी दीवार पर प्रदर्शित करने की अनुमति देता/देती हूँ।",
      consentPublicAmount:
        "मैं अपनी सहयोग राशि को सहयोगी दीवार पर सार्वजनिक रूप से दिखाने की अनुमति देता/देती हूँ।",
      termsLink: "नियम",
      privacyLink: "गोपनीयता नीति",
      submitButton: "सहयोग के लिए आगे बढ़ें",
      submitting: "प्रक्रिया जारी है...",
      gatewayLiveBadge: "सक्रिय रेज़रपे पेमेंट गेटवे · त्वरित पावती",
      gatewayPendingBadge: "ऑनलाइन गेटवे बैंक सत्यापन प्रक्रियाधीन",
      gatewayPendingNotice:
        "बायोवाको नेक्सस दिवाली 2026 के लिए मर्चेंट बैंकिंग सत्यापन के अंतिम चरण में है। यदि लाइव यूपीआई/कार्ड गेटवे विनियामक सत्यापन के कारण प्रतीक्षारत है, तो आपका संकल्प सुरक्षित रूप से दर्ज कर लिया जाएगा और गेटवे चालू होते ही आपको बैंक विवरण व लिंक सूचित किया जाएगा।",
      pledgeSuccessTitle: "बायोवाको टीम की ओर से हार्दिक धन्यवाद!",
      pledgeSuccessMsg:
        "आपका सहयोग/संकल्प पूर्ण सम्मान के साथ दर्ज कर लिया गया है। आधिकारिक पावती आपके ईमेल पर प्रेषित कर दी गई है।",
      securityNotice:
        "सुरक्षा सूचना: बायोवाको नेक्सस कभी भी आपका एटीएम पिन, सीवीवी, ओटीपी या नेट बैंकिंग पासवर्ड नहीं मांगता।",
      errors: {
        fullNameRequired: "कृपया अपना पूरा नाम दर्ज करें।",
        emailInvalid: "कृपया एक वैध ईमेल पता दर्ज करें।",
        amountInvalid: "कृपया एक मान्य राशि चुनें या दर्ज करें (कम से कम ₹5)।",
        termsRequired: "कृपया अभियान नियमों और गोपनीयता नीति की स्वीकृति दें।",
      },
    },
    wall: {
      badge: "सहयोगियों का मंच",
      heading: "जिन्होंने अपना उजाला दूसरों के साथ बांटा।",
      subheading:
        "उन सभी आत्मीय लोगों के प्रति कृतज्ञता जिन्होंने इस दिवाली किसी और के घर में दीया जलाया। यहाँ केवल उनकी प्रविष्टि दिखती है जिन्होंने सार्वजनिक प्रदर्शन की अनुमति दी है।",
      emptyState:
        "यह दीवार नेकी के पहले दीये की प्रतीक्षा कर रही है। पहला दीया प्रज्वलित करने वाले आप बनें!",
      anonymousDonor: "एक संवेदनशील स्नेही",
      amountShared: "सहयोग राशि",
      moderationNote:
        "समुदाय की गरिमा और आत्मीयता बनाए रखने के लिए सभी संदेशों की समीक्षा की जाती है।",
    },
    transparency: {
      badge: "पूर्ण पारदर्शिता",
      heading: "आपका विश्वास, हमारी ज़िम्मेदारी।",
      subheading:
        "हम आपके द्वारा दिए गए विश्वास को सर्वोपरि मानते हैं। एकत्रित हुआ एक-एक रुपया और उसका खर्च नीचे प्रमाण सहित दर्ज होगा।",
      targetFund: "अभियान लक्ष्य",
      verifiedReceived: "प्राप्त सत्यापित राशि",
      gatewayFees: "गेटवे व बैंकिंग शुल्क (~2%)",
      netAvailable: "शुद्ध उपलब्ध अभियान निधि",
      disbursed: "कुल व्यय / खरीद",
      balance: "अवशेष आरक्षित निधि",
      familiesVerified: "सत्यापित परिवार",
      kitsPacked: "तैयार किट",
      familiesDelivered: "संबल प्राप्त परिवार",
      ledgerTitle: "मदवार खरीद एवं व्यय बहीखाता",
      ledgerDate: "तारीख",
      ledgerItem: "मद / खरीद सामग्री",
      ledgerCategory: "श्रेणी",
      ledgerAmount: "राशि",
      ledgerVendor: "विक्रेता / स्रोत",
      ledgerInvoice: "इनवॉइस संदर्भ",
      ledgerStatus: "सत्यापन स्थिति",
      statusVerified: "सत्यापित व चुकता",
      statusPlanned: "नियोजित आवंटन",
      emptyLedgerNotice:
        "अब तक कोई खरीद व्यय नहीं हुआ है। जैसे ही थोक खरीद प्रारंभ होगी और जीएसटी बिल सत्यापित होंगे, प्रत्येक मदवार रसीद यहाँ लाइव दर्ज कर दी जाएगी।",
      downloadReportBtn: "मदवार ऑडिट रिपोर्ट PDF डाउनलोड करें",
      reportDisclaimer:
        "सभी जीएसटी बिल, रसीदें और वितरण पावतियां बायोवाको नेक्सस के खातों द्वारा जांची जाकर अभियान समापन पर सार्वजनिक रूप से जारी की जाती हैं।",
    },
    promise: {
      badge: "बायोवाको नेक्सस का वचन",
      heading: "हर सहयोगी के प्रति हमारा संकल्प",
      copyP1: "हम आपसे सिर्फ सहयोग नहीं मांग रहे।",
      copyP2: "हम आपसे एक छोटी सी खुशी बांटने का विनम्र आग्रह कर रहे हैं।",
      copyP3: "आपका विश्वास हमारी सबसे बड़ी ज़िम्मेदारी है।",
      copyP4:
        "इसलिए हर सहयोग का स्पष्ट रिकॉर्ड रखा जाएगा, हर अभियान खर्च का दस्तावेजीकरण होगा और अंतिम ऑडिट रिपोर्ट सार्वजनिक रूप से साझा की जाएगी।",
      copyP5: "हमारा मानना है कि नेकी हमेशा जवाबदेही और ईमानदारी के साथ आनी चाहिए।",
      pillars: {
        p1Title: "100% प्रत्यक्ष उपयोग",
        p1Desc:
          "बायोवाको नेक्सस प्रबंधन और तकनीक का सारा खर्च अपने आंतरिक फंड से वहन करता है। आपके दिए पैसे का 100% हिस्सा सीधे 20 परिवारों तक पहुंचता है।",
        p2Title: "शून्य प्रशासनिक कटौती",
        p2Desc:
          "अभियान राशि में से किसी भी प्रकार का कमीशन, वेतन या मध्यस्थ एजेंसी शुल्क नहीं काटा जाता।",
        p3Title: "पारदर्शी स्थानीय खरीद",
        p3Desc:
          "राशन और कपड़े स्थानीय अधिकृत थोक व्यापारियों से पक्के जीएसटी बिल पर खरीदे जाते हैं।",
        p4Title: "गरिमापूर्ण प्रत्यक्ष वितरण",
        p4Desc:
          "हम लाभार्थियों को कैमरे के सामने शर्मिंदा करने में विश्वास नहीं रखते। सम्मानपूर्वक उनके घर तक खुशियों का संदूक पहुंचाया जाता है।",
      },
    },
    faq: {
      badge: "जिज्ञासा और नियम",
      heading: "अक्सर पूछे जाने वाले सवाल और कानूनी स्पष्टीकरण",
      subheading:
        "कंपनी की स्थिति, फंड प्रबंधन, रिफंड नीति और डेटा सुरक्षा के संबंध में पूरी स्पष्टता।",
      taxAlert:
        "कानूनी सूचना: बायोवाको नेक्सस प्राइवेट लिमिटेड एक निगमित निजी कंपनी है। इस सामाजिक पहल में दिया गया सहयोग आयकर अधिनियम की धारा 80G के तहत कर-मुक्त नहीं है।",
      items: {
        q1: "'एक दिया और' क्या है और बायोवाको नेक्सस इसका आयोजन क्यों कर रहा है?",
        a1: "एक दिया और दिवाली 2026 के उपलक्ष्य में बायोवाको नेक्सस प्रा. लि. द्वारा शुरू की गई एक सीधी सामाजिक पहल है। एक नवाचार कंपनी होने के नाते हमारा मानना है कि त्योहार की खुशियों पर सबका अधिकार है। हमारी टीम अपने आंतरिक संसाधनों से 20 संघर्षरत परिवारों तक राशन व उत्सव किट पहुंचाती है।",
        q2: "इस पहल का कानूनी आयोजक और राशि प्राप्तकर्ता कौन है?",
        a2: "कानूनी प्राप्तकर्ता इकाई बायोवाको नेक्सस प्राइवेट लिमिटेड (CIN: U46300ME2026PTC475352) है, जो कंपनी अधिनियम के तहत पंजीकृत है। सभी सहयोग राशि एक समर्पित बैंक खाते में सुरक्षित रखी जाती है।",
        q3: "20 लाभार्थी परिवारों का चयन किस प्रकार किया जाता है?",
        a3: "अनौपचारिक बस्तियों और परिधीय इलाकों में ज़मीनी सर्वे के जरिए स्थानीय सामाजिक कार्यकर्ताओं और सामुदायिक बुजुर्गों की मदद से अत्यंत जरूरतमंद, एकल-अभिभावक, दिव्यांग कमाने वाले और दिहाड़ी मजदूर परिवारों का निष्पक्ष सत्यापन किया जाता है।",
        q4: "मेरे द्वारा दिए गए सहयोग का उपयोग कैसे होगा?",
        a4: "एकत्रित संपूर्ण राशि 20 परिवारों की उत्सव किट (₹40,000), स्थानीय वाहन परिवहन (₹3,000) और सुरक्षित पैकेजिंग (₹2,000) में लगाई जाती है।",
        q5: "क्या मुझे सहयोग करते ही पावती प्राप्त होगी?",
        a5: "हाँ। सफल लेन-देन सत्यापन के तुरंत बाद स्क्रीन पर एक डिजिटल रसीद प्रदर्शित होगी और वही पावती आपके दिए गए ईमेल पते पर भी भेज दी जाएगी।",
        q6: "यदि लेन-देन असफल हो जाए या दोहरी कटौती हो जाए तो क्या होगा?",
        a6: "असफल लेन-देन में कटी हुई राशि 3 से 5 कार्य दिवसों में बैंक द्वारा स्वतः वापस आ जाती है। यदि भूलवश दोहरा भुगतान हो गया हो तो contact@biovaco.in पर संदर्भ संख्या सहित लिखें, 5 दिनों में अतिरिक्त राशि मूल खाते में रिफंड कर दी जाएगी।",
        q7: "क्या मैं अपना सहयोग वापस ले सकता/सकती हूँ (रिफंड)?",
        a7: "हाँ। थोक खरीद शुरू होने (25 अक्टूबर 2026) से पूर्व आप कभी भी contact@biovaco.in पर ईमेल करके बिना किसी सवाल के पूर्ण रिफंड मांग सकते हैं। खरीद संपन्न होने के बाद रिफंड संभव नहीं होगा।",
        q8: "यदि अभियान समाप्त होने पर कुछ राशि बच जाए तो उसका क्या होगा?",
        a8: "यदि थोक छूट के कारण कोई राशि शेष बचती है, तो 100% बची हुई राशि से बेसहारा बुजुर्गों के लिए शीतकालीन कंबल और पौष्टिक आहार वितरित किया जाएगा, जिसका विवरण इसी पेज पर दर्ज होगा।",
        q9: "यदि ₹45,000 के लक्ष्य से अधिक राशि एकत्रित हो जाए तो?",
        a9: "अतिरिक्त राशि को रोका या मोड़ा नहीं जाएगा। प्रत्येक अतिरिक्त ₹2,250 पर प्रतीक्षा सूची से एक और सत्यापित परिवार को जोड़कर किट प्रदान की जाएगी।",
        q10: "मेरी व्यक्तिगत जानकारी की सुरक्षा कैसे होती है?",
        a10: "हम भारत के डिजिटल व्यक्तिगत डेटा संरक्षण मानकों का पालन करते हैं। आपका ईमेल या फोन किसी तीसरे पक्ष को कभी नहीं बेचा जाता।",
        q11: "क्या मैं बाद में अपनी जानकारी हटाने या नाम गुप्त करने का अनुरोध कर सकता हूँ?",
        a11: "हाँ। आप किसी भी समय contact@biovaco.in पर ईमेल भेजकर सहयोगी दीवार से अपना नाम हटाने या डेटा मिटाने का अनुरोध कर सकते हैं।",
        q12: "शिकायत निवारण अधिकारी कौन हैं और संपर्क कैसे करें?",
        a12: "किसी भी सवाल या सुझाव के लिए आप contact@biovaco.in पर लिख सकते हैं या हमारे आधिकारिक कार्यालय से संपर्क कर सकते हैं।",
        q13: "क्या यह सहयोग 80G के तहत आयकर छूट के योग्य है?",
        a13: "नहीं। बायोवाको नेक्सस प्रा. लि. एक निगमित निजी कंपनी है, कोई एनजीओ या 80G प्रमाणित संस्था नहीं। अतः इस पर धारा 80G की छूट लागू नहीं होती।",
      },
    },
    receipt: {
      title: "सहयोग पावती",
      subtitle: "बायोवाको नेक्सस प्रा. लि. – एक दिया और अभियान",
      reference: "लेन-देन संदर्भ संख्या",
      amount: "सहयोग राशि",
      donor: "सहयोगी का नाम",
      date: "दिनांक एवं समय",
      status: "स्थिति: सत्यापित एवं स्वीकृत",
      close: "खिड़की बंद करें",
      print: "रसीद प्रिंट / सुरक्षित करें",
      taxNote:
        "यह सहयोग बायोवाको नेक्सस प्रा. लि. द्वारा दिवाली 2026 की सामाजिक पहल हेतु प्राप्त हुआ है। यह दस्तावेज़ केवल प्रशासनिक पावती है, 80G कर छूट प्रमाण पत्र नहीं।",
    },
    footer: {
      company: "बायोवाको नेक्सस प्रा. लि.",
      registeredOffice: "पंजीकृत कार्यालय: एच. नं. 72, भागचंद नगर, धामणगांव रेलवे, महा. 444709",
      businessOffice:
        "व्यावसायिक कार्यालय: प्रथम तल, आरबीयू टीबीआई, काटोल रोड, नागपुर, महा. 440013",
      cin: "CIN: U46300ME2026PTC475352",
      legalNote:
        "एक दिया और दिवाली 2026 के लिए बायोवाको नेक्सस प्रा. लि. द्वारा संचालित एक निष्ठावान सामाजिक पहल है। सभी अभिलेख कॉर्पोरेट उत्तरदायित्व के तहत सुरक्षित हैं।",
      rights: "सर्वाधिकार सुरक्षित। आदर और पारदर्शिता के साथ समर्पित।",
    },
  },
  mr: {
    nav: {
      backToHome: "biovaco.in",
      campaignTitle: "एक दिवा आणखी 2026",
      purpose: "आमचा हेतू",
      goal: "मोहीम उद्दिष्ट",
      budget: "अंदाजपत्रक",
      contribute: "सहकार्य करा",
      supporters: "सहकार्य फलक",
      transparency: "पारदर्शकता",
      promise: "आमचा शब्द",
      faq: "प्रश्नोत्तरे आणि नियम",
      contributeNow: "आनंदात सहभागी व्हा",
    },
    hero: {
      initiativeBadge: "बायोव्हाको नेक्सस प्रा. लि. चा एक दिवाळी समाजहितोपक्रम",
      campaignName: "एक दिवा आणखी",
      tagline: "कुणाच्या तरी घरातही प्रकाश पडावा.",
      bodyP1: "आपण सर्वजण आपल्या घरात दिवाळीची जय्यत तयारी करतो.",
      bodyP2: "पण काही घरांमध्ये रोजच्या गरजा आणि अडचणींमुळे दिवाळीचा आनंद कुठेतरी मागे पडतो.",
      bodyP3:
        "काही पालकांची इच्छा असते की त्यांच्या मुलांनीही नवीन कपडे घालावे, गोडधोड खावे आणि दिवाळीच्या भेटवस्तूंचा आनंद घ्यावा.",
      bodyP4:
        "प्रत्येक मुलाला आणि कुटुंबाला या सणाचा आनंद घेण्याचा पूर्ण हक्क आहे, यावर आमचा विश्वास आहे.",
      bodyP5: "या दिवाळीत, आपल्या आनंदाच्या उत्सवात आणखी एका घराला सामावून घेऊया. एक दिवा आणखी.",
      primaryCta: "आनंदाचा भाग बना",
      secondaryCta: "तुमचे सहकार्य कुठे जाते ते पहा",
      metaLocation: "थेट प्रत्यक्ष उपक्रम",
      metaTarget: "20 कुटुंबांना आधार",
      metaGoal: "₹45,000 पडताळणीकृत उद्दिष्ट",
    },
    purpose: {
      badge: "या दिव्यामागील भावना",
      heading: "20 गरजू कुटुंबांच्या अंगणात प्रकाशाची उधळण",
      subheading:
        "प्रत्येक उत्सव संच (किट) अत्यंत आदराने आणि सन्मानाने तयार केला जातो — जेणेकरून संघर्ष करणाऱ्या कुटुंबांना दिवाळी ही उपकार म्हणून नव्हे, तर आपल्या घरच्यांसारख्याच सन्मानाने आणि प्रेमाने साजरी करता येईल.",
      dignityTitle: "लाभार्थ्यांच्या सन्मानाची आमची बांधिलकी",
      dignityBody:
        "आम्ही लाभार्थ्यांना कधीही दयेचे किंवा प्रसिद्धीचे साधन मानत नाही. प्रत्येक संच अत्यंत नम्रतेने आणि कृतज्ञतेने त्यांच्या उंबरठ्यापर्यंत पोहोचवला जातो.",
      kitBreakdownTitle: "प्रत्येक कुटुंब उत्सव संचामध्ये (₹2,000) काय समाविष्ट आहे",
      items: {
        groceriesTitle: "1. संपूर्ण महिन्याचे आवश्यक धान्य व किराणा",
        groceriesDesc:
          "उत्कृष्ट गव्हाचे पीठ (10 किलो), दर्जेदार तांदूळ (5 किलो), तूर डाळ (2 किलो), सूर्यफूल खाद्यतेल (2 लिटर), साखर, मीठ आणि आवश्यक मसाल्यांचे पाकीट.",
        clothesTitle: "2. नवीन सणासुदीचे कपडे",
        clothesDesc:
          "लहान मुले आणि पालकांसाठी पारंपरिक नवीन कपडे, जेणेकरून दिवाळीच्या पहाटे प्रत्येक चेहऱ्यावर नवलाईचे हसू फुलेल.",
        sweetsTitle: "3. शुद्ध तुपातील दिवाळी फराळ व मिठाई",
        sweetsDesc:
          "ताजे लाडू, करंजी/शंकरपाळी, खमंग चिवडा आणि सुकामेव्याचा खास डबा शेजाऱ्यांसोबत गोडवा वाटण्यासाठी.",
        diyasTitle: "4. मातीचे पारंपरिक दिवे आणि रांगोळी",
        diyasDesc:
          "स्थानिक पारंपरिक कुंभारांनी घडवलेले मातीचे दिवे, तिळाचे तेल, कापसाच्या वाती आणि नैसर्गिक रांगोळीचे रंग.",
        childrenTitle: "5. मुलांसाठी शैक्षणिक साहित्य व भेटवस्तू",
        childrenDesc:
          "चित्रकला वही, रंग खडू, गोष्टींची पुस्तके आणि लहान मुलांसाठी आकर्षक भेटवस्तू संच.",
      },
    },
    goal: {
      badge: "उद्दिष्ट आणि थेट प्रगती",
      heading: "20 कुटुंबांसाठी ₹45,000 चे उद्दिष्ट",
      subheading:
        "प्रत्येक रुपयाची नोंद थेट पारदर्शक प्रणालीमध्ये होते. येथे केवळ प्रत्यक्षात जमा झालेले अधिकृत सहकार्यच दाखवले जाते.",
      raisedSoFar: "आतापर्यंत प्राप्त पडताळणीकृत सहकार्य",
      ofTarget: "एकूण ₹45,000 उद्दिष्टापैकी",
      familiesFunded: "मदत मिळालेली कुटुंबे",
      ofFamilies: "एकूण 20 कुटुंबांपैकी",
      supportersCount: "पडताळणीकृत सहकारी",
      daysNotice: "वितरण कालावधी: दिवाळी आठवडा 2026",
      verifiedNote: "प्रत्यक्ष बँक व गेटवे व्यवहारांशी थेट जोडलेले.",
    },
    budget: {
      badge: "सविस्तर अंदाजपत्रक",
      heading: "प्रस्तावित मोहीम अंदाजपत्रक",
      subheading:
        "प्रत्येक पैशाचा पारदर्शक हिशोब. घाऊक खरेदीतून वाचणारा कोणताही निधी अतिरिक्त गरजू कुटुंबांसाठी वापरला जाईल.",
      disclaimer:
        "*घाऊक खरेदी आणि स्थानिक वाहतुकीच्या प्रत्यक्ष दरानुसार अंदाजपत्रकात अल्पसा बदल होऊ शकतो. सर्व खरेदी बिले पारदर्शकता विभागात जाहीर केली जातील.",
      items: {
        kitsTitle: "20 कुटुंब उत्सव संच",
        kitsDesc:
          "20 परिपूर्ण संच (किराणा, नवीन कपडे, फराळ, दिवे, भेटवस्तू) प्रति कुटुंब ₹2,000 खर्चात.",
        transportTitle: "स्थानिक वाहतूक व प्रत्यक्ष वितरण",
        transportDesc: "प्रत्यक्ष वस्त्यांमध्ये थेट पोहोचण्यासाठी वाहन, इंधन आणि सुरक्षित खोकी.",
        contingencyTitle: "पॅकिंग व आपत्कालीन राखीव निधी",
        contingencyDesc:
          "हवामान-सुरक्षित वेष्टन, अचानक वाढणारे दर आणि वितरणादरम्यान उद्भवणाऱ्या तात्काळ गरजांसाठी राखीव.",
      },
      totalLabel: "एकूण मोहीम अंदाजपत्रक",
    },
    form: {
      badge: "हात जोडा",
      heading: "या दिवाळीत कुणाच्या तरी हास्याचे कारण बना.",
      subheading:
        "बदल घडवून आणण्यासाठी काहीतरी खूप मोठे करण्याची गरज नसते. कधीकधी आपले एक लहानसे सहकार्यही कुणाच्या तरी आयुष्यात मोठा आनंद घेऊन येते.",
      selectAmount: "सहकार्य रक्कम निवडा",
      customAmountPlaceholder: "इच्छित रक्कम भरा (उदा. 750)",
      minAmountHint: "किमान सहकार्य ₹5 आहे. तुमचा प्रत्येक सहभाग मोलाचा आहे.",
      impactHint500: "₹500 मधून 2 कुटुंबांसाठी दिवे, तेल, रांगोळी व फराळाची व्यवस्था होते.",
      impactHint1000:
        "₹1,000 मधून एका संपूर्ण कुटुंबाच्या महिन्याच्या उत्सव संचाचा अर्धा खर्च होतो.",
      impactHint1500: "₹1,500 मधून 1 संपूर्ण कुटुंबाचा महिन्याचा किराणा व फराळ निश्चित होतो.",
      impactHint2000:
        "₹2,000 मधून 1 संपूर्ण कुटुंब उत्सव संच (किराणा, कपडे, फराळ, दिवे) प्रायोजित होतो.",
      impactHintCustom: "एकत्रित संच व वितरणासाठी तुमची ऐच्छिक रक्कम.",
      personalDetailsTitle: "तुमची माहिती (पूर्णतः गोपनीय व सुरक्षित)",
      fullNameLabel: "पूर्ण नाव *",
      fullNamePlaceholder: "उदा. आरव शर्मा",
      emailLabel: "ईमेल पत्ता (पावती व ऑडिट अहवालासाठी) *",
      emailPlaceholder: "aarav@example.com",
      emailHint: "अधिकृत डिजिटल पावती आणि अंतिम अहवाल या ईमेलवर पाठवला जाईल.",
      whatsappLabel: "व्हॉट्सॲप क्रमांक (ऐच्छिक)",
      whatsappPlaceholder: "+91 98765 43210",
      ageRangeLabel: "वयोगट (ऐच्छिक)",
      ageRangeSelect: "वयोगट निवडा",
      cityLabel: "शहर / गाव (ऐच्छिक)",
      cityPlaceholder: "उदा. मुंबई, पुणे, दिल्ली...",
      reasonLabel: "या उपक्रमात सहभागी होण्याची तुमची प्रेरणा काय होती? (ऐच्छिक)",
      reasonPlaceholder: "दिवाळीच्या शुभेच्छा किंवा आपल्या मनातील भावना लिहा...",
      anonymousCheckbox: "सहकार्य फलकावर माझे नाव गुप्त (Anonymous) ठेवा",
      consentsTitle: "संमती आणि पारदर्शकता अटी",
      consentTerms: "मी बायोव्हाको नेक्ससच्या मोहीम नियमावली आणि गोपनीयता धोरणाशी सहमत आहे. *",
      consentEmail: "मला ईमेलद्वारे वितरणाची छायाचित्रे आणि अंतिम अहवाल मिळावा अशी माझी इच्छा आहे.",
      consentWhatsapp: "मला व्हॉट्सॲपवर किट पॅकिंग आणि वितरणाचे महत्त्वाचे अपडेट्स मिळावेत.",
      consentPublicName:
        "माझे नाव आणि संदेश सार्वजनिक सहकार्य फलकावर प्रदर्शित करण्यास माझी संमती आहे.",
      consentPublicAmount: "माझी सहकार्य रक्कम सहकार्य फलकावर जाहीर करण्यास माझी संमती आहे.",
      termsLink: "नियम",
      privacyLink: "गोपनीयता धोरण",
      submitButton: "सहकार्यासाठी पुढे चला",
      submitting: "पडताळणी सुरू आहे...",
      gatewayLiveBadge: "सक्रिय रेझरपे पेमेंट गेटवे · तात्काळ पावती",
      gatewayPendingBadge: "ऑनलाइन गेटवे बँक मान्यता प्रक्रियाधीन",
      gatewayPendingNotice:
        "बायोव्हाको नेक्सस दिवाळी 2026 साठी मर्चंट बँकिंग मान्यतेच्या अंतिम टप्प्यात आहे. जर थेट गेटवे सध्या प्रलंबित असेल, तर तुमचा संकल्प सुरक्षितपणे नोंदवला जाईल आणि गेटवे सुरू होताच तुम्हाला अधिकृत बँक तपशील व लिंक कळवली जाईल.",
      pledgeSuccessTitle: "बायोव्हाको टीमकडून मनःपूर्वक कृतज्ञता!",
      pledgeSuccessMsg:
        "तुमचे सहकार्य/संकल्प आदराने नोंदवले गेले आहे. अधिकृत पावती तुमच्या ईमेलवर पाठवली गेली आहे.",
      securityNotice:
        "सुरक्षा सूचना: बायोव्हाको नेक्सस कधीही तुमचा एटीएम पिन, सीव्हीव्ही, ओटीपी किंवा नेट बँकिंग पासवर्ड मागत नाही.",
      errors: {
        fullNameRequired: "कृपया आपले पूर्ण नाव प्रविष्ट करा.",
        emailInvalid: "कृपया वैध ईमेल पत्ता प्रविष्ट करा.",
        amountInvalid: "कृपया योग्य रक्कम निवडा किंवा प्रविष्ट करा (किमान ₹5).",
        termsRequired: "कृपया मोहीम अटी आणि गोपनीयता धोरणाची स्वीकृती द्या.",
      },
    },
    wall: {
      badge: "सहकाऱ्यांचा सन्मान",
      heading: "ज्यांनी आपला प्रकाश इतरांसोबत वाटला.",
      subheading:
        "दिवाळीचा आनंद दुसऱ्याच्या दारापर्यंत नेणाऱ्या सर्व स्नेहीजनांप्रति कृतज्ञता. येथे केवळ अशाच सहकाऱ्यांची नावे आहेत ज्यांनी सार्वजनिक प्रदर्शनाची संमती दिली आहे.",
      emptyState:
        "हा फलक पहिल्या दिव्याच्या स्वागतासाठी सज्ज आहे. पहिला दिवा प्रज्वलित करणारे तुम्ही बना!",
      anonymousDonor: "एक संवेदनशील स्नेही",
      amountShared: "सहकार्य रक्कम",
      moderationNote: "समुदायाचा आदर आणि सौहार्द टिकवण्यासाठी सर्व संदेशांची छाननी केली जाते.",
    },
    transparency: {
      badge: "शंभर टक्के पारदर्शकता",
      heading: "तुमचा विश्वास, आमची जबाबदारी.",
      subheading:
        "दात्यांचा विश्वास ही आमची सर्वोच्च नैतिक जबाबदारी आहे. गोळा झालेला प्रत्येक रुपया आणि त्याचा खर्च खाली पुराव्यासह मांडला जाईल.",
      targetFund: "मोहीम उद्दिष्ट",
      verifiedReceived: "प्राप्त अधिकृत रक्कम",
      gatewayFees: "गेटवे व बँक शुल्क (~2%)",
      netAvailable: "निव्वळ उपलब्ध निधी",
      disbursed: "एकूण खर्च / खरेदी",
      balance: "शिल्लक राखीव निधी",
      familiesVerified: "पडताळलेली कुटुंबे",
      kitsPacked: "तयार संच",
      familiesDelivered: "मदत पोहोचलेली कुटुंबे",
      ledgerTitle: "तपशीलवार खरेदी व खर्च नोंदवही",
      ledgerDate: "दिनांक",
      ledgerItem: "खर्च / खरेदी घटक",
      ledgerCategory: "श्रेणी",
      ledgerAmount: "रक्कम",
      ledgerVendor: "विक्रेता / स्रोत",
      ledgerInvoice: "पावती संदर्भ",
      ledgerStatus: "पडताळणी स्थिती",
      statusVerified: "पडताळणीकृत व अदा",
      statusPlanned: "नियोजित वाटप",
      emptyLedgerNotice:
        "अद्याप कोणताही खरेदी खर्च झालेला नाही. घाऊक खरेदी सुरू होताच आणि जीएसटी बिले प्रमाणित होताच सर्व पावत्या येथे थेट जाहीर केल्या जातील.",
      downloadReportBtn: "तपशीलवार ऑडिट अहवाल PDF डाऊनलोड करा",
      reportDisclaimer:
        "सर्व जीएसटी बिले, पावत्या आणि वितरण स्वाक्षऱ्या बायोव्हाको नेक्सस खात्याद्वारे तपासून मोहीम संपताच जाहीर केल्या जातील.",
    },
    promise: {
      badge: "बायोव्हाको नेक्ससचे वचन",
      heading: "प्रत्येक सहकाऱ्यास आमचा शब्द",
      copyP1: "आम्ही आपल्याकडे केवळ सहकार्य मागत नाही आहोत.",
      copyP2: "आम्ही आपल्याकडे एक छोटासा आनंद वाटून घेण्याची विनंती करत आहोत.",
      copyP3: "आपला विश्वास ही आमची सर्वात मोठी जबाबदारी आहे.",
      copyP4:
        "म्हणूनच प्रत्येक सहकार्याची नोंद ठेवली जाईल, प्रत्येक मोहीम खर्चाचे दस्तऐवजीकरण केले जाईल आणि अंतिम अहवाल जाहीरपणे मांडला जाईल.",
      copyP5: "आमचा विश्वास आहे की दातृत्व हे नेहमी जबाबदारी आणि प्रामाणिकपणासोबतच आले पाहिजे.",
      pillars: {
        p1Title: "100% थेट उपयोग",
        p1Desc:
          "बायोव्हाको नेक्सस व्यवस्थापन आणि तंत्रज्ञानाचा सर्व खर्च अंतर्गत निधीतून करते. तुमच्या पैशाचा 100% वाटा थेट 20 कुटुंबांपर्यंत पोहोचतो.",
        p2Title: "शून्य प्रशासकीय कपात",
        p2Desc: "मोहीम निधीतून कोणताही नफा, पगार अथवा मध्यस्थ संस्थांचे कमिशन कापले जात नाही.",
        p3Title: "पारदर्शक स्थानिक खरेदी",
        p3Desc:
          "किराणा आणि कपडे स्थानिक अधिकृत घाऊक व्यापाऱ्यांकडून पक्क्या जीएसटी बिलावर खरेदी केले जातात.",
        p4Title: "सन्मानपूर्वक थेट वितरण",
        p4Desc:
          "आम्ही लाभार्थ्यांचे कॅमेऱ्यासमोर प्रदर्शन मांडत नाही. आदराने आणि सणाच्या शुभेच्छांसह त्यांच्या घरापर्यंत संच पोहोचवला जातो.",
      },
    },
    faq: {
      badge: "शंका आणि कायदेशीर बाबी",
      heading: "वारंवार विचारले जाणारे प्रश्न आणि कायदेशीर स्पष्टीकरण",
      subheading:
        "कंपनीचे स्वरूप, निधीचे व्यवस्थापन, परतावा (रिफंड) पद्धत आणि डेटा संरक्षणाबाबत स्पष्ट माहिती.",
      taxAlert:
        "कायदेशीर सूचना: बायोव्हाको नेक्सस प्रायव्हेट लिमिटेड ही एक नोंदणीकृत खाजगी कंपनी आहे. या सामाजिक उपक्रमातील सहकार्य आयकर कायदा कलम 80G अंतर्गत करसवलतीस पात्र नाही.",
      items: {
        q1: "'एक दिवा आणखी' काय आहे आणि बायोव्हाको नेक्सस याचे आयोजन का करत आहे?",
        a1: "एक दिवा आणखी हा दिवाळी 2026 निमित्त बायोव्हाको नेक्सस प्रा. लि. ने सुरू केलेला एक थेट सामाजिक उपक्रम आहे. एक अग्रगण्य कंपनी म्हणून सणाचा आनंद प्रत्येकाला मिळावा ही आमची भावना आहे. आमची टीम 20 गरजू कुटुंबांपर्यंत किराणा व उत्सव संच पोहोचवत आहे.",
        q2: "या उपक्रमाचे कायदेशीर आयोजक आणि रक्कम स्वीकारणारी संस्था कोण आहे?",
        a2: "कायदेशीर स्वीकारकर्ता संस्था बायोव्हाको नेक्सस प्रायव्हेट लिमिटेड (CIN: U46300ME2026PTC475352) आहे. सर्व निधी एका स्वतंत्र बँक खात्यात सुरक्षित ठेवला जातो.",
        q3: "20 लाभार्थी कुटुंबांची निवड कशी केली जाते?",
        a3: "असंघटित वस्त्यांमध्ये प्रत्यक्ष सर्वेक्षण करून, स्थानिक सामाजिक कार्यकर्ते आणि वस्तीतील ज्येष्ठांच्या मदतीने एकल पालक, दिव्यांग कमावती व्यक्ती आणि हातावर पोट असणाऱ्या मजुरांच्या कुटुंबांची पडताळणी केली जाते.",
        q4: "माझ्या सहकार्याचा उपयोग कसा केला जाईल?",
        a4: "एकत्रित सर्व निधी 20 कुटुंबांच्या उत्सव संचांची खरेदी (₹40,000), स्थानिक वाहन वाहतूक (₹3,000) आणि सुरक्षित वेष्टन (₹2,000) यांमध्ये थेट वापरला जाईल.",
        q5: "मला सहकार्य करताच पावती मिळेल का?",
        a5: "होय. व्यवहार पूर्ण होताच स्क्रीनवर डिजिटल पावती दिसेल आणि तीच पावती तुमच्या दिलेल्या ईमेलवर तत्काळ पाठवली जाईल.",
        q6: "व्यवहार अयशस्वी झाल्यास किंवा दुबार पैसे कापले गेल्यास काय करावे?",
        a6: "अयशस्वी व्यवहारातील रक्कम बँक नियमांनुसार 3 ते 5 दिवसांत आपोआप जमा होते. नजरचुकीने दुबार व्यवहार झाल्यास contact@biovaco.in वर संदर्भ क्रमांकासह लिहावे, 5 दिवसांत दुबार रक्कम परत केली जाईल.",
        q7: "मी दिलेले सहकार्य परत (रिफंड) मागू शकतो/शकते का?",
        a7: "होय. घाऊक खरेदी सुरू होण्यापूर्वी (25 ऑक्टोबर 2026 पूर्वी) आपण कोणत्याही कारणाशिवाय contact@biovaco.in वर ईमेल करून पूर्ण परतावा मागू शकता. खरेदी झाल्यानंतर परतावा देता येणार नाही.",
        q8: "मोहीम संपल्यानंतर काही निधी शिल्लक राहिल्यास त्याचे काय होते?",
        a8: "घाऊक सवलतीमुळे निधी शिल्लक राहिल्यास, 100% शिल्लक रकमेतून नोव्हेंबर/डिसेंबरमध्ये निराधार ज्येष्ठांना हिवाळी उबदार ब्लँकेट्स आणि धान्य दिले जाईल व त्याचा अहवाल येथे प्रसिद्ध होईल.",
        q9: "उद्दिष्टापेक्षा (₹45,000 पेक्षा) जास्त रक्कम गोळा झाली तर काय होईल?",
        a9: "अतिरिक्त रक्कम अन्य कामासाठी वापरली जाणार नाही. प्रत्येक अतिरिक्त ₹2,250 मागे प्रतीक्षा यादीतील आणखी एका पडताळणीकृत कुटुंबाला संच दिला जाईल.",
        q10: "माझ्या वैयक्तिक माहितीचे संरक्षण कसे केले जाते?",
        a10: "आम्ही भारतीय डिजिटल वैयक्तिक डेटा संरक्षण नियमांचे काटेकोर पालन करतो. आपला ईमेल किंवा फोन नंबर कोणत्याही बाह्य घटकास विकला अथवा दिला जात नाही.",
        q11: "मी नंतर माझी माहिती हटवण्याची किंवा नाव गुप्त ठेवण्याची विनंती करू शकतो का?",
        a11: "होय. आपण contact@biovaco.in वर कधीही ईमेल पाठवून सहकार्य फलकावरून नाव हटवण्याची अथवा माहिती नष्ट करण्याची विनंती करू शकता.",
        q12: "तक्रार निवारण अधिकारी कोण आहेत आणि संपर्क कसा करावा?",
        a12: "कोणत्याही शंकेसाठी आपण contact@biovaco.in वर लिहू शकता अथवा आमच्या अधिकृत कार्यालयाशी संपर्क साधू शकता.",
        q13: "या सहकार्यास 80G अंतर्गत करसवलत मिळते का?",
        a13: "नाही. बायोव्हाको नेक्सस प्रा. लि. ही नोंदणीकृत खाजगी कंपनी आहे, ती कोणतीही एनजीओ किंवा 80G प्रमाणित संस्था नाही. त्यामुळे यावर आयकर कलम 80G ची सवलत लागू होत नाही.",
      },
    },
    receipt: {
      title: "सहकार्य पावती",
      subtitle: "बायोव्हाको नेक्सस प्रा. लि. – एक दिवा आणखी मोहीम",
      reference: "व्यवहार संदर्भ क्रमांक",
      amount: "सहकार्य रक्कम",
      donor: "सहकार्याचे नाव",
      date: "दिनांक आणि वेळ",
      status: "स्थिती: पडताळणीकृत व स्वीकृत",
      close: "खिडकी बंद करा",
      print: "पावती प्रिंट / सेव्ह करा",
      taxNote:
        "हे सहकार्य बायोव्हाको नेक्सस प्रा. लि. च्या दिवाळी 2026 सामाजिक उपक्रमासाठी प्राप्त झाले आहे. हा दस्तऐवज केवळ प्रशासकीय पावती आहे, 80G कर सवलत प्रमाणपत्र नाही.",
    },
    footer: {
      company: "बायोव्हाको नेक्सस प्रा. लि.",
      registeredOffice: "नोंदणीकृत कार्यालय: एच. नं. 72, भागचंद नगर, धामणगाव रेल्वे, महा. 444709",
      businessOffice:
        "व्यावसायिक कार्यालय: पहिला मजला, आरबीयू टीबीआय, काटोल रोड, नागपूर, महा. 440013",
      cin: "CIN: U46300ME2026PTC475352",
      legalNote:
        "एक दिवा आणखी हा दिवाळी 2026 साठी बायोव्हाको नेक्सस प्रा. लि. द्वारे चालवला जाणारा थेट सामाजिक उपक्रम आहे. सर्व नोंदी कॉर्पोरेट उत्तरदायित्वाखाली सुरक्षित आहेत.",
      rights: "सर्व हक्क राखीव. आदर आणि पारदर्शकतेने समर्पित.",
    },
  },
};
