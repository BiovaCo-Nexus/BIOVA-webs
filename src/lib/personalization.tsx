import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Category = 'food' | 'agri' | 'biomed' | 'ai' | 'consumer' | 'general';

interface PersonalizationState {
  scores: Record<Category, number>;
  recordInterest: (category: Category) => void;
  getTopInterest: () => Category;
}

export const usePersonalization = create<PersonalizationState>()(
  persist(
    (set, get) => ({
      scores: {
        food: 0,
        agri: 0,
        biomed: 0,
        ai: 0,
        consumer: 0,
        general: 0,
      },
      recordInterest: (category) =>
        set((state) => ({
          scores: {
            ...state.scores,
            [category]: state.scores[category] + 1,
          },
        })),
      getTopInterest: () => {
        const { scores } = get();
        // Find the category with the highest score
        let maxScore = 0;
        let topCategory: Category = 'general';
        
        Object.entries(scores).forEach(([cat, score]) => {
          if (score > maxScore) {
            maxScore = score;
            topCategory = cat as Category;
          }
        });
        
        return topCategory;
      },
    }),
    {
      name: 'biovaco-personalization', // stores in localStorage
    }
  )
);

export const personalizedContent: Record<Category, { heroTitle: React.ReactNode; heroSubtitle: string }> = {
  general: {
    heroTitle: (
      <>
        Innovating <br />
        <span className="text-[color:var(--navy)] dark:text-foreground">Food</span>,{" "}
        <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
          Agriculture
        </span>{" "}
        <br />
        &amp; Technology.
      </>
    ),
    heroSubtitle: "BiovaCo Nexus builds, launches and scales the next generation of consumer brands, agricultural innovation and technology ventures — designed for the long term."
  },
  food: {
    heroTitle: (
      <>
        The future of <br />
        <span className="text-[color:var(--navy)] dark:text-foreground">Flavor</span> &amp;{" "}
        <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
          Food
        </span>{" "}
        <br />
        Innovation.
      </>
    ),
    heroSubtitle: "Our ventures are revolutionizing culinary experiences and sustainable dining. Discover Cravora and our vision for the future of food."
  },
  agri: {
    heroTitle: (
      <>
        Cultivating <br />
        <span className="text-[color:var(--navy)] dark:text-foreground">Agri-tech</span>{" "}
        <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
          Ecosystems
        </span>{" "}
        <br />
        Worldwide.
      </>
    ),
    heroSubtitle: "We focus on precision farming, sustainable supply chains, and global food security through advanced agricultural investments."
  },
  biomed: {
    heroTitle: (
      <>
        Advancing <br />
        <span className="text-[color:var(--navy)] dark:text-foreground">Biomedical</span> &amp;{" "}
        <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
          Health
        </span>{" "}
        <br />
        Solutions.
      </>
    ),
    heroSubtitle: "Investing in life-saving technologies, innovative bio-materials, and cutting-edge health solutions for the next generation."
  },
  ai: {
    heroTitle: (
      <>
        Building <br />
        <span className="text-[color:var(--navy)] dark:text-foreground">Intelligent</span>{" "}
        <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
          Systems
        </span>{" "}
        <br />
        &amp; AI.
      </>
    ),
    heroSubtitle: "From machine learning to advanced automation, we integrate real Artificial Intelligence into foundational ventures."
  },
  consumer: {
    heroTitle: (
      <>
        Reimagining <br />
        <span className="text-[color:var(--navy)] dark:text-foreground">Modern</span>{" "}
        <span className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] italic font-light">
          Brands
        </span>{" "}
        <br />
        &amp; Retail.
      </>
    ),
    heroSubtitle: "We build and scale bold Direct-to-Consumer brands that perfectly align with rapidly evolving market demands."
  }
};
