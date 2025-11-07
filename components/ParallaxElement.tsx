"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

interface ParallaxElementProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const ParallaxElement = forwardRef<HTMLDivElement, ParallaxElementProps>(
  ({ className, children, speed = 0.5, direction = "up", ...props }, ref) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const handleScroll = (): void => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;

        let x = 0,
          y = 0;

        switch (direction) {
          case "up":
            y = rate;
            break;
          case "down":
            y = -rate;
            break;
          case "left":
            x = rate;
            break;
          case "right":
            x = -rate;
            break;
        }

        setOffset({ x, y });
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial call

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [speed, direction]);

    return (
      <div
        ref={ref}
        className={cn("parallax-slow gpu-accelerated", className)}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) translateZ(0)`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ParallaxElement.displayName = "ParallaxElement";
