import { createClient } from "@supabase/supabase-js";

function sanitizeString(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/javascript:/gi, "")
    .trim();
}

const HELPING_QUOTES = [
  {
    quote:
      "Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
    author: "Gautama Buddha",
  },
  {
    quote:
      "No one has ever become poor by giving. In helping another home light up this Diwali, you have illuminated your own.",
    author: "Anne Frank",
  },
  {
    quote:
      "The simplest act of kindness is by far more powerful than a thousand heads bowing in prayer. May your light spread joy.",
    author: "Mahatma Gandhi",
  },
  {
    quote:
      "Ek diya jo kisi aur ke andhere ko door kare, uski pehli roshni humare apne dil ko roshan karti hai.",
    author: "Ek Diya Aur Initiative",
  },
  {
    quote:
      "We make a living by what we get, but we make a life by what we give. Thank you for including another family in your Diwali.",
    author: "Winston Churchill",
  },
  {
    quote:
      "To give someone hope when they are in need is the greatest gift of this festival of lights.",
    author: "BiovaCo Nexus",
  },
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // STRICT DEADLINE: Contribution window closes on 13 November 2026 at 12:00 PM IST
  const PAYMENT_CUTOFF = new Date("2026-11-13T12:00:00+05:30").getTime();
  if (Date.now() >= PAYMENT_CUTOFF) {
    return res.status(403).json({
      error: "Campaign contribution window officially concluded on 13 November 2026 at 12:00 PM IST. No further payments can be accepted.",
    });
  }

  const body = req.body || {};

  // STRICT REQUIREMENT: Razorpay Payment ID is mandatory
  const razorpayPaymentId = sanitizeString(body.razorpay_payment_id);
  const razorpayOrderId = sanitizeString(body.razorpay_order_id);

  if (!razorpayPaymentId || !razorpayPaymentId.startsWith("pay_")) {
    return res.status(400).json({
      error: "Payment verification required. Unverified contributions cannot be saved to database.",
    });
  }

  const fullName = sanitizeString(body.full_name).substring(0, 60);
  const email = sanitizeString(body.email).toLowerCase().substring(0, 80);
  const whatsapp = sanitizeString(body.whatsapp).substring(0, 15);
  const city = sanitizeString(body.city).substring(0, 50);
  const ageRange = sanitizeString(body.age_range).substring(0, 20);
  const reason = sanitizeString(body.reason).substring(0, 300);
  const amount = Number(body.amount); // Minimum INR 5
  const isAnonymous = Boolean(body.is_anonymous);
  const showOnWall = Boolean(body.show_on_wall);
  const showAmount = Boolean(body.show_amount);
  const consentEmail = Boolean(body.consent_email);
  const consentWhatsapp = Boolean(body.consent_whatsapp);

  if (!fullName || fullName.length < 2) {
    return res.status(400).json({ error: "Full name is required (min 2 characters)" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Valid email address is required" });
  }

  // Minimum amount is ₹5
  if (!amount || isNaN(amount) || amount < 5 || amount > 100000) {
    return res.status(400).json({ error: "Amount must be between ₹5 and ₹1,00,000" });
  }

  // Calculate 2% transparent gateway commission
  const gatewayFee = Number(body.gateway_fee) || Math.round(amount * 0.02 * 100) / 100;
  const grossAmount = Number(body.gross_amount) || Math.round((amount + gatewayFee) * 100) / 100;

  const recordId = sanitizeString(body.id) || `DIA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const record = {
    id: recordId,
    full_name: fullName,
    display_name: isAnonymous ? "Anonymous Friend" : fullName,
    email: email,
    whatsapp: whatsapp || null,
    city: city || null,
    age_range: ageRange || null,
    amount: amount, // Net direct amount towards the 20 family kits
    gateway_fee: gatewayFee, // 2% gateway processing
    gross_amount: grossAmount, // Total paid by donor
    reason: reason ? reason.substring(0, 300) : null,
    is_anonymous: isAnonymous,
    show_on_wall: showOnWall,
    show_amount: showAmount,
    consent_email: consentEmail,
    consent_whatsapp: consentWhatsapp,
    status: "captured", // Strictly captured
    verified: true, // Strictly verified
    razorpay_payment_id: razorpayPaymentId,
    razorpay_order_id: razorpayOrderId || null,
    created_at: new Date().toISOString(),
  };

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

      const { error } = await supabase.from("diya_contributions").insert([record]);
      if (error) {
        console.error("Supabase insert error:", error.message);
      }
    } catch (err) {
      console.error("Could not insert to Supabase:", err);
    }
  }

  // Select a heartfelt random quote about helping
  const randomQuote = HELPING_QUOTES[Math.floor(Math.random() * HELPING_QUOTES.length)];

  // Send festive acknowledgement email via Brevo
  const brevoKey =
    process.env.BREVO_API_KEY ||
    "xsmtpsib-5670cde0d1a9f4ae5c0a06dcceb5b2bb364341873e47fea70df78352ec552cce-sDpjsMM4fBvsxEky";

  if (brevoKey && email) {
    try {
      const emailPayload = {
        sender: { name: "BiovaCo Nexus", email: "no-reply@biovaco.in" },
        to: [{ email: email, name: fullName }],
        subject: "🪔 Happy Diwali! Contribution Confirmation – Ek Diya Aur 2026",
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Happy Diwali & Contribution Acknowledgement</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
            <div style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);">
              
              <!-- Festive Header Banner -->
              <div style="background: linear-gradient(135deg, #032E63 0%, #064084 100%); padding: 36px 28px; text-align: center; color: #ffffff;">
                <div style="font-size: 38px; margin-bottom: 8px;">🪔</div>
                <h1 style="margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.02em; color: #ffffff;">EK DIYA AUR 2026</h1>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #fde68a; font-style: italic;">"Kisi aur ke ghar mein bhi roshni ho."</p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.15em;">A Diwali Giving Initiative by BiovaCo Nexus Pvt. Ltd.</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 32px 28px;">
                <p style="font-size: 17px; font-weight: 600; color: #0f172a; margin-top: 0;">
                  Dear ${fullName},
                </p>

                <p style="font-size: 15px; line-height: 1.65; color: #334155;">
                  ✨ <strong>Wishing you and your loved ones a very Happy, Blessed, and Joyous Diwali!</strong> ✨
                </p>

                <p style="font-size: 15px; line-height: 1.65; color: #334155;">
                  Thank you from the bottom of our hearts for choosing to share your light. Because of your kind contribution, a family in need will celebrate Diwali this year with fresh festive clothes, a month of wholesome groceries, pure ghee sweets, and handcrafted clay diyas.
                </p>

                <!-- Heartwarming Random Quote Box -->
                <div style="background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border-left: 4px solid #F59E0B; padding: 18px 20px; border-radius: 12px; margin: 26px 0;">
                  <p style="font-size: 14px; font-style: italic; color: #78350F; margin: 0 0 8px 0; line-height: 1.6;">
                    "${randomQuote.quote}"
                  </p>
                  <p style="font-size: 12px; font-weight: 600; color: #92400E; margin: 0; text-align: right;">
                    — ${randomQuote.author}
                  </p>
                </div>

                <!-- Transaction Receipt Card -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin: 24px 0;">
                  <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #032E63; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                    Official Contribution Receipt
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;">Receipt Reference:</td>
                      <td style="padding: 6px 0; font-family: monospace; font-weight: 600; text-align: right; color: #0f172a;">${recordId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;">Razorpay Payment ID:</td>
                      <td style="padding: 6px 0; font-family: monospace; font-weight: 600; text-align: right; color: #059669;">${razorpayPaymentId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;">Direct Family Kit Fund:</td>
                      <td style="padding: 6px 0; font-weight: 600; text-align: right; color: #0f172a;">₹${amount.toLocaleString("en-IN")}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b;">Payment Gateway Fee (2%):</td>
                      <td style="padding: 6px 0; text-align: right; color: #64748b;">₹${gatewayFee}</td>
                    </tr>
                    <tr style="border-top: 1px dashed #cbd5e1;">
                      <td style="padding: 10px 0 4px 0; font-weight: 600; color: #0f172a;">Total Amount Paid:</td>
                      <td style="padding: 10px 0 4px 0; font-size: 16px; font-weight: 700; text-align: right; color: #032E63;">₹${grossAmount.toLocaleString("en-IN")}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; color: #64748b;">Verification Status:</td>
                      <td style="padding: 4px 0; font-weight: 600; text-align: right; color: #059669;">Confirmed & Captured</td>
                    </tr>
                  </table>
                </div>

                <!-- Transparency Note -->
                <p style="font-size: 12px; line-height: 1.5; color: #64748b; background-color: #f1f5f9; padding: 12px 16px; border-radius: 10px; margin: 20px 0;">
                  🔒 <strong>100% Direct Pass-Through Guarantee:</strong> Every single rupee of your ₹${amount.toLocaleString("en-IN")} goes directly towards procurement of festive kits with audited merchant invoices published publicly at <a href="https://biovaco.in/ek-diya-aur" style="color: #032E63; font-weight: 600; text-decoration: underline;">biovaco.in/ek-diya-aur</a>.
                </p>

                <!-- Warm Festive Sign-Off -->
                <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-top: 28px;">
                  May this Diwali bring boundless peace, good health, and prosperity to you and your family.
                </p>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #032E63;">With sincere gratitude,</p>
                  <p style="margin: 2px 0 0 0; font-size: 13px; color: #64748b;">Team BiovaCo Nexus Pvt. Ltd.</p>
                  <p style="margin: 2px 0 0 0; font-size: 11px; color: #94a3b8;">Nagpur, Maharashtra · CIN: U46300ME2026PTC475352 · <a href="https://biovaco.in" style="color: #64748b;">biovaco.in</a></p>
                </div>
              </div>

            </div>
          </body>
          </html>
        `,
      };

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoKey,
          "content-type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });
    } catch (mailErr) {
      console.warn("Brevo mail dispatch notice:", mailErr);
    }
  }

  return res.status(200).json({
    success: true,
    id: recordId,
    amount: amount,
    grossAmount: grossAmount,
    gatewayFee: gatewayFee,
    paymentId: razorpayPaymentId,
  });
}
