import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { ArrowUpRight, MapPin, Download, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Counter, SectionHeading } from "../components/Primitives";
import Particles from "../components/Particles";
import { Magnetic } from "../components/Magnetic";
import { GradientThumb } from "../components/Visuals";
import { useI18n } from "../i18n/I18nContext";

function RotatingRoles({ roles }) {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, [roles.length, reduceMotion]);

  if (reduceMotion) {
    return <span className="text-gradient">{roles[0]}</span>;
  }

  return (
    <span className="relative inline-block align-top h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-gradient"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Disable parallax scroll effects on mobile to prevent content overlap during scroll
  const heroMotionStyle = (reduceMotion || isMobile) ? {} : { y: yText, opacity };

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center overflow-x-hidden" data-testid="hero">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Particles />
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-brand-blue/20 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, 40, 0], x: [0, 20, 0] }}
          transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-purple/20 blur-3xl"
          animate={reduceMotion ? undefined : { y: [0, -30, 0], x: [0, -20, 0] }}
          transition={reduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <motion.div style={heroMotionStyle} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-28 sm:py-0">
        <Reveal>
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            {t.hero.badge}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 overline text-brand-cyan">{t.hero.role}</p>
        </Reveal>

        <h1 className="mt-3 text-5xl sm:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.95]">
          <Reveal y={40} delay={0.1}>{t.hero.title}</Reveal>
        </h1>

        <Reveal delay={0.2}>
          <div className="mt-5 text-2xl sm:text-4xl font-light tracking-tight">
            <RotatingRoles roles={t.branding.roles} />
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mt-7 max-w-xl text-muted text-base sm:text-lg leading-relaxed">{t.hero.subtitle}</p>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-6 flex flex-wrap gap-2">
            {t.hero.disciplines.map((d) => (
              <span key={d} className="text-xs font-mono px-3 py-1.5 rounded-full glass text-muted">{d}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 pb-8">
            <Magnetic>
              <Link to="/projects" data-testid="hero-view-work" className="group inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full">
                {t.common.viewProjects}
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href="/Arthur-Santos-CV.pdf" target="_blank" rel="noopener noreferrer" data-testid="hero-download-cv" className="inline-flex items-center gap-2 glass text-white font-medium px-7 py-3.5 rounded-full hover:border-white/30 transition-all">
                <Download size={18} /> {t.common.downloadResume}
              </a>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" data-testid="hero-contact" className="inline-flex items-center gap-2 glass text-white font-medium px-7 py-3.5 rounded-full hover:border-white/30 transition-all sm:px-5 sm:text-muted sm:hover:text-white sm:border-transparent sm:bg-transparent sm:hover:border-transparent">
                <Mail size={18} /> {t.common.contactMe}
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { t } = useI18n();
  return (
    <motion.main id="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} data-testid="home-page">
      <SEO title={t.meta.home.title} description={t.meta.home.description} path="/" />
      <Hero />

      {/* Marquee */}
      <div className="py-8 border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 text-2xl sm:text-3xl font-black tracking-tight text-muted/40">
              {t.services.items.slice(0, 6).map((s) => (
                <span key={s.title} className="flex items-center gap-8">
                  {s.title} <span className="text-brand-purple">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-32">
        <div className="max-w-3xl">
          <p className="overline mb-6">{t.home.whoOverline}</p>
          <Reveal>
            <p className="text-xl sm:text-3xl font-light leading-relaxed tracking-tight">{t.home.whoTitle}</p>
          </Reveal>
          {t.home.whoBody && (
            <Reveal delay={0.1}>
              <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">{t.home.whoBody}</p>
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Magnetic>
                <Link to="/about" data-testid="home-about-link" className="group inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full">
                  {t.home.moreAbout}
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <SectionHeading overline={t.services.overline} title={t.services.title} subtitle={t.services.subtitle} testid="services-heading" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.services.items.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Sparkles;
            return (
              <Reveal key={s.title} delay={i * 0.04}>
                <motion.div whileHover={{ y: -6 }} data-testid={`service-card-${i}`} className="glass rounded-2xl p-7 h-full hover:border-white/20 transition-colors group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-white/10 group-hover:from-brand-blue/40 group-hover:to-brand-purple/40 transition-all">
                    <Icon size={22} className="text-brand-cyan" />
                  </div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-surface/40" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid grid-cols-2 lg:grid-cols-5 gap-8">
          {t.stats.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center lg:text-left">
              <div className="text-4xl sm:text-5xl font-black tracking-tighter text-gradient">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading overline={t.projects.overline} title={t.projects.title} testid="featured-heading" />
          <Link to="/projects" data-testid="home-all-projects" className="group inline-flex items-center gap-2 text-muted hover:text-white transition-colors">
            {t.common.allProjects} <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link to="/projects" data-testid={`home-project-${i}`}>
                <motion.div whileHover={{ y: -8 }} className="group glass rounded-2xl overflow-hidden h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <GradientThumb iconName={p.icon} from={p.from} to={p.to} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 text-xs font-mono glass px-3 py-1 rounded-full z-10">{p.status}</span>
                  </div>
                  <div className="p-6">
                    <p className="overline mb-2">{p.category}</p>
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AI band */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-10 sm:p-16" data-testid="home-ai-band">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-brand-cyan/20 blur-3xl" aria-hidden />
            <p className="overline mb-4">{t.home.aiBandOverline}</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter max-w-2xl">{t.home.aiBandTitle}</h2>
            <p className="mt-5 text-muted max-w-xl leading-relaxed">{t.home.aiBandText}</p>
            <Magnetic>
              <Link to="/ai" data-testid="home-ai-cta" className="mt-8 inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full">
                {t.home.aiBandCta} <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </motion.main>
  );
}
