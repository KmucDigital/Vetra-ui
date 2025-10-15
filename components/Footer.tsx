import * as React from "react";
import Link from "next/link";
import { MessageCircle, Twitter, Github, Globe } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/50 bg-black">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Footer Columns - 4 Groups */}
          {siteConfig.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold mb-6 text-white tracking-wide">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand & Social */}
        <div className="pt-10 border-t border-zinc-800/50 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Link href="/" className="flex items-center mb-3">
                <div className="text-xl md:text-2xl font-bold tracking-tight">{siteConfig.name}</div>
              </Link>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                {siteConfig.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {siteConfig.footer.social.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-zinc-400 hover:text-white transition-colors duration-200 p-2 hover:bg-zinc-800 rounded-lg"
                  aria-label={social.name}
                >
                  {social.icon === "discord" && <MessageCircle className="h-5 w-5" />}
                  {social.icon === "twitter" && <Twitter className="h-5 w-5" />}
                  {social.icon === "github" && <Github className="h-5 w-5" />}
                  {social.icon === "globe" && <Globe className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-10 border-t border-zinc-800/50 space-y-3">
          <p className="text-sm text-zinc-500 text-center sm:text-left">
            Copyright © {currentYear} {siteConfig.name}. Created by Sebastian Lui. All Rights Reserved.
          </p>
          <p className="text-xs text-zinc-600 text-center sm:text-left">
            Dies ist ein Open-Source-Template (MIT License). Alle Inhalte dienen nur zur Demonstration.
            Vetra UI ist kein kommerzielles Produkt. Die dargestellten Preise, Features und Firmennamen sind Beispiele.
          </p>
        </div>
      </div>
    </footer>
  );
}
