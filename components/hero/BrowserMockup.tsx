/**
 * BrowserMockup Component
 *
 * Displays dark and light browser mockups showcasing the template.
 * Memoized for performance.
 */

import { memo } from "react";

export const BrowserMockup = memo(function BrowserMockup() {
  return (
    <div className="relative mt-16 w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.28),transparent_65%)]" />
      <div className="relative grid gap-6 md:grid-cols-2">
        {/* Dark Mockup */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/60 p-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,9,76,0.4),transparent_70%)] opacity-80" />
          <div className="relative flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
                <span>Dark Deck</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Parallax Ready</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-white/80">
              Layer hero shots and glass cards into a cinematic dashboard.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`dark-card-${item}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5" />
                  <div className="h-2 w-3/4 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Light Mockup */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.85] p-6 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(47,109,255,0.35),transparent_70%)] opacity-90" />
          <div className="relative flex flex-col gap-4 text-black">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-black/60">
                <span>Light Deck</span>
                <span className="h-1 w-1 rounded-full bg-black/30" />
                <span>Case Studies</span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>
            <p className="text-sm font-medium text-black/70">
              Swap palettes and ship client-ready marketing in minutes.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={`light-card-${item}`}
                  className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 h-10 w-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
                  <div className="h-2 w-3/4 rounded-full bg-black/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
