import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { skills, profile } from "../data/portfolio";

function Bar({ name, level, i }) {
  return (
    <div data-testid={`skill-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-muted font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Page>
      <SEO title="Competências — Arthur de Oliveira dos Santos" description="Skills across web development, creative tools and artificial intelligence." />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading overline="Toolbox" title="Skills" subtitle="A blend of technical craft and creative fluency." testid="skills-heading" />

        <div className="mt-14 grid lg:grid-cols-2 gap-6 pb-16">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.08}>
              <div className="glass rounded-3xl p-8 h-full">
                <h3 className="text-xl font-bold mb-6">{group.category}</h3>
                <div className="space-y-5">
                  {group.items.map((s, i) => (
                    <Bar key={s.name} name={s.name} level={s.level} i={i} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Languages */}
        <div className="pb-24">
          <SectionHeading overline="Communication" title="Languages" testid="languages-heading" />
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {profile.languages.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08}>
                <div className="glass rounded-2xl p-7">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-lg font-bold">{l.name}</span>
                    <span className="text-sm text-brand-cyan font-mono">{l.level}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg,#8B5CF6,#06B6D4)" }}
                    />
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
