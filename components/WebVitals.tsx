"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from "web-vitals";

/**
 * Web Vitals monitoring component for performance tracking
 * Tracks Core Web Vitals and reports them for optimization
 */
export function WebVitals() {
  useEffect(() => {
    const reportMetric = (metric: Metric) => {
      // Log metrics in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
        });
      }

      // Send to analytics in production
      if (process.env.NODE_ENV === "production") {
        // You can send to your analytics service here
        // Example: analytics.track(metric.name, { value: metric.value });
      }
    };

    // Track all Core Web Vitals
    onCLS(reportMetric);  // Cumulative Layout Shift
    onFCP(reportMetric);  // First Contentful Paint
    onFID(reportMetric);  // First Input Delay (deprecated but still tracked)
    onINP(reportMetric);  // Interaction to Next Paint (replaces FID)
    onLCP(reportMetric);  // Largest Contentful Paint
    onTTFB(reportMetric); // Time to First Byte
  }, []);

  return null;
}
