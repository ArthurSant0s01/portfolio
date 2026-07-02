import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight, Plus } from "lucide-react";

const DOT_GRID = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
};

// Gradient cover used instead of stock images. Fully data-driven.
export function GradientThumb({ iconName = "Folder", from = "#3B82F6", to = "#8B5CF6", label, className = "" }) {
  const Icon = Icons[iconName] || Icons.Folder;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${from}66 0%, transparent 46%), radial-gradient(120% 120% at 100% 100%, ${to}66 0%, transparent 46%), #0A0A0A`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.10]" style={DOT_GRID} />
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl" style={{ background: from, opacity: 0.35 }} />
      <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full blur-3xl" style={{ background: to, opacity: 0.3 }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center shadow-lg">
          <Icon size={26} className="text-white" />
        </div>
      </div>
      {label && <span className="absolute bottom-3 left-4 overline">{label}</span>}
    </div>
  );
}

// Elegant empty state for sections that will grow (videos, photography).
export function EmptyGallery({ iconName = "ImagePlus", title, description, count = 6, aspect = "aspect-video", from = "#3B82F6", to = "#8B5CF6" }) {
  const Icon = Icons[iconName] || Icons.ImagePlus;
  return (
    <div className="relative" data-testid="empty-gallery">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className={`relative ${aspect} rounded-2xl overflow-hidden glass border border-dashed border-white/10 flex items-center justify-center group`}
          >
            <div className="absolute inset-0 opacity-[0.07]" style={DOT_GRID} />
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-30" style={{ background: i % 2 ? to : from }} />
            <div className="relative w-12 h-12 rounded-full glass-strong flex items-center justify-center text-muted group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-mono text-brand-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" /> Coming soon
        </div>
        <h3 className="mt-5 text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-sm text-muted leading-relaxed">{description}</p>
        <Link
          to="/contacto"
          data-testid="empty-gallery-cta"
          className="mt-7 inline-flex items-center gap-2 btn-glow text-white text-sm font-medium px-6 py-3 rounded-full"
        >
          Work with me <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export { Plus };
