import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, User, Share2, Link2, Twitter, Linkedin, Facebook } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { FadeIn } from "@/components/ui-custom/FadeIn";
import type { NewsArticle } from "./news";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const { data: article, isLoading, error } = useQuery<NewsArticle | null>({
    queryKey: ["news_article", slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error("Error fetching article:", error);
        throw error;
      }

      return data as NewsArticle;
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[color:var(--green)] border-r-transparent"></div>
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/news" replace />;
  }

  const currentUrl = `https://biovaco.in/news/${article.slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoTitle = article.seo_title || `${article.title} | BiovaCo Nexus News`;
  const seoDescription = article.seo_description || article.summary;
  const seoKeywords = article.seo_keywords || "BiovaCo Nexus, News, Press Release, Updates";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: seoTitle,
      image: [article.image || "https://biovaco.in/og-news.jpg"],
      datePublished: new Date(article.date).toISOString(),
      dateModified: new Date(article.date).toISOString(),
      author: [{
        "@type": "Person",
        name: article.author,
        url: "https://biovaco.in"
      }],
      publisher: {
        "@type": "Organization",
        name: "BiovaCo Nexus",
        logo: {
          "@type": "ImageObject",
          url: "https://biovaco.in/logo.png"
        }
      },
      description: seoDescription,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": currentUrl
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://biovaco.in/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "News & Press",
          item: "https://biovaco.in/news"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.category,
          item: `https://biovaco.in/topic/${article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        },
        {
          "@type": "ListItem",
          position: 4,
          name: seoTitle,
          item: currentUrl
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={article.image || "https://biovaco.in/og-news.jpg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BiovaCo Nexus" />
        <meta property="article:published_time" content={new Date(article.date).toISOString()} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={article.image || "https://biovaco.in/og-news.jpg"} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen pt-32 pb-24 bg-background border-b border-border">
        <FadeIn className="container-x mx-auto max-w-4xl">
          <Link
            to="/news"
            className="group mb-12 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to News
          </Link>

          <article>
            <header className="mb-10 border-b border-border pb-10">
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
                <span className="rounded-full bg-[color:var(--navy)] px-3 py-1 font-medium text-white dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              
              <h1 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-5xl leading-tight mb-6">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {article.summary}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{article.author}</p>
                    <p className="text-xs">BiovaCo Nexus</p>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mr-2">Share</span>
                  
                  <button 
                    onClick={handleCopyLink}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    title="Copy Link"
                  >
                    {copied ? <span className="text-xs font-bold text-[color:var(--green)]">Copied</span> : <Link2 className="h-4 w-4" />}
                  </button>
                  
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-[#1DA1F2] hover:text-[#1DA1F2]"
                    title="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>

                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>

                  <a 
                    href={`https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-[#25D366] hover:text-[#25D366]"
                    title="Share on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </header>

            {article.image && (
              <div className="mb-16 aspect-video w-full overflow-hidden rounded-2xl bg-muted border border-border">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-medium prose-a:text-[color:var(--navy)] dark:prose-a:text-[color:var(--green)] hover:prose-a:text-[color:var(--navy-deep)] dark:hover:prose-a:text-[color:var(--green-deep)]">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{article.content}</ReactMarkdown>
            </div>
          </article>
        </FadeIn>
      </div>
    </>
  );
}
