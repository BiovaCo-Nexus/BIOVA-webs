import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PageHero } from "@/components/ui-custom/PageHero";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: "Press Release" | "Company News" | "Product Update" | "Media Mention";
  summary: string;
  content: string;
  image?: string;
  author: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export default function News() {
  const { data: newsArticles = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["news_articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        throw error;
      }

      return data as NewsArticle[];
    },
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BiovaCo Nexus News & Press Releases",
    description: "Latest news, press releases, and corporate updates from BiovaCo Nexus.",
    url: "https://biovaco.in/news",
    publisher: {
      "@type": "Organization",
      name: "BiovaCo Nexus",
      logo: {
        "@type": "ImageObject",
        url: "https://biovaco.in/logo.png"
      }
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: newsArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://biovaco.in/news/${article.slug}`,
        name: article.seo_title || article.title
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>News & Press | BiovaCo Nexus</title>
        <meta
          name="description"
          content="Read the latest news, press releases, and corporate announcements from BiovaCo Nexus."
        />
        <meta
          name="keywords"
          content="BiovaCo Nexus News, Press Releases, Corporate Updates, Company News"
        />
        <link rel="canonical" href="https://biovaco.in/news" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biovaco.in/news" />
        <meta property="og:title" content="News & Press | BiovaCo Nexus" />
        <meta
          property="og:description"
          content="Read the latest news, press releases, and corporate announcements from BiovaCo Nexus."
        />
        <meta property="og:image" content="https://biovaco.in/og-news.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BiovaCo Nexus" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://biovaco.in/news" />
        <meta name="twitter:title" content="News & Press | BiovaCo Nexus" />
        <meta
          name="twitter:description"
          content="Read the latest news, press releases, and corporate announcements from BiovaCo Nexus."
        />
        <meta name="twitter:image" content="https://biovaco.in/og-news.jpg" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <PageHero
        eyebrow="Media Center"
        title="News & Press"
        description="Official announcements, strategic updates, and media releases from BiovaCo Nexus."
      />

      <section className="border-b border-border bg-background pb-24 md:pb-32">
        <div className="container-x mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--navy)] border-r-transparent dark:border-[color:var(--green)] dark:border-r-transparent"></div>
            </div>
          ) : newsArticles.length === 0 ? (
             <FadeIn className="text-center py-20 border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">No articles have been published yet.</p>
             </FadeIn>
          ) : (
            <FadeInStagger className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles.map((article) => (
                <FadeInItem key={article.id}>
                  <article className="group flex h-full flex-col items-start">
                    <Link to={`/news/${article.slug}`} className="w-full">
                      {article.image ? (
                        <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted border border-border">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[color:var(--section)] border border-border flex items-center justify-center p-8 text-center">
                          <span className="font-display text-xl text-muted-foreground opacity-50">BiovaCo Nexus</span>
                        </div>
                      )}
                    </Link>
                    
                    <div className="flex items-center gap-3 text-xs mb-4">
                      <span className="font-semibold uppercase tracking-wider text-[color:var(--navy)] dark:text-[color:var(--green)]">
                        {article.category}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    
                    <h2 className="mb-3 font-display text-2xl font-medium tracking-tight text-foreground leading-snug transition-colors group-hover:text-[color:var(--navy)] dark:group-hover:text-[color:var(--green)]">
                      <Link to={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    
                    <p className="mb-5 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                      {article.summary}
                    </p>
                    
                    <Link 
                      to={`/news/${article.slug}`}
                      className="mt-auto inline-flex items-center text-sm font-medium text-foreground transition-colors group-hover:text-[color:var(--navy)] dark:group-hover:text-[color:var(--green)]"
                    >
                      Read article
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </article>
                </FadeInItem>
              ))}
            </FadeInStagger>
          )}
        </div>
      </section>
    </>
  );
}
