export type Language = "en" | "hi" | "mr";

export interface CampaignTranslation {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    backToHome: string;
    theCause: string;
    goal: string;
    budget: string;
    contribute: string;
    supporters: string;
    transparency: string;
    promise: string;
    faq: string;
    ctaButton: string;
  };
  hero: {
    initiativeBadge: string;
    headline: string;
    tagline: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    body5: string;
    ctaPrimary: string;
    ctaSecondary: string;
    campaignInfo: {
      locationLabel: string;
      locationValue: string;
      familiesLabel: string;
      familiesValue: string;
      targetLabel: string;
      targetValue: string;
      yearLabel: string;
      yearValue: string;
    };
  };
  purpose: {
    sectionBadge: string;
    heading: string;
    description: string;
    dignityNotice: string;
    kitItems: Array<{
      title: string;
      description: string;
      iconName: string;
    }>;
  };
  goalSection: {
    sectionBadge: string;
    heading: string;
    description: string;
    raisedLabel: string;
    goalLabel: string;
    familiesSupportedLabel: string;
    familiesTargetLabel: string;
    nagpurLocation: string;
    verifiedNote: string;
    verifiedBadge: string;
  };
  budget: {
    sectionBadge: string;
    heading: string;
    description: string;
    disclaimer: string;
    items: Array<{
      title: string;
      amount: string;
      percent: string;
      detail: string;
    }>;
    totalLabel: string;
    totalAmount: string;
  };
  form: {
    sectionBadge: string;
    heading: string;
    description: string;
    gatewayNoticeTitle: string;
    gatewayNoticePending: string;
    gatewayNoticePledgeMode: string;
    amountStepLabel: string;
    presetAmounts: number[];
    customAmountLabel: string;
    customAmountPlaceholder: string;
    detailsStepLabel: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    fullNameHelper: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHelper: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    whatsappHelper: string;
    ageRangeLabel: string;
    ageRangePlaceholder: string;
    ageRanges: string[];
    cityLabel: string;
    cityPlaceholder: string;
    inspirationLabel: string;
    inspirationPlaceholder: string;
    privacyOptionsHeading: string;
    anonymousLabel: string;
    anonymousDesc: string;
    publicWallLabel: string;
    publicWallDesc: string;
    displayAmountLabel: string;
    displayAmountDesc: string;
    consentHeading: string;
    termsConsentLabel: string;
    emailConsentLabel: string;
    whatsappConsentLabel: string;
    submitPledgeButton: string;
    submitPayButton: string;
    processingButton: string;
    successTitle: string;
    successMessage: string;
    successReference: string;
    successCloseButton: string;
    validationErrors: {
      amountMin: string;
      nameRequired: string;
      emailInvalid: string;
      termsRequired: string;
    };
  };
  supporters: {
    sectionBadge: string;
    heading: string;
    description: string;
    anonymousName: string;
    noSupportersYet: string;
    verifiedContribution: string;
    sharedWord: string;
  };
  transparency: {
    sectionBadge: string;
    heading: string;
    description: string;
    statTarget: string;
    statVerifiedReceived: string;
    statGatewayCharges: string;
    statPurchases: string;
    statTransport: string;
    statRemaining: string;
    statFamiliesVerified: string;
    statKitsPacked: string;
    statFamiliesSupported: string;
    tableHeading: string;
    tableHeaders: {
      date: string;
      expense: string;
      category: string;
      amount: string;
      invoiceRef: string;
    };
    reportNotice: string;
    downloadReportBtn: string;
    auditBadge: string;
  };
  promise: {
    sectionBadge: string;
    heading: string;
    quoteHindi: string;
    quoteEnglish: string;
    principles: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    sectionBadge: string;
    heading: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    disclaimerLegal: string;
    taxClarification: string;
    registeredInfo: string;
    rightsReserved: string;
  };
}

