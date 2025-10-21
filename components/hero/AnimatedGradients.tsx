/**
 * AnimatedGradients Component
 *
 * Renders the animated background gradients for the hero section.
 * Memoized for performance.
 */

import { memo } from "react";

export const AnimatedGradients = memo(function AnimatedGradients() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(11,10,20,0.95),rgba(3,3,8,0.92))]" />
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-16 h-[420px] bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.45),transparent_65%)] blur-3xl"
          style={{ willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_10px)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,9,76,0.1),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(47,109,255,0.12),transparent_45%)] opacity-80" />
      </div>
    </>
  );
});
