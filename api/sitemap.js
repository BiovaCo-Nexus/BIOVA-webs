import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Use Vercel environment variables
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch active jobs from database
  const { data: jobs } = await supabase
    .from('job_positions')
    .select('role_key, updated_at')
    .eq('is_active', true);

  const baseUrl = 'https://www.biovaco.in';

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/careers</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/cravora</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/innovation</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/partners</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Dynamically inject open job URLs
  if (jobs) {
    jobs.forEach(job => {
      // Fallback if updated_at is null
      const date = job.updated_at ? new Date(job.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      sitemap += `
  <url>
    <loc>${baseUrl}/careers/${job.role_key}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>always</changefreq>
    <priority>0.9</priority>
  </url>`;
    });
  }

  sitemap += `\n</urlset>`;

  // Tell browser/Googlebot that this is an XML file
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache for 1 day
  
  res.status(200).send(sitemap);
}
