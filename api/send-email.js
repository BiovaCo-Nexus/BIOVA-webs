export default async function handler(req, res) {
  const BREVO_API_KEY = (process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY || "").trim();

  if (!BREVO_API_KEY) {
    console.error("Missing BREVO_API_KEY or VITE_BREVO_API_KEY in environment variables");
    return res.status(500).json({ error: "Missing BREVO_API_KEY or VITE_BREVO_API_KEY" });
  }

  // Diagnostic GET endpoint to check Brevo delivery events
  if (req.method === "GET") {
    const email = req.query.email || "mundhadaleena@gmail.com";
    try {
      const eventsRes = await fetch(
        `https://api.brevo.com/v3/smtp/statistics/events?email=${encodeURIComponent(email)}&limit=10`,
        {
          headers: {
            accept: "application/json",
            "api-key": BREVO_API_KEY,
          },
        }
      );
      const eventsData = await eventsRes.json();
      return res.status(200).json({ email, events: eventsData });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { toEmail, toName, subject, htmlContent } = req.body;

  let toArray = [];
  if (Array.isArray(toEmail)) {
    toArray = toEmail.map((email) => ({ email, name: toName }));
  } else {
    toArray = [{ email: toEmail, name: toName }];
  }

  const emailData = {
    sender: { name: "BiovaCo Nexus", email: "no-reply@biovaco.in" },
    replyTo: { name: "BiovaCo Nexus Support", email: "hello@biovaco.in" },
    to: toArray,
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
      return res.status(response.status).json({ error: "Failed to send email", details: err });
    }

    const brevoData = await response.json();
    return res.status(200).json({ success: true, brevo: brevoData });
  } catch (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: error.message });
  }
}
