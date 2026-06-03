import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch active jobs from database
  const { data: jobs } = await supabase
    .from("job_positions")
    .select("role_key, updated_at")
    .eq("is_active", true);

  const baseUrl = "https://www.biovaco.in";
  
  // Use today's date for lastmod of static pages
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "/", changefreq: "weekly", priority: "1.0" },
    { url: "/about", changefreq: "monthly", priority: "0.9" },
    { url: "/careers", changefreq: "daily", priority: "0.9" },
    { url: "/cravora", changefreq: "weekly", priority: "0.9" },
    { url: "/innovation", changefreq: "monthly", priority: "0.8" },
    { url: "/partners", changefreq: "monthly", priority: "0.8" },
    { url: "/contact", changefreq: "yearly", priority: "0.7" },
    { url: "/privacy", changefreq: "yearly", priority: "0.5" },
    { url: "/terms", changefreq: "yearly", priority: "0.5" }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  // Inject Static Pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Dynamically inject open job URLs
  if (jobs) {
    jobs.forEach((job) => {
      // Fallback if updated_at is null
      const date = job.updated_at
        ? new Date(job.updated_at).toISOString().split("T")[0]
        : today;
      sitemap += `
  <url>
    <loc>${baseUrl}/careers/${job.role_key}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>always</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  }

  sitemap += `\n</urlset>`;

  // Tell browser/Googlebot that this is an XML file
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // Cache for 1 day

  res.status(200).send(sitemap);
}
