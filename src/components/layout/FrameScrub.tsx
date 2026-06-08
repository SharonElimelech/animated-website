"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

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
  // target = raw scroll position (0..1); framePos = the eased value that chases
  // it. We lerp framePos toward target every animation frame instead of binding
  // the frame index straight to scroll, so the timeline catches up smoothly and
  // never ping-pongs between two frames when scrolling slowly.
  const target = useRef(0);
  const framePos = useRef(0);

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    let forceRepaint = true;
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
      forceRepaint = true; // repaint at the new size
    };

    // Paint one frame, object-fit: cover, in CSS pixels (ctx pre-scaled by DPR).
    const paint = (idx: number, alpha: number) => {
      const img = images[idx];
      if (!img || !loaded[idx]) return false;
      const vw = img.naturalWidth;
      const vh = img.naturalHeight;
      if (!vw || !vh) return false;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      const scale = Math.max(cssW / vw, cssH / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cssW - dw) / 2, (cssH - dh) / 2, dw, dh);
      ctx.globalAlpha = 1;
      return true;
    };

    // Nearest loaded frame to idx, so we never show a blank gap while later
    // frames are still downloading.
    const nearestLoaded = (idx: number) => {
      for (let i = idx; i >= 0; i--) if (loaded[i]) return i;
      for (let i = idx + 1; i < FRAME_COUNT; i++) if (loaded[i]) return i;
      return -1;
    };

    // Crossfade the two frames bracketing the continuous position. With only
    // 145 discrete frames, rounding to one image makes slow scrolling step;
    // blending the next frame in by the fractional part dissolves between them
    // so the motion stays smooth at any scroll speed.
    const render = (pos: number) => {
      const lo = Math.min(Math.max(Math.floor(pos), 0), last);
      const hi = Math.min(lo + 1, last);
      const frac = pos - lo;
      const base = loaded[lo] ? lo : nearestLoaded(lo);
      if (base < 0) return;
      paint(base, 1);
      if (hi !== lo && frac > 0.001 && loaded[hi]) paint(hi, frac);
    };

    // Lerp factor: higher = snappier, lower = smoother/longer catch-up.
    const LERP = 0.15;
    const last = FRAME_COUNT - 1;
    let lastPos = -1;

    const tick = () => {
      if (!document.hidden) {
        const want = target.current * last;
        // Ease framePos toward the target scroll position.
        framePos.current += (want - framePos.current) * LERP;
        // Snap when close enough so it settles cleanly.
        if (Math.abs(want - framePos.current) < 0.001) framePos.current = want;

        const pos = framePos.current;
        // Repaint whenever the position moved enough to change the blend, or
        // when a force-repaint was requested (resize / newly loaded frame).
        if (forceRepaint || Math.abs(pos - lastPos) > 0.002) {
          render(pos);
          lastPos = pos;
          forceRepaint = false;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    setup();
    // Seed positions from the current scroll so the first paint is correct.
    target.current = scrollYProgress.get();
    framePos.current = target.current * (FRAME_COUNT - 1);
    // Load every frame. The first frame is prioritized so something paints ASAP.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded[i] = true;
        if (disposed) return;
        // Repaint if this frame is at or next to the one currently showing.
        if (Math.abs(i - framePos.current) <= 1) forceRepaint = true;
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
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden bg-obsidian">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
