import { useState } from "react";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";





const inquiries = ["General", "Business", "Partnership", "Career", "Press / Other"] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">talk</span>.</>}
        description="Reach the BiovaCo team for general, business, partnership or career enquiries. We read every message."
      />

      <section>
        <div className="container-x py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-10">
              <div>
                <Eyebrow>Reach us</Eyebrow>
                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</div>
                      <a href="mailto:hello@biovaco.in" className="font-display text-lg text-foreground hover:text-[color:var(--green-deep)]">
                        hello@biovaco.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Phone</div>
                      <a href="tel:+919226595332" className="font-display text-lg text-foreground hover:text-[color:var(--green-deep)]">
                        +91 9226595332
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Registered office</div>
                      <div className="mt-1 text-sm leading-relaxed text-foreground">
                        BiovaCo Nexus Pvt. Ltd.<br />
                        H. No. 72, Bhagchand Nagar, Dhamangaon Railway,<br />
                        Dhamangaon Rly, Maharashtra – 444701
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <div>
              {submitted ? (
                <div className="flex h-full min-h-[400px] flex-col items-start justify-center rounded-3xl border border-border bg-[color:var(--section)] p-10">
                  <Eyebrow>Received</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl text-foreground">Thank you.</h3>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Your message has reached the BiovaCo team. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="rounded-3xl border border-border bg-background p-8 md:p-10"
                >
                  <div className="grid gap-6">
                    <Field label="Inquiry type">
                      <select className="w-full bg-transparent py-2 text-foreground outline-none">
                        {inquiries.map((i) => <option key={i}>{i}</option>)}
                      </select>
                    </Field>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Full name"><input required className="w-full bg-transparent py-2 outline-none" /></Field>
                      <Field label="Organisation"><input className="w-full bg-transparent py-2 outline-none" /></Field>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Email"><input required type="email" className="w-full bg-transparent py-2 outline-none" /></Field>
                      <Field label="Phone"><input className="w-full bg-transparent py-2 outline-none" /></Field>
                    </div>
                    <Field label="Message">
                      <textarea required rows={5} className="w-full resize-none bg-transparent py-2 outline-none" />
                    </Field>
                  </div>
                  <button
                    type="submit"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)]"
                  >
                    Send message <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block border-b border-border pb-2 transition-colors focus-within:border-[color:var(--green)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
