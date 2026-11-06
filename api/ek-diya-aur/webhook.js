import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  if (!webhookSecret) {
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  if (!signature) {
    return res.status(400).json({ error: "Missing x-razorpay-signature header" });
  }

  // Verify HMAC signature
  try {
    const rawPayload = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawPayload)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.warn("Invalid webhook signature received");
      return res.status(400).json({ error: "Invalid webhook signature" });
    }
  } catch (err) {
    console.error("Webhook signature calculation error:", err);
    return res.status(400).json({ error: "Signature verification failed" });
  }

  const event = req.body?.event;
  const payload = req.body?.payload;

  if (event === "payment.captured") {
    const payment = payload?.payment?.entity;
    const paymentId = payment?.id;
    const orderId = payment?.order_id;
    const amount = (payment?.amount || 0) / 100;

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Update or insert idempotently
        await supabase
          .from("diya_contributions")
          .update({
            status: "captured",
            verified: true,
            amount: amount,
            razorpay_payment_id: paymentId,
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_order_id", orderId);
      } catch (err) {
        console.error("Webhook Supabase update error:", err);
      }
    }
  }

  return res.status(200).json({ status: "ok" });
}

