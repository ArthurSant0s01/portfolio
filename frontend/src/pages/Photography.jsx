import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { photos } from "../data/portfolio";

export default function Photography() {
  const [active, setActive] = useState(null);

  return (
    <Page>
      <SEO title="Fotografia — Arthur de Oliveira dos Santos" description="Moody, story-driven photography — portraits, studio and street by Arthur de Oliveira dos Santos." />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading overline="Through the lens" title="Photography" subtitle="Moody, story-driven frames captured in light and shadow." testid="photography-heading" />

        {/* Masonry via columns */}
        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 pb-24 [column-fill:_balance]">
          {photos.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
              <motion.button
                whileHover={{ scale: 1.01 }}
                onClick={() => setActive(p)}
                data-testid={`photo-card-${i}`}
                data-cursor="hover"
                className="group relative block w-full overflow-hidden rounded-2xl glass"
              >
                <img src={p.image} alt={p.title} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <p className="overline mb-1">{p.category}</p>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </section>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/85 backdrop-blur-sm"
          onClick={() => setActive(null)}
          data-testid="photo-modal"
        >
          <button
            onClick={() => setActive(null)}
            data-testid="photo-modal-close"
            className="absolute top-6 right-6 w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
          <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img src={active.image} alt={active.title} className="max-h-[82vh] w-auto rounded-2xl" />
            <div className="mt-4 text-center">
              <p className="overline mb-1">{active.category}</p>
              <h3 className="text-xl font-bold">{active.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Page>
  );
}
