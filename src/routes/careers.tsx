import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";
import { Helmet } from "react-helmet-async";

// We will derive departments dynamically from the database
// const departments = [ ... ];

export default function Careers() {
  const navigate = useNavigate();

  const [jobRoles, setJobRoles] = useState<any[]>([]);
  const [openings, setOpenings] = useState<any[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobRoles = async () => {
      const { data, error } = await supabase
        .from("job_positions")
        .select("role_key, title, department, location, job_type, description")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching job roles:", error);
      } else {
        setJobRoles(data || []);

        // Populate openings for the UI
        const fetchedOpenings = (data || []).map((job) => ({
          title: job.title,
          dept: job.department,
          loc: job.location,
          type: job.job_type,
          desc: job.description,
          key: job.role_key,
        }));
        setOpenings(fetchedOpenings);

        // Derive unique departments dynamically
        const uniqueDepartments = Array.from(new Set(fetchedOpenings.map((o) => o.dept))).filter(
          Boolean,
        ) as string[];
        setDepartments(uniqueDepartments);
      }
    };

    fetchJobRoles();
  }, []);

  const handleRoleSelect = (roleKey: string) => {
    navigate(`/careers/${roleKey}`);
  };

  // Dynamic SEO Computation
  const uniqueLocations = Array.from(new Set(openings.map((o) => o.loc))).filter(Boolean);
  const locationText = uniqueLocations.length > 0 ? ` in ${uniqueLocations.join(" & ")}` : "";
  const pageTitle = `Careers at BiovaCo | Open Positions${locationText}`;
  const pageDescription =
    openings.length > 0
      ? `BiovaCo Nexus is hiring! Explore ${openings.length} open positions in ${uniqueLocations.join(", ")} across ${departments.slice(0, 4).join(", ")}. Submit your spontaneous application today and build the future with us.`
      : "Join BiovaCo Nexus. We are an innovation house that runs real brands and ships real products. Send us your spontaneous application today to be considered for future openings.";

  // Generate highly optimized dynamic keywords
  const baseKeywords = [
    "BiovaCo Nexus careers",
    "startup jobs India",
    "food innovation jobs",
    "agriculture tech jobs",
    "spontaneous application",
  ];
  const dynamicKeywords = openings.flatMap((o) => [
    `${o.title} jobs`,
    `${o.title} in ${o.loc}`,
    `${o.dept} roles`,
  ]);
  const keywordsText = Array.from(new Set([...baseKeywords, ...dynamicKeywords])).join(", ");

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "https://biovaco.in/careers";

  const today = new Date();
  const validThroughDate = new Date(today.setMonth(today.getMonth() + 3)).toISOString().split("T")[0];

  const jobSchemas = openings.map((o) => ({
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: o.title,
    description: o.desc || `Join BiovaCo Nexus as a ${o.title} in the ${o.dept} department.`,
    identifier: {
      "@type": "PropertyValue",
      name: "BiovaCo Nexus",
      value: o.key,
    },
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: validThroughDate,
    employmentType:
      o.type === "Full-time"
        ? "FULL_TIME"
        : o.type === "Part-time"
          ? "PART_TIME"
          : o.type === "Contract"
            ? "CONTRACTOR"
            : "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: "BiovaCo Nexus Private Limited",
      sameAs: "https://biovaco.in",
      logo: "https://biovaco.in/Logo.png",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "BiovaCo Nexus HQ",
        addressLocality: o.loc.split(",")[0],
        addressRegion: o.loc.split(",")[1] ? o.loc.split(",")[1].trim() : "India",
        postalCode: "444709",
        addressCountry: "IN",
      },
    },
  }));

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywordsText} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://biovaco.in/og-careers.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://biovaco.in/og-careers.jpg" />

        <link rel="canonical" href="https://biovaco.in/careers" />

        {/* Dynamic Schema.org for Google Jobs API */}
        {jobSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build the{" "}
            <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
              future
            </span>{" "}
            with us.
          </>
        }
        description="Join an innovation house that runs real brands, ships real products, and is engineered to launch many more. Six disciplines. One mission."
      />

      {departments.length > 0 && (
        <section className="border-b border-border">
          <div className="container-x py-20">
            <FadeIn>
              <Eyebrow>Departments</Eyebrow>
            </FadeIn>
            <FadeInStagger className="mt-8 flex flex-wrap gap-3">
              {departments.map((d) => (
                <FadeInItem key={d}>
                  <div className="group flex items-center justify-center rounded-2xl border border-border bg-[color:var(--section)] px-6 py-4 transition-colors hover:border-[color:var(--green)] hover:bg-background">
                    <span className="font-display text-lg tracking-wide text-foreground group-hover:text-[color:var(--green-deep)] dark:group-hover:text-[color:var(--green)]">
                      {d}
                    </span>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      <section className="bg-[color:var(--section)] border-b border-border">
        <div className="container-x py-24 md:py-32">
          <FadeIn>
            <Eyebrow>Open positions</Eyebrow>
          </FadeIn>
          <FadeIn className="mt-12 overflow-hidden rounded-3xl border border-border bg-background">
            {openings.length > 0 ? (
              <div className="divide-y divide-border">
                {openings.map((o) => (
                  <div
                    key={o.title}
                    onClick={() => handleRoleSelect(o.key)}
                    className="cursor-pointer group grid items-center gap-4 p-6 transition-colors hover:bg-[color:var(--section)] md:grid-cols-[2fr_1fr_1fr_auto]"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {o.dept}
                      </div>
                      <div className="mt-1 font-display text-xl text-foreground group-hover:text-[color:var(--green-deep)] dark:group-hover:text-[color:var(--green)] transition-colors">
                        {o.title}
                      </div>
                      {o.desc && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 pr-4">
                          {o.desc}
                        </p>
                      )}
                    </div>
                    <div className="text-sm font-medium text-foreground">{o.loc}</div>
                    <div className="text-sm text-muted-foreground">{o.type}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="font-display text-2xl text-foreground">No open positions</div>
                <p className="mt-3 max-w-md text-muted-foreground">
                  We are currently not actively hiring, but we are always open to connecting with
                  exceptional talent.
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
