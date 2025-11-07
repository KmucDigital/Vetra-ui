"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: "text" | "card" | "button" | "image";
  lines?: number;
}

export const LoadingSkeleton = forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  ({ className, variant = "text", lines = 3, children, ...props }, ref) => {
    const renderSkeleton = (): React.JSX.Element => {
      switch (variant) {
        case "text":
          return (
            <div className="space-y-2">
              {Array.from({ length: lines }).map((_, i) => (
                <div
                  key={`skeleton-line-${i}`}
                  className={cn(
                    "h-4 rounded-full loading-skeleton",
                    i === lines - 1 ? "w-3/4" : "w-full"
                  )}
                />
              ))}
            </div>
          );

        case "card":
          return (
            <div className="space-y-4">
              <div className="h-6 w-1/3 rounded-full loading-skeleton" />
              <div className="h-4 w-full rounded-full loading-skeleton" />
              <div className="h-4 w-5/6 rounded-full loading-skeleton" />
              <div className="h-4 w-4/5 rounded-full loading-skeleton" />
            </div>
          );

        case "button":
          return <div className="h-12 w-32 rounded-full loading-skeleton" />;

        case "image":
          return <div className="aspect-square rounded-2xl loading-skeleton" />;

        default:
          return <div className="h-4 w-full rounded-full loading-skeleton" />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn("gpu-accelerated", className)}
        role="status"
        aria-label="Loading content"
        {...props}
      >
        {children ?? renderSkeleton()}
      </div>
    );
  }
);

LoadingSkeleton.displayName = "LoadingSkeleton";
