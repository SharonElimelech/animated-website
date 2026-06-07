/** Cinematic film-grain layer over the entire site (analog texture). */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="film-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.04]"
    />
  );
}
