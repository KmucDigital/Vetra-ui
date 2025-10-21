import { z } from "zod";

/**
 * Environment Variables Schema with Zod Validation
 * 
 * This schema validates all environment variables at runtime to ensure
 * type safety and proper configuration across all environments.
 */

// Helper schemas for common patterns
const urlSchema = z.string().url().optional().or(z.literal(""));
const colorSchema = z
  .string()
  .regex(/^\d+\s+\d+%\s+\d+%$/, "Must be in HSL format: '0 0% 98%'")
  .optional()
  .or(z.literal(""));

// Site Configuration Schema
export const envSchema = z.object({
  // Core Site Settings
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("production"),
  PORT: z.string().default("3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("Vetra UI"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("https://vetra.kmuc.online"),
  NEXT_PUBLIC_SITE_DESCRIPTION: z
    .string()
    .default("UI Library for Design Engineers"),

  // Hero Section
  NEXT_PUBLIC_HERO_HEADLINE: z
    .string()
    .default("Vetra UI is the new way to build landing pages."),
  NEXT_PUBLIC_HERO_SUBHEADLINE: z
    .string()
    .default(
      "Craft immersive marketing sites in hours, not weeks. Vetra stitches together motion, glassmorphism, and systemized components for teams who care about polish."
    ),
  NEXT_PUBLIC_HERO_CTA_TEXT: z.string().default("View on GitHub"),
  NEXT_PUBLIC_HERO_CTA_LINK: z
    .string()
    .url()
    .default("https://github.com/kmucdigital/vetra-ui"),

  // Theme Customization (HSL format: "0 0% 98%")
  NEXT_PUBLIC_PRIMARY_COLOR: colorSchema,
  NEXT_PUBLIC_ACCENT_COLOR: colorSchema,
  NEXT_PUBLIC_BACKGROUND_COLOR: colorSchema,
  NEXT_PUBLIC_FOREGROUND_COLOR: colorSchema,
  NEXT_PUBLIC_FONT_FAMILY: z.string().optional(),

  // Trusted By Section
  NEXT_PUBLIC_TRUSTED_BY_TITLE: z
    .string()
    .default("TRUSTED BY TEAMS FROM AROUND THE WORLD"),

  // Pricing Section
  NEXT_PUBLIC_PRICING_HEADLINE: z
    .string()
    .default("Simple pricing for everyone"),
  NEXT_PUBLIC_PRICING_SUBHEADLINE: z
    .string()
    .default("Choose the perfect plan for your needs"),

  // CTA Section
  NEXT_PUBLIC_CTA_HEADLINE: z
    .string()
    .default("Ready to start your project?"),
  NEXT_PUBLIC_CTA_SUBHEADLINE: z
    .string()
    .default(
      "Get started with Vetra UI today. Free, open source, and ready to customize."
    ),
  NEXT_PUBLIC_CTA_BUTTON_TEXT: z.string().default("Download Template"),
  NEXT_PUBLIC_CTA_BUTTON_HREF: z
    .string()
    .url()
    .default("https://github.com/kmucdigital/vetra-ui"),

  // Analytics Integration
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .enum(["true", "false"])
    .default("false")
    .transform((val) => val === "true"),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_CONTACT_FORM: z
    .enum(["true", "false"])
    .default("false")
    .transform((val) => val === "true"),
  NEXT_PUBLIC_ENABLE_I18N: z
    .enum(["true", "false"])
    .default("false")
    .transform((val) => val === "true"),

  // External Links
  NEXT_PUBLIC_GITHUB_URL: z
    .string()
    .url()
    .default("https://github.com/kmucdigital/vetra-ui"),
  NEXT_PUBLIC_COMPANY_WEBSITE: z
    .string()
    .url()
    .default("https://kmuc.online"),
  NEXT_PUBLIC_IMPRESSUM_URL: z
    .string()
    .url()
    .default("https://kmuc.online/impressum"),
  NEXT_PUBLIC_DATENSCHUTZ_URL: z
    .string()
    .url()
    .default("https://kmuc.online/datenschutz"),

  // Launch Configuration
  NEXT_PUBLIC_LAUNCH_DATE: z
    .string()
    .default("2025-11-20T00:00:00+01:00"),
  NEXT_PUBLIC_LAUNCH_LABEL: z.string().default("Launching 20.11.2025"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables
 * This function is called at build time and runtime to ensure all ENV variables are valid
 */
export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");
      console.error(JSON.stringify(error.issues, null, 2));
      throw new Error(
        "Environment validation failed. Please check your .env file."
      );
    }
    throw error;
  }
}
