import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Download, MapPin, Code2, Camera, Clapperboard, Target, Rocket, Brain, Check } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { Magnetic } from "../components/Magnetic";
import { profile } from "../data/portfolio";
import { useI18n } from "../i18n/I18nContext";
import useCvDownload from "../hooks/useCvDownload";

export default function About() {
  const { t } = useI18n();
  const { download } = useCvDownload();

  return (
    <Page>
      <SEO title={t.meta.about.title} description={t.meta.about.description} path="/about" />

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="grid lg:grid-cols-12 gap-12 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden glass p-2">
                <div
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: "radial-gradient(120% 120% at 0% 0%, rgba(59,130,246,0.4) 0%, transparent 45%), radial-gradient(120% 120% at 100% 100%, rgba(139,92,246,0.4) 0%, transparent 45%), radial-gradient(90% 90% at 50% 100%, rgba(6,182,212,0.25) 0%, transparent 55%), #0A0A0A" }}
                  aria-hidden
                >
                  <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
                  <div className="relative text-center">
                    <span className="block text-8xl font-black tracking-tighter text-gradient leading-none">A.</span>
                    <span className="mt-4 block overline">{t.hero.role}</span>
                  </div>
                  <div className="absolute top-6 right-6 w-11 h-11 rounded-xl glass-strong flex items-center justify-center"><Code2 size={18} className="text-brand-cyan" /></div>
                  <div className="absolute bottom-28 left-6 w-11 h-11 rounded-xl glass-strong flex items-center justify-center"><Camera size={18} className="text-brand-purple" /></div>
                  <div className="absolute top-1/2 right-8 w-11 h-11 rounded-xl glass-strong flex items-center justify-center"><Clapperboard size={18} className="text-brand-blue" /></div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 flex items-center gap-3">
                  <MapPin size={18} className="text-brand-cyan" />
                  <div>
                    <p className="text-sm font-medium">{t.branding.location}</p>
                    <p className="text-xs text-muted font-mono">{t.branding.available}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <p className="overline mb-4">{t.about.overline}</p>
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">{t.about.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-muted text-base sm:text-lg leading-relaxed">{t.about.bio}</p>
            </Reveal>
            {t.about.bio2 && (
              <Reveal delay={0.16}>
                <p className="mt-5 text-muted text-base sm:text-lg leading-relaxed">{t.about.bio2}</p>
              </Reveal>
            )}

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { icon: Target, title: t.about.missionTitle, text: t.about.mission },
                { icon: Rocket, title: t.about.goalsTitle, text: t.about.goals },
                { icon: Brain, title: t.about.mindsetTitle, text: t.about.mindset },
              ].map((b, i) => (
                <Reveal key={b.title} delay={0.15 + i * 0.05}>
                  <div className="glass rounded-2xl p-5 h-full">
                    <b.icon size={20} className="text-brand-cyan mb-3" />
                    <h3 className="font-bold text-sm">{b.title}</h3>
                    <p className="mt-2 text-xs text-muted leading-relaxed">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-12">
                <Magnetic>
                  <button onClick={() => download("en")} data-testid="about-download-cv" className="inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full">
                    <Download size={18} /> {t.common.downloadResume}
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading overline={t.about.valuesTitle} title={t.about.valuesTitle} testid="values-heading" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.about.values.map((v, i) => {
            const Icon = Icons[v.icon] || Icons.Star;
            return (
              <Reveal key={v.title} delay={i * 0.05}>
                <motion.div whileHover={{ y: -6 }} className="glass rounded-2xl p-7 h-full group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon size={22} className="text-brand-cyan" />
                  </div>
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{v.text}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Skills cards */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <SectionHeading overline={t.skills.overline} title={t.skills.title} subtitle={t.skills.subtitle} testid="skills-heading" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.skills.categories.map((c, i) => {
            const Icon = Icons[c.icon] || Icons.Code2;
            return (
              <Reveal key={c.name} delay={i * 0.04}>
                <motion.div whileHover={{ y: -6 }} data-testid={`skill-card-${i}`} className="glass rounded-2xl p-6 h-full hover:border-white/20 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-brand-cyan" />
                    </div>
                    <h3 className="font-bold">{c.name}</h3>
                  </div>
                  <p className="text-xs text-muted mb-4">{c.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.items.map((s) => (
                      <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted">{s}</span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Soft skills */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <SectionHeading overline={t.about.softTitle} title={t.about.softTitle} testid="soft-heading" />
        <div className="mt-10 flex flex-wrap gap-3">
          {t.about.soft.map((s, i) => (
            <Reveal key={s} delay={i * 0.03}>
              <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-sm">
                <Check size={15} className="text-brand-cyan" /> {s}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <SectionHeading overline={t.about.journeyTitle} title={t.about.journeyTitle} subtitle={t.about.journeySubtitle} testid="timeline-heading" />
        <div className="mt-16 relative">
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue via-brand-purple to-transparent sm:-translate-x-1/2" />
          <div className="space-y-12">
            {t.timeline.items.map((e, i) => (
              <Reveal key={e.year} delay={i * 0.05}>
                <div className={`relative pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 ${i % 2 === 0 ? "" : "sm:[direction:rtl]"}`}>
                  <motion.span
                    className="absolute left-0 sm:left-1/2 top-1.5 w-3 h-3 rounded-full bg-brand-cyan sm:-translate-x-1/2 ring-4 ring-brand-cyan/20"
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className={`[direction:ltr] ${i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:pl-12"}`}>
                    <span className="overline">{e.year}</span>
                    <h3 className="mt-2 text-xl font-bold">{e.title}</h3>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{e.text}</p>
                  </div>
                  <div className="hidden sm:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
