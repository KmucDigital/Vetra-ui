// components/CursorBackground.tsx

"use client";
import { useEffect, useState } from "react";

import { motion, useSpring } from "framer-motion";

export default function CursorBackground(): React.JSX.Element | null {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const x = useSpring(0, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(0, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    // Detect mobile device
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    setMounted(true);

    // Don't run on mobile to save performance
    if (window.innerWidth < 768) {
      return;
    }

    const move = (e: MouseEvent): void => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      x.set(cursor.x);
      y.set(cursor.y);
    }
  }, [cursor, x, y, isMobile]);

  // Don't render anything on mobile - saves massive performance
  if (isMobile || !mounted) {
    return null;
  }

  const blob = 400;
  const halo = 700;

  return (
    <div
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 1 }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: x,
          top: y,
          width: blob,
          height: blob,
          filter: "blur(100px)",
          opacity: 0.35,
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.5) 0%, rgba(125,249,255,0.4) 50%, rgba(147,51,234,0.3) 80%, transparent 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          left: x,
          top: y,
          width: halo,
          height: halo,
          filter: "blur(140px)",
          opacity: 0.25,
        }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(126,34,206,0.3) 0%, rgba(14,165,233,0.2) 50%, rgba(88,28,135,0.15) 70%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
