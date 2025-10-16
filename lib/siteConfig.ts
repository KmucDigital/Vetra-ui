export const siteConfig = {
  name: "Vetra UI",
  description: "UI Library for Design Engineers",
  longDescription: "Beautifully designed, animated components and templates built with Tailwind CSS, React, and modern CSS animations.",

  hero: {
    headline: "Vetra UI is the new way to build landing pages.",
    subheadline: "Beautifully designed, animated components and templates built with Tailwind CSS, React, and modern CSS animations. Free and open source template for your next project.",
    ctaText: "View on GitHub",
    ctaLink: "https://github.com/kmucdigital/vetra-ui",
  },

  trustedBy: {
    title: "TRUSTED BY TEAMS FROM AROUND THE WORLD",
    companies: [
      { name: "Google", logo: "/images/google.svg" },
      { name: "Microsoft", logo: "/images/microsoft.svg" },
      { name: "GitHub", logo: "/images/github.svg" },
      { name: "Uber", logo: "/images/uber.svg" },
      { name: "Notion", logo: "/images/notion.svg" },
    ],
  },

  pricing: {
    headline: "Simple pricing for everyone",
    subheadline: "Choose the perfect plan for your needs",
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

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Documentation", href: "https://github.com/kmucdigital/vetra-ui" },
          { label: "GitHub Repository", href: "https://github.com/kmucdigital/vetra-ui" },
          { label: "License (MIT)", href: "https://github.com/kmucdigital/vetra-ui/blob/main/LICENSE" },
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
    { label: "GitHub", href: "https://github.com/kmucdigital/vetra-ui", external: true },
    { label: "Impressum", href: "https://kmuc.online/impressum", external: true },
    { label: "Datenschutz", href: "https://kmuc.online/datenschutz", external: true },
  ],
};

export type SiteConfig = typeof siteConfig;
