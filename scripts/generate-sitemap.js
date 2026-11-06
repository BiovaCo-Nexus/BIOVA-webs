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

async function generateSitemap() {
  console.log("Fetching dynamic news articles for sitemap...");

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
  
  // Extract all unique tags/topics for programmatic SEO
  const allTags = new Set();
  
  articles.forEach(article => {
    // 1. Add category as a tag
    if (article.category) {
      allTags.add(article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
    
    // 2. Add explicit SEO keywords as tags
    if (article.seo_keywords) {
      const keywords = article.seo_keywords.split(',').map(k => k.trim().toLowerCase());
      keywords.forEach(keyword => {
        if (keyword) {
          // convert "food innovation" to "food-innovation"
          const slugified = keyword.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          allTags.add(slugified);
        }
      });
    }
  });
  
  // Static routes
  const staticRoutes = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/innovation', priority: 0.8, changefreq: 'monthly' },
    { url: '/partners', priority: 0.7, changefreq: 'monthly' },
    { url: '/cravora', priority: 0.9, changefreq: 'monthly' },
    { url: '/careers', priority: 0.8, changefreq: 'weekly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' },
    { url: '/news', priority: 0.9, changefreq: 'daily' },
    { url: '/ek-diya-aur', priority: 0.9, changefreq: 'daily' },
  ];

  const today = new Date().toISOString().split('T')[0];

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static routes
  for (const route of staticRoutes) {
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${baseUrl}${route.url}</loc>\n`;
    sitemapContent += `    <lastmod>${route.url === '/news' ? today : '2024-05-15'}</lastmod>\n`;
    sitemapContent += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemapContent += `    <priority>${route.priority}</priority>\n`;
    sitemapContent += `  </url>\n`;
  }

  // Add dynamic article routes
  if (articles && articles.length > 0) {
    for (const article of articles) {
      // Format the date (assuming it's YYYY-MM-DD or ISO string)
      const lastModDate = new Date(article.date).toISOString().split('T')[0];
      
      sitemapContent += `  <url>\n`;
      sitemapContent += `    <loc>${baseUrl}/news/${article.slug}</loc>\n`;
      sitemapContent += `    <lastmod>${lastModDate}</lastmod>\n`;
      sitemapContent += `    <changefreq>monthly</changefreq>\n`;
      sitemapContent += `    <priority>0.8</priority>\n`;
      sitemapContent += `  </url>\n`;
    }
  }

  // Add programmatic SEO topic routes
  if (allTags.size > 0) {
    for (const tag of allTags) {
      sitemapContent += `  <url>\n`;
      sitemapContent += `    <loc>${baseUrl}/topic/${tag}</loc>\n`;
      sitemapContent += `    <lastmod>${today}</lastmod>\n`;
      sitemapContent += `    <changefreq>weekly</changefreq>\n`;
      sitemapContent += `    <priority>0.7</priority>\n`;
      sitemapContent += `  </url>\n`;
    }
  }

  sitemapContent += `</urlset>`;

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  
  console.log(`Successfully generated sitemap.xml with ${staticRoutes.length} static, ${articles?.length || 0} article routes, and ${allTags.size} programmatic SEO topics.`);
}

generateSitemap();
