"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Modern prefetching hook for improved navigation performance
 * Prefetches routes on hover or focus for instant navigation
 */
export function usePrefetch(urls: string | string[]) {
  const router = useRouter();

  useEffect(() => {
    const urlArray = Array.isArray(urls) ? urls : [urls];

    // Prefetch all URLs
    urlArray.forEach((url) => {
      router.prefetch(url);
    });
  }, [urls, router]);
}

/**
 * Hook for intelligent link prefetching based on user interaction
 */
export function useSmartPrefetch() {
  const router = useRouter();

  const prefetchOnHover = (url: string) => {
    router.prefetch(url);
  };

  const prefetchOnFocus = (url: string) => {
    router.prefetch(url);
  };

  const prefetchVisible = (url: string) => {
    // Prefetch when link becomes visible (for above-the-fold links)
    router.prefetch(url);
  };

  return {
    prefetchOnHover,
    prefetchOnFocus,
    prefetchVisible,
  };
}
