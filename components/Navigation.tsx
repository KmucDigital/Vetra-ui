"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { GlassButton } from "@/components/GlassButton";
import { siteConfig } from "@/lib/siteConfig";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap for mobile menu
  React.useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    menu.addEventListener("keydown", handleTabKey as EventListener);
    firstElement?.focus();

    return () => {
      menu.removeEventListener("keydown", handleTabKey as EventListener);
    };
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl"
      role="banner"
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        Skip to main content
      </a>

      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
          >
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
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                {...(item.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="https://github.com/kmucdigital/vetra-ui"
              className="ml-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton className="px-5 py-2 text-sm" accent="#6B1F87">
                Get Template
              </GlassButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            ref={menuRef}
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
                  className="text-base font-medium text-zinc-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                  onClick={handleClose}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <Link
                href="https://github.com/kmucdigital/vetra-ui"
                className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                onClick={handleClose}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Template
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
