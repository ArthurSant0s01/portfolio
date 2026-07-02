import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, X, Github, ExternalLink, AlertCircle, Lightbulb, Trophy } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { GradientThumb } from "../components/Visuals";
import { useI18n } from "../i18n/I18nContext";

export default function Projects() {
  const { t } = useI18n();
  const projects = t.projects.items;
  const categories = [t.common.all, ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState(t.common.all);
  const [active, setActive] = useState(null);
  const list = filter === t.common.all ? projects : projects.filter((p) => p.category === filter);

  return (
    <Page>
      <SEO title={t.meta.projects.title} description={t.meta.projects.description} path="/projects" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading as="h1" overline={t.projects.overline} title={t.projects.title} subtitle={t.projects.subtitle} testid="projects-heading" />

        <div className="mt-10 flex flex-wrap gap-3" data-testid="project-filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${filter === c ? "btn-glow text-white" : "glass text-muted hover:text-white"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 pb-24">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <motion.div whileHover={{ y: -8 }} onClick={() => setActive(p)} data-testid={`project-card-${i}`} className="group glass rounded-3xl overflow-hidden cursor-pointer h-full" data-cursor="hover">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <GradientThumb iconName={p.icon} from={p.from} to={p.to} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 text-xs font-mono glass px-3 py-1 rounded-full z-10">{p.status}</span>
                  <span className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"><ArrowUpRight size={18} /></span>
                </div>
                <div className="p-7">
                  <p className="overline mb-2">{p.category}</p>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-sm" onClick={() => setActive(null)} data-testid="project-modal" role="dialog" aria-modal="true" aria-label="Project details modal">
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
              <GradientThumb iconName={active.icon} from={active.from} to={active.to} className="w-full h-full" />
              <button onClick={() => setActive(null)} aria-label="Close project details" data-testid="project-modal-close" className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:bg-white hover:text-black transition-colors"><X size={18} /></button>
            </div>
            <div className="p-8">
              <p className="overline mb-2">{active.category} · {active.status}</p>
              <h3 className="text-3xl font-black tracking-tight">{active.title}</h3>
              <p className="mt-4 text-muted leading-relaxed">{active.description}</p>

              <div className="mt-8 space-y-5">
                {[
                  { icon: AlertCircle, label: t.common.problem, text: active.problem, color: "text-brand-blue" },
                  { icon: Lightbulb, label: t.common.solution, text: active.solution, color: "text-brand-purple" },
                  { icon: Trophy, label: t.common.result, text: active.result, color: "text-brand-cyan" },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg glass flex items-center justify-center shrink-0"><row.icon size={16} className={row.color} /></div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wide text-muted">{row.label}</p>
                      <p className="mt-1 text-sm leading-relaxed">{row.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">{tech}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={active.github} target="_blank" rel="noopener noreferrer" data-testid="project-github" className="inline-flex items-center gap-2 glass text-white text-sm font-medium px-5 py-3 rounded-full hover:border-white/30 transition-all">
                  <Github size={16} /> {t.common.github}
                </a>
                <a href={active.demo} target="_blank" rel="noopener noreferrer" data-testid="project-demo" className="inline-flex items-center gap-2 btn-glow text-white text-sm font-medium px-5 py-3 rounded-full">
                  <ExternalLink size={16} /> {t.common.liveDemo}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Page>
  );
}
