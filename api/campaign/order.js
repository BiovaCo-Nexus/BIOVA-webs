/**
 * Serverless API handler: /api/campaign/order
 * Generates Razorpay Order server-side or reports gateway onboarding status
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, currency = "INR", receipt } = req.body || {};

  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  // Strict compliance with Phase 7:
  // "If the legal receiving entity or gateway approval is not ready, keep live payments disabled
  // and show an honest contribution-unavailable message. Do not pretend payment integration is operational when it is not."
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return res.status(200).json({
      enabled: false,
      message:
        "Official merchant gateway onboarding with Razorpay for BiovaCo Nexus Pvt. Ltd. is currently in progress. Live payments are paused pending regulatory receiving entity verification.",
      mode: "pledge",
    });
  }

  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount < 100) {
    return res.status(400).json({ error: "Minimum contribution amount is ₹100" });
  }

  try {
    const amountInPaise = Math.round(parsedAmount * 100);
    const authHeader = "Basic " + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

    const orderPayload = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `eda_${Date.now()}`,
      notes: {
        campaign: "Ek Diya Aur 2026",
        entity: "BiovaCo Nexus Pvt. Ltd.",
      },
    };

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Razorpay order creation error:", errorText);
      return res.status(response.status).json({ error: "Failed to create payment order" });
    }

    const orderData = await response.json();
    return res.status(200).json({
      enabled: true,
      keyId: RAZORPAY_KEY_ID,
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
    });
  } catch (error) {
    console.error("Internal order error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
