import { useState, useEffect } from "react";
import { Eyebrow } from "@/components/ui-custom/Section";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";
import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

const products = [
  { name: "Mango-Chili Dust", line: "Flavour Dust", note: "Sweet heat, slow build." },
  { name: "Pepper-Lime Blast", line: "Flavour Dust", note: "Sharp citrus, black pepper warmth." },
  { name: "Flavoured Makhana", line: "Snack", note: "Roasted, dusted, lightly addictive." },
  { name: "Flavoured Popcorn", line: "Snack", note: "Air-popped, boldly seasoned." },
];

const fallbackReviews = [
  { name: "Aditi S.", location: "Mumbai", text: "The Mango-Chili dust on my evening makhana has become a daily ritual. Absolutely addictive and perfectly balanced.", rating: 5 },
  { name: "Rahul V.", location: "Bangalore", text: "Tried the Pepper-Lime blast. It's the exact punch my homemade popcorn needed. Real ingredients make a huge difference.", rating: 5 },
  { name: "Priya M.", location: "Delhi", text: "Finally an Indian brand that understands the science of flavor. It doesn't taste artificial at all. Highly recommended.", rating: 5 },
];

export default function Cravora() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      // Trying to fetch from 'reviews' table. If it doesn't exist yet, it will quietly fail and use fallbacks.
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (data && data.length > 0 && !error) {
        setReviews(data);
      } else {
        setReviews(fallbackReviews);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cravora | A BiovaCo Nexus Venture</title>
        <meta
          name="description"
          content="A modern Indian food brand engineering bold, dust-based flavour systems for snacks people actually crave. Built and operated by BiovaCo Nexus."
        />
        <meta
          name="keywords"
          content="Cravora, BiovaCo Nexus, Flavoured Makhana, Popcorn, Flavour Dust, Indian food brand, FMCG"
        />
        <link rel="canonical" href="https://biovaco.in/cravora" />
      </Helmet>

      <section className="relative overflow-hidden border-b border-border bg-[color:var(--navy-deep)] pt-40 pb-24 text-white md:pt-48 md:pb-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_20%_30%,var(--green),transparent_50%)]"
        />
        <FadeIn className="container-x relative">
          <Eyebrow>A BiovaCo Venture · N° 01</Eyebrow>
          <div className="mt-8 mb-6">
            <img src="/Cravora_logo.png" alt="Cravora" className="h-24 md:h-32 object-contain" />
          </div>
          <p className="mt-6 font-display text-2xl italic font-light text-[color:var(--green)]">
            Dust The Crave.
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            A modern Indian food brand engineering bold, dust-based flavour systems for snacks
            people actually crave. Built and operated by BiovaCo Nexus.
          </p>
        </FadeIn>
      </section>

      <section className="border-b border-border">
        <FadeIn className="container-x py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow>The story</Eyebrow>
              <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
                Flavour, engineered.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Cravora exists for the moment between hunger and habit — when what you reach for has
                to feel right on the first bite. Every Cravora dust is built around a flavour curve:
                an opening note, a mid-palate hit, and a finish that lingers just long enough.
              </p>
              <p>
                Behind each product is the BiovaCo food science track: ingredient sourcing, flavour
                mapping, shelf-life engineering and manufacturing partnerships designed for scale
                from day one.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-border bg-[color:var(--section)]">
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Products</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              The current line.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
            {products.map((p, i) => (
              <FadeInItem key={p.name}>
                <div
                  className="group relative flex aspect-[5/4] flex-col justify-between h-full bg-background p-8 transition-colors hover:bg-[color:var(--section)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {p.line}
                    </span>
                    <span className="font-display text-xs tabular-nums text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-foreground">{p.name}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
                    <div className="mt-6 h-px w-8 bg-[color:var(--green)] transition-all group-hover:w-20" />
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              What the market says.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <FadeInItem key={i}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-[color:var(--section)] p-8">
                  <div>
                    <div className="flex gap-1 text-[#FFBD2E]">
                      {[...Array(r.rating || 5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-6 text-lg leading-relaxed text-foreground">"{r.text}"</p>
                  </div>
                  <div className="mt-8">
                    <div className="font-display text-lg text-foreground">{r.name}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-widest mt-1">
                      {r.location}
                    </div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section>
        <div className="container-x py-24 md:py-32">
          <FadeInStagger className="grid gap-12 md:grid-cols-3">
            {[
              {
                t: "Retail opportunities",
                d: "Modern trade, premium general trade, e-commerce and quick-commerce listings.",
              },
              {
                t: "Distribution network",
                d: "Expanding super-stockist and distributor footprint across India.",
              },
              {
                t: "Contact Cravora",
                d: "For trade, retail, partnership and enterprise enquiries — reach the Cravora team via BiovaCo.",
              },
            ].map((b) => (
              <FadeInItem key={b.t}>
                <div className="border-t border-border pt-6 h-full">
                  <div className="font-display text-xl text-foreground">{b.t}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>
    </>
  );
}
