import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Terms of <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">Service</span>.</>}
        description="The rules and guidelines for using the BiovaCo Nexus website."
      />

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <Eyebrow>1. Acceptance of terms</Eyebrow>
              <h2 className="mt-4 font-display text-2xl text-foreground">Agreement to terms</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website.
              </p>
            </div>
            
            <div>
              <Eyebrow>2. Intellectual property</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The website and its original content, features, and functionality are owned by BiovaCo Nexus Pvt. Ltd. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </div>

            <div>
              <Eyebrow>3. User conduct</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                You agree to use the website only for lawful purposes. You are prohibited from using the site to post or transmit any unlawful, threatening, defamatory, obscene, or profane material that could constitute or encourage criminal conduct.
              </p>
            </div>

            <div>
              <Eyebrow>4. Disclaimer</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The materials on BiovaCo Nexus's website are provided on an 'as is' basis. BiovaCo Nexus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
