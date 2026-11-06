import React, { useState, useEffect } from "react";
import {
  Heart,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
  FileCheck,
  Calendar,
} from "lucide-react";
import { CampaignCountdown, isPaymentPhaseClosed } from "./CampaignCountdown";
import { ContributionFormData, Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";
import { getGatewayStatus, submitContribution } from "@/lib/ek-diya-aur/api";

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature?: string;
}

interface RazorpayFailureResponse {
  error: {
    description: string;
    code?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (resp: RazorpayFailureResponse) => void) => void;
}

interface WindowWithRazorpay extends Window {
  Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
}

interface ContributionSectionProps {
  currentLang: Language;
  formData: ContributionFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContributionFormData>>;
  onContributionSuccess: (receiptData: {
    id: string;
    amount: number;
    name: string;
    date: string;
    paymentId?: string;
  }) => void;
}

export function ContributionSection({
  currentLang,
  formData,
  setFormData,
  onContributionSuccess,
}: ContributionSectionProps) {
  const t = translations[currentLang];
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gatewayStatus, setGatewayStatus] = useState<{
    isLive: boolean;
    keyId?: string;
    reason?: string;
  }>({
    isLive: true,
    keyId: "rzp_live_SOMSQfIR2NBT6k",
    reason: "Live Razorpay Gateway Active",
  });

  useEffect(() => {
    getGatewayStatus().then((status) => {
      setGatewayStatus(status);
    });
  }, []);

  const presetAmounts = [
    { value: 21, label: "₹21", tag: "Ek Diya", hint: t.form.impactHint21 },
    { value: 51, label: "₹51", tag: "Shagun", hint: t.form.impactHint51 },
    { value: 101, label: "₹101", tag: "Child Kit", hint: t.form.impactHint101 },
    { value: 500, label: "₹500", tag: "Ration Pack", hint: t.form.impactHint500 },
    { value: 1000, label: "₹1,000", tag: "Half Kit", hint: t.form.impactHint1000 },
    { value: 2000, label: "₹2,000", tag: "Full Kit", hint: t.form.impactHint2000 },
  ];

  const handleAmountSelect = (val: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: val,
      customAmount: "",
    }));
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      amount: "custom",
      customAmount: raw,
    }));
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const getEffectiveAmount = (): number => {
    if (formData.amount === "custom") {
      return Number(formData.customAmount) || 0;
    }
    return Number(formData.amount) || 0;
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    const cleanName = formData.fullName.trim();
    if (!cleanName || cleanName.length < 2) {
      errs.fullName = t.form.errors.fullNameRequired;
    } else if (cleanName.length > 60) {
      errs.fullName = "Name cannot exceed 60 characters.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const cleanEmail = formData.email.trim();
    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 80) {
      errs.email = t.form.errors.emailInvalid;
    }

    const effectiveAmount = getEffectiveAmount();
    if (effectiveAmount < 5 || effectiveAmount > 100000) {
      errs.amount = t.form.errors.amountInvalid;
    }

    if (!formData.consentTerms) {
      errs.consentTerms = t.form.errors.termsRequired;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPaymentPhaseClosed()) {
      alert(
        currentLang === "hi"
          ? "सहयोग अवधि 13 नवंबर दोपहर 12:00 बजे समाप्त हो चुकी है। अब कोई नया भुगतान स्वीकार नहीं किया जा सकता।"
          : currentLang === "mr"
            ? "सहकार्य मुदत 13 नोव्हेंबर दुपारी 12:00 वाजता संपली आहे. आता कोणतेही देयक स्वीकारले जाऊ शकत नाही."
            : "The contribution phase officially concluded on 13 November 2026 at 12:00 PM IST. No further payments can be accepted.",
      );
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    const baseAmount = getEffectiveAmount();
    // 2% transparent payment gateway coverage
    const feeAmount = Math.round(baseAmount * 0.02 * 100) / 100;
    const totalPayable = Math.round((baseAmount + feeAmount) * 100) / 100;
    const totalPaise = Math.round(totalPayable * 100);
    const liveKeyId = gatewayStatus.keyId || "rzp_live_SOMSQfIR2NBT6k";

    // STRICT PAYMENT WORKFLOW: Live Razorpay is mandatory.
    // Under NO circumstance is an unverified or unpaid record saved to the database.
    try {
      const win = window as WindowWithRazorpay;
      if (!win.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(
              new Error("Unable to reach Razorpay secure servers. Please check your internet."),
            );
          document.body.appendChild(script);
        });
      }

      // Try server-side order generation if endpoint is live
      let orderId: string | undefined = undefined;
      try {
        const orderRes = await fetch("/api/ek-diya-aur/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalPayable,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            donorEmail: formData.email,
            donorName: formData.fullName,
          }),
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          if (orderData.orderId && typeof orderData.orderId === "string") {
            orderId = orderData.orderId;
          }
        }
      } catch {
        // Direct checkout mode with live key
      }

      const options = {
        key: liveKeyId,
        amount: totalPaise, // Total amount in paise including 2% gateway coverage
        currency: "INR",
        name: "BiovaCo Nexus Pvt. Ltd.",
        description: "Ek Diya Aur – Diwali 2026 Initiative",
        order_id: orderId,
        image: "https://biovaco.in/Logo.png",
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.whatsapp || "",
        },
        theme: {
          color: "#032E63",
        },
        handler: async (response: RazorpaySuccessResponse) => {
          // STRICT SECURITY: Only executed when Razorpay confirms captured payment!
          if (!response || !response.razorpay_payment_id) {
            setSubmitting(false);
            alert(
              "Payment could not be confirmed by the payment gateway. No contribution recorded.",
            );
            return;
          }

          const result = await submitContribution(
            {
              ...formData,
              amount: baseAmount,
              customAmount: String(baseAmount),
            },
            {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            },
          );

          setSubmitting(false);
          if (result.success) {
            onContributionSuccess({
              id: result.id,
              amount: baseAmount,
              name: formData.fullName,
              date: new Date().toLocaleString(),
              paymentId: response.razorpay_payment_id,
            });
          } else {
            alert(
              `Payment was processed via Razorpay (${response.razorpay_payment_id}), but database recording returned: ${result.error}. Please contact support with this reference.`,
            );
          }
        },
        modal: {
          ondismiss: () => {
            // User closed the modal without completing payment - DO NOT SAVE TO DB
            setSubmitting(false);
          },
        },
      };

      if (win.Razorpay) {
        const rzp = new win.Razorpay(options);
        rzp.on("payment.failed", (resp: RazorpayFailureResponse) => {
          alert(
            `Payment Incomplete: ${resp.error.description || "Transaction was declined."} No record was saved.`,
          );
          setSubmitting(false);
        });
        rzp.open();
        return;
      } else {
        throw new Error("Razorpay SDK initialization failed");
      }
    } catch (err) {
      console.error("Razorpay initiation error:", err);
      alert(
        "Payment gateway could not be loaded. Please verify your connection. No funds were debited.",
      );
      setSubmitting(false);
    }
  };

  return (
    <section id="contribute" className="border-t border-border bg-[color:var(--surface)]">
      <div className="container-x py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.form.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
              {t.form.heading}
            </h2>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {t.form.subheading}
            </p>
          </div>

          {/* Gateway Status Badge & Campaign Active Window */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.form.gatewayLiveBadge} · UPI, Cards & NetBanking</span>
            </div>
            <CampaignCountdown currentLang={currentLang} variant="compact" />
          </div>

          {/* Main Contribution Card or Concluded Notice */}
          {isPaymentPhaseClosed() ? (
            <div className="mt-10 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-background p-8 sm:p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground">
                {currentLang === "hi"
                  ? "सहयोग अवधि 13 नवंबर दोपहर 12:00 बजे समाप्त हो चुकी है"
                  : currentLang === "mr"
                    ? "सहकार्य मुदत 13 नोव्हेंबर दुपारी 12:00 वाजता संपली आहे"
                    : "Contribution Window Closed on 13 November 12:00 PM IST"}
              </h3>
              <p className="mt-3 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
                {currentLang === "hi"
                  ? "अभियान कार्यक्रम के अनुसार, 13 नवंबर दोपहर 12:00 बजे के बाद सभी भुगतान प्रक्रियाएं पूर्णतः बंद कर दी गई हैं। अब कोई भी नया भुगतान नहीं किया जा सकता। एकत्र की गई संपूर्ण राशि 20 जरूरतमंद परिवारों के उत्सव किट के लिए समर्पित कर दी गई है। सभी सहयोगियों का हृदय से धन्यवाद!"
                  : currentLang === "mr"
                    ? "मोहीम नियमानुसार, 13 नोव्हेंबर दुपारी 12:00 नंतर सर्व देयक प्रक्रिया पूर्णपणे बंद करण्यात आल्या आहेत. आता कोणतेही नवीन सहकार्य स्वीकारले जात नाही. जमा झालेला सर्व निधी 20 कुटुंबांच्या दिवाळी संचासाठी वापरण्यात येत आहे. सर्व सहकाऱ्यांचे मनःपूर्वक आभार!"
                    : "As scheduled, the contribution window officially closed on 13 November at 12:00 PM IST. Payment processing is completely locked and no further transactions can be accepted. 100% of collected funds are being distributed to the 20 beneficiary homes. Thank you for your support!"}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#transparency"
                  className="rounded-full bg-[color:var(--navy)] px-6 py-2.5 text-xs font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                >
                  View Transparency Ledger
                </a>
                <a
                  href="#supporters"
                  className="rounded-full border border-border px-6 py-2.5 text-xs font-medium text-foreground hover:bg-[color:var(--section)]"
                >
                  View Supporter Wall
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-border bg-background p-6 sm:p-10 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-8">
              {/* Step 1: Contribution Amount */}
              <div>
                {/* Welcoming Micro-Giving Encouragement Banner */}
                <div className="mb-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 border border-amber-500/30 p-3.5 sm:p-4 flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                  <p className="text-xs sm:text-[13px] font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
                    {t.form.microGivingCallout}
                  </p>
                </div>

                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-foreground mb-3">
                  {t.form.selectAmount} *
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                  {presetAmounts.map((p) => {
                    const isSelected = formData.amount === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => handleAmountSelect(p.value)}
                        className={`cursor-pointer rounded-2xl border p-3 sm:p-3.5 text-center transition-all ${
                          isSelected
                            ? "border-[color:var(--navy)] bg-[color:var(--section)] ring-1 ring-[color:var(--navy)] dark:border-[color:var(--green)] dark:ring-[color:var(--green)] shadow-xs"
                            : "border-border bg-[color:var(--surface)] hover:border-foreground/30 hover:bg-[color:var(--section)]"
                        }`}
                      >
                        <span className="block font-display text-lg sm:text-xl font-bold text-foreground">
                          {p.label}
                        </span>
                        <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 font-medium">
                          {p.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount input */}
                <div className="mt-3">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-display font-medium text-lg text-muted-foreground">
                      ₹
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder={t.form.customAmountPlaceholder}
                      value={formData.customAmount}
                      onChange={handleCustomAmountChange}
                      className={`w-full rounded-2xl border bg-[color:var(--surface)] py-3 pl-9 pr-4 text-sm font-medium transition-all focus:outline-none focus:ring-1 ${
                        formData.amount === "custom"
                          ? "border-[color:var(--navy)] ring-1 ring-[color:var(--navy)] bg-background dark:border-[color:var(--green)] dark:ring-[color:var(--green)]"
                          : "border-border focus:border-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                      }`}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{t.form.minAmountHint}</p>
                  {errors.amount && (
                    <p className="mt-1 text-xs font-medium text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.amount}
                    </p>
                  )}
                </div>

                {/* Impact Indicator */}
                <div className="mt-4 rounded-2xl bg-[color:var(--surface)] border border-border p-3.5 flex items-start gap-2.5 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>
                    {formData.amount === 21 && t.form.impactHint21}
                    {formData.amount === 51 && t.form.impactHint51}
                    {formData.amount === 101 && t.form.impactHint101}
                    {formData.amount === 500 && t.form.impactHint500}
                    {formData.amount === 1000 && t.form.impactHint1000}
                    {formData.amount === 1500 && t.form.impactHint1500}
                    {formData.amount === 2000 && t.form.impactHint2000}
                    {formData.amount === "custom" && t.form.impactHintCustom}
                  </span>
                </div>
              </div>

              {/* Step 2: Details */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-foreground">
                    {t.form.personalDetailsTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      {t.form.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      placeholder={t.form.fullNamePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, fullName: e.target.value }));
                        setErrors((p) => ({ ...p, fullName: "" }));
                      }}
                      className={`w-full rounded-xl border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${
                        errors.fullName
                          ? "border-destructive ring-1 ring-destructive"
                          : "border-border focus:border-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      {t.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={80}
                      placeholder={t.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((p) => ({ ...p, email: e.target.value }));
                        setErrors((p) => ({ ...p, email: "" }));
                      }}
                      className={`w-full rounded-xl border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${
                        errors.email
                          ? "border-destructive ring-1 ring-destructive"
                          : "border-border focus:border-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      {t.form.whatsappLabel}
                    </label>
                    <input
                      type="tel"
                      maxLength={15}
                      placeholder={t.form.whatsappPlaceholder}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData((p) => ({ ...p, whatsapp: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm focus:border-[color:var(--navy)] focus:outline-none focus:ring-1 focus:ring-[color:var(--navy)]"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      {t.form.cityLabel}
                    </label>
                    <input
                      type="text"
                      maxLength={50}
                      placeholder={t.form.cityPlaceholder}
                      value={formData.city}
                      onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm focus:border-[color:var(--navy)] focus:outline-none focus:ring-1 focus:ring-[color:var(--navy)]"
                    />
                  </div>

                  {/* Age Range */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      {t.form.ageRangeLabel}
                    </label>
                    <select
                      value={formData.ageRange}
                      onChange={(e) => setFormData((p) => ({ ...p, ageRange: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm focus:border-[color:var(--navy)] focus:outline-none focus:ring-1 focus:ring-[color:var(--navy)]"
                    >
                      <option value="">{t.form.ageRangeSelect}</option>
                      <option value="18-24">18 – 24 years</option>
                      <option value="25-34">25 – 34 years</option>
                      <option value="35-49">35 – 49 years</option>
                      <option value="50+">50+ years</option>
                    </select>
                  </div>

                  {/* Reason / Inspiration */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      {t.form.reasonLabel}
                    </label>
                    <textarea
                      rows={2}
                      maxLength={300}
                      placeholder={t.form.reasonPlaceholder}
                      value={formData.reason}
                      onChange={(e) => setFormData((p) => ({ ...p, reason: e.target.value }))}
                      className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm focus:border-[color:var(--navy)] focus:outline-none focus:ring-1 focus:ring-[color:var(--navy)]"
                    />
                  </div>
                </div>

                {/* Anonymous Checkbox */}
                <div className="mt-4 pt-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          isAnonymous: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded-md border-border text-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                    />
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      {t.form.anonymousCheckbox}
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 3: Consents */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-foreground mb-3">
                  {t.form.consentsTitle}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consentTerms}
                      onChange={(e) => {
                        setFormData((p) => ({
                          ...p,
                          consentTerms: e.target.checked,
                        }));
                        setErrors((p) => ({ ...p, consentTerms: "" }));
                      }}
                      className="mt-0.5 h-4 w-4 rounded-md border-border text-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                    />
                    <span className="text-foreground">{t.form.consentTerms}</span>
                  </label>
                  {errors.consentTerms && (
                    <p className="text-xs text-destructive pl-7">{errors.consentTerms}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentEmailUpdates}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          consentEmailUpdates: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 rounded-md border-border text-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                    />
                    <span className="text-muted-foreground">{t.form.consentEmail}</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentWhatsappUpdates}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          consentWhatsappUpdates: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 rounded-md border-border text-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                    />
                    <span className="text-muted-foreground">{t.form.consentWhatsapp}</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentPublicDisplay}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          consentPublicDisplay: e.target.checked,
                        }))
                      }
                      className="mt-0.5 h-4 w-4 rounded-md border-border text-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                    />
                    <span className="text-muted-foreground">{t.form.consentPublicName}</span>
                  </label>

                  {formData.consentPublicDisplay && (
                    <label className="flex items-start gap-3 cursor-pointer pl-6">
                      <input
                        type="checkbox"
                        checked={formData.consentPublicAmount}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            consentPublicAmount: e.target.checked,
                          }))
                        }
                        className="mt-0.5 h-4 w-4 rounded-md border-border text-[color:var(--navy)] focus:ring-[color:var(--navy)]"
                      />
                      <span className="text-muted-foreground">{t.form.consentPublicAmount}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Transparent 2% Gateway Commission Coverage Breakdown */}
              <div className="rounded-2xl border border-border bg-[color:var(--surface)] p-4 text-xs space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Direct Contribution to Family Kits:</span>
                  <span className="font-semibold text-foreground">
                    ₹{getEffectiveAmount().toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Payment Gateway Processing (2%):</span>
                  <span className="font-mono text-muted-foreground">
                    ₹
                    {(Math.round(getEffectiveAmount() * 0.02 * 100) / 100).toFixed(
                      (Math.round(getEffectiveAmount() * 0.02 * 100) / 100) % 1 === 0 ? 0 : 2,
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-foreground pt-1.5 border-t border-border">
                  <span>Total Amount at Razorpay Checkout:</span>
                  <span className="font-display text-base font-semibold text-[color:var(--navy)] dark:text-[color:var(--green)]">
                    ₹
                    {(
                      Math.round(
                        (getEffectiveAmount() +
                          Math.round(getEffectiveAmount() * 0.02 * 100) / 100) *
                          100,
                      ) / 100
                    ).toFixed(
                      (Math.round(
                        (getEffectiveAmount() +
                          Math.round(getEffectiveAmount() * 0.02 * 100) / 100) *
                          100,
                      ) /
                        100) %
                        1 ===
                        0
                        ? 0
                        : 2,
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground italic pt-0.5">
                  ✨ Covering the 2% gateway processing fee ensures 100% of your ₹
                  {getEffectiveAmount().toLocaleString("en-IN")} goes directly towards the 20
                  beneficiary families with zero deduction.
                </p>
              </div>

              {/* Submit Button (BiovaCo standard primary button) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] py-4 text-sm sm:text-base font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white disabled:opacity-60 cursor-pointer shadow-sm"
                >
                  {submitting ? (
                    <span>{t.form.submitting}</span>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 fill-current text-amber-300" />
                      <span>
                        {t.form.submitButton} · ₹
                        {(
                          Math.round(
                            (getEffectiveAmount() +
                              Math.round(getEffectiveAmount() * 0.02 * 100) / 100) *
                              100,
                          ) / 100
                        ).toFixed(
                          (Math.round(
                            (getEffectiveAmount() +
                              Math.round(getEffectiveAmount() * 0.02 * 100) / 100) *
                              100,
                          ) /
                            100) %
                            1 ===
                            0
                            ? 0
                            : 2,
                        )}
                      </span>
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" /> 256-Bit Encrypted
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <FileCheck className="h-3.5 w-3.5 text-muted-foreground" /> Instant
                    Acknowledgement
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-[color:var(--surface)] p-3 text-center text-[11px] text-muted-foreground leading-relaxed">
                  {t.form.securityNotice}
                </div>
              </div>
            </form>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
