import crypto from "crypto";

/**
 * Serverless API handler: /api/campaign/verify
 * Verifies Razorpay payment signature server-side
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  if (!RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ error: "Server gateway secret not configured" });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required payment signature parameters" });
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isMatch = generatedSignature === razorpay_signature;

    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Payment verification failed: Invalid signature" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment signature verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (err) {
    console.error("Signature verification error:", err);
    return res.status(500).json({ error: "Verification processing failed" });
  }
}
