import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    // 🔥 DEBUGGING LOGS (Vercel Dashboard me dikhega)
    console.log("=== WEBHOOK RECEIVED ===");
    console.log("req.body:", JSON.stringify(req.body, null, 2));
    console.log("req.query:", req.query);
    console.log("========================");

    let url =
      req.body?.url ||
      req.query?.url ||
      req.body?.payload?.url ||
      req.body?.record?.url ||
      req.body?.url?.toString();

    // Handle Supabase Webhook default payload safely
    if (!url && req.body?.record?.role_key) {
      url = `https://biovaco.in/careers/${req.body.record.role_key}`;
    }

    if (!url) {
      return res.status(400).json({
        error: "URL required",
      });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/indexing",
      ],
    });

    const client = await auth.getClient();

    const indexing = google.indexing({
      version: "v3",
      auth: client,
    });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED",
      },
    });

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
}
