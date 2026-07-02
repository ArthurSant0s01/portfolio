import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { Magnetic } from "../components/Magnetic";
import { useI18n } from "../i18n/I18nContext";

export default function AI() {
  const { t } = useI18n();

  return (
    <Page>
      <SEO title={t.meta.ai.title} description={t.meta.ai.description} path="/ai" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading overline={t.ai.overline} title={t.ai.title} subtitle={t.ai.subtitle} testid="ai-heading" />

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 mt-12">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-brand-purple/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-brand-cyan/15 blur-3xl" aria-hidden />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center shrink-0"><Sparkles size={22} className="text-brand-cyan" /></div>
              <p className="text-lg sm:text-2xl font-light leading-snug max-w-3xl">{t.ai.intro}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {t.ai.cards.map((c, i) => {
            const Icon = Icons[c.icon] || Icons.Sparkles;
            return (
              <Reveal key={c.title} delay={i * 0.05}>
                <motion.div whileHover={{ y: -6 }} data-testid={`ai-card-${i}`} className="glass rounded-2xl p-7 h-full group hover:border-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon size={22} className="text-brand-cyan" />
                  </div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{c.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="text-center pb-24">
            <Magnetic>
              <Link to="/contact" data-testid="ai-cta" className="inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full">
                {t.common.workWithMe} <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </Page>
  );
}
