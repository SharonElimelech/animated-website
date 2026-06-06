"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Apple-style scroll-scrubbed hero.
 * The video's `currentTime` is bound to scroll progress through a 320vh track,
 * driven by a single requestAnimationFrame loop that:
 *   - smooths (lerps) toward the target time for buttery motion, and
 *   - frame-skips: only writes `currentTime` when the delta exceeds one frame,
 *     so a 4K source stays at 60fps instead of thrashing the decoder.
 */
export default function HeroVideoScrub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const progress = useRef(0); // latest scroll progress (0–1)
  const rendered = useRef(0); // smoothed time currently shown
  const durationRef = useRef(0);

  const [videoOk, setVideoOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  /* Hero copy choreography — fades & lifts away as the structure "locks in" */
  const textOpacity = useTransform(scrollYProgress, [0, 0.16, 0.3], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const textBlurNum = useTransform(scrollYProgress, [0, 0.3], [0, 9]);
  const textFilter = useTransform(textBlurNum, (b) => `blur(${b}px)`);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.82]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  /* Scroll-linked scrubbing loop */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    const FRAME_EPSILON = 1 / 60; // skip seeks smaller than a single frame

    const onMeta = () => {
      durationRef.current = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    // Prime the decoder (iOS/Safari needs a play()/pause() to allow seeking)
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.then(() => video.pause()).catch(() => {});
    }

    const tick = () => {
      const d = durationRef.current;
      if (d > 0) {
        const target = progress.current * d;
        // Critically-damped lerp toward target for smooth scrubbing
        rendered.current += (target - rendered.current) * 0.12;
        if (Math.abs(video.currentTime - rendered.current) > FRAME_EPSILON) {
          try {
            video.currentTime = rendered.current;
          } catch {
            /* ignore transient seek errors during buffering */
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [videoOk]);

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      {/* Pinned stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Video / graceful fallback */}
        <div className="absolute inset-0 will-change-transform [transform:translateZ(0)]">
          {videoOk ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/hero-video.mp4"
              poster="/hero-poster.jpg"
              muted
              playsInline
              preload="auto"
              onError={() => setVideoOk(false)}
            />
          ) : (
            <FallbackBackdrop />
          )}
        </div>

        {/* Cinematic gradients */}
        <motion.div
          aria-hidden
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/20 to-obsidian"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,var(--color-obsidian)_92%)]"
        />

        {/* Hero copy */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, filter: textFilter }}
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="mb-7 text-xs font-light tracking-[0.45em] text-gold/85 sm:text-sm"
          >
            עריכת דין · חדלות פירעון
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 44, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
            className="text-5xl leading-[1.08] text-ink sm:text-7xl lg:text-[5.5rem]"
          >
            הדר אלימלך
            <span className="mt-5 block text-gradient-gold text-3xl font-light sm:text-5xl lg:text-6xl">
              מנהיגות משפטית בחדלות פירעון
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
            className="balance mt-8 max-w-xl text-base font-light leading-relaxed text-muted sm:text-lg"
          >
            ייצוג משפטי ברמה הגבוהה ביותר — הופכים משבר כלכלי להזדמנות
            לפתיחה חדשה, בדיסקרטיות ובמקצועיות ללא פשרות.
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3 text-muted"
        >
          <span className="text-[0.7rem] tracking-[0.35em]">גלילה</span>
          <span className="relative flex h-12 w-px overflow-hidden bg-line">
            <motion.span
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-x-0 h-1/2 bg-gold"
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* Elegant fallback shown until /hero-video.mp4 is dropped into /public */
function FallbackBackdrop() {
  return (
    <div className="grain relative h-full w-full bg-obsidian">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(138,106,53,0.18),transparent_55%)]" />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(212,175,55,0.12),transparent)] blur-3xl"
      />
    </div>
  );
}
