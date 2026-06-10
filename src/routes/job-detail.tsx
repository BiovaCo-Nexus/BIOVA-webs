import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import {
  ArrowUpRight,
  Loader2,
  Upload,
  CheckCircle,
  Copy,
  Download,
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  FileText,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FadeIn } from "@/components/ui-custom/FadeIn";
import { SignaturePad } from "@/components/SignaturePad";
import { generateApplicationPDF } from "@/utils/pdfGenerator";
import { Helmet } from "react-helmet-async";

export default function JobDetail() {
  const { roleKey } = useParams<{ roleKey: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<any>(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [jobNotFound, setJobNotFound] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    experienceYears: 0,
    skills: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [signatureError, setSignatureError] = useState<string>("");

  const [hasViewedTerms, setHasViewedTerms] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const ADMIN_EMAIL = "nakulmundhada23@gmail.com";

  useEffect(() => {
    if (submitted) {
      const formElement = document.getElementById("application-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [submitted]);

  useEffect(() => {
    const fetchJob = async () => {
      setLoadingJob(true);
      const { data, error } = await supabase
        .from("job_positions")
        .select("*")
        .eq("role_key", roleKey)
        .eq("is_active", true)
        .single();

      if (error || !data) {
        console.error("Error fetching job:", error);
        setJobNotFound(true);
      } else {
        setJob(data);
        setFormData((prev) => ({ ...prev, role: data.role_key }));
      }
      setLoadingJob(false);
    };

    if (roleKey) {
      fetchJob();
    }
  }, [roleKey]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Application ID copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadApplicationPDF = () => {
    generateApplicationPDF({ ...formData, signature_image: signature }, applicationId);
  };

  const sendConfirmationEmail = async (
    email: string,
    name: string,
    roleTitle: string,
    appId: string,
  ) => {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #032E63;">Your Application Has Been Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for applying for the position of <strong>${roleTitle}</strong> at BiovaCo Nexus.</p>
        <div style="background: #F8FAFC; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #08A04B;">
          <p style="margin: 0;"><strong>Application ID:</strong> ${appId}</p>
        </div>
        <p>We've received your application and will review it shortly.</p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://biovaco.in" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #032E63; color: #fff; text-decoration: none; border-radius: 5px;">Visit BiovaCo</a>
        </div>
        <p style="margin-top: 30px;">Best regards,<br />The BiovaCo Team</p>
      </div>`;

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toEmail: email,
        toName: name,
        subject: `Application Received - ${roleTitle}`,
        htmlContent: htmlContent,
      }),
    });
    if (!response.ok) throw new Error("Failed to send confirmation email via serverless function");
  };

  const sendAdminNotification = async (
    appId: string,
    applicantName: string,
    applicantEmail: string,
  ) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #032E63;">New Application Notification</h2>
          <p>A new application has been submitted by <strong>${applicantName}</strong> for <strong>${job?.title}</strong>.</p>
          <p>Application ID: <strong>${appId}</strong></p>
          <p>Email: <strong>${applicantEmail}</strong></p>
        </div>`;

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toEmail: ADMIN_EMAIL,
        toName: "Admin",
        subject: `New Application Received - ${applicantName}`,
        htmlContent: htmlContent,
      }),
    });
    if (!response.ok) throw new Error("Failed to send admin notification email via serverless function");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      alert("Please read and agree to the Terms & Conditions and Compensation Policy.");
      return;
    }
    if (!signature) {
      setSignatureError("Signature is required");
      return;
    }
    setSignatureError("");
    setLoading(true);

    try {
      let resumeUrl = null;
      if (resume) {
        const fileExt = resume.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, resume);
        if (uploadError) throw new Error("Failed to upload resume");
        const { data } = supabase.storage.from("resumes").getPublicUrl(fileName);
        resumeUrl = data.publicUrl;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            experience_years: formData.experienceYears,
            skills: formData.skills,
            cover_letter: formData.coverLetter,
            resume_url: resumeUrl,
            signature_image: signature,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      await supabase.from("application_status_history").insert({
        application_id: data.application_id,
        status: "submitted",
        notes: "Application submitted successfully",
      });

      try {
        await sendConfirmationEmail(
          formData.email,
          formData.fullName,
          job.title,
          data.application_id,
        );
        await sendAdminNotification(data.application_id, formData.fullName, formData.email);
      } catch (emailErr) {
        console.error("Email notification failed, but application was saved:", emailErr);
        // We don't throw here so the user still sees the success screen
      }

      setApplicationId(data.application_id);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Unexpected error:", err);
      alert(err.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingJob) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-[color:var(--green)]" />
      </div>
    );
  }

  if (jobNotFound || !job) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-background py-24">
        <h1 className="font-display text-4xl text-foreground">Position not found</h1>
        <p className="mt-4 text-muted-foreground">
          This job posting might have been closed or removed.
        </p>
        <Link
          to="/careers"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground hover:bg-[color:var(--section)]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </Link>
      </section>
    );
  }

  const pageTitle = `${job.title} at BiovaCo Nexus | Jobs in ${job.location}`;
  const pageDescription = `Apply for the ${job.title} role in ${job.department} at BiovaCo Nexus. Location: ${job.location}. ${job.description.substring(0, 100)}...`;
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : `https://biovaco.in/careers/${roleKey}`;

  const today = new Date();
  const validThroughDate = job.application_deadline
    ? new Date(job.application_deadline).toISOString().split("T")[0]
    : new Date(today.setMonth(today.getMonth() + 3)).toISOString().split("T")[0];

  let baseSalary;
  if (job.salary_range) {
    baseSalary = {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        value: job.salary_range,
        unitText: "YEAR",
      },
    };
  }

  const schemaJSON = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: { "@type": "PropertyValue", name: "BiovaCo Nexus", value: job.role_key },
    datePosted: job.created_at
      ? new Date(job.created_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    validThrough: validThroughDate,
    employmentType: job.job_type === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
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
        addressLocality: job.location ? job.location.split(",")[0] : "Nagpur",
        addressRegion:
          job.location && job.location.split(",")[1] ? job.location.split(",")[1].trim() : "Maharashtra",
        postalCode: "444701",
        addressCountry: "IN",
      },
    },
    ...(baseSalary && { baseSalary }),
  };

  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${job.title} jobs, ${job.department} roles, BiovaCo Nexus careers, jobs in ${job.location}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={currentUrl} />
        <script type="application/ld+json">{JSON.stringify(schemaJSON)}</script>
      </Helmet>

      <div className="border-b border-border bg-[color:var(--section)] pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container-x">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[color:var(--green-deep)] dark:hover:text-[color:var(--green)] mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all positions
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <Eyebrow>{job.department}</Eyebrow>
              <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground md:text-6xl lg:text-7xl leading-tight">
                {job.title}
              </h1>
            </div>
            <div className="flex-shrink-0 mb-2">
              <button
                onClick={scrollToForm}
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white"
              >
                Apply Now <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {job.location && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <MapPin className="h-6 w-6 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="mt-1 font-medium text-foreground">{job.location}</div>
              </div>
            )}
            {job.job_type && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <Briefcase className="h-6 w-6 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground">Job Type</div>
                <div className="mt-1 font-medium text-foreground">{job.job_type}</div>
              </div>
            )}
            {job.department && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <FileText className="h-6 w-6 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground">Department</div>
                <div className="mt-1 font-medium text-foreground">{job.department}</div>
              </div>
            )}
            {job.salary_range && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <span className="text-2xl mb-4 block text-muted-foreground leading-none">₹</span>
                <div className="text-sm text-muted-foreground">Salary Range</div>
                <div className="mt-1 font-medium text-foreground">{job.salary_range}</div>
              </div>
            )}
            {job.experience_level && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <Briefcase className="h-6 w-6 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground">Experience</div>
                <div className="mt-1 font-medium text-foreground">{job.experience_level}</div>
              </div>
            )}
            {job.application_deadline && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <Clock className="h-6 w-6 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground">Deadline</div>
                <div className="mt-1 font-medium text-foreground">{new Date(job.application_deadline).toLocaleDateString()}</div>
              </div>
            )}
            {job.remote_work_available && (
              <div className="rounded-2xl border border-border bg-background p-6">
                <MapPin className="h-6 w-6 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground">Work Mode</div>
                <div className="mt-1 font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)]">Remote Available</div>
              </div>
            )}
            <div className="rounded-2xl border border-border bg-[color:var(--section)] p-6">
              <Clock className="h-6 w-6 text-[color:var(--green-deep)] dark:text-[color:var(--green)] mb-4" />
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="mt-1 font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                Accepting Applications
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <section className="bg-[color:var(--section)] py-24" id="application-form">
        <div className="container-x">
          <FadeIn>
            <Eyebrow>Apply Now</Eyebrow>
            <div className="mt-8 grid gap-16 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <h3 className="font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
                  Join as a {job.title}
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  We're looking for individuals who think deeply and want to spend a decade building
                  with us. Complete the form to apply for this position.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--green)]/30 bg-[color:var(--green)]/10 px-4 py-2 text-sm text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                  <Clock className="h-4 w-4" /> Takes about ~5 mins
                </div>
              </div>

              <div>
                {submitted ? (
                  <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center rounded-3xl border border-border bg-background p-10">
                    <div className="bg-[color:var(--green)]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="h-12 w-12 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                      Application Submitted!
                    </h2>
                    <p className="text-lg mb-8 text-muted-foreground">
                      Thank you for applying to BiovaCo. We will reach out soon.
                    </p>
                    <div className="bg-[color:var(--section)] p-8 rounded-3xl border border-border mb-8 w-full">
                      <p className="text-sm font-semibold mb-3 text-foreground">
                        Your Application ID:
                      </p>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <code className="text-2xl font-mono font-bold text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
                          {applicationId}
                        </code>
                        <button
                          onClick={() => copyToClipboard(applicationId)}
                          className="text-foreground hover:bg-background rounded-full p-2"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={downloadApplicationPDF}
                        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[color:var(--navy-deep)]"
                      >
                        <Download className="h-5 w-5" /> Download PDF
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-border bg-background p-8 md:p-10 space-y-6"
                  >
                    <div className="grid gap-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Full name">
                          <input
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            required
                            className="w-full bg-transparent py-2 outline-none"
                          />
                        </Field>
                        <Field label="Target Role">
                          <input
                            value={job.title}
                            disabled
                            className="w-full bg-transparent py-2 outline-none text-muted-foreground"
                          />
                        </Field>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Email">
                          <input
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            type="email"
                            className="w-full bg-transparent py-2 outline-none"
                          />
                        </Field>
                        <Field label="Phone">
                          <input
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                            className="w-full bg-transparent py-2 outline-none"
                          />
                        </Field>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Years of Experience">
                          <input
                            type="number"
                            min="0"
                            value={formData.experienceYears}
                            onChange={(e) =>
                              handleInputChange("experienceYears", parseInt(e.target.value) || 0)
                            }
                            className="w-full bg-transparent py-2 outline-none"
                          />
                        </Field>
                      </div>
                      <Field label="Skills & Technologies *">
                        <textarea
                          value={formData.skills}
                          onChange={(e) => handleInputChange("skills", e.target.value)}
                          required
                          rows={3}
                          className="w-full resize-none bg-transparent py-2 outline-none"
                        />
                      </Field>
                      <Field label="Cover Letter / Why BiovaCo? *">
                        <textarea
                          value={formData.coverLetter}
                          onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                          required
                          rows={4}
                          className="w-full resize-none bg-transparent py-2 outline-none"
                        />
                      </Field>

                      <div className="group relative rounded-2xl border border-border bg-[color:var(--section)] p-6 transition-colors hover:bg-border/50">
                        <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-3">
                          <div className="rounded-full bg-background p-3 shadow-sm group-hover:scale-105 transition-transform">
                            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-[color:var(--green-deep)]" />
                          </div>
                          <div className="text-center">
                            <span className="block text-sm font-medium text-foreground">
                              Upload Resume/CV
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              PDF, DOC, DOCX up to 5MB
                            </span>
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

                      <div className="pt-4">
                        <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                          Digital Signature *
                        </label>
                        <SignaturePad
                          value={signature}
                          onChange={(sig) => {
                            setSignature(sig);
                            if (sig) setSignatureError("");
                          }}
                          required
                          error={signatureError}
                        />
                      </div>

                      <div className="pt-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={termsAgreed}
                            onChange={(e) => {
                              if (!hasViewedTerms) {
                                alert("Please read the Terms & Conditions first by clicking the link.");
                                e.preventDefault();
                                return;
                              }
                              setTermsAgreed(e.target.checked);
                            }}
                            className="mt-1 w-4 h-4 rounded border-border bg-background text-[color:var(--green)] focus:ring-[color:var(--green-deep)] cursor-pointer"
                          />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            I have read and agree to the{" "}
                            <a
                              href="/applicant-terms"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setHasViewedTerms(true)}
                              className="text-[color:var(--green-deep)] dark:text-[color:var(--green)] hover:underline font-medium"
                            >
                              Terms & Conditions and Compensation Policy
                            </a>{" "}
                            of Biovaco.
                          </span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          Submitting <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit application <ArrowUpRight className="h-4 w-4" />
                        </>
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
