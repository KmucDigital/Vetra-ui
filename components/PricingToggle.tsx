"use client";

import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

export function PricingToggle({
  isAnnual,
  onToggle,
}: PricingToggleProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => {
          onToggle(false);
        }}
        className={cn(
          "text-base font-medium transition-colors touch-target py-2 px-3 rounded-lg",
          !isAnnual
            ? "text-white"
            : "text-secondary hover:text-white focus-visible"
        )}
      >
        Monthly
      </button>

      {/* Toggle Switch */}
      <button
        onClick={() => {
          onToggle(!isAnnual);
        }}
        className={cn(
          "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 gpu-accelerated touch-target",
          isAnnual ? "bg-white" : "bg-zinc-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-black transition-transform duration-300 ease-out gpu-accelerated",
            isAnnual ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onToggle(true);
          }}
          className={cn(
            "text-base font-medium transition-colors touch-target py-2 px-3 rounded-lg",
            isAnnual
              ? "text-white"
              : "text-secondary hover:text-white focus-visible"
          )}
        >
          Annual
        </button>

        {/* Badge */}
        {isAnnual ? (
          <Badge
            variant="success"
            className="px-2 py-1 text-xs animate-fade-in gpu-accelerated"
          >
            <Sparkles className="w-3 h-3 mr-1" />2 MONTHS FREE
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
