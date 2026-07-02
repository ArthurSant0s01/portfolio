import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "", ...rest }) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
