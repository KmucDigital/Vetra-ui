"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
}

export function PricingToggle({ isAnnual, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "text-base font-medium transition-colors",
          !isAnnual ? "text-white" : "text-zinc-300 hover:text-zinc-200"
        )}
      >
        Monthly
      </button>

      {/* Toggle Switch */}
      <button
        onClick={() => onToggle(!isAnnual)}
        className={cn(
          "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isAnnual ? "bg-white" : "bg-zinc-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-black transition-transform duration-300 ease-out",
            isAnnual ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(true)}
          className={cn(
            "text-base font-medium transition-colors",
            isAnnual ? "text-white" : "text-zinc-300 hover:text-zinc-200"
          )}
        >
          Annual
        </button>

        {/* Badge */}
        {isAnnual && (
          <Badge variant="success" className="px-2 py-1 text-xs animate-fade-in">
            <Sparkles className="w-3 h-3 mr-1" />
            2 MONTHS FREE
          </Badge>
        )}
      </div>
    </div>
  );
}
