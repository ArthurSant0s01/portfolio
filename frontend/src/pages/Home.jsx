import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import * as Icons from "lucide-react";
import { ArrowUpRight, MapPin, Download } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal, MeshBackground } from "../components/Reveal";
import { Counter, SectionHeading } from "../components/Primitives";
import { profile, stats, services, projects } from "../data/portfolio";
import { GradientThumb } from "../components/Visuals";
import useCvDownload from "../hooks/useCvDownload";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { download } = useCvDownload();

  return (
    <section ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden" data-testid="hero">
      <div className="absolute inset-0 z-0">
        <MeshBackground />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage: "radial-gradient(circle at 70% 40%, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 70% 40%, black, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <motion.div style={{ y: yText, opacity }} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <Reveal>
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            Available for freelance · <MapPin size={12} /> {profile.location}
          </span>
        </Reveal>

        <motion.h1
          className="mt-8 text-5xl sm:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.92]"
        >
          <Reveal y={40}>Creative</Reveal>
          <Reveal y={40} delay={0.08}>
            <span className="text-gradient">Developer</span>
          </Reveal>
          <Reveal y={40} delay={0.16} className="text-muted font-light text-3xl sm:text-5xl lg:text-6xl mt-2">
            & Visual Storyteller
          </Reveal>
        </motion.h1>

        <Reveal delay={0.24}>
          <p className="mt-8 max-w-xl text-muted text-base sm:text-lg leading-relaxed">
            {profile.slogan}
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/projetos"
              data-testid="hero-view-work"
              className="group inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full"
            >
              View Work
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
            <button
              onClick={download}
              data-testid="hero-download-cv"
              className="inline-flex items-center gap-2 glass text-white font-medium px-7 py-3.5 rounded-full hover:border-white/30 transition-all"
            >
              <Download size={18} /> Download CV
            </button>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      data-testid="home-page"
    >
      <SEO
        title="Arthur de Oliveira dos Santos — Creative Developer & Visual Storyteller"
        description="Premium portfolio of Arthur de Oliveira dos Santos — Creative Developer, Videographer, Photographer and AI Enthusiast based in Portugal."
      />
      <Hero />

      {/* Marquee */}
      <div className="py-8 border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 text-2xl sm:text-3xl font-black tracking-tight text-muted/40">
              {["Web Development", "Video Editing", "Photography", "AI Solutions", "Landing Pages", "Social Content"].map((t) => (
                <span key={t} className="flex items-center gap-8">
                  {t} <span className="text-brand-purple">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="overline mb-6">Who I am</p>
            <Reveal>
              <p className="text-2xl sm:text-4xl font-light leading-snug tracking-tight">
                An 18-year-old creative from Portugal blending{" "}
                <span className="text-gradient font-medium">code, cinema and AI</span> into modern digital experiences that feel alive.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <Link to="/sobre" data-testid="home-about-link" className="group inline-flex items-center gap-2 text-muted hover:text-white transition-colors">
                More about me
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <SectionHeading overline="What I do" title="Services" subtitle="From concept to launch — a full creative toolkit under one roof." testid="services-heading" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Sparkles;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  data-testid={`service-card-${i}`}
                  className="glass rounded-2xl p-7 h-full hover:border-white/20 transition-colors group"
                >
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
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center lg:text-left">
              <div className="text-4xl sm:text-6xl font-black tracking-tighter text-gradient">
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
          <SectionHeading overline="Selected work" title="Featured Projects" testid="featured-heading" />
          <Link to="/projetos" data-testid="home-all-projects" className="group inline-flex items-center gap-2 text-muted hover:text-white transition-colors">
            All projects <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter((p) => p.featured).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link to="/projetos" data-testid={`home-project-${i}`}>
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
    </motion.main>
  );
}
