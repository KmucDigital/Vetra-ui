/**
 * Site Configuration
 * 
 * This configuration can be customized via environment variables.
 * See .env.example for all available options.
 * 
 * Environment variables take precedence over hardcoded values when set.
 */

// Helper to safely access environment variables
const getEnvVar = (key: string, fallback: string): string => {
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key] as string;
  }
  return fallback;
};

export const siteConfig = {
  name: getEnvVar("NEXT_PUBLIC_SITE_NAME", "Vetra UI"),
  description: getEnvVar(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "UI Library for Design Engineers"
  ),
  longDescription:
    "Beautifully designed, animated components and templates built with Tailwind CSS, React, and modern CSS animations.",

  hero: {
    defaultPersona: "vetra",
    personas: [
      {
        id: "vetra",
        label: "Creators",
        heroTitle: getEnvVar(
          "NEXT_PUBLIC_HERO_HEADLINE",
          "Vetra UI is the new way to build landing pages."
        ),
        heroSubtitle: getEnvVar(
          "NEXT_PUBLIC_HERO_SUBHEADLINE",
          "Craft immersive marketing sites in hours, not weeks. Vetra stitches together motion, glassmorphism, and systemized components for teams who care about polish."
        ),
        ctaText: getEnvVar("NEXT_PUBLIC_HERO_CTA_TEXT", "View on GitHub"),
        ctaLink: getEnvVar(
          "NEXT_PUBLIC_HERO_CTA_LINK",
          "https://github.com/kmucdigital/vetra-ui"
        ),
        accent: "#7E22CE",
        stats: [
          { label: "Components", value: 48, suffix: "+" },
          { label: "Design Tokens", value: 360, suffix: "+" },
          { label: "Deploy Time", value: 7, suffix: "min" },
        ],
      },
      {
        id: "startups",
        label: "Startups",
        heroTitle: "Ship launch-ready marketing in a weekend.",
        heroSubtitle:
          "Pick a stack, theme it once, and go live with pricing, testimonials, and analytics-ready sections that work across every viewport.",
        ctaText: "Launch Starter Kit",
        ctaLink: "https://github.com/kmucdigital/vetra-ui/tree/main/examples",
        accent: "#2F6DFF",
        stats: [
          { label: "Sections", value: 22, suffix: "+" },
          { label: "Figma Match", value: 98, suffix: "%" },
          { label: "Iteration Speed", value: 4, suffix: "x" },
        ],
      },
      {
        id: "agencies",
        label: "Agencies",
        heroTitle: "Deliver premium landing pages on repeat.",
        heroSubtitle:
          "Reuse motion blueprints, swap palettes, and hand clients a production-ready Next.js repo with zero build debt.",
        ctaText: "Download Agency Kit",
        ctaLink: "https://github.com/kmucdigital/vetra-ui/releases",
        accent: "#D1094C",
        stats: [
          { label: "Client Projects", value: 75, suffix: "+" },
          { label: "Reusable Variants", value: 14, suffix: "" },
          { label: "Hand-off Hours", value: 12, suffix: "-" },
        ],
      },
    ],
  },

  launch: {
    label: getEnvVar("NEXT_PUBLIC_LAUNCH_LABEL", "Launching 20.11.2025"),
    targetDate: getEnvVar(
      "NEXT_PUBLIC_LAUNCH_DATE",
      "2025-11-20T00:00:00+01:00"
    ),
    milestones: [
      {
        status: "Done",
        title: "Design system foundations",
        description: "Base tokens, typography scale, and motion curves locked.",
      },
      {
        status: "In Progress",
        title: "Component variants",
        description: "Hero, pricing, and FAQ variations are shipping weekly.",
      },
      {
        status: "Next",
        title: "Template marketplace",
        description: "Partner themes and community drops go live on launch.",
      },
    ],
  },

  featureSets: {
    vetra: [
      {
        id: "command-center",
        title: "Command Center Layouts",
        description:
          "Stage dashboards, product shots, or mixed light/dark UIs with one toggleable layout.",
        highlight: "Parallax-ready framing",
        icon: "layout",
        badge: "New",
      },
      {
        id: "motion-kit",
        title: "Motion Blueprint Kit",
        description:
          "Drop-in framer-motion presets for hero reveals, counters, and CTA shimmer—no animation slog.",
        highlight: "9 prebuilt sequences",
        icon: "sparkles",
      },
      {
        id: "glass-api",
        title: "Glassmorphism API",
        description:
          "Token-driven glass surfaces and spectral glows that respect your brand palette automatically.",
        highlight: "Dynamic theming",
        icon: "glass",
      },
      {
        id: "ai-content",
        title: "AI Content Hooks",
        description:
          "Bring your AI assistant front-and-center with chat-ready components wired for streaming responses.",
        highlight: "Server + client stubs",
        icon: "bot",
      },
      {
        id: "analytics",
        title: "Conversion Analytics",
        description:
          "Instrument CTAs and forms out of the box—ship dashboards with Spotlight states ready for hand-off.",
        highlight: "Tracking baked in",
        icon: "insight",
      },
    ],
    startups: [
      {
        id: "pricing",
        title: "Adaptive Pricing Walls",
        description:
          "Switch tiers, trials, and enterprise columns instantly—match MRR targets without redesigns.",
        highlight: "Usage aware badges",
        icon: "pricing",
      },
      {
        id: "fundraise",
        title: "Investor Proof Points",
        description:
          "Animated traction cards, social proof stacks, and timelines tailored to YC decks.",
        highlight: "Auto timeline",
        icon: "timeline",
      },
      {
        id: "integrations",
        title: "Integration Gallery",
        description:
          "Showcase partners and API coverage with gradient-glass tiles clients actually click.",
        highlight: "CMS friendly",
        icon: "integration",
      },
      {
        id: "onboarding",
        title: "Flow-driven Onboarding",
        description:
          "Hero modals, checklists, and nudges keep trial users moving from signup to success.",
        highlight: "Activation-tested",
        icon: "onboarding",
      },
      {
        id: "support",
        title: "Support Ready Hand-off",
        description:
          "Drop in knowledge base, chat, and status indicators tied to your NOC tooling.",
        highlight: "Realtime states",
        icon: "support",
      },
    ],
    agencies: [
      {
        id: "playbooks",
        title: "Agency Playbooks",
        description:
          "Proposals, case studies, and testimonial grids themed per vertical in seconds.",
        highlight: "Vertical presets",
        icon: "briefcase",
      },
      {
        id: "workflow",
        title: "Workflow Automation",
        description:
          "Trello, Linear, and Notion integrations keep client updates flowing without manual effort.",
        highlight: "Status automations",
        icon: "workflow",
      },
      {
        id: "handoff",
        title: "Client Handoff Layer",
        description:
          "Developer notes, live preview toggles, and approval callouts built into the template.",
        highlight: "Zero context loss",
        icon: "handoff",
      },
      {
        id: "white-label",
        title: "White-label Ready",
        description:
          "Theme swapper, brand token generator, and asset pipeline pre-configured for rapid reuse.",
        highlight: "Palette generator",
        icon: "palette",
      },
      {
        id: "care",
        title: "Care Plans",
        description:
          "Recurring revenue upsells via maintenance cards and automated update logs.",
        highlight: "Retainer friendly",
        icon: "calendar",
      },
    ],
  },

  glassButton: {
    gradient: "linear-gradient(120deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
    border: "rgba(255,255,255,0.25)",
    glow: "0 12px 40px rgba(126, 34, 206, 0.35)",
  },

  trustedBy: {
    title: getEnvVar(
      "NEXT_PUBLIC_TRUSTED_BY_TITLE",
      "TRUSTED BY TEAMS FROM AROUND THE WORLD"
    ),
    companies: [
      { name: "Google", logo: "/images/google.svg" },
      { name: "Microsoft", logo: "/images/microsoft.svg" },
      { name: "GitHub", logo: "/images/github.svg" },
      { name: "Uber", logo: "/images/uber.svg" },
      { name: "Notion", logo: "/images/notion.svg" },
    ],
  },

  pricing: {
    headline: getEnvVar(
      "NEXT_PUBLIC_PRICING_HEADLINE",
      "Simple pricing for everyone"
    ),
    subheadline: getEnvVar(
      "NEXT_PUBLIC_PRICING_SUBHEADLINE",
      "Choose the perfect plan for your needs"
    ),
    plans: [
      {
        name: "Basic",
        price: 10,
        period: "month",
        description: "Perfect for getting started",
        features: [
          "AI-powered analytics",
          "Basic support",
          "5 projects limit",
          "Access to basic AI tools",
        ],
        cta: "Subscribe",
        highlighted: false,
      },
      {
        name: "Premium",
        price: 20,
        period: "month",
        description: "Best for professionals",
        features: [
          "Advanced AI insights",
          "Priority support",
          "Unlimited projects",
          "Access to all AI tools",
          "Custom integrations",
        ],
        cta: "Subscribe",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: 50,
        period: "month",
        description: "For large organizations",
        features: [
          "Custom AI solutions",
          "24/7 dedicated support",
          "Unlimited projects",
          "Access to all AI tools",
          "Custom integrations",
          "Data security and compliance",
        ],
        cta: "Subscribe",
        highlighted: false,
      },
      {
        name: "Ultimate",
        price: 80,
        period: "month",
        description: "Maximum performance",
        features: [
          "Bespoke AI development",
          "White-glove support",
          "Unlimited projects",
          "Priority access to new AI tools",
          "Custom integrations",
          "Highest data security",
        ],
        cta: "Subscribe",
        highlighted: false,
      },
    ],
  },

  cta: {
    headline: getEnvVar(
      "NEXT_PUBLIC_CTA_HEADLINE",
      "Ready to start your project?"
    ),
    subheadline: getEnvVar(
      "NEXT_PUBLIC_CTA_SUBHEADLINE",
      "Get started with Vetra UI today. Free, open source, and ready to customize."
    ),
    shimmer: "Launch with confidence. Iterate with speed.",
    buttonText: getEnvVar(
      "NEXT_PUBLIC_CTA_BUTTON_TEXT",
      "Download Template"
    ),
    buttonHref: getEnvVar(
      "NEXT_PUBLIC_CTA_BUTTON_HREF",
      "https://github.com/kmucdigital/vetra-ui"
    ),
    bullets: [
      { label: "100% Free", icon: "check" },
      { label: "iptpodate License", icon: "check" },
      { label: "Production Ready", icon: "check" },
    ],
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Documentation", href: "https://github.com/kmucdigital/vetra-ui" },
          { label: "GitHub Repository", href: "https://github.com/kmucdigital/vetra-ui" },
          { label: "License & Notice", href: "/license" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Components", href: "#features" },
          { label: "Templates", href: "https://github.com/kmucdigital/vetra-ui" },
          { label: "Examples", href: "https://github.com/kmucdigital/vetra-ui/tree/main/examples" },
          { label: "Changelog", href: "https://github.com/kmucdigital/vetra-ui/releases" },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "GitHub", href: "https://github.com/kmucdigital" },
          { label: "Main Page", href: "https://kmuc.online" },
          { label: "Contact", href: "https://kmuc.online/impressum" },
          { label: "Support", href: "https://github.com/kmucdigital/vetra-ui/issues" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Impressum", href: "https://kmuc.online/impressum" },
          { label: "Datenschutz", href: "https://kmuc.online/datenschutz" },
          { label: "AGB", href: "https://kmuc.online/agb" },
          { label: "Cookies", href: "https://kmuc.online/datenschutz#cookies" },
        ],
      },
    ],
    social: [
      { name: "GitHub", href: "https://github.com/kmucdigital", icon: "github" },
      { name: "Website", href: "https://kmuc.online", icon: "globe" },
    ],
  },

  navigation: [
    { label: "Features", href: "#features" },
    { label: "License", href: "/license" },
    {
      label: "GitHub",
      href: getEnvVar(
        "NEXT_PUBLIC_GITHUB_URL",
        "https://github.com/kmucdigital/vetra-ui"
      ),
      external: true,
    },
    {
      label: "Impressum",
      href: getEnvVar(
        "NEXT_PUBLIC_IMPRESSUM_URL",
        "https://kmuc.online/impressum"
      ),
      external: true,
    },
    {
      label: "Datenschutz",
      href: getEnvVar(
        "NEXT_PUBLIC_DATENSCHUTZ_URL",
        "https://kmuc.online/datenschutz"
      ),
      external: true,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