export const translations: Record<Language, CampaignTranslation> = {
  en: {
    meta: {
      title: "Ek Diya Aur | Diwali Giving Initiative 2026 | BiovaCo Nexus",
      description:
        "Join BiovaCo Nexus in supporting 20 economically vulnerable families in Nagpur this Diwali. 100% transparent grassroots community initiative. Kisi aur ke ghar mein bhi roshni ho.",
      keywords:
        "Ek Diya Aur, BiovaCo Nexus, Diwali charity Nagpur, community giving, Diwali grocery kit, festival of lights, transparent fundraising 2026, social impact Nagpur",
    },
    nav: {
      backToHome: "biovaco.in",
      theCause: "The Purpose",
      goal: "Goal & Progress",
      budget: "Budget",
      contribute: "Contribute",
      supporters: "Supporters",
      transparency: "Transparency",
      promise: "Our Promise",
      faq: "FAQ & Legal",
      ctaButton: "Contribute Now",
    },
    hero: {
      initiativeBadge: "A Diwali Giving Initiative by BiovaCo Nexus Pvt. Ltd. • Nagpur, Maharashtra",
      headline: "EK DIYA AUR",
      tagline: "“Kisi aur ke ghar mein bhi roshni ho.”",
      body1: "We celebrate Diwali with lights, sweets, new clothes, and thoughtful gifts.",
      body2: "Yet, for many hardworking families around us, festive celebrations take a back seat to everyday survival.",
      body3: "Every parent wishes to see their child dressed in festive attire, holding a box of sweets, with sparkling eyes on Diwali evening.",
      body4: "We believe every child deserves to experience the uncompromised joy of this festival.",
      body5: "This Diwali, we invite you to include one more home in your celebrations. Ek Diya Aur.",
      ctaPrimary: "Be a Part of the Celebration",
      ctaSecondary: "See Where Your Contribution Goes",
      campaignInfo: {
        locationLabel: "Location",
        locationValue: "Nagpur, Maharashtra",
        familiesLabel: "Beneficiary Families",
        familiesValue: "20 Families",
        targetLabel: "Fundraising Target",
        targetValue: "₹45,000",
        yearLabel: "Campaign Year",
        yearValue: "Diwali 2026",
      },
    },
    purpose: {
      sectionBadge: "Why We Are Doing This",
      heading: "Sharing the Radiance of the Festival",
      description:
        "Our mission is to bring tangible, dignified festive joy to 20 economically vulnerable families in Nagpur. Rather than handouts, we curate comprehensive, respectful Diwali family packages that allow families to celebrate traditions with dignity.",
      dignityNotice:
        "Every family is treated with profound respect. We protect the privacy and honour of all beneficiaries and do not use personal suffering as promotional material.",
      kitItems: [
        {
          title: "Nutritious & Festive Groceries",
          description: "Essential staples (flour, rice, dal, edible oil, spices, and sugar) to ensure wholesome festive family meals without hardship.",
          iconName: "Package",
        },
        {
          title: "New Festive Clothes",
          description: "Fresh, festive apparel for children and family members, bringing the genuine excitement of new clothes for the festival.",
          iconName: "Shirt",
        },
        {
          title: "Traditional Sweets & Snacks",
          description: "Hygienically prepared traditional Diwali sweets (mithai) and savory snacks (farsan) to share with visiting neighbours.",
          iconName: "Sparkles",
        },
        {
          title: "Earthen Diyas & Rangoli Kit",
          description: "Locally handcrafted earthen diyas (potter-sourced), natural lamp oil, wicks, and vibrant natural rangoli colors to light up their doorstep.",
          iconName: "Flame",
        },
        {
          title: "Children’s Joy & Gift Kit",
          description: "Educational activity books, wooden crafts, and festive surprises for the kids to light up their smiles.",
          iconName: "Smile",
        },
      ],
    },
    goalSection: {
      sectionBadge: "Campaign Target & Progress",
      heading: "Measurable Impact, Grounded in Reality",
      description:
        "We are deliberately keeping our target focused and achievable. 20 verified families in Nagpur, with 100% verified accounting.",
      raisedLabel: "Verified Contributions Received",
      goalLabel: "Total Campaign Goal",
      familiesSupportedLabel: "Families Fully Funded",
      familiesTargetLabel: "Target Families",
      nagpurLocation: "Nagpur, Maharashtra (Pardi & Wadi Cluster)",
      verifiedNote: "Our progress bar reflects only verified, captured transactions. We never use artificial counters or inflated figures.",
      verifiedBadge: "Verified Ledger Active",
    },
    budget: {
      sectionBadge: "Financial Breakdown",
      heading: "Where Every Rupee Goes",
      description:
        "Transparency starts before a single rupee is spent. Here is our line-item cost architecture for supporting 20 families.",
      disclaimer:
        "Note: Procurement figures are realistic cost projections. Any procurement savings will be redirected towards adding items to the kits or supporting an additional family. Detailed vendor receipts will be uploaded to the Transparency section.",
      items: [
        {
          title: "20 Family Celebration Kits",
          amount: "₹40,000",
          percent: "88.9%",
          detail: "₹2,000 per family: Groceries (₹900), festive clothes & kids gifts (₹700), sweets & snacks (₹250), diyas & rangoli (₹150).",
        },
        {
          title: "Packing, Transport & Ground Logistics",
          amount: "₹3,000",
          percent: "6.7%",
          detail: "Eco-friendly carton packaging, local delivery vehicle rental across Nagpur distribution clusters, volunteer hydration.",
        },
        {
          title: "Contingency & Price Fluctuation Buffer",
          amount: "₹2,000",
          percent: "4.4%",
          detail: "Reserved for last-minute wholesale grocery price fluctuations or emergency needs of recipient families.",
        },
      ],
      totalLabel: "Total Required Budget",
      totalAmount: "₹45,000",
    },
    form: {
      sectionBadge: "Join the Initiative",
      heading: "Be the Reason Someone Smiles This Diwali",
      description:
        "You don't need to do something big to make a difference. Sometimes, even a small contribution can become part of someone's happiness.",
      gatewayNoticeTitle: "Payment Gateway Approval Status",
      gatewayNoticePending:
        "Official merchant gateway onboarding with Razorpay for BiovaCo Nexus Pvt. Ltd. is currently underway. In full transparency, live card/UPI deductions are paused until regulatory receiving entity verification is completed.",
      gatewayNoticePledgeMode:
        "You can register your pledge below without any immediate charge. Our team will issue a direct payment link and formal confirmation once gateway onboarding is operational.",
      amountStepLabel: "1. Select or Enter Contribution Amount",
      presetAmounts: [500, 1000, 1500, 2000],
      customAmountLabel: "Or Enter Custom Amount (₹)",
      customAmountPlaceholder: "e.g., 2500",
      detailsStepLabel: "2. Your Information (Private & Encrypted)",
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "e.g., Nakul Sharma",
      fullNameHelper: "Required privately for accounting and receipt generation.",
      emailLabel: "Email Address *",
      emailPlaceholder: "e.g., nakul@example.com",
      emailHelper: "Required to deliver your contribution acknowledgement & utilization report.",
      whatsappLabel: "WhatsApp Number (Optional)",
      whatsappPlaceholder: "e.g., +91 98765 43210",
      whatsappHelper: "For direct photo updates of the distribution drive in Nagpur.",
      ageRangeLabel: "Age Range (Optional)",
      ageRangePlaceholder: "Select age bracket",
      ageRanges: ["Under 21", "21 - 30", "31 - 45", "46 - 60", "60+"],
      cityLabel: "City / Location (Optional)",
      cityPlaceholder: "e.g., Nagpur, Mumbai, Bangalore",
      inspirationLabel: "What inspired you to be a part of this initiative? (Optional)",
      inspirationPlaceholder: "Share a brief thought or Diwali greeting...",
      privacyOptionsHeading: "3. Privacy & Display Preferences",
      anonymousLabel: "Make my contribution anonymous",
      anonymousDesc: "Your name will never appear publicly on the supporter wall or public records.",
      publicWallLabel: "Feature my name and message on the public Supporter Wall",
      publicWallDesc: "Inspire others by appearing on the Wall of Light (subject to community guidelines).",
      displayAmountLabel: "Display contribution amount on the public wall",
      displayAmountDesc: "Leave unchecked if you prefer to show only your name without the monetary figure.",
      consentHeading: "4. Consent & Legal Acknowledgements",
      termsConsentLabel: "I have read and agree to the Terms & Conditions and Privacy Policy. I acknowledge that BiovaCo Nexus Pvt. Ltd. is a registered corporate entity organizing this initiative without 80G tax exemptions.",
      emailConsentLabel: "I consent to receiving email updates regarding campaign milestones and the final financial report.",
      whatsappConsentLabel: "I consent to receiving distribution updates on WhatsApp (optional).",
      submitPledgeButton: "Register Your Contribution Pledge (₹",
      submitPayButton: "Proceed to Contribute (₹",
      processingButton: "Recording Your Intent...",
      successTitle: "Thank You for Sharing Your Light!",
      successMessage: "Your contribution details have been successfully recorded. You will receive an official acknowledgement at your email address shortly. Thank you for making Diwali brighter for a family in Nagpur.",
      successReference: "Campaign Ref ID",
      successCloseButton: "Return to Campaign",
      validationErrors: {
        amountMin: "Please enter a valid amount of at least ₹100.",
        nameRequired: "Full Name is required for private accounting.",
        emailInvalid: "Please enter a valid email address.",
        termsRequired: "You must accept the terms & privacy policy to proceed.",
      },
    },
    supporters: {
      sectionBadge: "Wall of Light",
      heading: "People Who Chose to Share Their Light",
      description:
        "Every single contribution brings us closer to illuminating 20 homes. Only supporters who explicitly consented to public recognition are shown here.",
      anonymousName: "A Caring Friend (Anonymous)",
      noSupportersYet: "Be the first to ignite a diya and inspire others to contribute.",
      verifiedContribution: "Verified Supporter",
      sharedWord: "shared:",
    },
    transparency: {
      sectionBadge: "Financial Integrity",
      heading: "Your Trust Deserves Transparency",
      description:
        "Trust is earned through unfiltered accountability. Every rupee received and spent is recorded with matching vendor invoices and public disbursement tracking.",
      statTarget: "Fundraising Target",
      statVerifiedReceived: "Verified Funds Received",
      statGatewayCharges: "Gateway Charges (0%)",
      statPurchases: "Procurement Expenses",
      statTransport: "Logistics & Distribution",
      statRemaining: "Balance Available",
      statFamiliesVerified: "Families Verified On Ground",
      statKitsPacked: "Kits Assembled",
      statFamiliesSupported: "Families Completed",
      tableHeading: "Real-time Expense & Procurement Ledger",
      tableHeaders: {
        date: "Date",
        expense: "Item / Service Description",
        category: "Category",
        amount: "Amount (₹)",
        invoiceRef: "Voucher / Bill Ref",
      },
      reportNotice: "A comprehensive final financial audit report including physical distribution photos and scanned wholesale tax invoices will be published here upon campaign conclusion.",
      downloadReportBtn: "Download Interim Audit Statement (PDF)",
      auditBadge: "Publicly Audited by BiovaCo Finance Team",
    },
    promise: {
      sectionBadge: "Our Ethical Commitment",
      heading: "Our Promise to Every Supporter",
      quoteHindi: "“Hum aapse sirf contribution nahi maang rahe. Hum aapse ek chhoti si khushi share karne ki request kar rahe hain. Aapka trust humari responsibility hai. Isliye har contribution ka record rakha jayega, har campaign expense document kiya jayega aur final utilisation report publicly share ki jayegi.”",
      quoteEnglish: "“We believe kindness should always come with accountability.”",
      principles: [
        {
          title: "100% Pass-Through",
          description: "Zero administrative overhead cut. 100% of every rupee goes straight into family kits, packaging, and local transport.",
        },
        {
          title: "Public Bill Repository",
          description: "All purchase receipts from local Nagpur wholesalers and potters are photographed, logged, and made publicly accessible.",
        },
        {
          title: "Dignity-First Distribution",
          description: "Distributions are conducted privately and respectfully without humiliating public photo-ops or intrusive filming of recipients.",
        },
      ],
    },
    faq: {
      sectionBadge: "Common Questions",
      heading: "Frequently Asked Questions & Legal Disclosures",
      description:
        "Clear, unambiguous answers about how the campaign operates, who manages the funds, and your legal rights.",
      items: [
        {
          question: "Who is organizing 'Ek Diya Aur' and who receives the funds?",
          answer:
            "This initiative is organized by BiovaCo Nexus Private Limited (CIN: U46300ME2026PTC475352), a corporate innovation company headquartered in Nagpur, Maharashtra. All funds are received into a designated, segregated corporate bank escrow ledger strictly earmarked for this social initiative.",
        },
        {
          question: "Are contributions tax-deductible under Section 80G?",
          answer:
            "No. BiovaCo Nexus Pvt. Ltd. is a registered Private Limited Company and not an NGO or a registered Section 80G charitable trust. Consequently, contributions do NOT qualify for tax deductions under Section 80G of the Indian Income Tax Act. We believe in complete transparency and do not make false tax exemption claims.",
        },
        {
          question: "How are the 20 beneficiary families selected?",
          answer:
            "Families are identified through on-ground verification in Nagpur's informal settlement clusters (such as Pardi, Wadi, and rural fringe areas). We prioritize daily wage laborers, single-parent households, elderly caregivers, and families with young children whose breadwinners have faced medical emergencies or seasonal job losses.",
        },
        {
          question: "What happens if you raise more than the ₹45,000 target?",
          answer:
            "If excess funds are collected, 100% of the surplus will be used to create additional ₹2,000 kits to support 21st, 22nd, or more families from our verified waitlist. No surplus funds will ever be retained as profit or absorbed into company operational accounts.",
        },
        {
          question: "What happens if the campaign falls short of ₹45,000?",
          answer:
            "BiovaCo Nexus Pvt. Ltd. has formally pledged to cover any funding shortfall from its corporate CSR reserves, ensuring that all 20 identified families receive their complete Diwali kits regardless of the total raised from the public.",
        },
        {
          question: "How will I know where my contribution went?",
          answer:
            "Every contributor receives an email acknowledgement upon verified contribution, followed by a post-campaign comprehensive Financial & Photographic Utilisation Report showing itemized bills, distribution milestones, and exact procurement costs.",
        },
        {
          question: "What is your refund policy for duplicate or erroneous transactions?",
          answer:
            "If an accidental duplicate deduction occurs or you made an error in the amount, write to us at support@biovaco.in or contact@biovaco.in within 48 hours of payment. Verified duplicate transactions will be fully refunded to the originating source within 5 to 7 business days via standard banking rails.",
        },
        {
          question: "How do you protect donor privacy and personal information?",
          answer:
            "Your email address, phone number, and private identity are stored with industry-grade encryption and will NEVER be sold, shared, or rented to third-party marketers. Your details appear on the public Supporter Wall only if you explicitly opt-in during the submission process.",
        },
        {
          question: "Can I withdraw my consent or request data deletion later?",
          answer:
            "Yes. You may request the removal of your public message, withdrawal of marketing consent, or deletion of your profile at any time by emailing privacy@biovaco.in with your transaction reference. We will process your request within 72 hours.",
        },
        {
          question: "How can I volunteer or assist with packing and distribution in Nagpur?",
          answer:
            "Local volunteers in Nagpur are warmly welcomed to join us during the kit packaging and logistics phases. Reach out via email at contact@biovaco.in with the subject 'Volunteer - Ek Diya Aur'.",
        },
      ],
    },
    footer: {
      disclaimerLegal:
        "“Ek Diya Aur” is a voluntary grassroots community festival initiative spearheaded by BiovaCo Nexus Pvt. Ltd. All activities are conducted in accordance with applicable Indian laws.",
      taxClarification:
        "Statutory Disclosure: BiovaCo Nexus Pvt. Ltd. is a Private Limited corporate entity. Contributions are not tax-deductible under Section 80G.",
      registeredInfo: "BiovaCo Nexus Private Limited • CIN: U46300ME2026PTC475352 • Registered Office: Nagpur, Maharashtra, India • contact@biovaco.in",
      rightsReserved: "© 2026 BiovaCo Nexus Pvt. Ltd. All rights reserved.",
    },
  },
  hi: {
    meta: {
      title: "एक दिया और | दिवाली सेवा पहल 2026 | बायोवाको नेक्सस",
      description:
        "इस दिवाली नागपुर के 20 जरूरतमंद परिवारों के चेहरों पर मुस्कान लाने में बायोवाको नेक्सस का साथ दें। 100% पारदर्शी सामुदायिक पहल। किसी और के घर में भी रोशनी हो।",
      keywords:
        "एक दिया और, बायोवाको नेक्सस, दिवाली दान नागपुर, सामुदायिक सहयोग, दिवाली राशन किट, रोशनी का त्योहार, पारदर्शी सहयोग",
    },
    nav: {
      backToHome: "biovaco.in",
      theCause: "हमारा उद्देश्य",
      goal: "लक्ष्य और प्रगति",
      budget: "बजट विवरण",
      contribute: "सहयोग करें",
      supporters: "सहयोगी",
      transparency: "पारदर्शिता",
      promise: "हमारा वचन",
      faq: "अक्सर पूछे जाने वाले सवाल",
      ctaButton: "सहयोग दें",
    },
    hero: {
      initiativeBadge: "बायोवाको नेक्सस प्रा. लि. की एक दीपोत्सव पहल • नागपुर, महाराष्ट्र",
      headline: "एक दिया और",
      tagline: "“किसी और के घर में भी रोशनी हो।”",
      body1: "हम सब अपने घरों में दीपोत्सव की तैयारियां हर्षोल्लास से करते हैं।",
      body2: "लेकिन हमारे आस-पास कुछ ऐसे भी परिवार हैं, जिनकी त्योहार की खुशियां रोज़मर्रा की ज़रूरतों के बोझ तले दब जाती हैं।",
      body3: "हर माता-पिता का सपना होता है कि दिवाली पर उनके बच्चे भी नए वस्त्र पहनें, मीठी मिठाइयां चखें और खिलखिलाएं।",
      body4: "हमारा विश्वास है कि इस पावन पर्व का सच्चा आनंद हर बच्चे और हर परिवार का स्वाभाविक अधिकार है।",
      body5: "इस दिवाली, अपनी खुशियों की थाली में एक और घर को सम्मिलित कीजिए। एक दिया और।",
      ctaPrimary: "इस उत्सव का हिस्सा बनें",
      ctaSecondary: "देखें आपका सहयोग कहाँ पहुंचेगा",
      campaignInfo: {
        locationLabel: "स्थान",
        locationValue: "नागपुर, महाराष्ट्र",
        familiesLabel: "लक्षित परिवार",
        familiesValue: "20 परिवार",
        targetLabel: "कुल वित्तीय लक्ष्य",
        targetValue: "₹45,000",
        yearLabel: "अभियान वर्ष",
        yearValue: "दिवाली 2026",
      },
    },
    purpose: {
      sectionBadge: "हमारी मंशा",
      heading: "त्योहार की मिठास और उजाला साझा करना",
      description:
        "हम नागपुर के 20 आर्थिक रूप से संघर्षरत परिवारों तक सम्मानजनक दीपोत्सव किट पहुंचाने का संकल्प ले रहे हैं। यह कोई उपकार नहीं, बल्कि परिवार के रूप में खुशियां बांटने का एक विनम्र प्रयास है।",
      dignityNotice:
        "प्रत्येक परिवार के आत्मसम्मान और गरिमा का पूरा आदर किया जाता है। हम किसी की लाचारी का प्रदर्शन प्रचार के लिए कभी नहीं करते।",
      kitItems: [
        {
          title: "संपूर्ण राशन और किराना किट",
          description: "आटा, चावल, दाल, शुद्ध तेल, मसाले और शक्कर का संपूर्ण पैकेट, ताकि परिवार बिना किसी चिंता के पकवान बना सके।",
          iconName: "Package",
        },
        {
          title: "बच्चों और परिजनों के लिए नए वस्त्र",
          description: "त्योहार के अवसर पर बच्चों के लिए नए कपड़े, जो उनके चेहरे पर सच्चे उल्लास की चमक लाते हैं।",
          iconName: "Shirt",
        },
        {
          title: "पारंपरिक मिठाइयां और नमकीन",
          description: "स्वच्छता से निर्मित ताज़ी मिठाइयां और फरसाण, ताकि वे पड़ोसियों और आगंतुकों का स्वागत गर्व से कर सकें।",
          iconName: "Sparkles",
        },
        {
          title: "मिट्टी के दीये और रंगोली सामग्री",
          description: "स्थानीय कुम्हारों से खरीदे गए हस्तनिर्मित मिट्टी के दीये, तेल, बाती और प्राकृतिक रंगों की सुंदर रंगोली।",
          iconName: "Flame",
        },
        {
          title: "बच्चों के उपहार और खिलौने",
          description: "रचनात्मक पुस्तकें, खेल-खिलौने और उपहार जो नन्हे बच्चों की दिवाली को अविस्मरणीय बना दें।",
          iconName: "Smile",
        },
      ],
    },
    goalSection: {
      sectionBadge: "अभियान का लक्ष्य और प्रगति",
      heading: "सटीक और प्रामाणिक धरातलीय लक्ष्य",
      description:
        "हमने लक्ष्य को सीमित और पूरी तरह पारदर्शी रखा है—नागपुर के 20 सत्यापित परिवार और कुल ₹45,000 का बजट।",
      raisedLabel: "सत्यापित प्राप्त सहयोग",
      goalLabel: "कुल अभियान लक्ष्य",
      familiesSupportedLabel: "पूर्ण वित्तपोषित परिवार",
      familiesTargetLabel: "कुल लक्षित परिवार",
      nagpurLocation: "नागपुर, महाराष्ट्र (पारडी व वाडी क्लस्टर)",
      verifiedNote: "हमारी प्रगति पट्टी केवल वास्तव में सत्यापित और बैंक में प्राप्त राशि को दर्शाती है। कोई बनावटी आंकड़े नहीं।",
      verifiedBadge: "सत्यापित खाता सक्रिय",
    },
    budget: {
      sectionBadge: "व्यय का विवरण",
      heading: "आपके एक-एक रुपये का हिसाब",
      description:
        "सच्ची ईमानदारी काम शुरू होने से पहले हिसाब सार्वजनिक करने में है। 20 परिवारों की किट का अनुमानित वित्तीय ढांचा इस प्रकार है:",
      disclaimer:
        "नोट: यह लागत थोक मूल्य अनुमानों पर आधारित है। यदि खरीदारी में बचत होती है, तो उस राशि से अतिरिक्त परिवारों को जोड़ा जाएगा। सभी पक्के बिल पारदर्शिता अनुभाग में उपलब्ध कराए जाएंगे।",
      items: [
        {
          title: "20 संपूर्ण दिवाली उत्सव किट",
          amount: "₹40,000",
          percent: "88.9%",
          detail: "₹2,000 प्रति परिवार: राशन सामग्री (₹900), नए वस्त्र व खिलौने (₹700), मिठाइयां (₹250), दीये व रंगोली (₹150)।",
        },
        {
          title: "पैकिंग, वितरण एवं स्थानीय परिवहन",
          amount: "₹3,000",
          percent: "6.7%",
          detail: "इको-फ्रेंडली पैकेजिंग बॉक्स, नागपुर के वितरण क्षेत्रों तक वाहन किराया और वालंटियर जलपान।",
        },
        {
          title: "आपातकालीन मूल्य-उतार-चढ़ाव निधि",
          amount: "₹2,000",
          percent: "4.4%",
          detail: "बाज़ार में थोक किराना भाव के उतार-चढ़ाव अथवा किसी परिवार की विशेष आकस्मिक आवश्यकता हेतु आरक्षित।",
        },
      ],
      totalLabel: "कुल आवश्यक राशि",
      totalAmount: "₹45,000",
    },
    form: {
      sectionBadge: "सहयोग प्रस्तुत करें",
      heading: "इस दिवाली किसी के चेहरे की मुस्कान बनिए",
      description:
        "बदलाव लाने के लिए हमेशा किसी बहुत बड़े काम की आवश्यकता नहीं होती। कभी-कभी आपका एक छोटा सा योगदान भी किसी के घर में उजाला कर देता है।",
      gatewayNoticeTitle: "भुगतान गेटवे की वर्तमान स्थिति",
      gatewayNoticePending:
        "बायोवाको नेक्सस प्रा. लि. के लिए रेजरपे (Razorpay) के साथ आधिकारिक मर्चेंट ऑनबोर्डिंग की प्रक्रिया जारी है। पूर्ण ईमानदारी बरतते हुए, जब तक नियामक सत्यापन पूरा नहीं होता, लाइव कार्ड/यूपीआई कटौती अस्थायी रूप से रोकी गई है।",
      gatewayNoticePledgeMode:
        "आप बिना किसी तत्काल शुल्क के अपना संकल्प (Pledge) दर्ज कर सकते हैं। गेटवे सक्रिय होते ही हमारी टीम आपको आधिकारिक पुष्टि व भुगतान लिंक प्रेषित करेगी।",
      amountStepLabel: "1. सहयोग राशि चुनें अथवा दर्ज करें",
      presetAmounts: [500, 1000, 1500, 2000],
      customAmountLabel: "अथवा अपनी इच्छानुसार राशि लिखें (₹)",
      customAmountPlaceholder: "उदा. 2500",
      detailsStepLabel: "2. आपकी व्यक्तिगत जानकारी (सुरक्षित एवं गोपनीय)",
      fullNameLabel: "पूरा नाम *",
      fullNamePlaceholder: "उदा. राहुल शर्मा",
      fullNameHelper: "आंतरिक लेखा-जोखा और रसीद तैयार करने के लिए आवश्यक।",
      emailLabel: "ईमेल पता *",
      emailPlaceholder: "उदा. rahul@example.com",
      emailHelper: "सहयोग की पावती और अंतिम वित्तीय ऑडिट रिपोर्ट भेजने हेतु।",
      whatsappLabel: "व्हाट्सएप नंबर (वैकल्पिक)",
      whatsappPlaceholder: "उदा. +91 98765 43210",
      whatsappHelper: "नागपुर में वितरण अभियान की सचित्र जानकारी सीधे प्राप्त करने हेतु।",
      ageRangeLabel: "आयु वर्ग (वैकल्पिक)",
      ageRangePlaceholder: "आयु वर्ग चुनें",
      ageRanges: ["21 से कम", "21 - 30", "31 - 45", "46 - 60", "60+"],
      cityLabel: "शहर / राज्य (वैकल्पिक)",
      cityPlaceholder: "उदा. नागपुर, मुंबई, इंदौर",
      inspirationLabel: "आपको इस अभियान से जुड़ने की प्रेरणा कहाँ से मिली? (वैकल्पिक)",
      inspirationPlaceholder: "अपने विचार या दिवाली की शुभकामनाएं साझा करें...",
      privacyOptionsHeading: "3. गोपनीयता और प्रदर्शन विकल्प",
      anonymousLabel: "मेरा सहयोग अनाम (Anonymous) रखें",
      anonymousDesc: "आपका नाम सार्वजनिक पटल पर कभी प्रदर्शित नहीं किया जाएगा।",
      publicWallLabel: "सहयोगी पटल (Supporter Wall) पर मेरा नाम और संदेश दिखाएं",
      publicWallDesc: "दूसरों को प्रेरित करने हेतु आपका नाम सम्मानपूर्वक प्रदर्शित होगा।",
      displayAmountLabel: "सहयोगी पटल पर मेरी सहयोग राशि भी प्रदर्शित करें",
      displayAmountDesc: "यदि आप राशि गुप्त रखकर केवल नाम दिखाना चाहते हैं तो इसे अनचेक रहने दें।",
      consentHeading: "4. सहमति एवं नियम स्वीकृति",
      termsConsentLabel: "मैंने नियम व शर्तें और गोपनीयता नीति पढ़ ली है। मैं स्वीकार करता हूँ कि बायोवाको नेक्सस प्रा. लि. एक पंजीकृत प्राइवेट कंपनी है और यह सहयोग 80G कर छूट के अंतर्गत नहीं आता।",
      emailConsentLabel: "मैं अभियान की प्रगति और वित्तीय ऑडिट रिपोर्ट ईमेल पर पाने की सहमति देता हूँ।",
      whatsappConsentLabel: "मैं व्हाट्सएप पर अभियान के अद्यतन पाने की सहमति देता हूँ (वैकल्पिक)।",
      submitPledgeButton: "सहयोग का संकल्प दर्ज करें (₹",
      submitPayButton: "सहयोग हेतु आगे बढ़ें (₹",
      processingButton: "विवरण दर्ज किया जा रहा है...",
      successTitle: "रोशनी साझा करने के लिए हार्दिक धन्यवाद!",
      successMessage: "आपका सहयोग संकल्प सफलतापूर्वक दर्ज कर लिया गया है। शीघ्र ही आपके ईमेल पर औपचारिक सूचना भेजी जाएगी। नागपुर के एक परिवार की दिवाली रोशन करने के लिए आपका आभार।",
      successReference: "अभियान संदर्भ संख्या",
      successCloseButton: "अभियान पृष्ठ पर लौटें",
      validationErrors: {
        amountMin: "कृपया कम से कम ₹100 की वैध राशि दर्ज करें।",
        nameRequired: "लेखा-जोखा हेतु पूरा नाम दर्ज करना अनिवार्य है।",
        emailInvalid: "कृपया एक वैध ईमेल पता दर्ज करें।",
        termsRequired: "आगे बढ़ने के लिए नियमों व नीति की स्वीकृति आवश्यक है।",
      },
    },
    supporters: {
      sectionBadge: "रोशनी के साथी",
      heading: "जिन्होंने अपनी खुशियां साझा करने का निर्णय लिया",
      description:
        "हर छोटा-बड़ा सहयोग हमें 20 घरों को रोशन करने के करीब ले जाता है। यहां केवल उन्हीं साथियों का उल्लेख है जिन्होंने सार्वजनिक प्रदर्शन की स्पष्ट सहमति दी है।",
      anonymousName: "एक सहृदय मित्र (अनाम)",
      noSupportersYet: "पहला दिया जलाकर अन्य लोगों को प्रेरित करें।",
      verifiedContribution: "सत्यापित सहयोगी",
      sharedWord: "का संदेश:",
    },
    transparency: {
      sectionBadge: "वित्तीय शुचिता",
      heading: "आपका विश्वास, हमारी सच्ची जवाबदेही",
      description:
        "विश्वास शब्दों से नहीं, खुले हिसाब से बनता है। एकत्र हुई एक-एक पाई और खर्च किए गए प्रत्येक बिल का संपूर्ण विवरण यहां सार्वजनिक है।",
      statTarget: "कुल वित्तीय लक्ष्य",
      statVerifiedReceived: "सत्यापित प्राप्त राशि",
      statGatewayCharges: "गेटवे शुल्क (0%)",
      statPurchases: "सामग्री क्रय व्यय",
      statTransport: "परिवहन व वितरण व्यय",
      statRemaining: "उपलब्ध शेष राशि",
      statFamiliesVerified: "जमीन पर सत्यापित परिवार",
      statKitsPacked: "तैयार किट की संख्या",
      statFamiliesSupported: "लाभान्वित परिवार",
      tableHeading: "वास्तविक व्यय और बिलों का सार्वजनिक रजिस्टर",
      tableHeaders: {
        date: "दिनांक",
        expense: "सामग्री / सेवा का विवरण",
        category: "श्रेणी",
        amount: "राशि (₹)",
        invoiceRef: "बिल / वाउचर संदर्भ",
      },
      reportNotice: "अभियान समाप्त होते ही थोक विक्रेताओं के पक्के जीएसटी बिलों और वितरण की तस्वीरों सहित अंतिम विस्तृत ऑडिट रिपोर्ट यहाँ डाउनलोड के लिए उपलब्ध होगी।",
      downloadReportBtn: "अंतरिम ऑडिट रिपोर्ट देखें (PDF)",
      auditBadge: "बायोवाको वित्त विभाग द्वारा संपरीक्षित",
    },
    promise: {
      sectionBadge: "हमारा नैतिक संकल्प",
      heading: "प्रत्येक सहयोगी से हमारा पावन वचन",
      quoteHindi: "“हम आपसे सिर्फ कंट्रीब्यूशन नहीं मांग रहे। हम आपसे एक छोटी सी खुशी शेयर करने की रिक्वेस्ट कर रहे हैं। आपका ट्रस्ट हमारी रिस्पॉन्सिबिलिटी है। इसलिए हर कंट्रीब्यूशन का रिकॉर्ड रखा जाएगा, हर कैंपेन एक्सपेंस डॉक्यूमेंट किया जाएगा और फाइनल यूटिलाइजेशन रिपोर्ट पब्लिकली शेयर की जाएगी।”",
      quoteEnglish: "“हमारा मानना है कि परोपकार के साथ पारदर्शिता और जवाबदेही अनिवार्य होनी चाहिए।”",
      principles: [
        {
          title: "100% प्रत्यक्ष उपयोग",
          description: "कोई प्रशासनिक कटौती नहीं। एकत्र संपूर्ण राशि केवल परिवार किट, पैकिंग और वाहन व्यवस्था में ही लगाई जाती है।",
        },
        {
          title: "खुला बिल भंडार",
          description: "स्थानीय कुम्हारों और थोक व्यापारियों से ली गई सामग्री के प्रत्येक वाउचर को डिजिटल रूप से सार्वजनिक रखा जाता है।",
        },
        {
          title: "गरिमापूर्ण वितरण",
          description: "सामग्री का वितरण परिवारों के आत्मसम्मान को सर्वोपरि रखकर, बिना किसी अनुचित वीडियोग्राफी या प्रदर्शन के आत्मीयता से किया जाता है।",
        },
      ],
    },
    faq: {
      sectionBadge: "स्पष्टीकरण और जिज्ञासाएं",
      heading: "अक्सर पूछे जाने वाले प्रश्न एवं विधिक जानकारी",
      description:
        "अभियान के संचालन, राशि के उपयोग और आपके विधिक अधिकारों के संदर्भ में पारदर्शी उत्तर।",
      items: [
        {
          question: "'एक दिया और' का आयोजन कौन कर रहा है और राशि किसके पास जा रही है?",
          answer:
            "इस सामाजिक पहल का आयोजन बायोवाको नेक्सस प्राइवेट लिमिटेड (CIN: U46300ME2026PTC475352) द्वारा किया जा रहा है, जिसका पंजीकृत कार्यालय नागपुर, महाराष्ट्र में स्थित है। संपूर्ण राशि कंपनी के एक पृथक समर्पित बैंक खाते में रखी जाती है जो केवल इसी उद्देश्य के लिए सुरक्षित है।",
        },
        {
          question: "क्या इस सहयोग पर आयकर की धारा 80G के तहत कर छूट मिलती है?",
          answer:
            "नहीं। बायोवाको नेक्सस प्रा. लि. एक पंजीकृत प्राइवेट लिमिटेड कंपनी है, कोई धर्मार्थ ट्रस्ट (NGO) नहीं। अतः इस पहल में किया गया अंशदान आयकर अधिनियम की धारा 80G के अंतर्गत कर छूट हेतु मान्य नहीं है। हम किसी भी प्रकार का भ्रामक दावा नहीं करते।",
        },
        {
          question: "20 लाभार्थी परिवारों का चयन किस आधार पर किया गया है?",
          answer:
            "नागपुर के पारडी, वाडी और उपनगरीय बस्तियों में प्रत्यक्ष धरातलीय सर्वेक्षण द्वारा ऐसे परिवारों की पहचान की गई है, जिनमें दिहाड़ी मजदूर, एकल अभिभावक, बुजुर्ग अथवा आकस्मिक स्वास्थ्य संकट झेल रहे परिवार शामिल हैं, जिनके लिए दीपोत्सव का खर्च उठाना कठिन था।",
        },
        {
          question: "यदि लक्ष्य ₹45,000 से अधिक राशि एकत्र हो जाए तो क्या होगा?",
          answer:
            "लक्ष्य से अधिक प्राप्त प्रत्येक पाई का उपयोग हमारी प्रतीक्षा-सूची में शामिल 21वें, 22वें और अन्य जरूरतमंद परिवारों हेतु ₹2,000 की अतिरिक्त किट तैयार करने में होगा। कोई भी अतिरिक्त राशि कंपनी के लाभ में नहीं जाएगी।",
        },
        {
          question: "यदि लक्ष्य से कम राशि जुटती है तो क्या अभियान अधूरा रहेगा?",
          answer:
            "बिल्कुल नहीं। बायोवाको नेक्सस प्रा. लि. ने औपचारिक प्रतिबद्धता की है कि यदि जनता से प्राप्त सहयोग ₹45,000 से कम रहता है, तो शेष संपूर्ण राशि कंपनी अपने आंतरिक कोष से वहन करेगी ताकि सभी 20 परिवारों को उनकी पूरी किट मिले।",
        },
        {
          question: "मुझे कैसे पता चलेगा कि मेरे पैसे कहाँ खर्च हुए?",
          answer:
            "सहयोग दर्ज होते ही आपको ईमेल पावती प्राप्त होगी। अभियान पूर्ण होने के पश्चात एक विस्तृत ऑडिट रिपोर्ट, सामग्री खरीद के स्कैन किए गए बिल और वितरण विवरण प्रत्येक सहयोगी को ईमेल द्वारा भेजे जाएंगे।",
        },
        {
          question: "यदि तकनीकी त्रुटि से दोहरा भुगतान कट जाए तो रिफंड की क्या व्यवस्था है?",
          answer:
            "यदि किसी कारणवश दोहरा भुगतान कट जाता है, तो 48 घंटे के भीतर support@biovaco.in अथवा contact@biovaco.in पर सूचित करें। सत्यापन के उपरांत 5-7 कार्यदिवसों में अतिरिक्त राशि उसी बैंक खाते/माध्यम में लौटा दी जाएगी।",
        },
        {
          question: "दाता की व्यक्तिगत जानकारी और गोपनीयता की सुरक्षा कैसे की जाती है?",
          answer:
            "आपका फोन नंबर, ईमेल और वित्तीय विवरण उच्चस्तरीय एन्क्रिप्शन से सुरक्षित हैं। हम कभी भी किसी तीसरे पक्ष को डेटा नहीं बेचते। सार्वजनिक पटल पर नाम केवल आपकी स्पष्ट लिखित सहमति के बाद ही दिखाया जाता है।",
        },
      ],
    },
    footer: {
      disclaimerLegal:
        "“एक दिया और” बायोवाको नेक्सस प्रा. लि. द्वारा संचालित एक गैर-लाभकारी स्वैच्छिक सामुदायिक पहल है। सभी गतिविधियां भारतीय कानूनों के अनुरूप संचालित की जा रही हैं।",
      taxClarification:
        "वैधानिक प्रकटीकरण: बायोवाको नेक्सस प्रा. लि. एक प्राइवेट लिमिटेड कंपनी है। यह अंशदान धारा 80G के तहत कर-मुक्त नहीं है।",
      registeredInfo: "बायोवाको नेक्सस प्राइवेट लिमिटेड • CIN: U46300ME2026PTC475352 • पंजीकृत कार्यालय: नागपुर, महाराष्ट्र, भारत • contact@biovaco.in",
      rightsReserved: "© 2026 बायोवाको नेक्सस प्रा. लि. सर्वाधिकार सुरक्षित।",
    },
  },
  mr: {
    meta: {
      title: "एक दिया और | दिवाळी सेवा उपक्रम 2026 | बायोव्हाको नेक्सस",
      description:
        "या दिवाळीत नागपुरातील २० गरजू कुटुंबांच्या घरात आनंद आणि प्रकाश पोहोचवण्यासाठी बायोव्हाको नेक्ससच्या सामाजिक उपक्रमात सहभागी व्हा. १००% पारदर्शक समाजकार्य.",
      keywords:
        "एक दिया और, बायोव्हाको नेक्सस, दिवाळी मदत नागपूर, सामाजिक उपक्रम, दिवाळी किराणा किट, दीपोत्सव 2026",
    },
    nav: {
      backToHome: "biovaco.in",
      theCause: "आमचा उद्देश",
      goal: "ध्येय व प्रगती",
      budget: "खर्चाचा ताळेबंद",
      contribute: "सहभाग नोंदवा",
      supporters: "सहकारी",
      transparency: "पारदर्शकता",
      promise: "आमचे वचन",
      faq: "नेहमीचे प्रश्न",
      ctaButton: "मदत करा",
    },
    hero: {
      initiativeBadge: "बायोव्हाको नेक्सस प्रा. लि. चा दीपोत्सव सामाजिक उपक्रम • नागपूर, महाराष्ट्र",
      headline: "एक दिया और",
      tagline: "“दुसऱ्याच्या घरातही दिवाळीचा दिवा उजळू दे.”",
      body1: "आपण सर्वजण आपापल्या घरी दिवाळीचा सण नवीन कपडे, मिठाई आणि दिव्यांनी मोठ्या उत्साहात साजरा करतो.",
      body2: "परंतु आपल्याच अवतीभवती अशी काही कुटुंबे आहेत, ज्यांच्यासाठी सणाचा आनंद रोजच्या जगण्याच्या संघर्षात कुठेतरी हरवून जातो.",
      body3: "आपल्या मुलांनीही नवीन कपडे घालावेत, गोडधोड खावे आणि हसावे, अशी प्रत्येक आई-वडिलांची मनोमन इच्छा असते.",
      body4: "आम्हाला विश्वास आहे की सणाचा हा खराखुरा आनंद अनुभवण्याचा अधिकार प्रत्येक मुलाला आणि कुटुंबाला आहे.",
      body5: "या दिवाळीत, आपल्या आनंदाच्या प्रकाशात आणखी एका घराला सामावून घ्या. एक दिया और.",
      ctaPrimary: "या उत्सवात सहभागी व्हा",
      ctaSecondary: "आपले योगदान कुठे पोहोचणार ते पहा",
      campaignInfo: {
        locationLabel: "स्थान",
        locationValue: "नागपूर, महाराष्ट्र",
        familiesLabel: "लक्षित कुटुंबे",
        familiesValue: "२० कुटुंबे",
        targetLabel: "एकूण आर्थिक ध्येय",
        targetValue: "₹४५,०००",
        yearLabel: "उपक्रम वर्ष",
        yearValue: "दिवाळी २०२६",
      },
    },
    purpose: {
      sectionBadge: "उपक्रमाचा हेतू",
      heading: "सणाचा प्रकाश आणि आपुलकी वाटणे",
      description:
        "नागपुरातील आर्थिकदृष्ट्या दुर्बल अशा २० कुटुंबांपर्यंत संपूर्ण आदराने दिवाळी भेट पोहोचवणे हा आमचा हेतू आहे. ही कोणतीही दया नसून एका मोठ्या कुटुंबासारखा सणाचा आनंद वाटण्याचा हा प्रामाणिक प्रयत्न आहे.",
      dignityNotice:
        "प्रत्येक कुटुंबाच्या स्वाभिमानाचा आम्ही पूर्ण आदर करतो. कोणत्याही व्यक्तीच्या गरिबीचे अथवा लाचारीचे प्रदर्शन प्रसिद्धीसाठी केले जात नाही.",
      kitItems: [
        {
          title: "सणानिमित्त पौष्टिक किराणा किट",
          description: "गहू पीठ, तांदूळ, डाळी, गोडतेल, मसाले व साखर यांसह सणाचा स्वयंपाक आनंदाने करता येईल अशी सर्व सामग्री.",
          iconName: "Package",
        },
        {
          title: "मुलांसाठी व कुटुंबीयांसाठी नवीन वस्त्रे",
          description: "सणाच्या दिवशी मुलांच्या चेहऱ्यावर सच्चा आनंद फुलवणारे नवीन कपडे.",
          iconName: "Shirt",
        },
        {
          title: "पारंपारिक मिठाई व फराळ",
          description: "स्वच्छतेने तयार केलेले लाडू, चिवडा आणि गोडधोड, जेणेकरून ते आपल्या दारात येणाऱ्यांचे आदरातिथ्य करू शकतील.",
          iconName: "Sparkles",
        },
        {
          title: "मातीचे पारंपरिक दिवे व रांगोळी",
          description: "स्थानिक कुंभारांनी घडवलेले मातीचे सुबक दिवे, तेल, वाती आणि अंगणात काढण्यासाठी नैसर्गिक रंगीबेरंगी रांगोळी.",
          iconName: "Flame",
        },
        {
          title: "लहान मुलांसाठी खेळणी व भेटवस्तू",
          description: "अभ्यास व खेळाची साधने, ज्यामुळे छोट्या मुलांची दिवाळी कायम स्मरणात राहील.",
          iconName: "Smile",
        },
      ],
    },
    goalSection: {
      sectionBadge: "ध्येय व खरी प्रगती",
      heading: "वास्तववादी आणि विश्वासार्ह नियोजन",
      description:
        "आम्ही आमचे ध्येय नेमके आणि जमिनीवर पूर्ण होणारे ठेवले आहे—नागपुरातील प्रत्यक्ष पडताळणी केलेली २० कुटुंबे आणि एकूण ₹४५,००० चा निधी.",
      raisedLabel: "प्राप्त व सत्यापित योगदान",
      goalLabel: "एकूण मोहीम ध्येय",
      familiesSupportedLabel: "पूर्ण निधी मिळालेली कुटुंबे",
      familiesTargetLabel: "एकूण लक्षित कुटुंबे",
      nagpurLocation: "नागपूर, महाराष्ट्र (पारडी व वाडी परिसर)",
      verifiedNote: "आमचा प्रगती दर्शक केवळ बँकेत प्रत्यक्ष जमा झालेल्या आणि पडताळणी केलेल्या रकमेवर आधारित आहे. कोणताही खोटा आकडा नाही.",
      verifiedBadge: "सत्यापित ताळेबंद सक्रिय",
    },
    budget: {
      sectionBadge: "खर्चाचा पारदर्शक हिशोब",
      heading: "तुमच्या प्रत्येक रुपयाचा ताळेबंद",
      description:
        "खरे औदार्य हे कामाच्या आधीच खर्चाचा संपूर्ण हिशोब समोर मांडण्यात असते. २० कुटुंबांच्या किटचे अंदाजित बजेट खालीलप्रमाणे आहे:",
      disclaimer:
        "नोंद: हा खर्च घाऊक बाजारातील दरांवर आधारित आहे. जर खरेदीत काही बचत झाली, तर ती रक्कम आणखी गरजू कुटुंबांना जोडण्यासाठी वापरली जाईल. सर्व पक्की बिले पारदर्शकता विभागात दिली जातील.",
      items: [
        {
          title: "२० कुटुंबे उत्सव किट",
          amount: "₹४०,०००",
          percent: "८८.९%",
          detail: "₹२,००० प्रति कुटुंब: किराणा सामग्री (₹९००), नवीन कपडे व खेळणी (₹७००), मिठाई व फराळ (₹२५०), दिवे व रांगोळी (₹१५०).",
        },
        {
          title: "पॅकिंग, वाहतूक व प्रत्यक्ष वितरण",
          amount: "₹३,०००",
          percent: "६.७%",
          detail: "सुरक्षित पॅकिंग बॉक्स, नागपुरातील विविध वस्त्यांपर्यंत पोहोचण्यासाठी वाहन भाडे आणि स्वयंसेवक व्यवस्था.",
        },
        {
          title: "किंमत चढ-उतार व आकस्मिक निधी",
          amount: "₹२,०००",
          percent: "४.४%",
          detail: "बाजारातील किराणा दरातील अचानक चढ-उतार किंवा एखाद्या कुटुंबाच्या तातडीच्या गरजेसाठी राखीव ठेवलेली रक्कम.",
        },
      ],
      totalLabel: "एकूण आवश्यक निधी",
      totalAmount: "₹४५,०००",
    },
    form: {
      sectionBadge: "सहभाग नोंदवा",
      heading: "या दिवाळीत कोणाच्या तरी चेहऱ्यावरचे हसू बना",
      description:
        "बदल घडवण्यासाठी नेहमी खूप मोठी गोष्ट करण्याची गरज नसते. कधीकधी आपले एक छोटेसे योगदानही दुसऱ्याच्या आयुष्यात प्रकाशाची नवी पहाट आणू शकते.",
      gatewayNoticeTitle: "पेमेंट गेटवेची सद्यस्थिती",
      gatewayNoticePending:
        "बायोव्हाको नेक्सस प्रा. लि. साठी रेझरपे (Razorpay) सह अधिकृत व्यापारी पडताळणीचे काम सुरू आहे. पूर्ण पारदर्शकता बाळगत, नियामकीय प्रक्रिया पूर्ण होईपर्यंत थेट ऑनलाइन पैसे कपात तात्पुरती थांबवली आहे.",
      gatewayNoticePledgeMode:
        "आपण कोणतेही तात्काळ पैसे न भरता आपला सहभागाचा संकल्प (Pledge) खाली नोंदवू शकता. गेटवे सुरू होताच आमची टीम आपणास अधिकृत पेमेंट लिंक व पोचपावती पाठवेल.",
      amountStepLabel: "१. योगदानाची रक्कम निवडा किंवा लिहा",
      presetAmounts: [500, 1000, 1500, 2000],
      customAmountLabel: "किंवा स्वतःची रक्कम लिहा (₹)",
      customAmountPlaceholder: "उदा. २५००",
      detailsStepLabel: "२. आपली वैयक्तिक माहिती (सुरक्षित व गोपनीय)",
      fullNameLabel: "पूर्ण नाव *",
      fullNamePlaceholder: "उदा. आनंद कुलकर्णी",
      fullNameHelper: "अंतर्गत हिशोब व अधिकृत पावतीसाठी आवश्यक.",
      emailLabel: "ईमेल पत्ता *",
      emailPlaceholder: "उदा. anand@example.com",
      emailHelper: "योगदानाची पावती आणि अंतिम ऑडिट अहवाल पाठवण्यासाठी.",
      whatsappLabel: "व्हॉट्सॲप नंबर (ऐच्छिक)",
      whatsappPlaceholder: "उदा. +91 98765 43210",
      whatsappHelper: "नागपुरातील वाटपाची छायाचित्रे व माहिती थेट मिळवण्यासाठी.",
      ageRangeLabel: "वय गट (ऐच्छिक)",
      ageRangePlaceholder: "वय गट निवडा",
      ageRanges: ["२१ पेक्षा कमी", "२१ - ३०", "३१ - ४५", "४६ - ६०", "६०+"],
      cityLabel: "शहर / गाव (ऐच्छिक)",
      cityPlaceholder: "उदा. नागपूर, पुणे, अमरावती",
      inspirationLabel: "या उपक्रमात सहभागी होण्याची प्रेरणा कुठून मिळाली? (ऐच्छिक)",
      inspirationPlaceholder: "आपले विचार किंवा दिवाळीच्या शुभेच्छा लिहा...",
      privacyOptionsHeading: "३. गोपनीयता आणि नाव प्रसिद्धीचे पर्याय",
      anonymousLabel: "माझे योगदान गुप्त (Anonymous) ठेवा",
      anonymousDesc: "आपले नाव सार्वजनिक फलकावर कधीही दाखवले जाणार नाही.",
      publicWallLabel: "सहकारी फलकावर (Supporter Wall) माझे नाव आणि संदेश दाखवा",
      publicWallDesc: "इतरांना प्रेरणा देण्यासाठी आपले नाव आदरपूर्वक प्रदर्शित केले जाईल.",
      displayAmountLabel: "सहकारी फलकावर माझी योगदानाची रक्कम दाखवा",
      displayAmountDesc: "जर रक्कम न दाखवता फक्त नाव दाखवायचे असेल तर ही खूण काढून टाका.",
      consentHeading: "४. संमती आणि कायदेशीर अटी",
      termsConsentLabel: "मी नियम, अटी आणि गोपनीयता धोरण वाचले आहे. मी मान्य करतो की बायोव्हाको नेक्सस प्रा. लि. ही एक खाजगी कंपनी असून हे योगदान 80G कर सवलतीस पात्र नाही.",
      emailConsentLabel: "मी या उपक्रमाची प्रगती आणि ऑडिट अहवाल ईमेलवर मिळण्यास संमती देतो.",
      whatsappConsentLabel: "मी व्हॉट्सॲपवर माहिती मिळण्यास संमती देतो (ऐच्छिक).",
      submitPledgeButton: "योगदानाचा संकल्प नोंदवा (₹",
      submitPayButton: "योगदान देण्यासाठी पुढे जा (₹",
      processingButton: "नोंदणी होत आहे...",
      successTitle: "आनंद वाटल्याबद्दल मनःपूर्वक धन्यवाद!",
      successMessage: "आपला सहभागाचा संकल्प यशस्वीरीत्या नोंदवला गेला आहे. लवकरच आपल्या ईमेलवर अधिकृत माहिती पाठवली जाईल. नागपुरातील एका कुटुंबाची दिवाळी उजळवण्यात हातभार लावल्याबद्दल धन्यवाद.",
      successReference: "अभियान संदर्भ क्र.",
      successCloseButton: "मुख्य पृष्ठावर परत जा",
      validationErrors: {
        amountMin: "कृपया किमान ₹१०० ची रक्कम प्रविष्ट करा.",
        nameRequired: "हिशोबासाठी पूर्ण नाव आवश्यक आहे.",
        emailInvalid: "कृपया योग्य ईमेल पत्ता प्रविष्ट करा.",
        termsRequired: "पुढे जाण्यासाठी अटी मान्य करणे आवश्यक आहे.",
      },
    },
    supporters: {
      sectionBadge: "प्रकाशाचे सोबती",
      heading: "ज्यांनी आपला आनंद दुसऱ्यांशी वाटून घेतला",
      description:
        "प्रत्येक लहान-मोठे सहकार्य आपल्याला २० कुटुंबांपर्यंत पोहोचण्यास मदत करते. येथे फक्त अशाच सहकाऱ्यांची नावे आहेत ज्यांनी जाहीर संमती दिली आहे.",
      anonymousName: "एक प्रेमळ स्नेही (अनामिक)",
      noSupportersYet: "पहिला दिवा लावून इतरांनाही प्रेरित करा.",
      verifiedContribution: "सत्यापित सहकारी",
      sharedWord: "यांचा संदेश:",
    },
    transparency: {
      sectionBadge: "पारदर्शक कारभार",
      heading: "तुमचा विश्वास, आमची प्रामाणिक जबाबदारी",
      description:
        "विश्वास हा शब्दांनी नाही तर उघड्या ताळेबंदाने सिद्ध होतो. मिळालेला प्रत्येक रुपया आणि खर्च केलेले प्रत्येक बिल येथे सर्वांसाठी खुले आहे.",
      statTarget: "एकूण आर्थिक ध्येय",
      statVerifiedReceived: "प्रत्यक्ष प्राप्त रक्कम",
      statGatewayCharges: "गेटवे शुल्क (०%)",
      statPurchases: "साहित्य खरेदी खर्च",
      statTransport: "वाहतूक व वाटप खर्च",
      statRemaining: "शिल्लक उपलब्ध निधी",
      statFamiliesVerified: "प्रत्यक्ष पडताळणी झालेली कुटुंबे",
      statKitsPacked: "तयार झालेल्या किट",
      statFamiliesSupported: "मदत मिळालेली कुटुंबे",
      tableHeading: "खरेदी व खर्चाचे प्रत्यक्ष रजिस्टर",
      tableHeaders: {
        date: "तारीख",
        expense: "साहित्य / सेवेचा तपशील",
        category: "श्रेणी",
        amount: "रक्कम (₹)",
        invoiceRef: "बिल / पावती क्रमांक",
      },
      reportNotice: "उपक्रम पूर्ण होताच घाऊक व्यापाऱ्यांची जीएसटी बिले आणि वाटपाच्या छायाचित्रांसह संपूर्ण लेखापरीक्षण (Audit Report) येथे प्रसिद्ध केले जाईल.",
      downloadReportBtn: "तात्पुरता ताळेबंद पहा (PDF)",
      auditBadge: "बायोव्हाको वित्त विभागाकडून प्रमाणित",
    },
    promise: {
      sectionBadge: "आमची नैतिक बांधिलकी",
      heading: "प्रत्येक सहकाऱ्याला आमचे वचन",
      quoteHindi: "“हम आपसे सिर्फ कंट्रीब्यूशन नहीं मांग रहे। हम आपसे एक छोटी सी खुशी शेयर करने की रिक्वेस्ट कर रहे हैं। आपका ट्रस्ट हमारी रिस्पॉन्सिबिलिटी है। इसलिए हर कंट्रीब्यूशन का रिकॉर्ड रखा जाएगा, हर कैंपेन एक्सपेंस डॉक्यूमेंट किया जाएगा और फाइनल यूटिलाइजेशन रिपोर्ट पब्लिकली शेयर की जाएगी।”",
      quoteEnglish: "“परोपकारासोबत पारदर्शकता आणि जबाबदारी असणे हेच आमचे कर्तव्य आहे.”",
      principles: [
        {
          title: "१००% थेट वापर",
          description: "कोणताही प्रशासकीय खर्च वजा केला जात नाही. गोळा झालेला संपूर्ण निधी केवळ किट, पॅकिंग आणि वितरणासाठीच वापरला जातो.",
        },
        {
          title: "खुले बिल भांडार",
          description: "स्थानिक कुंभार आणि घाऊक व्यापाऱ्यांकडून घेतलेल्या प्रत्येक खरेदीचे बिल डिजिटल स्वरूपात सर्वांसाठी खुले ठेवले जाते.",
        },
        {
          title: "सन्मानपूर्वक वाटप",
          description: "कुटुंबांच्या स्वाभिमानाची पूर्ण जपणूक करून, कोणत्याही प्रकारची गैर वीडियोग्राफी न करता आदराने साहित्य पोहोचवले जाते.",
        },
      ],
    },
    faq: {
      sectionBadge: "नेहमीचे प्रश्न व कायदेशीर बाबी",
      heading: "वारंवार विचारले जाणारे प्रश्न आणि माहिती",
      description:
        "उपक्रमाचे कामकाज, पैशांचा वापर आणि आपल्या कायदेशीर हक्कांबद्दल संपूर्ण स्पष्टता.",
      items: [
        {
          question: "'एक दिया और' उपक्रम कोण चालवत आहे आणि निधी कोणाकडे जातो?",
          answer:
            "हा सामाजिक उपक्रम बायोव्हाको नेक्सस प्रायव्हेट लिमिटेड (CIN: U46300ME2026PTC475352) या नागपूरस्थित नोंदणीकृत कंपनीद्वारे चालवला जात आहे. सर्व रक्कम एका वेगळ्या समर्पित बँक खात्यात जमा होते, जी केवळ याच कार्यासाठी वापरली जाते.",
        },
        {
          question: "या योगदानावर 80G अंतर्गत आयकर सवलत मिळते का?",
          answer:
            "नाही. बायोव्हाको नेक्सस प्रा. लि. ही एक प्रायव्हेट लिमिटेड कंपनी आहे, कोणतीही एनजीओ किंवा ट्रस्ट नाही. त्यामुळे या योगदानावर आयकर कायदा कलम 80G अन्वये कोणतीही कर सवलत मिळत नाही. आम्ही याबाबत कोणतीही खोटी माहिती देत नाही.",
        },
        {
          question: "२० लाभार्थी कुटुंबांची निवड कशी केली गेली आहे?",
          answer:
            "नागपुरातील पारडी, वाडी व उपनगरीय परिसरामध्ये प्रत्यक्ष पाहणी करून रोजंदारी मजूर, एकल पालक, वृद्ध अथवा गंभीर आजारपण सोसणाऱ्या अशा कुटुंबांची निवड करण्यात आली आहे ज्यांना सणाचा खर्च करणे शक्य नव्हते.",
        },
        {
          question: "जर ₹४५,००० पेक्षा जास्त रक्कम जमा झाली तर काय होईल?",
          answer:
            "ध्येयापेक्षा जास्त जमा झालेला प्रत्येक रुपया आमच्या प्रतीक्षा यादीतील २१ व्या, २२ व्या आणि पुढील गरजू कुटुंबांसाठी अतिरिक्त ₹२,००० किट तयार करण्यासाठी वापरला जाईल. कोणताही नफा कंपनीकडे ठेवला जाणार नाही.",
        },
        {
          question: "जर ₹४५,००० चे ध्येय पूर्ण झाले नाही तर काय होईल?",
          answer:
            "बायोव्हाको नेक्सस प्रा. लि. ने स्पष्ट हमी दिली आहे की जनतेकडून कमी निधी जमा झाल्यास उर्वरित संपूर्ण रक्कम कंपनी स्वतःच्या निधीतून भरेल, जेणेकरून सर्व २० कुटुंबांना ठरलेली मदत पूर्णपणे मिळेल.",
        },
        {
          question: "माझे पैसे कुठे वापरले गेले हे मला कसे समजेल?",
          answer:
            "सहभाग नोंदवल्यावर आपणास ईमेलवर पोचपावती मिळेल. उपक्रम संपल्यानंतर सर्व खरेदी बिले आणि छायाचित्रांसह संपूर्ण ताळेबंद अहवाल प्रत्येक सहकाऱ्याला ईमेलने पाठवला जाईल.",
        },
        {
          question: "तांत्रिक त्रुटीमुळे दुप्पट पैसे कापले गेल्यास रिफंड कसा मिळेल?",
          answer:
            "अनावधानाने दुप्पट कपात झाल्यास ४८ तासांच्या आत support@biovaco.in किंवा contact@biovaco.in वर संपर्क साधावा. तपासणीनंतर ५ ते ७ कामाच्या दिवसांत रक्कम मूळ खात्यात जमा केली जाईल.",
        },
        {
          question: "दात्याच्या माहितीची व गोपनीयतेची काळजी कशी घेतली जाते?",
          answer:
            "आपला ईमेल, फोन नंबर आणि आर्थिक माहिती पूर्णपणे सुरक्षित ठेवली जाते. ती कोणालाही विकली जात नाही. सार्वजनिक फलकावर नाव केवळ आपल्या स्पष्ट संमतीनंतरच दाखवले जाते.",
        },
      ],
    },
    footer: {
      disclaimerLegal:
        "“एक दिया और” हा बायोव्हाको नेक्सस प्रा. लि. चा एक ऐच्छिक सामाजिक उपक्रम आहे. सर्व कामे भारतीय कायद्यानुसार पारदर्शकतेने केली जातात.",
      taxClarification:
        "कायदेशीर माहिती: बायोव्हाको नेक्सस प्रा. लि. ही खाजगी कंपनी आहे. हे योगदान कलम 80G अंतर्गत करमुक्त नाही.",
      registeredInfo: "बायोव्हाको नेक्सस प्रायव्हेट लिमिटेड • CIN: U46300ME2026PTC475352 • नोंदणीकृत कार्यालय: नागपूर, महाराष्ट्र, भारत • contact@biovaco.in",
      rightsReserved: "© २०२६ बायोव्हाको नेक्सस प्रा. लि. सर्व हक्क राखीव.",
    },
  },
};
