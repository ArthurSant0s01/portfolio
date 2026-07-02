import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Download, Globe } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import { useI18n } from "../i18n/I18nContext";
import useCvDownload from "../hooks/useCvDownload";
import { Magnetic } from "./Magnetic";

function LangSwitch({ compact }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`inline-flex items-center gap-1 glass rounded-full p-1 ${compact ? "" : ""}`} data-testid="lang-switch">
      <Globe size={14} className="text-muted ml-2 mr-0.5" aria-hidden />
      {["en", "pt"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          data-testid={`lang-${l}`}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 rounded-full text-xs font-mono uppercase transition-colors ${
            lang === l ? "bg-white text-black" : "text-muted hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();
  const { download } = useCvDownload();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      data-testid="navbar"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[60]"
        style={{ scaleX, background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#06B6D4)" }}
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${scrolled ? "glass-strong shadow-lg" : "bg-transparent"}`}>
          <Link to="/" data-testid="nav-logo" className="font-black text-lg sm:text-xl tracking-tight" aria-label={profile.fullName}>
            {profile.firstName}
            <span className="text-gradient">.</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                data-testid={`nav-link-${l.key}`}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm rounded-full transition-colors ${isActive ? "text-white" : "text-muted hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {t.nav[l.key]}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)" }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LangSwitch />
            </div>
            <Magnetic className="hidden lg:inline-block">
              <button
                onClick={() => download("en")}
                data-testid="nav-download-cv"
                className="inline-flex items-center gap-2 btn-glow text-white text-sm font-medium px-5 py-2.5 rounded-full"
              >
                <Download size={16} /> {t.nav.downloadCv}
              </button>
            </Magnetic>
            <button
              className="xl:hidden text-white p-2"
              onClick={() => setOpen((v) => !v)}
              data-testid="nav-menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu-panel"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden mx-5 mt-3 glass-strong rounded-2xl p-4"
            data-testid="mobile-menu"
            id="mobile-menu-panel"
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                data-testid={`mobile-nav-link-${l.key}`}
                className={({ isActive }) => `block px-4 py-3 rounded-xl text-sm ${isActive ? "text-white bg-white/5" : "text-muted"}`}
              >
                {t.nav[l.key]}
              </NavLink>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <LangSwitch compact />
              <button
                onClick={() => download("en")}
                data-testid="mobile-download-cv"
                className="inline-flex items-center gap-2 btn-glow text-white text-sm font-medium px-5 py-3 rounded-xl"
              >
                <Download size={16} /> {t.nav.downloadCv}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
