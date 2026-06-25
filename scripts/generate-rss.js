import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

async function generateRSS() {
  console.log("Fetching dynamic news articles for RSS feed...");

  let articles = [];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/news_articles?select=*&is_published=eq.true&order=date.desc`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    articles = await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    process.exit(1);
  }

  const baseUrl = 'https://biovaco.in';
  
  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
  };

  let rssContent = `<?xml version="1.0" encoding="UTF-8" ?>\n`;
  rssContent += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  rssContent += `  <channel>\n`;
  rssContent += `    <title>BiovaCo Nexus News &amp; Press</title>\n`;
  rssContent += `    <link>${baseUrl}/news</link>\n`;
  rssContent += `    <description>Official announcements, strategic updates, and media releases from BiovaCo Nexus.</description>\n`;
  rssContent += `    <language>en-us</language>\n`;
  rssContent += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;

  if (articles && articles.length > 0) {
    // Add last build date based on the newest article
    const lastBuildDate = new Date(articles[0].date).toUTCString();
    rssContent += `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`;

    for (const article of articles) {
      const pubDate = new Date(article.date).toUTCString();
      const articleUrl = `${baseUrl}/news/${article.slug}`;
      const title = escapeXml(article.seo_title || article.title);
      const description = escapeXml(article.seo_description || article.summary);

      rssContent += `    <item>\n`;
      rssContent += `      <title>${title}</title>\n`;
      rssContent += `      <link>${articleUrl}</link>\n`;
      rssContent += `      <guid isPermaLink="true">${articleUrl}</guid>\n`;
      rssContent += `      <description>${description}</description>\n`;
      rssContent += `      <pubDate>${pubDate}</pubDate>\n`;
      
      if (article.category) {
        rssContent += `      <category>${escapeXml(article.category)}</category>\n`;
      }
      
      rssContent += `    </item>\n`;
    }
  }

  rssContent += `  </channel>\n`;
  rssContent += `</rss>`;

  const rssPath = path.resolve(__dirname, '../public/rss.xml');
  fs.writeFileSync(rssPath, rssContent);
  
  console.log(`Successfully generated rss.xml with ${articles?.length || 0} items.`);
}

generateRSS();
