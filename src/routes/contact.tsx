import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/ui-custom/PageHero";
import { Eyebrow } from "@/components/ui-custom/Section";
import { ArrowUpRight, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const inquiries = ["General", "Business", "Partnership", "Career", "Press / Other"] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [type, setType] = useState<(typeof inquiries)[number]>(inquiries[0]);
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("inquiries")
        .insert([{ type, name, organisation, email, phone, message }]);

      if (error) {
        console.error("Error submitting form:", error);
        alert("Failed to send message. Please try again or email us directly.");
      } else {
        try {
          // 1. Notify Admin
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              toEmail: "nakulmundhada23@gmail.com",
              toName: "Admin",
              subject: `New Inquiry from ${name} - ${type}`,
              htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #032E63;">New Inquiry Received</h2>
                  <p><strong>Type:</strong> ${type}</p>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
                  <p><strong>Organisation:</strong> ${organisation}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: #F8FAFC; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
                </div>
              `
            })
          });

          // 2. Notify User
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              toEmail: email,
              toName: name,
              subject: "We've received your message - BiovaCo Nexus",
              htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #032E63;">Thank you for reaching out!</h2>
                  <p>Dear ${name},</p>
                  <p>We have successfully received your message regarding <strong>${type}</strong>.</p>
                  <p>Our team will review your inquiry and get back to you shortly.</p>
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="https://biovaco.in" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #032E63; color: #fff; text-decoration: none; border-radius: 5px;">Visit BiovaCo</a>
                  </div>
                  <p style="margin-top: 30px;">Best regards,<br />The BiovaCo Team</p>
                </div>
              `
            })
          });
        } catch (emailErr) {
          console.error("Email notification failed, but inquiry was saved:", emailErr);
        }

        setSubmitted(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | BiovaCo Nexus</title>
        <meta name="description" content="Reach the BiovaCo team for general, business, partnership or career enquiries. We read every message." />
      </Helmet>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's{" "}
            <span className="italic font-light text-[color:var(--green-deep)] dark:text-[color:var(--green)]">
              talk
            </span>
            .
          </>
        }
        description="Reach the BiovaCo team for general, business, partnership or career enquiries. We read every message."
      />

      <section>
        <div className="container-x py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-10">
              <div>
                <Eyebrow>Reach us</Eyebrow>
                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Email
                      </div>
                      <a
                        href="mailto:hello@biovaco.in"
                        className="font-display text-lg text-foreground hover:text-[color:var(--green-deep)]"
                      >
                        hello@biovaco.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Phone
                      </div>
                      <a
                        href="tel:+919226595332"
                        className="font-display text-lg text-foreground hover:text-[color:var(--green-deep)]"
                      >
                        +91 9226595332
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
                    <div className="space-y-6">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Registered office
                        </div>
                        <div className="mt-1.5 text-sm leading-relaxed text-foreground">
                          H. No. 72, Bhagchand Nagar, Dhamangaon Railway,
                          <br />
                          Dhamangaon Rly, Maharashtra – 444701
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Business office
                        </div>
                        <div className="mt-1.5 text-sm leading-relaxed text-foreground">
                          1st Floor, RBU, TBI, Katol Rd,
                          <br />
                          Bupeshnagar, Nagpur, Maharashtra 440013
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex h-full min-h-[400px] flex-col items-start justify-center rounded-3xl border border-border bg-[color:var(--section)] p-10">
                  <Eyebrow>Received</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl text-foreground">Thank you.</h3>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Your message has reached the BiovaCo team. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-border bg-background p-8 md:p-10"
                >
                  <div className="grid gap-6">
                    <Field label="Inquiry type">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as (typeof inquiries)[number])}
                        className="w-full bg-transparent py-2 text-foreground outline-none"
                      >
                        {inquiries.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                    </Field>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Full name">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-transparent py-2 outline-none"
                        />
                      </Field>
                      <Field label="Organisation">
                        <input
                          value={organisation}
                          onChange={(e) => setOrganisation(e.target.value)}
                          className="w-full bg-transparent py-2 outline-none"
                        />
                      </Field>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Email">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          className="w-full bg-transparent py-2 outline-none"
                        />
                      </Field>
                      <Field label="Phone">
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent py-2 outline-none"
                        />
                      </Field>
                    </div>
                    <Field label="Message">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="w-full resize-none bg-transparent py-2 outline-none"
                      />
                    </Field>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--navy)] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        Sending <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send message <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="border-t border-border">
        <div className="container-x py-16 md:py-32">
          <Eyebrow>Find Us</Eyebrow>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Business Office Map */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-medium text-foreground">Business Office</h3>
              <a 
                href="https://maps.google.com/?q=21.175680,79.060002" 
                target="_blank" 
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-border bg-background block"
              >
                {/* Custom Red Pin Overlay */}
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110">
                  <div className="relative -top-4">
                    <MapPin className="h-12 w-12 text-red-600 fill-red-500 drop-shadow-xl" strokeWidth={1.5} />
                    <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-black/20 blur-[4px]"></div>
                  </div>
                </div>

                <iframe
                  src="https://maps.google.com/maps?q=21.175680,79.060002&t=&z=15&ie=UTF8&iwloc=near&output=embed"
                  width="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BiovaCo Business Office Location"
                  className="pointer-events-none h-[250px] w-full grayscale sm:h-[300px] lg:h-[400px]"
                />
              </a>
            </div>

            {/* Registered Office Map */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-medium text-foreground">Registered Office</h3>
              <a 
                href="https://maps.google.com/?q=20.787596,78.138679" 
                target="_blank" 
                rel="noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-border bg-background block"
              >
                {/* Custom Red Pin Overlay */}
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110">
                  <div className="relative -top-4">
                    <MapPin className="h-12 w-12 text-red-600 fill-red-500 drop-shadow-xl" strokeWidth={1.5} />
                    <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-black/20 blur-[4px]"></div>
                  </div>
                </div>

                <iframe
                  src="https://maps.google.com/maps?q=20.787596,78.138679&t=&z=15&ie=UTF8&iwloc=near&output=embed"
                  width="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BiovaCo Registered Office Location"
                  className="pointer-events-none h-[250px] w-full grayscale sm:h-[300px] lg:h-[400px]"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block border-b border-border pb-2 transition-colors focus-within:border-[color:var(--green)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
