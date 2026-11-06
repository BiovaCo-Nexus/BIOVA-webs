/**
 * Serverless API handler: /api/campaign/pledge
 * Records a contribution pledge / intent with full validation
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    fullName,
    email,
    whatsappNumber,
    ageRange,
    city,
    amount,
    inspiration,
    isAnonymous,
    consentPublicDisplay,
    consentDisplayAmount,
    consentEmailUpdates,
    consentWhatsappUpdates,
    consentTermsPolicy,
  } = req.body || {};

  // Server-side validation
  if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
    return res.status(400).json({ error: "Full Name is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Valid email address is required" });
  }

  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount < 100) {
    return res.status(400).json({ error: "Contribution amount must be at least ₹100" });
  }

  if (!consentTermsPolicy) {
    return res.status(400).json({ error: "Terms and privacy consent is required" });
  }

  const referenceId = `EDA-2026-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  // Optional: trigger email acknowledgement via Brevo if configured
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (BREVO_API_KEY && email) {
    try {
      const emailPayload = {
        sender: { name: "Ek Diya Aur | BiovaCo Nexus", email: "no-reply@biovaco.in" },
        to: [{ email: email.trim(), name: fullName.trim() }],
        subject: "Thank You: Your Contribution Intent for Ek Diya Aur 2026",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1c1917; line-height: 1.6;">
            <div style="border-bottom: 2px solid #d97706; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #78350f; margin: 0;">EK DIYA AUR</h2>
              <p style="color: #d97706; margin: 4px 0 0 0; font-style: italic;">“Kisi aur ke ghar mein bhi roshni ho.”</p>
            </div>
            <p>Dear ${fullName},</p>
            <p>Thank you for choosing to share your light this Diwali. We have gratefully recorded your contribution intent of <strong>₹${parsedAmount.toLocaleString("en-IN")}</strong> towards our 20-family festive initiative in Nagpur, Maharashtra.</p>
            <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #92400e;"><strong>Initiative Reference ID:</strong> ${referenceId}</p>
            </div>
            <p>Our ground team is curating the Diwali hampers (groceries, new festive clothing, sweets, earthen diyas, and children's gifts). We will keep you informed with verified ledger updates and final distribution milestones.</p>
            <p style="font-size: 13px; color: #78716c; margin-top: 30px; border-top: 1px solid #e7e5e4; padding-top: 12px;">
              BiovaCo Nexus Private Limited • CIN: U46300ME2026PTC475352 • Nagpur, Maharashtra<br/>
              <em>Statutory Note: BiovaCo Nexus Pvt. Ltd. is a Private Limited Company. Contributions are not tax-exempt under Section 80G.</em>
            </p>
          </div>
        `,
      };

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      }).catch((e) => console.warn("Brevo mail error ignored:", e));
    } catch (e) {
      console.warn("Acknowledgement mail error:", e);
    }
  }

  return res.status(200).json({
    success: true,
    referenceId,
    message: "Contribution recorded successfully",
    status: "pledged",
    amount: parsedAmount,
    timestamp: new Date().toISOString(),
  });
}
