import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Instagram, Mail, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { Magnetic } from "../components/Magnetic";
import { profile } from "../data/portfolio";
import { useI18n } from "../i18n/I18nContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.contact.validation);
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
      toast.success(t.contact.success);
      setForm({ name: "", email: "", subject: "", message: "" });
      setSent(true);
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: MessageCircle, href: `https://wa.me/${profile.whatsapp}`, label: t.contact.whatsapp, testid: "whatsapp" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn", testid: "linkedin" },
    { icon: Github, href: profile.socials.github, label: "GitHub", testid: "github" },
    { icon: Instagram, href: profile.socials.instagram, label: "Instagram", testid: "instagram" },
  ];

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted/60 focus:outline-none focus:border-brand-blue/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-blue/20 transition-all";

  return (
    <Page>
      <SEO title={t.meta.contact.title} description={t.meta.contact.description} path="/contact" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <SectionHeading overline={t.contact.overline} title={t.contact.title} subtitle={t.contact.subtitle} testid="contact-heading" />

        <div className="mt-14 grid lg:grid-cols-12 gap-8">
          {/* Info */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <a href={`mailto:${profile.email}`} data-testid="contact-email" className="group glass rounded-2xl p-6 flex items-center gap-4 hover:border-white/25 transition-colors">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 flex items-center justify-center"><Mail size={20} className="text-brand-cyan" /></span>
                <div><p className="overline mb-0.5">{t.contact.infoEmail}</p><p className="font-medium">{profile.email}</p></div>
              </a>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="glass rounded-2xl p-6 flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 flex items-center justify-center"><MapPin size={20} className="text-brand-cyan" /></span>
                <div><p className="overline mb-0.5">{t.contact.infoLocation}</p><p className="font-medium">{t.branding.location}</p></div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="glass rounded-2xl p-6">
                <p className="overline mb-4">{t.contact.infoFollow}</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a key={s.testid} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-testid={`contact-social-${s.testid}`} className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all">
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form / Success */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center min-h-[400px]"
                    data-testid="contact-success"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-cyan/30 border border-white/10 flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-brand-cyan" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-black tracking-tight">{t.contact.successTitle}</h3>
                    <p className="mt-3 text-muted max-w-sm">{t.contact.successText}</p>
                    <button onClick={() => setSent(false)} data-testid="contact-send-another" className="mt-8 inline-flex items-center gap-2 glass text-white text-sm font-medium px-6 py-3 rounded-full hover:border-white/30 transition-all">
                      {t.contact.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} data-testid="contact-form" className="glass rounded-3xl p-7 sm:p-9 space-y-5" exit={{ opacity: 0 }}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c-name" className="text-sm text-muted mb-2 block">{t.contact.nameLabel}</label>
                        <input id="c-name" data-testid="contact-name" value={form.name} onChange={update("name")} placeholder={t.contact.namePlaceholder} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="text-sm text-muted mb-2 block">{t.contact.emailLabel}</label>
                        <input id="c-email" data-testid="contact-email-input" type="email" value={form.email} onChange={update("email")} placeholder={t.contact.emailPlaceholder} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="text-sm text-muted mb-2 block">{t.contact.subjectLabel}</label>
                      <input id="c-subject" data-testid="contact-subject" value={form.subject} onChange={update("subject")} placeholder={t.contact.subjectPlaceholder} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="c-message" className="text-sm text-muted mb-2 block">{t.contact.messageLabel}</label>
                      <textarea id="c-message" data-testid="contact-message" value={form.message} onChange={update("message")} placeholder={t.contact.messagePlaceholder} rows={6} className={`${inputClass} resize-none`} />
                    </div>
                    <motion.button type="submit" disabled={sending} whileTap={{ scale: 0.98 }} data-testid="contact-submit" className="w-full inline-flex items-center justify-center gap-2 btn-glow text-white font-medium px-7 py-4 rounded-xl disabled:opacity-60">
                      {sending ? t.common.sending : t.common.sendMessage}
                      <Send size={18} />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
