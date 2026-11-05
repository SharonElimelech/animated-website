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
 *  - A 60% scrim (below) dims the video so text over it stays readable; the
 *    video must stay all-keyframe (ffmpeg -g 1) or scroll-seeks stutter.
 *  - Zero React state on scroll: progress lives in a ref (useMotionValueEvent);
 *    an rAF loop draws imperatively, cross-fading the two decoded frames around
 *    the exact position so slow scrolling stays smooth (one seek in flight).
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

    // Tunables in one place (scroll-scrubbed-visual-sequence skill).
    const CFG = {
      fps: 24, // source frame rate
      maxCache: 6, // decoded frames kept around (≈8MB each at 1080p)
      seekTimeoutMs: 400, // give up on a stuck seek
      reducedMotionFrame: 0.5, // static frame (fraction of the video) under reduced motion
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Only 145 frames span the whole page (~46px of scroll each), so a slow scroll
    // used to step like a slideshow. We keep the two frames around the exact scroll
    // position decoded and cross-fade between them by the fractional position.
    const cache = new Map<number, ImageBitmap>();
    let frames = 0;
    let wantIndex = 0;
    let seekingFrame = -1;
    let seekStartedAt = 0;
    let rafId = 0;
    let lastKey = "";
    let ready = false;

    // object-fit: cover, drawn in CSS pixels (ctx pre-scaled by DPR)
    const paint = (a: ImageBitmap, b: ImageBitmap | undefined, t: number) => {
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const scale = Math.max(cssW / a.width, cssH / a.height);
      const dw = a.width * scale;
      const dh = a.height * scale;
      const dx = (cssW - dw) / 2;
      const dy = (cssH - dh) / 2;
      ctx.globalAlpha = 1;
      ctx.drawImage(a, dx, dy, dw, dh);
      if (b && t > 0.002) {
        ctx.globalAlpha = t;
        ctx.drawImage(b, dx, dy, dw, dh);
        ctx.globalAlpha = 1;
      }
    };
    const draw = () => {
      lastKey = ""; // force a repaint on the next tick
    };

    const nearestCached = (i: number) => {
      let best: ImageBitmap | undefined;
      let bestD = Infinity;
      for (const [k, bmp] of cache) {
        const d = Math.abs(k - i);
        if (d < bestD) {
          bestD = d;
          best = bmp;
        }
      }
      return best;
    };

    // One seek in flight at a time; never queue every seek during fast scrolling.
    const requestFrame = (i: number, now: number) => {
      if (cache.has(i)) return;
      if (seekingFrame !== -1 && now - seekStartedAt < CFG.seekTimeoutMs) return;
      seekingFrame = i;
      seekStartedAt = now;
      try {
        video.currentTime = (i + 0.5) / CFG.fps; // middle of frame i
      } catch {
        seekingFrame = -1;
      }
    };

    const onFrameDecoded = async () => {
      const i = seekingFrame;
      if (i < 0) return;
      try {
        const bmp = await createImageBitmap(video);
        cache.get(i)?.close();
        cache.set(i, bmp);
        while (cache.size > CFG.maxCache) {
          let far = -1;
          for (const k of cache.keys()) if (far < 0 || Math.abs(k - wantIndex) > Math.abs(far - wantIndex)) far = k;
          cache.get(far)?.close();
          cache.delete(far);
        }
      } catch {
        // decode failed; the next tick retries
      }
      seekingFrame = -1;
      lastKey = "";
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

    const onMeta = () => {
      frames = Math.max(1, Math.round((video.duration || 0) * CFG.fps));
    };
    const onSeeked = () => {
      void onFrameDecoded();
    };
    const onReady = () => {
      if (ready) return;
      ready = true;
      setup();
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
      // Pause work while the tab is hidden.
      if (ready && frames > 0 && !document.hidden) {
        const pos = (reducedMotion ? CFG.reducedMotionFrame : progress.current) * (frames - 1);
        const f = Math.min(Math.max(pos, 0), frames - 1);
        const i = Math.floor(f);
        const j = Math.min(i + 1, frames - 1);
        const t = reducedMotion ? 0 : f - i;
        wantIndex = i;

        // Decode what the current position needs: frame i first, then i+1.
        if (!cache.has(i)) requestFrame(i, now);
        else if (!reducedMotion && !cache.has(j)) requestFrame(j, now);

        const a = cache.get(i);
        const key = `${i}|${t.toFixed(3)}|${cache.has(i)}|${cache.has(j)}`;
        if (key !== lastKey) {
          if (a) paint(a, cache.get(j), t);
          else {
            const near = nearestCached(i); // keep something on screen while decoding
            if (near) paint(near, undefined, 0);
          }
          lastKey = key;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setup);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      for (const bmp of cache.values()) bmp.close();
      cache.clear();
    };
  }, [smooth]);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
      {!fallback ? (
        <canvas ref={canvasRef} className="block h-full w-full" />
      ) : (
        <FallbackBackdrop />
      )}

      {/* ponytail: dim scrim so text over the moving video stays readable */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-obsidian/60" />

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
