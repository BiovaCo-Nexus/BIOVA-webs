import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | BiovaCo Nexus</title>
        <meta name="description" content="Read the Privacy Policy for BiovaCo Nexus Private Limited." />
      </Helmet>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy{" "}
            <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
              Policy
            </span>
            .
          </>
        }
        description="Last Updated: June 2026. How BiovaCo Nexus collects, uses, and protects your information."
      />

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <Eyebrow>1. Overview & Acceptance</Eyebrow>
              <h2 className="mt-4 font-display text-2xl text-foreground">
                Data Collection and Usage
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                BiovaCo Nexus Pvt. Ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services. By using our website, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our site.
              </p>
            </div>

            <div>
              <Eyebrow>2. Information We Collect</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us (e.g., via the Contact or Careers page). This may include names, email addresses, phone numbers, resumes, and other relevant data. We may also automatically collect technical data such as IP addresses, browser types, and usage data via cookies and analytics tools.
              </p>
            </div>

            <div>
              <Eyebrow>3. How We Use Your Information</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The information we collect is used to:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2 text-base leading-relaxed text-muted-foreground">
                <li>Respond to your inquiries and offer support.</li>
                <li>Evaluate applications for careers or partnerships.</li>
                <li>Improve our website and services.</li>
                <li>Comply with legal obligations and resolve disputes.</li>
              </ul>
            </div>

            <div>
              <Eyebrow>4. Data Security & Liability Disclaimer</Eyebrow>
              <h2 className="mt-4 font-display text-xl text-foreground">No Guarantee of Absolute Security</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                While we have implemented reasonable technical and organizational security measures designed to protect your personal information, please be aware that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. You acknowledge and agree that BiovaCo Nexus Private Limited cannot and does not guarantee absolute security. To the maximum extent permitted by law, BiovaCo Nexus shall not be liable for any unauthorized access, hacking, data loss, data breaches, or any subsequent misuse of your information by third parties. You provide your personal information at your own risk.
              </p>
            </div>

            <div>
              <Eyebrow>5. Sharing of Information</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners, trusted affiliates, and advertisers. We may disclose your information if required to do so by law, in response to a subpoena or court order, or to protect our rights, property, or safety.
              </p>
            </div>

            <div>
              <Eyebrow>6. Contact Us</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                If you have questions or comments about this policy, you may email us at{" "}
                <a
                  href="mailto:hello@biovaco.in"
                  className="text-foreground underline transition-colors hover:text-[color:var(--green)]"
                >
                  hello@biovaco.in
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
