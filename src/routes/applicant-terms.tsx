
import { FadeIn } from "@/components/ui-custom/FadeIn";
import { Helmet } from "react-helmet-async";

export default function ApplicantTerms() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions for Applicants | BiovaCo Nexus</title>
      </Helmet>

      <div className="border-b border-border bg-background pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="container-x max-w-4xl mx-auto">
          <h1 className="font-display text-4xl font-medium tracking-[-0.04em] text-foreground md:text-5xl">
            Terms & Conditions for Applicants
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Internship, Compensation & Opportunity Policy
          </p>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container-x max-w-4xl mx-auto">
          <FadeIn>
            <div className="prose prose-lg prose-invert max-w-none text-muted-foreground">
              <p>
                By submitting an application to Biovaco, candidates acknowledge and agree to the following terms and conditions:
              </p>

              <h2 className="text-foreground mt-8 mb-4">1. Nature of Engagement</h2>
              <p>
                Biovaco is an innovation-driven startup operating in its growth and development phase. Applicants may be considered for internship, trainee, volunteer, project-based, contractual, or future employment opportunities depending on organizational requirements and candidate suitability.
              </p>

              <h2 className="text-foreground mt-8 mb-4">2. Performance-Based Evaluation</h2>
              <p>
                All applicants and selected candidates shall be evaluated based on their skills, contribution, commitment, project execution, professionalism, communication, learning ability, and overall impact on assigned responsibilities.
              </p>

              <h2 className="text-foreground mt-8 mb-4">3. Compensation Structure</h2>
              <p>
                As an early-stage startup, compensation structures may vary across roles and project requirements.
              </p>
              <p>
                Certain positions may initially operate under a performance-based engagement model where incentives, rewards, stipends, project-based payments, or future compensation opportunities are determined based on measurable contributions and organizational impact.
              </p>
              <p>
                Unless explicitly stated in a written offer letter or agreement, applicants should not assume the existence of a fixed salary, stipend, bonus, commission, equity allocation, or employment guarantee.
              </p>

              <h2 className="text-foreground mt-8 mb-4">4. Future Opportunities</h2>
              <p>Outstanding contributors may be considered for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Paid internship opportunities</li>
                <li>Performance incentives and rewards</li>
                <li>Leadership positions</li>
                <li>Pre-Placement Offers (PPOs)</li>
                <li>Full-time employment opportunities</li>
                <li>Revenue-sharing opportunities on eligible projects</li>
                <li>Future ESOP or equity participation programs, subject to company policies, approvals, and applicable regulations</li>
              </ul>
              <p>
                Any such opportunity shall be offered solely at the discretion of Biovaco and through separate written documentation.
              </p>

              <h2 className="text-foreground mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                Any work, designs, research, documentation, software, content, strategies, inventions, concepts, or materials developed as part of assigned projects shall remain the intellectual property of Biovaco unless otherwise agreed in writing.
              </p>

              <h2 className="text-foreground mt-8 mb-4">6. Confidentiality</h2>
              <p>
                Applicants and selected candidates shall maintain confidentiality regarding proprietary information, business strategies, product concepts, customer information, technical documentation, financial information, and internal communications.
              </p>

              <h2 className="text-foreground mt-8 mb-4">7. No Employment Guarantee</h2>
              <p>
                Submission of an application, participation in interviews, completion of assessments, internship participation, project contributions, or collaboration with Biovaco does not constitute or guarantee employment, compensation, equity ownership, partnership status, or future engagement.
              </p>

              <h2 className="text-foreground mt-8 mb-4">8. Right to Modify</h2>
              <p>
                Biovaco reserves the right to modify, suspend, update, or discontinue any internship program, recruitment process, compensation structure, benefits, or opportunities at its sole discretion and without prior notice.
              </p>

              <h2 className="text-foreground mt-8 mb-4">9. Acceptance of Terms</h2>
              <p>
                By submitting an application through the Biovaco Careers Portal, candidates confirm that they have read, understood, and agreed to these Terms & Conditions.
              </p>

              <div className="mt-16 pt-8 border-t border-border">
                <p className="font-medium text-foreground mb-1">Last Updated: June 2026</p>
                <p>Biovaco Careers Team<br/>Building the Future Through Innovation.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
