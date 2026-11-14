import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 12, className = "", ...rest }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.35, delay: Math.min(delay, 0.08), ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const MeshBackground = () => (
  <div className="mesh-bg" aria-hidden>
    <div className="mesh-blob b1" />
    <div className="mesh-blob b2" />
    <div className="mesh-blob b3" />
  </div>
);
