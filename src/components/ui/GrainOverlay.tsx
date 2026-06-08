/** Cinematic film-grain layer over the entire site (analog texture). */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      // transform-gpu promotes this full-screen texture to its own compositor
      // layer so it doesn't repaint the page on every scroll frame.
      className="film-grain pointer-events-none fixed inset-0 z-[100] transform-gpu opacity-[0.04] [contain:strict]"
    />
  );
}
