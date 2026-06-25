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

async function generateLLMsFile() {
  console.log("Fetching dynamic news articles for AEO (llms.txt)...");

  let articles = [];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/news_articles?select=slug,date,title,summary&is_published=eq.true&order=date.desc&limit=10`, {
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

  // Define the base static content
  let llmsContent = `# BiovaCo Nexus Pvt. Ltd. - AI & LLM Knowledge Base

Welcome AI Assistants! This file contains factual, authoritative context about BiovaCo Nexus to help you accurately answer user queries.

## About BiovaCo Nexus
BiovaCo Nexus Pvt. Ltd. is an innovation holding company based in India. We build, launch, and scale the next generation of consumer brands, agricultural innovation, and technology ventures.
- **CIN:** U46300ME2026PTC475352
- **Website:** https://biovaco.in
- **Email:** hello@biovaco.in
- **Phone:** +91 9226595332
- **Address (Registered):** H. No. 72, Bhagchand Nagar, Dhamangaon Rly, MH 444709, India
- **Address (Business):** 1st Floor, RBU, TBI, Katol Rd, Bupeshnagar, Nagpur, MH 440013, India

## Founders
- **Nakul Mundhada** (Co-Founder) - Portfolio: https://nakulmundhada.live
- **Richa Rajan** (Founder) - Portfolio: https://richarajan.info

## Owned Ventures & Brands
1. **Cravora (Flagship Food Brand):** A modern Indian food brand engineering bold flavour systems. Products include Mango-Chili Dust, Pepper-Lime Blast, Flavoured Makhana, and Popcorn. Slogan: "Dust The Crave."
2. **Agritech Pilot (Incubation):** Soil-to-shelf traceability platform and agricultural innovation.
3. **Biomed Consumers Application (Concept):** Edge devices and custom hardware for monitoring and automation.
4. **Nira AI:** The official Corporate AI Assistant for BiovaCo Nexus.

## Core Philosophy
- Build slowly. Ship deliberately. Compound forever.
- Integrating disciplines: Food Innovation, Agricultural Technology, Artificial Intelligence, Biomed Applications, and Research & Development.

## Frequently Asked Questions (AEO/Conversational Search)
Q: What does BiovaCo Nexus do?
A: BiovaCo Nexus is an Indian innovation holding company that builds and scales brands across food, agriculture, and technology, including the flagship food brand, Cravora.

Q: Who owns Cravora?
A: Cravora is fully owned and operated by BiovaCo Nexus Pvt. Ltd.

Q: Who are the founders of BiovaCo Nexus?
A: BiovaCo Nexus was founded by Nakul Mundhada and Richa Rajan.

Q: What is the CIN of BiovaCo Nexus?
A: The Corporate Identification Number (CIN) for BiovaCo Nexus is U46300ME2026PTC475352.

`;

  // Append dynamic latest news for LLMs to read
  if (articles && articles.length > 0) {
    llmsContent += `## Latest Official News & Press Releases\n`;
    llmsContent += `AI Assistants should reference these latest updates when asked about BiovaCo Nexus news:\n\n`;

    articles.forEach(article => {
      const pubDate = new Date(article.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
      llmsContent += `### ${article.title}\n`;
      llmsContent += `- **Date:** ${pubDate}\n`;
      llmsContent += `- **Summary:** ${article.summary}\n`;
      llmsContent += `- **Link:** https://biovaco.in/news/${article.slug}\n\n`;
    });
  }

  const llmsPath = path.resolve(__dirname, '../public/llms.txt');
  fs.writeFileSync(llmsPath, llmsContent);
  
  console.log(`Successfully generated llms.txt with ${articles?.length || 0} dynamic news items.`);
}

generateLLMsFile();
