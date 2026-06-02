export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { toEmail, toName, subject, htmlContent } = req.body;
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error("Missing BREVO_API_KEY in environment variables");
    return res.status(500).json({ error: "Missing BREVO_API_KEY" });
  }

  const emailData = {
    sender: { name: "BiovaCo", email: "no-reply@biovaco.in" },
    to: [{ email: toEmail, name: toName }],
    subject: subject,
    htmlContent: htmlContent,
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Brevo API Error:", err);
      return res.status(response.status).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: error.message });
  }
}
