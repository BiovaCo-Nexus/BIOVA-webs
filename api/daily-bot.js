export default async function handler(req, res) {
  // 1. Verify Authorization (Vercel Cron Secures this using CRON_SECRET if setup, but we'll allow it for now)
  const authHeader = req.headers.authorization;
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const urlsToCheck = [
    "https://www.biovaco.in/",
    "https://www.biovaco.in/about",
    "https://www.biovaco.in/careers",
    "https://www.biovaco.in/news",
    "https://www.biovaco.in/cravora"
  ];

  let errorsFound = [];

  // 2. Check all URLs
  for (const url of urlsToCheck) {
    try {
      const startTime = Date.now();
      const response = await fetch(url, {
        headers: {
          'user-agent': 'BiovaCo-Health-Bot/1.0'
        }
      });
      const timeTaken = Date.now() - startTime;

      if (!response.ok) {
        errorsFound.push(`❌ ${url} returned status ${response.status} (${response.statusText})`);
      } else if (timeTaken > 5000) {
        // Warning if it takes more than 5 seconds
        errorsFound.push(`⚠️ ${url} took too long to load: ${timeTaken}ms`);
      }
    } catch (error) {
      errorsFound.push(`🛑 Failed to reach ${url}: ${error.message}`);
    }
  }

  // 3. If errors are found, send an email
  if (errorsFound.length > 0) {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error("Missing BREVO_API_KEY");
      return res.status(500).json({ error: "Errors found, but missing BREVO_API_KEY to send email." });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #D32F2F;">⚠️ BiovaCo Website Alert</h2>
        <p>Your automated health bot detected issues on the live website during its daily check.</p>
        <div style="background: #FEE2E2; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #D32F2F;">
          <ul style="margin: 0; padding-left: 20px;">
            ${errorsFound.map(err => `<li style="margin-bottom: 10px; color: #991B1B;">${err}</li>`).join("")}
          </ul>
        </div>
        <p>Please check the Vercel logs or visit the site to investigate.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #64748b;">Automated Daily Check by BiovaCo Nexus Bot</p>
      </div>
    `;

    const emailData = {
      sender: { name: "BiovaCo Bot", email: "no-reply@biovaco.in" },
      to: [{ email: "biovaconexuspvtltd@gmail.com", name: "Admin" }],
      subject: "🚨 Alert: BiovaCo Website Issues Detected",
      htmlContent: htmlContent,
    };

    try {
      const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send alert email");
        return res.status(500).json({ error: "Errors found, but failed to send email alert." });
      }
    } catch (e) {
      return res.status(500).json({ error: "Failed to fetch Brevo API" });
    }
    
    return res.status(200).json({ status: "Alert email sent", errors: errorsFound });
  }

  // 4. No errors
  return res.status(200).json({ status: "All systems operational. No errors found." });
}
