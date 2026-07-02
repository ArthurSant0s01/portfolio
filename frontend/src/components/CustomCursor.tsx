import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e) => {
      const t = e.target.closest("a, button, [data-cursor='hover'], input, textarea");
      setHovering(!!t);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          border: "1.5px solid rgba(255,255,255,0.9)",
          opacity: hidden ? 0 : 1,
        }}
        animate={{ scale: hovering ? 1.7 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
      <motion.div
        aria-hidden
        className="cursor-dot"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: "#fff",
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  );
}
