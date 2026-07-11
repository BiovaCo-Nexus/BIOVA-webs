import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui-custom/Section";
import { supabase } from "@/lib/supabase";

export function CareersPreview() {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("job_positions")
        .select("title, department, location, role_key")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .limit(4);

      if (!error && data) {
        setRoles(data);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-[color:var(--section)] border-y border-border">
      <div className="container-x py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <Eyebrow>Careers</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
              Join the team building what's next.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              We are selectively hiring across food science, engineering, artificial intelligence
              and operations — for the ventures we operate today and the ones we will launch next.
            </p>
            <Link
              to="/careers"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--green-deep)] hover:text-[color:var(--navy)] dark:text-[color:var(--green)] transition-colors"
            >
              View all opportunities <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-background">
            {roles.length > 0 ? (
              <div className="divide-y divide-border">
                {roles.map((r) => (
                  <Link
                    key={r.role_key}
                    to={`/careers/${r.role_key}`}
                    className="group flex items-center justify-between gap-6 p-6 transition-colors hover:bg-[color:var(--section)]"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {r.department}
                      </div>
                      <div className="mt-1 font-display text-xl text-foreground">{r.title}</div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden text-sm text-muted-foreground md:inline">
                        {r.location}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--green-deep)] dark:group-hover:text-[color:var(--green)]" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-[16rem] flex-col items-center justify-center p-12 text-center">
                <div className="font-display text-2xl text-foreground">No open positions</div>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  We are not actively recruiting at this time. You are welcome to submit your
                  profile for future consideration.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
