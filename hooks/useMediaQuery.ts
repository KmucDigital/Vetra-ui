"use client";

import { useEffect, useState } from "react";

/**
 * Modern hook for responsive design with media queries
 * Uses window.matchMedia for optimal performance
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Modern event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener instead of deprecated addListener
    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  // Return false on server to prevent hydration mismatch
  return mounted ? matches : false;
}

/**
 * Predefined breakpoint hooks for common use cases
 */
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet = () => useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)");
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const usePrefersDark = () => useMediaQuery("(prefers-color-scheme: dark)");
