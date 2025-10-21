import { memo } from "react";
import * as React from "react";
import { MessageCircle, Twitter, Github, Globe } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const Footer = memo(function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-black">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Footer Columns - 4 Groups */}
          {siteConfig.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold mb-6 text-white tracking-wide uppercase">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-200 hover:text-white transition-colors duration-200"
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
                <div className="text-xl md:text-2xl font-bold tracking-tight">
                  {siteConfig.name}
                </div>
              </Link>
              <p className="text-sm text-zinc-200 leading-relaxed max-w-md">
                {siteConfig.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {siteConfig.footer.social.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-zinc-200 hover:text-white transition-colors duration-200 p-2 hover:bg-zinc-800 rounded-lg"
                  aria-label={social.name}
                >
                  {social.icon === "discord" && (
                    <MessageCircle className="h-5 w-5" />
                  )}
                  {social.icon === "twitter" && <Twitter className="h-5 w-5" />}
                  {social.icon === "github" && <Github className="h-5 w-5" />}
                  {social.icon === "globe" && <Globe className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & License Link */}
        <div className="pt-10 border-t border-zinc-800/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-zinc-200 text-center sm:text-left">
            Created by kmuc
          </p>
          <div className="text-sm">
            <Link
              href="/license"
              className="text-sm text-zinc-300 hover:text-white"
            >
              License & Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});
