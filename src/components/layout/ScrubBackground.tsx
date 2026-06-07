"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Persistent fixed background video for the whole page.
 * Its currentTime scrubs across the ENTIRE page scroll, so it travels from
 * fragmented (top) to solid/locked (bottom) as the user reads through the
 * sections that flow over it. A scroll-darkening scrim keeps Hebrew text sharp.
 */
export default function ScrubBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef(0);
  const [videoOk, setVideoOk] = useState(true);

  const { scrollYProgress } = useScroll(); // whole document
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0001,
  });
  useMotionValueEvent(smooth, "change", (v) => {
    progress.current = v;
  });

  // Scrim strengthens as we descend → lower sections read calm and solid.
  const scrimOpacity = useTransform(smooth, [0, 0.5, 1], [0.4, 0.55, 0.72]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let seeking = false;
    let seekStartedAt = 0;
    let duration = 0;
    const SNAP = 1 / 24;
    const SEEK_TIMEOUT = 220;

    const onMeta = () => {
      duration = video.duration || 0;
    };
    const onSeeked = () => {
      seeking = false;
    };
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", onSeeked);
    if (video.readyState >= 1) onMeta();

    const p = video.play();
    if (p && typeof p.then === "function") {
      p.then(() => video.pause()).catch(() => {});
    }

    const tick = (now: number) => {
      if (duration > 0) {
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
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
      {videoOk ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover [transform:translateZ(0)] will-change-transform"
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          onError={() => setVideoOk(false)}
        />
      ) : (
        <FallbackBackdrop />
      )}

      {/* Legibility scrim — darkens as you scroll */}
      <motion.div
        aria-hidden
        style={{ opacity: scrimOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian/75"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-obsidian)_96%)]"
      />
    </div>
  );
}

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
