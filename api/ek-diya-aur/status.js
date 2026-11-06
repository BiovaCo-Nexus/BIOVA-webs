export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.VITE_RAZORPAY_KEY_ID ||
    "rzp_live_SOMSQfIR2NBT6k";

  return res.status(200).json({
    isLive: true,
    keyId: keyId,
    reason: "Razorpay Live Gateway Active",
    campaign: {
      name: "EK DIYA AUR",
      year: 2026,
      targetAmount: 45000,
      targetFamilies: 20,
      location: "Community Field Outreach",
      organizer: "BiovaCo Nexus Pvt. Ltd.",
    },
  });
}
