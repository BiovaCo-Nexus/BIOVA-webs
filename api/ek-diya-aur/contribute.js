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

  // Send festive acknowledgement email to Donor AND notification to Admin via Brevo
  const brevoKey = (
    process.env.BREVO_API_KEY ||
    process.env.VITE_BREVO_API_KEY ||
    ""
  ).trim();

  const ADMIN_EMAIL = (
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    "nakulmundhada23@gmail.com"
  ).trim();

  let emailSent = false;
  let adminAlertSent = false;

  if (brevoKey && email) {
    try {
      // 1. Donor Official Receipt Email Payload
      const donorEmailPayload = {
        sender: { name: "BiovaCo Nexus", email: "no-reply@biovaco.in" },
        replyTo: { name: "BiovaCo Nexus Support", email: "hello@biovaco.in" },
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

      // 2. Admin Alert Email Payload (Sent to nakulmundhada23@gmail.com)
      const adminEmailPayload = {
        sender: { name: "BiovaCo Nexus", email: "no-reply@biovaco.in" },
        replyTo: { name: fullName, email: email },
        to: [{ email: ADMIN_EMAIL, name: "Nakul Mundhada" }],
        subject: `🎉 New Ek Diya Aur Contribution: ₹${amount.toLocaleString("en-IN")} from ${fullName}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contribution Alert</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
            <div style="max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);">
              
              <!-- Admin Banner -->
              <div style="background-color: #032E63; padding: 28px 24px; color: #ffffff;">
                <div style="display: inline-block; background-color: #08A04B; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                  CONFIRMED PAYMENT RECEIVED
                </div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">
                  New Contribution: ₹${amount.toLocaleString("en-IN")}
                </h1>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #cbd5e1;">
                  Ek Diya Aur 2026 · BiovaCo Nexus Diwali Initiative
                </p>
              </div>

              <!-- Main Admin Info -->
              <div style="padding: 28px 24px;">
                
                <!-- Amount Highlight Box -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 24px; text-align: center;">
                  <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 600;">Net Family Kit Fund</div>
                  <div style="font-size: 32px; font-weight: 700; color: #032E63; margin: 4px 0;">₹${amount.toLocaleString("en-IN")}</div>
                  <div style="font-size: 12px; color: #059669; font-weight: 600;">+ ₹${gatewayFee} (2% Gateway) = Total ₹${grossAmount.toLocaleString("en-IN")} Paid</div>
                </div>

                <!-- Contributor Details Table -->
                <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #032E63; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                  👤 Contributor Details
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 38%;">Full Name:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${fullName} ${isAnonymous ? '<span style="color: #f59e0b; font-size: 11px;">(Wants Anonymous on Wall)</span>' : ''}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Email Address:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;"><a href="mailto:${email}" style="color: #032E63; text-decoration: underline;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">WhatsApp / Phone:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">
                      ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}" style="color: #059669; text-decoration: none; font-weight: 600;">${whatsapp} 💬</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">City / Location:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${city || '<span style="color: #94a3b8;">Not provided</span>'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Age Group:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${ageRange || '<span style="color: #94a3b8;">Not provided</span>'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Personal Message / Reason:</td>
                    <td style="padding: 8px 0; font-style: italic; color: #334155;">"${reason || 'No message provided'}"</td>
                  </tr>
                </table>

                <!-- Payment & Verification Table -->
                <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #032E63; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                  💳 Payment & Verification Details
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 38%;">Receipt Reference ID:</td>
                    <td style="padding: 8px 0; font-family: monospace; font-weight: 600; color: #0f172a;">${recordId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Razorpay Payment ID:</td>
                    <td style="padding: 8px 0; font-family: monospace; font-weight: 600; color: #059669;">${razorpayPaymentId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Razorpay Order ID:</td>
                    <td style="padding: 8px 0; font-family: monospace; color: #64748b;">${razorpayOrderId || "Direct Checkout"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Display on Wall:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${showOnWall ? "Yes (Public Supporter Wall)" : "No (Private)"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Display Amount on Wall:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${showAmount ? "Yes" : "Hidden / Amount Private"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Email Updates Consent:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${consentEmail ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">WhatsApp Updates Consent:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${consentWhatsapp ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Time (IST):</td>
                    <td style="padding: 8px 0; color: #64748b;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
                  </tr>
                </table>

                <!-- Action Links for Admin -->
                <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid #e2e8f0;">
                  <a href="https://dashboard.razorpay.com" style="display: inline-block; background-color: #032E63; color: #ffffff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 600;">
                    Open Razorpay Dashboard →
                  </a>
                  <a href="https://biovaco.in/ek-diya-aur#supporters" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 600; margin-left: 8px;">
                    View Live Campaign Wall ↗
                  </a>
                </div>

              </div>

              <!-- Admin Footer -->
              <div style="background-color: #f8fafc; padding: 14px 24px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                BiovaCo Nexus Pvt. Ltd. · Automated Admin Notification Service · <a href="https://biovaco.in" style="color: #94a3b8;">biovaco.in</a>
              </div>

            </div>
          </body>
          </html>
        `,
      };

      // Dispatch BOTH emails concurrently via Brevo
      const [donorRes, adminRes] = await Promise.allSettled([
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoKey,
            "content-type": "application/json",
          },
          body: JSON.stringify(donorEmailPayload),
        }),
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoKey,
            "content-type": "application/json",
          },
          body: JSON.stringify(adminEmailPayload),
        }),
      ]);

      // Check Donor Email status
      if (donorRes.status === "fulfilled" && donorRes.value.ok) {
        emailSent = true;
        console.log("Donor confirmation email sent successfully via Brevo to:", email);
      } else {
        const errText = donorRes.status === "fulfilled" ? await donorRes.value.text() : donorRes.reason;
        console.error("Brevo donor email dispatch failed:", errText);
      }

      // Check Admin Alert status
      if (adminRes.status === "fulfilled" && adminRes.value.ok) {
        adminAlertSent = true;
        console.log("Admin alert email sent successfully via Brevo to:", ADMIN_EMAIL);
      } else {
        const errText = adminRes.status === "fulfilled" ? await adminRes.value.text() : adminRes.reason;
        console.error("Brevo admin email dispatch failed:", errText);
      }

    } catch (mailErr) {
      console.warn("Brevo mail dispatch network exception:", mailErr);
    }
  } else {
    console.warn("Skipping Brevo email: missing brevoKey or email address", { hasKey: Boolean(brevoKey), hasEmail: Boolean(email) });
  }

  return res.status(200).json({
    success: true,
    id: recordId,
    amount: amount,
    grossAmount: grossAmount,
    gatewayFee: gatewayFee,
    paymentId: razorpayPaymentId,
    emailSent: emailSent,
    adminAlertSent: adminAlertSent,
  });
}
