"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

/**
 * Apple-style scroll-scrub for mobile (and any device): a decoded image
 * sequence painted to a canvas, advanced by scroll progress.
 *
 * Why frames, not <video> seeking: setting video.currentTime on a phone is
 * slow and janky (each seek waits on the decoder), and Cloudflare's static
 * assets don't support HTTP Range so seeking stalls entirely. Drawing a
 * pre-decoded <img> to canvas is instant, so the scrub stays buttery while
 * scrolling — exactly how Apple's product pages do it.
 *
 * Frames live at /hero-frames/frame-001.jpg … frame-{FRAME_COUNT}.jpg
 * (extract with: ffmpeg -i hero-video-1440.mp4 -vf scale=1280:-2 -q:v 5
 *  public/hero-frames/frame-%03d.jpg).
 */
const FRAME_COUNT = 145;
const framePath = (i: number) =>
  `/hero-frames/frame-${String(i + 1).padStart(3, "0")}.jpg`;

export default function FrameScrub() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);

  const { scrollYProgress } = useScroll();
  // Tight spring → the frame tracks the scroll position closely (smooth, no lag).
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let lastDrawn = -1;
    let rafId = 0;
    let disposed = false;

    // High-DPI backing store so frames stay crisp (incl. fullscreen on 4K).
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
      lastDrawn = -1; // force a repaint at the new size
    };

    // object-fit: cover, drawn in CSS pixels (ctx pre-scaled by DPR).
    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img || !loaded[idx]) return;
      const vw = img.naturalWidth;
      const vh = img.naturalHeight;
      if (!vw || !vh) return;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const scale = Math.max(cssW / vw, cssH / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      ctx.drawImage(img, (cssW - dw) / 2, (cssH - dh) / 2, dw, dh);
      lastDrawn = idx;
    };

    // Nearest loaded frame at or below idx, so we never show a blank gap while
    // later frames are still downloading.
    const nearestLoaded = (idx: number) => {
      for (let i = idx; i >= 0; i--) if (loaded[i]) return i;
      for (let i = idx + 1; i < FRAME_COUNT; i++) if (loaded[i]) return i;
      return -1;
    };

    const tick = () => {
      if (!document.hidden) {
        const target = Math.round(progress.current * (FRAME_COUNT - 1));
        const idx = Math.min(Math.max(target, 0), FRAME_COUNT - 1);
        if (idx !== lastDrawn) {
          const draw = loaded[idx] ? idx : nearestLoaded(idx);
          if (draw >= 0) drawFrame(draw);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    setup();
    // Load every frame. The first frame is prioritized so something paints ASAP.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded[i] = true;
        if (disposed) return;
        // Repaint if this is the frame we currently want (or the first paint).
        if (lastDrawn === -1 || i === Math.round(progress.current * (FRAME_COUNT - 1))) {
          lastDrawn = -1;
        }
      };
      img.src = framePath(i);
      images[i] = img;
    }

    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", setup);
    document.addEventListener("fullscreenchange", setup);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setup);
      document.removeEventListener("fullscreenchange", setup);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
