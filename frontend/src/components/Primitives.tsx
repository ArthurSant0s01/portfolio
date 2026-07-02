import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "./Reveal";

export function Counter({ value, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-mono">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function SectionHeading({ overline, title, subtitle, center = false, testid, as = "h2" }) {
  const HeadingTag = as;

  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`} data-testid={testid}>
      {overline && (
        <Reveal>
          <p className="overline mb-4">{overline}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <HeadingTag className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
          {title}
        </HeadingTag>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-muted text-base sm:text-lg leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Page({ children }) {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28 sm:pt-36"
    >
      {children}
    </motion.main>
  );
}
