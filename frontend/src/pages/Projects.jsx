import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { projects } from "../data/portfolio";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Page>
      <SEO title="Projetos — Arthur de Oliveira dos Santos" description="Selected web development, creative and AI projects by Arthur de Oliveira dos Santos." />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading overline="Portfolio" title="Projects" subtitle="A collection of work spanning web development, creative direction and AI." testid="projects-heading" />

        <div className="mt-10 flex flex-wrap gap-3" data-testid="project-filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                filter === c ? "btn-glow text-white" : "glass text-muted hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 pb-24">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8 }}
                onClick={() => setActive(p)}
                data-testid={`project-card-${i}`}
                className="group glass rounded-3xl overflow-hidden cursor-pointer h-full"
                data-cursor="hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-mono glass px-3 py-1 rounded-full">{p.status}</span>
                  <span className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="p-7">
                  <p className="overline mb-2">{p.category}</p>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Detail modal */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-sm"
          onClick={() => setActive(null)}
          data-testid="project-modal"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setActive(null)}
                data-testid="project-modal-close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-8">
              <p className="overline mb-2">{active.category} · {active.status}</p>
              <h3 className="text-3xl font-black tracking-tight">{active.title}</h3>
              <p className="mt-4 text-muted leading-relaxed">{active.description}</p>
              <h4 className="mt-8 text-sm font-bold uppercase tracking-wide text-muted">Features</h4>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {active.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-brand-cyan" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Page>
  );
}
