import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight, Loader2, Upload, CheckCircle, Copy, Download, ArrowLeft } from "lucide-react";
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
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experienceYears: 0,
    skills: '',
    coverLetter: ''
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [signatureError, setSignatureError] = useState<string>("");

  const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const SENDER_EMAIL = "info@biovaco.com";
  const SENDER_NAME = "BiovaCo Recruiting";
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
        .from('job_positions')
        .select('*')
        .eq('role_key', roleKey)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        console.error('Error fetching job:', error);
        setJobNotFound(true);
      } else {
        setJob(data);
        setFormData(prev => ({ ...prev, role: data.role_key }));
      }
      setLoadingJob(false);
    };

    if (roleKey) {
      fetchJob();
    }
  }, [roleKey]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Application ID copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadApplicationPDF = () => {
    generateApplicationPDF({ ...formData, signature_image: signature }, applicationId);
  };

  const sendConfirmationEmail = async (email: string, name: string, roleTitle: string, appId: string) => {
    const emailData = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: email, name: name }],
      subject: `Application Received - ${roleTitle}`,
      htmlContent: `
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
      </div>`
    };
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { accept: 'application/json', 'api-key': BREVO_API_KEY, 'content-type': 'application/json' },
      body: JSON.stringify(emailData)
    });
    if (!response.ok) throw new Error('Failed to send confirmation email');
  };

  const sendAdminNotification = async (appId: string, applicantName: string, applicantEmail: string) => {
    const emailData = {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: ADMIN_EMAIL, name: "Admin" }],
      subject: `New Application Received - ${applicantName}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #032E63;">New Application Notification</h2>
          <p>A new application has been submitted by <strong>${applicantName}</strong> for <strong>${job?.title}</strong>.</p>
          <p>Application ID: <strong>${appId}</strong></p>
          <p>Email: <strong>${applicantEmail}</strong></p>
        </div>`
    };
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'accept': 'application/json', 'api-key': BREVO_API_KEY, 'content-type': 'application/json' },
      body: JSON.stringify(emailData)
    });
    if (!response.ok) throw new Error('Failed to send admin notification email');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature) {
      setSignatureError("Signature is required");
      return;
    }
    setSignatureError("");
    setLoading(true);

    try {
      let resumeUrl = null;
      if (resume) {
        const fileExt = resume.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('resumes').upload(fileName, resume);
        if (uploadError) throw new Error('Failed to upload resume');
        const { data } = supabase.storage.from('resumes').getPublicUrl(fileName);
        resumeUrl = data.publicUrl;
      }

      const { data, error } = await supabase
        .from('job_applications')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          experience_years: formData.experienceYears,
          skills: formData.skills,
          cover_letter: formData.coverLetter,
          resume_url: resumeUrl,
          signature_image: signature
        }])
        .select()
        .single();

      if (error) throw error;

      await supabase.from('application_status_history').insert({
        application_id: data.application_id,
        status: 'submitted',
        notes: 'Application submitted successfully'
      });

      await sendConfirmationEmail(formData.email, formData.fullName, job.title, data.application_id);
      await sendAdminNotification(data.application_id, formData.fullName, formData.email);

      setApplicationId(data.application_id);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Unexpected error:', err);
      alert(err.message || 'Failed to submit application.');
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
        <p className="mt-4 text-muted-foreground">This job posting might have been closed or removed.</p>
        <Link to="/careers" className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground hover:bg-[color:var(--section)]">
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </Link>
      </section>
    );
  }

  const pageTitle = `${job.title} at BiovaCo Nexus | Jobs in ${job.location}`;
  const pageDescription = `Apply for the ${job.title} role in ${job.department} at BiovaCo Nexus. Location: ${job.location}. ${job.description.substring(0, 100)}...`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://biovaco.in/careers/${roleKey}`;

  const schemaJSON = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": { "@type": "PropertyValue", "name": "BiovaCo Nexus", "value": job.role_key },
    "datePosted": new Date().toISOString().split('T')[0],
    "employmentType": job.job_type === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
    "hiringOrganization": { "@type": "Organization", "name": "BiovaCo Nexus Private Limited", "sameAs": "https://biovaco.in", "logo": "https://biovaco.in/Logo.png" },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.split(',')[0],
        "addressRegion": job.location.split(',')[1] ? job.location.split(',')[1].trim() : "India",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${job.title} jobs, ${job.department} roles, BiovaCo Nexus careers, jobs in ${job.location}`} />
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

      <div className="border-b border-border bg-[color:var(--section)] pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container-x">
          <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[color:var(--green)] mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to all positions
          </Link>
          <Eyebrow>{job.department}</Eyebrow>
          <h1 className="mt-6 font-display text-4xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {job.title}
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">{job.location}</span>
            <span className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground">{job.job_type}</span>
          </div>
        </div>
      </div>

      <section className="border-b border-border py-20">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 className="font-display text-3xl text-foreground">Role Description</h3>
          </div>
          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{job.description}</p>
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
                  We're looking for individuals who think deeply and want to spend a decade building with us.
                </p>
              </div>
              
              <div>
                {submitted ? (
                  <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center rounded-3xl border border-border bg-background p-10">
                    <div className="bg-[color:var(--green)]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="h-12 w-12 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-4">Application Submitted!</h2>
                    <p className="text-lg mb-8 text-muted-foreground">Thank you for applying to BiovaCo. We will reach out soon.</p>
                    <div className="bg-[color:var(--section)] p-8 rounded-3xl border border-border mb-8 w-full">
                      <p className="text-sm font-semibold mb-3 text-foreground">Your Application ID:</p>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <code className="text-2xl font-mono font-bold text-[color:var(--green-deep)] dark:text-[color:var(--green)]">{applicationId}</code>
                        <button onClick={() => copyToClipboard(applicationId)} className="text-foreground hover:bg-background rounded-full p-2"><Copy className="h-5 w-5" /></button>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button onClick={downloadApplicationPDF} className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[color:var(--navy-deep)]"><Download className="h-5 w-5" /> Download PDF</button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-background p-8 md:p-10 space-y-6">
                    <div className="grid gap-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Full name"><input value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} required className="w-full bg-transparent py-2 outline-none" /></Field>
                        <Field label="Target Role"><input value={job.title} disabled className="w-full bg-transparent py-2 outline-none text-muted-foreground" /></Field>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Email"><input value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required type="email" className="w-full bg-transparent py-2 outline-none" /></Field>
                        <Field label="Phone"><input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} required className="w-full bg-transparent py-2 outline-none" /></Field>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Years of Experience"><input type="number" min="0" value={formData.experienceYears} onChange={e => handleInputChange('experienceYears', parseInt(e.target.value) || 0)} className="w-full bg-transparent py-2 outline-none" /></Field>
                      </div>
                      <Field label="Skills & Technologies *"><textarea value={formData.skills} onChange={e => handleInputChange('skills', e.target.value)} required rows={3} className="w-full resize-none bg-transparent py-2 outline-none" /></Field>
                      <Field label="Cover Letter / Why BiovaCo? *"><textarea value={formData.coverLetter} onChange={e => handleInputChange('coverLetter', e.target.value)} required rows={4} className="w-full resize-none bg-transparent py-2 outline-none" /></Field>
                      
                      <div className="group relative rounded-2xl border border-border bg-[color:var(--section)] p-6 transition-colors hover:bg-border/50">
                        <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-3">
                          <div className="rounded-full bg-background p-3 shadow-sm group-hover:scale-105 transition-transform"><Upload className="h-5 w-5 text-muted-foreground group-hover:text-[color:var(--green-deep)]" /></div>
                          <div className="text-center">
                            <span className="block text-sm font-medium text-foreground">Upload Resume/CV</span>
                            <span className="mt-1 block text-xs text-muted-foreground">PDF, DOC, DOCX up to 5MB</span>
                          </div>
                          {resume && <span className="mt-2 inline-flex items-center rounded-full border border-[color:var(--green)] bg-[color:var(--green)]/10 px-3 py-1 text-xs font-medium text-[color:var(--green-deep)] dark:text-[color:var(--green)]">{resume.name}</span>}
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setResume(e.target.files?.[0] || null)} />
                        </label>
                      </div>
                      
                      <div className="pt-4">
                        <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Digital Signature *</label>
                        <SignaturePad value={signature} onChange={(sig) => { setSignature(sig); if (sig) setSignatureError(""); }} required error={signatureError} />
                      </div>
                    </div>
                    
                    <button type="submit" disabled={loading} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] disabled:opacity-70">
                      {loading ? <>Submitting <Loader2 className="h-4 w-4 animate-spin" /></> : <>Submit application <ArrowUpRight className="h-4 w-4" /></>}
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
      <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</label>
      <div className="mt-1 text-base text-foreground">{children}</div>
    </div>
  );
}
