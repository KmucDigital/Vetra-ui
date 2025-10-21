/**
 * Environment Configuration Module
 *
 * This module provides type-safe access to validated environment variables.
 * All ENV variables are validated against the Zod schema at build time.
 *
 * Usage:
 * import { env } from '@/lib/env'
 * console.log(env.NEXT_PUBLIC_SITE_NAME)
 */

import { validateEnv, type Env } from "../.env.schema";

// Validate environment variables once at module load
let validatedEnv: Env | null = null;

/**
 * Get validated environment variables
 * Caches the result after first validation
 */
export function getEnv(): Env {
  if (!validatedEnv) {
    validatedEnv = validateEnv();
  }
  return validatedEnv;
}

/**
 * Export validated environment for direct access
 * This is the primary way to access environment variables in the app
 */
export const env = getEnv();

/**
 * Helper function to check if we're in development mode
 */
export function isDevelopment(): boolean {
  return env.NODE_ENV === "development";
}

/**
 * Helper function to check if we're in production mode
 */
export function isProduction(): boolean {
  return env.NODE_ENV === "production";
}

/**
 * Helper function to check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  return env.NEXT_PUBLIC_ENABLE_ANALYTICS;
}
