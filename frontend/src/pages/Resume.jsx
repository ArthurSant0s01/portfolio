import { motion } from "framer-motion";
import { Download, GraduationCap, Briefcase, Languages } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { Magnetic } from "../components/Magnetic";
import { useI18n } from "../i18n/I18nContext";
import useCvDownload from "../hooks/useCvDownload";

export default function Resume() {
  const { t } = useI18n();
  const { download, loading } = useCvDownload();

  return (
    <Page>
      <SEO title={t.meta.resume.title} description={t.meta.resume.description} path="/resume" />

      <section className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeading overline={t.resume.overline} title={t.resume.title} subtitle={t.resume.subtitle} testid="resume-heading" />

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <button onClick={() => download("en")} disabled={loading} data-testid="resume-download-en" className="inline-flex items-center gap-2 btn-glow text-white font-medium px-6 py-3.5 rounded-full">
                <Download size={18} /> {t.resume.downloadEn}
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => download("pt")} disabled={loading} data-testid="resume-download-pt" className="inline-flex items-center gap-2 glass text-white font-medium px-6 py-3.5 rounded-full hover:border-white/30 transition-all">
                <Download size={18} /> {t.resume.downloadPt}
              </button>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-6 pb-16">
          {/* Experience */}
          <Reveal>
            <div className="glass rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center"><Briefcase size={18} className="text-brand-cyan" /></div>
                <h3 className="text-xl font-bold">{t.resume.experienceTitle}</h3>
              </div>
              <div className="space-y-6">
                {t.resume.experience.map((e) => (
                  <div key={e.title} className="relative pl-5 border-l border-white/10">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                    <span className="overline">{e.period}</span>
                    <h4 className="mt-1 font-bold">{e.title}</h4>
                    <p className="text-sm text-brand-purple font-mono">{e.org}</p>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.08}>
            <div className="glass rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center"><GraduationCap size={18} className="text-brand-cyan" /></div>
                <h3 className="text-xl font-bold">{t.resume.educationTitle}</h3>
              </div>
              <div className="space-y-6">
                {t.resume.education.map((e) => (
                  <div key={e.title} className="relative pl-5 border-l border-white/10">
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-purple" />
                    <span className="overline">{e.period}</span>
                    <h4 className="mt-1 font-bold">{e.title}</h4>
                    <p className="text-sm text-brand-purple font-mono">{e.org}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Languages */}
        <div className="pb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center"><Languages size={18} className="text-brand-cyan" /></div>
            <h3 className="text-xl font-bold">{t.resume.languagesTitle}</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {t.resume.languages.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08}>
                <div className="glass rounded-2xl p-7">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-lg font-bold">{l.name}</span>
                    <span className="text-sm text-brand-cyan font-mono">{l.level}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.percent}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#8B5CF6,#06B6D4)" }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
