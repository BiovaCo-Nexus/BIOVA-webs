import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    amount,
    formData,
  } = req.body || {};

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return res.status(500).json({ error: "Gateway secret not configured on server" });
  }

  // Verify HMAC SHA256 signature
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    console.warn("Razorpay signature mismatch:", {
      received: razorpaySignature,
      expected: generatedSignature,
    });
    return res.status(400).json({ error: "Invalid payment signature verification failed" });
  }

  const recordId = `VER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const numericAmount = Number(amount) || 0;

  // Supabase record
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Check for duplicate payment id to ensure idempotency
      const { data: existing } = await supabase
        .from("diya_contributions")
        .select("id")
        .eq("razorpay_payment_id", razorpayPaymentId)
        .maybeSingle();

      if (existing) {
        return res.status(200).json({
          success: true,
          id: existing.id,
          message: "Transaction already processed idempotently",
        });
      }

      await supabase.from("diya_contributions").insert([
        {
          id: recordId,
          full_name: formData?.fullName || "Supporter",
          display_name: formData?.isAnonymous
            ? "Anonymous Friend"
            : formData?.fullName || "Kind Contributor",
          email: formData?.email || "",
          whatsapp: formData?.whatsapp || null,
          age_range: formData?.ageRange || null,
          city: formData?.city || null,
          amount: numericAmount,
          reason: formData?.reason || null,
          is_anonymous: Boolean(formData?.isAnonymous),
          show_on_wall: Boolean(formData?.consentPublicDisplay),
          show_amount: Boolean(formData?.consentPublicAmount),
          consent_email: Boolean(formData?.consentEmailUpdates),
          consent_whatsapp: Boolean(formData?.consentWhatsappUpdates),
          status: "captured",
          verified: true,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_order_id: razorpayOrderId,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error("Error saving verified payment to Supabase:", err);
    }
  }

  // Trigger email acknowledgement if Brevo is available
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey && formData?.email) {
    try {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "BiovaCo Nexus", email: "no-reply@biovaco.in" },
          to: [{ email: formData.email, name: formData.fullName || "Supporter" }],
          subject: "Your Contribution Acknowledgement: Ek Diya Aur 2026",
          htmlContent: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 12px;">
              <h2 style="color: #b45309; margin-bottom: 8px;">EK DIYA AUR – 2026</h2>
              <p style="font-size: 16px; color: #334155;">Dear ${formData.fullName || "Friend"},</p>
              <p style="line-height: 1.6; color: #475569;">
                Thank you with all our hearts for joining hands with BiovaCo Nexus in illuminating 20 vulnerable homes this Diwali.
              </p>
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 4px 0;"><strong>Receipt Reference:</strong> ${recordId}</p>
                <p style="margin: 4px 0;"><strong>Amount Verified:</strong> ₹${numericAmount.toLocaleString("en-IN")}</p>
                <p style="margin: 4px 0;"><strong>Gateway Payment ID:</strong> ${razorpayPaymentId}</p>
                <p style="margin: 4px 0;"><strong>Status:</strong> Captured & Verified</p>
              </div>
              <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
                100% of your net contribution goes directly to procurement of grocery kits, traditional attire, sweets and diyas for vetted families. All itemized expenses will be published on <a href="https://biovaco.in/ek-diya-aur">https://biovaco.in/ek-diya-aur</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #94a3b8;">
                BiovaCo Nexus Pvt. Ltd. · 1st Floor, RBU TBI, Katol Rd, Nagpur, MH 440013 · CIN: U46300ME2026PTC475352<br/>
                <em>Note: This operational acknowledgement is for social giving and not an 80G tax exemption receipt.</em>
              </p>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.warn("Could not send email receipt:", err);
    }
  }

  return res.status(200).json({
    success: true,
    id: recordId,
    verified: true,
    amount: numericAmount,
  });
}

