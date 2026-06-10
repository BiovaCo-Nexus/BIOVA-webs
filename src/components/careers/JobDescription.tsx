export function JobDescription({ job }: { job: any }) {
  return (
    <section className="py-24 bg-background">
      <div className="container-x max-w-4xl mx-auto">
        <div className="prose prose-lg prose-invert max-w-none text-muted-foreground">
          {/* Job Description */}
          {job.description && (
            <div className="mb-12">
              {job.description.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="mb-6 leading-relaxed text-foreground/80 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Detailed Description */}
          {job.detailed_description && (
            <div className="mb-12">
              <h3 className="text-2xl font-display text-foreground mb-6">About the Role</h3>
              {job.detailed_description.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="mb-6 leading-relaxed text-foreground/80 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div className="mb-12">
              <h3 className="text-2xl font-display text-foreground mb-6">Key Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-3">
                {job.responsibilities.split("\n").filter((r: string) => r.trim()).map((resp: string, i: number) => (
                  <li key={i} className="text-foreground/80">{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div className="mb-12">
              <h3 className="text-2xl font-display text-foreground mb-6">Requirements</h3>
              <ul className="list-disc pl-6 space-y-3">
                {job.requirements.split("\n").filter((r: string) => r.trim()).map((req: string, i: number) => (
                  <li key={i} className="text-foreground/80">{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preferred Qualifications */}
          {job.qualifications && (
            <div className="mb-12">
              <h3 className="text-2xl font-display text-foreground mb-6">Preferred Qualifications</h3>
              <ul className="list-disc pl-6 space-y-3">
                {job.qualifications.split("\n").filter((q: string) => q.trim()).map((qual: string, i: number) => (
                  <li key={i} className="text-foreground/80">{qual}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && (
            <div className="mb-12">
              <h3 className="text-2xl font-display text-foreground mb-6">Benefits & Perks</h3>
              <ul className="list-disc pl-6 space-y-3">
                {job.benefits.split("\n").filter((b: string) => b.trim()).map((benefit: string, i: number) => (
                  <li key={i} className="text-foreground/80">{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Email Note */}
          {job.contact_email && (
            <div className="mt-12 rounded-2xl border border-border bg-[color:var(--section)] p-8">
              <h3 className="text-xl font-display text-foreground mb-2">Have questions about this role?</h3>
              <p className="text-muted-foreground m-0">
                You can reach out to the hiring team directly at <a href={`mailto:${job.contact_email}`} className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] hover:underline">{job.contact_email}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
