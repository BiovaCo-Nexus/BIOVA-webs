import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | BiovaCo Nexus</title>
        <meta name="description" content="Read the Terms of Service for BiovaCo Nexus Private Limited." />
      </Helmet>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms of{" "}
            <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
              Service
            </span>
            .
          </>
        }
        description="Last Updated: June 2026. The definitive rules and legal guidelines for using the BiovaCo Nexus platform."
      />

      <section className="border-b border-border">
        <div className="container-x py-24 md:py-32">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <Eyebrow>1. Acceptance of Terms</Eyebrow>
              <h2 className="mt-4 font-display text-2xl text-foreground">Legally Binding Agreement</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                By accessing, browsing, or otherwise using the BiovaCo Nexus website (the "Site"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must immediately cease using the Site. These terms constitute a legally binding agreement between you and BiovaCo Nexus Private Limited ("BiovaCo," "we," "us," or "our").
              </p>
            </div>

            <div>
              <Eyebrow>2. No Warranties ("As-Is" Basis)</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The Site and all information, content, materials, products, and services included on or otherwise made available to you through the Site are provided by BiovaCo Nexus on an "AS IS" and "AS AVAILABLE" basis, unless otherwise specified in writing. BiovaCo Nexus makes no representations or warranties of any kind, express or implied, as to the operation of the Site or the information, content, materials, or products included on the Site. You expressly agree that your use of the Site is at your sole risk.
              </p>
            </div>

            <div>
              <Eyebrow>3. Limitation of Liability</Eyebrow>
              <h2 className="mt-4 font-display text-xl text-foreground">Strict Cap on Damages</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                To the fullest extent permissible by applicable law, BiovaCo Nexus Private Limited, its founders, directors, employees, affiliates, and agents shall not be liable for any indirect, incidental, punitive, special, consequential, or exemplary damages arising out of or in connection with your use of the Site. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, regardless of whether we were advised of the possibility of such damages. Under no circumstances will BiovaCo Nexus's total liability to you for all damages, losses, or causes of action exceed One Hundred Indian Rupees (₹100 INR).
              </p>
            </div>

            <div>
              <Eyebrow>4. Indemnification</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                You agree to indemnify, defend, and hold harmless BiovaCo Nexus Private Limited, its officers, directors, employees, agents, and third parties, for any losses, costs, liabilities, and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the Site, any user postings made by you, your violation of any terms of this Agreement, or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations.
              </p>
            </div>

            <div>
              <Eyebrow>5. Intellectual Property Rights</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                All content included on the Site, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of BiovaCo Nexus or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You may not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site.
              </p>
            </div>

            <div>
              <Eyebrow>6. Governing Law and Jurisdiction</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Nagpur, Maharashtra, India.
              </p>
            </div>
            
            <div>
              <Eyebrow>7. Changes to Terms</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                BiovaCo Nexus reserves the right, in its sole discretion, to change the Terms under which the Site is offered. The most current version of the Terms will supersede all previous versions. We encourage you to periodically review the Terms to stay informed of our updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
