import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Global animated background: gradient mesh blobs + mouse-reactive glow.
export default function Background() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return undefined;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, reduceMotion]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden>
      <div className="mesh-bg">
        <div className="mesh-blob b1" />
        <div className="mesh-blob b2" />
        <div className="mesh-blob b3" />
      </div>
      {!reduceMotion && (
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute -top-64 -left-64 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        >
          <div
            className="w-full h-full rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.5), transparent 60%)", filter: "blur(40px)" }}
          />
        </motion.div>
      )}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
