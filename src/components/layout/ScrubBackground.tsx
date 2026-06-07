"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

/**
 * Apple-style canvas-video scrubbing — scroll-tied, smooth, bright, sharp.
 *
 *  - A hidden <video> (all-keyframe, so seeks are instant) is seeked by scroll
 *    progress; each decoded frame is painted to a full-screen <canvas>.
 *  - High-DPI: backing store = CSS size × devicePixelRatio + ctx.scale(dpr) so
 *    frames render crisply at native screen density (no softness).
 *  - NO dimming overlay — the background stays fully bright. Text legibility is
 *    handled by the deep glass bubble in the Hero.
 *  - Zero React state on scroll: progress lives in a ref (useMotionValueEvent);
 *    an rAF loop draws imperatively. Seeks gated on `seeked` + frame-snapped.
 */
export default function ScrubBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef(0);
  const [fallback, setFallback] = useState(false);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0001,
  });
  useMotionValueEvent(smooth, "change", (v) => {
    progress.current = v;
  });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let rvfcId = 0;
    let seeking = false;
    let seekStartedAt = 0;
    let duration = 0;
    let ready = false;
    const FRAME = 1 / 24;
    const SEEK_TIMEOUT = 240;
    const hasRVFC = "requestVideoFrameCallback" in video;

    // object-fit: cover, drawn in CSS pixels (ctx pre-scaled by DPR)
    const draw = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const scale = Math.max(cssW / vw, cssH / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(video, (cssW - dw) / 2, (cssH - dh) / 2, dw, dh);
    };

    // High-DPI setup: CSS size standard, backing store = css × DPR
    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      draw();
    };

    const onFrame = () => {
      draw();
      if (hasRVFC) rvfcId = video.requestVideoFrameCallback(onFrame);
    };
    const onMeta = () => {
      duration = video.duration || 0;
    };
    const onSeeked = () => {
      seeking = false;
      if (!hasRVFC) draw();
    };
    const onReady = () => {
      if (ready) return;
      ready = true;
      setup();
      if (hasRVFC) rvfcId = video.requestVideoFrameCallback(onFrame);
    };

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", () => setFallback(true));
    if (video.readyState >= 1) onMeta();
    if (video.readyState >= 2) onReady();

    // Prime the decoder (Safari/iOS needs play()/pause() to allow seeking)
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.then(() => video.pause()).catch(() => {});
    }

    const tick = (now: number) => {
      if (ready && duration > 0) {
        if (seeking && now - seekStartedAt > SEEK_TIMEOUT) seeking = false;
        if (!seeking) {
          const target = progress.current * duration;
          const snapped = Math.round(target / FRAME) * FRAME;
          if (Math.abs(video.currentTime - snapped) > FRAME / 2) {
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
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(rafId);
      if (hasRVFC && rvfcId) video.cancelVideoFrameCallback?.(rvfcId);
      window.removeEventListener("resize", setup);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
      {!fallback ? (
        <canvas ref={canvasRef} className="block h-full w-full" />
      ) : (
        <FallbackBackdrop />
      )}

      {/* Hidden source video — decoded for canvas, never composited */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        style={{ display: "none" }}
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
