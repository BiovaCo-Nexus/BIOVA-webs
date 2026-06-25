import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PageHero } from "@/components/ui-custom/PageHero";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsArticle } from "./news";

export default function Topic() {
  const { tag } = useParams<{ tag: string }>();
  
  // Format the tag for display (e.g., "press-release" -> "Press Release")
  const displayTag = tag 
    ? tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  const { data: articles = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["topic_articles", tag],
    queryFn: async () => {
      if (!tag) return [];

      // We want to search if the tag exists in seo_keywords, title, or category
      // Supabase 'or' syntax allows us to check multiple fields
      const searchQuery = `%${displayTag}%`;
      
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("is_published", true)
        .or(`category.ilike.${searchQuery},seo_keywords.ilike.${searchQuery},title.ilike.${searchQuery},content.ilike.${searchQuery}`)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching topic articles:", error);
        throw error;
      }

      return data as NewsArticle[];
    },
    enabled: !!tag
  });

  const currentUrl = `https://biovaco.in/topic/${tag}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `BiovaCo Nexus News on ${displayTag}`,
    description: `Read all verified news, updates, and announcements regarding ${displayTag} from BiovaCo Nexus.`,
    url: currentUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
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
        <title>BiovaCo News regarding {displayTag} | BiovaCo Nexus</title>
        <meta
          name="description"
          content={`Explore all official BiovaCo Nexus announcements, press releases, and verified news related to ${displayTag}.`}
        />
        <meta
          name="keywords"
          content={`BiovaCo ${displayTag}, BiovaCo Nexus ${displayTag}, ${displayTag} news, BiovaCo press release`}
        />
        <link rel="canonical" href={currentUrl} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={`BiovaCo News regarding ${displayTag} | BiovaCo Nexus`} />
        <meta
          property="og:description"
          content={`Explore all official BiovaCo Nexus announcements, press releases, and verified news related to ${displayTag}.`}
        />
        <meta property="og:image" content="https://biovaco.in/og-news.jpg" />
        <meta property="og:site_name" content="BiovaCo Nexus" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`BiovaCo News regarding ${displayTag}`} />
        <meta
          name="twitter:description"
          content={`Explore all official BiovaCo Nexus announcements, press releases, and verified news related to ${displayTag}.`}
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <PageHero
        eyebrow="Topic Hub"
        title={displayTag}
        description={`Verified news, press releases, and updates regarding ${displayTag}.`}
      />

      <section className="border-b border-border bg-background pb-24 md:pb-32">
        <div className="container-x mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--navy)] border-r-transparent dark:border-[color:var(--green)] dark:border-r-transparent"></div>
            </div>
          ) : articles.length === 0 ? (
             <FadeIn className="text-center py-20 border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">No articles found for "{displayTag}".</p>
                <Link to="/news" className="mt-4 inline-block text-[color:var(--navy)] dark:text-[color:var(--green)] hover:underline">
                  Return to all news
                </Link>
             </FadeIn>
          ) : (
            <FadeInStagger className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
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
