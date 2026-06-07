"use client";

import { useEffect, useRef, useState } from "react";

/** Photo with an elegant fallback shown until the real image is dropped in. */
export default function Portrait({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [ok, setOk] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch the case where the image already failed before React attached onError
  // (SSR markup -> browser loads & errors -> hydration). Without this the native
  // broken-image icon shows instead of our fallback.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) {
    return (
      <div className={`grain relative flex items-center justify-center bg-charcoal ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.18),transparent_60%)]" />
        <span className="relative font-serif text-sm tracking-[0.3em] text-muted">
          {alt}
        </span>
      </div>
    );
  }

  /* eslint-disable-next-line @next/next/no-img-element */
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
    />
  );
}
