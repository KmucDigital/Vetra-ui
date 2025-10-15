"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
      {/* Background Gradient - Enhanced */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="glass" className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Free Open Source Template - MIT License
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 max-w-5xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[1.1]">
              {siteConfig.hero.headline}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              {siteConfig.hero.subheadline}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={siteConfig.hero.ctaLink}>
              <Button
                size="lg"
                className="group px-6 py-3 text-base font-semibold rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 inline-flex items-center gap-2"
              >
                {siteConfig.hero.ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Hero Preview - Beautiful UI Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-full max-w-6xl mt-16"
          >
            {/* Ambient Glow Effects */}
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Dark Mode Showcase */}
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative group"
              >
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Container */}
                <div className="relative rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950/90 p-1.5 backdrop-blur-2xl shadow-2xl">
                  <div className="rounded-xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-8">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800/50">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 text-center">
                        <div className="inline-block px-4 py-1 bg-zinc-800/50 rounded text-xs text-zinc-500">yoursite.com</div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
                          <div className="h-3 w-20 bg-zinc-700/50 rounded" />
                        </div>
                        <div className="h-2 w-16 bg-zinc-700/50 rounded" />
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {[0, 1].map((i) => (
                          <div key={i} className="p-4 bg-zinc-800/20 rounded-lg border border-zinc-700/20 space-y-2">
                            <div className="w-6 h-6 rounded bg-purple-500/20" />
                            <div className="h-2 w-full bg-zinc-700/40 rounded" />
                            <div className="h-2 w-3/4 bg-zinc-700/30 rounded" />
                          </div>
                        ))}
                      </div>

                      {/* Footer Badge */}
                      <div className="flex justify-center pt-2">
                        <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                          <span className="text-xs font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Dark Mode
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Light Mode Showcase */}
              <motion.div
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative group"
              >
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card Container */}
                <div className="relative rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-zinc-950/90 p-1.5 backdrop-blur-2xl shadow-2xl">
                  <div className="rounded-xl bg-gradient-to-br from-zinc-100 via-white to-zinc-50 p-8">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-200">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 text-center">
                        <div className="inline-block px-4 py-1 bg-zinc-100 rounded text-xs text-zinc-600">yoursite.com</div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500" />
                          <div className="h-3 w-20 bg-zinc-200 rounded" />
                        </div>
                        <div className="h-2 w-16 bg-zinc-200 rounded" />
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {[0, 1].map((i) => (
                          <div key={i} className="p-4 bg-white rounded-lg border border-zinc-200 shadow-sm space-y-2">
                            <div className="w-6 h-6 rounded bg-blue-100" />
                            <div className="h-2 w-full bg-zinc-200 rounded" />
                            <div className="h-2 w-3/4 bg-zinc-100 rounded" />
                          </div>
                        ))}
                      </div>

                      {/* Footer Badge */}
                      <div className="flex justify-center pt-2">
                        <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                          <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Light Mode
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
