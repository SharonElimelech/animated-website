"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

/**
 * Apple-style canvas-video scrubbing — scroll-tied, smooth, bright, sharp.
 *
 *  - An all-keyframe <video> (so seeks are instant) is seeked by scroll
 *    progress; each decoded frame is painted to a full-screen <canvas>. The
 *    video itself is kept invisible behind the canvas (NOT display:none, which
 *    iOS Safari refuses to decode).
 *  - Resolution is adaptive: large / high-DPI screens (incl. fullscreen on 4K)
 *    load a 4K source and stay crisp; phones/laptops get the lighter 1440p one.
 *  - High-DPI: backing store = CSS size × devicePixelRatio + ctx.scale(dpr) so
 *    frames render crisply at native screen density. Canvas is re-sized on both
 *    `resize` and `fullscreenchange` so entering fullscreen stays sharp.
 *  - This is core hero content, so it renders regardless of "reduce motion";
 *    the scrub is scroll-driven (user-controlled), not auto-playing. Only
 *    decorative entrance/parallax effects respect reduce-motion elsewhere.
 *  - Zero React state on scroll: progress lives in a ref (useMotionValueEvent);
 *    an rAF loop draws imperatively. Seeks gated on `seeked` + frame-snapped.
 */
export default function ScrubBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef(0);
  const [fallback, setFallback] = useState(false);
  // Pick source resolution by device pixels (screen width × DPR) so large /
  // high-DPI displays — and fullscreen on 4K — get the 4K source and stay
  // crisp, while phones/standard laptops load the lighter 1440p file. Decided
  // on the client (after mount) to match the actual device.
  //
  // The video is fetched as a Blob and played from an object URL instead of a
  // plain path. Frame-accurate scroll-scrubbing relies on seeking
  // (video.currentTime = t), which requires HTTP Range support. Cloudflare's
  // static-asset server returns the whole file (200, no Accept-Ranges), so a
  // direct <video src="/…mp4"> cannot seek and the scrub never advances.
  // A blob: URL is fully in-memory and seekable everywhere.
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let objectUrl: string | null = null;
    let aborted = false;
    const ctrl = new AbortController();
    // Deferred to a microtask so this isn't a synchronous setState during
    // commit, while still running reliably (rAF is throttled in background
    // tabs and may never fire, leaving the hero uninitialized).
    queueMicrotask(async () => {
      if (aborted) return;
      // Touch devices / data-saver: scrubbing decodes a video frame on every
      // scroll tick — far too heavy for phones and the main cause of scroll
      // jank there. Fall back to the static backdrop instead of the scrub.
      const coarse = window.matchMedia?.("(pointer: coarse)").matches;
      const lowData = window.matchMedia?.("(prefers-reduced-data: reduce)").matches;
      const small = window.innerWidth < 768;
      if (coarse || lowData || small) {
        setFallback(true);
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      const deviceW = (window.screen?.width || window.innerWidth) * dpr;
      const path = deviceW >= 2560 ? "/hero-video-4k.mp4" : "/hero-video-1440.mp4";
      try {
        const res = await fetch(path, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`video fetch ${res.status}`);
        const blob = await res.blob();
        if (aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      } catch {
        if (!aborted) setFallback(true);
      }
    });
    return () => {
      aborted = true;
      ctrl.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  // Tighter spring → the scrubbed frame tracks the scroll position closely
  // instead of lagging behind, which reads as smoother scrolling.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 34,
    mass: 0.3,
    restDelta: 0.0005,
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
      // Skip all decode/seek work while the tab is hidden (saves battery/CPU).
      if (ready && duration > 0 && !document.hidden) {
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
    // Entering/leaving fullscreen changes the viewport — rebuild the backing
    // store at the new size so the frame stays crisp instead of upscaled.
    document.addEventListener("fullscreenchange", setup);

    return () => {
      cancelAnimationFrame(rafId);
      if (hasRVFC && rvfcId) video.cancelVideoFrameCallback?.(rvfcId);
      window.removeEventListener("resize", setup);
      document.removeEventListener("fullscreenchange", setup);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [smooth, src]);

  // Static backdrop: used on touch/data-saver devices (scrub disabled for
  // perf) and if the video fails to decode. Static (no looping animation) so
  // it adds zero per-frame work while scrolling.
  if (fallback) {
    return (
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
        <FallbackBackdrop animate={false} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
      <canvas ref={canvasRef} className="relative z-10 block h-full w-full" />

      {/* Source video — decoded for the canvas, kept invisible BEHIND it.
          Not `display:none`: iOS Safari refuses to decode/seek hidden video,
          which would leave the canvas blank on iPhone. `src` is a blob: URL
          (resolution-adaptive, fetched on the client), so only render once
          the blob is ready. */}
      {src && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
        />
      )}
    </div>
  );
}

function FallbackBackdrop({ animate = true }: { animate?: boolean }) {
  return (
    <div className="grain relative h-full w-full bg-obsidian">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(138,106,53,0.18),transparent_55%)]" />
      <motion.div
        aria-hidden
        animate={animate ? { opacity: [0.35, 0.6, 0.35], scale: [1, 1.04, 1] } : undefined}
        transition={animate ? { duration: 9, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(212,175,55,0.12),transparent)] blur-3xl"
      />
    </div>
  );
}
