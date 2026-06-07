"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Premium easeOut — smooth, no overshoot.
const EASE = [0.22, 1, 0.36, 1] as const;
// Fire just before the element reaches the bottom; never re-run (perf).
const MARGIN = "0px 0px -100px 0px";

/* Apple-style entrance: slides up + fades in as it scrolls into view, then stays.
   Only opacity + transform animate (GPU-friendly). */
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Opacity-only variant (lighter; use where preferred). */
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  fade?: boolean;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  fade = false,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={`transform-gpu ${className ?? ""}`}
      variants={fade ? fadeVariants : riseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: MARGIN }}
      transition={{ delay, duration: 0.7, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ---- Staggered reveal: children enter one after another, then stay ---- */

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={`transform-gpu ${className ?? ""}`}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: MARGIN }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={`transform-gpu ${className ?? ""}`} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Hairline that draws in (RTL: right→left) when scrolled into view. */
export function GrowLine({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: MARGIN }}
      transition={{ duration: 1.1, ease: EASE }}
      className={`origin-right transform-gpu ${className ?? ""}`}
    />
  );
}
