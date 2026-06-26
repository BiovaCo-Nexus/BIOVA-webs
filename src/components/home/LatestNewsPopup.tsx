import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { X, ArrowRight, Bell } from "lucide-react";
import type { NewsArticle } from "@/routes/news";

export function LatestNewsPopup() {
  const [isVisible, setIsVisible] = useState(false);

  const { data: latestNews } = useQuery<NewsArticle | null>({
    queryKey: ["latest_news_popup"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // No rows found
        console.error("Error fetching latest news for popup:", error);
        return null;
      }

      return data as NewsArticle;
    },
  });

  useEffect(() => {
    if (latestNews) {
      // Check if user has already dismissed this specific news item
      const dismissed = localStorage.getItem(`dismissed_news_${latestNews.slug}`);
      
      if (!dismissed) {
        // Add a slight delay before showing the popup for better UX
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [latestNews]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (latestNews) {
      localStorage.setItem(`dismissed_news_${latestNews.slug}`, "true");
    }
  };

  if (!latestNews) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100%-3rem)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95 pointer-events-none"
      }`}
    >
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 backdrop-blur-2xl p-6 shadow-2xl ring-1 ring-white/10 dark:bg-[#020617]/60 dark:ring-white/5">
        {/* Glow Effect */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[color:var(--navy)]/10 blur-3xl pointer-events-none dark:bg-[color:var(--green)]/10"></div>

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--green)]"></span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              New from BiovaCo
            </span>
          </div>
          
          <button
            onClick={handleDismiss}
            className="group rounded-full p-1.5 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5 transition-transform group-hover:rotate-90 duration-300" />
          </button>
        </div>

        <div className="relative z-10">
          <h3 className="font-display text-lg font-medium tracking-tight text-foreground leading-snug mb-2 pr-4">
            {latestNews.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-5">
            {latestNews.summary}
          </p>
          
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <span className="text-xs font-medium text-muted-foreground">
              {new Date(latestNews.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            <Link
              to={`/news/${latestNews.slug}`}
              onClick={handleDismiss}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--navy)] transition-colors hover:text-[color:var(--navy-deep)] dark:text-[color:var(--green)] dark:hover:text-[color:var(--green-deep)]"
            >
              Read full story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
