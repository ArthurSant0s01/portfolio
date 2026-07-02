import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import useCvDownload from "../hooks/useCvDownload";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { download, loading } = useCvDownload();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-lg" : "bg-transparent"
          }`}
        >
          <Link
            to="/"
            data-testid="nav-logo"
            className="font-black text-xl tracking-tight"
          >
            {profile.firstName}
            <span className="text-gradient">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive ? "text-white" : "text-muted hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {l.label}
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
            <button
              onClick={download}
              disabled={loading}
              data-testid="nav-download-cv"
              className="hidden sm:inline-flex items-center gap-2 btn-glow text-white text-sm font-medium px-5 py-2.5 rounded-full"
            >
              <Download size={16} />
              {loading ? "..." : "Download CV"}
            </button>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setOpen((v) => !v)}
              data-testid="nav-menu-toggle"
              aria-label="Toggle menu"
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
            className="lg:hidden mx-5 mt-3 glass-strong rounded-2xl p-4"
            data-testid="mobile-menu"
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm ${
                    isActive ? "text-white bg-white/5" : "text-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={download}
              data-testid="mobile-download-cv"
              className="mt-2 w-full inline-flex items-center justify-center gap-2 btn-glow text-white text-sm font-medium px-5 py-3 rounded-xl"
            >
              <Download size={16} /> Download CV
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
