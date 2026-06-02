export default async function handler(req, res) {
  try {
    // 1. Ping Supabase (Keeps the free tier database active)
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (SUPABASE_URL && SUPABASE_KEY) {
      const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/job_positions?select=id&limit=1`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      if (supabaseRes.ok) {
        console.log("Supabase pinged successfully.");
      } else {
        console.error("Supabase ping failed:", await supabaseRes.text());
      }
    } else {
      console.warn("Supabase env vars missing.");
    }

    // 2. Ping Brevo (Keeps the API key and account active)
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (BREVO_API_KEY) {
      const brevoRes = await fetch("https://api.brevo.com/v3/account", {
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY
        }
      });
      if (brevoRes.ok) {
        console.log("Brevo pinged successfully.");
      } else {
        console.error("Brevo ping failed:", await brevoRes.text());
      }
    } else {
      console.warn("Brevo API key missing.");
    }

    return res.status(200).json({ success: true, message: "All services kept alive successfully." });
  } catch (error) {
    console.error("Keep-alive function error:", error);
    return res.status(500).json({ error: error.message });
  }
}
