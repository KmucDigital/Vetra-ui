"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

// Lazy load CursorBackground (only loads on desktop, includes Framer Motion)
// This prevents loading 169KB Framer Motion bundle on mobile where it's not used
const CursorBackground = dynamic(() => import("@/components/backroundeffect"), {
  ssr: false, // Client-only component
});

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <CursorBackground />
      {children}
    </>
  );
}
