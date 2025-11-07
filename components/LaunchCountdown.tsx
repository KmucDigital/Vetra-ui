"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { AnimateShine } from "@/components/AnimateShine";

type CountdownUnit = {
  label: string;
  value: number;
};

function getTimeDifference(targetDate: Date): CountdownUnit[] {
  const now = new Date();
  const diff = Math.max(0, targetDate.getTime() - now.getTime());

  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: remainingSeconds },
  ];
}

export function LaunchCountdown() {
  const target = useMemo(
    () => new Date(siteConfig.launch.targetDate),
    []
  );
  const [units, setUnits] = useState<CountdownUnit[]>(() =>
    getTimeDifference(target)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setUnits(getTimeDifference(target));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [target]);

  return (
    <section
      aria-labelledby="launch-countdown"
      className="relative w-full max-w-4xl mx-auto mt-20"
    >
      <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.25),transparent_60%)] opacity-80 blur-3xl" />
      <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-2xl glass-surface-deep gpu-accelerated">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary glass-surface">
              <AnimateShine text={siteConfig.launch.label} speed={12} />
            </span>
            <h2
              id="launch-countdown"
              className="text-2xl font-semibold text-white/90 md:text-3xl text-fluid-lg"
            >
              Launch window locked in. Build with us in real-time.
            </h2>
            <p className="text-sm text-secondary md:text-base text-fluid">
              Follow the roadmap as we drop fresh sections, motion kits, and
              integrations on the path to release.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 px-4 py-5 text-center shadow-[0_18px_40px_rgba(7,7,12,0.45)] glass-surface hover-lift gpu-accelerated"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.35),transparent_70%)] opacity-70" />
                <div className="relative space-y-2">
                  <p className="text-3xl font-bold tabular-nums text-white">
                    {String(unit.value).padStart(2, "0")}
                  </p>
                  <p className="text-xs tracking-[0.2em] text-secondary">
                    {unit.label.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
          {siteConfig.launch.milestones.map((milestone) => (
            <div
              key={milestone.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 glass-surface hover-lift gpu-accelerated"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,34,206,0.15),transparent_75%)]" />
              <div className="relative space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  {milestone.status}
                </span>
                <p className="text-lg font-semibold text-white">
                  {milestone.title}
                </p>
                <p className="text-sm text-secondary">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
