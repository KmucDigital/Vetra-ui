import { Code2, Palette, Zap, Blocks, Sparkles, Github } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Modern Tech Stack",
    description: "Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance and developer experience.",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Stunning glassmorphism effects, smooth animations, and a carefully crafted dark theme.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with static export, minimal bundle size, and fast page loads.",
  },
  {
    icon: Blocks,
    title: "Fully Customizable",
    description: "Easy to customize with centralized configuration and component-based architecture.",
  },
  {
    icon: Sparkles,
    title: "Production Ready",
    description: "SEO optimized, fully responsive, and ready to deploy with Docker support.",
  },
  {
    icon: Github,
    title: "Open Source",
    description: "MIT licensed, free to use, and available on GitHub for everyone.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Everything you need to build fast
          </h2>
          <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto leading-relaxed">
            A complete landing page template with all the features you need to get started quickly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={feature.title}>
              <Card className="p-6 md:p-8 h-full hover:border-purple-500/50 transition-transform duration-300 group hover:-translate-y-2">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-zinc-200/80 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
