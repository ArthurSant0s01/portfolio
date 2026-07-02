import { motion } from "framer-motion";
import { Download, MapPin, Languages, Code2, Camera, Clapperboard } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { profile, experience } from "../data/portfolio";
import useCvDownload from "../hooks/useCvDownload";

export default function About() {
  const { download } = useCvDownload();

  return (
    <Page>
      <SEO title="Sobre — Arthur de Oliveira dos Santos" description="18-year-old creative developer, videographer, photographer and AI enthusiast based in Portugal." />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden glass p-2">
                <div
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 0% 0%, rgba(59,130,246,0.4) 0%, transparent 45%), radial-gradient(120% 120% at 100% 100%, rgba(139,92,246,0.4) 0%, transparent 45%), radial-gradient(90% 90% at 50% 100%, rgba(6,182,212,0.25) 0%, transparent 55%), #0A0A0A",
                  }}
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 opacity-[0.10]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-brand-blue/30 blur-2xl" />
                  <div className="absolute bottom-24 right-8 w-28 h-28 rounded-full bg-brand-purple/30 blur-2xl" />
                  <div className="relative text-center">
                    <span className="block text-8xl font-black tracking-tighter text-gradient leading-none">A.</span>
                    <span className="mt-4 block overline">Creative Developer</span>
                  </div>
                  <div className="absolute top-6 right-6 w-11 h-11 rounded-xl glass-strong flex items-center justify-center">
                    <Code2 size={18} className="text-brand-cyan" />
                  </div>
                  <div className="absolute bottom-28 left-6 w-11 h-11 rounded-xl glass-strong flex items-center justify-center">
                    <Camera size={18} className="text-brand-purple" />
                  </div>
                  <div className="absolute top-1/2 right-8 w-11 h-11 rounded-xl glass-strong flex items-center justify-center">
                    <Clapperboard size={18} className="text-brand-blue" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 flex items-center gap-3">
                  <MapPin size={18} className="text-brand-cyan" />
                  <div>
                    <p className="text-sm font-medium">{profile.location}</p>
                    <p className="text-xs text-muted font-mono">{profile.age} years old</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7">
            <p className="overline mb-4">About me</p>
            <Reveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
                Turning ideas into <span className="text-gradient">experiences</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-muted text-base sm:text-lg leading-relaxed">{profile.about}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                <Languages size={18} className="text-brand-purple" />
                <div className="flex flex-wrap gap-4">
                  {profile.languages.map((l) => (
                    <span key={l.name} className="font-mono">
                      {l.name} — <span className="text-white">{l.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <button
                onClick={download}
                data-testid="about-download-cv"
                className="mt-10 inline-flex items-center gap-2 btn-glow text-white font-medium px-7 py-3.5 rounded-full"
              >
                <Download size={18} /> Download CV
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading overline="My journey" title="Experience" subtitle="A timeline of growth across code, cinema and creativity." testid="timeline-heading" />

        <div className="mt-16 relative">
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue via-brand-purple to-transparent sm:-translate-x-1/2" />
          <div className="space-y-12">
            {experience.map((e, i) => (
              <Reveal key={e.year} delay={i * 0.05}>
                <div className={`relative pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 ${i % 2 === 0 ? "" : "sm:[direction:rtl]"}`}>
                  <motion.span
                    className="absolute left-0 sm:left-1/2 top-1.5 w-3 h-3 rounded-full bg-brand-cyan sm:-translate-x-1/2 ring-4 ring-brand-cyan/20"
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className={`[direction:ltr] ${i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:pl-12"}`}>
                    <span className="overline">{e.year}</span>
                    <h3 className="mt-2 text-xl font-bold">{e.title}</h3>
                    <p className="text-sm text-brand-purple font-mono mt-1">{e.org}</p>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{e.description}</p>
                  </div>
                  <div className="hidden sm:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
