import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Layers3, Lightbulb, ListChecks, Target, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { Page } from "../components/Primitives";
import { GradientThumb } from "../components/Visuals";
import { useI18n } from "../i18n/I18nContext";
import { caseStudies } from "../data/caseStudies";

const privateRepositories = new Set(["primecode", "campus-os", "planner-os", "real-estate", "golden-archways", "episten-assistent"]);

export default function CaseStudy() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const project = t.projects.items.find((item) => item.id === slug);
  const study = caseStudies[slug];
  const content = study?.[lang] || study?.en;
  if (!project || !content) {
    return <Page><section className="max-w-4xl mx-auto px-5 py-24"><h1 className="text-3xl font-bold">Project not found</h1><Link className="inline-flex mt-6 items-center gap-2 text-brand-cyan" to="/projects"><ArrowLeft size={16}/> {t.common.allProjects}</Link></section></Page>;
  }

  const labels = lang === "pt"
    ? { back: "Todos os projetos", problem: "Problema", objective: "Objetivo", features: "Funcionalidades", architecture: "Arquitetura tecnológica", status: "Estado atual", access: "Aceder ao projeto", demo: "Abrir demonstração", github: "Código no GitHub", related: "Explorar outros projetos", scope: study.featured ? "Estudo de caso" : "Visão geral do projeto" }
    : { back: "All projects", problem: "Problem", objective: "Objective", features: "Features", architecture: "Technology architecture", status: "Current status", access: "Project access", demo: "Open live demo", github: "GitHub repository", related: "Explore other projects", scope: study.featured ? "Case study" : "Project overview" };

  const showGithub = project.github && !privateRepositories.has(project.id);
  return (
    <Page>
      <SEO title={`${project.title} | Arthur Santos`} description={content.intro} path={`/projects/${slug}`} />
      <article className="max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mt-5 mb-8"><ArrowLeft size={16}/> {labels.back}</Link>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
          <div className="relative aspect-[16/7] min-h-56 max-h-[520px] overflow-hidden">
            {project.image ? <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
            <GradientThumb iconName={project.icon} from={project.from} to={project.to} className="absolute inset-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/20 to-black/10"/>
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6">
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[.2em] text-brand-cyan">{content.eyebrow}</p>
              <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-sm sm:text-lg text-white/75 leading-relaxed">{content.intro}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="glass rounded-full px-3 py-1.5 text-xs">{project.status}</span>
                <span className="glass rounded-full px-3 py-1.5 text-xs">{labels.scope}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-12">
          <div className="space-y-10">
            <section>
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold"><span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-blue"><Lightbulb size={19}/></span>{labels.problem}</h2>
              <p className="mt-4 text-muted leading-8">{content.problem}</p>
            </section>
            <section>
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold"><span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-purple"><Target size={19}/></span>{labels.objective}</h2>
              <p className="mt-4 text-muted leading-8">{content.objective}</p>
            </section>
            <section>
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold"><span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-cyan"><ListChecks size={19}/></span>{labels.features}</h2>
              <ul className="mt-5 grid sm:grid-cols-2 gap-3">
                {content.features.map((feature) => <li key={feature} className="glass rounded-xl p-4 flex gap-3 text-sm text-muted leading-relaxed"><span className="text-brand-cyan">✓</span><span>{feature}</span></li>)}
              </ul>
            </section>
            <section>
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold"><span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-cyan"><Wrench size={19}/></span>{labels.architecture}</h2>
              <ul className="mt-5 space-y-3">
                {content.architecture.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0"/>{item}</li>)}
              </ul>
            </section>
            <section className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold"><span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan"><Layers3 size={19}/></span>{labels.status}</h2>
              <p className="mt-4 text-muted leading-8">{content.status}</p>
            </section>
          </div>
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold">{labels.access}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="btn-glow rounded-full px-5 py-3 text-sm flex items-center justify-center gap-2">{labels.demo}<ExternalLink size={15}/></a>}
                {showGithub && <a href={project.github} target="_blank" rel="noreferrer" className="glass rounded-full px-5 py-3 text-sm flex items-center justify-center gap-2">{labels.github}<Github size={15}/></a>}
                {!project.demo && !showGithub && <p className="text-xs text-muted leading-relaxed">{lang === "pt" ? "Não existe uma demonstração pública confirmada para este projeto." : "There is no confirmed public demo for this project."}</p>}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold">{lang === "pt" ? "Tecnologias" : "Technologies"}</h2>
              <div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted">{tech}</span>)}</div>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-brand-cyan hover:text-white transition-colors">{labels.related}<ArrowUpRight size={15}/></Link>
          </aside>
        </div>
      </article>
    </Page>
  );
}
