import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, Github, ExternalLink, AlertCircle, Lightbulb, Trophy, GraduationCap, Wrench, Sparkles } from "lucide-react";
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

  const getAccess = (project) => project.demo && project.demo !== "#" ? project.demo : project.github && project.github !== "#" ? project.github : null;
  const getAccessLabel = (project) => project.demo && project.demo !== "#" ? t.projects.accessLabels[project.id] : project.github && project.github !== "#" ? t.common.github : null;

  return (
    <Page>
      <SEO title={t.meta.projects.title} description={t.meta.projects.description} path="/projects" />
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading as="h1" overline={t.projects.overline} title={t.projects.title} subtitle={t.projects.subtitle} testid="projects-heading" />

        <div className="mt-10 flex flex-wrap gap-3" data-testid="project-filters">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-5 py-2.5 rounded-full text-sm transition-colors ${filter === c ? "btn-glow text-white" : "glass text-muted hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5 pb-24">
          {list.map((project, i) => {
            const access = getAccess(project);
            return (
              <Reveal key={project.id} delay={Math.min(i, 3) * 0.025} y={12}>
                <article className="project-card glass rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                    {project.image ? (
                      <img src={project.image} alt={`${project.title} — ${t.projects.visualNote}`} loading="lazy" decoding="async"
                        className="relative z-10 w-full h-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    ) : null}
                    <GradientThumb iconName={project.icon} from={project.from} to={project.to} className="absolute inset-0 -z-0" />
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />
                    <span className="absolute top-4 left-4 text-xs font-mono glass px-3 py-1 rounded-full">{project.status}</span>
                    <span className="absolute bottom-4 left-4 text-xs text-white/75 font-mono">{project.category}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-bold tracking-tight">{project.title}</h2>
                    <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((tech) => <span key={tech} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted">{tech}</span>)}
                      {project.tech.length > 5 && <span className="text-[11px] font-mono px-2.5 py-1 text-muted">+{project.tech.length - 5}</span>}
                    </div>
                    <div className="mt-auto pt-6 flex flex-wrap gap-2">
                      <button type="button" onClick={() => setActive(project)} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2.5 text-sm hover:border-white/30 transition-colors">
                        {t.common.more} <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/80"
            onClick={() => setActive(null)} data-testid="project-modal" role="dialog" aria-modal="true" aria-label={active.title}>
            <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.18 }} className="project-modal bg-[#101012] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90dvh] overflow-y-auto"
              onClick={(event) => event.stopPropagation()}>
              <div className="relative aspect-video max-h-64 overflow-hidden">
                {active.image ? <img src={active.image} alt={active.title} loading="lazy" decoding="async" className="w-full h-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
                <GradientThumb iconName={active.icon} from={active.from} to={active.to} className="absolute inset-0 -z-0" />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#101012] to-transparent pointer-events-none" />
                <button onClick={() => setActive(null)} aria-label={t.common.close} className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/15 flex items-center justify-center"><X size={18} /></button>
              </div>
              <div className="px-6 sm:px-9 pb-8 -mt-2 relative">
                <p className="overline mb-2">{active.category} · {active.status}</p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{active.title}</h2>
                <p className="mt-3 text-muted leading-relaxed">{active.description}</p>

                <h3 className="mt-7 text-xs font-mono uppercase tracking-wider text-brand-cyan">{t.projects.summaryTitle}</h3>
                <div className="mt-4 grid gap-4">
                  {[
                    { icon: AlertCircle, label: t.common.problem, text: active.problem, color: "text-brand-blue" },
                    { icon: Lightbulb, label: t.common.solution, text: active.solution, color: "text-brand-purple" },
                    { icon: Trophy, label: t.common.result, text: active.result, color: "text-brand-cyan" },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><row.icon size={16} className={row.color} /></div>
                      <div><p className="text-xs font-mono uppercase tracking-wide text-muted">{row.label}</p><p className="mt-1 text-sm leading-relaxed">{row.text}</p></div>
                    </div>
                  ))}
                </div>

                <h3 className="mt-7 text-xs font-mono uppercase tracking-wider text-brand-cyan flex items-center gap-2"><GraduationCap size={15}/>{t.projects.competenciesTitle}</h3>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {(active.competencies || []).map((skill) => <li key={skill} className="text-sm text-muted flex gap-2"><span className="text-brand-cyan">✓</span>{skill}</li>)}
                </ul>

                <h3 className="mt-7 text-xs font-mono uppercase tracking-wider text-brand-cyan flex items-center gap-2"><Wrench size={15}/>{t.projects.toolsTitle}</h3>
                <div className="mt-3 flex flex-wrap gap-2">{active.tech.map((tech) => <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted">{tech}</span>)}</div>

                <div className="project-actions sticky bottom-0 -mx-6 sm:-mx-9 mt-8 px-6 sm:px-9 py-4 flex flex-wrap gap-3 border-t border-white/10 bg-[#101012]/95 backdrop-blur-md">
                  {active.demo && active.demo !== "#" && <a href={active.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 btn-glow text-white text-sm font-medium px-5 py-3 rounded-full">{getAccessLabel(active)} <ExternalLink size={16}/></a>}
                  {active.github && active.github !== "#" && <a href={active.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 glass text-white text-sm font-medium px-5 py-3 rounded-full"><Github size={16}/> {active.id === "planner-os" ? "Abrir Planner OS no GitHub" : active.id === "campus-os" ? "Abrir Campus OS no GitHub" : t.common.github}</a>}
                  {!active.demo && !active.github && <span className="text-sm text-muted">{t.projects.accessTitle}: {t.projects.accessLabels[active.id]}</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
