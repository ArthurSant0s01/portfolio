import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { EmptyGallery } from "../components/Visuals";
import { useI18n } from "../i18n/I18nContext";

export default function Photography() {
  const { t } = useI18n();
  const photos = t.photography.items || [];
  const filters = t.photography.filters;
  const [filter, setFilter] = useState(filters[0]);
  const [active, setActive] = useState(null);

  const list = filter === filters[0] ? photos : photos.filter((p) => p.category === filter);
  const hasPhotos = photos.length > 0;

  return (
    <Page>
      <SEO title={t.meta.photography.title} description={t.meta.photography.description} path="/photography" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading as="h1" overline={t.photography.overline} title={t.photography.title} subtitle={t.photography.subtitle} testid="photography-heading" />

        {hasPhotos && (
          <div className="mt-10 flex flex-wrap gap-3" data-testid="photo-filters">
            {filters.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-5 py-2.5 rounded-full text-sm transition-all ${filter === c ? "btn-glow text-white" : "glass text-muted hover:text-white"}`}>
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 pb-24">
          {!hasPhotos ? (
            <EmptyGallery iconName="Camera" aspect="aspect-[4/5]" from="#8B5CF6" to="#06B6D4" title={t.photography.empty.title} description={t.photography.empty.description} />
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
              {list.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
                  <motion.button whileHover={{ scale: 1.01 }} onClick={() => setActive(p)} data-testid={`photo-card-${i}`} data-cursor="hover" className="group relative block w-full overflow-hidden rounded-2xl glass">
                    <img src={p.image} alt={`${p.title} in the ${p.category} photography collection by Arthur Santos`} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <p className="overline mb-1">{p.category}</p>
                      <h3 className="text-lg font-bold">{p.title}</h3>
                    </div>
                  </motion.button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/85 backdrop-blur-sm" onClick={() => setActive(null)} data-testid="photo-modal" role="dialog" aria-modal="true" aria-label="Photo preview modal">
          <button onClick={() => setActive(null)} aria-label="Close photo preview" data-testid="photo-modal-close" className="absolute top-6 right-6 w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:bg-white hover:text-black transition-colors"><X size={20} /></button>
          <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img src={active.image} alt={`${active.title} enlarged preview from Arthur Santos photography portfolio`} loading="eager" className="max-h-[82vh] w-auto rounded-2xl" />
            <div className="mt-4 text-center"><p className="overline mb-1">{active.category}</p><h3 className="text-xl font-bold">{active.title}</h3></div>
          </motion.div>
        </motion.div>
      )}
    </Page>
  );
}
