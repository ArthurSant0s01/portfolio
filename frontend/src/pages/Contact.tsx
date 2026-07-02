import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import {
  Send, Github, Linkedin, Instagram, Mail, MapPin, MessageCircle, CheckCircle2,
  Copy, Check, ExternalLink, CalendarClock, ShieldCheck, ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { Magnetic } from "../components/Magnetic";
import { profile } from "../data/portfolio";
import { useI18n } from "../i18n/I18nContext";
import useCvDownload from "../hooks/useCvDownload";
import { BACKEND_URL } from "@/lib/api";

export default function Contact() {
  const { t } = useI18n();
  const { download } = useCvDownload();
  const calendlyRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", country: "", service: "", budget: "", message: "", agree: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(null);

  const wa = `https://wa.me/${profile.whatsapp}`;
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const copy = (key, value) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(value).catch(() => fallbackCopy(value));
      } else {
        fallbackCopy(value);
      }
    } catch {
      fallbackCopy(value);
    }
    setCopied(key);
    toast.success(t.contact.copied);
    setTimeout(() => setCopied(null), 1500);
  };

  const fallbackCopy = (value) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch {
      /* no-op */
    }
  };

  const scrollToCalendly = () => calendlyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error(t.contact.validation);
    if (!form.agree) return toast.error(t.contact.privacyError);
    setSending(true);
    try {
      const { agree, ...payload } = form;
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(t.contact.success);
      setForm({ name: "", email: "", company: "", country: "", service: "", budget: "", message: "", agree: false });
      setSent(true);
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSending(false);
    }
  };

  const cards = [
    { key: "email", icon: Mail, label: t.contact.infoEmail, value: profile.email, href: `mailto:${profile.email}`, copyable: true },
    { key: "whatsapp", icon: MessageCircle, label: t.contact.whatsapp, value: profile.whatsappDisplay, href: wa, copyable: true },
    { key: "github", icon: Github, label: "GitHub", value: "ArthurSant0s01", href: profile.socials.github },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn", value: "arthur-santos", href: profile.socials.linkedin },
    { key: "instagram", icon: Instagram, label: "Instagram", value: "@arthur.internacional", href: profile.socials.instagram },
    { key: "location", icon: MapPin, label: t.contact.infoLocation, value: profile.location, href: profile.mapsUrl, copyable: true },
  ];

  const actions = [
    { label: t.contact.actions.email, icon: Mail, href: `mailto:${profile.email}`, primary: true },
    { label: t.contact.actions.whatsapp, icon: MessageCircle, href: wa, primary: true },
    { label: t.contact.actions.cvEn, icon: Icons.Download, onClick: () => download("en") },
    { label: t.contact.actions.cvPt, icon: Icons.Download, onClick: () => download("pt") },
    { label: t.contact.actions.github, icon: Github, href: profile.socials.github },
    { label: t.contact.actions.linkedin, icon: Linkedin, href: profile.socials.linkedin },
    { label: t.contact.actions.instagram, icon: Instagram, href: profile.socials.instagram },
    { label: t.contact.actions.maps, icon: MapPin, href: profile.mapsUrl },
    { label: t.contact.actions.schedule, icon: CalendarClock, onClick: scrollToCalendly },
  ];

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted/60 focus:outline-none focus:border-brand-blue/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-blue/20 transition-all";

  return (
    <Page>
      <SEO title={t.meta.contact.title} description={t.meta.contact.description} path="/contact" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <SectionHeading overline={t.contact.overline} title={t.contact.title} subtitle={t.contact.subtitle} testid="contact-heading" />

        {/* Availability */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-3" data-testid="availability-badges">
            {t.contact.availability.map((a) => (
              <span key={a} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> {a}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Let's Work Together */}
        <div className="mt-16">
          <p className="overline mb-6">{t.contact.letsWorkTitle}</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.contact.letsWork.map((c, i) => {
              const Icon = Icons[c.icon] || Icons.Sparkles;
              return (
                <Reveal key={c.title} delay={i * 0.06}>
                  <motion.div whileHover={{ y: -6 }} data-testid={`lets-work-${i}`} className="relative glass rounded-2xl p-7 h-full group overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-brand-purple/15 blur-2xl group-hover:bg-brand-cyan/20 transition-colors" aria-hidden />
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon size={22} className="text-brand-cyan" />
                    </div>
                    <h3 className="text-lg font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{c.text}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-8">
          {/* Left: contact cards + quick actions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid sm:grid-cols-2 gap-4" data-testid="contact-cards">
              {cards.map((c, i) => (
                <Reveal key={c.key} delay={i * 0.04}>
                  <motion.div whileHover={{ y: -4 }} className="relative glass rounded-2xl p-5 group h-full">
                    <a href={c.href} target="_blank" rel="noopener noreferrer" data-testid={`contact-card-${c.key}`} className="flex items-start gap-3">
                      <span className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <c.icon size={18} className="text-brand-cyan" />
                      </span>
                      <div className="min-w-0">
                        <p className="overline mb-0.5">{c.label}</p>
                        <p className="text-sm font-medium truncate">{c.value}</p>
                      </div>
                    </a>
                    {c.copyable && (
                      <button
                        onClick={() => copy(c.key, c.value)}
                        aria-label={`${t.contact.copy} ${c.label}`}
                        data-testid={`copy-${c.key}`}
                        className="absolute top-3 right-3 w-8 h-8 rounded-lg glass flex items-center justify-center text-muted hover:text-white transition-colors"
                      >
                        <AnimatePresence mode="wait">
                          {copied === c.key ? (
                            <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={14} className="text-brand-cyan" /></motion.span>
                          ) : (
                            <motion.span key="i" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={14} /></motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Quick actions */}
            <div>
              <p className="overline mb-4">{t.contact.quickTitle}</p>
              <div className="grid sm:grid-cols-2 gap-3" data-testid="quick-actions">
                {actions.map((a) =>
                  a.href ? (
                    <a
                      key={a.label}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`action-${a.label}`}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${a.primary ? "btn-glow text-white" : "glass text-white hover:border-white/30"}`}
                    >
                      <a.icon size={16} /> {a.label}
                    </a>
                  ) : (
                    <button
                      key={a.label}
                      onClick={a.onClick}
                      data-testid={`action-${a.label}`}
                      className="inline-flex items-center gap-2 glass text-white rounded-full px-5 py-3 text-sm font-medium hover:border-white/30 transition-all"
                    >
                      <a.icon size={16} /> {a.label}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right: form / success */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center min-h-[520px]" data-testid="contact-success">
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
                    <h3 className="text-lg font-bold">{t.contact.formTitle}</h3>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c-name" className="text-sm text-muted mb-2 block">{t.contact.nameLabel}</label>
                        <input id="c-name" data-testid="contact-name" value={form.name} onChange={update("name")} placeholder={t.contact.namePlaceholder} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="text-sm text-muted mb-2 block">{t.contact.emailLabel}</label>
                        <input id="c-email" data-testid="contact-email-input" type="email" value={form.email} onChange={update("email")} placeholder={t.contact.emailPlaceholder} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="c-company" className="text-sm text-muted mb-2 block">{t.contact.companyLabel}</label>
                        <input id="c-company" data-testid="contact-company" value={form.company} onChange={update("company")} placeholder={t.contact.companyPlaceholder} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="c-country" className="text-sm text-muted mb-2 block">{t.contact.countryLabel}</label>
                        <input id="c-country" data-testid="contact-country" value={form.country} onChange={update("country")} placeholder={t.contact.countryPlaceholder} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="c-service" className="text-sm text-muted mb-2 block">{t.contact.serviceLabel}</label>
                        <select id="c-service" data-testid="contact-service" value={form.service} onChange={update("service")} className={`${inputClass} appearance-none`}>
                          <option value="" className="bg-surface text-white">{t.contact.servicePlaceholder}</option>
                          {t.contact.serviceOptions.map((o) => (
                            <option key={o} value={o} className="bg-surface text-white">{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-budget" className="text-sm text-muted mb-2 block">{t.contact.budgetLabel}</label>
                        <input id="c-budget" data-testid="contact-budget" value={form.budget} onChange={update("budget")} placeholder={t.contact.budgetPlaceholder} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="c-message" className="text-sm text-muted mb-2 block">{t.contact.messageLabel}</label>
                      <textarea id="c-message" data-testid="contact-message" value={form.message} onChange={update("message")} placeholder={t.contact.messagePlaceholder} rows={5} className={`${inputClass} resize-none`} />
                    </div>
                    <label className="flex items-center gap-3 text-sm text-muted cursor-pointer">
                      <input type="checkbox" data-testid="contact-privacy" checked={form.agree} onChange={update("agree")} className="w-4 h-4 rounded border-white/20 bg-white/5 accent-brand-blue" />
                      <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-brand-cyan" /> {t.contact.privacy}</span>
                    </label>
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

        {/* Map + Calendly */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass rounded-3xl p-3 h-full">
              <div className="px-4 pt-3 pb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="overline mb-1">{t.contact.mapsTitle}</p>
                  <p className="font-bold">{profile.location}</p>
                </div>
                <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid="open-maps" className="inline-flex items-center gap-2 glass text-white text-sm px-4 py-2 rounded-full hover:border-white/30 transition-all">
                  <ExternalLink size={15} /> {t.contact.openMaps}
                </a>
              </div>
              <iframe title="Google Maps — Guimarães" src={profile.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-64 rounded-2xl border-0 grayscale-[30%]" data-testid="google-map" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div ref={calendlyRef} className="relative glass rounded-3xl p-8 h-full flex flex-col justify-center overflow-hidden" data-testid="calendly-section">
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-brand-cyan/15 blur-3xl" aria-hidden />
              <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center mb-5"><CalendarClock size={22} className="text-brand-cyan" /></div>
              <h3 className="text-2xl font-black tracking-tight">{t.contact.calendlyTitle}</h3>
              <p className="mt-2 text-muted">{t.contact.calendlyText}</p>
              {profile.calendly ? (
                <a href={profile.calendly} target="_blank" rel="noopener noreferrer" data-testid="calendly-link" className="mt-6 inline-flex items-center gap-2 btn-glow text-white font-medium px-6 py-3 rounded-full self-start">
                  {t.contact.actions.schedule} <ArrowUpRight size={16} />
                </a>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-5 text-sm text-muted font-mono leading-relaxed" data-testid="calendly-placeholder">
                  {t.contact.calendlyPlaceholder}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Final message */}
        <Reveal>
          <div className="mt-24 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter">
              <span className="text-gradient-animated">{t.contact.finalMessage}</span>
            </h2>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}
