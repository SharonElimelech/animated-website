"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold reading-progress bar pinned to the top edge. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
    restDelta: 0.0001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-right transform-gpu will-change-transform bg-gradient-to-l from-bronze via-gold to-gold-soft"
    />
  );
}
