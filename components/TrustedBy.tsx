"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
          <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-[0.2em] font-semibold">
            {siteConfig.trustedBy.title}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 items-center justify-items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group w-full"
            >
              <div className="flex items-center justify-center w-full h-20 rounded-xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-purple-500/5">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 text-xl font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                  {company.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
