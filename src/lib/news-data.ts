export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: "Press Release" | "Company News" | "Product Update";
  summary: string;
  content: string;
  image?: string;
  author: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "biovaco-nexus-launches-cravora",
    title: "BiovaCo Nexus Announces the Launch of Cravora: A New Era in Food Innovation",
    date: "2026-06-25",
    category: "Press Release",
    summary: "BiovaCo Nexus officially unveils Cravora, a groundbreaking consumer brand aimed at revolutionizing the ready-to-eat market with AI-optimized flavor profiles.",
    content: `
# BiovaCo Nexus Announces the Launch of Cravora

**NAGPUR, INDIA — June 25, 2026** — BiovaCo Nexus Pvt. Ltd., an emerging innovation holding company, today announced the official launch of its highly anticipated consumer brand, **Cravora**.

Cravora aims to disrupt the fast-growing ready-to-eat market by leveraging advanced data analytics and AI-optimized flavor profiling to create products that cater specifically to modern consumer palates. 

"The launch of Cravora represents a significant milestone for BiovaCo Nexus," said the spokesperson for BiovaCo. "We have invested heavily in understanding the intricate balance of taste, nutrition, and convenience. Cravora is the manifestation of our commitment to delivering exceptional products that resonate with today's fast-paced lifestyle while maintaining the highest quality standards."

### Key Highlights of the Cravora Launch:
- **Data-Driven Flavors:** Each product under the Cravora brand has been developed using extensive consumer data to ensure maximum market acceptance.
- **Sustainable Packaging:** In line with BiovaCo's commitment to the environment, Cravora utilizes 100% biodegradable packaging.
- **Direct-to-Consumer Model:** Leveraging BiovaCo's optimized e-commerce algorithms, Cravora will primarily be available through an intuitive D2C platform, ensuring the freshest products reach consumers rapidly.

BiovaCo Nexus continues to build its portfolio across consumer brands, agricultural technology, and intelligent systems, with Cravora leading the charge in the food sector.

For more information about Cravora and to explore the product range, visit the official website or the Cravora section on BiovaCo Nexus.

**About BiovaCo Nexus Pvt. Ltd.**
BiovaCo Nexus Pvt. Ltd. is an innovation holding company building the next generation of consumer brands, agricultural technology, and intelligent systems. Registered in Maharashtra, India, the company is dedicated to creating scalable, high-impact ventures.
    `,
    author: "BiovaCo Nexus Corporate Communications",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "2",
    slug: "q3-2026-financial-outlook",
    title: "BiovaCo Nexus Releases Q3 2026 Innovation Pipeline and Financial Outlook",
    date: "2026-06-15",
    category: "Company News",
    summary: "The company outlines its strategic roadmap for the upcoming quarter, highlighting investments in ag-tech and intelligent systems.",
    content: `
# BiovaCo Nexus Releases Q3 2026 Innovation Pipeline and Financial Outlook

**NAGPUR, INDIA — June 15, 2026** — BiovaCo Nexus Pvt. Ltd. today shared its forward-looking strategic roadmap and financial outlook for the third quarter of 2026, signaling strong growth and continued investment in core technological sectors.

The company's focus remains steadfast on expanding its innovation pipeline, specifically within agricultural technology (ag-tech) and intelligent systems.

"Our Q3 roadmap is aggressive and targeted," noted the executive board. "We are seeing unprecedented opportunities in integrating AI with traditional agricultural practices. Our upcoming ventures are designed to bridge the gap between rural farming capabilities and advanced data analytics."

### Strategic Focus Areas for Q3:
1. **Ag-Tech Expansion:** Rollout of pilot programs for precision farming algorithms in central India.
2. **Intelligent Systems Integration:** Upgrading the internal BiovaCo Nexus infrastructure to support fully automated, predictive market analytics for all subsidiary brands.
3. **Strategic Partnerships:** Finalizing key distribution partnerships to expand the reach of our consumer brands across Southeast Asia.

The company remains debt-free and expects a 45% increase in operational revenue driven by the successful launch of its early 2026 initiatives.

**About BiovaCo Nexus Pvt. Ltd.**
BiovaCo Nexus Pvt. Ltd. is an innovation holding company building the next generation of consumer brands, agricultural technology, and intelligent systems.
    `,
    author: "BiovaCo Nexus Investor Relations",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
  }
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
