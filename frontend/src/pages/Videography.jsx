import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import SEO from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { Page, SectionHeading } from "../components/Primitives";
import { EmptyGallery } from "../components/Visuals";
import { useI18n } from "../i18n/I18nContext";

// Returns an embeddable URL for YouTube / Vimeo / direct MP4.
function getEmbed(v) {
  if (!v.url) return null;
  const yt = v.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1` };
  const vm = v.url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { type: "iframe", src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1` };
  return { type: "video", src: v.url };
}

export default function Videography() {
  const { t } = useI18n();
  const videos = t.videography.items || [];
  const [active, setActive] = useState(null);
  const hasVideos = videos.length > 0;
  const embed = active ? getEmbed(active) : null;

  return (
    <Page>
      <SEO title={t.meta.videography.title} description={t.meta.videography.description} path="/videography" />

      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading overline={t.videography.overline} title={t.videography.title} subtitle={t.videography.subtitle} testid="videography-heading" />

        <div className="mt-14 pb-24">
          {!hasVideos ? (
            <EmptyGallery iconName="Clapperboard" from="#3B82F6" to="#8B5CF6" title={t.videography.empty.title} description={t.videography.empty.description} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.05}>
                  <motion.button whileHover={{ y: -6 }} onClick={() => setActive(v)} data-testid={`video-card-${i}`} data-cursor="hover" className="group relative w-full text-left glass rounded-2xl overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={v.thumbnail} alt={v.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full glass-strong flex items-center justify-center group-hover:scale-110 transition-transform"><Play size={22} className="text-white ml-1" fill="white" /></span>
                      </span>
                    </div>
                    <div className="p-5"><p className="overline mb-1">{v.category}</p><h3 className="text-lg font-bold">{v.title}</h3></div>
                  </motion.button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm" onClick={() => setActive(null)} data-testid="video-modal">
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} data-testid="video-modal-close" className="absolute -top-12 right-0 w-10 h-10 rounded-full glass-strong flex items-center justify-center hover:bg-white hover:text-black transition-colors"><X size={18} /></button>
            <div className="rounded-2xl overflow-hidden glass-strong">
              {embed?.type === "iframe" ? (
                <iframe title={active.title} className="w-full aspect-video" src={embed.src} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              ) : (
                <video className="w-full aspect-video" controls autoPlay poster={active.thumbnail}>
                  {embed?.src && <source src={embed.src} type="video/mp4" />}
                </video>
              )}
              <div className="p-5"><p className="overline mb-1">{active.category}</p><h3 className="text-xl font-bold">{active.title}</h3></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Page>
  );
}
