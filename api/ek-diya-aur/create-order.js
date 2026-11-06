export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // STRICT DEADLINE: Contribution window closes on 13 November 2026 at 12:00 PM IST
  const PAYMENT_CUTOFF = new Date("2026-11-13T12:00:00+05:30").getTime();
  if (Date.now() >= PAYMENT_CUTOFF) {
    return res.status(403).json({
      error: "Campaign contribution window officially concluded on 13 November 2026 at 12:00 PM IST. Orders cannot be created.",
    });
  }

  const { amount, receipt, donorEmail, donorName } = req.body || {};

  // Server-side amount validation (minimum INR 5)
  const numAmount = Number(amount);
  if (!numAmount || isNaN(numAmount) || numAmount < 5 || numAmount > 100000) {
    return res.status(400).json({
      error: "Invalid amount. Contribution must be between ₹5 and ₹1,00,000.",
    });
  }

  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.VITE_RAZORPAY_KEY_ID ||
    "rzp_live_SOMSQfIR2NBT6k";
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    // Return direct checkout configuration with the live key
    return res.status(200).json({
      directCheckout: true,
      keyId,
      amount: Math.round(numAmount * 100),
      currency: "INR",
    });
  }

  try {
    const amountInPaise = Math.round(numAmount * 100);
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const orderPayload = {
      amount: amountInPaise,
      currency: "INR",
      receipt: (receipt || `rcpt_${Date.now()}`).substring(0, 40),
      notes: {
        campaign: "EK DIYA AUR 2026",
        donor_email: (donorEmail || "").substring(0, 50),
        donor_name: (donorName || "").substring(0, 50),
        entity: "BiovaCo Nexus Pvt. Ltd.",
      },
    };

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("Razorpay order API note:", errText);
      // Fallback to direct checkout with live key
      return res.status(200).json({
        directCheckout: true,
        keyId,
        amount: amountInPaise,
        currency: "INR",
      });
    }

    const orderData = await response.json();
    return res.status(200).json({
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId,
    });
  } catch (err) {
    console.warn("Error creating Razorpay order, using direct checkout:", err);
    return res.status(200).json({
      directCheckout: true,
      keyId,
      amount: Math.round(numAmount * 100),
      currency: "INR",
    });
  }
}
