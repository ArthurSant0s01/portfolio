import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { GradientThumb } from "../components/Visuals";
import { useI18n } from "../i18n/I18nContext";

export default function Projects() {
  const { t, lang } = useI18n();
  const projects = t.projects.items;
  const categories = [t.common.all, ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = React.useState(t.common.all);
  const list = filter === t.common.all ? projects : projects.filter((p) => p.category === filter);
  const detailLabel = lang === "pt" ? "Explorar projeto" : "Explore project";

  return (
    <Page>
      <SEO title={t.meta.projects.title} description={t.meta.projects.description} path="/projects" />
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading as="h1" overline={t.projects.overline} title={t.projects.title} subtitle={t.projects.subtitle} testid="projects-heading" />
        <div className="mt-10 flex flex-wrap gap-3" data-testid="project-filters">
          {categories.map((category) => (
            <button key={category} onClick={() => setFilter(category)} data-testid={`filter-${category.toLowerCase().replace(/\\s+/g, "-")}`}
              className={`px-5 py-2.5 rounded-full text-sm transition-colors ${filter === category ? "btn-glow text-white" : "glass text-muted hover:text-white"}`}>
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5 pb-24">
          {list.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index, 3) * 0.025} y={12}>
              <Link to={`/projects/${project.id}`} className="project-card glass rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                  {project.image ? <img src={project.image} alt={`${project.title} — ${t.projects.visualNote}`} loading="lazy" decoding="async" className="relative z-10 w-full h-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
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
                  <div className="mt-auto pt-6 flex items-center gap-2 text-sm text-brand-cyan">{detailLabel}<ArrowUpRight size={15}/></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

import React from "react";
