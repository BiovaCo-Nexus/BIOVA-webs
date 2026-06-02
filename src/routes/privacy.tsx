import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">Policy</span>.</>}
        description="How BiovaCo Nexus collects, uses, and protects your information."
      />

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <Eyebrow>1. Overview</Eyebrow>
              <h2 className="mt-4 font-display text-2xl text-foreground">Data collection and usage</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                BiovaCo Nexus Pvt. Ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
              </p>
            </div>
            
            <div>
              <Eyebrow>2. Information we collect</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us (e.g., via the Contact or Careers page).
              </p>
            </div>

            <div>
              <Eyebrow>3. How we use your information</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The information we collect is used to:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
                <li>Respond to your inquiries and offer support.</li>
                <li>Evaluate applications for careers or partnerships.</li>
                <li>Improve our website and services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <Eyebrow>4. Contact us</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                If you have questions or comments about this policy, you may email us at <a href="mailto:hello@biovaco.in" className="text-foreground underline transition-colors hover:text-[color:var(--green)]">hello@biovaco.in</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
