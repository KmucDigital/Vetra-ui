"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl" role="banner">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-white text-black px-4 py-2 rounded-lg font-semibold transition-all"
      >
        Skip to main content
      </a>

      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-xl md:text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* CTA Button */}
            <div className="flex items-center gap-3 ml-4">
              <Link href="https://github.com/kmucdigital/vetra-ui">
                <Button size="sm">
                  Get Template
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-6 border-t border-zinc-800/50"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-4">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800/50">
                <Link href="https://github.com/kmucdigital/vetra-ui">
                  <Button className="w-full">
                    Get Template
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
