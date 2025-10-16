import { siteConfig } from "@/lib/siteConfig";

export function TrustedBy() {
  const companies = [
    { name: "Google", icon: "G" },
    { name: "Microsoft", icon: "M" },
    { name: "GitHub", icon: "GH" },
    { name: "Uber", icon: "U" },
    { name: "Notion", icon: "N" },
  ];

  return (
    <section className="py-20 border-t border-zinc-800/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm text-zinc-300 uppercase tracking-[0.2em] font-semibold">
            {siteConfig.trustedBy.title}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 items-center justify-items-center text-zinc-300">
          {companies.map((company, index) => (
            <div key={company.name} className="group w-full transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-full h-20 rounded-xl border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900/60 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 text-xl font-bold text-zinc-100 group-hover:text-white transition-colors duration-300">
                  {company.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
