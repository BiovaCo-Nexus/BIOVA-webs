import { useState } from "react";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight, Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";

const departments = [
  "Food Innovation",
  "Marketing",
  "Business Development",
  "Operations",
  "Engineering",
  "Research",
];

const openings: any[] = []; // Currently no active open positions shown by default, can be populated

export default function Careers() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let resumeUrl = null;
      
      // Upload resume if provided
      if (resume) {
        const fileExt = resume.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `resumes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, resume);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error('Failed to upload resume');
        }

        const { data } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);

        resumeUrl = data.publicUrl;
      }

      // Insert into job_applications table
      const { error } = await supabase
        .from('job_applications')
        .insert([
          { 
            full_name: name, 
            email: email, 
            phone: phone, 
            role: role, 
            cover_letter: message, 
            resume_url: resumeUrl 
          }
        ]);

      if (error) {
        console.error('Application submission error:', error);
        throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Unexpected error:', err);
      alert(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Build the <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">future</span> with us.</>}
        description="Join an innovation house that runs real brands, ships real products, and is engineered to launch many more. Six disciplines. One mission."
      />

      <section className="border-b border-border">
        <div className="container-x py-20">
          <FadeIn>
            <Eyebrow>Departments</Eyebrow>
          </FadeIn>
          <FadeInStagger className="mt-8 flex flex-wrap gap-2">
            {departments.map((d) => (
              <FadeInItem key={d}>
                <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">
                  {d}
                </span>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="bg-[color:var(--section)] border-b border-border">
        <div className="container-x py-24 md:py-32">
          
          {/* Open Positions Summary */}
          <FadeIn>
            <Eyebrow>Open positions</Eyebrow>
          </FadeIn>
          <FadeIn className="mt-12 overflow-hidden rounded-3xl border border-border bg-background">
            {openings.length > 0 ? (
              <div className="divide-y divide-border">
                {openings.map((o) => (
                  <div key={o.title} className="group grid items-center gap-4 p-6 transition-colors hover:bg-[color:var(--section)] md:grid-cols-[1fr_1fr_1fr_auto]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{o.dept}</div>
                      <div className="mt-1 font-display text-xl text-foreground">{o.title}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{o.loc}</div>
                    <div className="text-sm text-muted-foreground">{o.type}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="font-display text-2xl text-foreground">No open positions</div>
                <p className="mt-3 max-w-md text-muted-foreground">We are currently not actively hiring, but we are always open to connecting with exceptional talent.</p>
              </div>
            )}
          </FadeIn>

          {/* Application Form */}
          <FadeIn className="mt-24">
            <Eyebrow>Spontaneous Application</Eyebrow>
            <div className="mt-8 grid gap-16 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <h3 className="font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
                  Send us your story.
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  We're always interested in people who think deeply about food, agriculture or technology and want to spend a decade building.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Drop your details below and if there's a match with our upcoming ventures, our talent team will reach out.
                </p>
              </div>
              
              <div>
                {submitted ? (
                  <div className="flex h-full min-h-[400px] flex-col items-start justify-center rounded-3xl border border-border bg-background p-10">
                    <Eyebrow>Received</Eyebrow>
                    <h3 className="mt-4 font-display text-3xl text-foreground">Application submitted.</h3>
                    <p className="mt-3 max-w-md text-muted-foreground">
                      Thank you for your interest in BiovaCo. We have received your application and will review it shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-background p-8 md:p-10">
                    <div className="grid gap-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Full name">
                          <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                        <Field label="Target Role / Discipline">
                          <input value={role} onChange={e => setRole(e.target.value)} required placeholder="e.g. Food Scientist, Engineer" className="w-full bg-transparent py-2 outline-none placeholder:text-muted-foreground/50" />
                        </Field>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Email">
                          <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                        <Field label="Phone">
                          <input value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                      </div>
                      <Field label="Cover Letter / Why BiovaCo?">
                        <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} className="w-full resize-none bg-transparent py-2 outline-none" />
                      </Field>
                      
                      <div className="group relative rounded-2xl border border-border bg-[color:var(--section)] p-6 transition-colors hover:bg-border/50">
                        <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-3">
                          <div className="rounded-full bg-background p-3 shadow-sm group-hover:scale-105 transition-transform">
                            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-[color:var(--green-deep)]" />
                          </div>
                          <div className="text-center">
                            <span className="block text-sm font-medium text-foreground">Upload Resume/CV</span>
                            <span className="mt-1 block text-xs text-muted-foreground">PDF, DOC, DOCX up to 5MB</span>
                          </div>
                          {resume && (
                            <span className="mt-2 inline-flex items-center rounded-full border border-[color:var(--green)] bg-[color:var(--green)]/10 px-3 py-1 text-xs font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                              {resume.name}
                            </span>
                          )}
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx" 
                            className="hidden" 
                            onChange={(e) => setResume(e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] disabled:opacity-70"
                    >
                      {loading ? (
                        <>Submitting <Loader2 className="h-4 w-4 animate-spin" /></>
                      ) : (
                        <>Submit application <ArrowUpRight className="h-4 w-4" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border transition-colors focus-within:border-[color:var(--green-deep)] dark:focus-within:border-[color:var(--green)]">
      <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <div className="mt-1 text-base text-foreground">{children}</div>
    </div>
  );
}
