import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";

const SYSTEM_PROMPT = `You are Nira, the official Corporate AI Assistant for BiovaCo Nexus Private Limited.

CRITICAL DIRECTIVES:
1. TONE & STYLE: You must strictly maintain a highly formal, professional, and authoritative corporate tone at all times. Do not use colloquialisms, emojis, or overly enthusiastic language. Responses must be concise, articulate, and business-appropriate.
2. BOUNDARY ENFORCEMENT: You are strictly limited to discussing BiovaCo Nexus, its founders, ventures, products, and related corporate information. If a user asks a question unrelated to BiovaCo Nexus, you MUST politely decline to answer by stating: "I am specifically programmed to assist with inquiries related to BiovaCo Nexus. I cannot provide information on other topics."
3. NO HALLUCINATIONS: Base all your answers ONLY on the Knowledge Base provided below. Do not invent information.

# KNOWLEDGE BASE

**Corporate Identity:** BiovaCo Nexus Private Limited is a forward-thinking innovation holding company from India. We build, launch, and scale the next generation of consumer brands, agricultural innovation, and technology ventures — designed for the long term.
**Mission:** To build a portfolio of category-defining brands across food, agriculture, and technology — engineered with scientific rigor and operated for the long term.
**Vision:** A globally respected innovation house from India, whose ventures shape how the next generation eats, farms, and computes.
**Innovation Philosophy:** Build slowly. Ship deliberately. Compound forever.

**Founder Journey & Leadership:** 
BiovaCo began with a simple conviction: India deserves a generation of homegrown brands built with the same rigor and patience as the most respected global companies. Started with food because flavour is universal and unforgiving. Structured so new ventures can be incubated with shared infrastructure, capital discipline, and scientific depth.
1. Nakul Mundhada (Co-Founder) - Portfolio: https://nakulmundhada.live
2. Richa Rajan (Founder) - Portfolio: https://richarajan.info

**Future Roadmap:**
- 2026: Foundation (Incorporated as a multi-brand innovation holding company) & Cravora Launch.
- 2027-2028: Agri & Biomed Pilots (Agricultural systems and biomed consumer applications).
- 2028+: Portfolio expansion (Continuous incubation of new ventures).

**Innovation Lab & Research Areas (Where disciplines meet):**
The BiovaCo innovation lab is the shared engine behind every venture — a portfolio of disciplines, infrastructure and research that compounds across brands.
1. Food Innovation: Flavour systems, ingredient R&D, novel formats and modern consumer food brands.
2. Agricultural Technology: Post-harvest tech, traceability, agronomic data and resilient supply systems.
3. Biomed Consumers Application: Custom hardware, sensors and edge devices for monitoring and automation.
4. Artificial Intelligence: Applied AI across consumer products, agricultural decision-making and retail.
5. Consumer Products: Designing branded products that win shelves and earn repeat purchase.
6. Research & Development: Shared R&D infrastructure that compounds across every BiovaCo venture.

**Innovation Pipeline (A continuous ladder of ventures):**
- LIVE: Cravora (Flagship food brand. In market.)
- INCUBATION: Agritech Pilot (Soil-to-shelf traceability platform — early development.)
- CONCEPT: Biomed AI (Edge devices for food and agricultural workflows.)
- CONCEPT: Next Consumer Brand (A second consumer venture is in early formulation.)

**Active Portfolio Ventures - Cravora:**
- Overview: The inaugural consumer venture in the food innovation track (Venture N° 01). A modern Indian food brand engineering bold, dust-based flavour systems for the modern Indian palate.
- Story & Science: Exists for the moment between hunger and habit. Built around a flavour curve: opening note, mid-palate hit, finish that lingers. Powered by ingredient sourcing, flavour mapping, shelf-life engineering, and manufacturing partnerships designed for scale.
- Slogan: "Dust The Crave."
- Current Product Line: 
  1. Mango-Chili Dust (Flavour Dust): Sweet heat, slow build.
  2. Pepper-Lime Blast (Flavour Dust): Sharp citrus, black pepper warmth.
  3. Flavoured Makhana (Snack): Roasted, dusted, lightly addictive.
  4. Flavoured Popcorn (Snack): Air-popped, boldly seasoned.
- Retail & Distribution: Modern trade, premium general trade, e-commerce, quick-commerce listings. Expanding super-stockist footprint across India.

**Impact Metrics:**
- 1 Active venture (Cravora)
- 4+ Products in market (Flavoured formats)
- 5 Innovation areas (Food, Agri, AI, Biomed, Consumer)
- 100% Future growth potential (Pipeline of ventures)

**Partners & Collaborations:** We build with partners who share a long horizon: Distributors, Manufacturing Partners, Research Institutions, Investors, and Incubators.

**Careers:** We hire across food science, engineering, AI, and operations. Examples of roles: Food Technology Intern, Graphic Design Intern, Digital Marketing Intern, Business Development Intern. Direct users to the Careers page to see all openings.

**Corporate Contact Information:**
- Email: hello@biovaco.in
- Phone: +91 9226595332
- Registered Office: H. No. 72, Bhagchand Nagar, Dhamangaon Rly, MH 444701
- Business Office: 1st Floor, RBU, TBI, Katol Rd, Bupeshnagar, Nagpur, MH 440013

**Routing Instructions:**
- For investment, partnerships, or trade inquiries, direct the user to the Contact page.
- For employment opportunities, direct the user to the Careers page.`;

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello. I am Nira, your official site assistant for BiovaCo Nexus. How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [liveJobsContext, setLiveJobsContext] = useState("Loading current job openings...");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("job_positions")
        .select("title, department, location, job_type")
        .eq("is_active", true);

      if (error) {
        setLiveJobsContext("Currently unable to fetch live job openings.");
      } else if (data && data.length > 0) {
        const jobsList = data.map((j) => `- ${j.title} (${j.department} | ${j.location} | ${j.job_type})`).join("\n");
        setLiveJobsContext(jobsList);
      } else {
        setLiveJobsContext("There are currently no active job openings.");
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) {
        // Mock response if no API key
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text: "I am currently running in demo mode because the OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file!",
            },
          ]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.href, // Optional, for including your app on openrouter.ai rankings
          "X-Title": "BiovaCo Nexus", // Optional, shows in rankings
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct", // OpenRouter model ID
          messages: [
            { role: "system", content: `${SYSTEM_PROMPT}\n\n**LIVE JOB OPENINGS (Real-time from Database):**\n${liveJobsContext}` },
            ...messages.slice(1).map(m => ({ 
              role: m.role === "ai" ? "assistant" : "user", 
              content: m.text 
            })),
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "API Error");
      }

      const text = data.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "ai", text }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `I encountered an error connecting to OpenRouter: ${error.message}. Please check the console for details.` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Greeting Tooltip */}
      <div
        className={`fixed bottom-[28px] right-[88px] z-50 flex items-center rounded-xl border border-border bg-background px-5 py-4 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          !isOpen && showGreeting ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0"
        }`}
      >
        <button
          onClick={() => setShowGreeting(false)}
          className="absolute -left-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ff3b30] text-white shadow-sm transition-transform hover:scale-110"
        >
          <X className="h-3 w-3" strokeWidth={3} />
        </button>
        <div className="flex flex-col text-left">
          <span className="text-[15px] text-foreground font-medium">Hey! I am Nira... Your</span>
          <span className="text-[15px] text-foreground font-medium">Site Assistant.</span>
        </div>
        {/* Right Pointer Arrow */}
        <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-border bg-background"></div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setShowGreeting(false);
        }}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-background border border-border shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open AI Assistant"
      >
        <img src="/Icon.png" alt="Nira AI" className="h-full w-full object-cover" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-border bg-background/85 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-12 scale-90 opacity-0"}`}
        style={{ height: "550px", maxHeight: "calc(100vh - 6rem)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-[color:var(--section)] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background shadow-sm">
              <img src="/Icon.png" alt="BiovaCo AI" className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-display text-sm font-medium text-foreground">Nira - BiovaCo Nexus</h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--green)] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--green)]"></span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-muted-foreground transition-all hover:bg-black/5 hover:text-foreground hover:rotate-90 dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm ${m.role === "user" ? "bg-[color:var(--green-deep)] text-white dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]" : "bg-background border border-border"}`}
              >
                {m.role === "user" ? <User className="h-4 w-4" /> : <img src="/Icon.png" alt="AI" className="h-full w-full object-cover" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[color:var(--green-deep)] text-white rounded-tr-sm shadow-md dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
                    : "bg-muted text-foreground rounded-tl-sm border border-border"
                }`}
              >
                {m.role === "ai" ? (
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-2 space-y-1.5" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-2 space-y-1.5" {...props} />,
                      li: ({ node, ...props }) => <li className="text-sm leading-relaxed" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed text-sm" {...props} />,
                      a: ({ node, ...props }) => (
                        <a
                          className="font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)] hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {m.text}
                  </ReactMarkdown>
                ) : (
                  <span className="whitespace-pre-wrap">{m.text}</span>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background border border-border shadow-sm">
                <img src="/Icon.png" alt="AI" className="h-full w-full object-cover" />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-border bg-muted px-5 py-4 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="border-t border-border bg-background p-4"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about BiovaCo..."
              className="w-full rounded-full border border-border bg-muted/50 py-3 pl-4 pr-12 text-sm outline-none transition-all focus:border-[color:var(--green)] focus:bg-background focus:shadow-[0_0_0_4px_rgba(var(--green-rgb),0.1)]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--navy)] text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)]"
            >
              <Send className="h-4 w-4 -ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
