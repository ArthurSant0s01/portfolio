import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { profile, navLinks } from "../data/portfolio";
import { useI18n } from "../i18n/I18nContext";
import { Magnetic } from "./Magnetic";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const socials = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5" data-testid="footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <p className="overline mb-6">{t.footer.letsCreate}</p>
        <Magnetic strength={0.15}>
          <Link to="/contact" data-testid="footer-lets-talk" className="group inline-flex items-center gap-4 flex-wrap">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
              {t.footer.letstalk.split(" ")[0]} <span className="text-gradient">{t.footer.letstalk.split(" ").slice(1).join(" ")}</span>
            </h2>
            <span className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/15 group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-45 transition-transform" />
            </span>
          </Link>
        </Magnetic>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-black text-xl">
              {profile.firstName}
              <span className="text-gradient">.</span>
            </div>
            <p className="text-muted text-sm mt-3 max-w-xs leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="overline mb-4">{t.footer.navTitle}</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} data-testid={`footer-link-${l.key}`} className="text-muted hover:text-white transition-colors text-sm">
                    {t.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="overline mb-4">{t.footer.elsewhereTitle}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-all"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
            <a href={`mailto:${profile.email}`} className="block mt-6 text-sm text-white hover:text-brand-cyan transition-colors font-mono">
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted font-mono">
          <span>© {year} {profile.fullName}. {t.footer.rights}</span>
          <span>{t.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
