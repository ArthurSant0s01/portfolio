import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { profile } from "../data/portfolio";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
  ];

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted/60 focus:outline-none focus:border-brand-blue/60 focus:bg-white/[0.07] transition-colors";

  return (
    <Page>
      <SEO title="Contacto — Arthur de Oliveira dos Santos" description="Get in touch with Arthur de Oliveira dos Santos for web, video, photography and AI projects." />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <SectionHeading overline="Say hello" title="Let's build something" subtitle="Have a project in mind or just want to connect? Drop me a message." testid="contact-heading" />

        <div className="mt-14 grid lg:grid-cols-12 gap-8">
          {/* Info */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <a href={`mailto:${profile.email}`} data-testid="contact-email" className="group glass rounded-2xl p-6 flex items-center gap-4 hover:border-white/25 transition-colors">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 flex items-center justify-center">
                  <Mail size={20} className="text-brand-cyan" />
                </span>
                <div>
                  <p className="overline mb-0.5">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="glass rounded-2xl p-6 flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 flex items-center justify-center">
                  <MapPin size={20} className="text-brand-cyan" />
                </span>
                <div>
                  <p className="overline mb-0.5">Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="glass rounded-2xl p-6">
                <p className="overline mb-4">Follow along</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      data-testid={`contact-social-${s.label.toLowerCase()}`}
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all"
                    >
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={submit} data-testid="contact-form" className="glass rounded-3xl p-7 sm:p-9 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-muted mb-2 block">Name</label>
                    <input data-testid="contact-name" value={form.name} onChange={update("name")} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm text-muted mb-2 block">Email</label>
                    <input data-testid="contact-email-input" type="email" value={form.email} onChange={update("email")} placeholder="you@email.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted mb-2 block">Subject</label>
                  <input data-testid="contact-subject" value={form.subject} onChange={update("subject")} placeholder="What's it about?" className={inputClass} />
                </div>
                <div>
                  <label className="text-sm text-muted mb-2 block">Message</label>
                  <textarea data-testid="contact-message" value={form.message} onChange={update("message")} placeholder="Tell me about your project..." rows={6} className={`${inputClass} resize-none`} />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.98 }}
                  data-testid="contact-submit"
                  className="w-full inline-flex items-center justify-center gap-2 btn-glow text-white font-medium px-7 py-4 rounded-xl disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
