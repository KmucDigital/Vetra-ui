/**
 * Zod Schemas for Site Configuration
 *
 * These schemas provide runtime validation and type inference
 * for all configuration objects used throughout the site.
 */

import { z } from "zod";

/**
 * Icon types used throughout the site
 */
export const iconTypeSchema = z.enum([
  "check",
  "layout",
  "sparkles",
  "glass",
  "bot",
  "insight",
  "pricing",
  "timeline",
  "integration",
  "onboarding",
  "support",
  "briefcase",
  "workflow",
  "handoff",
  "palette",
  "calendar",
  "github",
  "globe",
]);

export type IconType = z.infer<typeof iconTypeSchema>;

/**
 * Navigation item schema
 */
export const navigationItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export type NavigationItem = z.infer<typeof navigationItemSchema>;

/**
 * Pricing plan schema
 */
export const pricingPlanSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  period: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  cta: z.string(),
  highlighted: z.boolean(),
});

export type PricingPlan = z.infer<typeof pricingPlanSchema>;

/**
 * Company logo schema for "Trusted By" section
 */
export const companyLogoSchema = z.object({
  name: z.string().min(1),
  logo: z.string().min(1),
});

export type CompanyLogo = z.infer<typeof companyLogoSchema>;

/**
 * Feature schema
 */
export const featureSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  highlight: z.string(),
  icon: iconTypeSchema,
  badge: z.string().optional(),
});

export type Feature = z.infer<typeof featureSchema>;

/**
 * Hero persona schema
 */
export const heroPersonaSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  ctaText: z.string().min(1),
  ctaLink: z.string().url(),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      suffix: z.string(),
    })
  ),
});

export type HeroPersona = z.infer<typeof heroPersonaSchema>;

/**
 * Launch milestone schema
 */
export const launchMilestoneSchema = z.object({
  status: z.enum(["Done", "In Progress", "Next"]),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type LaunchMilestone = z.infer<typeof launchMilestoneSchema>;

/**
 * Footer link schema
 */
export const footerLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export type FooterLink = z.infer<typeof footerLinkSchema>;

/**
 * Footer column schema
 */
export const footerColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(footerLinkSchema),
});

export type FooterColumn = z.infer<typeof footerColumnSchema>;

/**
 * Social link schema
 */
export const socialLinkSchema = z.object({
  name: z.string().min(1),
  href: z.string().url(),
  icon: iconTypeSchema,
});

export type SocialLink = z.infer<typeof socialLinkSchema>;

/**
 * CTA bullet schema
 */
export const ctaBulletSchema = z.object({
  label: z.string().min(1),
  icon: iconTypeSchema,
});

export type CTABullet = z.infer<typeof ctaBulletSchema>;

/**
 * Complete site config schema
 */
export const siteConfigSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string(),
  hero: z.object({
    defaultPersona: z.string(),
    personas: z.array(heroPersonaSchema),
  }),
  launch: z.object({
    label: z.string(),
    targetDate: z.string(),
    milestones: z.array(launchMilestoneSchema),
  }),
  featureSets: z.record(z.string(), z.array(featureSchema)),
  glassButton: z.object({
    gradient: z.string(),
    border: z.string(),
    glow: z.string(),
  }),
  trustedBy: z.object({
    title: z.string(),
    companies: z.array(companyLogoSchema),
  }),
  pricing: z.object({
    headline: z.string(),
    subheadline: z.string(),
    plans: z.array(pricingPlanSchema),
  }),
  cta: z.object({
    headline: z.string(),
    subheadline: z.string(),
    shimmer: z.string(),
    buttonText: z.string(),
    buttonHref: z.string().url(),
    bullets: z.array(ctaBulletSchema),
  }),
  footer: z.object({
    columns: z.array(footerColumnSchema),
    social: z.array(socialLinkSchema),
  }),
  navigation: z.array(navigationItemSchema),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

/**
 * Validate site configuration
 * Use this function to validate the siteConfig at runtime
 */
export function validateSiteConfig(config: unknown): SiteConfig {
  return siteConfigSchema.parse(config);
}
