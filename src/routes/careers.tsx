import { useState, useEffect } from "react";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight, Loader2, Upload, CheckCircle, Copy, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui-custom/FadeIn";
import { SignaturePad } from "@/components/SignaturePad";
import { generateApplicationPDF } from "@/utils/pdfGenerator";

// We will derive departments dynamically from the database
// const departments = [ ... ];

export default function Careers() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  
  // Job Roles from DB
  const [jobRoles, setJobRoles] = useState<any[]>([]);
  const [openings, setOpenings] = useState<any[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  // Form State
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
    const fetchJobRoles = async () => {
      const { data, error } = await supabase
        .from('job_positions')
        .select('role_key, title, department, location, job_type, description')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching job roles:', error);
      } else {
        setJobRoles(data || []);
        
        // Populate openings for the UI
        const fetchedOpenings = (data || []).map((job) => ({
          title: job.title,
          dept: job.department,
          loc: job.location,
          type: job.job_type,
          desc: job.description,
          key: job.role_key
        }));
        setOpenings(fetchedOpenings);

        // Derive unique departments dynamically
        const uniqueDepartments = Array.from(new Set(fetchedOpenings.map(o => o.dept)));
        setDepartments(uniqueDepartments);
      }
    };

    fetchJobRoles();
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const sendConfirmationEmail = async (
    email: string,
    name: string,
    role: string,
    applicationId: string
  ) => {
    const emailData = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL
      },
      to: [{
        email: email,
        name: name
      }],
      subject: `Application Received - ${role}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #032E63;">Your Application Has Been Received</h2>
        <p>Dear ${name},</p>
        <p>
          Thank you for applying for the position of <strong>${role}</strong> at BiovaCo Nexus.
        </p>
  
        <div
          style="background: #F8FAFC; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #08A04B;"
        >
          <p style="margin: 0;">
            <strong>Application ID:</strong> ${applicationId}
          </p>
        </div>
  
        <p>We've received your application and will review it shortly. You should hear back from us within 1–2 weeks.</p>
        <p>You can use the Application ID above to reference your application in any correspondence with our team.</p>
  
        <div style="text-align: center; margin-top: 30px;">
          <a
            href="https://biovaco.in"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-block; padding: 10px 20px; background-color: #032E63; color: #fff; text-decoration: none; border-radius: 5px;"
          >
            Visit BiovaCo Nexus
          </a>
        </div>
  
        <p style="margin-top: 30px;">Best regards,<br />The BiovaCo Team</p>
      </div>
      `
    };
  
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.error('Brevo API Error:', error);
      throw new Error('Failed to send confirmation email');
    }
  };
  
  const sendAdminNotification = async (applicationId: string, applicantName: string, applicantEmail: string) => {
    const emailData = {
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL
      },
      to: [{
        email: ADMIN_EMAIL,
        name: "Admin"
      }],
      subject: `New Application Received - ${applicantName}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #032E63;">New Application Notification</h2>
          <p>Dear Admin,</p>
          <p>A new application has been submitted by <strong>${applicantName}</strong>.</p>
          <p>Application ID: <strong>${applicationId}</strong></p>
          <p>Applicant Email: <strong>${applicantEmail}</strong></p>
          <p>Please review the application at your earliest convenience.</p>
          <p>Best regards,</p>
          <p>The BiovaCo Team</p>
        </div>
      `
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Brevo API Error:', error);
      throw new Error('Failed to send admin notification email');
    }
  };

  const handleRoleSelect = (roleKey: string) => {
    setFormData(prev => ({ ...prev, role: roleKey }));
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
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
        const filePath = `${fileName}`;

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

      if (error) {
        console.error('Application submission error:', error);
        throw error;
      }

      await supabase
        .from('application_status_history')
        .insert({
          application_id: data.application_id,
          status: 'submitted',
          notes: 'Application submitted successfully'
        });

      // Send emails
      await sendConfirmationEmail(
        formData.email,
        formData.fullName,
        jobRoles.find(r => r.role_key === formData.role)?.title || formData.role,
        data.application_id
      );
      await sendAdminNotification(data.application_id, formData.fullName, formData.email);

      setApplicationId(data.application_id);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Unexpected error:', err);
      alert(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setApplicationId("");
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: '',
      experienceYears: 0,
      skills: '',
      coverLetter: ''
    });
    setResume(null);
    setSignature("");
    setSignatureError("");
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
          
          <FadeIn>
            <Eyebrow>Open positions</Eyebrow>
          </FadeIn>
          <FadeIn className="mt-12 overflow-hidden rounded-3xl border border-border bg-background">
            {openings.length > 0 ? (
              <div className="divide-y divide-border">
                {openings.map((o) => (
                  <div key={o.title} onClick={() => handleRoleSelect(o.key)} className="cursor-pointer group grid items-center gap-4 p-6 transition-colors hover:bg-[color:var(--section)] md:grid-cols-[2fr_1fr_1fr_auto]">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{o.dept}</div>
                      <div className="mt-1 font-display text-xl text-foreground group-hover:text-[color:var(--green-deep)] dark:group-hover:text-[color:var(--green)] transition-colors">{o.title}</div>
                      {o.desc && <p className="mt-2 text-sm text-muted-foreground line-clamp-2 pr-4">{o.desc}</p>}
                    </div>
                    <div className="text-sm font-medium text-foreground">{o.loc}</div>
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

          <FadeIn className="mt-24" id="application-form">
            <Eyebrow>Spontaneous Application</Eyebrow>
            <div className="mt-8 grid gap-16 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <h3 className="font-display text-4xl tracking-[-0.03em] text-foreground md:text-5xl">
                  Send us your story.
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  We're always interested in people who think deeply about food, agriculture or technology and want to spend a decade building.
                </p>
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
                      Thank you for submitting your application! We will reach out soon.
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
                      <div className="bg-background border border-border rounded-xl p-4">
                        <p className="text-sm font-bold text-foreground">
                          Copy Your ID - This is generated for one time only!
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Save this Application ID immediately. You won't be able to retrieve it later.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={downloadApplicationPDF}
                        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-[color:var(--navy-deep)]"
                      >
                        <Download className="h-5 w-5" />
                        Download PDF
                      </button>
                      <button
                        onClick={resetForm}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-8 py-3.5 text-base font-medium text-foreground transition-all hover:bg-[color:var(--section)]"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-background p-8 md:p-10 space-y-6">
                    
                    {/* Personal Info */}
                    <div className="grid gap-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Full name">
                          <input value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} required className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                        <Field label="Target Role / Discipline">
                          {jobRoles.length > 0 ? (
                            <select 
                              value={formData.role} 
                              onChange={e => handleInputChange('role', e.target.value)} 
                              required 
                              className="w-full bg-transparent py-2 outline-none"
                            >
                              <option value="">Select a position</option>
                              {jobRoles.map(r => (
                                <option key={r.role_key} value={r.role_key}>{r.title}</option>
                              ))}
                            </select>
                          ) : (
                            <input value={formData.role} onChange={e => handleInputChange('role', e.target.value)} required placeholder="e.g. Food Scientist" className="w-full bg-transparent py-2 outline-none" />
                          )}
                        </Field>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Email">
                          <input value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required type="email" className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                        <Field label="Phone">
                          <input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} required className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Years of Experience">
                          <input type="number" min="0" value={formData.experienceYears} onChange={e => handleInputChange('experienceYears', parseInt(e.target.value) || 0)} className="w-full bg-transparent py-2 outline-none" />
                        </Field>
                      </div>

                      <Field label="Skills & Technologies *">
                        <textarea value={formData.skills} onChange={e => handleInputChange('skills', e.target.value)} required rows={3} className="w-full resize-none bg-transparent py-2 outline-none" />
                      </Field>
                      
                      <Field label="Cover Letter / Why BiovaCo? *">
                        <textarea value={formData.coverLetter} onChange={e => handleInputChange('coverLetter', e.target.value)} required rows={4} className="w-full resize-none bg-transparent py-2 outline-none" />
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
