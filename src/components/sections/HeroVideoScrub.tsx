"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Apple-style scroll-scrubbed hero.
 *
 * Smoothness strategy (the reason it no longer lags):
 *  1. SPRING the scroll progress — the value driving everything is fluid,
 *     not a raw jittery scroll position.
 *  2. GATE every seek on the `seeked` event — we never issue a new
 *     `currentTime` write while the decoder is still serving the last one,
 *     so seeks can't pile up.
 *  3. SNAP target time to a coarse grid — fewer distinct seek targets means
 *     the decoder reuses decoded frames instead of thrashing on a 4K source.
 *  4. PARALLAX scale on the video runs on the compositor every frame, so the
 *     motion reads as continuous even between discrete video seeks.
 */
export default function HeroVideoScrub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef(0); // latest smoothed progress (0–1)
  const [videoOk, setVideoOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 1) Spring-smoothed progress — buttery input for both scrub and parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0001,
  });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    progress.current = v;
  });

  /* Cinematic, compositor-only motion (cheap, runs every frame) */
  const videoScale = useTransform(smoothProgress, [0, 1], [1.12, 1]);
  const videoY = useTransform(smoothProgress, [0, 1], ["-2%", "2%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.16, 0.3], [1, 1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const textBlurNum = useTransform(smoothProgress, [0, 0.3], [0, 10]);
  const textFilter = useTransform(textBlurNum, (b) => `blur(${b}px)`);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.5, 0.85]);
  const cueOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  /* 2+3) Gated, grid-snapped scrubbing loop */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let seeking = false;
    let seekStartedAt = 0;
    let duration = 0;
    const SNAP = 1 / 24; // match source fps — cheap now the video is all-keyframe
    const SEEK_TIMEOUT = 220; // ms; recover if a `seeked` never fires

    const onMeta = () => {
      duration = video.duration || 0;
    };
    const onSeeked = () => {
      seeking = false;
    };
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", onSeeked);
    if (video.readyState >= 1) onMeta();

    // Prime the decoder (iOS/Safari needs play()/pause() to allow seeking)
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.then(() => video.pause()).catch(() => {});
    }

    const tick = (now: number) => {
      if (duration > 0) {
        // Release a stuck seek (target already buffered / no event fired)
        if (seeking && now - seekStartedAt > SEEK_TIMEOUT) seeking = false;

        if (!seeking) {
          const target = progress.current * duration;
          const snapped = Math.round(target / SNAP) * SNAP;
          if (Math.abs(video.currentTime - snapped) > SNAP * 0.5) {
            seeking = true;
            seekStartedAt = now;
            try {
              video.currentTime = snapped;
            } catch {
              seeking = false;
            }
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [videoOk]);

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      {/* Pinned stage */}
      <div className="grain sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Video / graceful fallback — parallax scale runs on the compositor */}
        <motion.div
          style={{ scale: videoScale, y: videoY }}
          className="absolute inset-0 will-change-transform [transform:translateZ(0)]"
        >
          {videoOk ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/hero-video.mp4"
              muted
              playsInline
              preload="auto"
              onError={() => setVideoOk(false)}
            />
          ) : (
            <FallbackBackdrop />
          )}
        </motion.div>

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
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
            }}
            className="text-5xl leading-[1.08] text-ink sm:text-7xl lg:text-[5.5rem]"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 44, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.2, ease: EASE },
                },
              }}
              className="block"
            >
              הדר אלימלך
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 44, filter: "blur(12px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.2, ease: EASE },
                },
              }}
              className="mt-5 block text-gradient-gold text-3xl font-light sm:text-5xl lg:text-6xl"
            >
              מנהיגות משפטית בחדלות פירעון
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.8 }}
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
